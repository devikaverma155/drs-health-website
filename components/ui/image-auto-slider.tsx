'use client';

import React from 'react';

interface ImageAutoSliderProps {
  images: { src: string; alt: string }[];
  speed?: number; // seconds for one full cycle
  imageSize?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ImageAutoSlider({
  images,
  speed = 20,
  imageSize = 'md',
  className = '',
}: ImageAutoSliderProps) {
  // Duplicate for seamless loop
  const duplicated = [...images, ...images];

  const sizeClasses = {
    sm: 'w-32 h-32 md:w-40 md:h-40',
    md: 'w-48 h-48 md:w-64 md:h-64',
    lg: 'w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80',
  };

  return (
    <div className={`scroll-container w-full ${className}`}>
      <style>{`
        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .infinite-scroll {
          animation: scroll-right ${speed}s linear infinite;
        }
        .infinite-scroll:hover {
          animation-play-state: paused;
        }
        .scroll-container {
          mask: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
        }
        .slider-image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .slider-image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>
      <div className="infinite-scroll flex gap-6 w-max">
        {duplicated.map((image, index) => (
          <div
            key={index}
            className={`slider-image-item flex-shrink-0 ${sizeClasses[imageSize]} rounded-xl overflow-hidden shadow-lg`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
