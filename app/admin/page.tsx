import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const WP_ADMIN_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL}/wp-admin`
  : 'https://drshealth.in/wp-admin';

async function getDashboardData() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - 7);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [leadsToday, leadsThisWeek, leadsThisMonth, allLeads, converted, recentLeads] = await Promise.all([
    prisma.lead.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.lead.count({ where: { createdAt: { gte: startOfWeek } } }),
    prisma.lead.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.lead.groupBy({ by: ['source'], _count: { id: true } }),
    prisma.lead.count({ where: { status: 'converted' } }),
    prisma.lead.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, source: true, status: true, createdAt: true },
    }),
  ]);

  const total = await prisma.lead.count();
  const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : '0';

  // Production, inventory & low-stock (may fail if tables not yet created)
  let productionRunning = 0;
  let finishedGoodsBatches = 0;
  let lowStockRawCount = 0;
  let lowStockItems: { name: string | null; materialCode: string | null }[] = [];
  let recentProduction: { id: string; batchNumber: string | null; status: string | null; productId: string | null }[] = [];
  try {
    [productionRunning, finishedGoodsBatches, recentProduction] = await Promise.all([
      prisma.productionBatch.count({ where: { status: 'running' } }),
      prisma.finishedGoodsBatch.count(),
      prisma.productionBatch.findMany({ take: 5, orderBy: { createdAt: 'desc' }, select: { id: true, batchNumber: true, status: true, productId: true } }),
    ]);
    // Low stock: raw materials where total batch quantity < min_stock (simplified: count materials with min_stock set and at least one batch)
    const rawMaterials = await prisma.rawMaterial.findMany({ where: { minStock: { not: null } }, include: { batches: true } });
    for (const rm of rawMaterials) {
      const totalQty = rm.batches.reduce((s, b) => s + Number(b.quantity ?? 0), 0);
      const min = Number(rm.minStock ?? 0);
      if (min > 0 && totalQty < min) {
        lowStockRawCount += 1;
        lowStockItems.push({ name: rm.name, materialCode: rm.materialCode });
      }
    }
    if (lowStockItems.length > 5) lowStockItems = lowStockItems.slice(0, 5);
  } catch {
    // Tables may not exist yet
  }

  return {
    leadsToday,
    leadsThisWeek,
    leadsThisMonth,
    bySource: allLeads,
    conversionRate,
    recentLeads,
    productionRunning,
    finishedGoodsBatches,
    lowStockRawCount,
    lowStockItems,
    recentProduction,
  };
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Leads today</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">{data.leadsToday}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Leads this month</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">{data.leadsThisMonth}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Leads this week</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">{data.leadsThisWeek}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Conversion rate</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">{data.conversionRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Production batches running</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">{data.productionRunning}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Finished goods batches</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">{data.finishedGoodsBatches}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Raw materials (low stock)</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">{data.lowStockRawCount}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Leads by source</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">{data.bySource.reduce((s, x) => s + x._count.id, 0)}</p>
        </div>
      </div>

      {/* WooCommerce quick-access card */}
      <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🛍️</span>
              <h2 className="font-semibold text-slate-900">Orders & Products</h2>
            </div>
            <p className="text-sm text-slate-600">
              Orders, product catalog, inventory, and coupons are managed through WordPress / WooCommerce.
              Click below to open the WooCommerce dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <a
              href={`${WP_ADMIN_URL}/edit.php?post_type=shop_order`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              <span>🛒</span> View Orders
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
            <a
              href={`${WP_ADMIN_URL}/edit.php?post_type=product`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-blue-700 text-sm font-medium border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm"
            >
              <span>📦</span> Manage Products
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
            <a
              href={WP_ADMIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-slate-700 text-sm font-medium border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <span>🌐</span> WP Dashboard
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white border border-slate-200 p-5">
          <h2 className="font-medium text-slate-900 mb-4">Low stock alerts (raw materials)</h2>
          {data.lowStockItems.length === 0 ? (
            <p className="text-sm text-slate-500">No low stock items</p>
          ) : (
            <ul className="space-y-2">
              {data.lowStockItems.map((item, i) => (
                <li key={i} className="text-sm text-amber-700">
                  {item.materialCode || item.name || 'Unknown'}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-5">
          <h2 className="font-medium text-slate-900 mb-4">Production activity (recent batches)</h2>
          {data.recentProduction.length === 0 ? (
            <p className="text-sm text-slate-500">No production batches yet</p>
          ) : (
            <ul className="space-y-2">
              {data.recentProduction.map((b) => (
                <li key={b.id} className="text-sm text-slate-700 flex justify-between">
                  <span>Batch {b.batchNumber || b.id.slice(0, 8)}</span>
                  <span className="text-slate-500">{b.status || '-'}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white border border-slate-200 p-5">
          <h2 className="font-medium text-slate-900 mb-4">Leads by source</h2>
          <div className="space-y-2">
            {data.bySource.length === 0 ? (
              <p className="text-sm text-slate-500">No leads yet</p>
            ) : (
              data.bySource.map(({ source, _count }) => (
                <div key={source || 'unknown'} className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">{source?.replace(/_/g, ' ') || 'Unknown'}</span>
                  <span className="font-medium text-slate-900">{_count.id}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl bg-white border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-slate-900">Recent leads</h2>
            <Link href="/admin/leads" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            {data.recentLeads.length === 0 ? (
              <p className="text-sm text-slate-500">No leads yet</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-100">
                    <th className="pb-2 pr-2">Name</th>
                    <th className="pb-2 pr-2">Source</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-slate-50">
                      <td className="py-2 pr-2">
                        <Link href={`/admin/leads/${lead.id}`} className="text-primary hover:underline">
                          {lead.name || '-'}
                        </Link>
                      </td>
                      <td className="py-2 pr-2 text-slate-600">{lead.source?.replace(/_/g, ' ') || '-'}</td>
                      <td className="py-2 text-slate-600">{lead.status || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
