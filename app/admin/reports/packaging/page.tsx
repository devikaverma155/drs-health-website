import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function PackagingReportPage() {
  const materials = await prisma.packagingMaterial.findMany({
    orderBy: { name: 'asc' },
    include: { batches: true, supplier: true },
  });

  const withTotals = materials.map((m) => {
    const batchQty = m.batches.reduce((s, b) => s + Number(b.quantity ?? 0), 0);
    const total = batchQty || Number(m.quantity ?? 0);
    return { ...m, totalQty: total };
  });

  return (
    <div className="space-y-6">
      <Link href="/admin/reports" className="text-sm text-slate-500 hover:text-slate-900">← Reports</Link>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-900">Packaging inventory report</h1>
        <a
          href="/admin/api/reports/packaging/csv"
          download
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <span>↓</span> Download CSV
        </a>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {withTotals.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No packaging materials in the system yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Unit</th>
                <th className="px-4 py-3 font-medium">Supplier</th>
                <th className="px-4 py-3 font-medium">Quantity</th>
                <th className="px-4 py-3 font-medium">Batches</th>
              </tr>
            </thead>
            <tbody>
              {withTotals.map((m) => (
                <tr key={m.id} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{m.packagingCode ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-700">{m.name ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{m.unit ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{m.supplier?.name ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-700">{m.quantity != null ? String(m.quantity) : m.totalQty}</td>
                  <td className="px-4 py-3 text-slate-600">{m.batches.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
