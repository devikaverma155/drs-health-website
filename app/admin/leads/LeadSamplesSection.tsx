'use client';

import { useState } from 'react';
import {
  createSample,
  updateSampleStatus,
  notifySampleStatusOnWhatsApp,
} from './actions';
import type { LeadSample } from '@prisma/client';

const STATUSES: Array<LeadSample['status']> = [
  'PENDING',
  'SENT',
  'IN_TRANSIT',
  'DELIVERED',
  'FAILED',
];

export function LeadSamplesSection({
  leadId,
  samples,
}: {
  leadId: string;
  samples: LeadSample[];
}) {
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [trackingRefs, setTrackingRefs] = useState<Record<string, string>>({});

  async function handleAddSample(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createSample(leadId, notes);
      setNotes('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add sample.');
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(sampleId: string, status: LeadSample['status']) {
    setError('');
    setUpdatingId(sampleId);
    try {
      const ref = trackingRefs[sampleId] ?? '';
      await updateSampleStatus(sampleId, status, ref.trim() || undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update.');
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleNotify(sampleId: string) {
    setError('');
    setUpdatingId(sampleId);
    try {
      await notifySampleStatusOnWhatsApp(sampleId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send WhatsApp.');
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="font-medium text-slate-900">Sample tracking</h2>
      <p className="text-sm text-slate-500">
        Track samples sent to this lead. Update status and notify them on WhatsApp.
      </p>

      <form onSubmit={handleAddSample} className="flex gap-2">
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add sample (optional notes)"
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50"
        >
          {loading ? 'Adding…' : 'Add sample'}
        </button>
      </form>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {samples.length === 0 ? (
        <p className="text-sm text-slate-500">No samples yet.</p>
      ) : (
        <ul className="space-y-3">
          {samples.map((s) => (
            <li
              key={s.id}
              className="rounded-lg border border-slate-200 p-3 text-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium text-slate-700">
                  {s.status.replace('_', ' ')} • {new Date(s.createdAt).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  <select
                    value={s.status}
                    onChange={(e) =>
                      handleStatusChange(s.id, e.target.value as LeadSample['status'])
                    }
                    disabled={updatingId === s.id}
                    className="rounded border border-slate-300 px-2 py-1 text-xs"
                  >
                    {STATUSES.map((st) => (
                      <option key={st} value={st}>{st.replace('_', ' ')}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleNotify(s.id)}
                    disabled={updatingId === s.id || s.status === 'PENDING'}
                    className="rounded bg-green-600 text-white px-2 py-1 text-xs hover:bg-green-700 disabled:opacity-50"
                  >
                    Notify on WhatsApp
                  </button>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={trackingRefs[s.id] ?? s.trackingRef ?? ''}
                  onChange={(e) =>
                    setTrackingRefs((prev) => ({ ...prev, [s.id]: e.target.value }))
                  }
                  placeholder="Tracking ref"
                  className="max-w-40 rounded border border-slate-300 px-2 py-1 text-xs"
                />
              </div>
              {s.notes && <p className="mt-1 text-slate-500">{s.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
