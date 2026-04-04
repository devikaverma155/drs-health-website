import { NextRequest, NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

const DISCOUNT_RATE = 0.1;
const DELIVERY_CHARGE = 100;
const PARTIAL_ADVANCE_RATIO = 0.5;

interface LineItem {
  product_id: string;
  quantity: number;
  price: string;
}

interface OrderRequest {
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  line_items: LineItem[];
  customer_note?: string;
  status?: string;
  paymentMethod?: 'razorpay' | 'cod' | 'partial'; // Payment method selection
}

/**
 * POST /api/checkout/create-order
 * Create an order in WooCommerce with support for both Razorpay and COD payment methods
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const orderData: OrderRequest = await req.json();
    const paymentMethod = orderData.paymentMethod || 'razorpay';
    const subtotal = orderData.line_items.reduce((sum, item) => {
      const linePrice = parseFloat(String(item.price || 0));
      const lineQty = Number(item.quantity || 0);
      return sum + (Number.isFinite(linePrice) ? linePrice : 0) * (Number.isFinite(lineQty) ? lineQty : 0);
    }, 0);
    const isOnlineOrPartial = paymentMethod === 'razorpay' || paymentMethod === 'partial';
    const discountAmount = isOnlineOrPartial ? subtotal * DISCOUNT_RATE : 0;
    const deliveryCharge = subtotal < 699 ? DELIVERY_CHARGE : 0;

    // Validate required fields
    if (!orderData.billing || !orderData.line_items || orderData.line_items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: billing or line_items',
        },
        { status: 400 }
      );
    }

    // Get WooCommerce API credentials
    const wcUrl = process.env.NEXT_PUBLIC_WC_API_URL;
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    if (!wcUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json(
        { success: false, error: 'Store is not configured. Please try again later.' },
        { status: 500 }
      );
    }

    // Create order in WooCommerce
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const baseUrl = wcUrl.replace(/\/$/, '');

    // Map payment method for WooCommerce
    const wcPaymentMethod = paymentMethod === 'cod' || paymentMethod === 'partial' ? 'cod' : 'razorpay';
    const initialStatus = paymentMethod === 'cod' ? 'pending' : 'pending';
    const feeLines: { name: string; total: string }[] = [];
    if (deliveryCharge > 0) {
      feeLines.push({ name: 'Delivery Charges', total: deliveryCharge.toFixed(2) });
    }
    if (discountAmount > 0) {
      feeLines.push({ name: 'Online Payment Discount (10%)', total: (-discountAmount).toFixed(2) });
    }

    const response = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        billing: orderData.billing,
        shipping: orderData.shipping,
        line_items: orderData.line_items.map((item) => ({
          product_id: parseInt(item.product_id),
          quantity: item.quantity,
        })),
        customer_note: orderData.customer_note || '',
        status: initialStatus,
        payment_method: wcPaymentMethod,
        payment_method_title:
          paymentMethod === 'cod'
            ? 'Cash on Delivery'
            : paymentMethod === 'partial'
              ? 'Partial Payment (Advance + COD)'
              : 'Razorpay',
        ...(feeLines.length > 0 ? { fee_lines: feeLines } : {}),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('WooCommerce API error:', response.status, errorText);
      let userMessage = `Failed to create order: ${response.statusText}`;
      try {
        const errJson = JSON.parse(errorText) as { message?: string; code?: string };
        if (errJson?.message) userMessage = errJson.message;
      } catch {
        if (errorText && errorText.length < 200) userMessage = errorText;
      }
      const isAuthError = response.status === 401 || response.status === 403 || /authentication|unauthorized|forbidden|not allowed/i.test(userMessage);
      if (isAuthError) {
        userMessage = 'Store is temporarily unavailable. Please try again later.';
      }
      return NextResponse.json(
        { success: false, error: userMessage },
        { status: response.status >= 500 ? 502 : response.status }
      );
    }

    let wooOrder: Record<string, unknown>;
    try {
      wooOrder = (await response.json()) as Record<string, unknown>;
    } catch {
      console.error('WooCommerce returned non-JSON response');
      return NextResponse.json(
        { success: false, error: 'Invalid response from store. Please try again.' },
        { status: 502 }
      );
    }

    const totalRaw = wooOrder.total ?? wooOrder.total_price ?? 0;
    const total = typeof totalRaw === 'number' ? totalRaw : parseFloat(String(totalRaw));
    if (Number.isNaN(total) || total <= 0) {
      console.error('Invalid WooCommerce order total:', totalRaw, wooOrder);
      return NextResponse.json(
        { success: false, error: 'Order total is invalid. Please refresh and try again.' },
        { status: 400 }
      );
    }

    // Handle COD payment method
    if (paymentMethod === 'cod') {
      try {
        await prisma.customerOrder.create({
          data: {
            wooOrderId: String(wooOrder.id),
            paymentMethod: 'cod',
            email: orderData.billing.email,
            phone: orderData.billing.phone,
            firstName: orderData.billing.first_name,
            lastName: orderData.billing.last_name,
            total: parseFloat(String(total)),
            status: 'pending', // COD orders start as pending - admin confirms
            items: orderData.line_items as unknown as Prisma.InputJsonValue,
            shippingAddress: orderData.shipping as unknown as Prisma.InputJsonValue,
            billingAddress: orderData.billing as unknown as Prisma.InputJsonValue,
            notes: orderData.customer_note || null,
          },
        });
      } catch (dbError) {
        console.error('Failed to store COD order in database:', dbError);
      }

      return NextResponse.json({
        success: true,
        message: 'Order created successfully with Cash on Delivery',
        order: wooOrder,
        wooOrderId: String(wooOrder.id),
        paymentMethod: 'cod',
        amount: Math.round(total * 100),
      });
    }

    // Handle Razorpay / Partial payment method
    const payableNow = paymentMethod === 'partial' ? total * PARTIAL_ADVANCE_RATIO : total;
    const amountPaise = Math.round(payableNow * 100);
    if (amountPaise < 100) {
      return NextResponse.json(
        { success: false, error: 'Minimum order amount is ₹1 for payment.' },
        { status: 400 }
      );
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { success: false, error: 'Razorpay not configured' },
        { status: 500 }
      );
    }

    // Create Razorpay order (Pay Now - Authorize and Capture)
    const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64'),
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: 'INR',
        receipt: `drs_woo_${wooOrder.id}`,
      }),
    });

    const rzpBody = await rzpRes.text();
    if (!rzpRes.ok) {
      let errMessage = 'Payment setup failed. Please try again.';
      try {
        const errJson = JSON.parse(rzpBody) as { error?: { description?: string } };
        if (errJson?.error?.description) errMessage = errJson.error.description;
      } catch {
        // use default
      }
      const isAuthError = rzpRes.status === 401 || rzpRes.status === 403 || /authentication|invalid.*key|unauthorized/i.test(errMessage);
      if (isAuthError) {
        console.error('Razorpay Auth Error - Check your API Keys:', { status: rzpRes.status, keyId: keyId?.substring(0, 10), body: rzpBody });
        errMessage = 'Razorpay API keys are invalid. Please contact admin.';
      }
      console.error('Razorpay order create error:', rzpRes.status, rzpBody);
      return NextResponse.json(
        { success: false, error: errMessage },
        { status: 500 }
      );
    }

    const rzpOrder = JSON.parse(rzpBody) as { id: string };

    // Store Razorpay order in database for local tracking
    try {
      await prisma.customerOrder.create({
        data: {
          wooOrderId: String(wooOrder.id),
          razorpayOrderId: rzpOrder.id,
          paymentMethod: paymentMethod,
          email: orderData.billing.email,
          phone: orderData.billing.phone,
          firstName: orderData.billing.first_name,
          lastName: orderData.billing.last_name,
          total: parseFloat(String(total)),
          status: 'pending',
          items: orderData.line_items as unknown as Prisma.InputJsonValue,
          shippingAddress: orderData.shipping as unknown as Prisma.InputJsonValue,
          billingAddress: orderData.billing as unknown as Prisma.InputJsonValue,
          notes: orderData.customer_note || null,
        },
      });
    } catch (dbError) {
      console.error('Failed to store order in database:', dbError);
      // Don't fail the request if DB save fails - the order is still created in WooCommerce
    }

    return NextResponse.json({
      success: true,
      message: 'Order created',
      order: wooOrder,
      razorpayOrderId: rzpOrder.id,
      amount: amountPaise,
      key: keyId,
      wooOrderId: String(wooOrder.id),
      paymentMethod,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
