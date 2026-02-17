import type { Lead } from '@prisma/client';

export function LeadDetail({ lead }: { lead: Lead }) {
  return (
    <div className="space-y-3 text-sm">
      <h1 className="text-xl font-semibold text-slate-900">{lead.name}</h1>
      <p><span className="text-slate-500">Email</span> {lead.email}</p>
      <p><span className="text-slate-500">Phone</span> {lead.phone}</p>
      <p><span className="text-slate-500">Source</span> {lead.source.replace(/_/g, ' ')}</p>
      {lead.category && (
        <p><span className="text-slate-500">Category</span> {lead.category}</p>
      )}
      <p><span className="text-slate-500">Created</span> {new Date(lead.createdAt).toLocaleString()}</p>
      {lead.lastContactedAt && (
        <p><span className="text-slate-500">Last contacted</span> {new Date(lead.lastContactedAt).toLocaleString()}</p>
      )}
      {lead.message && (
        <div className="pt-2">
          <p className="text-slate-500 mb-1">Message</p>
          <p className="text-slate-700 whitespace-pre-wrap">{lead.message}</p>
        </div>
      )}
      {lead.tags.length > 0 && (
        <p><span className="text-slate-500">Tags</span> {lead.tags.join(', ')}</p>
      )}
    </div>
  );
}
