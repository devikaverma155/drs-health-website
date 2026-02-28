import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { RawMaterialBuyerForm } from '../RawMaterialBuyerForm';
import { deleteRawMaterialBuyer, createRawMaterialOrder } from '../actions';
import { DeleteButton } from '@/components/ui/DeleteButton';
import { RawMaterialOrderForm } from '../RawMaterialOrderForm';

export const dynamic = 'force-dynamic';

export default async function RawMaterialBuyerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const buyer = await prisma.rawMaterialBuyer.findUnique({
    where: { id },
    include: {
      orders: { orderBy: { orderDate: 'desc' } },
    },
  });

  if (!buyer) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/raw-materials" className="text-sm text-slate-500 hover:text-slate-900">
          ← Raw Materials
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Buyer</h1>
            <RawMaterialBuyerForm buyer={buyer} />
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h2 className="font-medium text-slate-900 mb-4">Orders</h2>
            {buyer.orders.length === 0 ? (
              <p className="text-sm text-slate-500 mb-4">No orders yet.</p>
            ) : (
              <div className="space-y-3 mb-4">
                {buyer.orders.map((order) => (
                  <div key={order.id} className="border border-slate-200 rounded-lg p-3 text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{order.materialType || 'Order'}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'ordered' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {order.status || 'pending'}
                      </span>
                    </div>
                    <p className="text-slate-600">Quantity: {order.quantity} {order.unit}</p>
                    {order.supplierName && <p className="text-slate-600">Supplier: {order.supplierName}</p>}
                    {order.deliveryDate && <p className="text-slate-600">Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</p>}
                    <p className="text-slate-500 text-xs mt-1">Ordered: {new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
            <RawMaterialOrderForm buyerId={buyer.id} />
          </div>
        </div>

        <div>
          <div className="rounded-xl bg-white border border-slate-200 p-6 sticky top-6">
            <DeleteButton
              action={deleteRawMaterialBuyer.bind(null, buyer.id)}
              label="Delete Buyer"
              redirectPath="/admin/raw-materials"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
