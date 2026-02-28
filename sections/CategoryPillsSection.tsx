import Image from 'next/image';
import { getCategories } from '@/lib/woocommerce';
import { CategoryCarouselAnimated } from '@/components/ui/logo-carousel';

export async function CategoryPillsSection() {
  const categories = await getCategories();

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        {/* Soft overlay for readability */}
        <div className="absolute inset-0 bg-white/45 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <CategoryCarouselAnimated
          categories={categories}
          title="We Tackle These Issues"
          subtitle="Comprehensive Ayurvedic solutions for common health concerns and wellness challenges"
          autoPlayInterval={1800}
        />
      </div>
    </section>
  );
}
