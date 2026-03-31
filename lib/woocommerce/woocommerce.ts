/**
 * WooCommerce data layer — single commerce data source.
 * Server-side only; never expose consumer key/secret to client.
 */

import type { WooProductRaw, WooProductReviewRaw, ProductReview } from './types';
import { mapWooProduct, normalizedToProduct } from './mapProduct';
import type { NormalizedProduct, Product } from './types';

const REVALIDATE = 60;

// Cache for category slug to ID mapping
let categoryCache: Map<string, string> | null = null;

function getBaseUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_WC_API_URL;
  if (!url) return null;
  return url.replace(/\/$/, '');
}

function requireBaseUrl(): string {
  const base = getBaseUrl();
  if (!base) throw new Error('NEXT_PUBLIC_WC_API_URL is not set');
  return base;
}

function getAuth(): string | null {
  const key = process.env.WC_CONSUMER_KEY;
  const secret = process.env.WC_CONSUMER_SECRET;
  if (!key || !secret) return null;
  return Buffer.from(`${key}:${secret}`).toString('base64');
}

async function wcFetch<T>(path: string, params?: Record<string, string>): Promise<{ data: T; totalPages: number }> {
  const base = requireBaseUrl();
  const auth = getAuth();
  const search = new URLSearchParams(params);
  const url = `${base}${path}${search.toString() ? `?${search.toString()}` : ''}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(auth ? { Authorization: `Basic ${auth}` } : {}),
  };

  try {
    const res = await fetch(url, {
      headers,
      next: { revalidate: REVALIDATE },
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 403) {
        console.error(
          `WooCommerce API 403 at ${path}. Check HOSTING.md "Fixing WooCommerce 403". Ensure NEXT_PUBLIC_WC_API_URL matches your WordPress domain (e.g. https://www.9gk.22b.myftpupload.com/wp-json/wc/v3), WC keys are set in the host env, and no firewall/plugin is blocking server requests.`
        );
      }
      throw new Error(`WooCommerce API error ${res.status}: ${text}`);
    }

    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10);
    const data = await res.json() as T;
    return { data, totalPages };
  } catch (error) {
    if (process.env.NODE_ENV === 'production' && error instanceof Error && error.message.includes('403')) {
      // Already logged above; avoid duplicate long messages in prod
    } else {
      console.error(`wcFetch error at ${path}:`, error instanceof Error ? error.message : String(error));
    }
    throw error;
  }
}

async function wcPost<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const base = requireBaseUrl();
  const auth = getAuth();
  const url = `${base}${path}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(auth ? { Authorization: `Basic ${auth}` } : {}),
  };
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WooCommerce API error ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

/**
 * Get category ID from slug by fetching all categories and mapping.
 * WooCommerce API requires category ID for filtering, not slug.
 */
async function getCategoryIdFromSlug(slug: string): Promise<string | null> {
  try {
    // Check cache first
    if (categoryCache && categoryCache.has(slug)) {
      return categoryCache.get(slug) || null;
    }

    const { data } = await wcFetch<Array<{ id: number; slug: string }>>('/products/categories', {
      per_page: '100',
      hide_empty: '0',
    });
    const arr = Array.isArray(data) ? data : [];

    // Cache the mapping for future use
    if (arr.length > 0) {
      categoryCache = new Map(arr.map((c) => [c.slug, String(c.id)]));
    }

    const category = arr.find((c) => c.slug === slug);
    return category ? String(category.id) : null;
  } catch (error) {
    console.error(`Error getting category ID for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch products from WooCommerce REST API.
 * Supports per_page, category slug (will be converted to ID), search, orderby.
 * Returns empty array if API is unavailable.
 */
