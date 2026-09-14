"use client";

import React from "react";
import Image from "next/image";

export default function WaterQualityMissionSection() {
  return (
    <section className="relative w-full min-h-[75vh] sm:min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between bg-black text-white overflow-hidden border-b border-white/[0.08]">
      {/* Background Aerial Coastal Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/ocean-mission-coastal.jpg"
          alt="Cinematic aerial view of coastal ocean water and headland"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[25%_center] sm:object-[40%_center] md:object-center filter brightness-[0.82] contrast-[1.15]"
        />

        {/* Ambient Dark Gradient Overlay for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/45 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 min-[400px]:px-6 sm:px-8 md:px-12 lg:px-16 pt-20 sm:pt-24 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 flex flex-col justify-between flex-1">
        {/* Top Eyebrow / Label (Matching Reference) */}
        <div>
          <span className="text-white/90 font-sans text-base sm:text-lg md:text-xl font-normal tracking-wide">
            Mission
          </span>
        </div>

        {/* Monumental Headline (Matching Reference Typography & Rhythm) */}
        <div className="max-w-4xl lg:max-w-5xl pt-16 sm:pt-24 md:pt-32 pb-4 sm:pb-6">
          <h2
            style={{ fontFamily: "forma-djr-display, sans-serif" }}
            className="text-3xl min-[420px]:text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] text-white font-normal tracking-[-0.03em] leading-[1.08]"
          >
            Ocean intelligence through mission-focused sensing, delivered at scale.
          </h2>
        </div>
      </div>
    </section>
  );
}
