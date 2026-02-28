import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function RawMaterialsPage() {
  const buyers = await prisma.rawMaterialBuyer.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Get order counts for each buyer
  const buyerIds = buyers.map(b => b.id).filter((id): id is string => id !== null);
  const orderCounts = buyerIds.length > 0
    ? await prisma.rawMaterialOrder.groupBy({
        by: ['buyerId'],
        _count: { id: true },
        where: {
          buyerId: { in: buyerIds },
        },
      })
    : [];

  const orderCountByBuyer = new Map<string, number>();
  for (const row of orderCounts) {
    if (row.buyerId) {
      orderCountByBuyer.set(row.buyerId, row._count.id);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Raw Material Buyers</h1>
        <Link
          href="/admin/raw-materials/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          Add Buyer
        </Link>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {buyers.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No buyers yet.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Contact Person</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Material</th>
                <th className="px-4 py-3 font-medium">Orders</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer) => (
                <tr key={buyer.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/raw-materials/${buyer.id}`} className="font-medium text-primary hover:underline">
                      {buyer.companyName || '-'}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{buyer.contactPerson || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{buyer.phone || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{buyer.email || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{buyer.materialRequired || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{orderCountByBuyer.get(buyer.id) ?? 0}</td>
                  <td className="px-4 py-3 text-slate-600">{buyer.location || '-'}</td>
                  <td className="px-4 py-3 text-slate-500">{buyer.createdAt ? new Date(buyer.createdAt).toLocaleDateString() : '-'}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/raw-materials/${buyer.id}`} className="text-sm text-primary hover:underline">
                      Edit
                    </Link>
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
