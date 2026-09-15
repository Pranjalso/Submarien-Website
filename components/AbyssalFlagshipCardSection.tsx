"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface AbyssalFlagshipCardSectionProps {
  onRequestBrief?: () => void;
}

export default function AbyssalFlagshipCardSection({ onRequestBrief }: AbyssalFlagshipCardSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (animFrameRef.current !== null) return;
      animFrameRef.current = requestAnimationFrame(() => {
        animFrameRef.current = null;
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalDistance = windowHeight + rect.height;
        const currentDistance = windowHeight - rect.top;
        const rawProgress = currentDistance / totalDistance;
        const clamped = Math.min(Math.max(rawProgress, 0), 1);
        setScrollProgress(clamped);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Smooth scroll-driven card animation with graceful entrance
  const animT = Math.min(1, Math.max(0, scrollProgress / 0.45));
  const cardOpacity = 0.85 + 0.15 * animT;
  const cardTranslateY = ((1 - animT) * 16).toFixed(1);
  const contentTranslateY = ((1 - animT) * 8).toFixed(1);

  return (
    <section
      id="flagship"
      ref={sectionRef}
      className="relative py-10 sm:py-14 lg:py-16 px-4 sm:px-8 lg:px-12 bg-[#020610] overflow-hidden flex flex-col items-center justify-center scroll-mt-20 border-b border-white/[0.08] w-full max-w-[100vw]"
    >

      {/* Ambient Deep Ocean Volumetric Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] lg:w-[1100px] h-[300px] sm:h-[450px] lg:h-[600px] rounded-full bg-cyan-950/25 blur-[100px] sm:blur-[140px] lg:blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.025]" />
        <div className="absolute -top-24 left-1/4 w-[320px] sm:w-[480px] lg:w-[600px] h-[500px] sm:h-[650px] lg:h-[800px] bg-gradient-to-b from-cyan-400/[0.05] via-teal-500/[0.02] to-transparent blur-3xl transform -rotate-12 pointer-events-none" />
      </div>

      {/* 1. THE SUBMARINE IN BACKGROUND (Floating buoyancy animation) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none overflow-hidden">
        <div className="relative w-full max-w-[1400px] flex items-center justify-center overflow-hidden">
          {/* Pure Buoyancy Floating Motion */}
          <div className="relative animate-pure-float">
            <div className="relative transform -rotate-[5deg] sm:-rotate-[7deg] -translate-y-6 sm:translate-y-0 origin-center filter contrast-125">
              {/* Luminous Halo Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/15 via-cyan-400/20 to-sky-500/15 blur-[60px] sm:blur-[90px] rounded-full pointer-events-none" />

              {/* Stern Cavitation Jet Wake */}
              <div className="absolute -left-8 sm:-left-20 lg:-left-28 top-[48%] -translate-y-1/2 z-0 pointer-events-none">
                <div className="w-28 sm:w-44 lg:w-56 h-8 sm:h-10 lg:h-12 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-md animate-jet-cavitation" />
              </div>

              {/* Submarine Image */}
              <Image
                src="/Submarienn.png"
                alt="Abyssal Flagship Submarine"
                width={1300}
                height={550}
                className="relative z-10 w-[480px] min-[400px]:w-[560px] sm:w-[700px] md:w-[950px] lg:w-[1300px] h-auto object-contain drop-shadow-[0_30px_80px_rgba(2,24,39,0.95)] opacity-85"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE CARD FLOATING OVER THE SUBMARINE (Scroll-linked parallax & entrance) */}
      <div
        className="relative z-30 max-w-2xl w-full mx-auto my-auto"
        style={{
          opacity: cardOpacity,
          transform: `translate3d(0, ${cardTranslateY}px, 0) scale(${(0.96 + 0.04 * cardOpacity).toFixed(3)})`,
          transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          pointerEvents: "auto",
        }}
      >
        {/* Obsidian Glass Minimal Premium Card */}
        <div className="relative rounded-xl bg-[#030712]/85 backdrop-blur-2xl border border-cyan-500/30 p-4 sm:p-7 lg:p-10 shadow-[0_35px_100px_rgba(0,0,0,0.92),0_0_40px_rgba(6,182,212,0.12)]">
          {/* Top Hairline Glowing Laser Accent */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

          {/* 4 Precision Tactical Reticle Brackets */}
          <div className="absolute -top-[1px] -left-[1px] w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute -top-[1px] -right-[1px] w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
          <div className="absolute -bottom-[1px] -left-[1px] w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute -bottom-[1px] -right-[1px] w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

          {/* CONTENT */}
          <div
            className="space-y-3.5 sm:space-y-5"
            style={{
              transform: `translate3d(0, ${contentTranslateY}px, 0)`,
              transition: "transform 0.25s ease-out",
            }}
          >
            {/* LINE 1: CATEGORY / DESIGNATION OVERLINE */}
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-none bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
              <span className="text-[9.5px] sm:text-[11px] font-mono tracking-[0.22em] sm:tracking-[0.3em] uppercase text-cyan-300 font-semibold">
                AETHEL ARCHON // HADAL CLASS
              </span>
            </div>

            {/* LINE 2: HERO TITLE */}
            <h3
              style={{ fontFamily: "forma-djr-display, sans-serif" }}
              className="font-forma text-xl min-[400px]:text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white leading-tight"
            >
              Silence is the ultimate weapon of the deep.
            </h3>

            {/* LINE 3: TECHNICAL SUMMARY PROSE */}
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed max-w-xl">
              Engineered for 6,000-meter abyssal trenches with zero acoustic signature, autonomous multi-domain ISR, and hadal endurance.
            </p>

            {/* LINE 4: METRICS & ACTION DISCREET BAR */}
            <div className="pt-3.5 sm:pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-mono text-zinc-400 tracking-wider">
                <span className="text-cyan-300">6,000M RATED</span>
                <span className="text-zinc-600">/</span>
                <span>&lt; 8.2 dB EMISSION</span>
                <span className="text-zinc-600">/</span>
                <span className="text-emerald-400">72+ HRS ENDURANCE</span>
              </div>

              <Button
                variant="tactical"
                size="md"
                shape="rounded"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                onClick={() => {
                  if (onRequestBrief) onRequestBrief();
                }}
                className="w-full sm:w-auto"
              >
                Request Brief
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
