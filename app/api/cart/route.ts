import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/woocommerce';
import type { CartResponse, AddToCartRequest } from '@/types/cart';

/**
 * GET /api/cart
 * Return current cart (client manages via localStorage)
 * This endpoint can be used to sync cart across devices
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: 'Cart endpoint ready. Cart is managed client-side via localStorage.',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cart
 * Validate product and return product data for adding to cart
 */
export async function POST(req: NextRequest): Promise<NextResponse<CartResponse>> {
  try {
    const body: AddToCartRequest = await req.json();
    const { productId, quantity } = body;

    if (!productId || quantity < 1) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request',
          error: 'Invalid product ID or quantity',
        },
        { status: 400 }
      );
    }

    // Fetch product from WooCommerce to validate and get current data
    // ProductId could be slug or numeric ID - try both
    const product =
      (await getProductBySlug(productId)) ||
      (await getProductBySlug(String(productId)));

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: 'Product not found',
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    // Return product data for cart
    return NextResponse.json({
      success: true,
      message: 'Product retrieved successfully',
      cart: {
        items: [
          {
            id: `${product.id}-${Date.now()}`,
            productId: product.id,
            productName: product.title,
            price: product.priceRange.minVariantPrice.amount,
            image: product.featuredImage?.url,
            quantity,
            permalink: product.permalink,
          },
        ],
        totalItems: quantity,
        totalPrice: (
          parseFloat(product.priceRange.minVariantPrice.amount) * quantity
        ).toFixed(2),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Cart API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error processing cart request',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
