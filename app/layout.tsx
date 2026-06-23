import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Poppins } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import '@/styles/globals.css';
import { MarqueeBar } from '@/layout/MarqueeBar';
import { Header } from '@/layout/Header';
import { Footer } from '@/layout/Footer';
import { OrganizationSchema } from '@/components/StructuredData';
import { CartProvider } from '@/lib/cartContext';
import { WishlistProvider } from '@/lib/wishlistContext';
import { CartDrawer } from '@/components/CartDrawer';
import { AuthSessionProvider } from '@/lib/SessionProvider';
import { PrintAwareRoot } from '@/components/PrintAwareRoot';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-heading' });

//adding favicon logo url
const LOGO_URL = 'https://9gk.22b.myftpupload.com/wp-content/uploads/2025/01/DRS-Logo.png';

export const metadata: Metadata = {
  metadataBase: new URL('https://9gk.22b.myftpupload.com'),
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
    canonical: 'https://9gk.22b.myftpupload.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col font-sans relative antialiased">
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
        >
          {`
!function(f,b,e,v,n,t,s)
{
if(f.fbq)return;
n=f.fbq=function(){
n.callMethod ?
n.callMethod.apply(n,arguments) :
n.queue.push(arguments)
};

if(!f._fbq)f._fbq=n;

n.push=n;
n.loaded=!0;
n.version='2.0';
n.queue=[];

t=b.createElement(e);
t.async=!0;
t.src=v;

s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)
}
(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');


fbq('init', '1565071874608789');

fbq('track', 'PageView');
`}
        </Script>


        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1565071874608789&ev=PageView&noscript=1"
          />
        </noscript>
        <AuthSessionProvider>
          <CartProvider>
            <WishlistProvider>
              <OrganizationSchema />
              <PrintAwareRoot>{children}</PrintAwareRoot>
              <Analytics />
            </WishlistProvider>
          </CartProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
