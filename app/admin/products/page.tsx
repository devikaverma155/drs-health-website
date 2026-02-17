import Link from 'next/link';
import { getProducts } from '@/lib/shopify-admin';
import { ProductsTable } from './ProductsTable';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          Add product
        </Link>
      </div>
      <p className="text-sm text-slate-500">
        Products are stored in the database for now. Storefront products come from WooCommerce.
      </p>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        <ProductsTable products={products} />
      </div>
    </div>
  );
}
