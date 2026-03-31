import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const STATUS_STYLES: Record<string, string> = {
  pending:    'bg-amber-100 text-amber-700',
  processing: 'bg-blue-100 text-blue-700',
  completed:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
  refunded:   'bg-slate-100 text-slate-600',
  'on-hold':  'bg-purple-100 text-purple-700',
};

const METHOD_STYLES: Record<string, { label: string; style: string }> = {
  razorpay: { label: 'Online (Razorpay)', style: 'bg-blue-50 text-blue-700' },
  partial:  { label: 'Partial Payment',   style: 'bg-amber-50 text-amber-700' },
  cod:      { label: 'Cash on Delivery',  style: 'bg-slate-100 text-slate-600' },
};

export default async function CustomerOrdersPage() {
  let orders: {
    id: string;
    wooOrderId: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    total: unknown;
    status: string | null;
    paymentMethod: string | null;
    createdAt: Date | null;
  }[] = [];

  let dbError = false;

  try {
    orders = await prisma.customerOrder.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        wooOrderId: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        total: true,
        status: true,
        paymentMethod: true,
        createdAt: true,
      },
    });
  } catch {
    dbError = true;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Customer Orders (Online)</h1>
          <p className="text-sm text-slate-500 mt-1">
            All orders placed via the website (Razorpay, Partial Payment, COD).
          </p>
        </div>
        <a
          href="https://9gk.22b.myftpupload.com/wp-admin/edit.php?post_type=shop_order"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          🛒 View in WooCommerce
        </a>
      </div>

      {dbError && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          Could not load orders — database connection failed. Please try refreshing.
        </div>
      )}

      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {orders.length === 0 && !dbError ? (
          <div className="p-10 text-center text-slate-500 text-sm">
            <p className="text-2xl mb-2">🛍️</p>
            <p>No customer orders yet.</p>
            <p className="text-slate-400 text-xs mt-1">Orders placed through the website will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                  <th className="px-4 py-3 font-medium">Order #</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Payment</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const name = [order.firstName, order.lastName].filter(Boolean).join(' ') || '—';
                  const status = order.status ?? 'pending';
                  const method = order.paymentMethod ?? 'cod';
                  const statusStyle = STATUS_STYLES[status] ?? 'bg-slate-100 text-slate-600';
                  const methodInfo = METHOD_STYLES[method] ?? { label: method, style: 'bg-slate-100 text-slate-600' };

                  return (
                    <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors">
                      <td className="px-4 py-3">
                        {order.wooOrderId ? (
                          <a
                            href={`https://9gk.22b.myftpupload.com/wp-admin/post.php?post=${order.wooOrderId}&action=edit`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-primary hover:underline"
                          >
                            #{order.wooOrderId}
                          </a>
                        ) : (
                          <span className="text-slate-400 text-xs font-mono">{order.id.slice(0, 8)}…</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800">{name}</td>
                      <td className="px-4 py-3 text-slate-500">
                        <div>{order.email ?? '—'}</div>
                        {order.phone && <div className="text-xs">{order.phone}</div>}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {order.total ? `₹${Number(order.total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${methodInfo.style}`}>
                          {methodInfo.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium capitalize ${statusStyle}`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit', month: 'short', year: 'numeric',
                            })
                          : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400">
        Showing {orders.length} order{orders.length !== 1 ? 's' : ''} · Order details and fulfilment are managed in WooCommerce.
      </p>
    </div>
  );
}
