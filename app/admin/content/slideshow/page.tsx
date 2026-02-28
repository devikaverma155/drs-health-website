import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { DeleteSlideButton } from './DeleteSlideButton';

export const dynamic = 'force-dynamic';

export default async function SlideshowPage() {
  const slides = await prisma.heroSlide.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Hero Slideshow</h1>
          <p className="text-sm text-slate-500 mt-1">Manage the homepage hero banner slides</p>
        </div>
        <Link
          href="/admin/content/slideshow/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          + Add Slide
        </Link>
      </div>

      {slides.length === 0 ? (
        <div className="rounded-xl bg-white border border-slate-200 p-12 text-center">
          <div className="text-4xl mb-3">🖼️</div>
          <p className="text-slate-500 text-sm">No slides yet. Default slides from code will be used.</p>
          <Link
            href="/admin/content/slideshow/new"
            className="inline-block mt-4 text-sm text-primary hover:underline"
          >
            Create your first slide →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="rounded-xl bg-white border border-slate-200 overflow-hidden flex"
            >
              {/* Thumbnail */}
              <div className="w-48 h-32 relative shrink-0 bg-slate-100">
                {slide.imageUrl ? (
                  <Image
                    src={slide.imageUrl}
                    alt={slide.imageAlt || slide.headline}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                    No image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-4 flex items-center justify-between min-w-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">#{idx + 1}</span>
                    <h3 className="font-medium text-slate-900 truncate">{slide.headline}</h3>
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                      slide.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {slide.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  {slide.subtext && (
                    <p className="text-sm text-slate-500 mt-1 truncate">{slide.subtext}</p>
                  )}
                  <div className="flex gap-3 mt-2 text-xs text-slate-400">
                    {slide.ctaLabel && <span>Button: {slide.ctaLabel}</span>}
                    {slide.ctaHref && <span>→ {slide.ctaHref}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <Link
                    href={`/admin/content/slideshow/${slide.id}`}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Edit
                  </Link>
                  <DeleteSlideButton id={slide.id} headline={slide.headline} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-lg bg-blue-50 border border-blue-100 p-4">
        <p className="text-sm text-blue-700">
          <strong>💡 Tip:</strong> If no slides are added here, the website will use the default slides from the code.
          Once you add at least one slide here, only the slides you create will be shown on the homepage.
        </p>
      </div>
    </div>
  );
}
