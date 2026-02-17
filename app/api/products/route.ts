import { NextResponse } from 'next/server';
import { getProducts, getProductsByCategory, searchProducts } from '@/lib/woocommerce';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') ?? undefined;
    const search = searchParams.get('search') ?? undefined;
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 100);
    const newOnly = searchParams.get('new') === '1';

    let products;
    if (search) {
      products = await searchProducts(search, limit);
    } else if (category) {
      products = await getProductsByCategory(category, limit);
    } else {
      products = await getProducts({ limit, newOnly });
    }

    return NextResponse.json(products);
  } catch (e) {
    console.error('[api/products]', e);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
