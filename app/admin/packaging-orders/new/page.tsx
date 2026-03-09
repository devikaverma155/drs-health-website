import Link from 'next/link';
import { PackagingOrderForm } from '../PackagingOrderForm';

export const dynamic = 'force-dynamic';

export default function NewPackagingOrderPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/vendor-orders" className="text-sm text-slate-500 hover:text-slate-900">← RM & PM Vendor Orders</Link>
      <div className="rounded-xl bg-white border border-slate-200 p-6">
        <h1 className="text-xl font-semibold text-slate-900 mb-6">Add Packaging Order</h1>
        <PackagingOrderForm />
      </div>
    </div>
  );
}
