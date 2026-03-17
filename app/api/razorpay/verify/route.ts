import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { sendOrderConfirmationEmail } from '@/lib/email';

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

    // Update order in our database and send confirmation email
    try {
      const dbOrder = await prisma.customerOrder.findUnique({
        where: { wooOrderId },
      });

      if (dbOrder) {
        // Update status in database
        await prisma.customerOrder.update({
          where: { id: dbOrder.id },
          data: {
            status: 'processing',
            razorpayPaymentId: razorpay_payment_id,
          },
        });

        // Send confirmation email
        const items = Array.isArray(dbOrder.items)
          ? dbOrder.items.map((item: any) => ({
              name: item.name || item.product_id,
              quantity: item.quantity || 1,
              price: item.price || '0',
            }))
          : [];

        await sendOrderConfirmationEmail(dbOrder.email || '', {
          orderNumber: wooOrderId,
          total: dbOrder.total?.toString() || '0',
          items,
          date: new Date().toLocaleDateString('en-IN'),
        }).catch((err) => {
          console.error('[Email send error]', err);
          // Don't fail the request if email fails
        });
      }
    } catch (dbError) {
      console.error('Failed to update database order:', dbError);
      // Don't fail if DB update fails - WooCommerce order is already updated
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
