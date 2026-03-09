'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBOM, updateBOM } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { BillOfMaterial } from '@prisma/client';

export function BOMForm({
  bom,
  products,
}: {
  bom?: BillOfMaterial | null;
  products: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [productId, setProductId] = useState(bom?.productId ?? '');
  const [status, setStatus] = useState(bom?.status ?? 'draft');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (bom) {
        await updateBOM(bom.id, { productId: productId || undefined, status });
      } else {
        await createBOM({ productId: productId || undefined, status });
      }
      router.push('/admin/bom');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl bg-white border border-slate-200 p-6 relative">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Product *</label>
        <select value={productId} onChange={(e) => setProductId(e.target.value)} required disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option value="">— Select product —</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option value="draft">Draft</option>
          <option value="complete">Complete</option>
        </select>
        <p className="text-xs text-slate-500 mt-1">When Complete, you can add this product to Production.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2">
          {loading && <LoadingSpinner size="sm" />}
          {loading ? 'Saving…' : bom ? 'Update BOM' : 'Create BOM'}
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
