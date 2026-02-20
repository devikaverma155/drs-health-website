import { getCategories } from '@/lib/woocommerce';
import { CategoryCarousel } from './CategoryCarousel';

export async function CategoryPillsSection() {
  const categories = await getCategories();
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            We Tackle These Issues
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive Ayurvedic solutions for common health concerns and wellness challenges
          </p>
        </div>
<CategoryCarousel categories={categories} />

      </div>
    </section>
  );
}
