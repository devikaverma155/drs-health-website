/**
 * Shopify-compatible types for future Storefront API integration.
 * Replace mock implementations with real API calls when integrating.
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
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: ProductVariant & { product: Pick<Product, 'id' | 'title' | 'handle' | 'featuredImage'> };
}

export interface Cart {
  id: string;
  lines: CartLine[];
  cost: { subtotalAmount: { amount: string; currencyCode: string } };
}
