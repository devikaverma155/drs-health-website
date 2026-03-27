import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { isVendorOrderReceivedStatus } from '@/lib/vendor-order-status';

export const dynamic = 'force-dynamic';

export default async function PackagingOrdersPage() {
  const orders = await prisma.packagingOrder.findMany({
    orderBy: { orderDate: 'desc' },
    include: { vendor: true, packaging: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Packaging Orders</h1>
        <Link
          href="/admin/packaging-orders/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          Add Packaging Order
        </Link>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No packaging orders. <Link href="/admin/vendor-orders" className="text-primary hover:underline">Go to RM & PM Vendor Orders</Link> to add.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Order Date</th>
                <th className="px-4 py-3 font-medium">Vendor</th>
                <th className="px-4 py-3 font-medium">Material</th>
                <th className="px-4 py-3 font-medium">Qty</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3 text-slate-600">{o.orderDate ? new Date(o.orderDate).toLocaleDateString() : '-'}</td>
                  <td className="px-4 py-3">{o.vendor?.name ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{o.packaging?.name || o.materialType || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{o.quantity && o.unit ? `${o.quantity} ${o.unit}` : o.quantity || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      isVendorOrderReceivedStatus(o.status) ? 'bg-green-100 text-green-700' :
                      o.status === 'ordered' ? 'bg-blue-100 text-blue-700' :
                      o.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                    }`}>{o.status || 'pending'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/packaging-orders/${o.id}`} className="text-primary font-medium hover:underline">Edit</Link>
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
