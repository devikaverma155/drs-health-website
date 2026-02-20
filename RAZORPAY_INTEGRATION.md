# Razorpay Payment Integration Guide

## Overview
This guide provides step-by-step instructions for integrating Razorpay payments with the DRS Health checkout system.

## Prerequisites

1. Razorpay Account (https://razorpay.com)
2. Razorpay API Keys:
   - Key ID (public)
   - Key Secret (private)

## Setup Steps

### 1. Get Razorpay API Keys

1. Go to https://dashboard.razorpay.com
2. Navigate to Settings → API Keys
3. Copy your **Key ID** and **Key Secret**
4. Add to `.env.local`:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=xxxxxx_xxxxx
```

### 2. Install Razorpay SDK

```bash
npm install razorpay
```

### 3. Create Razorpay Payment Routes

Create `/app/api/razorpay/create-payment.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

interface PaymentRequest {
  orderId: string;
  amount: number; // in INR
  email: string;
  phone: string;
  customerName: string;
}

export async function POST(req: NextRequest) {
  try {
    const { orderId, amount, email, phone, customerName }: PaymentRequest = await req.json();

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `order_${orderId}`,
      notes: {
        woocommerce_order_id: orderId,
        customer_email: email,
        customer_phone: phone,
      },
    });

    return NextResponse.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: amount,
      currency: 'INR',
    });
  } catch (error) {
    console.error('Razorpay error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create Razorpay order',
      },
      { status: 500 }
    );
  }
}
```

### 4. Create Payment Verification Route

Create `/app/api/razorpay/verify-payment.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface VerifyRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  woocommerce_order_id: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: VerifyRequest = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, woocommerce_order_id } = body;

    // Verify signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid payment signature',
        },
        { status: 400 }
      );
    }

    // Update WooCommerce order status
    const wcUrl = process.env.NEXT_PUBLIC_WC_API_URL;
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const baseUrl = wcUrl?.replace(/\/$/, '');

    const updateResponse = await fetch(`${baseUrl}/orders/${woocommerce_order_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        status: 'processing',
        transaction_id: razorpay_payment_id,
        set_paid: true,
      }),
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to update WooCommerce order');
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and order updated',
      woocommerce_order_id,
      razorpay_payment_id,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Payment verification failed',
      },
      { status: 500 }
    );
  }
}
```

### 5. Create Payment Component

Create `/components/RazorpayPayment.tsx`:

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface RazorpayPaymentProps {
  orderId: string;
  amount: number;
  email: string;
  phone: string;
  customerName: string;
  onSuccess: (paymentData: any) => void;
  onError: (error: any) => void;
}

export function RazorpayPayment({
  orderId,
  amount,
  email,
  phone,
  customerName,
  onSuccess,
  onError,
}: RazorpayPaymentProps) {
  const [loading, setLoading] = useState(false);
  const [razorpayOrderId, setRazorpayOrderId] = useState<string | null>(null);

  const handlePaymentClick = async () => {
    if (!razorpayOrderId) {
      try {
        setLoading(true);
        // Create Razorpay order
        const response = await fetch('/api/razorpay/create-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            amount,
            email,
            phone,
            customerName,
          }),
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.error);

        setRazorpayOrderId(data.razorpayOrderId);
        initiatePayment(data.razorpayOrderId);
      } catch (error) {
        onError(error);
        setLoading(false);
      }
    }
  };

  const initiatePayment = (razorpayOrderId: string) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: razorpayOrderId,
      amount: amount * 100,
      currency: 'INR',
      name: 'DRS Health',
      description: `Order #${orderId}`,
      customer_details: {
        name: customerName,
        email,
        contact: phone,
      },
      handler: async (response: any) => {
        try {
          // Verify payment
          const verifyResponse = await fetch('/api/razorpay/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              woocommerce_order_id: orderId,
            }),
          });

          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            onSuccess(verifyData);
          } else {
            onError(new Error(verifyData.error));
          }
        } catch (error) {
          onError(error);
        }
      },
      prefill: {
        name: customerName,
        email,
        contact: phone,
      },
      theme: {
        color: '#2563eb', // Blue color matching DRS Health theme
      },
    };

    if (window.Razorpay) {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <button
        onClick={handlePaymentClick}
        disabled={loading}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 font-bold"
      >
        {loading ? 'Processing...' : 'Pay with Razorpay'}
      </button>
    </>
  );
}

