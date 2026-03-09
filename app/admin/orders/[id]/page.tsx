import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { OrderForm } from '../OrderForm';
import { OrderItemsSection } from '../OrderItemsSection';
import { DispatchesSection } from '../DispatchesSection';
import { deleteOrder } from '../actions';
import { DeleteButton } from '@/components/ui/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { client: true, orderItems: { include: { product: true } }, dispatches: true },
  });
  if (!order) notFound();
  const clients = await prisma.client.findMany({ orderBy: { companyName: 'asc' }, select: { id: true, companyName: true } });
  const products = await prisma.product.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } });

  return (
    <div className="space-y-6">
      <Link href="/admin/orders" className="text-sm text-slate-500 hover:text-slate-900">← Orders & Dispatch</Link>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Order</h1>
            <OrderForm order={order} clients={clients} />
          </div>
          <OrderItemsSection orderId={order.id} items={order.orderItems} products={products} />
          <DispatchesSection orderId={order.id} dispatches={order.dispatches} />
        </div>
        <div>
          <div className="rounded-xl bg-white border border-slate-200 p-6 sticky top-6">
            <DeleteButton action={deleteOrder.bind(null, order.id)} label="Delete Order" redirectPath="/admin/orders" />
          </div>
        </div>
      </div>
    </div>
  );
}
