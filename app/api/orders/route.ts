import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Fetch orders from WooCommerce for this email
    const baseUrl = process.env.NEXT_PUBLIC_WC_API_URL;
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    if (!baseUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json(
        { error: 'WooCommerce API credentials not configured' },
        { status: 500 }
      );
    }

    // Create Basic Auth header
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    const response = await fetch(`${baseUrl}/orders?customer=${encodeURIComponent(email)}`, {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API error: ${response.statusText}`);
    }

    const wcOrders = await response.json();

    // Transform WooCommerce orders to our format
    const orders = wcOrders.map((order: any) => ({
      id: order.id.toString(),
      orderNumber: order.number,
      date: order.date_created,
      total: order.total,
      status: order.status,
      items: order.line_items.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        price: (parseFloat(item.price) * item.quantity).toFixed(2),
      })),
    }));

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch orders',
        orders: [] 
      },
      { status: 200 } // Return 200 with empty orders on error
    );
  }
}
