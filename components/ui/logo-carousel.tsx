"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TextRoll } from "@/components/ui/text-roll";
import {
  Heart,
  Brain,
  Leaf,
  ShieldCheck,
  Droplets,
  Bone,
  Eye,
  Apple,
  Flame,
  Sparkles,
  Activity,
  Pill,
} from "lucide-react";

// Fallback icons mapped to common health categories
const categoryIcons: Record<string, React.ReactNode> = {
  heart: <Heart className="w-6 h-6" />,
  brain: <Brain className="w-6 h-6" />,
  immunity: <ShieldCheck className="w-6 h-6" />,
  digestion: <Apple className="w-6 h-6" />,
  liver: <Droplets className="w-6 h-6" />,
  bones: <Bone className="w-6 h-6" />,
  eye: <Eye className="w-6 h-6" />,
  skin: <Sparkles className="w-6 h-6" />,
  weight: <Flame className="w-6 h-6" />,
  diabetes: <Activity className="w-6 h-6" />,
  herbal: <Leaf className="w-6 h-6" />,
  default: <Pill className="w-6 h-6" />,
};

function getIconForCategory(slug: string): React.ReactNode {
  const lower = slug.toLowerCase();
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (lower.includes(key)) return icon;
  }
  return categoryIcons.default;
}

export interface CategoryPill {
  slug: string;
  label: string;
}

interface CategoryCarouselAnimatedProps {
  categories: CategoryPill[];
  title?: string;
  subtitle?: string;
  autoPlayInterval?: number;
}

export function CategoryCarouselAnimated({
  categories,
  title = "We Tackle These Issues",
  subtitle = "Comprehensive Ayurvedic solutions for common health concerns",
  autoPlayInterval = 1800,
}: CategoryCarouselAnimatedProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, autoPlayInterval);

    return () => clearTimeout(timer);
  }, [api, current, autoPlayInterval]);

  if (!categories.length) return null;

  return (
    <div className="w-full py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10">
          {/* Section header — matching site typography */}
          <div className="text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
              <TextRoll>{title}</TextRoll>
            </h2>
            <p className="text-lg text-body-muted max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Auto-scrolling carousel */}
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{ loop: true, align: "start" }}
          >
            <CarouselContent>
              {categories.map((cat) => (
                <CarouselItem
                  className="basis-1/3 sm:basis-1/4 lg:basis-1/6"
                  key={cat.slug}
                >
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-white p-5 md:p-6 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
                      {getIconForCategory(cat.slug)}
                    </div>
                    <span className="text-xs md:text-sm font-medium text-foreground text-center leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                      {cat.label}
                    </span>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
