"use client";

import React, { useState, useEffect, useRef } from "react";

// Silky Smooth Hermite Interpolation (Zero stepped jumps)
function smoothHermiteLocal(min: number, max: number, val: number) {
  const x = Math.max(0, Math.min(1, (val - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    let animFrame: number;

    const onScroll = () => {
      animFrame = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const isMobileOrTablet = window.innerWidth < 1024;

        if (isMobileOrTablet) {
          // On mobile & tablets: smooth viewport-based scroll illumination with zero dead voids
          const windowHeight = window.innerHeight;
          const startY = windowHeight * 0.75;
          const endY = windowHeight * 0.20;
          const progress = Math.min(Math.max((startY - rect.top) / (startY - endY), 0), 1);
          setScrollProgress(progress);
        } else {
          // On laptop/desktop: original sticky scroll distance
          const totalDistance = sectionRef.current.offsetHeight - window.innerHeight;
          if (totalDistance <= 0) return;
          const distanceScrolled = -rect.top;
          const progress = Math.min(Math.max(distanceScrolled / totalDistance, 0), 1);
          setScrollProgress(progress);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const s1 = smoothHermiteLocal(0.02, 0.32, scrollProgress);
  const s2 = smoothHermiteLocal(0.26, 0.62, scrollProgress);
  const s3 = smoothHermiteLocal(0.55, 0.90, scrollProgress);

  return (
    <div
      id="doctrine"
      ref={sectionRef}
      className="relative bg-[#030712] text-white overflow-clip select-none py-10 sm:py-14 lg:py-0 lg:h-[125vh] lg:min-h-[125vh] border-b border-white/[0.08]"
    >
      {/* Viewport Stage: Natural responsive flow on mobile/tablet, Sticky on Laptop/Desktop */}
      <div className="relative lg:sticky lg:top-0 w-full min-h-0 lg:min-h-[100dvh] lg:h-[100dvh] overflow-hidden flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 lg:px-24 py-4 sm:py-8 lg:py-10">
        {/* Soft Deep-Sea Radial Lighting */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] lg:w-[950px] h-[300px] sm:h-[450px] lg:h-[550px] bg-cyan-950/15 blur-[120px] lg:blur-[220px]" />
          <div className="absolute top-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-b from-[#030712] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-[#030712] to-transparent" />
        </div>

        {/* PURE STATEMENT: ONLY THE TEXT IN FORMA-DJR-DISPLAY WITH SILKY SMOOTH ILLUMINATION */}
        <div className="relative z-10 max-w-6xl w-full mx-auto text-left">
          <h2
            style={{ fontFamily: "forma-djr-display, sans-serif" }}
            className="font-forma text-[21px] min-[380px]:text-[25px] sm:text-[36px] md:text-[46px] lg:text-[60px] xl:text-[68px] font-medium leading-[1.3] sm:leading-[1.22] lg:leading-[1.16] tracking-[-0.02em]"
          >
            {/* Phrase 1: Pure White Illumination */}
            <span
              style={{
                opacity: 0.22 + 0.78 * s1,
                textShadow: `0 0 ${s1 * 25}px rgba(255,255,255,${s1 * 0.25})`,
                transition: "opacity 0.2s ease-out, text-shadow 0.2s ease-out",
              }}
              className="text-white will-change-[opacity,filter]"
            >
              The ocean keeps her secrets. Aethel builds the systems to uncover and defend them.{" "}
            </span>

            {/* Phrase 2: Calm Aquatic Radiant Gradient */}
            <span
              style={{
                opacity: 0.22 + 0.78 * s2,
                filter: `drop-shadow(0 0 ${s2 * 35}px rgba(147,197,253,${s2 * 0.45}))`,
                transition: "opacity 0.2s ease-out, filter 0.2s ease-out",
              }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#bae6fd] via-[#93c5fd] to-[#7dd3fc] inline will-change-[opacity,filter]"
            >
              Autonomous underwater vehicles move beneath the surface as a unified system,{" "}
            </span>

            {/* Phrase 3: Crisp Silver Slate Illumination */}
            <span
              style={{
                opacity: 0.22 + 0.78 * s3,
                textShadow: `0 0 ${s3 * 20}px rgba(203,213,225,${s3 * 0.2})`,
                transition: "opacity 0.2s ease-out, text-shadow 0.2s ease-out",
              }}
              className="text-slate-200 will-change-[opacity,filter]"
            >
              executing missions where GPS is denied and communications are disrupted.
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}
