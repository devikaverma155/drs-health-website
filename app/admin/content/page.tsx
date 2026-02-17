import Link from 'next/link';

const SECTIONS = [
  { href: '/admin/content/hero', label: 'Hero banners', description: 'Homepage hero carousel slides' },
  { href: '/admin/content/bestsellers', label: 'Best sellers', description: 'Featured products on homepage' },
];

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Content</h1>
      <p className="text-sm text-slate-500">
        Edit website content without touching code. Changes are stored in the database; the public site can fetch them when you are ready.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map(({ href, label, description }) => (
          <Link
            key={href}
            href={href}
            className="block rounded-xl border border-slate-200 bg-white p-6 text-left hover:border-primary/30 hover:bg-slate-50/50"
          >
            <h2 className="font-medium text-slate-900">{label}</h2>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
