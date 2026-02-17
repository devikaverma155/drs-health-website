/**
 * Shopify abstraction layer.
 * Replace these with Storefront API calls when integrating Shopify.
 */

import type { Product, Cart } from './types';
import { MOCK_PRODUCTS, NEW_LAUNCH_PRODUCTS } from './mock-data';

export async function getProducts(options?: {
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  newOnly?: boolean;
}): Promise<Product[]> {
  // TODO: Replace with Shopify Storefront API products query
  let products =
    options?.newOnly
      ? [...NEW_LAUNCH_PRODUCTS]
      : [...MOCK_PRODUCTS, ...NEW_LAUNCH_PRODUCTS];
  if (options?.category) {
    products = products.filter((p) => p.categorySlug === options.category);
  }
  if (options?.minPrice != null) {
    products = products.filter((p) => parseFloat(p.priceRange.minVariantPrice.amount) >= options.minPrice!);
  }
  if (options?.maxPrice != null) {
    products = products.filter((p) => parseFloat(p.priceRange.minVariantPrice.amount) <= options.maxPrice!);
  }
  return products.slice(0, options?.limit ?? 12);
}

export async function getNewLaunches(): Promise<Product[]> {
  return [...NEW_LAUNCH_PRODUCTS];
}

export async function getProduct(handle: string): Promise<Product | null> {
  // TODO: Replace with Shopify Storefront API product query
  const all = [...MOCK_PRODUCTS, ...NEW_LAUNCH_PRODUCTS];
  return all.find((p) => p.handle === handle) ?? null;
}

export async function createCart(): Promise<Cart> {
  // TODO: Replace with Shopify cart create mutation
  return {
    id: 'mock-cart-id',
    lines: [],
    cost: { subtotalAmount: { amount: '0', currencyCode: 'INR' } },
  };
}

export async function addToCart(
  _cartId: string,
  _variantId: string,
  _quantity: number
): Promise<Cart> {
  // TODO: Replace with Shopify cartLinesAdd mutation
  return createCart();
}

export { MOCK_PRODUCTS, NEW_LAUNCH_PRODUCTS, CATEGORIES } from './mock-data';
export type { Product, ProductVariant, Cart, CartLine } from './types';
