'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createDispatch } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

type DispatchRow = { id: string; dispatchDate: Date | null; notes: string | null };

export function DispatchesSection({ orderId, dispatches }: { orderId: string; dispatches: DispatchRow[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dispatchDate, setDispatchDate] = useState('');
  const [notes, setNotes] = useState('');

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await createDispatch(orderId, { dispatchDate: dispatchDate || undefined, notes: notes || undefined });
      setDispatchDate('');
      setNotes('');
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl bg-white border border-slate-200 p-6">
      <h2 className="font-medium text-slate-900 mb-4">Dispatches</h2>
      <p className="text-xs text-slate-500 mb-4">Recording a dispatch deducts quantities from Finished Goods.</p>
      {dispatches.length === 0 ? (
        <p className="text-sm text-slate-500 mb-4">No dispatches yet.</p>
      ) : (
        <ul className="space-y-2 text-sm mb-4">
          {dispatches.map((d) => (
            <li key={d.id}>
              {d.dispatchDate ? new Date(d.dispatchDate).toLocaleDateString() : '-'}
              {d.notes && ` — ${d.notes}`}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-2">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Dispatch date</label>
          <input
            type="date"
            value={dispatchDate}
            onChange={(e) => setDispatchDate(e.target.value)}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Notes</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={loading}
            placeholder="Optional"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-green-600 text-white px-3 py-2 text-sm font-medium hover:bg-green-700 disabled:opacity-50 flex items-center gap-1"
        >
          {loading && <LoadingSpinner size="sm" />}
          Record dispatch
        </button>
      </form>
    </div>
  );
}
