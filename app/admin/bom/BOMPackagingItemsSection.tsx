'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addBomPackagingItem, updateBomPackagingItem, deleteBomPackagingItem } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

type PkgItem = { id: string; packagingId: string | null; quantity: unknown; packaging?: { name: string | null; unit: string | null } | null };
type PkgOption = { id: string; name: string | null; unit: string | null };

export function BOMPackagingItemsSection({
  bomId,
  items,
  packagingMaterials,
}: { bomId: string; items: PkgItem[]; packagingMaterials: PkgOption[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [addPackagingId, setAddPackagingId] = useState('');
  const [addQuantity, setAddQuantity] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState('');

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!addPackagingId || !addQuantity) return;
    setLoading(true);
    try {
      await addBomPackagingItem(bomId, addPackagingId, addQuantity);
      setAddPackagingId('');
      setAddQuantity('');
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(id: string) {
    setLoading(true);
    try {
      await updateBomPackagingItem(id, editQuantity);
      setEditingId(null);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Remove this packaging from BOM?')) return;
    setLoading(true);
    try {
      await deleteBomPackagingItem(id, bomId);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to remove');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl bg-white border border-slate-200 p-6">
      <h2 className="font-medium text-slate-900 mb-2">Packaging materials (per unit of product)</h2>
      <p className="text-xs text-slate-500 mb-4">Required quantity × units produced = total deducted from inventory when production is completed.</p>
      {items.length === 0 ? (
        <p className="text-sm text-slate-500 mb-4">No packaging items. Add below.</p>
      ) : (
        <ul className="space-y-2 mb-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-2 py-2 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-800">{item.packaging?.name ?? 'Packaging'}</span>
              {editingId === item.id ? (
                <span className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value)}
                    className="w-24 rounded border border-slate-300 px-2 py-1 text-sm"
                  />
                  <button type="button" onClick={() => handleUpdate(item.id)} disabled={loading} className="text-green-600 text-xs font-medium">Save</button>
                  <button type="button" onClick={() => setEditingId(null)} className="text-slate-500 text-xs">Cancel</button>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="text-slate-600">{item.quantity != null ? String(item.quantity) : 0} {item.packaging?.unit ?? ''}</span>
                  <button type="button" onClick={() => { setEditingId(item.id); setEditQuantity(item.quantity != null ? String(item.quantity) : ''); }} className="text-primary text-xs">Edit</button>
                  <button type="button" onClick={() => handleDelete(item.id)} disabled={loading} className="text-red-600 text-xs">Remove</button>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-2">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Add packaging</label>
          <select
            value={addPackagingId}
            onChange={(e) => setAddPackagingId(e.target.value)}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm min-w-[180px]"
          >
            <option value="">Select...</option>
            {packagingMaterials.filter((p) => !items.some((i) => i.packagingId === p.id)).map((p) => (
              <option key={p.id} value={p.id}>{p.name ?? p.id.slice(0, 8)} ({p.unit ?? '-'})</option>
            ))}
            {packagingMaterials.filter((p) => !items.some((i) => i.packagingId === p.id)).length === 0 && packagingMaterials.length > 0 && (
              <option value="">All added</option>
            )}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Qty per unit</label>
          <input
            type="number"
            min="0.001"
            step="any"
            value={addQuantity}
            onChange={(e) => setAddQuantity(e.target.value)}
            disabled={loading}
            placeholder="0"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm w-24"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !addPackagingId || !addQuantity}
          className="rounded-lg bg-primary text-white px-3 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-1"
        >
          {loading && <LoadingSpinner size="sm" />}
          Add
        </button>
      </form>
    </div>
  );
}
