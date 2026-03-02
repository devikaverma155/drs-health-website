'use client';

import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const certificationImages = [
  {
    src: 'https://drshealth.in/wp-content/uploads/2026/03/1772255367424-removebg-preview.png',
    alt: 'GMP Certification',
  },
  {
    src: 'https://drshealth.in/wp-content/uploads/2026/03/1772256665743.png',
    alt: 'Ayush Approved',
  },
  {
    src: 'https://drshealth.in/wp-content/uploads/2026/03/WA_1772256180628-removebg-preview.png',
    alt: 'FSSAI Approved',
  },
  {
    src: 'https://drshealth.in/wp-content/uploads/2026/03/Gemini_Generated_Image_t6c8yct6c8yct6c8-removebg-preview.png',
    alt: 'Lab Tested',
  },
  {
    src: 'https://drshealth.in/wp-content/uploads/2026/03/Gemini_Generated_Image_oh6rweoh6rweoh6r-removebg-preview.png',
    alt: '100% Natural',
  },
  {
    src: 'https://drshealth.in/wp-content/uploads/2026/03/Gemini_Generated_Image_c9oloec9oloec9ol.png',
    alt: 'No Chemicals',
  },
  {
    src: 'https://drshealth.in/wp-content/uploads/2026/03/Gemini_Generated_Image_ukhv5qukhv5qukhv-removebg-preview.png',
    alt: 'Trusted Seller',
  },
  {
    src: 'https://drshealth.in/wp-content/uploads/2026/03/Gemini_Generated_Image_gpzntmgpzntmgpzn__1_-removebg-preview.png',
    alt: 'Formulation by Vaidya',
  },
  {
    src: 'https://drshealth.in/wp-content/uploads/2026/03/Gemini_Generated_Image_tq67tptq67tptq67-1.png',
    alt: 'Decades of Experience',
  },
];

const certifications = [
  { name: 'GMP Certified', description: 'Good Manufacturing Practice' },
  { name: 'Ayush Approved', description: 'Govt. of India Approved' },
  { name: 'FSSAI', description: 'Food Safety & Standards' },
  { name: 'Lab Tested', description: 'Quality Assured Products' },
  { name: '100% Natural', description: 'Pure Natural Ingredients' },
  { name: 'Trusted Seller', description: 'Verified & Trusted Brand' },
];

export function CertificationsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const timeout = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 1500);
    return () => clearTimeout(timeout);
  }, [api, current]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
      {/* Subtle organic background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-green-50 blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-emerald-50 blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-2">
            Trusted Quality
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Certifications & Standards
          </h2>
          <p className="text-lg text-body-muted max-w-2xl mx-auto">
            Committed to the highest international standards of quality, safety, and compliance
          </p>
        </div>

        {/* Auto-scrolling certification carousel */}
        <div className="mb-14">
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: 'start' }}
            className="w-full"
          >
            <CarouselContent>
              {certificationImages.map((cert, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="flex flex-col items-center justify-center rounded-xl bg-white border border-border shadow-sm p-4 aspect-square hover:border-primary/30 hover:shadow-md transition-all group">
                    <div className="w-full h-24 relative mb-3">
                      <img
                        src={cert.src}
                        alt={cert.alt}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-xs font-semibold text-foreground text-center leading-tight">
                      {cert.alt}
                    </span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Certification badges grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex flex-col items-center text-center p-4 rounded-xl bg-background border border-border hover:border-primary/20 hover:bg-primary/5 transition-all group"
            >
              <span className="text-2xl text-primary mb-2 group-hover:scale-110 transition-transform">✓</span>
              <h3 className="font-heading text-sm font-semibold text-foreground">{cert.name}</h3>
              <p className="text-xs text-body-muted mt-1">{cert.description}</p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="p-6 bg-background rounded-xl border border-border">
          <p className="text-center text-body-muted">
            <span className="font-semibold text-foreground">Our Commitment:</span> We maintain
            the highest international standards of quality, safety, and environmental
            responsibility in all our operations.
          </p>
        </div>
      </div>
    </section>
  );
}
