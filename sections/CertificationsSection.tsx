'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { PLACEHOLDER_IMAGES } from '@/lib/placeholderImages';

interface Certification {
  id: number;
  name: string;
  description: string;
  logo: string;
}

const certifications: Certification[] = [
  { id: 1, name: 'ISO 9001:2015', description: 'Quality Management System', logo: PLACEHOLDER_IMAGES.logo },
  { id: 2, name: 'WHO GMP', description: 'World Health Organization GMP', logo: PLACEHOLDER_IMAGES.logo },
  { id: 3, name: 'ISO 13485:2016', description: 'Medical Devices Quality', logo: PLACEHOLDER_IMAGES.logo },
  { id: 4, name: 'FSSAI', description: 'Food Safety & Standards', logo: PLACEHOLDER_IMAGES.logo },
  { id: 5, name: 'EIC Certification', description: 'Environment Protection', logo: PLACEHOLDER_IMAGES.logo },
  { id: 6, name: 'ISO 14001:2015', description: 'Environmental Management', logo: PLACEHOLDER_IMAGES.logo },
];

export function CertificationsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent-green/5 via-soft-bg to-accent-lime/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-semibold text-foreground mb-4">
            Certifications & Standards
          </h2>
          <p className="text-lg text-body-muted max-w-2xl mx-auto">
            Committed to the highest standards of quality and compliance
          </p>
        </div>

        {/* Scroll Container */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-card hover:shadow-card-hover hover:bg-accent-green/10 transition-all border border-border"
            aria-label="Scroll left"
          >
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-card hover:shadow-card-hover hover:bg-accent-green/10 transition-all border border-border"
            aria-label="Scroll right"
          >
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Certifications Scroll */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 px-4 scroll-smooth"
          >
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="flex-shrink-0 w-72 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all hover:-translate-y-2 p-8 text-center group border border-border"
              >
                {/* Certification Logo */}
                <div className="relative h-32 mb-6 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent-green/5 rounded-lg overflow-hidden border border-border">
                  <Image
                    src={cert.logo}
                    alt={cert.name}
                    width={120}
                    height={120}
                    className="object-cover opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {cert.name}
                </h3>
                <p className="text-body-muted">{cert.description}</p>

                {/* Checkmark */}
                <div className="mt-6 flex justify-center">
                  <span className="text-accent-green text-2xl">✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-border shadow-card">
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
