'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProductCategory, updateProductCategory } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { ProductCategory } from '@prisma/client';

export function ProductCategoryForm({ category }: { category?: ProductCategory | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState(category?.name ?? '');
  const [description, setDescription] = useState(category?.description ?? '');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (category) {
        await updateProductCategory(category.id, { name, description });
      } else {
        await createProductCategory({ name, description });
      }
      router.push('/admin/product-categories');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4 rounded-xl bg-white border border-slate-200 p-6 relative">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} placeholder="e.g. Capsule, Syrup, Oil" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2">
          {loading && <LoadingSpinner size="sm" />}
          {loading ? 'Saving…' : category ? 'Update' : 'Create'}
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
