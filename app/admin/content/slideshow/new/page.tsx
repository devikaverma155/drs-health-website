import Link from 'next/link';
import { HeroSlideForm } from '../HeroSlideForm';

export default function NewSlidePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/content/slideshow" className="text-sm text-slate-500 hover:text-slate-700">
          ← Back to Slideshow
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900">Add New Slide</h1>
      <HeroSlideForm />
    </div>
  );
}
