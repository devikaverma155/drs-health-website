import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const DEFAULT_COMBOS = [
  {
    id: 'default-1',
    title: 'Wellness Combo',
    description: 'Complete health package for daily wellness',
    imageUrl: 'https://drshealth.in/wp-content/uploads/2024/11/Syadwad-Combo.webp',
    price: '₹1,499',
    originalPrice: '₹1,999',
    discount: '25%',
    ctaLabel: 'Add to Cart',
    ctaHref: '/shop',
    sortOrder: 0,
    isActive: true,
  },
  {
    id: 'default-2',
    title: 'Immunity Booster',
    description: 'Strengthen your immunity with our premium combo',
    imageUrl: 'https://drshealth.in/wp-content/uploads/2024/11/SW-Products.png',
    price: '₹1,799',
    originalPrice: '₹2,399',
    discount: '25%',
    ctaLabel: 'Add to Cart',
    ctaHref: '/shop',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'default-3',
    title: 'Skincare Essential',
    description: 'Complete skincare routine in one combo',
    imageUrl: 'https://drshealth.in/wp-content/uploads/2024/12/Herbalis-Shampoo-scaled.webp',
    price: '₹2,099',
    originalPrice: '₹2,899',
    discount: '28%',
    ctaLabel: 'Add to Cart',
    ctaHref: '/shop',
    sortOrder: 2,
    isActive: true,
  },
];

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const combos = await prisma.comboOffer.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    if (combos.length === 0) {
      return NextResponse.json(DEFAULT_COMBOS);
    }

    return NextResponse.json(combos);
  } catch {
    return NextResponse.json(DEFAULT_COMBOS);
  }
}
