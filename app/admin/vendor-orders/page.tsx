import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { isVendorOrderReceivedStatus } from '@/lib/vendor-order-status';

export const dynamic = 'force-dynamic';

type VendorOrderRow = {
  id: string;
  category: 'Raw Material' | 'Packaging';
  orderDate: Date | null;
  vendorName: string | null;
  materialInfo: string;
  quantityInfo: string;
  status: string | null;
  editHref: string;
};

export default async function VendorOrdersPage() {
  const [rmOrders, pmOrders] = await Promise.all([
    prisma.rawMaterialOrder.findMany({
      orderBy: { orderDate: 'desc' },
      include: { vendor: true, rawMaterial: true },
    }),
    prisma.packagingOrder.findMany({
      orderBy: { orderDate: 'desc' },
      include: { vendor: true, packaging: true },
    }),
  ]);

  const rows: VendorOrderRow[] = [
    ...rmOrders.map((o) => ({
      id: o.id,
      category: 'Raw Material' as const,
      orderDate: o.orderDate,
      vendorName: o.vendor?.name ?? null,
      materialInfo: o.rawMaterial?.name || o.materialType || '-',
      quantityInfo: o.quantity && o.unit ? `${o.quantity} ${o.unit}` : o.quantity || '-',
      status: o.status,
      editHref: `/admin/raw-materials/${o.id}`,
    })),
    ...pmOrders.map((o) => ({
      id: o.id,
      category: 'Packaging' as const,
      orderDate: o.orderDate,
      vendorName: o.vendor?.name ?? null,
      materialInfo: o.packaging?.name || o.materialType || '-',
      quantityInfo: o.quantity && o.unit ? `${o.quantity} ${o.unit}` : o.quantity || '-',
      status: o.status,
      editHref: `/admin/packaging-orders/${o.id}`,
    })),
  ].sort((a, b) => {
    const da = a.orderDate ? new Date(a.orderDate).getTime() : 0;
    const db = b.orderDate ? new Date(b.orderDate).getTime() : 0;
    return db - da;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-semibold text-slate-900">RM & PM Vendor Orders</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/raw-materials"
            className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
          >
            Add RM Order
          </Link>
          <Link
            href="/admin/packaging-orders/new"
            className="rounded-lg border border-slate-300 text-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Add PM Order
          </Link>
        </div>
      </div>
      <p className="text-sm text-slate-600">
        When status is <strong>Delivered</strong> and a material is linked, the quantity is received into stock (batch + totals).
      </p>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {rows.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No vendor orders yet. Use &quot;Add RM Order&quot; or &quot;Add PM Order&quot; above.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Order Date</th>
                <th className="px-4 py-3 font-medium">Vendor</th>
                <th className="px-4 py-3 font-medium">Material</th>
                <th className="px-4 py-3 font-medium">Qty</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      r.category === 'Raw Material' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {r.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {r.orderDate ? new Date(r.orderDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">{r.vendorName ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{r.materialInfo}</td>
                  <td className="px-4 py-3 text-slate-600">{r.quantityInfo}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      isVendorOrderReceivedStatus(r.status) ? 'bg-green-100 text-green-700' :
                      r.status === 'ordered' ? 'bg-blue-100 text-blue-700' :
                      r.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {r.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={r.editHref} className="text-primary font-medium hover:underline">Edit</Link>
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
