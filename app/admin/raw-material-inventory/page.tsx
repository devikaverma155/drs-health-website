import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function RawMaterialInventoryPage() {
  const materials = await prisma.rawMaterial.findMany({
    orderBy: { name: 'asc' },
    include: { batches: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Raw Material Inventory</h1>
        <Link
          href="/admin/raw-material-inventory/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          Add Material
        </Link>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {materials.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No raw materials yet. Add materials and batches for stock tracking.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Unit</th>
                <th className="px-4 py-3 font-medium">Purchase Rate</th>
                <th className="px-4 py-3 font-medium">Available Stock</th>
                <th className="px-4 py-3 font-medium">Batches</th>
                <th className="px-4 py-3 font-medium">Min Stock</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => {
                const totalQty = m.batches.reduce((s, b) => s + Number(b.quantity ?? 0), 0);
                const min = Number(m.minStock ?? 0);
                const isLow = min > 0 && totalQty < min;
                const isOut = totalQty === 0;
                return (
                  <tr key={m.id} className={`border-b border-slate-100 hover:bg-slate-50/50 ${isLow ? 'bg-amber-50/50' : ''}`}>
                    <td className="px-4 py-3 font-medium text-primary">
                      <Link href={`/admin/raw-material-inventory/${m.id}`} className="hover:underline">
                        {m.materialCode || '-'}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">{m.name || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{m.unit || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {m.purchaseRate != null ? `₹${Number(m.purchaseRate).toFixed(2)}` : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${isOut ? 'text-red-600' : isLow ? 'text-amber-600' : 'text-green-700'}`}>
                        {totalQty.toLocaleString('en-IN', { maximumFractionDigits: 3 })} {m.unit || ''}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{m.batches.length} batch{m.batches.length !== 1 ? 'es' : ''}</td>
                    <td className="px-4 py-3 text-slate-600">{m.minStock != null ? `${m.minStock} ${m.unit || ''}` : '-'}</td>
                    <td className="px-4 py-3">
                      {isOut ? (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Out of Stock</span>
                      ) : isLow ? (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Low Stock</span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">In Stock</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
