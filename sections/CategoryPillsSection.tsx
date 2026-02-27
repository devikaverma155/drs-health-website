import Image from 'next/image';
import { getCategories } from '@/lib/woocommerce';
import { CategoryCarousel } from './CategoryCarousel';

export async function CategoryPillsSection() {
  const categories = await getCategories();

  return (
    <section className="relative section-padding overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://drshealth.in/wp-content/uploads/2026/02/image-1771828228498-e1771838724548.png"
          alt="Background accent"
          fill
          priority
          className="object-cover object-center"
          
        />

        {/* Soft overlay for readability */}
        <div className="absolute inset-0 bg-white/45 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="container-tight relative z-10">

        {/* Section Header */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            We Tackle These Issues
          </h2>

          <p className="text-lg md:text-xl text-body-muted max-w-2xl mx-auto">
            Comprehensive Ayurvedic solutions for common health concerns and wellness challenges
          </p>
        </div>

        {/* Categories Carousel */}
        <CategoryCarousel categories={categories} />

      </div>
    </section>
  );
}
