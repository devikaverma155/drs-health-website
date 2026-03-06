import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function LeadsReportPage() {
  const [bySource, byStatus, total, converted] = await Promise.all([
    prisma.lead.groupBy({ by: ['source'], _count: { id: true } }),
    prisma.lead.groupBy({ by: ['status'], _count: { id: true } }),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'converted' } }),
  ]);

  const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      <Link href="/admin/reports" className="text-sm text-slate-500 hover:text-slate-900">← Reports</Link>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-900">Lead conversion reports</h1>
        <a
          href="/admin/api/reports/leads/csv"
          download
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <span>↓</span> Download CSV
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-white border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Total leads</p>
          <p className="text-2xl font-semibold text-slate-900">{total}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Converted</p>
          <p className="text-2xl font-semibold text-slate-900">{converted}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Conversion rate</p>
          <p className="text-2xl font-semibold text-slate-900">{conversionRate}%</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white border border-slate-200 p-6">
          <h2 className="font-medium text-slate-900 mb-4">Leads by source</h2>
          {bySource.length === 0 ? (
            <p className="text-sm text-slate-500">No leads yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="pb-2 font-medium">Source</th>
                  <th className="pb-2 font-medium text-right">Count</th>
                </tr>
              </thead>
              <tbody>
                {bySource.map(({ source, _count }) => (
                  <tr key={source ?? 'unknown'} className="border-b border-slate-100">
                    <td className="py-2 text-slate-700">{source?.replace(/_/g, ' ') ?? 'Unknown'}</td>
                    <td className="py-2 text-right font-medium text-slate-900">{_count.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-6">
          <h2 className="font-medium text-slate-900 mb-4">Leads by pipeline stage</h2>
          {byStatus.length === 0 ? (
            <p className="text-sm text-slate-500">No leads yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium text-right">Count</th>
                </tr>
              </thead>
              <tbody>
                {byStatus.map(({ status, _count }) => (
                  <tr key={status ?? 'unknown'} className="border-b border-slate-100">
                    <td className="py-2 text-slate-700">{status?.replace(/_/g, ' ') ?? 'Unknown'}</td>
                    <td className="py-2 text-right font-medium text-slate-900">{_count.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
