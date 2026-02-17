'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveAutomationRule } from './actions';
import type { AutomationRule } from '@prisma/client';

const TRIGGERS = ['new_lead'];
const SOURCES = ['', 'contact_form', 'consultation', 'manufacturer', 'b2b', 'private_labelling', 'pcd', 'whatsapp', 'ads'];

export function AutomationRuleForm({ rule }: { rule?: AutomationRule | null }) {
  const router = useRouter();
  const [trigger, setTrigger] = useState(rule?.trigger ?? 'new_lead');
  const [source, setSource] = useState(rule?.source ?? '');
  const [messageTemplate, setMessageTemplate] = useState(rule?.messageTemplate ?? '');
  const [enabled, setEnabled] = useState(rule?.enabled ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await saveAutomationRule({
        id: rule?.id,
        trigger,
        source: source || null,
        messageTemplate: messageTemplate.trim(),
        enabled,
      });
      router.push('/admin/automations');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4 rounded-xl bg-white border border-slate-200 p-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Trigger</label>
        <select
          value={trigger}
          onChange={(e) => setTrigger(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          {TRIGGERS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Source (optional filter)</label>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          {SOURCES.map((s) => (
            <option key={s || 'any'} value={s}>{s || 'Any'}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Message template</label>
        <textarea
          value={messageTemplate}
          onChange={(e) => setMessageTemplate(e.target.value)}
          rows={4}
          placeholder="Hello {{name}}, thanks for your interest..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="enabled"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <label htmlFor="enabled" className="text-sm text-slate-700">Enabled</label>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50"
        >
          {loading ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
