"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function SensingWhatWeOffer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-we-offer"
      className="relative w-full bg-[#181818] text-white pt-20 pb-20 sm:pt-28 sm:pb-28 lg:pt-36 lg:pb-36 border-b border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 min-[400px]:px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Top Row: Title on Left, 4 Editorial Paragraphs on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 sm:mb-24 lg:mb-32">
          {/* Left Column: Monumental Title */}
          <div className="lg:col-span-5 text-center sm:text-left">
            <h2
              style={{ fontFamily: "forma-djr-display, sans-serif" }}
              className="text-4xl min-[420px]:text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] text-white font-normal tracking-[-0.03em] leading-[0.95]"
            >
              What we offer
            </h2>
          </div>

          {/* Right Column: 4 Clean Editorial Text Blocks */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-sm sm:text-base text-zinc-300/85 font-light leading-relaxed max-w-2xl text-left">
            <p>
              Waterfront acoustic R&amp;D facility and deep-water ocean proving grounds. Direct access to dynamic, contested littoral and benthic test environments.
            </p>
            <p>
              Acousticians, hydrodynamicists, signal processing architects, and mission operations lead work side by side. Small enough team that your engineering decisions have immediate field impact.
            </p>
            <p>
              We engineer synthetic aperture sonar arrays, high-frequency beamforming FPGA cores, low-frequency passive surveillance, and cooperative autonomy. Hardware and software. Build and sea-trial cycles measured in weeks, not years.
            </p>
            <p>
              Full-spectrum payload integration. Subsea acoustic intelligence down to 6,000 meters. What we don&apos;t offer is slow pace, simulated-only testing, and low stakes.
            </p>
          </div>
        </div>

        {/* Bottom Row: Two Images with 3D White Submarine Overlay */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-12 lg:gap-8 items-stretch pt-4">
          {/* Left Photo Container with 3D White Submarine Floating Over It */}
          <div className="relative lg:col-span-5 aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-none overflow-visible group mt-10 min-[400px]:mt-14 sm:mt-0">
            {/* Marine Engineers Boat Photo (People remain fully visible!) */}
            <div className="relative w-full h-full bg-zinc-900 overflow-hidden shadow-2xl">
              <Image
                src="/images/sensing-engineers-boat.jpg"
                alt="Aethel marine sensing engineers on an expedition vessel running acoustic sea trials"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-bottom sm:object-center filter contrast-105 brightness-95 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>

            {/* 3D WHITE SUBMARINE FLOATING OVER THE TOP-LEFT SKY (Positioned high so it never obscures the engineers) */}
            <div
              className="absolute -top-[46%] -left-[10%] min-[400px]:-top-[48%] min-[400px]:-left-[12%] sm:-top-[36%] sm:-left-[24%] lg:-top-[42%] lg:-left-[26%] w-[80%] min-[400px]:w-[84%] sm:w-[98%] lg:w-[102%] aspect-square pointer-events-none z-20 select-none"
              style={{
                transition: "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease-out",
                transform: hasEntered
                  ? "translate3d(0, 0, 0) scale(1)"
                  : "translate3d(480px, -480px, 0) scale(0.9)",
                opacity: hasEntered ? 1 : 0,
              }}
            >
              <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]">
                <Image
                  src="/images/white-sub-hero-angled.png"
                  alt="Aethel Autonomous White Submarine 3D Vehicle Render"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-center drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)] filter contrast-110 brightness-105"
                />
              </div>
            </div>
          </div>

          {/* Right Photo: Wide Maritime Field Deployment */}
          <div className="relative lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full bg-zinc-900 overflow-hidden shadow-2xl group">
            <Image
              src="/images/mission-field-dock.jpg"
              alt="Marine technician carrying an autonomous yellow sensing vehicle towards research vessel RV SEAEXPLORER"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-center filter contrast-105 brightness-95 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
