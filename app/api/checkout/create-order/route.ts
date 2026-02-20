import { NextRequest, NextResponse } from 'next/server';

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
}

/**
 * POST /api/checkout/create-order
 * Create an order in WooCommerce
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const orderData: OrderRequest = await req.json();

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
        {
          success: false,
          error: 'WooCommerce API credentials not configured',
        },
        { status: 500 }
      );
    }

    // Create order in WooCommerce
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const baseUrl = wcUrl.replace(/\/$/, '');

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
        status: 'pending',
        payment_method: 'razorpay', // Payment method - will be processed via Razorpay
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
        userMessage = `WooCommerce authentication failed: ${userMessage} Check WC_CONSUMER_KEY and WC_CONSUMER_SECRET in .env (from WordPress → WooCommerce → Settings → Advanced → REST API).`;
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
    const amountPaise = Math.round(total * 100);
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
        errMessage = `Razorpay authentication failed: ${errMessage} Check NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env (use same mode: both Test or both Live).`;
      }
      console.error('Razorpay order create error:', rzpRes.status, rzpBody);
      return NextResponse.json(
        { success: false, error: errMessage },
        { status: 500 }
      );
    }

    const rzpOrder = JSON.parse(rzpBody) as { id: string };

    return NextResponse.json({
      success: true,
      message: 'Order created',
      order: wooOrder,
      razorpayOrderId: rzpOrder.id,
      amount: amountPaise,
      key: keyId,
      wooOrderId: String(wooOrder.id),
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
