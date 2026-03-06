import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' },
    include: { category: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Product Master</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/product-categories"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Categories
          </Link>
          <Link
            href="/admin/products/new"
            className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
          >
            Add Product
          </Link>
        </div>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {products.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No products in the system yet. Add product name, category, pack size, MRP, and standard batch size.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Pack size</th>
                <th className="px-4 py-3 font-medium">MRP</th>
                <th className="px-4 py-3 font-medium">Batch size</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/products/${p.id}`} className="font-medium text-primary hover:underline">
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.category?.name ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{p.packSize ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{p.mrp != null ? String(p.mrp) : '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{p.standardBatchSize ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600">
        Storefront products are managed via WooCommerce. Product master here is for BOM, production, and dispatch.
      </div>
    </div>
  );
}
