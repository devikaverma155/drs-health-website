import Link from 'next/link';
import type { Product } from '@prisma/client';

export function ProductsTable({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 text-sm">
        No products yet. <Link href="/admin/products/new" className="text-primary hover:underline">Add one</Link>.
      </div>
    );
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
          <th className="px-4 py-3 font-medium">Title</th>
          <th className="px-4 py-3 font-medium">Handle</th>
          <th className="px-4 py-3 font-medium">Price</th>
          <th className="px-4 py-3 font-medium">Category</th>
          <th className="px-4 py-3 font-medium">Active</th>
          <th className="px-4 py-3 font-medium"></th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50/50">
            <td className="px-4 py-3">
              <Link href={`/admin/products/${p.id}`} className="font-medium text-primary hover:underline">
                {p.title}
              </Link>
            </td>
            <td className="px-4 py-3 text-slate-600">{p.handle}</td>
            <td className="px-4 py-3 text-slate-600">₹{Number(p.price).toFixed(2)}</td>
            <td className="px-4 py-3 text-slate-600">{p.category ?? '—'}</td>
            <td className="px-4 py-3">{p.active ? 'Yes' : 'No'}</td>
            <td className="px-4 py-3">
              <Link href={`/admin/products/${p.id}`} className="text-primary hover:underline">
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
