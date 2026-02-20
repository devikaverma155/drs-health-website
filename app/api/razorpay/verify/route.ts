import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * POST /api/razorpay/verify
 * Verify Razorpay payment signature and update WooCommerce order to processing.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, wooOrderId } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !wooOrderId) {
      return NextResponse.json(
        { success: false, error: 'Missing payment or order data' },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ success: false, error: 'Razorpay not configured' }, { status: 500 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: 'Invalid payment signature' }, { status: 400 });
    }

    // Update WooCommerce order to processing
    const wcUrl = process.env.NEXT_PUBLIC_WC_API_URL;
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;
    if (!wcUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json({ success: false, error: 'WooCommerce not configured' }, { status: 500 });
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const baseUrl = wcUrl.replace(/\/$/, '');
    const updateRes = await fetch(`${baseUrl}/orders/${wooOrderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        status: 'processing',
        transaction_id: razorpay_payment_id,
      }),
    });

    if (!updateRes.ok) {
      console.error('WooCommerce order update error:', await updateRes.text());
      return NextResponse.json(
        { success: false, error: 'Order update failed' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified. Your order has been confirmed.',
    });
  } catch (error) {
    console.error('Razorpay verify error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Verification failed' },
      { status: 500 }
    );
  }
}
