import Link from 'next/link';

const SECTIONS = [
  { href: '/admin/content/slideshow', label: '🖼️ Hero Slideshow', description: 'Manage the homepage hero banner slides — images, headlines, buttons' },
  { href: '/admin/content/combos', label: '🎁 Combo Offers', description: 'Manage the "Best Selling Combos" section — pricing, images, descriptions' },
  { href: '/admin/content/blogs', label: '📰 Blog Posts', description: 'Add and edit blog articles — they appear at /blog and on the homepage' },
  { href: '/admin/content/website', label: '📝 Website Content', description: 'Manage other website sections and content blocks' },
];

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Content</h1>
      <p className="text-sm text-slate-500">
        Edit website content without touching code. Changes are stored in the database.
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
