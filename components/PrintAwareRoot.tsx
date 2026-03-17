'use client';

import { usePathname } from 'next/navigation';
import { MarqueeBar } from '@/layout/MarqueeBar';
import { Header } from '@/layout/Header';
import { Footer } from '@/layout/Footer';
import { CartDrawer } from '@/components/CartDrawer';

export function PrintAwareRoot({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPrintRoute = pathname?.startsWith('/print') ?? false;

  if (isPrintRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="relative z-10 flex flex-col flex-1 min-h-screen">
        <MarqueeBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <CartDrawer />
    </>
  );
}