async function fetchWooProducts(params: {
  per_page?: number;
  category?: string;
  search?: string;
  orderby?: string;
  order?: 'asc' | 'desc';
  fetchAll?: boolean;
}): Promise<WooProductRaw[]> {
  try {
    // WooCommerce max per_page is 100
    const perPage = Math.min(params.per_page ?? 100, 100);
    const searchParams: Record<string, string> = {
      per_page: String(perPage),
      status: 'publish',
    };

    // Convert category slug to ID if provided
    let categoryId: string | null = null;
    if (params.category) {
      categoryId = await getCategoryIdFromSlug(params.category);
      if (categoryId) {
        searchParams.category = categoryId;
      } else {
        console.warn(`Category slug "${params.category}" not found`);
        // Return empty array if category doesn't exist
        return [];
      }
    }

    if (params.search) searchParams.search = params.search;
    if (params.orderby) searchParams.orderby = params.orderby;
    if (params.order) searchParams.order = params.order;

    // Fetch first page
    const { data: firstPage, totalPages } = await wcFetch<WooProductRaw[]>('/products', searchParams);
    let allProducts = Array.isArray(firstPage) ? firstPage : [];

    // If fetchAll is true and there are more pages, fetch them all
    if (params.fetchAll && totalPages > 1) {
      const pagePromises: Promise<{ data: WooProductRaw[]; totalPages: number }>[] = [];
      for (let page = 2; page <= totalPages; page++) {
        pagePromises.push(
          wcFetch<WooProductRaw[]>('/products', { ...searchParams, page: String(page) })
        );
      }
      const results = await Promise.all(pagePromises);
      for (const { data: pageData } of results) {
        const arr = Array.isArray(pageData) ? pageData : [];
        allProducts = allProducts.concat(arr);
      }
    }

    return allProducts;
  } catch (error) {
    console.error('fetchWooProducts error:', error instanceof Error ? error.message : String(error));
    // Return empty array instead of throwing - prevents build failures
    return [];
  }
}

/**
 * Fetch single product by slug (WC doesn't have slug endpoint in v3; we fetch by slug via filter).
 * Returns null if API is unavailable instead of throwing.
 */
async function fetchProductBySlug(slug: string): Promise<WooProductRaw | null> {
  try {
    const { data: list } = await wcFetch<WooProductRaw[]>('/products', {
      slug,
      per_page: '1',
      status: 'publish',
    });
    const arr = Array.isArray(list) ? list : [];
    return arr[0] ?? null;
  } catch (error) {
    console.error(`fetchProductBySlug error for ${slug}:`, error instanceof Error ? error.message : String(error));
    // Return null instead of throwing
    return null;
  }
}

/**
 * Get all product categories from WooCommerce (for pills/filters).
 */
export async function getCategories(): Promise<Array<{ slug: string; label: string; count: number }>> {
  if (!getBaseUrl()) return [];
  try {
    const { data } = await wcFetch<Array<{ id: number; slug: string; name: string; count: number }>>('/products/categories', {
      per_page: '100',
      hide_empty: '1',
    });
    const arr = Array.isArray(data) ? data : [];

    // Cache the slug->ID mapping for use in getCategoryIdFromSlug
    if (arr.length > 0) {
      categoryCache = new Map(arr.map((c) => [c.slug, String(c.id)]));
    }

    // Sort alphabetically by label
    return arr
      .map((c) => ({ slug: c.slug, label: c.name, count: c.count ?? 0 }))
      .sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    console.error('Failed to fetch categories:', error instanceof Error ? error.message : String(error));
    return [];
  }
}

/**
 * Get products (UI Product[]). Optional filters: limit, category, minPrice, maxPrice, newOnly.
 * Gracefully handles API failures by returning empty array instead of throwing.
 */
export async function getProducts(options?: {
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  newOnly?: boolean;
}): Promise<Product[]> {
  if (!getBaseUrl()) return [];

  try {
    const perPage = options?.limit ?? 100;
    const category = options?.category;
    const newOnly = options?.newOnly;

    let raw: WooProductRaw[];
    if (newOnly) {
      raw = await fetchWooProducts({
        per_page: Math.max(perPage, 50),
        orderby: 'date',
        order: 'desc',
        fetchAll: true,
      });
      raw = raw.slice(0, 20);
    } else {
      raw = await fetchWooProducts({
        per_page: 100,
        category: category,
        fetchAll: true,
      });
    }

    let normalized: NormalizedProduct[] = raw.map(mapWooProduct);

    if (options?.minPrice != null) {
      normalized = normalized.filter((p) => parseFloat(p.price) >= options.minPrice!);
    }
    if (options?.maxPrice != null) {
      normalized = normalized.filter((p) => parseFloat(p.price) <= options.maxPrice!);
    }

    const products = normalized.map((n) =>
      normalizedToProduct(n, !!newOnly)
    );
    return products.slice(0, options?.limit ?? products.length);
  } catch (error) {
    console.error('Failed to fetch products:', error instanceof Error ? error.message : String(error));
    // Return empty array instead of crashing - let page render without products
    return [];
  }
}

/**
 * Get single product by slug. Returns null if not found.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!getBaseUrl()) return null;
  const raw = await fetchProductBySlug(slug);
  if (!raw) return null;
  const normalized = mapWooProduct(raw);
  return normalizedToProduct(normalized);
}

/**
 * Fetch multiple products by their WooCommerce numeric IDs in a single API call.
 * Uses ?include=id1,id2,id3 — far more reliable than N separate slug lookups.
 * Results are re-sorted to match the caller's requested order.
 */
