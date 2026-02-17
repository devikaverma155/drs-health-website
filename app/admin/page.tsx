import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { LeadSource, LeadStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

async function getDashboardData() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  const [leadsToday, leadsThisWeek, allLeads, converted] = await Promise.all([
    prisma.lead.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.lead.count({ where: { createdAt: { gte: startOfWeek } } }),
    prisma.lead.groupBy({ by: ['source'], _count: { id: true } }),
    prisma.lead.count({ where: { status: LeadStatus.CONVERTED } }),
  ]);

  const total = await prisma.lead.count();
  const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : '0';

  const recentLeads = await prisma.lead.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, source: true, status: true, createdAt: true },
  });

  return {
    leadsToday,
    leadsThisWeek,
    bySource: allLeads,
    conversionRate,
    recentLeads,
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
          <p className="text-sm text-slate-500">Leads this week</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">{data.leadsThisWeek}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Leads by source</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">{data.bySource.reduce((s, x) => s + x._count.id, 0)}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Conversion rate</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">{data.conversionRate}%</p>
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
                <div key={source} className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">{source.replace(/_/g, ' ')}</span>
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
                          {lead.name}
                        </Link>
                      </td>
                      <td className="py-2 pr-2 text-slate-600">{lead.source.replace(/_/g, ' ')}</td>
                      <td className="py-2 text-slate-600">{lead.status}</td>
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
