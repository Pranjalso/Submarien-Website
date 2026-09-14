"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "lucide-react";

interface ServeDeploymentCalloutProps {
  onOpenInquiry?: (category?: string) => void;
}

export default function ServeDeploymentCallout({ onOpenInquiry }: ServeDeploymentCalloutProps) {
  return (
    <section className="relative w-full bg-black text-white py-12 sm:py-16 lg:py-20 border-b border-white/[0.08] overflow-hidden">
      {/* Ocean Waterfall Video Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-50 sm:opacity-60 filter contrast-125 brightness-95 saturate-110"
        >
          <source src="/Water-landscape.mp4" type="video/mp4" media="(min-width: 768px)" />
          <source src="/Water.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Oceanic Scrims for Text Readability & Deep Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(6,182,212,0.12),transparent_70%)] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/[0.05] border border-white/[0.1] text-[10px] sm:text-xs font-mono tracking-[0.2em] text-cyan-400 uppercase mb-4">
            [ DEPLOYMENT PROTOCOL 04-S // PERSISTENCE ]
          </div>

          {/* Heading */}
          <h2
            className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight uppercase text-white leading-[1.08] mb-5 sm:mb-6"
            style={{ fontFamily: "forma-djr-display, sans-serif" }}
          >
            ZERO DEDICATED INFRASTRUCTURE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-zinc-400">
              DEPLOY FROM ANY DECK, ANYWHERE.
            </span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-zinc-300 font-sans leading-relaxed max-w-2xl mb-8">
            AETHEL eliminates reliance on specialized submarine tender berths and dedicated naval drydocks.
            Our containerized staging systems convert commercial tugs, platform supply vessels, or scientific craft into sovereign hadal launch platforms in hours.
          </p>

          {/* Key Advantages Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-10 text-xs font-mono text-zinc-300">
            <div className="flex items-center gap-2.5 p-3 bg-black/60 border border-white/[0.08]">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Standard ISO-20 Footprint</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 bg-black/60 border border-white/[0.08]">
              <Check className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Turnkey VOO Integration</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 bg-black/60 border border-white/[0.08]">
              <Check className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Zero RF Acoustic Link</span>
            </div>
          </div>

          {/* Action CTAs in One Row */}
          <div className="flex flex-row items-center gap-2 sm:gap-4 max-w-full overflow-x-visible">
            <Button
              variant="primary"
              shape="pill"
              rightIcon={<ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />}
              className="text-[9.5px] min-[360px]:text-[11px] sm:text-xs px-2.5 min-[360px]:px-3.5 sm:px-6 py-2 min-[360px]:py-2.5 sm:py-3 min-h-[36px] sm:min-h-[44px] tracking-[0.08em] sm:tracking-[0.18em] whitespace-nowrap shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)]"
              onClick={() => onOpenInquiry?.("Serve")}
            >
              EXPEDITIONARY CONSULT
            </Button>

            <Button
              variant="secondary"
              shape="pill"
              className="text-[9.5px] min-[360px]:text-[11px] sm:text-xs px-2.5 min-[360px]:px-3.5 sm:px-6 py-2 min-[360px]:py-2.5 sm:py-3 min-h-[36px] sm:min-h-[44px] tracking-[0.08em] sm:tracking-[0.18em] whitespace-nowrap"
              href="/defense"
            >
              DEFENSE FLEET
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
