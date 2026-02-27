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

export const metadata: Metadata = {
  metadataBase: new URL('https://drshealth.in'),
  title: {
    default: 'DRS Health – Authentic Ayurvedic Wellness',
    template: '%s | DRS Health',
  },
  description:
    'Trusted Ayurvedic formulations for wellness. Weight management, liver care, immunity, diabetes support and more. Free consultation with our experts.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'DRS Health',
  },
  robots: {
    index: true,
    follow: true,
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
