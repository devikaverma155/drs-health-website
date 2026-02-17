import Link from 'next/link';

export function AnnouncementBar() {
  return (
    <div className="bg-foreground text-background py-2 text-center text-sm">
      <div className="container-tight flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span>Free consultation with our Ayurvedic experts</span>
        <span className="hidden sm:inline text-white/70">|</span>
        <Link href="/contact#consultation" className="underline hover:no-underline">
          Book now
        </Link>
      </div>
    </div>
  );
}
