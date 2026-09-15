"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RotatingPropellerRotor, { AethelMonogram } from "@/components/RotatingPropellerRotor";
import { NavColumn } from "@/types";

export const FOOTER_NAV: NavColumn[] = [
  {
    title: "DOMAINS",
    links: [
      { label: "Defense Patrol", href: "/defense" },
      { label: "Fleet Service & Readiness", href: "/serve" },
      { label: "Water Quality Analysis", href: "/water-quality" },
      { label: "Sub-Surface Sensing", href: "/sensing" },
      { label: "Acoustic Surveillance", href: "#surveillance" },
    ],
  },
  {
    title: "VESSELS",
    links: [
      { label: "S12 Abyssal Cruiser", href: "#vessel" },
      { label: "Subsea Architecture", href: "#vessel" },
    ],
  },
  {
    title: "ARRAYS",
    links: [
      { label: "Eyra 5.1 Conformal", href: "#surveillance" },
      { label: "Eyra 8.0 Autonomous", href: "#surveillance" },
    ],
  },
  {
    title: "SYSTEMS",
    links: [
      { label: "Telemetry & Sensorics", href: "/sensing" },
      { label: "Acoustic Intelligence", href: "#surveillance" },
      { label: "Environmental Oceanics", href: "/water-quality" },
      { label: "Mission Autonomy Core", href: "/defense" },
    ],
  },
  {
    title: "OPERATIONS",
    links: [
      { label: "Tactical Defense Brief", href: "#defense" },
      { label: "Deployment Command", href: "/serve" },
      { label: "Hydrographic Survey", href: "/water-quality" },
      { label: "Passive Sonar Tracking", href: "#surveillance" },
    ],
  },
];

interface SiteFooterProps {
  onOpenInquiry?: (category?: string) => void;
}

