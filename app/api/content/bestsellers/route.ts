import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const featured = await prisma.featuredProduct.findMany({
      where: { isActive: true, section: 'bestsellers' },
      orderBy: { sortOrder: 'asc' },
      select: { wooProductId: true, wooProductSlug: true, productName: true, productImage: true },
    });
    return NextResponse.json(featured);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
