import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '@/styles/globals.css';
import { MarqueeBar } from '@/layout/MarqueeBar';
import { Header } from '@/layout/Header';
import { Footer } from '@/layout/Footer';
import { OrganizationSchema } from '@/components/StructuredData';
import { CartProvider } from '@/lib/cartContext';
import { WishlistProvider } from '@/lib/wishlistContext';
import { CartDrawer } from '@/components/CartDrawer';
import { AuthSessionProvider } from '@/lib/SessionProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-heading' });

const LOGO_URL = 'https://drshealth.in/wp-content/uploads/2025/01/DRS-Logo.png';

export const metadata: Metadata = {
  metadataBase: new URL('https://drshealth.in'),
  icons: {
    icon: LOGO_URL,
    shortcut: LOGO_URL,
    apple: LOGO_URL,
  },
  title: {
    default: 'DRS Health – Authentic Ayurvedic Wellness Products & Expert Consultation',
    template: '%s | DRS Health',
  },
  description:
    'Premium Ayurvedic products for holistic wellness. Explore herbal remedies for weight management, liver care, immunity, hair health, and more. Get free expert consultation today.',
  keywords: 'Ayurvedic products, herbal remedies, natural supplements, liver care, weight management, immunity booster, Ayurveda, traditional medicine, wellness',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'DRS Health',
    title: 'DRS Health – Authentic Ayurvedic Wellness Products',
    description: 'Trusted Ayurvedic formulations and natural wellness solutions for better health.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://drshealth.in',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col font-sans relative antialiased">
        <AuthSessionProvider>
          <CartProvider>
            <WishlistProvider>
              <OrganizationSchema />
              <div className="relative z-10 flex flex-col flex-1 min-h-screen">
                <MarqueeBar />
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <CartDrawer />
            </WishlistProvider>
          </CartProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
