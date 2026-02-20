'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Combo {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  originalPrice: string;
  discount: string;
}

const combos: Combo[] = [
  {
    id: 1,
    title: 'Wellness Combo',
    description: 'Complete health package for daily wellness',
    image: 'https://drshealth.in/wp-content/uploads/2024/11/Syadwad-Combo.webp',
    price: '₹1,499',
    originalPrice: '₹1,999',
    discount: '25%',
  },
  {
    id: 2,
    title: 'Immunity Booster',
    description: 'Strengthen your immunity with our premium combo',
    image: 'https://drshealth.in/wp-content/uploads/2024/11/SW-Products.png',
    price: '₹1,799',
    originalPrice: '₹2,399',
    discount: '25%',
  },
  {
    id: 3,
    title: 'Skincare Essential',
    description: 'Complete skincare routine in one combo',
    image: 'https://drshealth.in/wp-content/uploads/2024/12/Herbalis-Shampoo-scaled.webp',
    price: '₹2,099',
    originalPrice: '₹2,899',
    discount: '28%',
  },
];

export function BestSellingCombosSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % combos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + combos.length) % combos.length);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent-lime/5 via-soft-bg to-accent-green/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-semibold text-foreground mb-4">
            Best Selling Combos
          </h2>
          <p className="text-lg text-body-muted max-w-2xl mx-auto">
            Curated combinations that our customers love and trust
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden p-8 md:p-12 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative h-96">
                <Image
                  src={combos[currentSlide].image}
                  alt={combos[currentSlide].title}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                  {combos[currentSlide].discount} OFF
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <h3 className="text-4xl font-semibold text-foreground mb-4">
                  {combos[currentSlide].title}
                </h3>
                <p className="text-lg text-body-muted mb-8 leading-relaxed">
                  {combos[currentSlide].description}
                </p>

                {/* Pricing */}
                <div className="mb-8">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-primary">
                      {combos[currentSlide].price}
                    </span>
                    <span className="text-2xl text-body-muted line-through">
                      {combos[currentSlide].originalPrice}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition-colors mb-8 inline-block w-full md:w-auto text-center">
                  Add to Cart
                </button>

                {/* Indicators */}
                <div className="flex gap-2 items-center">
                  {combos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-3 rounded-full transition-all ${
                        idx === currentSlide
                          ? 'w-8 bg-primary'
                          : 'w-3 bg-border'
                      }`}
                      aria-label={`Go to combo ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-card hover:shadow-card-hover hover:bg-accent-green/10 transition-all border border-border"
            aria-label="Previous combo"
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
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-card hover:shadow-card-hover hover:bg-accent-green/10 transition-all border border-border"
            aria-label="Next combo"
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
        </div>
      </div>
    </section>
  );
}
