'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { LeadSource, LeadStatus } from '@prisma/client';

export function LeadFilters({
  sources,
  statuses,
  defaultSource,
  defaultStatus,
  defaultQ,
}: {
  sources: LeadSource[];
  statuses: LeadStatus[];
  defaultSource?: LeadSource;
  defaultStatus?: LeadStatus;
  defaultQ?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function update(key: string, value: string) {
    const p = new URLSearchParams(searchParams.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    p.delete('page');
    router.push(`/admin/leads${p.toString() ? `?${p.toString()}` : ''}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <input
        type="search"
        placeholder="Search name, email, phone..."
        defaultValue={defaultQ}
        onKeyDown={(e) => {
          if (e.key === 'Enter') update('q', (e.target as HTMLInputElement).value);
        }}
        onChange={(e) => {
          if (!e.target.value) update('q', '');
        }}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm w-56"
      />
      <select
        value={defaultSource ?? ''}
        onChange={(e) => update('source', e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
      >
        <option value="">All sources</option>
        {sources.map((s) => (
          <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
        ))}
      </select>
      <select
        value={defaultStatus ?? ''}
        onChange={(e) => update('status', e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
      >
        <option value="">All statuses</option>
        {statuses.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}