// Extend window type for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}
```

### 6. Update Checkout Page

Update `/app/(shop)/checkout/page.tsx` to use Razorpay:

```tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import Link from 'next/link';
import { RazorpayPayment } from '@/components/RazorpayPayment';

// ... existing code ...

export default function CheckoutPage() {
  const { cart, clearAllItems } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCreated, setOrderCreated] = useState<any>(null);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleCheckout = async () => {
    // ... existing validation ...
    
    const orderData = {
      // ... existing orderData ...
    };

    try {
      const response = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (result.success) {
        setOrderCreated(result.order);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handlePaymentSuccess = (paymentData: any) => {
    clearAllItems();
    // Redirect to success page
    window.location.href = `/order-confirmation?orderId=${paymentData.woocommerce_order_id}`;
  };

  const handlePaymentError = (error: any) => {
    alert('Payment failed: ' + (error.message || 'Unknown error'));
  };

  if (orderCreated) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Complete Payment</h1>
          <div className="mb-6">
            <p className="text-gray-600">Order ID: {orderCreated.id}</p>
            <p className="text-gray-600">Amount: ₹{orderCreated.total}</p>
          </div>
          <RazorpayPayment
            orderId={String(orderCreated.id)}
            amount={parseFloat(orderCreated.total)}
            email={customerInfo.email}
            phone={customerInfo.phone}
            customerName={`${customerInfo.firstName} ${customerInfo.lastName}`}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>
      </div>
    );
  }

  // ... rest of existing checkout form ...
}
```

## Webhook Setup (Optional but Recommended)

For handling asynchronous payment updates, set up webhooks in Razorpay dashboard:

1. Go to Settings → Webhooks
2. Add URL: `https://your-domain.com/api/razorpay/webhook`
3. Select events:
   - `order.paid`
   - `payment.authorized`
   - `payment.failed`

Create `/app/api/razorpay/webhook.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    // Verify webhook signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex');

    if (generated_signature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);

    // Handle different event types
    switch (event.event) {
      case 'order.paid':
        // Handle paid order
        break;
      case 'payment.authorized':
        // Handle authorized payment
        break;
      case 'payment.failed':
        // Handle failed payment
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
```

## Environment Variables Required

Add to `.env.local`:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=xxxxxx_xxxxx
RAZORPAY_WEBHOOK_SECRET=whsec_xxxxx
```

## Testing

### Test Cards
- Visa: `4111 1111 1111 1111` | CVV: `123` | Expiry: Any future date
- Mastercard: `5555 5555 5555 4444` | CVV: `123` | Expiry: Any future date

### Test Flow
1. Go to product page
2. Add to cart
3. Go to cart and proceed to checkout
4. Fill in details and create order
5. Click "Pay with Razorpay"
6. Use test card details
7. Confirm payment

## Payment Status Flow

```
Order Created (pending) → Razorpay Session → Payment Done
                              ↓
                      Customer Completes Payment
                              ↓
                      Payment Verified (signature)
                              ↓
                      Order Status → processing
                              ↓
                      Send Confirmation Email
                              ↓
                      Order Complete
```

## Error Handling

Common errors:

| Error | Solution |
|-------|----------|
| Invalid signature | Check webhook secret |
| Order not found | Verify WooCommerce order ID |
| API key error | Check Razorpay credentials |
| Network timeout | Implement retry logic |

## Troubleshooting

1. **Razorpay script not loading**: Check if Script component is properly configured
2. **Payment verification fails**: Verify key secret is correct
3. **Order not updated**: Check WooCommerce API credentials
4. **Test mode vs Live**: Ensure you're using correct keys for environment

## Security Best Practices

1. ✅ Never expose `RAZORPAY_KEY_SECRET` in client code
2. ✅ Always verify signatures on server
3. ✅ Use HTTPS only
4. ✅ Validate all inputs before processing
5. ✅ Log all payment attempts
6. ✅ Implement rate limiting on API endpoints

## Support Resources

- Razorpay Docs: https://razorpay.com/docs/
- API Reference: https://razorpay.com/docs/api/
- SDK Github: https://github.com/razorpay/razorpay-node

## Next Steps

1. Get Razorpay API keys from dashboard
2. Add environment variables
3. Install razorpay package
4. Create API routes
5. Update checkout page
6. Test with test cards
7. Switch to live keys after testing
