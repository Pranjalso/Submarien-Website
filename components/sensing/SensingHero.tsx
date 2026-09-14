"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface SensingHeroProps {
  onOpenInquiry?: (category?: string) => void;
}

export default function SensingHero({ onOpenInquiry }: SensingHeroProps) {
  return (
    <section className="relative w-full min-h-0 sm:min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-start sm:justify-center bg-[#010712] text-white overflow-hidden border-b border-white/[0.08]">
      {/* 1. Deep Ocean Acoustic Sensing Image Background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/sensing-abyss-hero.jpg"
          alt="Deep ocean abyss with acoustic sensing illumination"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.85] contrast-[1.1]"
        />

        {/* Cinematic Scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010712] via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* 2. Embedded Dynamic Navigation Bar */}
      <Navbar currentRoute="/sensing" onSelectCategory={onOpenInquiry} />

      {/* 3. Central Editorial Hero Copy (Minimal, Clean & Perfectly Spaced) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 min-[400px]:px-6 sm:px-8 md:px-12 lg:px-16 pt-12 min-[400px]:pt-14 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-24 flex flex-col justify-start sm:justify-center flex-1">
        <div className="max-w-4xl">
          {/* Monumental Headline */}
          <h1
            style={{ fontFamily: "forma-djr-display, sans-serif" }}
            className="text-3xl min-[380px]:text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] text-white font-normal tracking-[-0.03em] leading-[1.08] sm:leading-[1.02] mb-3.5 sm:mb-5 lg:mb-8"
          >
            Sub-Surface Perception <br />
            at Planetary Scale.
          </h1>

          {/* Editorial Prose */}
          <p className="text-xs min-[380px]:text-sm sm:text-base md:text-lg lg:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mb-6 sm:mb-8 lg:mb-10">
            Engineered for GPS-denied environments. Conformal passive listening arrays, millimeter-precision synthetic aperture sonar, and solid-state biogeochemical optodes operating down to 6,000 meters.
          </p>

          {/* Action CTAs in One Row */}
          <div className="flex flex-row items-center gap-2 sm:gap-4 max-w-full overflow-x-visible">
            <Button
              variant="primary"
              shape="pill"
              href="#where-it-works"
              rightIcon={<ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />}
              className="text-[9.5px] min-[360px]:text-[11px] sm:text-xs px-2.5 min-[360px]:px-3.5 sm:px-6 py-2 min-[360px]:py-2.5 sm:py-3 min-h-[36px] sm:min-h-[44px] tracking-[0.08em] sm:tracking-[0.18em] whitespace-nowrap shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)]"
            >
              <span className="sm:hidden">Sensor Suite</span>
              <span className="hidden sm:inline">Explore Sensor Suite</span>
            </Button>

            <Button
              variant="secondary"
              shape="pill"
              className="text-[9.5px] min-[360px]:text-[11px] sm:text-xs px-2.5 min-[360px]:px-3.5 sm:px-6 py-2 min-[360px]:py-2.5 sm:py-3 min-h-[36px] sm:min-h-[44px] tracking-[0.08em] sm:tracking-[0.18em] whitespace-nowrap"
              onClick={() => onOpenInquiry?.("Sensing")}
            >
              <span className="sm:hidden">Request Brief</span>
              <span className="hidden sm:inline">Request Sensor Brief</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
