'use client';

import { useState } from 'react';
import { sendLeadWhatsApp } from './actions';

export function SendWhatsAppPanel({ leadId, phone }: { leadId: string; phone: string }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [errorText, setErrorText] = useState('');

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    setErrorText('');
    setLoading(true);
    try {
      await sendLeadWhatsApp(leadId, message);
      setResult('success');
      setMessage('');
    } catch (err) {
      setResult('error');
      setErrorText(err instanceof Error ? err.message : 'Failed to send.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="font-medium text-slate-900 mb-2">Send WhatsApp Message</h2>
      <p className="text-xs text-slate-500 mb-3">To: {phone}</p>
      <form onSubmit={handleSend} className="space-y-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="w-full rounded-lg bg-green-600 text-white py-2 text-sm font-medium hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Sending…' : 'Send'}
        </button>
      </form>
      {result === 'success' && <p className="text-sm text-green-600 mt-2">Message sent.</p>}
      {result === 'error' && <p className="text-sm text-red-600 mt-2">{errorText}</p>}
    </div>
  );
}
