'use client';

import { useState } from 'react';
import { addLeadNote } from './actions';
import type { LeadNote } from '@prisma/client';

export function LeadNotesTimeline({
  leadId,
  notes,
}: {
  leadId: string;
  notes: LeadNote[];
}) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await addLeadNote(leadId, content);
      setContent('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add note.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a note..."
          rows={2}
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="shrink-0 rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50"
        >
          {loading ? 'Adding…' : 'Add'}
        </button>
      </form>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <ul className="space-y-3">
        {notes.length === 0 ? (
          <li className="text-sm text-slate-500">No notes yet.</li>
        ) : (
          notes.map((note) => (
            <li key={note.id} className="border-l-2 border-slate-200 pl-3 py-1 text-sm">
              <p className="text-slate-700 whitespace-pre-wrap">{note.content}</p>
              <p className="text-slate-400 text-xs mt-1">
                {note.createdBy ?? 'System'} · {new Date(note.createdAt).toLocaleString()}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
