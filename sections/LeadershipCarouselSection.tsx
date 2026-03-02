'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Leader {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
}

const leaders: Leader[] = [
  {
    id: 1,
    name: 'स्व. डॉ. राजेन्द्र कुमार जैन (B.I.M.S., H.P.A.)',
    title: 'पूर्व परामर्शदाता चिकित्सक – धन्यरसशाला',
    description:
      'श्रेष्ठ आयुर्वेदज्ञ, आयुर्वेद विशेषज्ञ आदि विभिन्न उपाधियों से सुशोभित। महाऔषधि रुदंती को शोष (लगभग एड्स के समान) नाशक औषधि एवं रोग प्रतिरोधक क्षमता बढ़ाने वाली औषधि के रूप में स्थापित करना। अपनी विशेषज्ञता से AIIMS (दिल्ली) को अपनी चिकित्सा क्षमता का लोहा मनवाना। हाइड्रोफोबिया (स्वानदंश) जैसी आज लाइलाज मानी जाने वाली व्याधि को स्वस्थ कर आश्चर्य उत्पन्न करना। मूत्र परीक्षण को रोगों के सटीक निदान में अत्यंत उपयोगी सिद्ध कर इस प्राचीन विद्या को पुनः प्रतिष्ठित करना। कैंसर, कुष्ठ, हृदय रोग, खंज (लिथेरिज्म) इत्यादि असाध्य रोगों के अनेक रोगियों को स्वस्थ कर नवजीवन प्रदान करना। ऐसे व्यक्तित्व का धन्यरसशाला से जुड़ना हमारे लिए गौरव की बात है।',
    image: 'https://drshealth.in/wp-content/uploads/2026/03/Screenshot-2026-03-02-at-3.18.19 PM.png',
  },
  {
    id: 2,
    name: 'Vaidya Dhanya Kumar Jain (DNYS, Ayurvedacharya)',
    title: 'Founder – DRS Health Solutions',
    description:
      'With 25+ years of experience in Ayurveda, Vaidya Dhanya Kumar Jain founded DRS Health Solutions (Dhanya Ras Shala) in 2003 in Tikamgarh (M.P.) to carry forward the rich legacy of his grandfather, Rajvaidya Pandit Barelal Ji. With a powerful vision to take Ayurveda to every home across the world, he is a dedicated practitioner and formulation expert who creates authentic and result-oriented Ayurvedic medicines while actively treating patients at his clinic with holistic care. He has also been serving Jeev Daya Parmarth Jan Kalyan Samiti (NGO) for several years as the Secretary of the community, actively contributing towards social welfare and humanitarian service.',
    image: 'https://drshealth.in/wp-content/uploads/2026/02/PHOTO-2026-02-27-13-01-10-e1772191818188.jpg',
  },
  {
    id: 3,
    name: 'Bimbsar Jain',
    title: 'Director – DRS Health Solutions Pvt. Ltd.',
    description:
      'At just 22 years of age, Bimbsar Jain represents the dynamic new generation leading the expansion of DRS Health Solutions Pvt. Ltd., the evolution of Dhanya Ras Shala. Carrying forward his father\'s rich Ayurvedic legacy, he is driven by innovation, growth, and a modern vision to take the brand to greater heights while preserving its authentic roots. His leadership reflects youthful energy combined with deep respect for tradition.',
    image: 'https://drshealth.in/wp-content/uploads/2026/02/PHOTO-2026-02-27-15-23-12-e1772191735849.jpg',
  },
];

export function LeadershipCarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % leaders.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + leaders.length) % leaders.length);
  };

  const currentLeader = leaders[currentSlide];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-soft-bg via-white to-accent-blue/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Our Leadership Journey
          </h2>
          <p className="text-lg text-body-muted max-w-2xl mx-auto">
            Three generations of vision, dedication, and healthcare excellence
          </p>
        </div>

        {/* Carousel */}
        <div className="relative bg-gradient-to-br from-accent-blue/10 to-primary/5 rounded-2xl overflow-hidden p-8 lg:p-12 border border-border shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-[28rem] lg:h-[32rem] w-full">
              <Image
                src={currentLeader.image}
                alt={currentLeader.name}
                fill
                className="object-cover object-top rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center min-h-[24rem]">
              <h3 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-2">
                {currentLeader.name}
              </h3>
              <p className="text-lg text-primary font-semibold mb-4">
                {currentLeader.title}
              </p>
              <p className="text-body-muted text-base lg:text-lg leading-relaxed mb-8">
                {currentLeader.description}
              </p>

              {/* Carousel Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prevSlide}
                  className="p-3 bg-white rounded-full shadow-card hover:shadow-card-hover hover:bg-accent-green/10 transition-all border border-border"
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextSlide}
                  className="p-3 bg-white rounded-full shadow-card hover:shadow-card-hover hover:bg-accent-green/10 transition-all border border-border"
                  aria-label="Next slide"
                >
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Slide Indicators */}
                <div className="flex gap-2 ml-auto">
                  {leaders.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentSlide
                          ? 'w-8 bg-primary'
                          : 'w-2 bg-border'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
