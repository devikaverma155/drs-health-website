import Link from 'next/link';
import type { Lead } from '@prisma/client';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

type LeadWithCount = Lead & { _count?: { activities: number } };

export function LeadsTable({ leads, loading }: { leads: LeadWithCount[]; loading?: boolean }) {
  if (loading) {
    return (
      <div className="p-8 text-center">
        <LoadingSpinner size="md" />
        <p className="mt-4 text-sm text-slate-500">Loading leads...</p>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 text-sm">
        No leads match your filters.
      </div>
    );
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
          <th className="px-4 py-3 font-medium">Name</th>
          <th className="px-4 py-3 font-medium">Email</th>
          <th className="px-4 py-3 font-medium">Phone</th>
          <th className="px-4 py-3 font-medium">Source</th>
          <th className="px-4 py-3 font-medium">Status</th>
          <th className="px-4 py-3 font-medium">Notes</th>
          <th className="px-4 py-3 font-medium">Created</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50/50">
            <td className="px-4 py-3">
              <Link href={`/admin/leads/${lead.id}`} className="font-medium text-primary hover:underline">
                {lead.name || '-'}
              </Link>
            </td>
            <td className="px-4 py-3 text-slate-600">{lead.email || '-'}</td>
            <td className="px-4 py-3 text-slate-600">{lead.phone || '-'}</td>
            <td className="px-4 py-3 text-slate-600">{lead.source?.replace(/_/g, ' ') || '-'}</td>
            <td className="px-4 py-3">
              <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                {lead.status || 'new'}
              </span>
            </td>
            <td className="px-4 py-3 text-slate-600">{lead._count?.activities ?? '-'}</td>
            <td className="px-4 py-3 text-slate-500">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
