"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ShieldCheck, Cpu, Anchor, Activity } from "lucide-react";

interface ServeHeroProps {
  onOpenInquiry?: (category?: string) => void;
}

export default function ServeHero({ onOpenInquiry }: ServeHeroProps) {
  return (
    <section className="relative w-full bg-black text-white border-b border-white/[0.08] overflow-hidden">
      {/* 1. Global Navigation Bar */}
      <Navbar currentRoute="/serve" onSelectCategory={(cat) => onOpenInquiry?.(cat)} />

      {/* 2. Hero Background Video / Atmosphere with Dark Vignette Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-35 filter brightness-90 contrast-125"
        >
          <source src="/Water-landscape.mp4" type="video/mp4" />
        </video>
        {/* Deep ocean moody scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-black/90 pointer-events-none" />
      </div>

      {/* 3. Hero Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-16 pb-6 sm:pb-8 lg:pb-10 min-h-0 sm:min-h-[80vh] lg:min-h-[85vh] flex flex-col justify-between">
        {/* Hero Central Typography & Actions */}
        <div className="my-8 sm:my-12 lg:my-14 max-w-4xl">
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-cyan-400 uppercase mb-3 sm:mb-4">
            AETHEL FIELD OPERATIONS & LOGISTICS
          </p>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05] sm:leading-[1.02] mb-5 sm:mb-6"
            style={{ fontFamily: "forma-djr-display, sans-serif" }}
          >
            MISSION READINESS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              AT THE EDGE OF THE ABYSS.
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-zinc-400 font-sans max-w-2xl leading-relaxed mb-8 sm:mb-10">
            AETHEL field operations delivers continuous subsea autonomy across contested hadal waters.
            Containerized logistics, turnkey vessel-of-opportunity integration, and forward-deployed battery hot-swap maintain persistent maritime presence without specialized naval drydocks.
          </p>

          {/* Action CTAs in One Row */}
          <div className="flex flex-row items-center gap-2 sm:gap-4 max-w-full overflow-x-visible">
            <Button
              variant="primary"
              shape="pill"
              rightIcon={<ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />}
              className="text-[9.5px] min-[360px]:text-[11px] sm:text-xs px-2.5 min-[360px]:px-3.5 sm:px-6 py-2 min-[360px]:py-2.5 sm:py-3 min-h-[36px] sm:min-h-[44px] tracking-[0.08em] sm:tracking-[0.18em] whitespace-nowrap shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)]"
              onClick={() => onOpenInquiry?.("Serve")}
            >
              <span className="sm:hidden">Deploy Brief</span>
              <span className="hidden sm:inline">Request Deployment Brief</span>
            </Button>

            <Button
              variant="secondary"
              shape="pill"
              className="text-[9.5px] min-[360px]:text-[11px] sm:text-xs px-2.5 min-[360px]:px-3.5 sm:px-6 py-2 min-[360px]:py-2.5 sm:py-3 min-h-[36px] sm:min-h-[44px] tracking-[0.08em] sm:tracking-[0.18em] whitespace-nowrap"
              href="#service-pillars"
            >
              <span className="sm:hidden">Protocols</span>
              <span className="hidden sm:inline">Readiness Protocols</span>
            </Button>
          </div>
        </div>

        {/* Live Technical Telemetry HUD Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-white/[0.08]">
          <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-none">
            <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono uppercase tracking-wider mb-1">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>FLEET READINESS</span>
            </div>
            <div className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">99.4% AVAIL</div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">SLA-backed mobilization</div>
          </div>

          <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-none">
            <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono uppercase tracking-wider mb-1">
              <Anchor className="w-3.5 h-3.5 text-emerald-400" />
              <span>DEPLOY DISPATCH</span>
            </div>
            <div className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">&lt; 36 HOURS</div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">Global air-freight transport</div>
          </div>

          <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-none">
            <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>HYDROSTATIC RATING</span>
            </div>
            <div className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">6,000 METERS</div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">Hadal zone certified (600 bar)</div>
          </div>

          <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-none">
            <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono uppercase tracking-wider mb-1">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>STAGING MODULE</span>
            </div>
            <div className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">ISO-20 FOOTPRINT</div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">Zero infrastructure deck install</div>
          </div>
        </div>
      </div>
    </section>
  );
}
