import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Products</h1>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 p-8 text-center">
        <p className="text-slate-500 mb-4">
          Products are managed through WooCommerce. Use the WooCommerce admin panel to manage products.
        </p>
        <p className="text-sm text-slate-400">
          Product data is synced from WooCommerce API and displayed on the storefront.
        </p>
      </div>
    </div>
  );
}
