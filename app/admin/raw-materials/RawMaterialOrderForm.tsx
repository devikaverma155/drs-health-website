'use client';

import { useState, useEffect } from 'react';
import { createRawMaterialOrder, createVendor, getAllVendors } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { Vendor } from '@prisma/client';

export function RawMaterialOrderForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [vendors, setVendors] = useState<Vendor[]>([]);
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
  const [selectedVendorId, setSelectedVendorId] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    async function loadVendors() {
      try {
        const data = await getAllVendors();
        setVendors(data);
      } catch (err) {
        console.error('Failed to load vendors:', err);
      } finally {
        setLoadingVendors(false);
      }
    }
    if (showForm) {
      loadVendors();
    }
  }, [showForm]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      let vendorId = selectedVendorId;

      // If creating new vendor, create it first
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
        // Add to vendors list for future use
        setVendors([...vendors, newVendor]);
        setCreateNewVendor(false);
      }

      if (!vendorId) {
        throw new Error('Please select a vendor or create a new one.');
      }

      await createRawMaterialOrder({
        vendorId,
        materialType,
        quantity,
        unit,
        price,
        deliveryDate,
        status,
        notes,
      });

      // Reset form
      setSelectedVendorId('');
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
      setError(err instanceof Error ? err.message : 'Failed to create order.');
      setLoading(false);
    }
  }

  if (!showForm) {
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
      <h3 className="font-medium text-slate-900 mb-4">Add Raw Material Order</h3>
      
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
            <option value="delivered">Delivered</option>
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
          {loading ? 'Creating…' : 'Create Order'}
        </button>
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
      </div>
    </form>
  );
}
