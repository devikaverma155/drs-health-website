import { HeroSlideshowSection } from '@/sections/HeroSlideshowSection';
import { CategoryPillsSection } from '@/sections/CategoryPillsSection';
import { NewLaunchesSection } from '@/sections/NewLaunchesSection';
import { BestSellersSection } from '@/sections/BestSellersSection';
import { ManufacturingQualitySection } from '@/sections/ManufacturingQualitySection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { BrandStorySection } from '@/sections/BrandStorySection';
import { ConsultationFormSection } from '@/sections/ConsultationFormSection';
import { BlogPreviewSection } from '@/sections/BlogPreviewSection';
import { FooterCTASection } from '@/sections/FooterCTASection';
import { ServicesScrollSection } from '@/sections/ServicesScrollSection';
import { ReelsSection } from '@/sections/ReelsSection';
import { BestSellingCombosSection } from '@/sections/BestSellingCombosSection';
import { CertificationsSection } from '@/sections/CertificationsSection';

// Fetch product data at request time (not build time) to handle API unavailability
// Uses ISR to revalidate every 60 seconds
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <HeroSlideshowSection />
      <CategoryPillsSection />
      <BestSellersSection />
      <BrandStorySection />
      <BestSellingCombosSection />
      {/* <NewLaunchesSection /> */}
      <ServicesScrollSection />
     
      
      <ManufacturingQualitySection />
      <CertificationsSection />
      <TestimonialsSection />
       <ReelsSection />
      <ConsultationFormSection />
      <BlogPreviewSection />
      <FooterCTASection />
    </>
  );
}
