"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Radio, Activity, ShieldCheck } from "lucide-react";

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
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const isClickingTabRef = useRef<boolean>(false);

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
      telemetryTag: "BAND LOCKED",
      summary:
        "Multi-directional piezoelectric hydrophone aperture engineered to isolate faint mechanical harmonics and cavitation signatures in high-noise littoral choke points.",
      specs: "64-channel array • 5 Hz – 65 kHz • Titanium pressure vessel",
      image: "/images/hydrophone-array-1.jpg",
      alt: "Spectra-X Submerged Broadband Acoustic Array",
      specsGrid: [
        { label: "Frequency Range", val: "5 Hz – 65 kHz", badge: "BROADBAND" },
        { label: "Dynamic Range", val: "142 dB Linear", badge: "CALIBRATED" },
        { label: "Target Detection", val: "45+ NM Reach", badge: "EXTENDED" },
        { label: "Signal Processor", val: "FPGA Beamforming", badge: "ZERO LAG" },
      ],
    },
    {
      id: "phalanx-matrix",
      name: "Phalanx Conformal Matrix",
      shortName: "Phalanx",
      category: "Hull-Integrated Grid",
      tag: "SENSOR 02 // CONFORMAL HULL GRID",
      telemetryTag: "360° SPHERICAL",
      summary:
        "Flush-mounted phased sensor skin delivering continuous 360° hemispherical tracking and obstacle mapping with zero hydrodynamic drag at sustained underwater velocities.",
      specs: "128 solid-state receivers • 360° azimuth • High-speed fairing",
      image: "/images/hydrophone-array-2.jpg",
      alt: "Phalanx Conformal Matrix Submarine Array",
      specsGrid: [
        { label: "Aperture Coverage", val: "360° Azimuth", badge: "HEMISPHERIC" },
        { label: "Receiver Density", val: "128 Nodes", badge: "SOLID-STATE" },
        { label: "Hydrodynamic Drag", val: "0.00 Cd Flush", badge: "STEALTH" },
        { label: "System Latency", val: "< 8 ms Loop", badge: "REAL-TIME" },
      ],
    },
    {
      id: "abyssal-tether",
      name: "Abyssal Tether Linear Array",
      shortName: "Abyssal",
      category: "Deep Shadow Tow Line",
      tag: "SENSOR 03 // TOWED DEEP LINE",
      telemetryTag: "6,000M RATED",
      summary:
        "Ultra-low frequency passive towed array deployed below thermal layer acoustic ducts to classify quiet nuclear submarines and autonomous undersea vehicles at extreme ranges.",
      specs: "500m neutrally buoyant line • 1 Hz – 5 kHz • Depth rated to 6,000m",
      image: "/images/hydrophone-array-3.jpg",
      alt: "Abyssal Tether Deep Tow Line Array",
      specsGrid: [
        { label: "Array Length", val: "500m Tow Line", badge: "NEUTRAL" },
        { label: "Acoustic Floor", val: "-192 dB re 1µPa", badge: "ULTRA-QUIET" },
        { label: "Operating Depth", val: "6,000 Meters", badge: "HADAL" },
        { label: "Uplink Channel", val: "Fiber-Optic Core", badge: "SECURE" },
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

        // Only update activeIdx from scroll if not in a programmatic click transition
        if (!isClickingTabRef.current) {
          const computed = progress < 0.35 ? 0 : progress < 0.72 ? 1 : 2;
          setActiveIdx(computed);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const handleSelectTab = (index: number) => {
    setActiveIdx(index);
    isClickingTabRef.current = true;

    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const totalDistance = sectionRef.current.offsetHeight - window.innerHeight;
      const targets = [0.08, 0.50, 0.92];
      const targetY = sectionTop + targets[index] * totalDistance;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }

    setTimeout(() => {
      isClickingTabRef.current = false;
    }, 600);
  };

  // 3D Card Stacking Transformations Linked to Scroll (or fallback to active state)
  const exitYOffset = isSmallScreen ? -8 : -24;
  const enterYOffset = isSmallScreen ? 20 : 115;
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
      className="relative bg-[#020610] text-white scroll-mt-20 overflow-x-clip border-b border-white/[0.08]"
      style={{ height: isSmallScreen ? "165vh" : "155vh" }}
    >
      <span id="arrays" className="absolute top-0 pointer-events-none" />

      {/* Pinned Viewport Container */}
      <div className="sticky top-0 min-h-[100dvh] h-[100dvh] w-full flex items-center justify-center px-4 sm:px-8 lg:px-12 py-3 sm:py-6 lg:py-0 overflow-hidden">
        {/* Deep-sea ambient background glow & radar circles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] lg:w-[900px] h-[340px] sm:h-[600px] lg:h-[900px] rounded-full border border-cyan-500/10 pointer-events-none animate-hydrophone-ping" />
          <div className="absolute top-1/3 left-1/4 w-[320px] sm:w-[500px] lg:w-[650px] h-[320px] sm:h-[500px] lg:h-[650px] rounded-full bg-cyan-950/25 blur-[120px] lg:blur-[170px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[280px] sm:w-[420px] lg:w-[550px] h-[280px] sm:h-[420px] lg:h-[550px] rounded-full bg-teal-950/20 blur-[100px] lg:blur-[150px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.02]" />
        </div>

        {/* DESKTOP LAYOUT (>= lg: 1024px) */}
        <div className="hidden lg:grid max-w-6xl w-full mx-auto relative z-10 grid-cols-12 gap-10 xl:gap-14 items-center my-auto">
          {/* LEFT COLUMN: 3D Stacking Cards Stage */}
          <div className="col-span-5 flex flex-col items-start w-full">
            <div
              className="relative z-10 w-full h-[330px] xl:h-[370px]"
              style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
            >
              {/* CARD 0: Spectra-X Broadband Array */}
              <div
                onClick={() => handleSelectTab(0)}
                style={{
                  transform: `translate3d(0, ${c0_y}px, ${c0_z}px) rotateX(${c0_rotX}deg) scale(${c0_scale})`,
                  filter: `brightness(${c0_brightness})`,
                  transformOrigin: "top center",
                  willChange: "transform, filter",
                }}
                className={`absolute inset-0 z-10 rounded-2xl overflow-hidden border transition-shadow duration-300 bg-[#070b14] shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer ${
                  activeIdx === 0
                    ? "border-cyan-400/60 shadow-[0_25px_60px_rgba(6,182,212,0.22)]"
                    : "border-white/10"
                }`}
              >
                <Image
                  src={sensorPayloads[0].image}
                  alt={sensorPayloads[0].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                {/* Laser Sonar Scanline on Active Card */}
                {activeIdx === 0 && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-20">
                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_#22d3ee] animate-sonar-sweep" />
                  </div>
                )}

                {/* 4 Precision Reticle Brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />

                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between z-20 overflow-hidden">
                  <div className="min-w-0 pr-2">
                    <div className="text-lg font-medium text-white tracking-tight truncate flex items-center gap-2">
                      <span>{sensorPayloads[0].name}</span>
                      {activeIdx === 0 && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                      )}
                    </div>
                    <div className="text-xs text-zinc-300 font-mono mt-0.5 truncate">
                      {sensorPayloads[0].specs}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 font-semibold shrink-0">01 / 03</span>
                </div>
              </div>

              {/* CARD 1: Phalanx Conformal Matrix */}
              <div
                onClick={() => handleSelectTab(1)}
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
                className={`absolute inset-0 z-20 rounded-2xl overflow-hidden border transition-shadow duration-300 bg-[#070b14] shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer ${
                  activeIdx === 1
                    ? "border-cyan-400/60 shadow-[0_25px_60px_rgba(6,182,212,0.22)]"
                    : "border-white/10"
                }`}
              >
                <Image
                  src={sensorPayloads[1].image}
                  alt={sensorPayloads[1].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                {/* Laser Sonar Scanline on Active Card */}
                {activeIdx === 1 && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-20">
                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_#22d3ee] animate-sonar-sweep" />
                  </div>
                )}

                {/* 4 Precision Reticle Brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />

                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between z-20 overflow-hidden">
                  <div className="min-w-0 pr-2">
                    <div className="text-lg font-medium text-white tracking-tight truncate flex items-center gap-2">
                      <span>{sensorPayloads[1].name}</span>
                      {activeIdx === 1 && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                      )}
                    </div>
                    <div className="text-xs text-zinc-300 font-mono mt-0.5 truncate">
                      {sensorPayloads[1].specs}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 font-semibold shrink-0">02 / 03</span>
                </div>
              </div>

              {/* CARD 2: Abyssal Tether Linear Array */}
              <div
                onClick={() => handleSelectTab(2)}
                style={{
                  transform:
                    c2_enter < 1
                      ? `translate3d(0, ${c2_yTranslate}%, ${c2_zEnter}px) rotateX(${c2_rotXEnter}deg)`
                      : "translate3d(0, 0, 0)",
                  opacity: c2_opacity,
                  transformOrigin: "top center",
                  willChange: "transform, opacity",
                }}
                className={`absolute inset-0 z-30 rounded-2xl overflow-hidden border transition-shadow duration-300 bg-[#070b14] shadow-[0_25px_60px_rgba(0,0,0,0.95)] cursor-pointer ${
                  activeIdx === 2
                    ? "border-cyan-400/60 shadow-[0_25px_60px_rgba(6,182,212,0.22)]"
                    : "border-white/10"
                }`}
              >
                <Image
                  src={sensorPayloads[2].image}
                  alt={sensorPayloads[2].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                {/* Laser Sonar Scanline on Active Card */}
                {activeIdx === 2 && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-20">
                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_#22d3ee] animate-sonar-sweep" />
                  </div>
                )}

                {/* 4 Precision Reticle Brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />

                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between z-20 overflow-hidden">
                  <div className="min-w-0 pr-2">
                    <div className="text-lg font-medium text-white tracking-tight truncate flex items-center gap-2">
                      <span>{sensorPayloads[2].name}</span>
                      {activeIdx === 2 && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                      )}
                    </div>
                    <div className="text-xs text-zinc-300 font-mono mt-0.5 truncate">
                      {sensorPayloads[2].specs}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 font-semibold shrink-0">03 / 03</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial copy & technical specs */}
          <div className="col-span-7 flex flex-col justify-center w-full">
            {/* Top Indicator with Live Acoustic Equalizer */}
            <div className="flex items-center gap-3 mb-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-950/30 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase">
                  AETHEL SENSOR SUITE // SURVEILLANCE
                </span>
              </div>

              {/* Dynamic Equalizer Bars */}
              <div className="flex items-end gap-[3px] h-3.5 px-2.5 py-0.5 rounded-full bg-black/40 border border-white/10">
                <span className="w-0.5 bg-cyan-400 rounded-full animate-eq-1" />
                <span className="w-0.5 bg-cyan-300 rounded-full animate-eq-2" />
                <span className="w-0.5 bg-teal-400 rounded-full animate-eq-3" />
                <span className="w-0.5 bg-cyan-400 rounded-full animate-eq-4" />
                <span className="w-0.5 bg-emerald-400 rounded-full animate-eq-2" />
                <span className="text-[8px] font-mono text-cyan-300 uppercase ml-1">LIVE ACOUSTIC</span>
              </div>
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

            {/* Segmented Interactive Control Bar */}
            <div className="flex items-center p-1 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md w-fit mb-4 gap-1">
              {sensorPayloads.map((payload, idx) => (
                <button
                  key={payload.id}
                  onClick={() => handleSelectTab(idx)}
                  className={`py-1.5 px-3 rounded-lg font-mono text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    activeIdx === idx
                      ? "bg-gradient-to-r from-cyan-950/90 to-teal-950/90 border border-cyan-400/80 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.35)] font-semibold"
                      : "text-zinc-400 hover:text-zinc-200 border border-transparent"
                  }`}
                >
                  <span className={activeIdx === idx ? "text-cyan-400" : "text-zinc-500"}>0{idx + 1}</span>
                  <span>{payload.shortName}</span>
                </button>
              ))}
            </div>

            {/* Dynamic Active Sensor Spec Card */}
            <div className="p-4 rounded-xl border border-cyan-500/25 bg-[#030712]/90 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
              {/* Subtle top laser glow */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

              <div className="flex items-center justify-between gap-3 mb-2.5 pb-2.5 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                    <span className="text-[10px] font-mono tracking-wider text-cyan-300 uppercase">
                      {sensorPayloads[activeIdx].tag}
                    </span>
                    <span className="text-[8.5px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 uppercase">
                      {sensorPayloads[activeIdx].telemetryTag}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-white mt-1 truncate">
                    {sensorPayloads[activeIdx].name}
                  </h3>
                </div>

                <Button
                  variant="tactical"
                  size="sm"
                  shape="rounded"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  onClick={() => {
                    if (onExploreArrays) onExploreArrays();
                  }}
                >
                  REQUEST SPEC
                </Button>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-light mb-3">
                {sensorPayloads[activeIdx].summary}
              </p>

              {/* 4-Item Technical Specifications Grid */}
              <div className="grid grid-cols-4 gap-2.5">
                {sensorPayloads[activeIdx].specsGrid.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-2.5 rounded-lg bg-black/60 border border-white/[0.08] hover:border-cyan-500/30 transition-colors group"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[8.5px] uppercase font-mono text-zinc-400 tracking-wider truncate">
                        {spec.label}
                      </span>
                      <span className="text-[7.5px] font-mono px-1 py-0.2 rounded bg-white/[0.05] text-cyan-300/80">
                        {spec.badge}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-white mt-1 font-mono group-hover:text-cyan-200 transition-colors truncate">
                      {spec.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Operational Architecture Pillars */}
            <div className="mt-4 grid grid-cols-3 gap-3 pt-3 border-t border-white/[0.08]">
              <div>
                <div className="text-[10px] font-mono tracking-wider text-cyan-300 uppercase font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" />
                  <span>Passive Stealth</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug font-light">
                  Zero active acoustic emission prevents triangulation by hostile sonar.
                </p>
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-wider text-cyan-300 uppercase font-medium flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-cyan-400" />
                  <span>Edge Beamforming</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug font-light">
                  Real-time neural isolation discriminates biology from hull propulsion.
                </p>
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-wider text-cyan-300 uppercase font-medium flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-cyan-400" />
                  <span>Thermocline Layer</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug font-light">
                  Penetrates acoustic shadows beneath thermal layers where threats lurk.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET BESPOKE AEROSPACE LAYOUT (< lg: 1024px) */}
        <div className="lg:hidden w-full max-w-[400px] min-[420px]:max-w-[440px] sm:max-w-[480px] mx-auto flex flex-col justify-center items-center my-auto z-10 px-1 py-1">
          {/* Header */}
          <div className="w-full text-center mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-cyan-500/25 bg-cyan-950/40 backdrop-blur-md mb-1 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span className="text-[8.5px] font-mono tracking-widest text-cyan-300 uppercase">
                AETHEL SENSOR SUITE // SURVEILLANCE
              </span>

              {/* Mini Audio Eq for Mobile */}
              <div className="flex items-end gap-[2px] h-2.5 ml-1">
                <span className="w-0.5 bg-cyan-400 rounded-full animate-eq-1" />
                <span className="w-0.5 bg-cyan-300 rounded-full animate-eq-2" />
                <span className="w-0.5 bg-teal-400 rounded-full animate-eq-3" />
                <span className="w-0.5 bg-cyan-400 rounded-full animate-eq-4" />
              </div>
            </div>

            <h2
              style={{ fontFamily: "forma-djr-display, sans-serif" }}
              className="text-xl min-[380px]:text-2xl font-light text-white tracking-tight leading-tight"
            >
              Acoustic intelligence{" "}
              <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-teal-300 inline-block pr-1">
                beyond detection.
              </span>
            </h2>
          </div>

          {/* Segmented Glass Touch Tabs */}
          <div className="relative z-40 flex items-center p-1 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md w-full mb-2.5 shadow-[0_6px_24px_rgba(0,0,0,0.6)]">
            {sensorPayloads.map((payload, idx) => (
              <button
                key={payload.id}
                onClick={() => handleSelectTab(idx)}
                className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-[9.5px] min-[380px]:text-[10.5px] tracking-wider uppercase transition-all duration-300 text-center whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeIdx === idx
                    ? "bg-gradient-to-r from-cyan-950/90 to-teal-950/90 border border-cyan-400/90 text-cyan-200 shadow-[0_0_16px_rgba(6,182,212,0.4)] font-semibold"
                    : "text-zinc-400 hover:text-zinc-200 border border-transparent"
                }`}
                aria-label={`Select ${payload.name}`}
              >
                <span className={activeIdx === idx ? "text-cyan-400 text-[8px]" : "text-zinc-500 text-[8px]"}>
                  0{idx + 1}
                </span>
                <span>{payload.shortName}</span>
                {activeIdx === idx && (
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* 3D Stacking Visual Cards Stage - Commanding Centerpiece */}
          <div
            className="relative z-10 w-full h-[190px] min-[390px]:h-[210px] min-[440px]:h-[230px] sm:h-[260px] mb-2.5"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            {/* CARD 0: Spectra-X Broadband Array */}
            <div
              onClick={() => handleSelectTab(0)}
              style={{
                transform: `translate3d(0, ${c0_y}px, ${c0_z}px) rotateX(${c0_rotX}deg) scale(${c0_scale})`,
                filter: `brightness(${c0_brightness})`,
                transformOrigin: "top center",
                willChange: "transform, filter",
              }}
              className={`absolute inset-0 z-10 rounded-2xl overflow-hidden border transition-all duration-300 bg-[#070b14] shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer ${
                activeIdx === 0
                  ? "border-cyan-400/70 shadow-[0_0_30px_rgba(6,182,212,0.25)]"
                  : "border-white/15"
              }`}
            >
              <Image
                src={sensorPayloads[0].image}
                alt={sensorPayloads[0].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

              {/* Sonar Scanline */}
              {activeIdx === 0 && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-20">
                  <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] animate-sonar-sweep" />
                </div>
              )}

              {/* Precision Reticle Brackets */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

              <div className="absolute bottom-2.5 min-[400px]:bottom-3 left-3 min-[400px]:left-4 right-3 min-[400px]:right-4 flex items-end justify-between z-20 overflow-hidden">
                <div className="min-w-0 pr-2">
                  <div className="text-xs min-[400px]:text-sm sm:text-base font-medium text-white tracking-tight truncate flex items-center gap-1.5">
                    <span>{sensorPayloads[0].name}</span>
                    {activeIdx === 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] animate-pulse" />
                    )}
                  </div>
                  <div className="text-[9px] min-[400px]:text-[10px] sm:text-xs text-zinc-300 font-mono mt-0.5 truncate">
                    {sensorPayloads[0].specs}
                  </div>
                </div>
                <span className="text-[9px] min-[400px]:text-[10px] font-mono text-cyan-300 font-semibold shrink-0">
                  01 / 03
                </span>
              </div>
            </div>

            {/* CARD 1: Phalanx Conformal Matrix */}
            <div
              onClick={() => handleSelectTab(1)}
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
              className={`absolute inset-0 z-20 rounded-2xl overflow-hidden border transition-all duration-300 bg-[#070b14] shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer ${
                activeIdx === 1
                  ? "border-cyan-400/70 shadow-[0_0_30px_rgba(6,182,212,0.25)]"
                  : "border-white/15"
              }`}
            >
              <Image
                src={sensorPayloads[1].image}
                alt={sensorPayloads[1].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

              {/* Sonar Scanline */}
              {activeIdx === 1 && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-20">
                  <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] animate-sonar-sweep" />
                </div>
              )}

              {/* Precision Reticle Brackets */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

              <div className="absolute bottom-2.5 min-[400px]:bottom-3 left-3 min-[400px]:left-4 right-3 min-[400px]:right-4 flex items-end justify-between z-20 overflow-hidden">
                <div className="min-w-0 pr-2">
                  <div className="text-xs min-[400px]:text-sm sm:text-base font-medium text-white tracking-tight truncate flex items-center gap-1.5">
                    <span>{sensorPayloads[1].name}</span>
                    {activeIdx === 1 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] animate-pulse" />
                    )}
                  </div>
                  <div className="text-[9px] min-[400px]:text-[10px] sm:text-xs text-zinc-300 font-mono mt-0.5 truncate">
                    {sensorPayloads[1].specs}
                  </div>
                </div>
                <span className="text-[9px] min-[400px]:text-[10px] font-mono text-cyan-300 font-semibold shrink-0">
                  02 / 03
                </span>
              </div>
            </div>

            {/* CARD 2: Abyssal Tether Linear Array */}
            <div
              onClick={() => handleSelectTab(2)}
              style={{
                transform:
                  c2_enter < 1
                    ? `translate3d(0, ${c2_yTranslate}%, ${c2_zEnter}px) rotateX(${c2_rotXEnter}deg)`
                    : "translate3d(0, 0, 0)",
                opacity: c2_opacity,
                transformOrigin: "top center",
                willChange: "transform, opacity",
              }}
              className={`absolute inset-0 z-30 rounded-2xl overflow-hidden border transition-all duration-300 bg-[#070b14] shadow-[0_25px_60px_rgba(0,0,0,0.95)] cursor-pointer ${
                activeIdx === 2
                  ? "border-cyan-400/70 shadow-[0_0_30px_rgba(6,182,212,0.25)]"
                  : "border-white/15"
              }`}
            >
              <Image
                src={sensorPayloads[2].image}
                alt={sensorPayloads[2].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

              {/* Sonar Scanline */}
              {activeIdx === 2 && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-20">
                  <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] animate-sonar-sweep" />
                </div>
              )}

              {/* Precision Reticle Brackets */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

              <div className="absolute bottom-2.5 min-[400px]:bottom-3 left-3 min-[400px]:left-4 right-3 min-[400px]:right-4 flex items-end justify-between z-20 overflow-hidden">
                <div className="min-w-0 pr-2">
                  <div className="text-xs min-[400px]:text-sm sm:text-base font-medium text-white tracking-tight truncate flex items-center gap-1.5">
                    <span>{sensorPayloads[2].name}</span>
                    {activeIdx === 2 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] animate-pulse" />
                    )}
                  </div>
                  <div className="text-[9px] min-[400px]:text-[10px] sm:text-xs text-zinc-300 font-mono mt-0.5 truncate">
                    {sensorPayloads[2].specs}
                  </div>
                </div>
                <span className="text-[9px] min-[400px]:text-[10px] font-mono text-cyan-300 font-semibold shrink-0">
                  03 / 03
                </span>
              </div>
            </div>
          </div>

          {/* Unified Aerospace Telemetry Panel */}
          <div className="relative z-30 w-full rounded-2xl border border-cyan-500/25 bg-[#070b14]/95 backdrop-blur-md p-2.5 min-[400px]:p-3 shadow-[0_15px_35px_rgba(0,0,0,0.92)]">
            {/* Top hairline glowing accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />

            <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
                <span className="text-[8.5px] min-[400px]:text-[9px] font-mono tracking-wider text-cyan-300 uppercase truncate">
                  {sensorPayloads[activeIdx].tag}
                </span>
                <span className="text-[7.5px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 uppercase">
                  {sensorPayloads[activeIdx].telemetryTag}
                </span>
              </div>

              <Button
                variant="tactical"
                size="xs"
                shape="rounded"
                rightIcon={<ArrowRight className="w-3 h-3" />}
                onClick={() => {
                  if (onExploreArrays) onExploreArrays();
                }}
              >
                REQUEST SPEC
              </Button>
            </div>

            {/* 4 Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 gap-1.5 min-[400px]:gap-2">
              {sensorPayloads[activeIdx].specsGrid.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col bg-white/[0.025] hover:bg-cyan-950/20 rounded-lg p-2 border border-white/[0.07] hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[7.5px] min-[400px]:text-[8px] uppercase font-mono text-zinc-400 tracking-wider truncate flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-cyan-400/60" />
                      {spec.label}
                    </span>
                    <span className="text-[7px] font-mono px-1 py-0.2 rounded bg-white/[0.04] text-cyan-300/80">
                      {spec.badge}
                    </span>
                  </div>
                  <span className="text-[10px] min-[400px]:text-[11.5px] font-semibold text-white font-mono mt-0.5 truncate">
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
