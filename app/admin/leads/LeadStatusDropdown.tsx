'use client';

import { useState } from 'react';
import { updateLeadStatus } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const STATUSES: string[] = ['new', 'contacted', 'qualified', 'converted', 'closed'];

export function LeadStatusDropdown({
  leadId,
  currentStatus,
}: {
  leadId: string;
  currentStatus: string | null;
}) {
  const [status, setStatus] = useState(currentStatus ?? 'new');
  const [loading, setLoading] = useState(false);

  async function handleChange(newStatus: string) {
    setStatus(newStatus);
    setLoading(true);
    try {
      await updateLeadStatus(leadId, newStatus);
    } catch {
      setStatus(currentStatus);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value)}
        disabled={loading}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm pr-8 disabled:opacity-50"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      {loading && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <LoadingSpinner size="sm" />
        </div>
      )}
    </div>
  );
}
