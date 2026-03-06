import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function FinishedGoodsPage() {
  const batches = await prisma.finishedGoodsBatch.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Finished Goods Inventory</h1>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {batches.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No finished goods batches yet. Stock increases after production and decreases after dispatch.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Batch</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Qty available</th>
                <th className="px-4 py-3 font-medium">Mfg / Expiry</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((b) => (
                <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-slate-900">{b.batchNumber || b.id.slice(0, 8)}</td>
                  <td className="px-4 py-3 text-slate-600">{b.product?.name ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{b.quantityAvailable != null ? String(b.quantityAvailable) : '-'}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {b.manufacturingDate ? new Date(b.manufacturingDate).toLocaleDateString() : '-'}
                    {' / '}
                    {b.expiryDate ? new Date(b.expiryDate).toLocaleDateString() : '-'}
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
