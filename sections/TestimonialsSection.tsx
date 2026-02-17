'use client';

import { useState } from 'react';

const TESTIMONIALS = [
  {
    quote:
      'I have been using DRS Health products for my liver care for over six months. The difference is noticeable. The free consultation helped me choose the right combination.',
    author: 'Rajesh M.',
    location: 'Mumbai',
  },
  {
    quote:
      'Authentic Ayurvedic formulations and genuine advice. The team took time to understand my health concerns and suggested products that actually work.',
    author: 'Priya S.',
    location: 'Delhi',
  },
  {
    quote:
      'Trustworthy brand. Quality packaging and clear usage instructions. I recommend DRS Health for anyone looking for traditional wellness with modern convenience.',
    author: 'Amit K.',
    location: 'Bangalore',
  },
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];

  return (
    <section className="section-padding bg-soft-bg border-y border-border">
      <div className="container-tight text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-10">
          What Our Customers Say
        </h2>
        <blockquote className="max-w-2xl mx-auto">
          <p className="text-lg text-body-muted italic">&ldquo;{t.quote}&rdquo;</p>
          <footer className="mt-6 text-foreground font-medium">
            — {t.author}, {t.location}
          </footer>
        </blockquote>
        <div className="mt-8 flex justify-center gap-2" role="tablist" aria-label="Testimonials">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`View testimonial ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === index ? 'bg-primary' : 'bg-primary/30 hover:bg-primary/50'
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
