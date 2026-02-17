import type { Metadata } from 'next';
import '@/styles/globals.css';
import { MarqueeBar } from '@/layout/MarqueeBar';
import { Header } from '@/layout/Header';
import { Footer } from '@/layout/Footer';
import { OrganizationSchema } from '@/components/StructuredData';

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
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans">
        <OrganizationSchema />
        <MarqueeBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
