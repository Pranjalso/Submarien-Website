"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

export interface DefenseNewsItem {
  id: string;
  date: string;
  source?: string;
  title: string;
  link?: string;
  category?: string;
}

const DEFENSE_NEWS: DefenseNewsItem[] = [
  {
    id: "news-1",
    date: "AUGUST 2026",
    title: "A Smart Torpedo Startup Looks to Make the Drones of the Sea",
  },
  {
    id: "news-2",
    date: "AUGUST 2026",
    title: "Vatn Systems and Taiwan's NCSIST Sign Agreement to Explore Undersea Autonomy for Maritime Defense",
  },
  {
    id: "news-3",
    date: "JULY 2026",
    title: "Autonomous Mine Countermeasure System Launched by Vatn Systems",
  },
];

interface DefenseRecentlySurfacedProps {
  onOpenInquiry?: (category?: string) => void;
}

export default function DefenseRecentlySurfaced({
  onOpenInquiry,
}: DefenseRecentlySurfacedProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopSubRef = useRef<HTMLDivElement>(null);
  const mobileSubRef = useRef<HTMLDivElement>(null);

  // Dynamic 120fps fluid scroll-floating effect
  useEffect(() => {
    let animId: number;
    let currentY = 0;
    let targetY = 0;
    let currentX = 0;
    let targetX = 0;
    let currentRot = 0;
    let targetRot = 0;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const winH = window.innerHeight;

      // Track progress as section moves across viewport
      const totalSpan = rect.height + winH;
      const traveled = winH - rect.top;
      const progress = Math.max(0, Math.min(1.3, traveled / totalSpan));

      // As user scrolls down, submarine floats deeper and glides diagonally forward into ocean
      targetY = (progress - 0.25) * 145;
      targetX = (progress - 0.25) * 42;
      targetRot = (progress - 0.25) * -3.0;
    };

    const loop = () => {
      // Fluid viscosity lerp (0.075 for authentic water drag and momentum)
      currentY += (targetY - currentY) * 0.075;
      currentX += (targetX - currentX) * 0.075;
      currentRot += (targetRot - currentRot) * 0.075;

      if (desktopSubRef.current) {
        desktopSubRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${currentRot}deg)`;
      }
      if (mobileSubRef.current) {
        mobileSubRef.current.style.transform = `translate3d(${currentX * 0.5}px, ${currentY * 0.65}px, 0) rotate(${currentRot * 0.6}deg)`;
      }

      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="recently-surfaced"
      className="relative w-full bg-[#111215] text-white py-10 sm:py-14 lg:py-16 overflow-visible border-b border-white/[0.08] z-20"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: TITLE, "ALL NEWS" PILL, & DIAGONAL SUBMARINE */}
          <div className="lg:col-span-6 flex flex-col justify-between relative min-h-0 lg:min-h-[500px]">
            <div>
              {/* Heading */}
              <h2
                style={{ fontFamily: "forma-djr-display, sans-serif" }}
                className="text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.05] mb-5 sm:mb-6"
              >
                Recently surfaced
              </h2>

              {/* ALL NEWS Pill Button */}
              <div>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenInquiry) onOpenInquiry("Defense Dispatches");
                  }}
                  className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/20 bg-transparent hover:bg-white/[0.06] hover:border-white/40 text-neutral-300 hover:text-white font-mono text-[10px] sm:text-[11px] tracking-widest uppercase transition-all duration-300 cursor-pointer"
                >
                  ALL NEWS
                </button>
              </div>
            </div>

            {/* DIAGONAL 3D SUBMARINE (Desktop: scroll-floating + hydrodynamic buoyancy float) */}
            <div className="hidden lg:block relative w-[116%] -left-[4%] h-[320px] xl:h-[380px] mt-6 lg:mt-auto pointer-events-none select-none z-30">
              {/* Scroll-driven floating wrapper */}
              <div
                ref={desktopSubRef}
                className="relative w-full h-full will-change-transform"
              >
                {/* Continuous liquid buoyancy drift animation */}
                <div className="relative w-full h-full animate-subsea-drift transform rotate-[-2deg] translate-y-20 xl:translate-y-28">
                  <Image
                    src="/image.png"
                    alt="Aethel Autonomous Submersible Surfaced"
                    fill
                    className="object-contain filter drop-shadow-[0_28px_40px_rgba(0,0,0,0.95)] contrast-110 brightness-95"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DEFENSE NEWS & INTELLIGENCE DISPATCHES */}
          <div className="lg:col-span-6 flex flex-col justify-start pt-2 sm:pt-4">
            {DEFENSE_NEWS.map((item, idx) => (
              <article
                key={item.id}
                onClick={() => {
                  if (onOpenInquiry) onOpenInquiry(item.title);
                }}
                className={`py-8 sm:py-10 border-b border-white/[0.12] ${
                  idx === 0 ? "pt-0" : ""
                } group cursor-pointer transition-all duration-300`}
              >
                  {/* Date */}
                  <div className="font-mono text-[10px] sm:text-xs text-neutral-400 tracking-wider uppercase mb-3 sm:mb-4">
                    {item.date}
                  </div>

                  {/* Headline */}
                  <h3
                    style={{ fontFamily: "forma-djr-display, sans-serif" }}
                    className="text-2xl sm:text-3xl lg:text-[32px] font-normal text-white group-hover:text-cyan-200 transition-colors duration-300 leading-[1.25] tracking-tight"
                  >
                    {item.title}
                  </h3>
                </article>
              ))}
          </div>

        </div>

        {/* MOBILE / TABLET SUBMARINE (< lg: situated at bottom of section so nose enters ocean background) */}
        <div className="block lg:hidden relative w-[110%] -left-[5%] sm:left-0 sm:w-full h-[220px] sm:h-[290px] mt-4 sm:mt-6 pointer-events-none select-none z-30">
          <div
            ref={mobileSubRef}
            className="relative w-full h-full will-change-transform"
          >
            <div className="relative w-full h-full animate-subsea-drift transform rotate-[-2deg] translate-y-10 sm:translate-y-16">
              <Image
                src="/image.png"
                alt="Aethel Autonomous Submersible Surfaced"
                fill
                className="object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] contrast-110 brightness-95"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
