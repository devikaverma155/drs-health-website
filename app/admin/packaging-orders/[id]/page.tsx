import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPackagingOrder } from '../actions';
import { PackagingOrderForm } from '../PackagingOrderForm';

export const dynamic = 'force-dynamic';

export default async function PackagingOrderEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getPackagingOrder(id);
  if (!order) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/vendor-orders" className="text-sm text-slate-500 hover:text-slate-900">← RM & PM Vendor Orders</Link>
      <div className="rounded-xl bg-white border border-slate-200 p-6">
        <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Packaging Order</h1>
        <PackagingOrderForm order={order} />
      </div>
    </div>
  );
}
