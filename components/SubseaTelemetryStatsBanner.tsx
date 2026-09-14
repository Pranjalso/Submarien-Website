import React from "react";
import { TelemetryStatItem } from "@/types";

interface SubseaTelemetryStatsBannerProps {
  onExploreStats?: () => void;
}

export const TELEMETRY_STATS: TelemetryStatItem[] = [
  {
    index: "01",
    category: "HYDROSTATIC ENVELOPE",
    value: "6,000",
    unit: "M",
    label: "MAX OPERATING DEPTH",
    description:
      "Tested to 600 bar hydrostatic pressure. Sustained deep-trench seafloor navigation with zero hull deformation.",
    metricHighlight: "HADAL ZONE QUALIFIED",
  },
  {
    index: "02",
    category: "ACOUSTIC SIGNATURE",
    value: "< 8.2",
    unit: "dB",
    label: "PASSIVE ACOUSTIC EMISSION",
    description:
      "Operates below ambient sea-state background noise threshold. Magnetic levitation drive with zero cavitation signature.",
    metricHighlight: "PASSIVE SONAR NULL",
  },
  {
    index: "03",
    category: "MISSION ENDURANCE",
    value: "72+",
    unit: "HRS",
    label: "CONTINUOUS SUBMERGED PATROL",
    description:
      "Autonomous ISR and payload deployment without human replenishment, atmospheric surfacing, or physical tether.",
    metricHighlight: "EXPEDITIONARY AUTONOMY",
  },
];

export default function SubseaTelemetryStatsBanner({ onExploreStats }: SubseaTelemetryStatsBannerProps) {
  return (
    <section
      id="water-quality"
      className="relative bg-[#02050b] text-white py-10 sm:py-14 lg:py-16 border-b border-white/[0.08] overflow-hidden z-20 select-none scroll-mt-20 w-full max-w-[100vw]"
    >
      {/* Background Accent Volumetric Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] lg:w-[900px] h-[220px] sm:h-[300px] lg:h-[350px] rounded-full bg-cyan-950/20 blur-[90px] sm:blur-[130px] lg:blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Top Technical Overline Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 pb-2.5 sm:pb-6 mb-4 sm:mb-8 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 rounded-none bg-cyan-400 shadow-[0_0_8px_#38bdf8] shrink-0" />
            <span className="text-[8.5px] sm:text-[11px] font-mono tracking-[0.14em] sm:tracking-[0.3em] uppercase text-zinc-400">
              WATER QUALITY &amp; OCEANOGRAPHIC TELEMETRY {"//"} OPERATIONAL ENVELOPE
            </span>
          </div>

          <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full border border-white/[0.08] bg-black/40 w-fit shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[8.5px] sm:text-[10px] font-mono tracking-widest text-emerald-300 uppercase font-medium">
              FLIGHT-TESTED & DEPLOYABLE
            </span>
          </div>
        </div>

        {/* 3 Monumental Statistical Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-8 lg:gap-12">
          {TELEMETRY_STATS.map((stat, idx) => (
            <div
              key={stat.index}
              onClick={() => {
                if (onExploreStats) onExploreStats();
              }}
              className={`flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:translate-y-[-2px] ${
                idx > 0
                  ? "border-t border-white/[0.08] pt-6 sm:pt-8 md:border-t-0 md:pt-0 md:border-l md:border-white/[0.08] md:pl-8 lg:pl-12"
                  : ""
              }`}
            >
              <div>
                {/* Index & Category Overline */}
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-4">
                  <span className="text-[8.5px] sm:text-[11px] font-mono tracking-[0.18em] sm:tracking-[0.25em] text-cyan-400 font-medium uppercase">
                    {stat.index} {"//"} {stat.category}
                  </span>
                  <span className="text-[8.5px] sm:text-[10px] font-mono tracking-widest text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    [TELEMETRY]
                  </span>
                </div>

                {/* Monumental Primary Number in Forma DJR Display */}
                <div className="flex items-baseline gap-2 my-1 sm:my-2">
                  <span
                    style={{ fontFamily: "forma-djr-display, sans-serif" }}
                    className="font-forma text-3xl min-[380px]:text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-none group-hover:text-cyan-100 transition-colors"
                  >
                    {stat.value}
                  </span>
                  <span className="text-sm min-[380px]:text-base sm:text-2xl font-mono text-cyan-400 font-normal tracking-wide">
                    {stat.unit}
                  </span>
                </div>

                {/* Subtitle / Technical Label */}
                <h4 className="text-xs sm:text-sm font-mono tracking-wider text-zinc-300 uppercase mt-4 mb-2">
                  {stat.label}
                </h4>

                {/* Narrative Description */}
                <p className="text-xs text-zinc-400 leading-relaxed font-light mt-1">
                  {stat.description}
                </p>
              </div>

              {/* Bottom Micro-Badge */}
              <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                <span className="text-[9px] font-mono tracking-widest text-cyan-300/80 uppercase">
                  {stat.metricHighlight}
                </span>
                <span className="text-[10px] font-mono text-zinc-600 group-hover:text-cyan-400 transition-colors">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
