import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { HeroBannerList } from './HeroBannerList';

export const dynamic = 'force-dynamic';

export default async function HeroContentPage() {
  const banners = await prisma.heroBanner.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/content" className="text-sm text-slate-500 hover:text-slate-900">
            ← Content
          </Link>
          <h1 className="text-2xl font-semibold text-slate-900 mt-1">Hero banners</h1>
        </div>
        <Link
          href="/admin/content/hero/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          Add slide
        </Link>
      </div>
      <HeroBannerList banners={banners} />
    </div>
  );
}
