import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DEFAULT_HERO_SLIDES } from '@/lib/heroSlides';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    // If no slides in DB, return defaults
    if (slides.length === 0) {
      return NextResponse.json(
        DEFAULT_HERO_SLIDES.map((s, i) => ({
          id: s.id,
          headline: s.headline,
          subtext: s.subtext || null,
          ctaLabel: s.ctaLabel || null,
          ctaHref: s.ctaHref || null,
          secondaryCtaLabel: s.secondaryCtaLabel || null,
          secondaryCtaHref: s.secondaryCtaHref || null,
          imageUrl: s.image || null,
          imageAlt: s.imageAlt || null,
          sortOrder: i,
          isActive: true,
        }))
      );
    }

    return NextResponse.json(slides);
  } catch {
    // Fallback to defaults on any DB error
    return NextResponse.json(
      DEFAULT_HERO_SLIDES.map((s, i) => ({
        id: s.id,
        headline: s.headline,
        subtext: s.subtext || null,
        ctaLabel: s.ctaLabel || null,
        ctaHref: s.ctaHref || null,
        secondaryCtaLabel: s.secondaryCtaLabel || null,
        secondaryCtaHref: s.secondaryCtaHref || null,
        imageUrl: s.image || null,
        imageAlt: s.imageAlt || null,
        sortOrder: i,
        isActive: true,
      }))
    );
  }
}
