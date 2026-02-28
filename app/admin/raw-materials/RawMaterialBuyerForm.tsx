'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRawMaterialBuyer, updateRawMaterialBuyer } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { RawMaterialBuyer } from '@prisma/client';

export function RawMaterialBuyerForm({ buyer }: { buyer?: RawMaterialBuyer | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [companyName, setCompanyName] = useState(buyer?.companyName || '');
  const [contactPerson, setContactPerson] = useState(buyer?.contactPerson || '');
  const [phone, setPhone] = useState(buyer?.phone || '');
  const [email, setEmail] = useState(buyer?.email || '');
  const [materialRequired, setMaterialRequired] = useState(buyer?.materialRequired || '');
  const [quantity, setQuantity] = useState(buyer?.quantity || '');
  const [location, setLocation] = useState(buyer?.location || '');
  const [notes, setNotes] = useState(buyer?.notes || '');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (buyer) {
        await updateRawMaterialBuyer(buyer.id, {
          companyName,
          contactPerson,
          phone,
          email,
          materialRequired,
          quantity,
          location,
          notes,
        });
      } else {
        await createRawMaterialBuyer({
          companyName,
          contactPerson,
          phone,
          email,
          materialRequired,
          quantity,
          location,
          notes,
        });
      }
      router.push('/admin/raw-materials');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save buyer.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl bg-white border border-slate-200 p-6 relative">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Company Name *</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
          <input
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Material Required</label>
          <input
            type="text"
            value={materialRequired}
            onChange={(e) => setMaterialRequired(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <LoadingSpinner size="sm" />}
          {loading ? 'Saving…' : buyer ? 'Update Buyer' : 'Create Buyer'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-2 text-sm text-slate-600">Saving to database...</p>
          </div>
        </div>
      )}
    </form>
  );
}
