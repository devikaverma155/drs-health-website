'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addBomRawItem, updateBomRawItem, deleteBomRawItem } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

type RawItem = { id: string; rawMaterialId: string | null; quantity: unknown; rawMaterial?: { name: string | null; unit: string | null } | null };
type RawOption = { id: string; name: string | null; unit: string | null };

export function BOMRawItemsSection({
  bomId,
  items,
  rawMaterials,
}: { bomId: string; items: RawItem[]; rawMaterials: RawOption[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [addMaterialId, setAddMaterialId] = useState('');
  const [addQuantity, setAddQuantity] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState('');

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!addMaterialId || !addQuantity) return;
    setLoading(true);
    try {
      await addBomRawItem(bomId, addMaterialId, addQuantity);
      setAddMaterialId('');
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
      await updateBomRawItem(id, editQuantity);
      setEditingId(null);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Remove this raw material from BOM?')) return;
    setLoading(true);
    try {
      await deleteBomRawItem(id, bomId);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to remove');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl bg-white border border-slate-200 p-6">
      <h2 className="font-medium text-slate-900 mb-2">Raw materials (per unit of product)</h2>
      <p className="text-xs text-slate-500 mb-4">Required quantity × units produced = total deducted from inventory when production is completed.</p>
      {items.length === 0 ? (
        <p className="text-sm text-slate-500 mb-4">No raw materials. Add below.</p>
      ) : (
        <ul className="space-y-2 mb-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-2 py-2 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-800">{item.rawMaterial?.name ?? 'Material'}</span>
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
                  <span className="text-slate-600">{item.quantity != null ? String(item.quantity) : 0} {item.rawMaterial?.unit ?? ''}</span>
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
          <label className="block text-xs font-medium text-slate-600 mb-1">Add raw material</label>
          <select
            value={addMaterialId}
            onChange={(e) => setAddMaterialId(e.target.value)}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm min-w-[180px]"
          >
            <option value="">Select...</option>
            {rawMaterials.filter((r) => !items.some((i) => i.rawMaterialId === r.id)).map((r) => (
              <option key={r.id} value={r.id}>{r.name ?? r.id.slice(0, 8)} ({r.unit ?? '-'})</option>
            ))}
            {rawMaterials.filter((r) => !items.some((i) => i.rawMaterialId === r.id)).length === 0 && rawMaterials.length > 0 && (
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
          disabled={loading || !addMaterialId || !addQuantity}
          className="rounded-lg bg-primary text-white px-3 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-1"
        >
          {loading && <LoadingSpinner size="sm" />}
          Add
        </button>
      </form>
    </div>
  );
}
