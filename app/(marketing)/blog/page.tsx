import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ayurveda & Wellness Blog | DRS Health',
  description:
    'Expert articles on Ayurveda, herbal remedies, wellness tips, and traditional medicine. Learn about liver care, immunity, weight management and more.',
  openGraph: {
    title: 'Blog | DRS Health',
    description: 'Ayurveda and wellness articles from DRS Health.',
  },
};

const POSTS = [
  {
    slug: 'advantages-of-milk-thistle',
    title: 'Advantage Of Milk Thistle: Key Benefits You Need To Know',
    date: '2024-12-26',
    excerpt: 'Discover the powerful benefits of milk thistle for liver health, detoxification, and overall wellness. Learn why this ancient herb is trusted by healthcare practitioners worldwide.',
    image: 'https://drshealth.in/wp-content/uploads/2024/11/Syadwad-Combo.webp',
    category: 'Herbal Remedies',
    readTime: '8 min read',
  },
  {
    slug: 'apple-cider-vinegar-tablets-benefits',
    title: 'Apple Cider Vinegar Tablets Benefits: A Comprehensive Guide',
    date: '2024-12-26',
    excerpt: 'Explore the scientifically-backed health benefits of apple cider vinegar tablets. From digestive health to weight management, understand why this supplement is gaining popularity.',
    image: 'https://drshealth.in/wp-content/uploads/2024/11/SW-Products.png',
    category: 'Supplements',
    readTime: '10 min read',
  },
  {
    slug: 'understanding-apple-cider-vinegar-sore-throat-remedy',
    title: 'Understanding Apple Cider Vinegar: A Natural Sore Throat Remedy',
    date: '2024-11-12',
    excerpt: 'Learn how apple cider vinegar can soothe sore throats naturally. This comprehensive guide covers usage methods, scientific evidence, and safety considerations.',
    image: 'https://drshealth.in/wp-content/uploads/2024/12/Herbalis-Shampoo-scaled.webp',
    category: 'Natural Remedies',
    readTime: '6 min read',
  },
  {
    slug: 'shilajit-for-hair-benefits-and-usage-tips',
    title: 'Shilajit For Hair: Key Benefits And Simple Usage Tips',
    date: '2024-11-12',
    excerpt: 'Unlock the secrets of shilajit for hair health. Discover how this mineral-rich substance can strengthen hair, promote growth, and improve scalp health with easy usage tips.',
    image: 'https://drshealth.in/wp-content/uploads/2024/11/6-12-scaled.webp',
    category: 'Hair Care',
    readTime: '7 min read',
  },
  {
    slug: 'ayurveda-daily-routine',
    title: 'Ayurveda and Your Daily Routine: Align Your Day with Ancient Wisdom',
    date: '2024-01-15',
    excerpt: 'How to align your day with Ayurvedic principles for better energy and balance. Learn the daily practices that support optimal health and wellness.',
    image: 'https://drshealth.in/wp-content/uploads/2026/02/consultation.jpg',
    category: 'Lifestyle',
    readTime: '9 min read',
  },
  {
    slug: 'liver-care-herbs',
    title: 'Herbs for Liver Care and Detox: Traditional Wisdom Meets Modern Science',
    date: '2024-01-08',
    excerpt: 'Traditional herbs that support liver function and natural detoxification. Explore powerful Ayurvedic formulations for liver health and wellness.',
    image: 'https://drshealth.in/wp-content/uploads/2024/11/Syadwad-Combo.webp',
    category: 'Herbal Remedies',
    readTime: '8 min read',
  },
  {
    slug: 'immunity-winter',
    title: 'Building Immunity in Winter: Ayurvedic Practices for Cold Season',
    date: '2024-01-01',
    excerpt: 'Simple Ayurvedic practices to stay healthy through the cold season. Learn warming foods, herbs, and lifestyle tips to boost immunity naturally.',
    image: 'https://drshealth.in/wp-content/uploads/2024/11/SW-Products.png',
    category: 'Wellness',
    readTime: '7 min read',
  },
];

export default function BlogPage() {
  const categories = Array.from(new Set(POSTS.map((p) => p.category)));
  const featuredPost = POSTS[0];
  const otherPosts = POSTS.slice(1);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-soft-bg to-accent-green/5">
        <div className="container-tight text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-semibold text-foreground mb-4">
            Ayurveda & Wellness Blog
          </h1>
          <p className="text-lg text-body-muted">
            Expert insights on herbal remedies, Ayurvedic practices, and natural wellness solutions. Discover traditional wisdom backed by modern science.
          </p>
        </div>
      </section>

      <div className="section-padding">
        <div className="container-tight">
          {/* Featured Post */}
          <Link href={`/blog/${featuredPost.slug}`} className="group block mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200">
              <div className="relative h-80 md:h-96 overflow-hidden bg-slate-100">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="flex gap-2 mb-3">
                  <span className="text-sm font-semibold text-accent-green bg-accent-green/10 px-3 py-1 rounded-full">
                    {featuredPost.category}
                  </span>
                  <span className="text-sm text-body-muted">{featuredPost.readTime}</span>
                </div>
                <time className="text-sm text-body-muted">{featuredPost.date}</time>
                <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="mt-4 text-body-muted leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-6 text-primary font-semibold group-hover:underline">
                  Read Article →
                </div>
              </div>
            </div>
          </Link>

          {/* Category Tags */}
          <div className="mb-12 pb-8 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4">Browse by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="px-4 py-2 rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium text-body-muted hover:text-foreground"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* All Posts Grid */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-8">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map(({ slug, title, date, excerpt, image, category, readTime }) => (
                <Link key={slug} href={`/blog/${slug}`} className="group">
                  <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex gap-2 mb-3">
                        <span className="text-xs font-semibold text-accent-blue bg-accent-blue/10 px-2 py-1 rounded">
                          {category}
                        </span>
                      </div>
                      <time className="text-xs text-body-muted mb-2">{date}</time>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-3 flex-1">
                        {title}
                      </h3>
                      <p className="text-sm text-body-muted line-clamp-2 mb-4">
                        {excerpt}
                      </p>
                      <div className="text-xs text-body-muted">{readTime}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20 bg-gradient-to-r from-primary/10 to-accent-green/10 rounded-2xl border border-border p-12 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              Subscribe to Our Wellness Newsletter
            </h3>
            <p className="text-body-muted mb-6 max-w-2xl mx-auto">
              Get expert Ayurvedic tips, wellness insights, and product updates delivered to your inbox weekly.
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-body-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
