"use client";

import React from "react";

interface BenefitItem {
  id: string;
  title: string;
}

const SENSING_BENEFITS: BenefitItem[] = [
  { id: "acoustic-transparency", title: "Full-Spectrum Acoustic Transparency" },
  { id: "zero-drag", title: "Zero Added Hydrodynamic Drag" },
  { id: "sas-precision", title: "Millimeter-Precision Synthetic Aperture" },
  { id: "edge-beamforming", title: "Real-Time FPGA Edge Beamforming" },
  { id: "hadal-depth", title: "6,000-Meter Hadal Depth Endurance" },
  { id: "gps-denied-nav", title: "GPS-Denied Acoustic Navigation" },
  { id: "ai-classification", title: "Autonomous AI Target Classification" },
];

export default function SensingBenefits() {
  return (
    <section
      id="sensing-benefits"
      className="relative w-full bg-[#181818] text-white pt-20 pb-20 sm:pt-28 sm:pb-28 lg:pt-36 lg:pb-36 border-b border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 min-[400px]:px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Two-Column Grid: Title on Left, Underlined Benefits on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Monumental Headline */}
          <div className="lg:col-span-5 text-center sm:text-left">
            <h2
              style={{ fontFamily: "forma-djr-display, sans-serif" }}
              className="text-4xl min-[420px]:text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white font-normal tracking-[-0.03em] leading-none"
            >
              Benefits
            </h2>
          </div>

          {/* Right Column: Underlined List of Sensing Benefits (Matching Reference) */}
          <div className="lg:col-span-7 flex flex-col w-full">
            {SENSING_BENEFITS.map((benefit) => (
              <div
                key={benefit.id}
                className="group py-5 sm:py-6 lg:py-7 border-b border-white/[0.08] transition-colors duration-300 hover:border-white/20"
              >
                <div
                  style={{ fontFamily: "forma-djr-display, sans-serif" }}
                  className="text-xl min-[420px]:text-2xl sm:text-3xl text-zinc-100 font-normal tracking-tight leading-snug transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-white"
                >
                  {benefit.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
