import Link from 'next/link';
import Image from 'next/image';

const POSTS = [
  { slug: 'ayurveda-daily-routine', title: 'Ayurveda and Your Daily Routine', date: '2024-01-15', image: 'https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/daily-ayurved.webp' },
  { slug: 'liver-care-herbs', title: 'Herbs for Liver Care and Detox', date: '2024-01-08', image: 'https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/liver-care-e1773502460654.webp' },
  { slug: 'immunity-winter', title: 'Building Immunity in Winter', date: '2024-01-01', image: 'https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/immunity-.avif' },
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
          {POSTS.map(({ slug, title, date, image }) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`} className="group block">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/20 mb-4 bg-white/10">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
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
