'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient, updateClient } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { Client } from '@prisma/client';

const CLIENT_CATEGORIES = [
  'Distributor',
  'Retailer',
  'Wholesaler',
  'Hospital / Clinic',
  'Pharmacy',
  'Online Seller',
  'Export',
  'Other',
];

export function ClientForm({ client }: { client?: Client | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [companyName, setCompanyName] = useState(client?.companyName ?? '');
  const [contactPerson, setContactPerson] = useState(client?.contactPerson ?? '');
  const [phone, setPhone] = useState(client?.phone ?? '');
  const [email, setEmail] = useState(client?.email ?? '');
  const [address, setAddress] = useState(client?.address ?? '');
  const [city, setCity] = useState(client?.city ?? '');
  const [state, setState] = useState(client?.state ?? '');
  const [gstNumber, setGstNumber] = useState(client?.gstNumber ?? '');
  const [category, setCategory] = useState((client as Client & { category?: string | null })?.category ?? '');
  const [notes, setNotes] = useState(client?.notes ?? '');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (client) {
        await updateClient(client.id, { companyName, contactPerson, phone, email, address, city, state, gstNumber, category, notes });
      } else {
        await createClient({ companyName, contactPerson, phone, email, address, city, state, gstNumber, category, notes });
      }
      router.push('/admin/clients');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save client.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl bg-white border border-slate-200 p-6 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Company name *</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="">— Select category —</option>
            {CLIENT_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Contact person</label>
          <input type="text" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">GST number</label>
          <input type="text" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} disabled={loading} rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm resize-y" placeholder="Internal notes about this client..." />
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2">
          {loading && <LoadingSpinner size="sm" />}
          {loading ? 'Saving…' : client ? 'Update Client' : 'Create Client'}
        </button>
        <button type="button" onClick={() => router.back()} disabled={loading} className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Cancel</button>
      </div>
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
          <LoadingSpinner size="lg" />
        </div>
      )}
    </form>
  );
}