export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (!ids.length || !getBaseUrl()) return [];
  try {
    const { data } = await wcFetch<WooProductRaw[]>('/products', {
      include: ids.join(','),
      per_page: String(Math.min(ids.length, 100)),
      status: 'publish',
    });
    const raw = Array.isArray(data) ? data : [];
    const products = raw.map(mapWooProduct).map((normalized) => normalizedToProduct(normalized));
    // WooCommerce doesn't honour the include order — re-sort to match caller's order
    const idOrder: Record<string, number> = {};
    ids.forEach((id, i) => { idOrder[id] = i; });
    return products.sort((a, b) => (idOrder[a.id] ?? 99) - (idOrder[b.id] ?? 99));
  } catch (err) {
    console.error('getProductsByIds error:', err instanceof Error ? err.message : String(err));
    return [];
  }
}

/**
 * Get products by category slug.
 */
export async function getProductsByCategory(category: string, limit = 50): Promise<Product[]> {
  return getProducts({ category, limit });
}

/**
 * Search products by query string.
 */
export async function searchProducts(query: string, limit = 50): Promise<Product[]> {
  if (!getBaseUrl()) return [];
  const raw = await fetchWooProducts({ search: query, per_page: limit });
  const normalized = raw.map(mapWooProduct);
  return normalized.map((n) => normalizedToProduct(n));
}

/**
 * Map WooCommerce raw review to UI ProductReview.
 */
function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function mapWooReview(raw: WooProductReviewRaw): ProductReview {
  const dateStr = raw.date_created ?? raw.date_created_gmt ?? '';
  const date = dateStr
    ? (() => {
      try {
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
      } catch {
        return dateStr;
      }
    })()
    : '';

  const reviewText = (raw.review as string) ?? '';
  return {
    id: String(raw.id),
    name: (raw.reviewer as string) ?? 'Anonymous',
    rating: typeof raw.rating === 'number' ? raw.rating : 0,
    comment: stripHtml(reviewText) || reviewText,
    date,
    verified: !!raw.verified,
  };
}

/**
 * Fetch product reviews from WooCommerce (same data as in WP admin → Comments / product reviews).
 * Returns empty array if API is unavailable or product has no reviews.
 */
export async function getProductReviews(productId: string): Promise<ProductReview[]> {
  if (!getBaseUrl() || !getAuth()) return [];
  try {
    const { data } = await wcFetch<WooProductReviewRaw[]>('/products/reviews', {
      product_id: productId,
      per_page: '50',
      orderby: 'date',
      order: 'desc',
      status: 'approved',
    });
    const arr = Array.isArray(data) ? data : [];
    return arr.map(mapWooReview);
  } catch (error) {
    console.error('getProductReviews error:', error instanceof Error ? error.message : String(error));
    return [];
  }
}

/**
 * Create a product review in WooCommerce (stored as comment; appears in WP admin product reviews).
 * Requires WC API credentials. Reviewer name, email, review text and rating are saved.
 */
export async function createProductReview(params: {
  product_id: number | string;
  reviewer: string;
  reviewer_email: string;
  review: string;
  rating: number;
}): Promise<ProductReview | null> {
  if (!getBaseUrl() || !getAuth()) return null;
  try {
    const body = {
      product_id: typeof params.product_id === 'string' ? parseInt(params.product_id, 10) : params.product_id,
      reviewer: params.reviewer.trim(),
      reviewer_email: params.reviewer_email.trim(),
      review: params.review.trim(),
      rating: Math.min(5, Math.max(1, Math.round(params.rating))),
    };
    const raw = await wcPost<WooProductReviewRaw>('/products/reviews', body);
    return mapWooReview(raw as WooProductReviewRaw);
  } catch (error) {
    console.error('createProductReview error:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}

/**
 * Checkout URL on WordPress — add-to-cart redirect.
 * Safe to call from client (uses only NEXT_PUBLIC_WC_CHECKOUT_URL).
 * Product ID is WooCommerce product id; optional quantity for cart.
 */
export function getCheckoutUrl(productId: string, quantity = 1): string {
  const base = process.env.NEXT_PUBLIC_WC_CHECKOUT_URL ?? 'https://9gk.22b.myftpupload.com/checkout';
  const url = new URL(base);
  url.searchParams.set('add-to-cart', productId);
  if (quantity > 1) url.searchParams.set('quantity', String(quantity));
  return url.toString();
}

/**
 * Provider-style interface for future backend swap.
 */
export const commerceProvider = {
  getProducts,
  getProductBySlug,
  getProductsByCategory,
  searchProducts,
  getCategories,
  getCheckoutUrl,
};
