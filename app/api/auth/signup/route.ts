import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, password } = await request.json();

    // Validate required fields
    if (!firstName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_WC_API_URL;
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    if (!baseUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json(
        { error: 'WooCommerce API not configured' },
        { status: 500 }
      );
    }

    // Create Basic Auth header
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    // Check if customer already exists
    const existingCustomers = await fetch(
      `${baseUrl}/customers?email=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!existingCustomers.ok) {
      throw new Error('Failed to check existing customers');
    }

    const existingData = await existingCustomers.json();
    if (existingData.length > 0) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create customer in WooCommerce
    const customerData = {
      username: email.split('@')[0] + '_' + Date.now(), // Generate unique username from email
      email: email,
      first_name: firstName,
      last_name: lastName || '',
      billing: {
        first_name: firstName,
        last_name: lastName || '',
        email: email,
        phone: phone || '',
      },
      shipping: {
        first_name: firstName,
        last_name: lastName || '',
      },
    };

    // Add password if provided
    if (password) {
      (customerData as any).password = password;
    }

    const response = await fetch(`${baseUrl}/customers`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('WooCommerce error:', error);
      throw new Error(error.message || 'Failed to create customer');
    }

    const customer = await response.json();

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
    console.error('Sign up error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create account' },
      { status: 500 }
    );
  }
}
