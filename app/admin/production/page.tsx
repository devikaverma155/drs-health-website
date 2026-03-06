import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProductionPage() {
  const batches = await prisma.productionBatch.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Production Batches</h1>
        <Link
          href="/admin/production/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          New Batch
        </Link>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {batches.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No production batches yet. Create a batch to record quantity produced.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Batch</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Quantity</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Mfg date</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((b) => (
                <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/production/${b.id}`} className="font-medium text-primary hover:underline">
                      {b.batchNumber || b.id.slice(0, 8)}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{b.product?.name ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{b.quantityProduced != null ? String(b.quantityProduced) : '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                      b.status === 'running' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {b.status || '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{b.manufacturingDate ? new Date(b.manufacturingDate).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
