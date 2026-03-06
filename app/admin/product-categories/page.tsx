import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProductCategoriesPage() {
  const categories = await prisma.productCategory.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Product Categories</h1>
        <Link href="/admin/product-categories/new" className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark">Add Category</Link>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No categories yet. Add capsule, syrup, oil, powder, etc.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/product-categories/${c.id}`} className="font-medium text-primary hover:underline">{c.name}</Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{c.description ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Link href="/admin/products" className="text-sm text-slate-500 hover:text-slate-900">← Product Master</Link>
    </div>
  );
}
