/**
 * WooCommerce data layer — single commerce data source.
 * Server-side only; never expose consumer key/secret to client.
 */

import type { WooProductRaw } from './types';
import { mapWooProduct, normalizedToProduct } from './mapProduct';
import type { NormalizedProduct, Product } from './types';

const REVALIDATE = 60;

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

async function wcFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  const base = requireBaseUrl();
  const auth = getAuth();
  const search = new URLSearchParams(params);
  const url = `${base}${path}${search.toString() ? `?${search.toString()}` : ''}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(auth ? { Authorization: `Basic ${auth}` } : {}),
  };
  const res = await fetch(url, {
    headers,
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WooCommerce API error ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

/**
 * Fetch products from WooCommerce REST API.
 * Supports per_page, category slug, search, orderby.
 */
async function fetchWooProducts(params: {
  per_page?: number;
  category?: string;
  search?: string;
  orderby?: string;
  order?: 'asc' | 'desc';
}): Promise<WooProductRaw[]> {
  const searchParams: Record<string, string> = {
    per_page: String(params.per_page ?? 100),
    status: 'publish',
  };
  if (params.category) searchParams.category = String(params.category);
  if (params.search) searchParams.search = params.search;
  if (params.orderby) searchParams.orderby = params.orderby;
  if (params.order) searchParams.order = params.order;

  const data = await wcFetch<WooProductRaw[]>( '/products', searchParams);
  return Array.isArray(data) ? data : [];
}

/**
 * Fetch single product by slug (WC doesn't have slug endpoint in v3; we fetch by slug via filter).
 */
async function fetchProductBySlug(slug: string): Promise<WooProductRaw | null> {
  const list = await wcFetch<WooProductRaw[]>('/products', {
    slug,
    per_page: '1',
    status: 'publish',
  });
  const arr = Array.isArray(list) ? list : [];
  return arr[0] ?? null;
}

/**
 * Get all product categories from WooCommerce (for pills/filters).
 */
export async function getCategories(): Promise<Array<{ slug: string; label: string }>> {
  if (!getBaseUrl()) return getCategoriesFallback();
  try {
    const data = await wcFetch<Array<{ slug: string; name: string }>>('/products/categories', {
      per_page: '100',
      hide_empty: '1',
    });
    const arr = Array.isArray(data) ? data : [];
    return arr.map((c) => ({ slug: c.slug, label: c.name }));
  } catch {
    return getCategoriesFallback();
  }
}

function getCategoriesFallback(): Array<{ slug: string; label: string }> {
  return [
    { slug: 'weight-management', label: 'Weight Management' },
    { slug: 'liver-care', label: 'Liver Care' },
    { slug: 'immunity', label: 'Immunity' },
    { slug: 'diabetes', label: 'Diabetes' },
    { slug: 'digestive-care', label: 'Digestive Care' },
    { slug: 'anti-migraine', label: 'Anti-migraine' },
    { slug: 'body-care', label: 'Body Care' },
    { slug: 'healthy-hairs', label: 'Healthy Hairs' },
    { slug: 'skin-disorders', label: 'Skin Disorders' },
  ];
}

/**
 * Get products (UI Product[]). Optional filters: limit, category, minPrice, maxPrice, newOnly.
 */
export async function getProducts(options?: {
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  newOnly?: boolean;
}): Promise<Product[]> {
  if (!getBaseUrl()) return [];
  const perPage = options?.limit ?? 100;
  const category = options?.category;
  const newOnly = options?.newOnly;

  let raw: WooProductRaw[];
  if (newOnly) {
    raw = await fetchWooProducts({
      per_page: Math.max(perPage, 50),
      orderby: 'date',
      order: 'desc',
    });
    raw = raw.slice(0, 20);
  } else {
    raw = await fetchWooProducts({
      per_page: category ? 100 : perPage,
    });
  }

  let normalized: NormalizedProduct[] = raw.map(mapWooProduct);

  if (category) {
    normalized = normalized.filter((p) =>
      p.categories.some((c) => c.slug === category)
    );
  }

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
 * Checkout URL on WordPress — add-to-cart redirect.
 * Safe to call from client (uses only NEXT_PUBLIC_WC_CHECKOUT_URL).
 * Product ID is WooCommerce product id; optional quantity for cart.
 */
export function getCheckoutUrl(productId: string, quantity = 1): string {
  const base = process.env.NEXT_PUBLIC_WC_CHECKOUT_URL ?? 'https://drshealth.in/checkout';
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
