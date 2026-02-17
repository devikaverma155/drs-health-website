/**
 * Shared hero and shop banner slide config.
 * Used on landing page hero slider and shop page banner.
 */

export interface HeroSlideConfig {
  id: string;
  headline: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  image?: string;
  imageAlt?: string;
}

export interface ShopBannerSlideConfig {
  id: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageUrl?: string;
  imageAlt?: string;
  variant?: 'primary' | 'accent';
}

/** Default hero slides with DRS Health imagery (hero + store). */
export const DEFAULT_HERO_SLIDES: HeroSlideConfig[] = [
  {
    id: 'syadwad-combo',
    headline: 'Syadwad Combo',
    subtext: 'Trusted Ayurvedic formulations for holistic wellness.',
    ctaLabel: 'Shop Products',
    ctaHref: '/shop',
    secondaryCtaLabel: 'Free Consultation',
    secondaryCtaHref: '/consultation',
    // image: 'https://drshealth.in/wp-content/uploads/2024/11/Syadwad-Combo.webp',
    imageAlt: 'Syadwad Combo',
  },
  {
    id: 'wellness-combo',
    headline: 'Wellness Combo Pack',
    subtext: 'Curated packs for weight management, liver care and more.',
    ctaLabel: 'Shop combos',
    ctaHref: '/shop',
    secondaryCtaLabel: 'Consultation',
    secondaryCtaHref: '/consultation',
    // image: 'https://drshealth.in/wp-content/uploads/2024/11/SW-Products.png',
    imageAlt: 'Wellness Combo Pack',
  },
  {
    id: 'herbalis-shampoo',
    headline: 'Herbalis Shampoo',
    subtext: 'Natural hair care from our Ayurvedic range.',
    ctaLabel: 'Shop now',
    ctaHref: '/shop',
    secondaryCtaLabel: 'Consultation',
    secondaryCtaHref: '/consultation',
    // image: 'https://drshealth.in/wp-content/uploads/2024/12/Herbalis-Shampoo-scaled.webp',
    imageAlt: 'Herbalis Shampoo',
  },
  {
    id: 'range-6-12',
    headline: 'Authentic Ayurvedic Wellness',
    subtext: 'Formulations for the whole family—weight, liver, immunity and more.',
    ctaLabel: 'Shop Products',
    ctaHref: '/shop',
    secondaryCtaLabel: 'Free Consultation',
    secondaryCtaHref: '/consultation',
    // image: 'https://drshealth.in/wp-content/uploads/2024/11/6-12-scaled.webp',
    imageAlt: 'DRS Health products',
  },
  {
    id: 'consultation',
    headline: 'Consultation',
    subtext: 'Book a free session with our Ayurvedic experts.',
    ctaLabel: 'Book now',
    ctaHref: '/consultation',
    secondaryCtaLabel: 'Shop Products',
    secondaryCtaHref: '/shop',
    // image: 'https://drshealth.in/wp-content/uploads/2026/02/consultation.jpg',
    imageAlt: 'Consultation',
  },
];

/** Shop page banner slides (same imagery, simpler props). */
export const DEFAULT_SHOP_BANNER_SLIDES: ShopBannerSlideConfig[] = [
  {
    id: 'syadwad-combo',
    title: 'Syadwad Combo',
    subtitle: 'Trusted Ayurvedic formulations.',
    ctaLabel: 'Shop',
    ctaHref: '/shop',
    // imageUrl: 'https://drshealth.in/wp-content/uploads/2024/11/Syadwad-Combo.webp',
    imageAlt: 'Syadwad Combo',
    variant: 'primary',
  },
  {
    id: 'wellness-combo',
    title: 'Wellness Combo Pack',
    subtitle: 'Curated packs for holistic wellness.',
    ctaLabel: 'Shop combos',
    ctaHref: '/shop',
    // imageUrl: 'https://drshealth.in/wp-content/uploads/2024/11/SW-Products.png',
    imageAlt: 'Wellness Combo Pack',
    variant: 'primary',
  },
  {
    id: 'herbalis-shampoo',
    title: 'Herbalis Shampoo',
    subtitle: 'Natural hair care.',
    ctaLabel: 'Shop',
    ctaHref: '/shop',
    // imageUrl: 'https://drshealth.in/wp-content/uploads/2024/12/Herbalis-Shampoo-scaled.webp',
    imageAlt: 'Herbalis Shampoo',
    variant: 'primary',
  },
  {
    id: 'range-6-12',
    title: 'Ayurvedic Wellness',
    subtitle: 'Weight, liver, immunity & more.',
    ctaLabel: 'Shop all',
    ctaHref: '/shop',
    // imageUrl: 'https://drshealth.in/wp-content/uploads/2024/11/6-12-scaled.webp',
    imageAlt: 'DRS Health products',
    variant: 'primary',
  },
  {
    id: 'consultation',
    title: 'Consultation',
    subtitle: 'Free session with our experts.',
    ctaLabel: 'Book now',
    ctaHref: '/consultation',
    // imageUrl: 'https://drshealth.in/wp-content/uploads/2026/02/consultation.jpg',
    imageAlt: 'Consultation',
    variant: 'accent',
  },
];
