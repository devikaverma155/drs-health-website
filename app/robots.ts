import { MetadataRoute } from 'next';

const BASE = 'https://9gk.22b.myftpupload.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
