'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

const THIRD_PARTY_CLIENT_IMAGES = [
  'https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-07-at-13.21.17.jpeg',
  'https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-07-at-13.21.16-1.jpeg',
  'https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-07-at-13.21.16.jpeg',
  'https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-07-at-13.21.08-2.jpeg',
  'https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-07-at-13.21.08-1.jpeg',
  'https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-07-at-13.21.08.jpeg',
  'https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-07-at-13.21.07-1-1.jpeg',
  'https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-07-at-13.21.07.jpeg',
  'https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-07-at-13.21.06-1.jpeg',
];

export function ThirdPartyClientsCarousel() {
  const [api, setApi] = useState<CarouselApi | undefined>();

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-16 md:py-20 border-t border-border bg-gradient-to-b from-soft-bg to-white">
      <div className="container-tight">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2">
          Third party clients
        </h2>
        <p className="text-center text-body-muted mb-10">
          150+ contract manufacturing clients trust us with their brands
        </p>
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{ loop: true, align: 'start' }}
        >
          <CarouselContent className="-ml-4">
            {THIRD_PARTY_CLIENT_IMAGES.map((src, i) => (
              <CarouselItem
                key={i}
                className="pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4"
              >
                <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card hover:shadow-card-hover transition-shadow p-2">
                  <div className="relative w-full aspect-square">
                    <Image
                      src={src}
                      alt={`Third party client ${i + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-y-1/2 hidden sm:flex" />
          <CarouselNext className="right-0 -translate-y-1/2 hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
