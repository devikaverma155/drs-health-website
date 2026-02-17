import type { Product } from '@/lib/woocommerce';

const BASE = 'https://drshealth.in';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DRS Health',
  url: BASE,
  description: 'Authentic Ayurvedic wellness. Trusted formulations for weight management, liver care, immunity and more.',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE}/shop?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

export function ProductSchema({ product }: { product: Product }) {
  const variant = product.variants[0];
  const price = variant?.price ?? product.priceRange.minVariantPrice.amount;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url ? new URL(product.featuredImage.url, BASE).toString() : undefined,
    url: `${BASE}/product/${product.handle}`,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'INR',
      availability: variant?.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
