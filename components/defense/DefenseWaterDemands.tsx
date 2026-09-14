"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Compass, Network } from "lucide-react";

interface CapabilityStage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  metrics: { label: string; value: string }[];
}

const CAPABILITIES: CapabilityStage[] = [
  {
    id: "gps-denied",
    step: "01",
    title: "GPS-Denied Navigation",
    subtitle: "Inertial & Acoustic Geo-Referencing",
    description:
      "Satellites are convenient. Dependence on them is not. INSTinct maintains positional accuracy when GPS, vision, and comms fail. Advanced sensor fusion minimizes drift across extended missions. Position is preserved even in denied and disconnected environments.",
    tag: "INERTIAL DRIFT < 0.02 NM/24H",
    metrics: [
      { label: "PRIMARY NAV", value: "AINS + FOG INS" },
      { label: "TERRAIN COORD", value: "Bathymetric Match" },
      { label: "GPS RELIANCE", value: "0.0% (Air-Gapped)" },
    ],
  },
  {
    id: "acoustic-observability",
    step: "02",
    title: "Acoustic Low-Observability",
    subtitle: "Sub-Sea State Zero Sound Signature",
    description:
      "Silence is survivability. Operating below ambient sea-state noise floors renders active and passive adversarial sonars useless. Hydrodynamic compliant polymer skins and rim-driven electromagnetic propulsion eliminate mechanical cavitation.",
    tag: "SIGNATURE < 8.2 dB PASSIVE",
    metrics: [
      { label: "PROPULSION", value: "Rim-Driven Hubless" },
      { label: "HULL COATING", value: "Piezo-Absorptive" },
      { label: "NOISE CRITICAL", value: "Cavitation-Null" },
    ],
  },
  {
    id: "swarm-coordination",
    step: "03",
    title: "Autonomous Swarm Coordination",
    subtitle: "Distributed Wolfpack Acoustic Mesh",
    description:
      "Single assets are vulnerable targets; distributed autonomous meshes are resilient. Dynamic ad-hoc acoustic routing allows dozens of autonomous platforms to cross-cue contacts, triangulate threats, and execute collaborative interdiction without surfacing.",
    tag: "MULTI-NODE AD-HOC ROUTING",
    metrics: [
      { label: "SWARM DIAMETER", value: "450 km² Coordinated" },
      { label: "ACOUSTIC CARRIER", value: "LPI / LPD Spread" },
      { label: "BANDWIDTH", value: "Adaptive Sub-Harmonic" },
    ],
  },
  {
    id: "hadal-endurance",
    step: "04",
    title: "Persistent Deep-Sea Endurance",
    subtitle: "6,000m Monolithic Titanium Architecture",
    description:
      "Hydrostatic crush pressures at extreme depths crushed previous generation platforms. Grade 5 titanium monolithic pressure structures coupled with closed-loop fuel cells enable unassisted multi-month loitering on the ocean floor without support vessels.",
    tag: "RATED DEPTH 6,000 METERS",
    metrics: [
      { label: "CRUSH PRESSURE", value: "600 Bar Hardened" },
      { label: "MISSION LOITER", value: "90+ Days Unassisted" },
      { label: "RECOVERY ROE", value: "Autonomous Docking" },
    ],
  },
];

