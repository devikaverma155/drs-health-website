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
                <th className="px-4 py-3 font-medium">Batches</th>
                <th className="px-4 py-3 font-medium">Min stock</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => {
                const totalQty = m.batches.reduce((s, b) => s + Number(b.quantity ?? 0), 0);
                const min = Number(m.minStock ?? 0);
                const isLow = min > 0 && totalQty < min;
                return (
                  <tr key={m.id} className={`border-b border-slate-100 hover:bg-slate-50/50 ${isLow ? 'bg-amber-50/50' : ''}`}>
                    <td className="px-4 py-3 font-medium text-primary">
                      <Link href={`/admin/raw-material-inventory/${m.id}`} className="hover:underline">
                        {m.materialCode || '-'}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{m.name || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{m.unit || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{m.batches.length} ({totalQty})</td>
                    <td className="px-4 py-3 text-slate-600">{m.minStock != null ? String(m.minStock) : '-'}</td>
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
