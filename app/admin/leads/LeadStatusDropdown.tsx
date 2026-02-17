'use client';

import { useState } from 'react';
import { updateLeadStatus } from './actions';
import type { LeadStatus } from '@prisma/client';

const STATUSES: LeadStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED'];

export function LeadStatusDropdown({
  leadId,
  currentStatus,
}: {
  leadId: string;
  currentStatus: LeadStatus;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function handleChange(newStatus: LeadStatus) {
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
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value as LeadStatus)}
      disabled={loading}
      className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
