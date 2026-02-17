import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const POSTS: Record<
  string,
  {
    title: string;
    date: string;
    content: string;
    image: string;
    category: string;
    readTime: string;
    excerpt: string;
  }
> = {
  'advantages-of-milk-thistle': {
    title: 'Advantage Of Milk Thistle: Key Benefits You Need To Know',
    date: '2024-12-26',
    category: 'Herbal Remedies',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=600&fit=crop',
    excerpt: 'Discover the powerful benefits of milk thistle for liver health, detoxification, and overall wellness.',
    content: `Milk thistle, scientifically known as Silybum marianum, is a flowering plant from the daisy family. It has been used for thousands of years in traditional medicine, particularly in Ayurvedic and Mediterranean healing practices. The active compound in milk thistle is silymarin, a flavonoid complex with potent antioxidant and anti-inflammatory properties.

Key Benefits:

Liver Health Support: Milk thistle is renowned for its hepatoprotective properties. It helps support liver function by promoting the regeneration of liver cells and protecting them from oxidative stress.

Detoxification: The herb aids in the natural detoxification processes of the body, helping to eliminate harmful substances and support overall wellness.

Antioxidant Power: Rich in silymarin, milk thistle provides powerful antioxidant support to protect cells from free radical damage.

Digestive Support: Traditional use suggests milk thistle supports healthy digestion and maintains optimal bile production.

Skin Health: Some studies indicate that the antioxidant properties may support skin health from within.

How to Use:
Milk thistle can be consumed as a supplement, tea, or as part of formulated products like our Livcare range. It's best taken under professional guidance to ensure proper dosage and compatibility with your health condition.

Always consult with an Ayurvedic practitioner before starting any new supplement regimen.`,
  },
  'apple-cider-vinegar-tablets-benefits': {
    title: 'Apple Cider Vinegar Tablets Benefits: A Comprehensive Guide',
    date: '2024-12-26',
    category: 'Supplements',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1585268341965-7cc0b3c7b4c3?w=1200&h=600&fit=crop',
    excerpt: 'Explore the scientifically-backed health benefits of apple cider vinegar tablets.',
    content: `Apple cider vinegar (ACV) has been used for centuries as a natural remedy and wellness support. When concentrated into tablet form, it provides a convenient and effective way to harness its benefits.

The Science Behind Apple Cider Vinegar:
Apple cider vinegar contains acetic acid, which is the key component responsible for many of its health benefits. This compound has been studied extensively for its role in supporting digestive health, metabolism, and blood sugar regulation.

Key Benefits of Apple Cider Vinegar Tablets:

Digestive Support: ACV helps stimulate digestive enzymes and promotes healthy stomach acid production for better digestion.

Metabolism Boost: The acetic acid in ACV may support healthy metabolism and weight management efforts.

Blood Sugar Balance: Some studies suggest ACV may help maintain healthy blood sugar levels already within normal range.

Antioxidant Properties: Apple cider vinegar contains beneficial compounds that provide antioxidant support.

Immune Support: The naturally occurring probiotics and enzymes support your body's immune response.

Why Tablets Over Liquid?
Tablets offer convenience, consistency, and eliminate the strong taste of liquid vinegar. They're easier to take on the go and provide standardized dosages for optimal results.

Usage Recommendations:
For best results, ACV tablets should be taken consistently as part of a balanced lifestyle. Most recommendations suggest taking them with meals to support digestion. Always follow the dosage instructions on the product label.`,
  },
  'understanding-apple-cider-vinegar-sore-throat-remedy': {
    title: 'Understanding Apple Cider Vinegar: A Natural Sore Throat Remedy',
    date: '2024-11-12',
    category: 'Natural Remedies',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1607003802173-5f1a4ebedc62?w=1200&h=600&fit=crop',
    excerpt: 'Learn how apple cider vinegar can soothe sore throats naturally.',
    content: `A sore throat can be uncomfortable and disruptive to daily life. While there are many over-the-counter options, natural remedies like apple cider vinegar have been used traditionally to soothe throat discomfort.

Why Apple Cider Vinegar for Sore Throat?
Apple cider vinegar contains acetic acid and beneficial compounds that may help soothe throat irritation. Its antimicrobial properties have made it a popular folk remedy for throat-related discomfort.

Traditional Usage Methods:

Gargle Solution: Mix 1-2 tablespoons of apple cider vinegar with warm water and honey. Gargle for 30 seconds, several times a day.

Warm Drink: Dilute ACV in warm water with honey and ginger for a soothing throat tonic.

Direct Application: Some people add ACV to their water for internal support.

Safety Considerations:
While apple cider vinegar is generally safe, undiluted vinegar may be too strong for direct throat contact. Always dilute it properly. If symptoms persist beyond a week or worsen, consult a healthcare professional.

Complementary Approaches:
For best results, combine ACV remedies with:
- Stay hydrated with warm liquids
- Get adequate rest
- Use throat lozenges if needed
- Maintain humidity in the air

Scientific Perspective:
While traditional use is extensive, modern scientific studies on ACV for sore throat are still ongoing. It's best used as part of a comprehensive wellness approach.`,
  },
  'shilajit-for-hair-benefits-and-usage-tips': {
    title: 'Shilajit For Hair: Key Benefits And Simple Usage Tips',
    date: '2024-11-12',
    category: 'Hair Care',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1599599810694-2d3f46e99e81?w=1200&h=600&fit=crop',
    excerpt: 'Unlock the secrets of shilajit for hair health and discover how to use it effectively.',
    content: `Shilajit, a mineral-rich substance formed over centuries in the Himalayan mountains, has been a cornerstone of Ayurvedic medicine for thousands of years. It's increasingly recognized for its powerful benefits for hair health.

What is Shilajit?
Shilajit is a sticky, tar-like substance containing fulvic acid and over 84 minerals. These components work synergistically to provide comprehensive health benefits, including support for hair growth and scalp health.

Hair Health Benefits:

Promotes Hair Growth: The minerals and nutrients in shilajit nourish hair follicles and support natural hair growth cycles.

Strengthens Hair: Rich in minerals like zinc, iron, and magnesium, shilajit strengthens hair from root to tip.

Improves Scalp Health: Its antioxidant and anti-inflammatory properties support a healthy scalp environment.

Reduces Hair Loss: By improving blood circulation and nourishing follicles, shilajit may help reduce unwanted hair fall.

Adds Shine and Vitality: The nutrient profile contributes to healthier, more lustrous hair.

How to Use Shilajit for Hair:

Internal Consumption: Take a pea-sized amount of shilajit resin dissolved in warm milk or water, twice daily.

Topical Application: Mix shilajit with coconut oil or aloe vera gel and apply directly to the scalp. Leave for 20-30 minutes before shampooing.

In Formulations: Use shilajit-infused oils or serums for targeted hair care.

Best Practices:
- Start with smaller amounts and gradually increase
- Use consistently for 2-3 months to see notable results
- Combine with a balanced diet rich in proteins and healthy fats
- Stay hydrated for optimal results

Expected Timeline:
Most people notice improvements in hair quality within 4-8 weeks of consistent use. Stronger, shinier hair typically becomes visible after 2-3 months.`,
  },
  'ayurveda-daily-routine': {
    title: 'Ayurveda and Your Daily Routine: Align Your Day with Ancient Wisdom',
    date: '2024-01-15',
    category: 'Lifestyle',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&h=600&fit=crop',
    excerpt: 'How to align your day with Ayurvedic principles for better energy and balance.',
    content: `Ayurveda emphasizes living in harmony with natural rhythms and your individual constitution (dosha). By incorporating Ayurvedic practices into your daily routine, you can experience improved energy, better digestion, enhanced mental clarity, and overall wellness.

Morning Routine (6-8 AM):

Wake Early: Rising with the sun supports your natural circadian rhythm and enhances vitality.

Tongue Scraping: Remove accumulated toxins from your tongue using a copper or stainless steel scraper.

Oil Massage (Abhyanga): A warm oil massage stimulates circulation, nourishes the skin, and calms the nervous system. Adjust oil type based on your dosha.

Warm Water: Start with a glass of warm water, optionally with lemon, to stimulate digestion.

Meditation: 10-15 minutes of meditation supports mental clarity and emotional balance.

Breakfast (7-8 AM):
Eat a nourishing breakfast that matches your constitution. Include warming spices and foods easy to digest.

Work Hours:
- Stay hydrated with warm water or herbal teas
- Take short breaks to stretch and breathe mindfully
- Avoid rushing meals

Lunch (12-1 PM):
Have your main meal at midday when digestive fire is strongest. Include all six tastes (sweet, sour, salty, pungent, bitter, astringent).

Afternoon (2-4 PM):
Light activities or a short walk aid digestion. Avoid heavy mental work after large meals.

Dinner (6-7 PM):
Eat lighter than lunch, at least 2-3 hours before bed. Include warming, easy-to-digest foods.

Evening Routine (8-10 PM):

Gentle Movement: Light yoga or stretching promotes relaxation.

Herbal Tea: Chamomile or ashwagandha tea supports sleep quality.

Digital Detox: Minimize screen time 1 hour before bed.

Self-Massage: A gentle foot massage calms the nervous system.

Bedtime (10 PM):
Consistent sleep schedules strengthen your body's natural healing processes.

Seasonal Adjustments:
Ayurveda recommends adjusting routines seasonally. In cooler seasons, emphasize warming practices. In warmer seasons, cooling and refreshing practices become important.`,
  },
  'liver-care-herbs': {
    title: 'Herbs for Liver Care and Detox: Traditional Wisdom Meets Modern Science',
    date: '2024-01-08',
    category: 'Herbal Remedies',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3af35abd?w=1200&h=600&fit=crop',
    excerpt: 'Traditional herbs that support liver function and natural detoxification.',
    content: `The liver is your body's primary detoxification organ, working tirelessly to filter toxins and support overall health. Ayurvedic herbs have been used for centuries to support optimal liver function.

Essential Liver-Supporting Herbs:

Punarnava (Boerhavia diffusa):
Known as "the herb that rejuvenates," Punarnava supports liver health and promotes the elimination of toxins. It's particularly valued in Ayurveda for supporting kidney and liver function.

Bhumi Amla (Phyllanthus amarus):
This powerful herb supports liver enzyme levels and promotes healthy liver regeneration. It's rich in antioxidants and has been traditionally used for comprehensive liver care.

Kutki (Picrorhiza kurroa):
A bitter herb that stimulates liver function and supports healthy bile production. Kutki is traditionally used to promote natural liver detoxification.

Milk Thistle (Silybum marianum):
Contains silymarin, a compound that protects liver cells from oxidative stress and supports regeneration.

Turmeric (Curcuma longa):
The active compound curcumin provides powerful antioxidant and anti-inflammatory support to liver tissue.

Neem (Azadirachta indica):
Supports liver health through its antimicrobial and antioxidant properties.

Liver Care Formulations:
These herbs are often combined in traditional formulations that work synergistically. DRS Health's Livcare range combines these potent herbs with specific ratios to maximize benefits.

Complementary Lifestyle Practices:
- Reduce processed foods and refined sugars
- Maintain adequate hydration
- Regular light exercise like walking or yoga
- Consistent sleep schedules
- Stress management through meditation

Duration and Consistency:
Liver support herbs work best with consistent, long-term use (3-6 months) as part of a holistic wellness approach.

Safety Considerations:
Always consult with an Ayurvedic practitioner before starting new herbs, especially if you're on medications. Quality matters—use standardized, pure herbs from trusted sources.`,
  },
  'immunity-winter': {
    title: 'Building Immunity in Winter: Ayurvedic Practices for Cold Season',
    date: '2024-01-01',
    category: 'Wellness',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=600&fit=crop',
    excerpt: 'Simple Ayurvedic practices to stay healthy through the cold season.',
    content: `Winter is when the body's digestive fire naturally weakens, making it important to take extra care of your immunity. Ayurveda offers time-tested practices to maintain strong immunity through the colder months.

Winter Immunity Fundamentals:

Maintain Digestive Heat:
- Include warming spices in your diet: ginger, turmeric, black pepper, cinnamon
- Avoid cold and raw foods
- Drink warm herbal teas throughout the day
- Take warm meals, especially at lunch

Strengthen with Nourishing Foods:
- Warm grains like oats and quinoa
- Root vegetables and sweet potatoes
- Healthy fats including ghee, sesame oil, and coconut oil
- Warming fruits like pomegranate and grapes
- Bone broths and warm soups

Classical Winter Immunity Herbs:

Chyawanprash:
An ancient Ayurvedic formulation containing 40+ herbs and spices. Regular consumption (1-2 teaspoons daily) provides comprehensive immune support.

Ashwagandha:
An adaptogenic herb that supports stress resilience and immune function. Particularly beneficial during winter months.

Tulsi (Holy Basil):
Known as a "guardian of health," tulsi supports respiratory function and overall immunity.

Ginger:
Warming and immune-supporting, ginger can be consumed fresh in teas or added to meals.

Lifestyle Practices:

Maintain Regular Exercise: Gentle yoga, walking, or light aerobic activity boosts immunity without over-exerting in cold weather.

Prioritize Sleep: Ensure 7-8 hours of quality sleep, supporting natural immune function.

Oil Massage: Regular sesame oil massage (Abhyanga) before winter strengthens immunity and nourishes tissues.

Stress Management: Practice meditation and deep breathing to support immune resilience.

Nasal Care: Use warm sesame oil for nasal passages daily to prevent winter-related respiratory issues.

Daily Practices:

Morning: Warm water with lemon and honey
Breakfast: Warming grains and spices
Lunch: Main meal with vegetables and proteins
Afternoon: Herbal tea with ginger and turmeric
Dinner: Light, warm, easy-to-digest foods
Evening: Relaxing herbal tea before bed

Prevention Tips:
- Minimize exposure to sudden temperature changes
- Keep nasal passages moisturized
- Stay hydrated throughout the day
- Avoid excessive cold foods and drinks
- Manage stress and maintain positive emotions

Expected Results:
With consistent practice, most people notice improved energy levels, fewer seasonal infections, and better overall vitality within 4-6 weeks.`,
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return { title: 'Post not found' };
  return {
    title: `${post.title} | DRS Health Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | DRS Health Blog`,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  const relatedPosts = Object.entries(POSTS)
    .filter(([s]) => s !== slug && POSTS[s].category === post.category)
    .slice(0, 3)
    .map(([s, p]) => ({ slug: s, ...p }));

  return (
    <article className="bg-background">
      {/* Hero Image */}
      <div className="relative w-full h-96 md:h-[500px] bg-slate-100 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Article Content */}
      <div className="section-padding">
        <div className="container-tight max-w-3xl">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-sm text-primary hover:text-primary-dark mb-4 inline-block"
            >
              ← Back to Blog
            </Link>
            <div className="flex gap-3 mb-4">
              <span className="text-sm font-semibold text-accent-blue bg-accent-blue/10 px-3 py-1 rounded">
                {post.category}
              </span>
              <span className="text-sm text-body-muted">{post.readTime}</span>
            </div>
            <time className="text-sm text-body-muted block mb-4">{post.date}</time>
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
              {post.title}
            </h1>
          </div>

          {/* Article Body */}
          <div className="prose prose-neutral max-w-none">
            {post.content.split('\n\n').map((paragraph, idx) => (
              <p
                key={idx}
                className="text-body-muted leading-relaxed mb-6 whitespace-pre-wrap"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-20 pt-12 border-t border-border">
              <h3 className="text-2xl font-semibold text-foreground mb-8">
                Related Articles
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                    <div className="bg-white rounded-xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all h-full">
                      <div className="relative h-40 bg-slate-100 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-foreground group-hover:text-primary line-clamp-2 mb-2">
                          {post.title}
                        </h4>
                        <time className="text-xs text-body-muted">{post.date}</time>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
