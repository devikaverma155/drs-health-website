"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

const services: Service[] = [
  {
    id: "pcd",
    title: "PCD Pharma",
    description: "Professional Cooperation Distributor rights across India",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80",
    href: "/for-business/pcd",
  },
  {
    id: "b2b",
    title: "B2B Services",
    description: "Bulk distribution and wholesale solutions",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    href: "/for-business/b2b",
  },
  {
    id: "contract-manufacturing",
    title: "Contract Manufacturing",
    description: "Custom formulation and manufacturing services",
    image:
      "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=600&q=80",
    href: "/for-business/contract-manufacturing",
  },
  {
    id: "private-labelling",
    title: "Private Labelling",
    description: "White label solutions for your brand",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
    href: "/for-business/private-labelling",
  },
  {
    id: "ayurvedic",
    title: "Ayurvedic Consultation",
    description: "Expert-guided personalized Ayurvedic wellness plans",
    image:
      "https://images.unsplash.com/photo-1611003229186-80e40cd54966?w=600&q=80",
    href: "/consultation",
  },
  {
    id: "quality",
    title: "Quality Assurance",
    description: "WHO GMP certified manufacturing with rigorous testing",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    href: "/manufacturing-quality",
  },
];

export function ServicesCarouselSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 2500);

    return () => clearTimeout(interval);
  }, [api, current]);

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
     
    >
      {/* Enhanced glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-bl from-white/20 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header — matching existing typography */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-black mb-4">
            Our Services
          </h2>
          <p className="text-lg text-primary/90 max-w-2xl mx-auto">
            Comprehensive business solutions tailored for your pharmaceutical
            needs
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{ loop: true, align: "start" }}
        >
          <CarouselContent className="-ml-4">
            {services.map((service) => (
              <CarouselItem
                className="basis-[85%] sm:basis-1/2 lg:basis-1/3 pl-4"
                key={service.id}
              >
                <Link href={service.href} className="group block h-full">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1">
                    {/* Background Image */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Text content on top of image */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3 className="font-heading text-xl md:text-2xl font-semibold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2 text-white/90 font-semibold text-sm group-hover:gap-3 transition-all">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                api?.scrollTo(index);
                setCurrent(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === (api?.selectedScrollSnap() ?? 0)
                  ? "bg-white w-6"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
