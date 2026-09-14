"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { ArrowDown, Droplets } from "lucide-react";

interface WaterQualityHeroProps {
  onOpenInquiry?: (category?: string) => void;
}

export default function WaterQualityHero({ onOpenInquiry }: WaterQualityHeroProps) {
  return (
    <section className="relative min-h-[92dvh] sm:min-h-screen flex flex-col justify-between bg-[#020612] text-white overflow-hidden border-b border-white/[0.08]">
      {/* 1. Global Navigation Bar */}
      <Navbar
        currentRoute="/water-quality"
        onSelectCategory={() => onOpenInquiry?.("Water Quality")}
      />

      {/* 2. Serene Pristine Underwater Caustics & Sunbeams Video */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-60 sm:opacity-75 filter contrast-110 brightness-95"
        >
          <source src="/water-caustics.mp4" type="video/mp4" />
        </video>

        {/* Minimal Soft Vignette Overlays for Maximum Elegance */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020612] via-transparent to-[#020612]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020612]/80 via-[#020612]/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.12),transparent_70%)] pointer-events-none" />
      </div>

      {/* 3. Minimal & Elegant Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 min-[400px]:px-6 sm:px-8 md:px-12 w-full flex-1 flex flex-col items-start justify-center text-left py-12 sm:py-16 md:py-24">
        {/* Monumental Headline */}
        <h1
          style={{ fontFamily: "forma-djr-display, sans-serif" }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white tracking-tight leading-[1.08] sm:leading-[1.01] max-w-5xl"
        >
          Purity <br />
          <span
            style={{
              fontFeatureSettings: '"liga" 0, "calt" 0',
              fontVariantLigatures: "none",
            }}
            className="inline-block font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-teal-300 pr-[0.25em] drop-shadow-[0_0_35px_rgba(45,212,191,0.22)] select-none"
          >
            deciphered
          </span>{" "}
          <br className="sm:hidden" />
          <span className="text-white">at depth.</span>
        </h1>

        {/* Minimal, Poetic Subtitle */}
        <p className="mt-4 sm:mt-6 text-xs min-[400px]:text-sm sm:text-base md:text-lg text-zinc-300/85 max-w-xl font-light leading-relaxed tracking-wide">
          Autonomous hadal water column profiling, biogeochemical telemetry, and in-situ ocean intelligence calibrated for 6,000-meter hydrostatic depths.
        </p>

        {/* Action Buttons in One Row */}
        <div className="mt-6 sm:mt-8 flex flex-row items-center gap-2 sm:gap-4 max-w-full overflow-x-visible">
          <Button
            variant="primary"
            shape="pill"
            leftIcon={<Droplets className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />}
            className="text-[9.5px] min-[360px]:text-[11px] sm:text-xs px-2.5 min-[360px]:px-3.5 sm:px-6 py-2 min-[360px]:py-2.5 sm:py-3 min-h-[36px] sm:min-h-[44px] tracking-[0.08em] sm:tracking-[0.18em] whitespace-nowrap shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)]"
            onClick={() => onOpenInquiry?.("Water Quality")}
          >
            Request Brief
          </Button>

          <Button
            variant="secondary"
            shape="pill"
            rightIcon={<ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-400 shrink-0" />}
            className="text-[9.5px] min-[360px]:text-[11px] sm:text-xs px-2.5 min-[360px]:px-3.5 sm:px-6 py-2 min-[360px]:py-2.5 sm:py-3 min-h-[36px] sm:min-h-[44px] tracking-[0.08em] sm:tracking-[0.18em] whitespace-nowrap"
            href="#sensor-suite"
          >
            Explore Sensors
          </Button>
        </div>

        {/* Elegant Minimal Telemetry Indicators */}
        <div className="mt-8 sm:mt-12 pt-5 sm:pt-7 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 w-full max-w-2xl">
          <div>
            <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">Profiling Depth</div>
            <div className="mt-1 sm:mt-1.5 text-xs sm:text-base font-light text-zinc-200 tracking-tight flex items-baseline gap-1.5">
              <span>6,000</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-cyan-400/90 font-medium">METERS</span>
            </div>
          </div>
          <div>
            <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">Salinity Precision</div>
            <div className="mt-1 sm:mt-1.5 text-xs sm:text-base font-light text-zinc-200 tracking-tight flex items-baseline gap-1.5">
              <span>0.001</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-cyan-400/90 font-medium">PSU</span>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">Acoustic Uplink</div>
            <div className="mt-1 sm:mt-1.5 text-xs sm:text-base font-light text-zinc-200 tracking-tight flex items-baseline gap-1.5">
              <span>Real-Time</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-teal-400/90 font-medium">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Elegant Minimal Bottom Baseline */}
      <div className="relative z-10 px-4 min-[400px]:px-6 sm:px-8 md:px-12 py-3.5 sm:py-4 w-full border-t border-white/[0.06] bg-black/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col min-[440px]:flex-row items-start min-[440px]:items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider text-zinc-400">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span>CONTINUOUS HADAL PROFILING</span>
          </div>
          <span className="text-zinc-500">DEPTH CERTIFIED: 6,000M</span>
        </div>
      </div>
    </section>
  );
}
