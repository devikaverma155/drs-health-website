import type { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    handle: 'd-grain',
    title: 'D Grain 40 Cap Jar',
    description:
      'Ayurvedic solution for complete relief from migraine pain, throbbing headaches, nausea, and sensitivity to light or sound. Formulated with time-tested herbal ingredients.',
    featuredImage: { url: '/placeholder.svg', altText: 'D Grain Capsules' },
    priceRange: { minVariantPrice: { amount: '349', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '375', currencyCode: 'INR' } },
    variants: [
      { id: 'v1', title: '40 Cap Jar', price: '349', compareAtPrice: '375', available: true },
    ],
    category: 'Anti-migraine',
    categorySlug: 'anti-migraine',
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: '2',
    handle: 'mehaghna',
    title: 'Mehaghna Powder 100g',
    description:
      'Beacon of hope for diabetics. Supports healthy blood sugar levels with traditional Ayurvedic herbs.',
    featuredImage: { url: '/placeholder.svg', altText: 'Mehaghna Powder' },
    priceRange: { minVariantPrice: { amount: '299', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '322', currencyCode: 'INR' } },
    variants: [
      { id: 'v2', title: '100 Grm', price: '299', compareAtPrice: '322', available: true },
    ],
    category: 'For Diabetes',
    categorySlug: 'diabetes',
    rating: 4.6,
    reviewCount: 94,
  },
  {
    id: '3',
    handle: 'pnw-punarnawa',
    title: 'PNW (Punarnawa) Syrup 200ml',
    description:
      'One of a kind product that goes beyond liver care. Supports liver and spleen wellness with Punarnava and other herbs.',
    featuredImage: { url: '/placeholder.svg', altText: 'PNW Punarnawa Syrup' },
    priceRange: { minVariantPrice: { amount: '279', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '300', currencyCode: 'INR' } },
    variants: [
      { id: 'v3', title: '200 ml', price: '279', compareAtPrice: '300', available: true },
    ],
    category: 'Liver Spleen / Gastric Care',
    categorySlug: 'liver-care',
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: '4',
    handle: 'shivam',
    title: 'Shivam Powder 100g',
    description: 'The complete digestive aid. Supports digestion and gut health with classical formulations.',
    featuredImage: { url: '/placeholder.svg', altText: 'Shivam Powder' },
    priceRange: { minVariantPrice: { amount: '259', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '279', currencyCode: 'INR' } },
    variants: [
      { id: 'v4', title: '100 Grm', price: '259', compareAtPrice: '279', available: true },
    ],
    category: 'Liver Spleen / Gastric Care',
    categorySlug: 'liver-care',
    rating: 4.4,
    reviewCount: 87,
  },
  {
    id: '5',
    handle: 'zycine',
    title: 'Zycine Syrup 200ml',
    description: 'Stimulates digestive enzymes at all levels. Supports appetite and healthy digestion.',
    featuredImage: { url: '/placeholder.svg', altText: 'Zycine Syrup' },
    priceRange: { minVariantPrice: { amount: '269', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '289', currencyCode: 'INR' } },
    variants: [
      { id: 'v5', title: '200 ml', price: '269', compareAtPrice: '289', available: true },
    ],
    category: 'Liver Spleen / Gastric Care',
    categorySlug: 'liver-care',
    rating: 4.5,
    reviewCount: 112,
  },
  {
    id: '6',
    handle: 'salsa',
    title: 'Salsa Liquid 450ml',
    description:
      'Supports blood sugar management with Salsa, Shilajeet, Haridra and other herbs. Improves energy and relieves fatigue.',
    featuredImage: { url: '/placeholder.svg', altText: 'Salsa Liquid' },
    priceRange: { minVariantPrice: { amount: '399', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '429', currencyCode: 'INR' } },
    variants: [
      { id: 'v6', title: '450 ml', price: '399', compareAtPrice: '429', available: true },
    ],
    category: 'For Diabetes',
    categorySlug: 'diabetes',
    rating: 4.6,
    reviewCount: 203,
  },
];

export const NEW_LAUNCH_PRODUCTS: Product[] = [
  {
    id: 'nl1',
    handle: 'immuno-care-capsules',
    title: 'Immuno Care Capsules 60 Cap',
    description:
      'Our newest formulation to support natural immunity. Blends traditional herbs with modern dosage for daily wellness.',
    featuredImage: { url: '/placeholder.svg', altText: 'Immuno Care Capsules' },
    priceRange: { minVariantPrice: { amount: '449', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '499', currencyCode: 'INR' } },
    variants: [
      { id: 'vnl1', title: '60 Cap', price: '449', compareAtPrice: '499', available: true },
    ],
    category: 'Immunity',
    categorySlug: 'immunity',
    rating: 4.8,
    reviewCount: 24,
    isNewLaunch: true,
  },
  {
    id: 'nl2',
    handle: 'gut-balance-powder',
    title: 'Gut Balance Powder 200g',
    description:
      'Gentle digestive support with prebiotic herbs. Helps maintain gut balance and comfort. Just launched.',
    featuredImage: { url: '/placeholder.svg', altText: 'Gut Balance Powder' },
    priceRange: { minVariantPrice: { amount: '329', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '369', currencyCode: 'INR' } },
    variants: [
      { id: 'vnl2', title: '200g', price: '329', compareAtPrice: '369', available: true },
    ],
    category: 'Digestive Care',
    categorySlug: 'digestive-care',
    rating: 4.6,
    reviewCount: 12,
    isNewLaunch: true,
  },
];

export const CATEGORIES = [
  { slug: 'weight-management', label: 'Weight Management' },
  { slug: 'liver-care', label: 'Liver Care' },
  { slug: 'immunity', label: 'Immunity' },
  { slug: 'diabetes', label: 'Diabetes' },
  { slug: 'digestive-care', label: 'Digestive Care' },
  { slug: 'anti-migraine', label: 'Anti-migraine' },
  { slug: 'body-care', label: 'Body Care' },
  { slug: 'healthy-hairs', label: 'Healthy Hairs' },
  { slug: 'skin-disorders', label: 'Skin Disorders' },
] as const;
