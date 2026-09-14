"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface DefenseMissionCalloutProps {
  onOpenInquiry?: (category?: string) => void;
}

export default function DefenseMissionCallout({
  onOpenInquiry,
}: DefenseMissionCalloutProps) {
  return (
    <section
      id="defense-mission"
      className="relative w-full bg-[#111215] text-white min-h-[500px] sm:min-h-[580px] md:min-h-[660px] lg:min-h-[760px] py-20 sm:py-28 md:py-36 lg:py-44 flex items-center overflow-hidden z-10 border-b border-white/[0.08]"
    >
      {/* 1. CINEMATIC AERIAL OCEAN BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/defense-ocean-aerial.jpg"
          alt="Aerial view of open ocean maritime theater with stealth submersible wake"
          fill
          className="object-cover object-center brightness-95 contrast-105"
          priority
          quality={95}
        />

        {/* Seamless Vignette & Contrast Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-32 sm:h-44 md:h-56 bg-gradient-to-b from-[#111215] via-[#111215]/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-44 md:h-56 bg-gradient-to-t from-[#111215] via-[#111215]/50 to-transparent pointer-events-none" />
      </div>

      {/* 2. FOREGROUND CONTENT */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full relative z-10">
        <div className="max-w-3xl">
          {/* Main Headline matching reference */}
          <h2
            style={{ fontFamily: "forma-djr-display, sans-serif" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-normal text-white tracking-tight leading-[1.06] mb-6 sm:mb-8"
          >
            The Mission Does Not Wait.
            <br />
            Neither Should You.
          </h2>

          {/* Minimal Oval Pill Button matching reference */}
          <div>
            <Button
              variant="secondary"
              size="md"
              shape="pill"
              className="px-6 py-2.5 sm:px-7 sm:py-3 text-[11px] sm:text-xs tracking-[0.18em] border-white/25 hover:border-white/60 bg-black/50 hover:bg-black/70 backdrop-blur-md transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
              onClick={() => {
                if (onOpenInquiry) onOpenInquiry("Defense Mission Deployment");
              }}
            >
              CONTACT US
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
