import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles on Ayurveda, wellness, and health from DRS Health. Tips on diet, lifestyle and our formulations.',
  openGraph: {
    title: 'Blog | DRS Health',
    description: 'Ayurveda and wellness articles from DRS Health.',
  },
};

const POSTS = [
  { slug: 'ayurveda-daily-routine', title: 'Ayurveda and Your Daily Routine', date: '2024-01-15', excerpt: 'How to align your day with Ayurvedic principles for better energy and balance.' },
  { slug: 'liver-care-herbs', title: 'Herbs for Liver Care and Detox', date: '2024-01-08', excerpt: 'Traditional herbs that support liver function and natural detoxification.' },
  { slug: 'immunity-winter', title: 'Building Immunity in Winter', date: '2024-01-01', excerpt: 'Simple Ayurvedic practices to stay healthy through the cold season.' },
];

export default function BlogPage() {
  return (
    <div className="section-padding">
      <div className="container-tight">
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
          Blog
        </h1>
        <p className="text-body-muted mb-12">
          Wellness tips, Ayurvedic insights and product updates.
        </p>
        <ul className="space-y-8">
          {POSTS.map(({ slug, title, date, excerpt }) => (
            <li key={slug} className="border-b border-border pb-8 last:border-0">
              <Link href={`/blog/${slug}`} className="group block">
                <time className="text-sm text-body-muted">{date}</time>
                <h2 className="mt-1 text-xl font-semibold text-foreground group-hover:underline">
                  {title}
                </h2>
                <p className="mt-2 text-body-muted">{excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
