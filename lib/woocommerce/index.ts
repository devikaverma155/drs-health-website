/**
 * WooCommerce commerce layer — single entry for product data.
 * Re-exports for components and API routes.
 */

export {
  getProducts,
  getProductBySlug,
  getProductsByCategory,
  searchProducts,
  getCategories,
  getCheckoutUrl,
  commerceProvider,
} from './woocommerce';

/** New arrivals: recent products (WooCommerce has no "new" flag; we use date). */
export async function getNewLaunches(limit = 10) {
  const { getProducts } = await import('./woocommerce');
  return getProducts({ newOnly: true, limit });
}

export { mapWooProduct, normalizedToProduct } from './mapProduct';

export type { Product, ProductVariant, NormalizedProduct } from './types';
