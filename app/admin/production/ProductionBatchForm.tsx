'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProductionBatch, updateProductionBatch } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { ProductionBatch } from '@prisma/client';

export function ProductionBatchForm({
  batch,
  products,
  initialProductId,
}: {
  batch?: ProductionBatch | null;
  products: { id: string; name: string }[];
  initialProductId?: string | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [productId, setProductId] = useState(batch?.productId ?? initialProductId ?? '');
  const [batchNumber, setBatchNumber] = useState(batch?.batchNumber ?? '');
  const [manufacturingDate, setManufacturingDate] = useState(batch?.manufacturingDate ? new Date(batch.manufacturingDate).toISOString().split('T')[0] : '');
  const [expiryDate, setExpiryDate] = useState(batch?.expiryDate ? new Date(batch.expiryDate).toISOString().split('T')[0] : '');
  const [quantityProduced, setQuantityProduced] = useState(batch?.quantityProduced?.toString() ?? '');
  const [status, setStatus] = useState(batch?.status ?? 'running');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (batch) {
        await updateProductionBatch(batch.id, { productId: productId || undefined, batchNumber, manufacturingDate: manufacturingDate || undefined, expiryDate: expiryDate || undefined, quantityProduced, status });
      } else {
        await createProductionBatch({ productId: productId || undefined, batchNumber, manufacturingDate: manufacturingDate || undefined, expiryDate: expiryDate || undefined, quantityProduced, status });
      }
      router.push('/admin/production');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl bg-white border border-slate-200 p-6 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Product</label>
          <select value={productId} onChange={(e) => setProductId(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="">— Select —</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Batch number</label>
          <input type="text" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Manufacturing date</label>
          <input type="date" value={manufacturingDate} onChange={(e) => setManufacturingDate(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Expiry date</label>
          <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Quantity produced</label>
          <input type="number" step="0.01" value={quantityProduced} onChange={(e) => setQuantityProduced(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="running">Running</option>
            <option value="completed">Completed</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">When set to Completed: RM &amp; PM (from BOM × quantity) are deducted from inventory and added to Finished Goods. Stock is checked first.</p>
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2">
          {loading && <LoadingSpinner size="sm" />}
          {loading ? 'Saving…' : batch ? 'Update Batch' : 'Create Batch'}
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
