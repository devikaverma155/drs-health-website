'use client';

import { useState, useEffect } from 'react';

interface Address {
  first_name: string;
  last_name: string;
  phone: string;
  address_1: string;
  city: string;
  state: string;
  postcode: string;
}

interface AddressesSectionProps {
  email: string;
}

export function AddressesSection({ email }: AddressesSectionProps) {
  const [billingAddress, setBillingAddress] = useState<Address | null>(null);
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingType, setEditingType] = useState<'billing' | 'shipping' | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Address>({
    first_name: '',
    last_name: '',
    phone: '',
    address_1: '',
    city: '',
    state: '',
    postcode: '',
  });

  // Get customer ID and load addresses from WooCommerce
  useEffect(() => {
    const id = localStorage.getItem('customer-id');
    if (id) {
      setCustomerId(id);
      fetchAddresses(id);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchAddresses = async (id: string) => {
    try {
      const response = await fetch(`/api/addresses?customerId=${id}`);
      if (response.ok) {
        const data = await response.json();
        setBillingAddress(data.addresses.billing);
        setShippingAddress(data.addresses.shipping);
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.first_name || !formData.last_name || !formData.address_1 || !formData.city || !formData.postcode) {
      alert('Please fill in all required fields');
      return;
    }

    if (!customerId) {
      alert('User not logged in');
      return;
    }

    if (!editingType) {
      alert('Please select billing or shipping');
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch('/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          addressType: editingType,
          address: formData,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert('Error saving address: ' + (error.message || error.error));
        return;
      }

      // Reload addresses
      await fetchAddresses(customerId);
      setShowForm(false);
      setEditingType(null);
      resetForm();
    } catch (error) {
      alert('Error saving address');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (type: 'billing' | 'shipping') => {
    const address = type === 'billing' ? billingAddress : shippingAddress;
    if (address && Object.values(address).some(v => v)) {
      setFormData(address);
      setEditingType(type);
      setShowForm(true);
    } else {
      setEditingType(type);
      resetForm();
      setShowForm(true);
    }
  };

  const handleDelete = async (type: 'billing' | 'shipping') => {
    if (!customerId) {
      alert('User not logged in');
      return;
    }

    if (!confirm(`Delete ${type} address?`)) {
      return;
    }

    try {
      const response = await fetch('/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          addressType: type,
          address: {
            first_name: '',
            last_name: '',
            phone: '',
            address_1: '',
            city: '',
            state: '',
            postcode: '',
          },
        }),
      });

      if (!response.ok) {
        alert('Error deleting address');
        return;
      }

      // Reload addresses
      await fetchAddresses(customerId);
    } catch (error) {
      alert('Error deleting address');
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      phone: '',
      address_1: '',
      city: '',
      state: '',
      postcode: '',
    });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
      </div>

      {isLoading ? (
        <p className="text-gray-600">Loading addresses...</p>
      ) : !customerId ? (
        <p className="text-gray-600">Please log in to manage addresses</p>
      ) : (
        <>
          {/* Billing & Shipping Sections */}
          <div className="space-y-6 mb-8">
            {/* Billing Address */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Billing Address</h3>
                {!showForm && (
                  <button
                    onClick={() => handleEdit('billing')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    {billingAddress && Object.values(billingAddress).some(v => v) ? 'Edit' : 'Add'}
                  </button>
                )}
              </div>

              {billingAddress && Object.values(billingAddress).some(v => v) ? (
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p className="font-medium text-gray-900">{billingAddress.first_name} {billingAddress.last_name}</p>
                  <p>{billingAddress.address_1}</p>
                  <p>{billingAddress.city}{billingAddress.state && `, ${billingAddress.state}`} {billingAddress.postcode}</p>
                  <p>{billingAddress.phone}</p>
                </div>
              ) : (
                <p className="text-gray-500 italic">No billing address set</p>
              )}

              {billingAddress && Object.values(billingAddress).some(v => v) && (
                <button
                  onClick={() => handleDelete('billing')}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              )}
            </div>

            {/* Shipping Address */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
                {!showForm && (
                  <button
                    onClick={() => handleEdit('shipping')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    {shippingAddress && Object.values(shippingAddress).some(v => v) ? 'Edit' : 'Add'}
                  </button>
                )}
              </div>

              {shippingAddress && Object.values(shippingAddress).some(v => v) ? (
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p className="font-medium text-gray-900">{shippingAddress.first_name} {shippingAddress.last_name}</p>
                  <p>{shippingAddress.address_1}</p>
                  <p>{shippingAddress.city}{shippingAddress.state && `, ${shippingAddress.state}`} {shippingAddress.postcode}</p>
                  <p>{shippingAddress.phone}</p>
                </div>
              ) : (
                <p className="text-gray-500 italic">No shipping address set</p>
              )}

              {shippingAddress && Object.values(shippingAddress).some(v => v) && (
                <button
                  onClick={() => handleDelete('shipping')}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {editingType === 'billing' ? 'Edit Billing Address' : 'Edit Shipping Address'}
              </h3>

              <div className="space-y-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <textarea
                    name="address_1"
                    value={formData.address_1}
                    onChange={handleChange}
                    placeholder="Street address, apartment, etc."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* City & State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New Delhi"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Delhi"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code *
                  </label>
                  <input
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    placeholder="110001"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                  >
                    {isSaving ? 'Saving...' : 'Save Address'}
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingType(null);
                      resetForm();
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
