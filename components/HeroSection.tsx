"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  onOpenInquiry?: (category?: string) => void;
}

export default function HeroSection({ onOpenInquiry }: HeroSectionProps) {

  return (
    <section className="relative min-h-0 sm:min-h-[100dvh] flex flex-col justify-between bg-black overflow-hidden" id="vessel">
      {/* Top Navbar */}
      <Navbar
        onSelectCategory={onOpenInquiry}
      />

      {/* Looping Hero Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-60 filter contrast-125 brightness-90"
        >
          <source src="/Hero.mp4" type="video/mp4" />
        </video>
        {/* Soft Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020610] via-black/40 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
      </div>

      {/* Hero Center Title & Typography */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 w-full flex-1 flex flex-col items-start justify-center pt-8 sm:pt-12 lg:pt-16 pb-6 sm:pb-8 lg:pb-12">

        {/* Monumental Headline */}
        <h1
          style={{ fontFamily: "forma-djr-display, sans-serif" }}
          className="text-3xl min-[380px]:text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[1.04] sm:leading-[0.98] max-w-5xl"
        >
          Dominance <br />
          <span
            style={{
              fontFeatureSettings: '"liga" 0, "calt" 0, "dlig" 0',
              fontVariantLigatures: "none",
            }}
            className="inline-block font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-teal-300 pr-3 -mr-1"
          >
            beneat{"\u200C"}h
          </span>{" "}
          the surface.
        </h1>

        {/* Subtitle */}
        <p className="mt-2.5 min-[380px]:mt-3.5 sm:mt-6 text-xs sm:text-base md:text-lg text-zinc-300 max-w-2xl font-light leading-relaxed">
          Monolithic titanium submersibles and multi-vehicle autonomous swarms designed for contested, GPS-denied depths. Silent by physics. Decisive by design.
        </p>

        {/* Dual Primary Call-to-Actions in One Row */}
        <div className="mt-4 min-[380px]:mt-5 sm:mt-8 flex flex-row items-center gap-2 sm:gap-4 max-w-full overflow-x-visible">
          <Button
            variant="primary"
            shape="pill"
            className="text-[9.5px] min-[360px]:text-[11px] sm:text-xs px-2.5 min-[360px]:px-3.5 sm:px-6 py-2 min-[360px]:py-2.5 sm:py-3 min-h-[36px] sm:min-h-[44px] tracking-[0.08em] sm:tracking-[0.18em] whitespace-nowrap shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)]"
            onClick={() => {
              if (onOpenInquiry) onOpenInquiry("Flagship Architecture & Subsystems");
            }}
          >
            Request Brief
          </Button>

          <Button
            variant="secondary"
            shape="pill"
            className="text-[9.5px] min-[360px]:text-[11px] sm:text-xs px-2.5 min-[360px]:px-3.5 sm:px-6 py-2 min-[360px]:py-2.5 sm:py-3 min-h-[36px] sm:min-h-[44px] tracking-[0.08em] sm:tracking-[0.18em] whitespace-nowrap"
            href="#doctrine"
          >
            Explore Doctrine
          </Button>
        </div>
      </div>
    </section>
  );
}
