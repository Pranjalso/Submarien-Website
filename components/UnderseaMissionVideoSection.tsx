"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface UnderseaMissionVideoSectionProps {
  onExploreMission?: () => void;
}

export default function UnderseaMissionVideoSection({ onExploreMission }: UnderseaMissionVideoSectionProps) {
  return (
    <section
      id="defense"
      className="relative py-10 sm:py-14 lg:py-16 px-4 sm:px-8 lg:px-12 bg-[#011627] overflow-hidden flex items-center justify-center scroll-mt-20 border-b border-white/[0.08] w-full max-w-[100vw]"
    >
      <span id="mission" className="absolute top-0 pointer-events-none" />
      {/* 1. BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Fallback Poster Image */}
        <Image
          src="/images/underwater-mission-bg.jpg"
          alt="Deep Ocean Water"
          fill
          priority
          className="object-cover object-center opacity-60"
        />

        {/* Looping Oceanic Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-70 sm:opacity-80 filter contrast-115 saturate-125 brightness-95"
        >
          <source src="/Water-landscape.mp4" type="video/mp4" media="(min-width: 768px)" />
          <source src="/Water.mp4" type="video/mp4" />
        </video>

        {/* Top Surface Waterline Silhouette & Ripple Caustic Accent */}
        <div className="absolute top-0 left-0 right-0 h-20 sm:h-44 pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#000913]/95 via-[#011627]/60 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-20 sm:h-28 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,189,248,0.18),transparent_75%)]" />
        </div>

        {/* Seamless Atmospheric Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#011422]/90 via-[#011c2e]/60 to-[#01121d]/90 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-36 bg-gradient-to-t from-[#020610] via-[#011422]/60 to-transparent pointer-events-none" />
      </div>

      {/* 2. FOREGROUND CONTENT: 2-COLUMN CINEMATIC COMPOSITION */}
      <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-10 lg:gap-16 items-center">
        {/* LEFT COLUMN: Single Autonomous Submersible (Clean, No Fan, No Sonar Beep Dots) */}
        <div className="lg:col-span-6 relative flex flex-col items-center lg:items-start justify-center order-2 lg:order-1 select-none py-2 sm:py-10">
          <div className="relative w-full max-w-[260px] min-[400px]:max-w-[300px] sm:max-w-[460px] lg:max-w-[580px] animate-pure-float [animation-duration:8s]">
            <div className="relative transform -rotate-[22deg] sm:-rotate-[34deg] origin-center">
              {/* Stern Cavitation Bubble Wake */}
              <div className="absolute -left-4 sm:-left-12 -top-3 sm:-top-6 pointer-events-none z-0">
                <div className="w-24 sm:w-36 h-6 sm:h-8 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent blur-sm animate-jet-cavitation" />
              </div>

              {/* Submarine Image (Clean, No Fan, No Beep Dots) */}
              <Image
                src="/image.png"
                alt="Aethel Autonomous Submersible"
                width={620}
                height={400}
                className="relative z-10 w-full h-auto object-contain filter drop-shadow-[0_25px_45px_rgba(0,10,20,0.9)] hue-rotate-[185deg] saturate-[1.25] brightness-[0.95]"
                priority
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Clean, Monumental Editorial Typography */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center pl-0 lg:pl-6">
          {/* Defense Domain Badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-cyan-400/30 bg-black/40 backdrop-blur-md mb-2.5 sm:mb-4 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[8.5px] sm:text-[10px] font-mono tracking-[0.16em] sm:tracking-[0.25em] text-cyan-200 uppercase font-semibold">
              DEFENSE &amp; MARITIME PATROL
            </span>
          </div>

          {/* Main Title */}
          <h2
            style={{ fontFamily: "forma-djr-display, sans-serif" }}
            className="font-forma text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-white leading-[1.04] sm:leading-[1.02]"
          >
            Built for the <br />
            mission
          </h2>

          {/* Key Mission Profiles Subtitle */}
          <p className="mt-3 sm:mt-6 text-xs sm:text-sm md:text-base font-normal text-zinc-300 leading-relaxed max-w-xl">
            Mine countermeasures. ISR. Surveillance. Undersea payload delivery. Passive acoustic monitoring. Hydrographic survey.
          </p>

          {/* Narrative Paragraph */}
          <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base font-light text-zinc-400 leading-relaxed max-w-xl">
            Designed to support expeditionary forces, maritime patrols, and distributed operations. Every mission has requirements that look impossible until someone builds the system that makes them routine. Let&apos;s discuss yours.
          </p>

          {/* Clean Minimal Pill Button */}
          <div className="mt-5 sm:mt-8">
            <Button
              variant="secondary"
              size="md"
              shape="pill"
              onClick={() => {
                if (onExploreMission) onExploreMission();
              }}
              className="w-full sm:w-auto text-[11px] sm:text-xs px-5 sm:px-7 py-2 sm:py-2.5"
            >
              VIEW PRODUCTS
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
