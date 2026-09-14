"use client";

import React, { useState } from "react";
import {
  Box,
  RefreshCw,
  Radio,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ServePillarsProps {
  onOpenInquiry?: (category?: string) => void;
}

const PILLARS = [
  {
    id: "01",
    tag: "STAGING & INTEGRATION",
    title: "Expeditionary Staging & VOO Deployment",
    icon: Box,
    badge: "RAPID MOBILIZATION",
    accentColor: "cyan",
    glowColor: "rgba(6, 182, 212, 0.25)",
    spotlightColor: "rgba(6, 182, 212, 0.16)",
    activeBorder: "border-cyan-400/80",
    hoverBorder: "hover:border-cyan-400/50",
    topGradient: "from-cyan-400 via-teal-300 to-transparent",
    iconBg: "bg-cyan-950/40 border-cyan-500/30 text-cyan-300 group-hover:bg-cyan-500/20 group-hover:border-cyan-400",
    badgeStyle: "bg-cyan-950/60 text-cyan-300 border-cyan-500/30",
    checkColor: "text-cyan-400",
    summary:
      "Rapid containerized mobilization allowing deployment from commercial tugs, auxiliary supply ships, or scientific vessels without structural drydock modification.",
    specs: [
      { label: "Mobilization Time", value: "< 4 Hours Pier-to-Dive" },
      { label: "Vessel Compatibility", value: "98% Commercial VOO" },
      { label: "Deck Footprint", value: "14.8 m² (Single ISO-20)" },
      { label: "LARS Operating Envelope", value: "Sea-State 5 Tested" },
    ],
    highlights: [
      "Drop-in active heave-compensated Launch and Recovery System (LARS)",
      "Zero permanent welding or hull modifications required on host vessel",
      "Autonomous dynamic positioning beacon tethering",
    ],
  },
  {
    id: "02",
    tag: "SUSTAINMENT & POWER",
    title: "Fleet Sustainment & 18-Min Hot Swap",
    icon: RefreshCw,
    badge: "ZERO DOWNTIME",
    accentColor: "emerald",
    glowColor: "rgba(16, 185, 129, 0.25)",
    spotlightColor: "rgba(16, 185, 129, 0.16)",
    activeBorder: "border-emerald-400/80",
    hoverBorder: "hover:border-emerald-400/50",
    topGradient: "from-emerald-400 via-teal-300 to-transparent",
    iconBg: "bg-emerald-950/40 border-emerald-500/30 text-emerald-300 group-hover:bg-emerald-500/20 group-hover:border-emerald-400",
    badgeStyle: "bg-emerald-950/60 text-emerald-300 border-emerald-500/30",
    checkColor: "text-emerald-400",
    summary:
      "Subsea mission cycles demand zero dockyard downtime. Modular power pods and sealed nitrogen-purged battery sleds restore 100% mission endurance in minutes.",
    specs: [
      { label: "Hot-Swap Turnaround", value: "18 Minutes Complete" },
      { label: "Cell Gravimetric Density", value: "720 Wh/kg Solid-State" },
      { label: "In-Theater Spares SLA", value: "24-Hour Forward Hub" },
      { label: "Seal Leak Diagnostics", value: "Vacuum Nitrogen Automated" },
    ],
    highlights: [
      "Sub-deck slide-lock battery carriage swappable under rolling seas",
      "Automated sensor calibration and acoustic baseline check on power-up",
      "Line-replaceable thrusters and conformal hydrophone pods",
    ],
  },
  {
    id: "03",
    tag: "EDGE COMMAND & RELAY",
    title: "Over-the-Horizon C2 & Telemetry Mesh",
    icon: Radio,
    badge: "SECURE C4ISR",
    accentColor: "indigo",
    glowColor: "rgba(99, 102, 241, 0.25)",
    spotlightColor: "rgba(99, 102, 241, 0.16)",
    activeBorder: "border-indigo-400/80",
    hoverBorder: "hover:border-indigo-400/50",
    topGradient: "from-indigo-400 via-cyan-300 to-transparent",
    iconBg: "bg-indigo-950/40 border-indigo-500/30 text-indigo-300 group-hover:bg-indigo-500/20 group-hover:border-indigo-400",
    badgeStyle: "bg-indigo-950/60 text-indigo-300 border-indigo-500/30",
    checkColor: "text-indigo-400",
    summary:
      "Persistent command loops across the thermocline. Deployable autonomous gateway buoys translate acoustic telemetry into encrypted SATCOM relays in real time.",
    specs: [
      { label: "Undersea Mesh Throughput", value: "128 kbps Low-Freq" },
      { label: "OTH Uplink Range", value: "Global LEO SATCOM" },
      { label: "Acoustic Burst Security", value: "Frequency-Hopping Low-Prob" },
      { label: "Command Relay Latency", value: "< 1.4s Surface to Hadal" },
    ],
    highlights: [
      "Zero surface RF footprint for submerged combatant units",
      "Bi-directional mission re-tasking while submerged at 4,000m+",
      "Automated contact handoff across distributed autonomous swarms",
    ],
  },
];

export default function ServePillars({ onOpenInquiry }: ServePillarsProps) {
  const [activePillar, setActivePillar] = useState<string>("01");
  const [mousePos, setMousePos] = useState<Record<string, { x: number; y: number }>>({});

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos((prev) => ({
      ...prev,
      [id]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  return (
    <section
      id="service-pillars"
      className="relative w-full bg-[#02050b] text-white py-12 sm:py-16 lg:py-20 border-b border-white/[0.08] overflow-visible"
    >
      {/* Background Volumetric Glow Ambient */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full bg-cyan-950/15 blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-teal-950/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/25 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-cyan-400 uppercase mb-3.5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              <span>SERVICE ARCHITECTURE // FIELD OPERATIONS</span>
            </div>

            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase text-white leading-tight"
              style={{ fontFamily: "forma-djr-display, sans-serif" }}
            >
              ENGINEERED FOR IMMEDIATE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-teal-300">
                MARITIME MOBILIZATION.
              </span>
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-zinc-400 font-sans mt-3 max-w-xl leading-relaxed">
              Eliminate dedicated submarine tender dependencies. AETHEL turnkey field operations bring sovereign deep-subsea capability to any commercial or naval platform.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              shape="pill"
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />}
              onClick={() => onOpenInquiry?.("Serve")}
            >
              INQUIRE LOGISTICS SUPPORT
            </Button>
          </div>
        </div>

        {/* 3 Ultra-Premium Animated Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-8 sm:pt-10">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = activePillar === pillar.id;
            const pos = mousePos[pillar.id] || { x: 200, y: 150 };

            return (
              <div
                key={pillar.id}
                onClick={() => {
                  setActivePillar(pillar.id);
                  onOpenInquiry?.(`Serve // ${pillar.title}`);
                }}
                onMouseMove={(e) => handleMouseMove(pillar.id, e)}
                className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#090e18]/90 via-[#050811]/90 to-[#020409]/95 border transition-all duration-500 ease-out cursor-pointer group select-none backdrop-blur-xl overflow-hidden hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ${
                  isSelected
                    ? `${pillar.activeBorder} shadow-[0_0_35px_${pillar.glowColor}]`
                    : `border-white/[0.09] ${pillar.hoverBorder}`
                }`}
                style={{
                  boxShadow: isSelected
                    ? `0 0 30px ${pillar.glowColor}, inset 0 1px 0 0 rgba(255, 255, 255, 0.12)`
                    : "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
                }}
              >
                {/* 1. Dynamic Interactive Cursor Spotlight Beam */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                  style={{
                    background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${pillar.spotlightColor}, transparent 80%)`,
                  }}
                />

                {/* 2. Top Luminous Accent Laser Stripe */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${pillar.topGradient} opacity-70 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* 3. Subtle Corner Tactical Reticle Crosshairs */}
                <span className="absolute top-2.5 left-2.5 text-[9px] font-mono text-white/20 group-hover:text-cyan-400/60 transition-colors pointer-events-none">
                  +
                </span>
                <span className="absolute top-2.5 right-2.5 text-[9px] font-mono text-white/20 group-hover:text-cyan-400/60 transition-colors pointer-events-none">
                  +
                </span>

                {/* Card Header Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                        {pillar.id}
                      </span>
                      <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase font-semibold">
                        {pillar.tag}
                      </span>
                    </div>

                    {/* Icon Capsule with Micro-Animation */}
                    <div
                      className={`p-2.5 rounded-xl border transition-all duration-300 shadow-sm ${pillar.iconBg}`}
                    >
                      <Icon className="w-4 h-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl sm:text-2xl font-bold uppercase text-white mb-3 tracking-tight group-hover:text-cyan-100 transition-colors duration-300 leading-snug"
                    style={{ fontFamily: "forma-djr-display, sans-serif" }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-zinc-300/90 font-sans leading-relaxed mb-6 font-light">
                    {pillar.summary}
                  </p>

                  {/* Spec Sheet Table - Enhanced HUD Style */}
                  <div className="space-y-2 py-3.5 px-3 rounded-xl bg-black/40 border border-white/[0.06] mb-6 backdrop-blur-md group-hover:border-white/[0.12] transition-colors">
                    {pillar.specs.map((s, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs font-mono py-0.5"
                      >
                        <span className="text-zinc-400 text-[11px]">{s.label}:</span>
                        <span className="text-zinc-200 font-medium text-right text-[11px] group-hover:text-white transition-colors">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 mb-8">
                    {pillar.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300 font-light">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110 ${pillar.checkColor}`}
                        />
                        <span className="leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Footer Action Indicator */}
                <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-semibold group-hover:text-zinc-200 transition-colors">
                      READINESS VERIFIED
                    </span>
                  </div>

                  {/* Micro CTA Button */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-cyan-300 group-hover:text-white group-hover:border-cyan-400/50 group-hover:bg-cyan-950/40 transition-all duration-300 shadow-sm">
                    <span className="text-[10px] tracking-wider uppercase font-semibold">DETAILS</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
