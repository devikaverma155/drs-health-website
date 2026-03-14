import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_WC_API_URL;
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    if (!baseUrl || !consumerKey || !consumerSecret) {
      console.error('Missing WooCommerce credentials:', { baseUrl: !!baseUrl, consumerKey: !!consumerKey, consumerSecret: !!consumerSecret });
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 500 }
      );
    }

    // Create Basic Auth header
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    // Get customer by email
    const response = await fetch(
      `${baseUrl}/customers?email=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('WooCommerce API error:', { status: response.status, error: errorText });
      return NextResponse.json(
        { error: `WooCommerce API Error: ${response.status}. Please check your credentials and WordPress configuration.` },
        { status: 500 }
      );
    }

    const customers = await response.json();
    
    if (!Array.isArray(customers) || customers.length === 0) {
      return NextResponse.json(
        { error: 'Account not found. Please sign up first.' },
        { status: 404 }
      );
    }

    const customer = customers[0];

    // Note: WooCommerce REST API doesn't verify passwords directly through the API
    // The password verification happens on the WordPress side
    // This endpoint just verifies the customer exists by email
    // For full authentication, you would need to use WordPress's native auth or implement custom password verification

    return NextResponse.json({
      success: true,
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.first_name,
        lastName: customer.last_name,
      },
    });
  } catch (error) {
    console.error('Login error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
