import Link from 'next/link';
import { HeroBannerForm } from '../HeroBannerForm';

export default function NewHeroBannerPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/content/hero" className="text-sm text-slate-500 hover:text-slate-900">
        ← Hero banners
      </Link>
      <h1 className="text-2xl font-semibold text-slate-900">New hero slide</h1>
      <HeroBannerForm />
    </div>
  );
}
