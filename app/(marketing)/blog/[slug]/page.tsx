import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const POSTS: Record<string, { title: string; date: string; content: string }> = {
  'ayurveda-daily-routine': {
    title: 'Ayurveda and Your Daily Routine',
    date: '2024-01-15',
    content:
      'Aligning your day with Ayurvedic principles can improve energy, digestion and sleep. Start with waking at a consistent time, and consider a light oil massage or warm water with lemon in the morning. Meal times matter: a solid breakfast, moderate lunch and lighter dinner support natural digestion. Wind down before bed with minimal screens and a fixed sleep time. Small, consistent steps often yield the best results.',
  },
  'liver-care-herbs': {
    title: 'Herbs for Liver Care and Detox',
    date: '2024-01-08',
    content:
      'Traditional Ayurvedic herbs like Punarnava, Bhumi Amla and Kutki have long been used to support liver function and gentle detox. These herbs are often combined in formulations that help maintain healthy liver enzyme levels and support the body’s natural cleansing processes. Always use such products under guidance and alongside a balanced diet and lifestyle.',
  },
  'immunity-winter': {
    title: 'Building Immunity in Winter',
    date: '2024-01-01',
    content:
      'Winter can challenge immunity. Ayurveda emphasises warmth, nourishment and rest. Include warming spices like ginger and turmeric in your diet, stay hydrated with warm fluids, and prioritise sleep. Chyawanprash and other classical formulations can support overall vitality. Dress warmly and avoid excessive cold exposure to help your body stay resilient through the season.',
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return { title: 'Post not found' };
  return {
    title: post.title,
    description: post.content.slice(0, 160),
    openGraph: { title: `${post.title} | DRS Health Blog` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  return (
    <article className="section-padding">
      <div className="container-tight max-w-2xl">
        <Link href="/blog" className="text-sm text-body-muted hover:text-foreground mb-6 inline-block">
          ← Blog
        </Link>
        <time className="text-sm text-body-muted">{post.date}</time>
        <h1 className="mt-1 text-3xl md:text-4xl font-semibold text-foreground">
          {post.title}
        </h1>
        <div className="mt-8 prose prose-neutral max-w-none">
          <p className="text-body-muted leading-relaxed">{post.content}</p>
        </div>
      </div>
    </article>
  );
}
