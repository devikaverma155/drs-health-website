import type { Lead } from '@prisma/client';

export function LeadDetail({ lead }: { lead: Lead }) {
  return (
    <div className="space-y-3 text-sm">
      <h1 className="text-xl font-semibold text-slate-900">{lead.name || 'Unnamed Lead'}</h1>
      {lead.email && <p><span className="text-slate-500">Email</span> {lead.email}</p>}
      {lead.phone && <p><span className="text-slate-500">Phone</span> {lead.phone}</p>}
      {lead.source && <p><span className="text-slate-500">Source</span> {lead.source.replace(/_/g, ' ')}</p>}
      {lead.companyName && (
        <p><span className="text-slate-500">Company</span> {lead.companyName}</p>
      )}
      {lead.city && (
        <p><span className="text-slate-500">Location</span> {[lead.city, lead.state, lead.country].filter(Boolean).join(', ')}</p>
      )}
      {lead.priority && (
        <p><span className="text-slate-500">Priority</span> {lead.priority}</p>
      )}
      <p><span className="text-slate-500">Created</span> {new Date(lead.createdAt).toLocaleString()}</p>
      {lead.message && (
        <div className="pt-2">
          <p className="text-slate-500 mb-1">Message</p>
          <p className="text-slate-700 whitespace-pre-wrap">{lead.message}</p>
        </div>
      )}
      {lead.tags && lead.tags.length > 0 && (
        <p><span className="text-slate-500">Tags</span> {lead.tags.join(', ')}</p>
      )}
    </div>
  );
}
