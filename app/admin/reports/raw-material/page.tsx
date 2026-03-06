import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function RawMaterialReportPage() {
  const materials = await prisma.rawMaterial.findMany({
    orderBy: { name: 'asc' },
    include: { batches: true, supplier: true },
  });

  const withTotals = materials.map((m) => {
    const totalQty = m.batches.reduce((s, b) => s + Number(b.quantity ?? 0), 0);
    const min = Number(m.minStock ?? 0);
    const isLow = min > 0 && totalQty < min;
    return { ...m, totalQty, isLow };
  });

  return (
    <div className="space-y-6">
      <Link href="/admin/reports" className="text-sm text-slate-500 hover:text-slate-900">← Reports</Link>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-900">Raw material inventory report</h1>
        <a
          href="/admin/api/reports/raw-material/csv"
          download
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <span>↓</span> Download CSV
        </a>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {withTotals.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No raw materials in the system yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Unit</th>
                <th className="px-4 py-3 font-medium">Supplier</th>
                <th className="px-4 py-3 font-medium">Total stock</th>
                <th className="px-4 py-3 font-medium">Min stock</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {withTotals.map((m) => (
                <tr key={m.id} className={`border-b border-slate-100 ${m.isLow ? 'bg-amber-50/80' : ''}`}>
                  <td className="px-4 py-3 font-medium text-slate-900">{m.materialCode ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-700">{m.name ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{m.unit ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{m.supplier?.name ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-700">{m.totalQty}</td>
                  <td className="px-4 py-3 text-slate-600">{m.minStock != null ? String(m.minStock) : '-'}</td>
                  <td className="px-4 py-3">
                    {m.isLow ? (
                      <span className="text-amber-700 font-medium">Low stock</span>
                    ) : (
                      <span className="text-slate-500">OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
