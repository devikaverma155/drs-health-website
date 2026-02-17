import type { WooProductRaw } from './types';
import type { NormalizedProduct, Product, ProductVariant } from './types';

const CURRENCY = 'INR';

/**
 * Map WooCommerce API product to normalized internal format.
 */
export function mapWooProduct(raw: WooProductRaw): NormalizedProduct {
  const price = raw.price ?? raw.regular_price ?? '0';
  const regularPrice = raw.regular_price ?? price;
  const salePrice = raw.sale_price && raw.sale_price !== '' ? raw.sale_price : regularPrice;
  const firstImage = raw.images?.[0]?.src ?? null;
  const gallery = (raw.images ?? []).map((img) => img.src).filter(Boolean);

  return {
    id: String(raw.id),
    name: raw.name ?? '',
    slug: raw.slug ?? '',
    price,
    regularPrice,
    salePrice,
    image: firstImage,
    gallery,
    description: raw.description ?? '',
    shortDescription: raw.short_description ?? '',
    categories: raw.categories ?? [],
    stockStatus: raw.stock_status ?? 'instock',
    permalink: raw.permalink ?? '',
  };
}

/**
 * Convert normalized product to UI Product type (unchanged component contract).
 */
export function normalizedToProduct(n: NormalizedProduct, isNewLaunch = false): Product {
  const price = n.salePrice && parseFloat(n.salePrice) < parseFloat(n.regularPrice) ? n.salePrice : n.price;
  const comparePrice = n.regularPrice && parseFloat(n.regularPrice) > parseFloat(price) ? n.regularPrice : undefined;
  const variant: ProductVariant = {
    id: `${n.id}-0`,
    title: 'Default',
    price,
    compareAtPrice: comparePrice,
    available: n.stockStatus === 'instock',
  };
  const category = n.categories[0];
  return {
    id: n.id,
    handle: n.slug,
    title: n.name,
    description: n.description || n.shortDescription,
    featuredImage: n.image ? { url: n.image, altText: n.name } : undefined,
    images: n.gallery.map((url) => ({ url, altText: n.name })),
    priceRange: { minVariantPrice: { amount: price, currencyCode: CURRENCY } },
    compareAtPriceRange: comparePrice
      ? { minVariantPrice: { amount: comparePrice, currencyCode: CURRENCY } }
      : undefined,
    variants: [variant],
    category: category?.name,
    categorySlug: category?.slug,
    isNewLaunch,
    permalink: n.permalink,
  };
}
