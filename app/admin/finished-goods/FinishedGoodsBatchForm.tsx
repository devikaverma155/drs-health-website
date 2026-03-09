'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateFinishedGoodsBatch } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

type Batch = {
  id: string;
  batchNumber: string | null;
  quantityAvailable: unknown;
  manufacturingDate: Date | null;
  expiryDate: Date | null;
  product?: { name: string } | null;
};

export function FinishedGoodsBatchForm({ batch }: { batch: Batch }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quantityAvailable, setQuantityAvailable] = useState(
    batch.quantityAvailable != null ? String(batch.quantityAvailable) : ''
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await updateFinishedGoodsBatch(batch.id, { quantityAvailable });
      router.push('/admin/finished-goods');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <p className="text-sm text-slate-600">
        Product: <strong>{batch.product?.name ?? '-'}</strong>
        {batch.batchNumber && ` · Batch: ${batch.batchNumber}`}
      </p>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Quantity available</label>
        <input
          type="number"
          min="0"
          step="any"
          value={quantityAvailable}
          onChange={(e) => setQuantityAvailable(e.target.value)}
          disabled={loading}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <LoadingSpinner size="sm" />}
          Update
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/finished-goods')}
          disabled={loading}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>
      </div>
    </form>
  );
}
