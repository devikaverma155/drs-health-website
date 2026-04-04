import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/razorpay/verify
 *
 * Step 1 (CRITICAL)  — HMAC signature check. Fails hard → no redirect.
 * Step 2 (OPTIONAL)  — Look up real wooOrderId from DB by razorpay_order_id.
 * Step 3 (OPTIONAL)  — Update WooCommerce order to "processing".
 * Step 4 (OPTIONAL)  — Update our DB CustomerOrder record.
 *
 * Steps 2-4 each run in their own try-catch so that a network timeout,
 * missing WC credentials, or DB hiccup NEVER blocks the success response.
 * Once the HMAC is valid the payment is real — the user must be redirected.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  // ── Parse body ──────────────────────────────────────────────────────────────
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, wooOrderId, paymentMethod } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !wooOrderId) {
    return NextResponse.json(
      { success: false, error: 'Missing payment or order data' },
      { status: 400 }
    );
  }

  // ── Step 1: HMAC signature verification (CRITICAL) ──────────────────────────
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    // Key not configured — log and return failure (can't verify without secret)
    console.error('[Razorpay] RAZORPAY_KEY_SECRET is not set in environment');
    return NextResponse.json(
      { success: false, error: 'Payment gateway not configured on server' },
      { status: 500 }
    );
  }

  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    console.warn('[Razorpay] Signature mismatch — possible tampered request', {
      razorpay_order_id,
      razorpay_payment_id,
    });
    return NextResponse.json({ success: false, error: 'Invalid payment signature' }, { status: 400 });
  }

  // ── Signature is valid — payment is confirmed ────────────────────────────────
  // All remaining steps are best-effort. Failures are logged but do NOT block redirect.

  // ── Step 2: Resolve the real wooOrderId from DB (security: don't trust client) ──
  let resolvedWooOrderId = wooOrderId;
  try {
    const dbOrderByRzp = await prisma.customerOrder.findFirst({
      where: { razorpayOrderId: razorpay_order_id },
      select: { wooOrderId: true },
    });
    if (dbOrderByRzp?.wooOrderId) {
      resolvedWooOrderId = dbOrderByRzp.wooOrderId;
    }
  } catch (err) {
    console.error('[Razorpay] DB lookup for wooOrderId failed (using client-supplied):', err);
  }

  const isPartialPayment = paymentMethod === 'partial';

  // ── Step 3: Update WooCommerce order status ─────────────────────────────────
  try {
    const wcUrl = process.env.NEXT_PUBLIC_WC_API_URL;
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    if (!wcUrl || !consumerKey || !consumerSecret) {
      console.warn('[Razorpay] WooCommerce env vars missing — skipping WC order update');
    } else {
      const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
      const baseUrl = wcUrl.replace(/\/$/, '');
      const updateRes = await fetch(`${baseUrl}/orders/${resolvedWooOrderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          status: isPartialPayment ? 'on-hold' : 'processing',
          transaction_id: razorpay_payment_id,
          set_paid: !isPartialPayment,
        }),
      });

      if (!updateRes.ok) {
        const errText = await updateRes.text().catch(() => '');
        console.error('[Razorpay] WooCommerce order update failed:', updateRes.status, errText);
        // Non-critical — continue to return success
      }
    }
  } catch (err) {
    console.error('[Razorpay] WooCommerce update threw an exception:', err);
    // Non-critical — continue
  }

  // ── Step 4: Update our CustomerOrder DB record ───────────────────────────────
  try {
    const dbOrder = await prisma.customerOrder.findUnique({
      where: { wooOrderId: resolvedWooOrderId },
    });
    if (dbOrder) {
      await prisma.customerOrder.update({
        where: { id: dbOrder.id },
        data: {
          status: isPartialPayment ? 'partial_paid' : 'processing',
          razorpayPaymentId: razorpay_payment_id,
        },
      });
    }
  } catch (err) {
    console.error('[Razorpay] DB order update failed:', err);
    // Non-critical — WooCommerce is source of truth
  }

  // ── All done — return success ────────────────────────────────────────────────
  return NextResponse.json({
    success: true,
    message: 'Payment verified. Your order has been confirmed.',
  });
}
