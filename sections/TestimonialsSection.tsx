'use client';

import { useState } from 'react';

const TESTIMONIALS = [
  {
    quote:
      'Diabex already 6 months se use kar raha hu. Abhi bhi 4 April ko 1 month ka parcel aya hai, Heartly Thanks to Dr. vaidyas team for advising me.',
    author: 'Prabin Agrawal',
    location: 'Odisha',
    rating: 5,
  },
  {
    quote:
      'Vaidya\'s products are very effective and powerful. Thank you for giving us such excellent products.',
    author: 'Durga Prasad',
    location: 'Hyderabad',
    rating: 5,
  },
  {
    quote:
      'Regarding my medications everything is perfect. I am feeling so well and good within one week. really want to say thanks to everyone, especially Doctor Surya Bhagwati, who diagnosed me with my very bad health issues. The team there packaged up everything and then sent and coordinated with me on every step. I really appreciate your time and help! Looking forward to always receiving meds from your end. Thanks a lot.',
    author: 'Anju Shukla',
    location: 'Canada',
    rating: 5,
  },
  {
    quote:
      'I have been using DRS Health products for my liver care for over six months. The difference is noticeable. The free consultation helped me choose the right combination.',
    author: 'Rajesh M.',
    location: 'Mumbai',
    rating: 5,
  },
  {
    quote:
      'Authentic Ayurvedic formulations and genuine advice. The team took time to understand my health concerns and suggested products that actually work.',
    author: 'Priya S.',
    location: 'Delhi',
    rating: 5,
  },
  {
    quote:
      'Trustworthy brand. Quality packaging and clear usage instructions. I recommend DRS Health for anyone looking for traditional wellness with modern convenience.',
    author: 'Amit K.',
    location: 'Bangalore',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  return (
    <section className="section-padding bg-soft-bg border-y border-border">
      <div className="container-tight">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-2">
          Trusted By <span className="text-primary">10 Lakh+</span> Customers
        </h2>
        <p className="text-body-muted text-center mb-12 max-w-2xl mx-auto">
          Real stories from people whose lives have been transformed by our authentic Ayurvedic formulations.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {TESTIMONIALS.slice(index, index + 3).map((testimonial, i) => (
            <div
              key={`${index}-${i}`}
              className="bg-white rounded-2xl p-6 md:p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-200 h-full flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-accent-lime text-lg text-golden">
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="flex-1 mb-6">
                <p className="text-body-muted leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>
              <footer className="border-t border-border pt-4">
                <div className="font-semibold text-foreground">
                  {testimonial.author}
                </div>
                <div className="text-sm text-body-muted">
                  {testimonial.location}
                </div>
              </footer>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() =>
              setIndex((i) =>
                i === 0 ? Math.max(0, TESTIMONIALS.length - 3) : i - 1
              )
            }
            aria-label="Previous testimonials"
            className="p-2 rounded-lg border border-border hover:bg-white transition-colors"
          >
            ←
          </button>

          <div className="flex gap-2">
            {[...Array(Math.ceil(TESTIMONIALS.length / 3))].map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i * 3)}
                aria-label={`View testimonial group ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i * 3 === index
                    ? 'bg-primary'
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setIndex((i) =>
                i + 3 < TESTIMONIALS.length
                  ? i + 3
                  : TESTIMONIALS.length - 3
              )
            }
            aria-label="Next testimonials"
            className="p-2 rounded-lg border border-border hover:bg-white transition-colors"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
