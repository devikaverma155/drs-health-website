import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/woocommerce';

// Force dynamic rendering - sitemap needs fresh data at request time
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate hourly if possible

const BASE = 'https://drshealth.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/shop`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/manufacturing-quality`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/consultation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/ngo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/for-business`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/returns-refunds`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/shipping`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/information`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Wrap product fetching in try/catch to prevent build failure
  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const allProducts = await getProducts({ limit: 500 });
    productUrls = allProducts.map((p) => ({
      url: `${BASE}/product/${p.handle}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Failed to fetch products for sitemap:', error instanceof Error ? error.message : String(error));
    // Return static pages only if API fails - don't crash the build
  }

  const blogSlugs = ['ayurveda-daily-routine', 'liver-care-herbs', 'immunity-winter'];
  const blogUrls: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogUrls, ...productUrls];
}
