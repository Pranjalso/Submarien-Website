"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Globe, Gauge, ShieldAlert, Wrench, HardDrive } from "lucide-react";

interface ServeGlobalReadinessProps {
  onOpenInquiry?: (category?: string) => void;
}

const THEATERS = [
  {
    name: "INDOPACOM DEEP BASIN",
    zone: "Marianas / Philippine Trench",
    status: "FORWARD DEPLOYED",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    depth: "6,000 m",
    platforms: "S12 Abyssal Cruiser x 4",
    uptime: "99.8%",
  },
  {
    name: "NORTH ATLANTIC GIUK GAP",
    zone: "Icelandic Ridge / Celtic Sea",
    status: "MISSION ACTIVE",
    statusColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    depth: "3,800 m",
    platforms: "Autonomous Swarm x 8",
    uptime: "99.5%",
  },
  {
    name: "ARCTIC LITTORAL MARGIN",
    zone: "Fram Strait / Barents Margin",
    status: "COLD-START CERTIFIED",
    statusColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    depth: "2,400 m",
    platforms: "S12 Cryo-Submersible x 2",
    uptime: "99.1%",
  },
  {
    name: "MEDITERRANEAN CHOKEPOINTS",
    zone: "Sicilian Channel / Aegean Trench",
    status: "SURVEILLANCE PATROL",
    statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    depth: "4,200 m",
    platforms: "Eyra Conformal Array x 6",
    uptime: "99.9%",
  },
];

const METRICS = [
  {
    value: "99.4%",
    label: "FLEET AVAILABILITY SLA",
    detail: "Mission-ready operational uptime verified under contractual availability guarantees.",
  },
  {
    value: "6,000 M",
    label: "HYDROSTATIC ENVELOPE",
    detail: "Pressure hull certified to 600 bar hydrostatic threshold in extreme hadal depths.",
  },
  {
    value: "< 36 HRS",
    label: "FORWARD DISPATCH",
    detail: "Rapid air-transportable ISO packaging ready for C-17 or commercial cargo loading.",
  },
  {
    value: "SS-5",
    label: "SEA-STATE 5 LAUNCH",
    detail: "Active-heave compensated umbilical allows deployment through 4.0m wave heights.",
  },
];

export default function ServeGlobalReadiness({ onOpenInquiry }: ServeGlobalReadinessProps) {
  return (
    <section
      id="readiness-specs"
      className="relative w-full bg-black text-white py-10 sm:py-14 lg:py-16 border-b border-white/[0.08] overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/[0.05] border border-white/[0.1] text-[10px] sm:text-xs font-mono tracking-[0.2em] text-cyan-400 uppercase mb-3">
            [ GLOBAL READINESS & OPERATIONAL SLA ]
          </div>
          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase text-white leading-tight"
            style={{ fontFamily: "forma-djr-display, sans-serif" }}
          >
            PERSISTENT MARITIME DOMINANCE. ZERO SYSTEMIC DOWNTIME.
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-zinc-400 font-sans mt-3 leading-relaxed">
            Our expeditionary service model pairs forward-deployed Line Replaceable Unit (LRU) logistics hubs with autonomous health monitoring to guarantee continuous operational presence.
          </p>
        </div>

        {/* 4 Big Benchmark Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-14">
          {METRICS.map((m, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 bg-zinc-950 border border-white/[0.08] rounded-none hover:border-cyan-500/30 transition-colors"
            >
              <div
                className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono text-white mb-2 tracking-tight"
                style={{ fontFamily: "forma-djr-display, sans-serif" }}
              >
                {m.value}
              </div>
              <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase mb-2">
                {m.label}
              </div>
              <div className="text-xs text-zinc-400 font-sans leading-relaxed">
                {m.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Operational Theaters & Lifecycle Support Dual Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Active Theater Grid (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-950/60 border border-white/[0.08] p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.08] mb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
                  OPERATIONAL THEATER READINESS MATRIX
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase">
                4 REGIONAL HUBS SYNCHRONIZED
              </span>
            </div>

            <div className="space-y-3">
              {THEATERS.map((theater, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-black/60 border border-white/[0.05] hover:border-white/[0.15] transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="text-xs sm:text-sm font-mono font-bold text-white uppercase">
                      {theater.name}
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 border ${theater.statusColor}`}
                    >
                      {theater.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono text-zinc-400">
                    <div>
                      <span className="text-zinc-400">ZONE:</span>{" "}
                      <span className="text-zinc-300">{theater.zone}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400">DEPTH:</span>{" "}
                      <span className="text-white">{theater.depth}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400">UPTIME:</span>{" "}
                      <span className="text-emerald-400">{theater.uptime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lifecycle Support Protocols (5 cols) */}
          <div className="lg:col-span-5 bg-zinc-950/60 border border-white/[0.08] p-5 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-4 border-b border-white/[0.08] mb-4">
                <ShieldAlert className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
                  FIELD SUSTAINMENT PROTOCOLS
                </span>
              </div>

              <ul className="space-y-4 text-xs font-sans text-zinc-300">
                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-none bg-white/[0.03] border border-white/[0.08] text-cyan-400 shrink-0 mt-0.5">
                    <Gauge className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-mono text-white font-semibold uppercase block mb-0.5">
                      Autonomous Health Telemetry
                    </span>
                    Real-time motor bearing vibration, thruster cavitation signatures, and pressure hull vacuum leakage constantly tracked.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-none bg-white/[0.03] border border-white/[0.08] text-emerald-400 shrink-0 mt-0.5">
                    <Wrench className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-mono text-white font-semibold uppercase block mb-0.5">
                      Pre-Positioned LRU Depot Spares
                    </span>
                    Forward stocks of swappable sonar arrays, solid-state battery packs, and communication buoys in allied deepwater ports.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-none bg-white/[0.03] border border-white/[0.08] text-amber-400 shrink-0 mt-0.5">
                    <HardDrive className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-mono text-white font-semibold uppercase block mb-0.5">
                      Expeditionary Field Engineers
                    </span>
                    Certified AETHEL marine technicians and subsea autonomy specialists accompany deployments for high-tempo surge operations.
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.08]">
              <Button
                variant="primary"
                size="md"
                shape="pill"
                fullWidth
                onClick={() => onOpenInquiry?.("Serve")}
              >
                <span className="hidden sm:inline">REQUEST MISSION SPECIFICATION</span>
                <span className="sm:hidden">REQUEST MISSION SPEC</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
