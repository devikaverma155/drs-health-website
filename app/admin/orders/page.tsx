import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { orderDate: 'desc' },
    include: { client: true, orderItems: true, dispatches: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Orders & Dispatch</h1>
        <Link
          href="/admin/orders/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          New Order
        </Link>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No orders yet. Create orders and record dispatch to deduct from finished goods.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Order date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Dispatches</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${o.id}`} className="font-medium text-primary hover:underline">
                      {o.client?.companyName ?? 'Unknown'}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{o.orderDate ? new Date(o.orderDate).toLocaleDateString() : '-'}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                      {o.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{o.orderItems.length}</td>
                  <td className="px-4 py-3 text-slate-600">{o.dispatches.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
