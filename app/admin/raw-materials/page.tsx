import { prisma } from '@/lib/prisma';
import { RawMaterialOrderForm } from './RawMaterialOrderForm';

export const dynamic = 'force-dynamic';

export default async function RawMaterialsPage() {
  const orders = await prisma.rawMaterialOrder.findMany({
    include: {
      vendor: true,
    },
    orderBy: { orderDate: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Raw Material Orders</h1>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 p-6">
        <RawMaterialOrderForm />
      </div>

      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No orders yet. Add your first raw material order above.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Order Date</th>
                <th className="px-4 py-3 font-medium">Vendor</th>
                <th className="px-4 py-3 font-medium">Material Type</th>
                <th className="px-4 py-3 font-medium">Quantity</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Delivery Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3 text-slate-600">
                    {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-4 py-3">
                    {order.vendor ? (
                      <div>
                        <div className="font-medium text-slate-900">{order.vendor.name}</div>
                        {order.vendor.contactPerson && (
                          <div className="text-xs text-slate-500">{order.vendor.contactPerson}</div>
                        )}
                        {order.vendor.phone && (
                          <div className="text-xs text-slate-500">{order.vendor.phone}</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{order.materialType || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {order.quantity && order.unit ? `${order.quantity} ${order.unit}` : order.quantity || '-'}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {order.price ? `₹${parseFloat(order.price.toString()).toLocaleString('en-IN')}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'ordered' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {order.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 max-w-xs truncate" title={order.notes || ''}>
                    {order.notes || '-'}
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
