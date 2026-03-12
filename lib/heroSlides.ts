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
  textColor?: string;
  headlineBold?: boolean;
  subtextBold?: boolean;
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
    id: 'banner-chatgpt-1',
    headline: 'Premium Wellness Range',
    subtext: 'Discover our latest collection of Ayurvedic products.',
    ctaLabel: 'Shop Products',
    ctaHref: '/shop',
    secondaryCtaLabel: 'Learn More',
    secondaryCtaHref: '/about',
    image: 'https://drshealth.in/wp-content/uploads/2026/03/ChatGPT-Image-Mar-9-2026-02_42_21-PM.png',
    imageAlt: 'Premium Wellness Range',
  },
  {
    id: 'banner-gemini-1',
    headline: 'Natural Health Solutions',
    subtext: 'Transform your wellness journey with authentic Ayurveda.',
    ctaLabel: 'Shop Now',
    ctaHref: '/shop',
    secondaryCtaLabel: 'Consultation',
    secondaryCtaHref: '/consultation',
    image: 'https://drshealth.in/wp-content/uploads/2026/03/Gemini_Generated_Image_osb8udosb8udosb8.png',
    imageAlt: 'Natural Health Solutions',
  },
  {
    id: 'banner-gemini-2',
    headline: 'Holistic Wellness',
    subtext: 'Experience the power of traditional Ayurvedic remedies.',
    ctaLabel: 'Free Consultation',
    ctaHref: '/consultation',
    secondaryCtaLabel: 'Shop Now',
    secondaryCtaHref: '/shop',
    image: 'https://drshealth.in/wp-content/uploads/2026/03/Gemini_Generated_Image_j5ys5aj5ys5aj5ys.png',
    imageAlt: 'Holistic Wellness',
  },
  {
    id: 'banner-chatgpt-2',
    headline: 'Authentic Ayurvedic Care',
    subtext: 'Trusted wellness products for modern living.',
    ctaLabel: 'Shop Products',
    ctaHref: '/shop',
    secondaryCtaLabel: 'Contact Us',
    secondaryCtaHref: '/contact',
    image: 'https://drshealth.in/wp-content/uploads/2026/03/ChatGPT-Image-Mar-9-2026-02_29_22-PM.png',
    imageAlt: 'Authentic Ayurvedic Care',
  },
];

/** Shop page banner slides (same imagery, simpler props). */
export const DEFAULT_SHOP_BANNER_SLIDES: ShopBannerSlideConfig[] = [
  {
    id: 'banner-chatgpt-1',
    title: 'Premium Wellness Range',
    subtitle: 'Latest collection of Ayurvedic products.',
    ctaLabel: 'Shop Now',
    ctaHref: '/shop',
    imageUrl: 'https://drshealth.in/wp-content/uploads/2026/03/ChatGPT-Image-Mar-9-2026-02_42_21-PM.png',
    imageAlt: 'Premium Wellness Range',
    variant: 'primary',
  },
  {
    id: 'banner-gemini-1',
    title: 'Natural Health Solutions',
    subtitle: 'Authentic Ayurveda for wellness.',
    ctaLabel: 'Shop',
    ctaHref: '/shop',
    imageUrl: 'https://drshealth.in/wp-content/uploads/2026/03/Gemini_Generated_Image_osb8udosb8udosb8.png',
    imageAlt: 'Natural Health Solutions',
    variant: 'primary',
  },
  {
    id: 'banner-gemini-2',
    title: 'Holistic Wellness',
    subtitle: 'Traditional Ayurvedic remedies.',
    ctaLabel: 'Free Consultation',
    ctaHref: '/consultation',
    imageUrl: 'https://drshealth.in/wp-content/uploads/2026/03/Gemini_Generated_Image_j5ys5aj5ys5aj5ys.png',
    imageAlt: 'Holistic Wellness',
    variant: 'primary',
  },
  {
    id: 'banner-chatgpt-2',
    title: 'Authentic Ayurvedic Care',
    subtitle: 'Trusted wellness for modern living.',
    ctaLabel: 'Shop',
    ctaHref: '/shop',
    imageUrl: 'https://drshealth.in/wp-content/uploads/2026/03/ChatGPT-Image-Mar-9-2026-02_29_22-PM.png',
    imageAlt: 'Authentic Ayurvedic Care',
    variant: 'primary',
  },
];
