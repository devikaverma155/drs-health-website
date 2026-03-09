import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function FinishedGoodsPage() {
  const batches = await prisma.finishedGoodsBatch.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: true },
  });

  // Total quantity available per product (sum of all batches)
  const totalByProduct = batches.reduce((acc, b) => {
    const id = b.productId ?? '';
    const name = b.product?.name ?? 'Unknown';
    if (!acc[id]) acc[id] = { productId: id, productName: name, total: 0 };
    acc[id].total += Number(b.quantityAvailable ?? 0);
    return acc;
  }, {} as Record<string, { productId: string; productName: string; total: number }>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Finished Goods Inventory</h1>
      </div>
      <p className="text-sm text-slate-600">
        Total quantity is <strong>added</strong> when production is completed and <strong>deducted</strong> when an order is dispatched. Each batch shows its available qty; total per product is below.
      </p>

      {/* Total quantity per product */}
      {Object.keys(totalByProduct).length > 0 && (
        <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
          <h2 className="px-4 py-3 text-sm font-medium text-slate-700 bg-slate-50/50 border-b border-slate-200">Total quantity available (by product)</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Total available</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(totalByProduct).map(({ productId, productName, total }) => (
                <tr key={productId} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{productName}</td>
                  <td className="px-4 py-3 text-slate-700">{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        <h2 className="px-4 py-3 text-sm font-medium text-slate-700 bg-slate-50/50 border-b border-slate-200">Batches (per-batch qty)</h2>
        {batches.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No finished goods batches yet. Stock increases when production is completed and decreases when orders are dispatched.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Batch</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Qty available</th>
                <th className="px-4 py-3 font-medium">Mfg / Expiry</th>
                <th className="px-4 py-3 font-medium">Actions</th>
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
                  <td className="px-4 py-3">
                    <Link href={`/admin/finished-goods/${b.id}`} className="text-primary font-medium hover:underline">Edit</Link>
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
