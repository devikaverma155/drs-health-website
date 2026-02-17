import { getCategories } from '@/lib/woocommerce';
import { CategoryCarousel } from './CategoryCarousel';

export async function CategoryPillsSection() {
  const categories = await getCategories();
  return <CategoryCarousel categories={categories} />;
}
