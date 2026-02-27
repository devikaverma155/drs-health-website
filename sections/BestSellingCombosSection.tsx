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
    <section className="section-padding section-bg-gradient relative overflow-hidden">
      {/* Organic background glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-green-100/15 to-transparent blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-tl from-amber-100/10 to-transparent blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Best Selling Combos
          </h2>
          <p className="text-lg text-body-muted max-w-2xl mx-auto">
            Curated combinations that our customers love and trust
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Main Carousel Card */}
          <div className="rounded-3xl overflow-hidden backdrop-blur-md border border-white/40">
            <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-filter backdrop-blur-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-8 md:p-16">
                {/* Image with glass effect */}
                <div className="relative h-96 rounded-2xl overflow-hidden group">
                  <Image
                    src={combos[currentSlide].image}
                    alt={combos[currentSlide].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Glass overlay effect on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    {combos[currentSlide].discount} OFF
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {combos[currentSlide].title}
                  </h3>
                  <p className="text-lg text-body-muted mb-8 leading-relaxed">
                    {combos[currentSlide].description}
                  </p>

                  {/* Pricing with gold accent */}
                  <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-amber-50/50 to-white/50 border border-amber-200/30">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                        {combos[currentSlide].price}
                      </span>
                      <span className="text-xl text-body-muted line-through">
                        {combos[currentSlide].originalPrice}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button with hover effect */}
                  <button className="bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg hover:from-primary-dark hover:to-primary text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 mb-8 w-full md:w-auto text-center transform hover:scale-105">
                    Add to Cart
                  </button>

                  {/* Indicators */}
                  <div className="flex gap-3 items-center">
                    {combos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`rounded-full transition-all duration-300 ${
                          idx === currentSlide
                            ? 'w-8 h-3 bg-primary shadow-md'
                            : 'w-3 h-3 bg-border hover:bg-primary/50'
                        }`}
                        aria-label={`Go to combo ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons with glass effect */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-white/95 hover:from-primary/10 transition-all border border-white/60 group"
            aria-label="Previous combo"
          >
            <svg
              className="w-6 h-6 text-primary group-hover:text-primary-dark transition-colors"
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
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-white/95 transition-all border border-white/60 group"
            aria-label="Next combo"
          >
            <svg
              className="w-6 h-6 text-primary group-hover:text-primary-dark transition-colors"
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
