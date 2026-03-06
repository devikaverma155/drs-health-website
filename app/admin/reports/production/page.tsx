import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ProductionReportPage() {
  const batches = await prisma.productionBatch.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: true },
  });

  const byStatus = batches.reduce<Record<string, number>>((acc, b) => {
    const s = b.status ?? 'unknown';
    acc[s] = (acc[s] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <Link href="/admin/reports" className="text-sm text-slate-500 hover:text-slate-900">← Reports</Link>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-900">Production batch history</h1>
        <a
          href="/admin/api/reports/production/csv"
          download
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <span>↓</span> Download CSV
        </a>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 p-4 mb-6 flex flex-wrap gap-6">
        <p className="text-sm text-slate-600">Total batches: <span className="font-semibold text-slate-900">{batches.length}</span></p>
        {Object.entries(byStatus).map(([status, count]) => (
          <p key={status} className="text-sm text-slate-600 capitalize">{status}: <span className="font-semibold text-slate-900">{count}</span></p>
        ))}
      </div>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {batches.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No production batches yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Batch</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Quantity</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Mfg date</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((b) => (
                <tr key={b.id} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{b.batchNumber ?? b.id.slice(0, 8)}</td>
                  <td className="px-4 py-3 text-slate-700">{b.product?.name ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-700">{b.quantityProduced != null ? String(b.quantityProduced) : '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${b.status === 'running' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                      {b.status ?? '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{b.manufacturingDate ? new Date(b.manufacturingDate).toLocaleDateString() : '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
