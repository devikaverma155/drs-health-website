import Link from 'next/link';

const POSTS = [
  { slug: 'ayurveda-daily-routine', title: 'Ayurveda and Your Daily Routine', date: '2024-01-15' },
  { slug: 'liver-care-herbs', title: 'Herbs for Liver Care and Detox', date: '2024-01-08' },
  { slug: 'immunity-winter', title: 'Building Immunity in Winter', date: '2024-01-01' },
];

export function BlogPreviewSection() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #D97706 0%, #A3261A 100%)'
    }}>
      {/* Enhanced glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-bl from-white/20 to-transparent blur-3xl"></div>
      </div>
      <div className="container-tight">
        <div className="flex items-end justify-between gap-4 mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            From Our Blog
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-white hover:text-white/80 transition-colors duration-200"
          >
            View all
          </Link>
        </div>
        <ul className="grid md:grid-cols-3 gap-8">
          {POSTS.map(({ slug, title, date }) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`} className="group block">
                <span className="text-sm text-white/80">{date}</span>
                <h3 className="font-heading mt-1 font-semibold text-white group-hover:text-white/90">
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
