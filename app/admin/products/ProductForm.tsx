'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { Product } from '@prisma/client';

export function ProductForm({
  product,
  categories,
}: {
  product?: Product | null;
  categories: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState(product?.name ?? '');
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? '');
  const [packSize, setPackSize] = useState(product?.packSize ?? '');
  const [mrp, setMrp] = useState(product?.mrp?.toString() ?? '');
  const [standardBatchSize, setStandardBatchSize] = useState(product?.standardBatchSize?.toString() ?? '');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (product) {
        await updateProduct(product.id, { name, categoryId: categoryId || undefined, packSize, mrp, standardBatchSize });
      } else {
        await createProduct({ name, categoryId: categoryId || undefined, packSize, mrp, standardBatchSize });
      }
      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl bg-white border border-slate-200 p-6 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Product name *</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="">— Select —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Pack size</label>
          <input type="text" value={packSize} onChange={(e) => setPackSize(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="e.g. 60 capsules" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">MRP</label>
          <input type="number" step="0.01" value={mrp} onChange={(e) => setMrp(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Standard batch size</label>
          <input type="number" value={standardBatchSize} onChange={(e) => setStandardBatchSize(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2">
          {loading && <LoadingSpinner size="sm" />}
          {loading ? 'Saving…' : product ? 'Update Product' : 'Create Product'}
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
