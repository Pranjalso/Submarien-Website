"use client";

import React from "react";

export function AethelMonogram({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor">
      {/* 4 angled geometric blocks forming the faceted double-chevron mark */}
      <rect x="10" y="8" width="13" height="26" rx="3.5" transform="rotate(-38 16.5 21)" />
      <rect x="10" y="30" width="13" height="26" rx="3.5" transform="rotate(-38 16.5 43)" />
      <rect x="29" y="8" width="13" height="26" rx="3.5" transform="rotate(-38 35.5 21)" />
      <rect x="29" y="30" width="13" height="26" rx="3.5" transform="rotate(-38 35.5 43)" />
    </svg>
  );
}

// Photorealistic 3D Forged Carbon & Titanium Marine Impeller / Propeller Fan Rotor
export default function RotatingPropellerRotor({ isHovered = false }: { isHovered?: boolean }) {
  const bladeAngles = [0, 51.4, 102.8, 154.3, 205.7, 257.1, 308.6];

  return (
    <div
      className="w-full h-full relative flex items-center justify-center pointer-events-none"
      style={{
        perspective: "650px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* 1. Deep Ducted Tunnel Cavity Backing - Seamlessly conceals static photo blades */}
      <div className="absolute inset-[1%] rounded-full bg-[#01040a] shadow-[inset_0_0_30px_rgba(0,0,0,0.99)] border border-white/[0.08]" />

      {/* 2. Internal Stator Guide Vane Shadow */}
      <div className="absolute inset-[5%] rounded-full border border-white/[0.06] pointer-events-none" />

      {/* 3. True 3D Perspective Tilted Impeller Rotor Assembly */}
      <div
        className={`w-full h-full relative ${
          isHovered ? "animate-propeller-spin-fast" : "animate-propeller-spin"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(-24deg) rotateX(-5deg)",
        }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full filter drop-shadow-[0_0_15px_rgba(0,0,0,0.95)]"
          fill="none"
        >
          <defs>
            {/* Aerospace Matte Carbon-Fiber Gradient */}
            <radialGradient id="carbonBladeGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="25%" stopColor="#334155" />
              <stop offset="60%" stopColor="#1e293b" />
              <stop offset="85%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Specular Titanium Leading-Edge Hydrofoil Highlight (Pure Metallic, No Blue) */}
            <linearGradient id="titaniumFoilGlint" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#e2e8f0" stopOpacity="0.85" />
              <stop offset="65%" stopColor="#94a3b8" stopOpacity="0.50" />
              <stop offset="100%" stopColor="#334155" stopOpacity="0.05" />
            </linearGradient>

            {/* 3D Directional Conical Hub Gradient (Key Light from Upper-Left) */}
            <radialGradient id="hubCone3D" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="28%" stopColor="#64748b" />
              <stop offset="70%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Subtle Hydrodynamic Rim Halo */}
            <radialGradient id="bladeVortexRing" cx="50%" cy="50%" r="50%">
              <stop offset="86%" stopColor="transparent" />
              <stop offset="96%" stopColor="rgba(255, 255, 255, 0.18)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Shroud Tip Clearance Ring */}
          <circle cx="100" cy="100" r="94" fill="url(#bladeVortexRing)" />

          {/* 7 High-Skew Swept Carbon Marine Impeller Blades */}
          {bladeAngles.map((deg, i) => (
            <g key={i} transform={`rotate(${deg} 100 100)`}>
              {/* Sculpted 3D Blade Profile */}
              <path
                d="M 100 100 C 116 72, 148 42, 136 15 C 120 9, 96 22, 84 52 C 76 74, 88 94, 100 100 Z"
                fill="url(#carbonBladeGrad)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="0.6"
              />
              {/* Razor Titanium Leading-Edge Specular Hydrofoil */}
              <path
                d="M 100 100 C 116 72, 148 42, 136 15"
                stroke="url(#titaniumFoilGlint)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Hydrodynamic Trailing-Edge Suction Shadow */}
              <path
                d="M 100 100 C 88 94, 76 74, 84 52"
                stroke="rgba(0,0,0,0.7)"
                strokeWidth="1.2"
              />
            </g>
          ))}

          {/* Hub Root Mounting Flange Ring */}
          <circle cx="100" cy="100" r="32" fill="#0b1120" stroke="#1e293b" strokeWidth="1.2" />

          {/* Aerodynamic Center Spinner Cone */}
          <circle cx="100" cy="100" r="24" fill="url(#hubCone3D)" stroke="#64748b" strokeWidth="1" />

          {/* Precision Lathe Concentric Micro-Ring & Directional Specular Reflection */}
          <circle cx="94" cy="94" r="7" fill="rgba(255,255,255,0.4)" />
          <circle cx="100" cy="100" r="14" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
        </svg>
      </div>
    </div>
  );
}
