'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Leader {
  id: number;
  generation: string;
  name: string;
  title: string;
  description: string;
  image: string;
}

const leaders: Leader[] = [
  {
    id: 1,
    generation: 'First Generation',
    name: 'Founder Name',
    title: 'Founder & Visionary',
    description:
      'Established the foundation of excellence and innovation in healthcare. Pioneering pharmaceutical solutions that transformed the industry.',
    image: 'https://drshealth.in/wp-content/uploads/2026/02/consultation.jpg',
  },
  {
    id: 2,
    generation: 'Second Generation',
    name: 'Leadership Name',
    title: 'Chairman & MD',
    description:
      'Expanded vision globally while maintaining core values. Introduced modern manufacturing and distribution networks across India.',
    image: 'https://drshealth.in/wp-content/uploads/2024/11/6-12-scaled.webp',
  },
  {
    id: 3,
    generation: 'Third Generation',
    name: 'Modern Leader Name',
    title: 'CEO & Director',
    description:
      'Driving digital transformation and sustainable growth. Leading with innovation, technology, and commitment to healthcare excellence.',
    image: 'https://drshealth.in/wp-content/uploads/2026/02/consultation.jpg',
  },
];

export function LeadershipCarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % leaders.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + leaders.length) % leaders.length);
  };

  const currentLeader = leaders[currentSlide];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-soft-bg via-white to-accent-blue/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-semibold text-foreground mb-4">
            Our Leadership Journey
          </h2>
          <p className="text-lg text-body-muted max-w-2xl mx-auto">
            Three generations of vision, dedication, and healthcare excellence
          </p>
        </div>

        {/* Carousel */}
        <div className="relative bg-gradient-to-br from-accent-blue/10 to-primary/5 rounded-2xl overflow-hidden p-8 lg:p-12 border border-border shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-96 lg:h-full min-h-96">
              <Image
                src={currentLeader.image}
                alt={currentLeader.name}
                fill
                className="object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                {currentLeader.generation}
              </span>
              <h3 className="text-4xl font-semibold text-foreground mb-2">
                {currentLeader.name}
              </h3>
              <p className="text-lg text-primary font-semibold mb-6">
                {currentLeader.title}
              </p>
              <p className="text-body-muted text-lg leading-relaxed mb-8">
                {currentLeader.description}
              </p>

              {/* Carousel Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prevSlide}
                  className="p-3 bg-white rounded-full shadow-card hover:shadow-card-hover hover:bg-accent-green/10 transition-all border border-border"
                  aria-label="Previous slide"
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
                  onClick={nextSlide}
                  className="p-3 bg-white rounded-full shadow-card hover:shadow-card-hover hover:bg-accent-green/10 transition-all border border-border"
                  aria-label="Next slide"
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

                {/* Slide Indicators */}
                <div className="flex gap-2 ml-auto">
                  {leaders.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentSlide
                          ? 'w-8 bg-primary'
                          : 'w-2 bg-border'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
