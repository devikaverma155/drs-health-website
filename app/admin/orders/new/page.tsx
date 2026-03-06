import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { OrderForm } from '../OrderForm';

export const dynamic = 'force-dynamic';

export default async function NewOrderPage() {
  const clients = await prisma.client.findMany({ orderBy: { companyName: 'asc' }, select: { id: true, companyName: true } });
  return (
    <div className="space-y-6">
      <Link href="/admin/orders" className="text-sm text-slate-500 hover:text-slate-900">← Orders & Dispatch</Link>
      <h1 className="text-2xl font-semibold text-slate-900">New Order</h1>
      <OrderForm clients={clients} />
    </div>
  );
}
