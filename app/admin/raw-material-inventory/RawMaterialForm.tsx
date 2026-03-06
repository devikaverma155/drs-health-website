'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRawMaterial, updateRawMaterial } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { RawMaterial } from '@prisma/client';

export function RawMaterialForm({
  material,
  vendorIds,
}: {
  material?: RawMaterial | null;
  vendorIds: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [materialCode, setMaterialCode] = useState(material?.materialCode ?? '');
  const [name, setName] = useState(material?.name ?? '');
  const [unit, setUnit] = useState(material?.unit ?? '');
  const [purchaseRate, setPurchaseRate] = useState(material?.purchaseRate?.toString() ?? '');
  const [supplierId, setSupplierId] = useState(material?.supplierId ?? '');
  const [minStock, setMinStock] = useState(material?.minStock?.toString() ?? '');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (material) {
        await updateRawMaterial(material.id, { materialCode, name, unit, purchaseRate, supplierId: supplierId || undefined, minStock });
      } else {
        await createRawMaterial({ materialCode, name, unit, purchaseRate, supplierId: supplierId || undefined, minStock });
      }
      router.push('/admin/raw-material-inventory');
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
          <label className="block text-sm font-medium text-slate-700 mb-1">Material code</label>
          <input type="text" value={materialCode} onChange={(e) => setMaterialCode(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Unit (kg/litre/gram)</label>
          <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Purchase rate</label>
          <input type="number" step="0.01" value={purchaseRate} onChange={(e) => setPurchaseRate(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Supplier</label>
          <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="">— Select —</option>
            {vendorIds.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Min stock (alert)</label>
          <input type="number" step="0.01" value={minStock} onChange={(e) => setMinStock(e.target.value)} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2">
          {loading && <LoadingSpinner size="sm" />}
          {loading ? 'Saving…' : material ? 'Update' : 'Create'}
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
