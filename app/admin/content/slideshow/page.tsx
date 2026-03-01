import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { DeleteSlideButton } from './DeleteSlideButton';
import { DEFAULT_HERO_SLIDES } from '@/lib/heroSlides';

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

      {/* Database Slides */}
      {slides.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Your Custom Slides</h2>
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

      {/* Default Hardcoded Slides */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
            {slides.length > 0 ? 'Default Slides (Fallback)' : 'Default Slides (Currently Active)'}
          </h2>
          <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
            Hardcoded
          </span>
        </div>
        {slides.length === 0 && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
            <p className="text-sm text-amber-700">
              ⚡ These default slides are currently showing on the website. Add your own slides above to replace them.
            </p>
          </div>
        )}
        <div className="space-y-2">
          {DEFAULT_HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className="rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex opacity-80"
            >
              {/* Thumbnail */}
              <div className="w-40 h-24 relative shrink-0 bg-slate-100">
                {slide.image ? (
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt || slide.headline}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs bg-gradient-to-br from-primary/5 to-primary/10">
                    🖼️
                  </div>
                )}
              </div>
              <div className="flex-1 p-3 flex items-center min-w-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">#{idx + 1}</span>
                    <h3 className="font-medium text-slate-700 truncate text-sm">{slide.headline}</h3>
                    <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-slate-200 text-slate-500">
                      Default
                    </span>
                  </div>
                  {slide.subtext && (
                    <p className="text-xs text-slate-400 mt-1 truncate">{slide.subtext}</p>
                  )}
                  <div className="flex gap-3 mt-1 text-xs text-slate-400">
                    {slide.ctaLabel && <span>→ {slide.ctaLabel}</span>}
                    {slide.ctaHref && <span>{slide.ctaHref}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 border border-blue-100 p-4">
        <p className="text-sm text-blue-700">
          <strong>💡 Tip:</strong> The default slides above are hardcoded in the codebase.
          {slides.length === 0 
            ? ' They are currently being shown on the website. Add your own slides to replace them.'
            : ' Your custom slides are being shown instead. The defaults are only used as fallback if all custom slides are removed.'}
        </p>
      </div>
    </div>
  );
}
