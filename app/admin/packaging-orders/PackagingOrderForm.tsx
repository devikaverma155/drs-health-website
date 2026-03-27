'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPackagingOrder, updatePackagingOrder, getVendorsForPackagingOrder, getPackagingMaterialsForOrder } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { PackagingOrder } from '@prisma/client';
import { normalizeVendorOrderStatusForForm } from '@/lib/vendor-order-status';

type PackagingOption = { id: string; name: string | null; packagingCode: string | null; unit: string | null };
type VendorOption = { id: string; name: string };

type OrderWithRelations = PackagingOrder & { vendor?: { name: string } | null; packaging?: { name: string | null } | null };

export function PackagingOrderForm({ order: existingOrder }: { order?: OrderWithRelations | null }) {
  const router = useRouter();
  const isEdit = !!existingOrder;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [vendors, setVendors] = useState<VendorOption[]>([]);
  const [packagingMaterials, setPackagingMaterials] = useState<PackagingOption[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [vendorId, setVendorId] = useState(existingOrder?.vendorId ?? '');
  const [packagingId, setPackagingId] = useState(existingOrder?.packagingId ?? '');
  const [materialType, setMaterialType] = useState(existingOrder?.materialType ?? '');
  const [quantity, setQuantity] = useState(existingOrder?.quantity ?? '');
  const [unit, setUnit] = useState(existingOrder?.unit ?? '');
  const [price, setPrice] = useState(existingOrder?.price != null ? String(existingOrder.price) : '');
  const [deliveryDate, setDeliveryDate] = useState(existingOrder?.deliveryDate ? new Date(existingOrder.deliveryDate).toISOString().split('T')[0] : '');
  const [status, setStatus] = useState(() => normalizeVendorOrderStatusForForm(existingOrder?.status ?? 'pending'));
  const [notes, setNotes] = useState(existingOrder?.notes ?? '');

  useEffect(() => {
    async function load() {
      try {
        const [v, pm] = await Promise.all([getVendorsForPackagingOrder(), getPackagingMaterialsForOrder()]);
        setVendors(v);
        setPackagingMaterials(pm);
      } catch (err) {
        console.error('Failed to load:', err);
      } finally {
        setLoadingData(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (packagingId && !unit && packagingMaterials.length) {
      const p = packagingMaterials.find((x) => x.id === packagingId);
      if (p?.unit) setUnit(p.unit);
    }
  }, [packagingId, packagingMaterials, unit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isEdit && existingOrder) {
        await updatePackagingOrder(existingOrder.id, {
          vendorId: vendorId || undefined,
          packagingId: packagingId || undefined,
          materialType: materialType || undefined,
          quantity: quantity || undefined,
          unit: unit || undefined,
          price: price || undefined,
          deliveryDate: deliveryDate || undefined,
          status,
          notes: notes || undefined,
        });
        router.push('/admin/vendor-orders');
        router.refresh();
        return;
      }
      await createPackagingOrder({
        vendorId,
        packagingId: packagingId || undefined,
        materialType,
        quantity,
        unit,
        price,
        deliveryDate,
        status,
        notes,
      });
      router.push('/admin/vendor-orders');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Vendor *</label>
          <select
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
            disabled={loadingData || loading}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">Select vendor...</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Packaging Material (for inventory when Complete)</label>
          <select
            value={packagingId}
            onChange={(e) => setPackagingId(e.target.value)}
            disabled={loadingData || loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">— Optional —</option>
            {packagingMaterials.map((p) => (
              <option key={p.id} value={p.id}>{p.name || p.packagingCode || p.id.slice(0, 8)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Material Type</label>
          <input
            type="text"
            value={materialType}
            onChange={(e) => setMaterialType(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="e.g., Bottles 100ml"
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
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Delivery Date</label>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="pending">Pending</option>
            <option value="ordered">Ordered</option>
            <option value="delivered">Delivered (adds to stock)</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={loading}
          rows={2}
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
          {isEdit ? 'Update Order' : 'Create Order'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/vendor-orders')}
          disabled={loading}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          {isEdit ? 'Back' : 'Cancel'}
        </button>
      </div>
    </form>
  );
}
