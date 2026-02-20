'use client';

import { useRef } from 'react';
import Link from 'next/link';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

const services: Service[] = [
  {
    id: 'pcd',
    title: 'PCD Pharma',
    description: 'Professional Cooperation Distributor rights across India',
    icon: '💊',
    href: '/for-business/pcd',
  },
  {
    id: 'b2b',
    title: 'B2B Services',
    description: 'Bulk distribution and wholesale solutions',
    icon: '🏭',
    href: '/for-business/b2b',
  },
  {
    id: 'contract-manufacturing',
    title: 'Contract Manufacturing',
    description: 'Custom formulation and manufacturing services',
    icon: '⚙️',
    href: '/for-business/contract-manufacturing',
  },
  {
    id: 'private-labelling',
    title: 'Private Labelling',
    description: 'White label solutions for your brand',
    icon: '🏷️',
    href: '/for-business/private-labelling',
  },
];

export function ServicesScrollSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent-green/5 via-soft-bg to-accent-blue/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-semibold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-body-muted max-w-2xl mx-auto">
            Comprehensive business solutions tailored for your pharmaceutical needs
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

          {/* Services Cards Scroll */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 px-4 scroll-smooth"
            style={{ scrollBehavior: 'smooth' }}
          >
            {services.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="flex-shrink-0 w-96 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all hover:-translate-y-2 p-8 group border border-border"
              >
                <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-body-muted mb-6 leading-relaxed">{service.description}</p>
                <div className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More
                  <svg
                    className="w-4 h-4"
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
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8">
          <p className="text-sm text-gray-500">← Scroll to see all services →</p>
        </div>
      </div>
    </section>
  );
}
