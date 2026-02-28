import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { HeroSlideForm } from '../HeroSlideForm';

export const dynamic = 'force-dynamic';

export default async function EditSlidePage({ params }: { params: { id: string } }) {
  const slide = await prisma.heroSlide.findUnique({ where: { id: params.id } });
  if (!slide) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/content/slideshow" className="text-sm text-slate-500 hover:text-slate-700">
          ← Back to Slideshow
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900">Edit Slide</h1>
      <HeroSlideForm slide={slide} />
    </div>
  );
}
