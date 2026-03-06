import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function FinishedGoodsReportPage() {
  const batches = await prisma.finishedGoodsBatch.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: true },
  });

  const totalQty = batches.reduce((s, b) => s + Number(b.quantityAvailable ?? 0), 0);

  return (
    <div className="space-y-6">
      <Link href="/admin/reports" className="text-sm text-slate-500 hover:text-slate-900">← Reports</Link>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-900">Finished goods stock report</h1>
        <a
          href="/admin/api/reports/finished-goods/csv"
          download
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <span>↓</span> Download CSV
        </a>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 p-4 mb-6">
        <p className="text-sm text-slate-600">Total batches: <span className="font-semibold text-slate-900">{batches.length}</span></p>
        <p className="text-sm text-slate-600">Total quantity available: <span className="font-semibold text-slate-900">{totalQty}</span></p>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {batches.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No finished goods batches yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Batch</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Qty available</th>
                <th className="px-4 py-3 font-medium">Mfg date</th>
                <th className="px-4 py-3 font-medium">Expiry date</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((b) => (
                <tr key={b.id} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{b.batchNumber ?? b.id.slice(0, 8)}</td>
                  <td className="px-4 py-3 text-slate-700">{b.product?.name ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-700">{b.quantityAvailable != null ? String(b.quantityAvailable) : '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{b.manufacturingDate ? new Date(b.manufacturingDate).toLocaleDateString() : '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{b.expiryDate ? new Date(b.expiryDate).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
