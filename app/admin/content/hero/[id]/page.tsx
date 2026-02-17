import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { HeroBannerForm } from '../HeroBannerForm';

export const dynamic = 'force-dynamic';

export default async function EditHeroBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const banner = await prisma.heroBanner.findUnique({ where: { id } });
  if (!banner) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/content/hero" className="text-sm text-slate-500 hover:text-slate-900">
        ← Hero banners
      </Link>
      <h1 className="text-2xl font-semibold text-slate-900">Edit hero slide</h1>
      <HeroBannerForm banner={banner} />
    </div>
  );
}
