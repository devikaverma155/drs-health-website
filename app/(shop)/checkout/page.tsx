'use client';

import { useCart } from '@/lib/cartContext';
import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';

const CUSTOMER_KEYS = {
  firstName: 'customer-first-name',
  lastName: 'customer-last-name',
  email: 'customer-email',
  phone: 'customer-phone',
} as const;

function getSavedCustomer(): Partial<{ firstName: string; lastName: string; email: string; phone: string }> {
  if (typeof window === 'undefined') return {};
  return {
    firstName: localStorage.getItem(CUSTOMER_KEYS.firstName) ?? '',
    lastName: localStorage.getItem(CUSTOMER_KEYS.lastName) ?? '',
    email: localStorage.getItem(CUSTOMER_KEYS.email) ?? '',
    phone: localStorage.getItem(CUSTOMER_KEYS.phone) ?? '',
  };
}

declare global {
  interface Window {
    Razorpay: new (options: {
      key: string;
      amount: number;
      order_id: string;
      name: string;
      description: string;
      handler: (res: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void;
      prefill?: { email?: string; contact?: string };
      theme?: { color: string };
    }) => { open: () => void };
  }
}

const PAYMENT_DESCRIPTION = 'UPI | Credit Card | Debit Card | NetBanking';

function loadRazorpay(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

type AddressInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

const emptyAddress: AddressInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
};

export default function CheckoutPage() {
  const { cart, clearAllItems } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<AddressInfo>({ ...emptyAddress });
  const [shippingInfo, setShippingInfo] = useState<AddressInfo>({ ...emptyAddress });

  // Pre-fill from logged-in customer: localStorage first, then fetch address from API
  useEffect(() => {
    const saved = getSavedCustomer();
    if (saved.firstName || saved.email) {
      setCustomerInfo((prev) => ({
        ...prev,
        firstName: saved.firstName ?? prev.firstName,
        lastName: saved.lastName ?? prev.lastName,
        email: saved.email ?? prev.email,
        phone: saved.phone ?? prev.phone,
      }));
    }

    const customerId = typeof window !== 'undefined' ? localStorage.getItem('customer-id') : null;
    if (!customerId) return;

    fetch(`/api/addresses?customerId=${encodeURIComponent(customerId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.addresses) return;
        const billing = data.addresses.billing || {};
        const shipping = data.addresses.shipping || {};
        const source = (billing.address_1 ? billing : shipping) as {
          first_name?: string;
          last_name?: string;
          phone?: string;
          address_1?: string;
          city?: string;
          state?: string;
          postcode?: string;
        };
        if (!source.address_1 && !source.city) return;
        setCustomerInfo((prev) => ({
          ...prev,
          firstName: source.first_name ?? prev.firstName,
          lastName: source.last_name ?? prev.lastName,
          phone: source.phone ?? prev.phone,
          address: source.address_1 ?? prev.address,
          city: source.city ?? prev.city,
          state: source.state ?? prev.state,
          zipCode: source.postcode ?? prev.zipCode,
        }));
      })
      .catch(() => {});
  }, []);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const billingFilled = customerInfo.firstName && customerInfo.email && customerInfo.phone && customerInfo.address;
  const shippingFilled = shippingInfo.firstName && shippingInfo.address;
  const shippingToUse = shipToDifferentAddress ? shippingInfo : customerInfo;

  const handleCheckout = useCallback(async () => {
    if (cart.items.length === 0) {
      alert('Cart is empty');
      return;
    }
    if (!customerInfo.firstName || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      alert('Please add your billing details');
      return;
    }
    if (shipToDifferentAddress && (!shippingToUse.address || !shippingToUse.firstName)) {
      alert('Please fill in the shipping address');
      return;
    }

    setIsProcessing(true);
    try {
      const orderData = {
        billing: {
          first_name: customerInfo.firstName,
          last_name: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address_1: customerInfo.address,
          city: customerInfo.city,
          state: customerInfo.state,
          postcode: customerInfo.zipCode,
          country: 'IN',
        },
        shipping: {
          first_name: shippingToUse.firstName,
          last_name: shippingToUse.lastName,
          address_1: shippingToUse.address,
          city: shippingToUse.city,
          state: shippingToUse.state,
          postcode: shippingToUse.zipCode,
          country: 'IN',
        },
        line_items: cart.items.map((item) => ({
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        customer_note: 'Order placed via DRS Health',
        status: 'pending',
      };

      const response = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const raw = await response.text();
      let result: { success?: boolean; error?: string; key?: string; amount?: number; razorpayOrderId?: string; wooOrderId?: string };
      try {
        result = JSON.parse(raw);
      } catch {
        alert(response.ok ? 'Invalid response from server' : `Error ${response.status}. Check the terminal for details.`);
        return;
      }
      if (!result.success) {
        alert(result.error || 'Failed to create order');
        return;
      }
      if (!result.key || result.amount == null || !result.razorpayOrderId || !result.wooOrderId) {
        alert('Invalid payment setup. Please try again.');
        return;
      }

      localStorage.setItem('customer-email', customerInfo.email);
      localStorage.setItem('customer-first-name', customerInfo.firstName);
      localStorage.setItem('customer-last-name', customerInfo.lastName);
      localStorage.setItem('customer-phone', customerInfo.phone);

      await loadRazorpay();
      const wooOrderId = result.wooOrderId;

      const rzp = new window.Razorpay({
        key: result.key,
        amount: result.amount,
        order_id: result.razorpayOrderId,
        name: 'DRS Health',
        description: PAYMENT_DESCRIPTION,
        theme: { color: '#A3261A' },
        prefill: { email: customerInfo.email, contact: customerInfo.phone },
        handler: async (res) => {
          try {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: res.razorpay_order_id,
                razorpay_payment_id: res.razorpay_payment_id,
                razorpay_signature: res.razorpay_signature,
                wooOrderId,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              clearAllItems();
              window.location.href = '/checkout/success';
            } else {
              alert(verifyData.error || 'Payment verification failed');
            }
          } catch {
            alert('Verification failed. Please contact support with your order id.');
          }
        },
      });
      rzp.open();
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error processing checkout');
    } finally {
      setIsProcessing(false);
    }
  }, [cart, customerInfo, shippingToUse, shipToDifferentAddress, clearAllItems]);

  const inputClass =
    'w-full px-4 py-2.5 border border-input-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary';

  const formatAddress = (a: AddressInfo) => {
    const parts = [
      [a.firstName, a.lastName].filter(Boolean).join(' '),
      a.address,
      [a.city, a.state].filter(Boolean).join(a.state ? ', ' : ''),
      a.zipCode,
    ].filter(Boolean);
    return parts.join('\n');
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Checkout</h1>
          <p className="text-body-muted mb-6">Your cart is empty</p>
          <Link href="/shop" className="inline-block px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Billing — show as summary, or form when "Change" clicked */}
            <div className="card-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Billing &amp; shipping</h2>
                {billingFilled && !showBillingForm && (
                  <button
                    type="button"
                    onClick={() => setShowBillingForm(true)}
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Change
                  </button>
                )}
              </div>
              {!showBillingForm && billingFilled ? (
                <div className="text-body-muted whitespace-pre-line">
                  <p className="font-medium text-foreground">
                    {[customerInfo.firstName, customerInfo.lastName].filter(Boolean).join(' ')}
                  </p>
                  <p>{customerInfo.email}</p>
                  {customerInfo.phone && <p>{customerInfo.phone}</p>}
                  <p className="mt-2">{formatAddress(customerInfo)}</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" name="firstName" placeholder="First Name *" value={customerInfo.firstName} onChange={handleBillingChange} className={inputClass} />
                      <input type="text" name="lastName" placeholder="Last Name" value={customerInfo.lastName} onChange={handleBillingChange} className={inputClass} />
                    </div>
                    <input type="email" name="email" placeholder="Email *" value={customerInfo.email} onChange={handleBillingChange} className={inputClass} />
                    <input type="tel" name="phone" placeholder="Phone *" value={customerInfo.phone} onChange={handleBillingChange} className={inputClass} />
                    <textarea name="address" placeholder="Address *" value={customerInfo.address} onChange={handleBillingChange} rows={2} className={inputClass} />
                    <div className="grid grid-cols-3 gap-4">
                      <input type="text" name="city" placeholder="City" value={customerInfo.city} onChange={handleBillingChange} className={inputClass} />
                      <input type="text" name="state" placeholder="State" value={customerInfo.state} onChange={handleBillingChange} className={inputClass} />
                      <input type="text" name="zipCode" placeholder="Zip" value={customerInfo.zipCode} onChange={handleBillingChange} className={inputClass} />
                    </div>
                  </div>
                  {billingFilled && (
                    <button type="button" onClick={() => setShowBillingForm(false)} className="mt-4 text-sm text-primary hover:underline font-medium">
                      Done
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Ship to different address */}
            <div className="card-soft p-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shipToDifferentAddress}
                  onChange={(e) => setShipToDifferentAddress(e.target.checked)}
                  className="w-4 h-4 rounded border-input-border text-primary focus:ring-primary/40"
                />
                <span className="font-medium text-foreground">Ship to a different address</span>
              </label>
              {shipToDifferentAddress && (
                <div className="mt-4 pt-4 border-t border-border space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="firstName" placeholder="First Name *" value={shippingInfo.firstName} onChange={handleShippingChange} className={inputClass} />
                    <input type="text" name="lastName" placeholder="Last Name" value={shippingInfo.lastName} onChange={handleShippingChange} className={inputClass} />
                  </div>
                  <textarea name="address" placeholder="Address *" value={shippingInfo.address} onChange={handleShippingChange} rows={2} className={inputClass} />
                  <div className="grid grid-cols-3 gap-4">
                    <input type="text" name="city" placeholder="City" value={shippingInfo.city} onChange={handleShippingChange} className={inputClass} />
                    <input type="text" name="state" placeholder="State" value={shippingInfo.state} onChange={handleShippingChange} className={inputClass} />
                    <input type="text" name="zipCode" placeholder="Zip" value={shippingInfo.zipCode} onChange={handleShippingChange} className={inputClass} />
                  </div>
                  <input type="tel" name="phone" placeholder="Phone (optional)" value={shippingInfo.phone} onChange={handleShippingChange} className={inputClass} />
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="card-soft p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 pb-4 border-b border-border">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-body-muted">{item.productName} x {item.quantity}</span>
                    <span className="font-medium text-foreground">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-body-muted">Subtotal</span>
                  <span className="font-medium text-foreground">₹{cart.totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-body-muted">Shipping</span>
                  <span className="font-medium text-foreground">TBD</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-bold text-foreground mb-6 pb-6 border-b border-border">
                <span>Total</span>
                <span>₹{cart.totalPrice}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark disabled:opacity-50 font-bold"
              >
                {isProcessing ? 'Opening payment...' : 'Pay Now'}
              </button>
              <p className="text-xs text-body-muted mt-2 text-center">{PAYMENT_DESCRIPTION}</p>
              <Link href="/cart" className="block mt-4 text-center text-primary hover:underline text-sm font-medium">
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
