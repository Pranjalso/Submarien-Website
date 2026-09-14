"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface ServeAnimatedSubmarineProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function ServeAnimatedSubmarine({ containerRef }: ServeAnimatedSubmarineProps) {
  const subContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animFrame: number;
    let currentProgress = 0;
    let maxProgress = 0; // Monotonic forward progress: only moves on scroll down, never reverses on scroll up

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const winHeight = window.innerHeight;

      // Start calculating as ServePillars reaches the viewport
      const startOffset = winHeight * 0.75;
      const endOffset = winHeight * 0.15;
      const totalSpan = rect.height - (startOffset - endOffset);

      if (totalSpan <= 0) return;

      const scrolled = startOffset - rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / totalSpan));

      // Only advance forward; when scrolling up, it remains fixed in place
      if (rawProgress > maxProgress) {
        maxProgress = rawProgress;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    // Silky 60/120fps linear straight-line motion loop
    const updateMotion = () => {
      // Smooth dampening towards the maximum forward progress reached
      currentProgress += (maxProgress - currentProgress) * 0.08;

      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

      // Clean straight-line path coordinates:
      // Start: over step 1 from top right corner
      // End: next section's right side
      let startX = 24; // vw
      let endX = 66;   // vw
      let startY = 160; // px
      let endY = 1180; // px
      let angle = 8;   // degrees

      if (isMobile) {
        startX = 10;
        endX = 40;
        startY = 170;
        endY = 1400;
        angle = 6;
      } else if (isTablet) {
        startX = 18;
        endX = 52;
        startY = 160;
        endY = 1250;
        angle = 8;
      }

      // Straight line interpolation
      const posX = startX + (endX - startX) * currentProgress;
      const posY = startY + (endY - startY) * currentProgress;

      if (subContainerRef.current) {
        subContainerRef.current.style.transform = `translate3d(${posX}vw, ${posY}px, 0) rotate(${angle}deg)`;
      }

      animFrame = requestAnimationFrame(updateMotion);
    };

    animFrame = requestAnimationFrame(updateMotion);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animFrame);
    };
  }, [containerRef]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-visible select-none">
      <div
        ref={subContainerRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{
          width: "clamp(260px, 35vw, 540px)",
        }}
      >
        <div className="relative w-full aspect-[1568/1003]">
          <Image
            src="/Submarienn.png"
            alt="Aethel Submersible"
            fill
            sizes="(max-width: 640px) 260px, (max-width: 1024px) 400px, 540px"
            className="object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
            priority
          />
        </div>
      </div>
    </div>
  );
}