export default function DefenseWaterDemands() {
  const [activeIdx, setActiveIdx] = useState(0);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastPlayedIdx = useRef<number>(-1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollYCenter = window.innerHeight * 0.45;
      let closestIdx = 0;
      let minDistance = Infinity;

      stageRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = (rect.top + rect.bottom) / 2;
        const dist = Math.abs(elementCenter - scrollYCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setActiveIdx((prev) => {
        if (prev !== closestIdx) {
          lastPlayedIdx.current = closestIdx;
          return closestIdx;
        }
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentStage = CAPABILITIES[activeIdx] || CAPABILITIES[0];

  return (
    <section
      id="water-demands"
      className="relative w-full bg-[#030712] text-white py-10 sm:py-14 lg:py-16 overflow-x-clip border-b border-white/[0.08]"
    >
      {/* 1. BACKGROUND OCEANIC DEPTH GRADIENTS & TACTICAL GRID LINE */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Subtle Horizontal Reference Line matching reference design */}
        <div className="absolute top-8 sm:top-12 lg:top-14 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

        {/* Ambient volumetric depth glows */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-cyan-950/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-blue-950/15 blur-[160px] rounded-full" />
      </div>

      {/* 2. MAIN TWO-COLUMN CONTAINER */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h2
            style={{ fontFamily: "forma-djr-display, sans-serif" }}
            className="text-[28px] sm:text-4xl md:text-5xl lg:text-7xl font-light text-white tracking-tight leading-[1.1]"
          >
            What the water demands
          </h2>
        </div>

        {/* Grid: Left Column Scrolls, Right Column Stays Fixed / Sticky */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start relative">
          
          {/* LEFT SIDE: SCROLLING CAPABILITIES CONTENT (6 Cols) */}
          <div className="lg:col-span-6 space-y-24 sm:space-y-36 lg:space-y-48 py-4 sm:py-8">
            {CAPABILITIES.map((cap, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={cap.id}
                  ref={(el) => {
                    stageRefs.current[idx] = el;
                  }}
                  className={`transition-all duration-500 cursor-pointer ${
                    isActive ? "opacity-100 scale-[1.01]" : "opacity-35 hover:opacity-75"
                  }`}
                  onClick={() => {
                    setActiveIdx(idx);
                    stageRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                >
                  {/* Step Pill */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md mb-4 sm:mb-6 font-mono text-[10px] sm:text-xs tracking-widest text-cyan-300">
                    <span>STEP {cap.step}</span>
                    <span className="text-neutral-500">{"//"}</span>
                    <span>{cap.tag}</span>
                  </div>

                  {/* Capability Title */}
                  <h3
                    style={{ fontFamily: "forma-djr-display, sans-serif" }}
                    className="text-2xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-[1.1] mb-4 sm:mb-6"
                  >
                    {cap.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-light leading-relaxed max-w-xl">
                    {cap.description}
                  </p>

                  {/* Quick Metrics Strip */}
                  <div className="mt-6 sm:mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-3">
                    {cap.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                          {m.label}
                        </div>
                        <div className="text-xs sm:text-sm font-mono font-medium text-cyan-200 mt-1">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE: FIXED / STICKY COMPONENT (LIGHT CREAM 3D SUBMARINE + OVERLYING CARD) */}
          <div className="order-first lg:order-last lg:col-span-6 lg:col-start-7 lg:sticky lg:top-24 sm:lg:top-28 z-20 w-full mt-28 sm:mt-36 lg:mt-0 pt-2 sm:pt-6 lg:pt-16">
            <div className="relative w-full">
              
              {/* FIXED 3D SUBMARINE IN LIGHT CREAM (Pinned with the card, does not scroll away!) */}
              <div className="absolute -top-[55px] sm:-top-[85px] lg:-top-[175px] right-[0%] sm:right-[2%] lg:right-[4%] w-[102%] sm:w-[114%] lg:w-[134%] max-w-[860px] aspect-[16/9] pointer-events-none select-none z-0">
                {/* Volumetric warm atmospheric depth glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/10 via-cyan-400/5 to-transparent blur-3xl opacity-70" />
                
                {/* 3D Light Cream Submarine with realistic buoyancy float (Separated transform and float) */}
                <div className="relative w-full h-full transform rotate-[-30deg] scale-x-[-1] transition-all duration-700">
                  <div className="relative w-full h-full cream-sub-float">
                    <Image
                      src="/images/submarine-cream.png"
                      alt="Aethel Hadal-Class Autonomous Submarine in Light Cream"
                      fill
                      className="object-contain filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.9)] drop-shadow-[0_0_20px_rgba(251,241,228,0.15)] brightness-[1.03] contrast-[1.05]"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* OVERLYING TACTICAL HUD CARD */}
              <div className="relative z-10 bg-[#0d111a]/95 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(6,182,212,0.1)] overflow-hidden transition-all duration-500">
              
              {/* Card Header Info */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                  <span className="font-mono text-[10px] sm:text-xs text-cyan-200 tracking-widest uppercase font-semibold">
                    TACTICAL SUBSYSTEM: {currentStage.step}
                  </span>
                </div>
                <span className="font-mono text-[10px] sm:text-xs text-neutral-400">
                  {currentStage.subtitle}
                </span>
              </div>

              {/* DYNAMIC VISUAL DISPLAY BASED ON ACTIVE LEFT SECTION */}
              <div className="relative aspect-[4/3] w-full bg-[#070a12] border border-white/[0.06] rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden">
                
                {/* 1. VISUAL FOR STAGE 01: GPS-DENIED NAVIGATION (Hex Tactical Path + Submarine) */}
                {activeIdx === 0 && (
                  <div className="relative w-full h-full flex items-center justify-center p-6 animate-fadeIn">
                    {/* SVG Hexagonal Tactical Grid and Nav Waypoint Path */}
                    <svg
                      viewBox="0 0 400 300"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 w-full h-full stroke-neutral-700/50 pointer-events-none"
                    >
                      {/* Hexagon 1 (Bottom Left) */}
                      <path
                        d="M100 230 L150 200 L150 140 L100 110 L50 140 L50 200 Z"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      {/* Hexagon 2 (Middle Center) */}
                      <path
                        d="M200 170 L250 140 L250 80 L200 50 L150 80 L150 140 Z"
                        strokeWidth="1.5"
                      />
                      {/* Hexagon 3 (Top Right) */}
                      <path
                        d="M300 110 L350 80 L350 20 L300 -10 L250 20 L250 80 Z"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />

                      {/* Tactical Nav Waypoint Route Arrow (Light Cyan Glowing) */}
                      <path
                        d="M100 230 L150 200 L150 140 L200 110 L250 110 L280 80"
                        stroke="#7dd3fc"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                      />
                      {/* Arrowhead */}
                      <polygon
                        points="280,73 294,80 280,87"
                        fill="#7dd3fc"
                        className="drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                      />
                    </svg>

                    {/* Submersible traversing the hex waypoint route */}
                    <div className="relative z-10 w-[200px] sm:w-[240px] aspect-[16/9] transform rotate-[-32deg] translate-x-4 translate-y-[-10px] filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]">
                      <Image
                        src="/image.png"
                        alt="Autonomous Submarine in Hex Grid"
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Inertial Navigation Telemetry Box */}
                    <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md border border-cyan-500/20 rounded-lg p-2.5 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-cyan-300 flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
                        AINS POSITION LOCK
                      </span>
                      <span className="text-neutral-400">LAT: 14°28&apos;N / LON: 142°12&apos;E</span>
                    </div>
                  </div>
                )}

                {/* 2. VISUAL FOR STAGE 02: ACOUSTIC LOW-OBSERVABILITY */}
                {activeIdx === 1 && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-6 animate-fadeIn">
                    <div className="text-[11px] font-mono text-neutral-400 mb-4 tracking-widest text-center">
                      HYDROPHONE AMBIENT SEA-STATE NOISE FLOOR (0.01 - 50 kHz)
                    </div>
                    {/* Simulated Acoustic Waveform / Null Bar */}
                    <div className="flex items-end justify-center gap-1 sm:gap-1.5 w-full h-24 px-4">
                      {[15, 22, 18, 25, 30, 18, 14, 20, 26, 12, 16, 24, 19, 15, 28, 17, 21, 14, 19, 25, 18, 12, 22, 16, 20].map((val, idx) => (
                        <div
                          key={idx}
                          className="flex-1 bg-gradient-to-t from-cyan-900/60 via-cyan-400 to-white rounded-t-sm transition-all duration-300"
                          style={{ height: `${val * 2}%` }}
                        />
                      ))}
                    </div>
                    {/* Stealth Limit Line */}
                    <div className="w-full mt-3 pt-3 border-t border-cyan-500/30 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-emerald-400 font-bold">&lt; 8.2 dB CAVITATION NULL</span>
                      <span className="text-cyan-300">SUB-THERMAL SPECTRUM</span>
                    </div>
                  </div>
                )}

                {/* 3. VISUAL FOR STAGE 03: AUTONOMOUS SWARM COORDINATION */}
                {activeIdx === 2 && (
                  <div className="relative w-full h-full flex items-center justify-center p-6 animate-fadeIn">
                    {/* SVG Mesh Topology */}
                    <svg viewBox="0 0 300 200" className="w-full h-full stroke-cyan-500/40">
                      <line x1="60" y1="100" x2="150" y2="50" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="150" y1="50" x2="240" y2="90" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="60" y1="100" x2="150" y2="150" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="150" y1="150" x2="240" y2="90" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="150" y1="50" x2="150" y2="150" strokeWidth="1.5" />
                      
                      {/* Node Circles */}
                      <circle cx="60" cy="100" r="8" fill="#06b6d4" className="animate-pulse" />
                      <circle cx="150" cy="50" r="10" fill="#22d3ee" />
                      <circle cx="240" cy="90" r="8" fill="#06b6d4" className="animate-pulse" />
                      <circle cx="150" cy="150" r="9" fill="#10b981" />
                    </svg>
                    <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md border border-cyan-500/20 rounded-lg p-2.5 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-cyan-300 flex items-center gap-1.5">
                        <Network className="w-3.5 h-3.5" />
                        DYNAMIC ACOUSTIC MESH
                      </span>
                      <span className="text-emerald-400">4 NODES SYNCED</span>
                    </div>
                  </div>
                )}

                {/* 4. VISUAL FOR STAGE 04: PERSISTENT DEEP-SEA ENDURANCE */}
                {activeIdx === 3 && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-6 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="bg-black/50 border border-white/10 rounded-xl p-3 text-center">
                        <div className="text-[10px] font-mono text-neutral-400">HULL STRESS</div>
                        <div className="text-xl font-forma text-white font-medium mt-1">18.4%</div>
                        <div className="text-[9px] font-mono text-emerald-400 mt-1">NOMINAL @ 600 BAR</div>
                      </div>
                      <div className="bg-black/50 border border-white/10 rounded-xl p-3 text-center">
                        <div className="text-[10px] font-mono text-neutral-400">ENERGY STORAGE</div>
                        <div className="text-xl font-forma text-cyan-300 font-medium mt-1">94.2%</div>
                        <div className="text-[9px] font-mono text-neutral-400 mt-1">78 DAYS REMAINING</div>
                      </div>
                    </div>
                    <div className="w-full mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <span>MONOLITHIC TI-6AL-4V</span>
                      <span className="text-cyan-400">AUTONOMOUS HARVEST READY</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Card Bottom Tactical Status Bar */}
              <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>AUTONOMOUS SYSTEM READY</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {CAPABILITIES.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => {
                        setActiveIdx(dotIdx);
                        stageRefs.current[dotIdx]?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        activeIdx === dotIdx ? "w-6 bg-cyan-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Jump to capability ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Dynamic Undersea Buoyancy Hover Animation */}
    <style>{`
      @keyframes subFloatOnly {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-8px);
        }
      }
      .cream-sub-float {
        animation: subFloatOnly 6s ease-in-out infinite;
        will-change: transform;
      }
    `}</style>
  </section>
  );
}
