import { NextResponse } from 'next/server';
import { getProductReviews, createProductReview } from '@/lib/woocommerce';

export const dynamic = 'force-dynamic';

/**
 * GET /api/reviews?productId=123
 * Returns product reviews from WooCommerce (same as WP admin → Comments / product reviews).
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }
    const reviews = await getProductReviews(productId);
    return NextResponse.json(reviews);
  } catch (e) {
    console.error('[api/reviews GET]', e);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reviews
 * Body: { productId: string, name: string, email: string, rating: number, comment: string }
 * Creates a product review in WooCommerce (stored as comment; appears in WP admin).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, name, email, rating, comment } = body;
    if (!productId || !name?.trim() || !email?.trim() || !comment?.trim()) {
      return NextResponse.json(
        { error: 'productId, name, email, and comment are required' },
        { status: 400 }
      );
    }
    const r = Math.min(5, Math.max(1, Number(rating) || 5));
    const review = await createProductReview({
      product_id: productId,
      reviewer: name.trim(),
      reviewer_email: email.trim(),
      review: comment.trim(),
      rating: r,
    });
    if (!review) {
      return NextResponse.json(
        { error: 'WooCommerce API not configured or create failed' },
        { status: 503 }
      );
    }
    return NextResponse.json(review);
  } catch (e) {
    console.error('[api/reviews POST]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to submit review' },
      { status: 500 }
    );
  }
}