export default function SiteFooter({ onOpenInquiry }: SiteFooterProps = {}) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nozzleMouthRef = useRef<HTMLDivElement | null>(null);
  const [isSubmarineHovered, setIsSubmarineHovered] = useState(false);
  const hoveredRef = useRef(false);

  useEffect(() => {
    hoveredRef.current = isSubmarineHovered;
  }, [isSubmarineHovered]);

  // True 3D Real-Time Cavitation Particle Wake Simulation (Minimal, Sparse & Elegant)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    interface CavitationParticle3D {
      dist: number;
      angle: number;
      spinSpeed: number;
      coreRadius: number;
      baseRadius: number;
      x: number;
      y: number;
      z: number;
      vx: number;
      buoyancy: number;
      wobblePhase: number;
      wobbleSpeed: number;
      wobbleAmp: number;
      life: number;
      maxLife: number;
      baseAlpha: number;
      type: "vortex" | "pearl" | "ambient";
    }

    const bubbles: CavitationParticle3D[] = [];
    const maxBubbles = 50;

    const getNozzleCoords = () => {
      if (nozzleMouthRef.current && canvas) {
        const mRect = nozzleMouthRef.current.getBoundingClientRect();
        const cRect = canvas.getBoundingClientRect();
        return {
          x: mRect.left - cRect.left,
          y: mRect.top - cRect.top,
        };
      }
      return { x: width * 0.62, y: height * 0.51 };
    };

    const spawnBubble = (type?: "vortex" | "pearl" | "ambient", initDist?: number): CavitationParticle3D => {
      const isHover = hoveredRef.current;
      const bType = type || (Math.random() < 0.7 ? "vortex" : "pearl");

      if (bType === "ambient") {
        return {
          dist: Math.random() * 1100,
          angle: Math.random() * Math.PI * 2,
          spinSpeed: 0.01,
          coreRadius: Math.random() * 90,
          baseRadius: 1.2 + Math.random() * 2.2,
          x: Math.random() * width,
          y: Math.random() * height,
          z: (Math.random() - 0.5) * 140,
          vx: 0.3 + Math.random() * 0.6,
          buoyancy: 0.2 + Math.random() * 0.3,
          wobblePhase: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.02 + Math.random() * 0.03,
          wobbleAmp: 0.5,
          life: Math.random() * 240,
          maxLife: 260 + Math.random() * 140,
          baseAlpha: 0.15 + Math.random() * 0.25,
          type: "ambient",
        };
      }

      const initialD = initDist !== undefined ? initDist : Math.random() * 4;

      if (bType === "vortex") {
        return {
          dist: initialD,
          angle: Math.random() * Math.PI * 2,
          spinSpeed: 0.04 + Math.random() * 0.06,
          coreRadius: 16 + Math.random() * 18,
          baseRadius: 2.0 + Math.random() * 2.6,
          x: 0,
          y: 0,
          z: (Math.random() - 0.5) * 70,
          vx: (isHover ? 4.2 : 2.8) + Math.random() * (isHover ? 3.0 : 2.2),
          buoyancy: 0.14 + Math.random() * 0.2,
          wobblePhase: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.05 + Math.random() * 0.07,
          wobbleAmp: 1.2,
          life: 0,
          maxLife: 150 + Math.random() * 120,
          baseAlpha: 0.5 + Math.random() * 0.3,
          type: "vortex",
        };
      }

      return {
        dist: initialD,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: 0.02 + Math.random() * 0.03,
        coreRadius: 8 + Math.random() * 26,
        baseRadius: 4.0 + Math.random() * 5.5,
        x: 0,
        y: 0,
        z: (Math.random() - 0.5) * 90,
        vx: (isHover ? 2.6 : 1.6) + Math.random() * 1.8,
        buoyancy: 0.25 + Math.random() * 0.4,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.03 + Math.random() * 0.04,
        wobbleAmp: 0.7,
        life: 0,
        maxLife: 180 + Math.random() * 120,
        baseAlpha: 0.42 + Math.random() * 0.38,
        type: "pearl",
      };
    };

    for (let i = 0; i < 6; i++) {
      bubbles.push(spawnBubble("ambient"));
    }
    for (let i = 0; i < 28; i++) {
      const dist = Math.random() * 900;
      const b = spawnBubble(undefined, dist);
      b.life = (dist / 900) * b.maxLife;
      bubbles.push(b);
    }

    let frameCount = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const nozzle = getNozzleCoords();
      const emitterX = nozzle.x;
      const emitterY = nozzle.y;

      frameCount++;
      const spawnInterval = hoveredRef.current ? 2 : 4;
      if (frameCount % spawnInterval === 0 && bubbles.length < maxBubbles) {
        bubbles.push(spawnBubble());
      }

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.life++;

        if (b.type === "ambient") {
          b.x -= b.vx;
          b.y -= b.buoyancy + Math.sin(b.wobblePhase + b.life * b.wobbleSpeed) * 0.3;
          if (b.x < -30 || b.y < -30) {
            bubbles.splice(i, 1);
            continue;
          }
        } else {
          b.dist += b.vx;
          b.angle += b.spinSpeed;

          const coneExpansion = 1 + (b.dist / 420) * 0.9;
          const r = b.coreRadius * coneExpansion;
          const buoyantOffset = -Math.pow(b.dist / 170, 1.3) * b.buoyancy;
          const wobble = Math.sin(b.wobblePhase + b.life * b.wobbleSpeed) * b.wobbleAmp;

          const localX = -b.dist;
          const localY = Math.sin(b.angle) * r * 0.85 + buoyantOffset + wobble;
          const localZ = Math.cos(b.angle) * r;

          const focalLength = 520;
          const scale = focalLength / (focalLength + localZ);

          b.x = emitterX + localX * scale;
          b.y = emitterY + localY * scale;
          b.z = localZ;

          const progress = b.life / b.maxLife;
          if (progress >= 1 || b.x < -40 || b.y < -40 || b.y > height + 40) {
            bubbles.splice(i, 1);
            continue;
          }
        }
      }

      bubbles.sort((a, b) => a.z - b.z);

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        const progress = b.life / b.maxLife;

        const alpha =
          progress < 0.05
            ? (progress / 0.05) * b.baseAlpha
            : (1 - (progress - 0.05) / 0.95) * b.baseAlpha;

        const focalLength = 520;
        const scale = focalLength / (focalLength + b.z);
        const renderR = Math.max(0.6, b.baseRadius * scale);

        if (b.type === "pearl" || renderR > 3.8) {
          const grad = ctx.createRadialGradient(
            b.x - renderR * 0.35,
            b.y - renderR * 0.35,
            renderR * 0.06,
            b.x,
            b.y,
            renderR
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, alpha * 0.95)})`);
          grad.addColorStop(0.35, `rgba(224, 242, 254, ${alpha * 0.7})`);
          grad.addColorStop(0.72, `rgba(56, 189, 248, ${alpha * 0.3})`);
          grad.addColorStop(1, `rgba(2, 132, 199, 0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(b.x, b.y, renderR, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(224, 242, 254, ${alpha * 0.55})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(b.x - renderR * 0.32, b.y - renderR * 0.32, renderR * 0.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const grad = ctx.createRadialGradient(
            b.x - renderR * 0.25,
            b.y - renderR * 0.25,
            0,
            b.x,
            b.y,
            renderR
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, alpha * 0.92)})`);
          grad.addColorStop(0.4, `rgba(224, 242, 254, ${alpha * 0.65})`);
          grad.addColorStop(0.8, `rgba(56, 189, 248, ${alpha * 0.25})`);
          grad.addColorStop(1, `rgba(14, 165, 233, 0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(b.x, b.y, renderR, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <footer
      id="serve"
      className="relative bg-black text-zinc-400 text-xs font-mono pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-10 lg:pb-12 border-t border-white/[0.08] overflow-hidden scroll-mt-20 w-full max-w-[100vw]"
    >
      {/* 1. TOP SECTION: 5-COLUMN NAV LINKS + SOCIAL ICONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-10 pb-6 sm:pb-10 border-b border-white/[0.08]">
          {/* 5 Categorical Link Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 xl:gap-12 flex-grow">
            {FOOTER_NAV.map((col) => (
              <div key={col.title}>
                <h4 className="text-[10px] sm:text-[11px] font-mono tracking-[0.18em] sm:tracking-[0.2em] text-zinc-300 uppercase mb-2.5 sm:mb-4 font-semibold">
                  {col.title}
                </h4>
                <ul className="space-y-2 sm:space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          if (link.label === "Tactical Defense Brief" && onOpenInquiry) {
                            e.preventDefault();
                            onOpenInquiry("Defense");
                          } else if (link.label === "Deployment Command" && onOpenInquiry) {
                            e.preventDefault();
                            onOpenInquiry("Serve");
                          } else if (link.href.startsWith("/")) {
                            if (window.location.pathname === link.href) {
                              e.preventDefault();
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                          } else if (link.href.startsWith("#")) {
                            const target = document.querySelector(link.href);
                            if (target) {
                              e.preventDefault();
                              target.scrollIntoView({ behavior: "smooth" });
                            } else {
                              e.preventDefault();
                              router.push("/" + link.href);
                            }
                          }
                        }}
                        className="text-[11px] sm:text-xs text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Icons (X & LinkedIn) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 pt-2 lg:pt-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MID-SECTION: FULL-WIDTH CORNER PINNED SUBMARINE PROPULSION */}
      <div className="relative w-full my-6 sm:my-10 py-8 sm:py-14 lg:py-16 min-h-[280px] sm:min-h-[380px] lg:min-h-[460px] flex flex-col lg:flex-row items-center justify-between overflow-hidden">
        {/* Full-Span Real-Time Cavitation Particle Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
        />

        {/* Giant Wireframe Architectural Monogram Watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-20 hidden lg:block overflow-hidden">
          <svg width="480" height="380" viewBox="0 0 400 320" fill="none" stroke="currentColor" className="text-white/[0.08]">
            <rect x="70" y="40" width="80" height="150" rx="20" strokeWidth="2.5" transform="rotate(-38 110 115)" />
            <rect x="70" y="160" width="80" height="150" rx="20" strokeWidth="2.5" transform="rotate(-38 110 235)" />
            <rect x="180" y="40" width="80" height="150" rx="20" strokeWidth="2.5" transform="rotate(-38 220 115)" />
            <rect x="180" y="160" width="80" height="150" rx="20" strokeWidth="2.5" transform="rotate(-38 220 235)" />
          </svg>
        </div>

        {/* Left: Brand Monogram Icon + Huge Wordmark (Aligned with max-7xl container) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full relative z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 sm:gap-6 shrink-0 pointer-events-auto mb-6 lg:mb-0">
            <AethelMonogram className="w-9 h-9 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white" />
            <span
              style={{ fontFamily: "forma-djr-display, sans-serif" }}
              className="font-forma text-3xl min-[400px]:text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white select-none"
            >
              AETHEL
            </span>
          </div>
        </div>

        {/* Center & Right: Photorealistic 3D UUV Stern PINNED FLUSH TO RIGHT CORNER WITH ZERO GAP */}
        <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-auto flex items-center justify-end z-20 pointer-events-auto mt-4 lg:mt-0">
          <div
            className="relative w-full max-w-[340px] min-[400px]:max-w-[440px] sm:max-w-[600px] lg:max-w-[760px] xl:max-w-[880px] 2xl:max-w-[960px] translate-x-2 min-[400px]:translate-x-4 sm:translate-x-8 lg:translate-x-12 xl:translate-x-16 shrink-0 select-none cursor-pointer group"
            onMouseEnter={() => setIsSubmarineHovered(true)}
            onMouseLeave={() => setIsSubmarineHovered(false)}
            onClick={() => {
              onOpenInquiry?.("Flagship Architecture & Subsystems");
            }}
          >
            <div className="relative transform scale-x-[-1] origin-center">
              <Image
                src="/images/uuv-stern.jpg"
                alt="Aethel Autonomous Subsea Platform Ducted Propulsor"
                width={1376}
                height={768}
                className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
                priority
              />

              {/* Live Rotating Carbon-Fiber Propeller Fan inside Ducted Shroud */}
              <div
                className="absolute z-25 pointer-events-none"
                style={{
                  left: "70.8%",
                  top: "51.2%",
                  width: "19.8%",
                  height: "39.4%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <RotatingPropellerRotor isHovered={isSubmarineHovered} />
              </div>

              {/* Sub-Pixel Anchor Point precisely at the Flipped Mouth Exit of the Nozzle for Cavitation Wake */}
              <div
                ref={nozzleMouthRef}
                className="absolute pointer-events-none"
                style={{
                  left: "81.2%",
                  top: "51.2%",
                  width: "4px",
                  height: "4px",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM BAR: DEFENSE DISCLAIMER & COPYRIGHT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 mt-8 sm:mt-14">
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[10px] sm:text-[11px] font-mono text-zinc-400">
          <p className="max-w-xl leading-relaxed">
            The appearance of U.S. Department of Defense (DoD) visual information does not imply or constitute DoD endorsement.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-zinc-400">
            <span>Copyright © 2026 Aethel Systems</span>
            <span className="text-zinc-600">|</span>
            <a href="#" className="hover:text-zinc-300 transition-colors cursor-pointer">
              EULA
            </a>
            <span className="text-zinc-600">|</span>
            <a href="#" className="hover:text-zinc-300 transition-colors cursor-pointer">
              Privacy Policy
            </a>
            <span className="text-zinc-600">|</span>
            <Link
              href="/admin"
              className="text-cyan-400/80 hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1 font-semibold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Admiralty Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
