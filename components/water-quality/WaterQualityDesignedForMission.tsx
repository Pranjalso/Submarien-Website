"use client";

import React from "react";
import Image from "next/image";

export default function WaterQualityDesignedForMission() {
  return (
    <section className="relative w-full bg-[#000000] text-white py-16 sm:py-24 lg:py-32 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-5 min-[400px]:px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header: Monumental Display Title & Editorial Subtitle */}
        <div className="max-w-3xl mb-8 sm:mb-12 lg:mb-16">
          <h2
            style={{ fontFamily: "forma-djr-display, sans-serif" }}
            className="text-4xl min-[420px]:text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-white font-normal tracking-[-0.03em] leading-[1.05] mb-3 sm:mb-4"
          >
            Designed for the Mission.
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-300 font-light leading-snug">
            Undersea superiority through mission-focused innovation, delivered at scale.
          </p>
        </div>

        {/* 3-Photo Editorial Grid (Matching Reference Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Left Column: Prominent Large Ocean Transect Photo */}
          <div className="lg:col-span-7 w-full">
            <div className="relative w-full aspect-[4/3] bg-zinc-950 border border-white/[0.1] overflow-hidden group">
              <Image
                src="/images/mission-auv-wake.jpg"
                alt="Overhead aerial view of autonomous water quality sensor platform cruising through ocean water"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] filter contrast-110 brightness-95"
                priority
              />
            </div>
          </div>

          {/* Right Column: Two Stacked Field Deployment Photos */}
          <div className="lg:col-span-5 w-full flex flex-col gap-6 sm:gap-8 lg:gap-10">
            {/* Top Right: Fleet Staged along Shoreline */}
            <div className="relative w-full aspect-[4/3] bg-zinc-950 border border-white/[0.1] overflow-hidden group">
              <Image
                src="/images/mission-beach-fleet.jpg"
                alt="Autonomous water quality survey fleet staged on coastal beach for littoral testing"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] filter contrast-105 brightness-95"
              />
            </div>

            {/* Bottom Right: Researcher Deploying Hydrographic Sensor Drone at Dock */}
            <div className="relative w-full aspect-[16/9] bg-zinc-950 border border-white/[0.1] overflow-hidden group">
              <Image
                src="/images/mission-field-dock.jpg"
                alt="Oceanographic researcher deploying compact autonomous hydrographic sensor vehicle at marine dock"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] filter contrast-105 brightness-95"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
