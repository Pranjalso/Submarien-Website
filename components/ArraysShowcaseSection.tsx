"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface ArraysShowcaseSectionProps {
  onExploreArrays?: () => void;
}

function smoothHermite(min: number, max: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

function lerpVal(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export default function ArraysShowcaseSection({ onExploreArrays }: ArraysShowcaseSectionProps) {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const checkScreen = () => setIsSmallScreen(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const sensorPayloads = [
    {
      id: "spectra-x",
      name: "Spectra-X Broadband Array",
      shortName: "Spectra-X",
      category: "Bow Aperture Array",
      tag: "SENSOR 01 // PASSIVE APERTURE",
      summary:
        "Multi-directional piezoelectric hydrophone aperture engineered to isolate faint mechanical harmonics and cavitation signatures in high-noise littoral choke points.",
      specs: "64-channel array • 5 Hz – 65 kHz • Titanium pressure vessel",
      image: "/images/hydrophone-array-1.jpg",
      alt: "Spectra-X Submerged Broadband Acoustic Array",
      specsGrid: [
        { label: "Frequency Range", val: "5 Hz – 65 kHz" },
        { label: "Dynamic Range", val: "142 dB Linear" },
        { label: "Target Detection", val: "45+ Nautical Miles" },
        { label: "Processing Unit", val: "FPGA Beamforming" },
      ],
    },
    {
      id: "phalanx-matrix",
      name: "Phalanx Conformal Matrix",
      shortName: "Phalanx",
      category: "Hull-Integrated Grid",
      tag: "SENSOR 02 // CONFORMAL HULL GRID",
      summary:
        "Flush-mounted phased sensor skin delivering continuous 360° hemispherical tracking and obstacle mapping with zero hydrodynamic drag at sustained underwater velocities.",
      specs: "128 solid-state receivers • 360° azimuth • High-speed fairing",
      image: "/images/hydrophone-array-2.jpg",
      alt: "Phalanx Conformal Matrix Submarine Array",
      specsGrid: [
        { label: "Aperture Coverage", val: "360° Azimuth / 180° Pitch" },
        { label: "Receiver Density", val: "128 Solid-State Nodes" },
        { label: "Hydrodynamic Drag", val: "0.00 Cd Flush Hull" },
        { label: "Latency", val: "< 8 ms Response" },
      ],
    },
    {
      id: "abyssal-tether",
      name: "Abyssal Tether Linear Array",
      shortName: "Abyssal",
      category: "Deep Shadow Tow Line",
      tag: "SENSOR 03 // TOWED DEEP LINE",
      summary:
        "Ultra-low frequency passive towed array deployed below thermal layer acoustic ducts to classify quiet nuclear submarines and autonomous undersea vehicles at extreme ranges.",
      specs: "500m neutrally buoyant line • 1 Hz – 5 kHz • Depth rated to 6,000m",
      image: "/images/hydrophone-array-3.jpg",
      alt: "Abyssal Tether Deep Tow Line Array",
      specsGrid: [
        { label: "Array Length", val: "500m Continuous Tow" },
        { label: "Acoustic Floor", val: "-192 dB re 1µPa" },
        { label: "Max Operational Depth", val: "6,000 Meters" },
        { label: "Data Transmission", val: "Fiber-Optic Uplink" },
      ],
    },
  ];

  useEffect(() => {
    let animFrame: number;

    const handleScroll = () => {
      animFrame = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const totalDistance = sectionRef.current.offsetHeight - window.innerHeight;
        if (totalDistance <= 0) return;

        const distanceScrolled = -rect.top;
        const progress = Math.min(Math.max(distanceScrolled / totalDistance, 0), 1);
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const scrollToCard = (index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const totalDistance = sectionRef.current.offsetHeight - window.innerHeight;
    const targets = [0.06, 0.50, 0.94];
    const targetY = sectionTop + targets[index] * totalDistance;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const activeIndex = scrollProgress < 0.35 ? 0 : scrollProgress < 0.72 ? 1 : 2;

  // Exact 3D Card Stacking Transformations Linked to Scroll (Gradual, silky-smooth Hermite easing)
  const exitYOffset = isSmallScreen ? -6 : -24;
  const enterYOffset = isSmallScreen ? 15 : 115;
  const c0_exit = smoothHermite(0.12, 0.44, scrollProgress);
  const c0_y = lerpVal(0, exitYOffset, c0_exit);
  const c0_z = lerpVal(0, -55, c0_exit);
  const c0_rotX = lerpVal(0, 3.5, c0_exit);
  const c0_scale = lerpVal(1.0, 0.93, c0_exit);
  const c0_brightness = lerpVal(1.0, 0.65, c0_exit);

  const c1_enter = smoothHermite(0.12, 0.44, scrollProgress);
  const c1_exit = smoothHermite(0.52, 0.84, scrollProgress);
  const c1_yTranslate = c1_enter < 1 ? lerpVal(enterYOffset, 0, c1_enter) : 0;
  const c1_zEnter = c1_enter < 1 ? lerpVal(-70, 0, c1_enter) : 0;
  const c1_rotXEnter = c1_enter < 1 ? lerpVal(10, 0, c1_enter) : 0;
  const c1_opacity = smoothHermite(0.10, 0.28, scrollProgress);
  const c1_yOffset = c1_enter >= 1 ? lerpVal(0, exitYOffset, c1_exit) : 0;
  const c1_zExit = c1_enter >= 1 ? lerpVal(0, -55, c1_exit) : 0;
  const c1_rotXExit = c1_enter >= 1 ? lerpVal(0, 3.5, c1_exit) : 0;
  const c1_scale = lerpVal(1.0, 0.93, c1_exit);
  const c1_brightness = lerpVal(1.0, 0.65, c1_exit);

  const c2_enter = smoothHermite(0.52, 0.86, scrollProgress);
  const c2_yTranslate = c2_enter < 1 ? lerpVal(enterYOffset, 0, c2_enter) : 0;
  const c2_zEnter = c2_enter < 1 ? lerpVal(-70, 0, c2_enter) : 0;
  const c2_rotXEnter = c2_enter < 1 ? lerpVal(10, 0, c2_enter) : 0;
  const c2_opacity = smoothHermite(isSmallScreen ? 0.54 : 0.44, isSmallScreen ? 0.78 : 0.58, scrollProgress);

  return (
    <section
      ref={sectionRef}
      id="surveillance"
      className="relative bg-black text-white scroll-mt-20 overflow-x-clip"
      style={{ height: isSmallScreen ? "180vh" : "155vh" }}
    >
      <span id="arrays" className="absolute top-0 pointer-events-none" />

      {/* Pinned Viewport Container */}
      <div className="sticky top-0 min-h-[100dvh] h-[100dvh] w-full flex items-center justify-center px-4 sm:px-8 lg:px-12 py-2 sm:py-4 lg:py-0 overflow-hidden">
        {/* Deep-sea ambient background glow */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[320px] sm:w-[450px] lg:w-[550px] h-[320px] sm:h-[450px] lg:h-[550px] rounded-full bg-cyan-950/20 blur-[120px] lg:blur-[170px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[280px] sm:w-[380px] lg:w-[450px] h-[280px] sm:h-[380px] lg:h-[450px] rounded-full bg-teal-950/15 blur-[100px] lg:blur-[150px]" />
        </div>

        {/* DESKTOP LAYOUT (>= lg: 1024px) */}
        <div className="hidden lg:grid max-w-6xl w-full mx-auto relative z-10 grid-cols-12 gap-10 xl:gap-14 items-center my-auto">
          {/* LEFT COLUMN: 3D Stacking Cards Stage */}
          <div className="col-span-5 flex flex-col items-start w-full">
            <div
              className="relative z-10 w-full h-[320px] xl:h-[360px]"
              style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
            >
              {/* CARD 0: Spectra-X Broadband Array */}
              <div
                onClick={() => scrollToCard(0)}
                style={{
                  transform: `translate3d(0, ${c0_y}px, ${c0_z}px) rotateX(${c0_rotX}deg) scale(${c0_scale})`,
                  filter: `brightness(${c0_brightness})`,
                  transformOrigin: "top center",
                  willChange: "transform, filter",
                }}
                className="absolute inset-0 z-10 rounded-2xl overflow-hidden border border-white/10 bg-[#070b14] shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer"
              >
                <Image
                  src={sensorPayloads[0].image}
                  alt={sensorPayloads[0].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between z-10 overflow-hidden">
                  <div className="min-w-0 pr-2">
                    <div className="text-lg font-medium text-white tracking-tight truncate">
                      {sensorPayloads[0].name}
                    </div>
                    <div className="text-xs text-zinc-400 font-mono mt-0.5 truncate">
                      {sensorPayloads[0].specs}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 shrink-0">01 / 03</span>
                </div>
              </div>

              {/* CARD 1: Phalanx Conformal Matrix */}
              <div
                onClick={() => scrollToCard(1)}
                style={{
                  transform:
                    c1_enter < 1
                      ? `translate3d(0, ${c1_yTranslate}%, ${c1_zEnter}px) rotateX(${c1_rotXEnter}deg)`
                      : `translate3d(0, ${c1_yOffset}px, ${c1_zExit}px) rotateX(${c1_rotXExit}deg) scale(${c1_scale})`,
                  filter: `brightness(${c1_brightness})`,
                  opacity: c1_opacity,
                  transformOrigin: "top center",
                  willChange: "transform, filter, opacity",
                }}
                className="absolute inset-0 z-20 rounded-2xl overflow-hidden border border-white/10 bg-[#070b14] shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer"
              >
                <Image
                  src={sensorPayloads[1].image}
                  alt={sensorPayloads[1].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between z-10 overflow-hidden">
                  <div className="min-w-0 pr-2">
                    <div className="text-lg font-medium text-white tracking-tight truncate">
                      {sensorPayloads[1].name}
                    </div>
                    <div className="text-xs text-zinc-400 font-mono mt-0.5 truncate">
                      {sensorPayloads[1].specs}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 shrink-0">02 / 03</span>
                </div>
              </div>

              {/* CARD 2: Abyssal Tether Linear Array */}
              <div
                onClick={() => scrollToCard(2)}
                style={{
                  transform:
                    c2_enter < 1
                      ? `translate3d(0, ${c2_yTranslate}%, ${c2_zEnter}px) rotateX(${c2_rotXEnter}deg)`
                      : "translate3d(0, 0, 0)",
                  opacity: c2_opacity,
                  transformOrigin: "top center",
                  willChange: "transform, opacity",
                }}
                className="absolute inset-0 z-30 rounded-2xl overflow-hidden border border-white/10 bg-[#070b14] shadow-[0_25px_60px_rgba(0,0,0,0.95)] cursor-pointer"
              >
                <Image
                  src={sensorPayloads[2].image}
                  alt={sensorPayloads[2].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between z-10 overflow-hidden">
                  <div className="min-w-0 pr-2">
                    <div className="text-lg font-medium text-white tracking-tight truncate">
                      {sensorPayloads[2].name}
                    </div>
                    <div className="text-xs text-zinc-400 font-mono mt-0.5 truncate">
                      {sensorPayloads[2].specs}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 shrink-0">03 / 03</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial copy & technical specs */}
          <div className="col-span-7 flex flex-col justify-center w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] w-fit mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-zinc-300 uppercase">
                AETHEL SENSOR SUITE // SURVEILLANCE
              </span>
            </div>

            <h2
              style={{ fontFamily: "forma-djr-display, sans-serif" }}
              className="text-4xl xl:text-5xl font-light text-white tracking-tight leading-tight mb-2"
            >
              Acoustic intelligence{" "}
              <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-teal-300 inline-block pr-2">
                beyond detection.
              </span>
            </h2>

            <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-xl mb-3">
              Purpose-built piezoelectric and fiber-optic hydrophone apertures operating below ambient ocean noise floor. Engineered for silent station-keeping and persistent target profiling.
            </p>

            {/* Dynamic Active Sensor Spec Card */}
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-cyan-300 uppercase block">
                    {sensorPayloads[activeIndex].tag}
                  </span>
                  <h3 className="text-base font-medium text-white mt-0.5 truncate">
                    {sensorPayloads[activeIndex].name}
                  </h3>
                </div>
                <Button
                  variant="outline"
                  size="xs"
                  shape="rounded"
                  className="text-cyan-300 hover:text-white border-white/10 hover:border-cyan-400/50"
                  onClick={() => {
                    if (onExploreArrays) onExploreArrays();
                  }}
                >
                  REQUEST SPEC
                </Button>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-light mb-2.5">
                {sensorPayloads[activeIndex].summary}
              </p>

              {/* 4-Item Technical Specifications Grid */}
              <div className="grid grid-cols-4 gap-2 pt-0.5">
                {sensorPayloads[activeIndex].specsGrid.map((spec) => (
                  <div key={spec.label} className="p-2 rounded-lg bg-black/40 border border-white/[0.06]">
                    <div className="text-[9px] uppercase font-mono text-zinc-400 tracking-wider truncate">
                      {spec.label}
                    </div>
                    <div className="text-xs font-medium text-cyan-100 mt-0.5 truncate">
                      {spec.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Operational Architecture Pillars */}
            <div className="mt-4 grid grid-cols-3 gap-3 pt-3 border-t border-white/[0.08]">
              <div>
                <div className="text-[10px] font-mono tracking-wider text-cyan-300 uppercase font-medium">
                  Passive Stealth
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug font-light">
                  Zero active acoustic emission prevents triangulation by hostile sonar.
                </p>
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-wider text-cyan-300 uppercase font-medium">
                  Edge Beamforming
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug font-light">
                  Real-time neural isolation discriminates biology from hull propulsion.
                </p>
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-wider text-cyan-300 uppercase font-medium">
                  Thermocline Layer
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug font-light">
                  Penetrates acoustic shadows beneath thermal layers where threats lurk.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET BESPOKE AEROSPACE LAYOUT (< lg: 1024px) */}
        <div className="lg:hidden w-full max-w-[390px] sm:max-w-[440px] mx-auto flex flex-col justify-center items-center my-auto z-10 px-1 py-2">
          {/* Header */}
          <div className="w-full text-center mb-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-cyan-500/25 bg-cyan-950/30 backdrop-blur-md mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span className="text-[8.5px] font-mono tracking-widest text-cyan-300 uppercase">
                AETHEL SENSOR SUITE // SURVEILLANCE
              </span>
            </div>
            <h2
              style={{ fontFamily: "forma-djr-display, sans-serif" }}
              className="text-xl min-[400px]:text-2xl font-light text-white tracking-tight leading-tight"
            >
              Acoustic intelligence{" "}
              <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-teal-300 inline-block pr-1.5">
                beyond detection.
              </span>
            </h2>
          </div>

          {/* Segmented Glass Touch Tabs */}
          <div className="relative z-40 flex items-center p-1 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md w-full mb-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            {sensorPayloads.map((payload, idx) => (
              <button
                key={payload.id}
                onClick={() => {
                  scrollToCard(idx);
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-[9px] min-[380px]:text-[10px] tracking-wider uppercase transition-all duration-300 text-center whitespace-nowrap cursor-pointer ${
                  activeIndex === idx
                    ? "bg-gradient-to-r from-cyan-950/90 to-teal-950/90 border border-cyan-400/80 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.35)] font-semibold"
                    : "text-zinc-400 hover:text-zinc-200 border border-transparent"
                }`}
                aria-label={`Select ${payload.name}`}
              >
                0{idx + 1} {payload.shortName}
              </button>
            ))}
          </div>

          {/* 3D Stacking Visual Cards Stage - Commanding Centerpiece */}
          <div
            className="relative z-10 w-full h-[195px] min-[400px]:h-[220px] sm:h-[250px] mb-3"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            {/* CARD 0: Spectra-X Broadband Array */}
            <div
              onClick={() => scrollToCard(0)}
              style={{
                transform: `translate3d(0, ${c0_y}px, ${c0_z}px) rotateX(${c0_rotX}deg) scale(${c0_scale})`,
                filter: `brightness(${c0_brightness})`,
                transformOrigin: "top center",
                willChange: "transform, filter",
              }}
              className="absolute inset-0 z-10 rounded-2xl overflow-hidden border border-white/15 bg-[#070b14] shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer"
            >
              <Image
                src={sensorPayloads[0].image}
                alt={sensorPayloads[0].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 min-[400px]:bottom-3 left-3 min-[400px]:left-4 right-3 min-[400px]:right-4 flex items-end justify-between z-10 overflow-hidden">
                <div className="min-w-0 pr-2">
                  <div className="text-xs min-[400px]:text-sm sm:text-base font-medium text-white tracking-tight truncate">
                    {sensorPayloads[0].name}
                  </div>
                  <div className="text-[9px] min-[400px]:text-[10px] sm:text-xs text-zinc-400 font-mono mt-0.5 truncate">
                    {sensorPayloads[0].specs}
                  </div>
                </div>
                <span className="text-[9px] min-[400px]:text-[10px] font-mono text-cyan-300/90 font-semibold shrink-0">01 / 03</span>
              </div>
            </div>

            {/* CARD 1: Phalanx Conformal Matrix */}
            <div
              onClick={() => scrollToCard(1)}
              style={{
                transform:
                  c1_enter < 1
                    ? `translate3d(0, ${c1_yTranslate}%, ${c1_zEnter}px) rotateX(${c1_rotXEnter}deg)`
                    : `translate3d(0, ${c1_yOffset}px, ${c1_zExit}px) rotateX(${c1_rotXExit}deg) scale(${c1_scale})`,
                filter: `brightness(${c1_brightness})`,
                opacity: c1_opacity,
                transformOrigin: "top center",
                willChange: "transform, filter, opacity",
              }}
              className="absolute inset-0 z-20 rounded-2xl overflow-hidden border border-white/15 bg-[#070b14] shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer"
            >
              <Image
                src={sensorPayloads[1].image}
                alt={sensorPayloads[1].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 min-[400px]:bottom-3 left-3 min-[400px]:left-4 right-3 min-[400px]:right-4 flex items-end justify-between z-10 overflow-hidden">
                <div className="min-w-0 pr-2">
                  <div className="text-xs min-[400px]:text-sm sm:text-base font-medium text-white tracking-tight truncate">
                    {sensorPayloads[1].name}
                  </div>
                  <div className="text-[9px] min-[400px]:text-[10px] sm:text-xs text-zinc-400 font-mono mt-0.5 truncate">
                    {sensorPayloads[1].specs}
                  </div>
                </div>
                <span className="text-[9px] min-[400px]:text-[10px] font-mono text-cyan-300/90 font-semibold shrink-0">02 / 03</span>
              </div>
            </div>

            {/* CARD 2: Abyssal Tether Linear Array */}
            <div
              onClick={() => scrollToCard(2)}
              style={{
                transform:
                  c2_enter < 1
                    ? `translate3d(0, ${c2_yTranslate}%, ${c2_zEnter}px) rotateX(${c2_rotXEnter}deg)`
                    : "translate3d(0, 0, 0)",
                opacity: c2_opacity,
                transformOrigin: "top center",
                willChange: "transform, opacity",
              }}
              className="absolute inset-0 z-30 rounded-2xl overflow-hidden border border-white/15 bg-[#070b14] shadow-[0_25px_60px_rgba(0,0,0,0.95)] cursor-pointer"
            >
              <Image
                src={sensorPayloads[2].image}
                alt={sensorPayloads[2].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 min-[400px]:bottom-3 left-3 min-[400px]:left-4 right-3 min-[400px]:right-4 flex items-end justify-between z-10 overflow-hidden">
                <div className="min-w-0 pr-2">
                  <div className="text-xs min-[400px]:text-sm sm:text-base font-medium text-white tracking-tight truncate">
                    {sensorPayloads[2].name}
                  </div>
                  <div className="text-[9px] min-[400px]:text-[10px] sm:text-xs text-zinc-400 font-mono mt-0.5 truncate">
                    {sensorPayloads[2].specs}
                  </div>
                </div>
                <span className="text-[9px] min-[400px]:text-[10px] font-mono text-cyan-300/90 font-semibold shrink-0">03 / 03</span>
              </div>
            </div>
          </div>

          {/* Unified Aerospace Telemetry Panel */}
          <div className="relative z-30 w-full rounded-2xl border border-white/10 bg-[#070b14]/95 backdrop-blur-md p-2.5 min-[400px]:p-3 shadow-[0_12px_32px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[8.5px] min-[400px]:text-[9px] font-mono tracking-wider text-cyan-300 uppercase truncate">
                  {sensorPayloads[activeIndex].tag}
                </span>
              </div>
              <Button
                variant="tactical"
                size="xs"
                shape="pill"
                onClick={() => {
                  if (onExploreArrays) onExploreArrays();
                }}
              >
                REQUEST SPEC
              </Button>
            </div>

            {/* 4 Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 gap-1.5 min-[400px]:gap-2">
              {sensorPayloads[activeIndex].specsGrid.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col bg-white/[0.03] rounded-lg p-1.5 min-[400px]:p-2 border border-white/[0.05]"
                >
                  <span className="text-[7.5px] min-[400px]:text-[8px] uppercase font-mono text-zinc-400 tracking-wider truncate">
                    {spec.label}
                  </span>
                  <span className="text-[10px] min-[400px]:text-[11px] font-medium text-cyan-100 font-mono mt-0.5 truncate">
                    {spec.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
