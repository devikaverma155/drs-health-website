import Link from 'next/link';

const POSTS = [
  { slug: 'ayurveda-daily-routine', title: 'Ayurveda and Your Daily Routine', date: '2024-01-15' },
  { slug: 'liver-care-herbs', title: 'Herbs for Liver Care and Detox', date: '2024-01-08' },
  { slug: 'immunity-winter', title: 'Building Immunity in Winter', date: '2024-01-01' },
];

export function BlogPreviewSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-tight">
        <div className="flex items-end justify-between gap-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            From Our Blog
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-primary hover:underline transition-colors duration-200"
          >
            View all
          </Link>
        </div>
        <ul className="grid md:grid-cols-3 gap-8">
          {POSTS.map(({ slug, title, date }) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`} className="group block">
                <span className="text-sm text-body-muted">{date}</span>
                <h3 className="mt-1 font-semibold text-foreground group-hover:underline">
                  {title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
