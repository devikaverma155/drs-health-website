'use client';

import Image from 'next/image';

export function ImageAccentSection() {
  return (
    <section className="section-padding section-bg-gradient relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-bl from-green-100/15 to-transparent blur-3xl"></div>
      </div>

      <div className="container-tight relative z-10">
        <div className="flex justify-center items-center min-h-96">
          {/* Rotated image with premium styling */}
          <div className="relative w-full max-w-2xl">
            <div className="rounded-3xl overflow-hidden backdrop-blur-md border border-white/40 p-8 bg-gradient-to-br from-white/80 to-white/60">
              <div className="relative w-full h-96 transform rotate-90 origin-center">
                <Image
                  src="https://drshealth.in/wp-content/uploads/2026/02/image-1771828228498.png"
                  alt="Rotated botanical accent"
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
