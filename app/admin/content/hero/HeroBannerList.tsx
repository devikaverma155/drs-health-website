import Link from 'next/link';
import type { HeroBanner } from '@prisma/client';

export function HeroBannerList({ banners }: { banners: HeroBanner[] }) {
  if (banners.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500 text-sm">
        No hero slides yet. <Link href="/admin/content/hero/new" className="text-primary hover:underline">Add one</Link>.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <ul className="divide-y divide-slate-100">
        {banners.map((b) => (
          <li key={b.id} className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-slate-50/50">
            <div className="flex items-center gap-4 min-w-0">
              {b.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element -- admin CMS, URLs dynamic
                <img
                  src={b.imageUrl}
                  alt=""
                  className="h-12 w-24 object-cover rounded border border-slate-200"
                />
              )}
              <div className="min-w-0">
                <p className="font-medium text-slate-900 truncate">{b.heading}</p>
                <p className="text-sm text-slate-500 truncate">{b.subtext ?? '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-400">Order {b.sortOrder}</span>
              {!b.active && <span className="text-xs text-amber-600">Inactive</span>}
              <Link href={`/admin/content/hero/${b.id}`} className="text-sm text-primary hover:underline">
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
