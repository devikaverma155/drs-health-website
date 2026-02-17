/**
 * WooCommerce REST API raw product shape (subset we use).
 * See: https://woocommerce.github.io/woocommerce-rest-api-docs/
 */
export interface WooProductRaw {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description?: string;
  short_description?: string;
  images?: Array<{ id: number; src: string; name?: string; alt?: string }>;
  categories?: Array<{ id: number; name: string; slug: string }>;
  stock_status?: 'instock' | 'outofstock' | 'onbackorder';
  date_created?: string;
  [key: string]: unknown;
}

/**
 * Normalized product shape from WooCommerce (internal data layer).
 */
export interface NormalizedProduct {
  id: string;
  name: string;
  slug: string;
  price: string;
  regularPrice: string;
  salePrice: string;
  image: string | null;
  gallery: string[];
  description: string;
  shortDescription: string;
  categories: Array<{ id: number; name: string; slug: string }>;
  stockStatus: string;
  permalink: string;
}

/**
 * UI-facing Product type (unchanged from previous Shopify abstraction).
 * Components consume this; adapter converts NormalizedProduct → Product.
 */
export interface ProductVariant {
  id: string;
  title: string;
  price: string;
  compareAtPrice?: string;
  available: boolean;
  quantityAvailable?: number;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  featuredImage?: { url: string; altText?: string };
  images?: Array<{ url: string; altText?: string }>;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  compareAtPriceRange?: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: ProductVariant[];
  tags?: string[];
  category?: string;
  categorySlug?: string;
  rating?: number;
  reviewCount?: number;
  isNewLaunch?: boolean;
  permalink?: string;
}
