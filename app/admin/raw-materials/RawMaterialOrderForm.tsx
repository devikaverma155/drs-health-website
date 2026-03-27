'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createRawMaterialOrder, updateRawMaterialOrder, createVendor, getAllVendors, getRawMaterialsForOrder } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { Vendor } from '@prisma/client';
import type { RawMaterialOrder } from '@prisma/client';
import { normalizeVendorOrderStatusForForm } from '@/lib/vendor-order-status';

type RawMaterialOption = { id: string; name: string | null; materialCode: string | null; unit: string | null };

type OrderWithRelations = RawMaterialOrder & { vendor?: { name: string } | null; rawMaterial?: { name: string | null } | null };

export function RawMaterialOrderForm({ order: existingOrder }: { order?: OrderWithRelations | null }) {
  const router = useRouter();
  const isEdit = !!existingOrder;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(isEdit);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [rawMaterials, setRawMaterials] = useState<RawMaterialOption[]>([]);
  const [loadingVendors, setLoadingVendors] = useState(true);
  const [createNewVendor, setCreateNewVendor] = useState(false);
  
  // Vendor fields
  const [vendorName, setVendorName] = useState('');
  const [vendorContactPerson, setVendorContactPerson] = useState('');
  const [vendorPhone, setVendorPhone] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorAddress, setVendorAddress] = useState('');
  const [vendorNotes, setVendorNotes] = useState('');
  
  // Order fields
  const [selectedVendorId, setSelectedVendorId] = useState(existingOrder?.vendorId ?? '');
  const [rawMaterialId, setRawMaterialId] = useState(existingOrder?.rawMaterialId ?? '');
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
        const [v, rm] = await Promise.all([getAllVendors(), getRawMaterialsForOrder()]);
        setVendors(v);
        setRawMaterials(rm);
      } catch (err) {
        console.error('Failed to load:', err);
      } finally {
        setLoadingVendors(false);
      }
    }
    if (showForm || isEdit) {
      load();
    }
  }, [showForm, isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      let vendorId = selectedVendorId;

      if (createNewVendor) {
        if (!vendorName?.trim()) {
          throw new Error('Vendor name is required.');
        }
        const newVendor = await createVendor({
          name: vendorName,
          contactPerson: vendorContactPerson,
          phone: vendorPhone,
          email: vendorEmail,
          address: vendorAddress,
          notes: vendorNotes,
        });
        vendorId = newVendor.id;
        setVendors([...vendors, newVendor]);
        setCreateNewVendor(false);
      }

      if (!vendorId) {
        throw new Error('Please select a vendor or create a new one.');
      }

      if (isEdit && existingOrder) {
        await updateRawMaterialOrder(existingOrder.id, {
          vendorId,
          rawMaterialId: rawMaterialId || undefined,
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

      await createRawMaterialOrder({
        vendorId,
        rawMaterialId: rawMaterialId || undefined,
        materialType,
        quantity,
        unit,
        price,
        deliveryDate,
        status,
        notes,
      });

      setSelectedVendorId('');
      setRawMaterialId('');
      setMaterialType('');
      setQuantity('');
      setUnit('');
      setPrice('');
      setDeliveryDate('');
      setStatus('pending');
      setNotes('');
      setVendorName('');
      setVendorContactPerson('');
      setVendorPhone('');
      setVendorEmail('');
      setVendorAddress('');
      setVendorNotes('');
      setShowForm(false);
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save order.');
      setLoading(false);
    }
  }

  // When raw material selected, fill unit if empty
  useEffect(() => {
    if (rawMaterialId && !unit && rawMaterials.length) {
      const rm = rawMaterials.find((r) => r.id === rawMaterialId);
      if (rm?.unit) setUnit(rm.unit);
    }
  }, [rawMaterialId, rawMaterials, unit]);

  if (!showForm && !isEdit) {
    return (
      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
      >
        Add Raw Material Order
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border-t border-slate-200 pt-6 mt-6">
      <h3 className="font-medium text-slate-900 mb-4">{isEdit ? 'Edit Raw Material Order' : 'Add Raw Material Order'}</h3>
      
      {/* Vendor Selection */}
      <div className="space-y-3 p-4 bg-slate-50 rounded-lg">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="select-vendor"
            checked={!createNewVendor}
            onChange={() => setCreateNewVendor(false)}
            className="w-4 h-4"
          />
          <label htmlFor="select-vendor" className="text-sm font-medium text-slate-700">
            Select Existing Vendor
          </label>
        </div>
        
        {!createNewVendor && (
          <div>
            {loadingVendors ? (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <LoadingSpinner size="sm" />
                Loading vendors...
              </div>
            ) : vendors.length === 0 ? (
              <p className="text-sm text-slate-500">No vendors yet. Create a new one below.</p>
            ) : (
              <select
                value={selectedVendorId}
                onChange={(e) => setSelectedVendorId(e.target.value)}
                disabled={loading}
                required={!createNewVendor}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="">Select a vendor...</option>
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name} {vendor.contactPerson ? `(${vendor.contactPerson})` : ''}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="create-vendor"
            checked={createNewVendor}
            onChange={() => setCreateNewVendor(true)}
            className="w-4 h-4"
          />
          <label htmlFor="create-vendor" className="text-sm font-medium text-slate-700">
            Create New Vendor
          </label>
        </div>

        {createNewVendor && (
          <div className="space-y-3 pl-7">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Vendor Name *</label>
              <input
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                disabled={loading}
                required={createNewVendor}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="Company/Vendor name"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  value={vendorContactPerson}
                  onChange={(e) => setVendorContactPerson(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={vendorPhone}
                  onChange={(e) => setVendorPhone(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={vendorEmail}
                  onChange={(e) => setVendorEmail(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Address</label>
                <input
                  type="text"
                  value={vendorAddress}
                  onChange={(e) => setVendorAddress(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Notes</label>
              <textarea
                value={vendorNotes}
                onChange={(e) => setVendorNotes(e.target.value)}
                disabled={loading}
                rows={2}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="block text-xs font-medium text-slate-700 mb-1">Raw Material (for inventory when status = Complete)</label>
          <select
            value={rawMaterialId}
            onChange={(e) => setRawMaterialId(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">— Optional: link to inventory material —</option>
            {rawMaterials.map((r) => (
              <option key={r.id} value={r.id}>{r.name || r.materialCode || r.id.slice(0, 8)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Material Type</label>
          <input
            type="text"
            value={materialType}
            onChange={(e) => setMaterialType(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="e.g., Turmeric Powder"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Quantity</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="e.g., 100"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Unit</label>
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="e.g., kg, liters"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Delivery Date</label>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Status</label>
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
        <div className="col-span-2">
          <label className="block text-xs font-medium text-slate-700 mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Additional notes about this order..."
          />
        </div>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <LoadingSpinner size="sm" />}
          {loading ? 'Saving…' : isEdit ? 'Update Order' : 'Create Order'}
        </button>
        {!isEdit && (
          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              setCreateNewVendor(false);
              setError('');
            }}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
        {isEdit && (
          <button
            type="button"
            onClick={() => router.push('/admin/vendor-orders')}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Back
          </button>
        )}
      </div>
    </form>
  );
}
