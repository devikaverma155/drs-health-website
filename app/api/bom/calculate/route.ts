import { NextRequest, NextResponse } from 'next/server';
import { calculateBOM, getProductInventoryStatus } from '@/lib/bom-calculator';

/**
 * POST /api/bom/calculate
 * Calculate BOM for a product with given quantity
 */
export async function POST(req: NextRequest) {
  try {
    const { productId, quantity } = await req.json();

    if (!productId || !quantity || quantity <= 0) {
      return NextResponse.json(
        { error: 'Product ID and valid quantity required' },
        { status: 400 }
      );
    }

    const result = await calculateBOM(productId, quantity);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('BOM calculation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Calculation failed' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/bom/inventory-status?productId=...
 * Get inventory status and max production units for a product
 */
export async function GET(req: NextRequest) {
  try {
    const productId = req.nextUrl.searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID required' },
        { status: 400 }
      );
    }

    const status = await getProductInventoryStatus(productId);

    if (!status) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: status,
    });
  } catch (error) {
    console.error('Inventory status error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get status' },
      { status: 500 }
    );
  }
}
