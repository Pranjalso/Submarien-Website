"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface WaterQualitySubmarineScanProps {
  onOpenInquiry?: (category?: string) => void;
}

interface MilestoneItem {
  year: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  paragraphs: string[];
}

const MILESTONES: MilestoneItem[] = [
  {
    year: "2023",
    title: "Founded",
    imageSrc: "/images/auv-field-test.jpg",
    imageAlt: "Field deployment and shoreline testing of autonomous marine vehicles",
    paragraphs: [
      "Aethel founded to build modular, high-endurance autonomous maritime systems for defense, research, and environmental operators.",
      "Initial focus on edge autonomy, subsea inertial navigation, and manufacturable underwater vehicles designed for real operational constraints.",
      "Founding team of deep-submergence roboticists, naval architects, and hydrographic sensor engineers.",
    ],
  },
  {
    year: "2024",
    title: "First Systems",
    imageSrc: "/images/hydrophone-array-1.jpg",
    imageAlt: "Deep ocean hydrographic sensor pod and acoustic telemetry calibration",
    paragraphs: [
      "Core engineering expands to autonomous hadal oceanographic operations and multi-sensor payload integration.",
      "Development of Aethel's proprietary subsea navigation engine capable of long-baseline acoustic dead-reckoning in GPS-denied basins.",
      "First uncrewed littoral water quality transects validating optical dissolved oxygen optodes, turbidity backscatter, and CTD telemetry.",
    ],
  },
  {
    year: "2025",
    title: "Hadal Proving",
    imageSrc: "/images/uuv-stern.jpg",
    imageAlt: "Sleek titanium hull propulsion and acoustic vector thruster testing",
    paragraphs: [
      "Hydrostatic validation at 6,000-meter depths, certifying titanium monolithic pressure hulls under 600 atmospheres.",
      "Autonomous robotic eDNA filtration cartridges and solid-state ISFET pH sensors deployed for real-time ocean acidification monitoring.",
      "Demonstrated 180-day continuous seabed surveillance and deep-acoustic broadcast to surface monitoring consoles.",
    ],
  },
  {
    year: "2026",
    title: "Fleet Scale",
    imageSrc: "/images/underwater-mission-bg.jpg",
    imageAlt: "Autonomous subsea fleet conducting bathymetric water column surveys",
    paragraphs: [
      "Standardized modular AUV architecture enters continuous production with rapid 15-minute wet-well payload swapping.",
      "Operational partnerships established with oceanic research institutes, offshore energy operators, and littoral defense commands worldwide.",
      "Decisive data integrity: uncrewed continuous water column intelligence across critical and contested waterways.",
    ],
  },
];

export default function WaterQualitySubmarineScan({ onOpenInquiry }: WaterQualitySubmarineScanProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="sensor-suite"
      ref={containerRef}
      className="relative w-full bg-[#000000] text-white py-14 sm:py-20 lg:py-24 border-b border-white/[0.08] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 min-[400px]:px-6 sm:px-8 md:px-12">
        {/* Main 2-Column Split View: Left scrolls, Right stays permanently sticky */}
        <div className="relative flex flex-row items-start gap-4 sm:gap-8 lg:gap-14">
          {/* Left Column: Scrollable Milestones / Chapters */}
          <div className="w-[72%] sm:w-[70%] md:w-[66%] lg:w-[64%] flex flex-col pr-1 sm:pr-4 lg:pr-8">
            {MILESTONES.map((item, index) => (
              <div
                key={item.year}
                className={`w-full border-t border-white/[0.12] pt-6 sm:pt-8 md:pt-10 ${
                  index !== MILESTONES.length - 1 ? "pb-14 sm:pb-20 md:pb-24" : "pb-6"
                }`}
              >
                {/* Year Label */}
                <div className="text-zinc-400 font-mono text-xs sm:text-sm md:text-base mb-1.5 sm:mb-2">
                  {item.year}
                </div>

                {/* Monumental Section Title */}
                <h3
                  style={{ fontFamily: "forma-djr-display, sans-serif" }}
                  className="text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight mb-5 sm:mb-8 md:mb-10"
                >
                  {item.title}
                </h3>

                {/* Content Sub-Grid: Left Image, Right Narrative (Matching Reference) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
                  {/* Left: Operational Thumbnail / Photo */}
                  <div className="md:col-span-5 w-full">
                    <div className="relative w-full aspect-[4/3] bg-zinc-900 border border-white/[0.1] overflow-hidden">
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover filter contrast-110 brightness-95"
                      />
                    </div>
                  </div>

                  {/* Right: Paragraphs of Narrative */}
                  <div className="md:col-span-7 flex flex-col justify-start space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base text-zinc-300/90 font-light leading-relaxed">
                    {item.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Bottom Call to Action within Left Column */}
            <div className="pt-8 border-t border-white/[0.12] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs font-mono text-zinc-400 tracking-wide max-w-md">
                Autonomous platforms configured for hadal oceanographic sensing and littoral patrol.
              </p>

              <Button
                variant="primary"
                size="md"
                shape="pill"
                rightIcon={<ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />}
                className="whitespace-nowrap shrink-0"
                onClick={() => onOpenInquiry?.("Water Quality // Platform Architecture")}
              >
                <span className="hidden min-[480px]:inline">Request Platform Brief</span>
                <span className="min-[480px]:hidden">Request Brief</span>
              </Button>
            </div>
          </div>

          {/* Right Column: Sticky Tall Vertical Submarine - ALWAYS VISIBLE, ZERO LABELS */}
          <div className="w-[28%] sm:w-[30%] md:w-[34%] lg:w-[36%] sticky top-16 sm:top-20 self-start h-[calc(100vh-4.5rem)] sm:h-[calc(100vh-5.5rem)] flex items-center justify-center pointer-events-none select-none pl-1 sm:pl-3 shrink-0">
            {/* Ambient Deep-Sea Subtle Radial Glow Behind Submarine */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08),transparent_70%)] blur-2xl pointer-events-none" />

            {/* Vertical Submarine Image from user's Submarienn asset */}
            <div className="relative h-full w-full flex items-center justify-center">
              <Image
                src="/images/submarien-vertical.png"
                alt="Aethel Autonomous Submersible Platform"
                width={438}
                height={1781}
                priority
                className="h-full max-h-[82vh] sm:max-h-[88vh] w-auto object-contain filter contrast-125 brightness-105 drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
