"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { InquiryConfirmation, InquiryDomainCategory, ApiResponse } from "@/types";

interface InquiryModalProps {
  isOpen: boolean;
  initialCategory?: string;
  onClose: () => void;
}

export const INQUIRY_CATEGORIES: InquiryDomainCategory[] = [
  "Defense",
  "Surveillance",
  "Sensing",
  "Water Quality",
  "Serve",
  "Flagship Architecture & Subsystems",
  "Arrays & Acoustic Sensors",
  "Subsea Operational Telemetry & Architecture",
  "Mission Operations & Fleet Deployment",
  "Custom Tactical Configuration",
];

export default function InquiryModal({ isOpen, initialCategory, onClose }: InquiryModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [category, setCategory] = useState<InquiryDomainCategory>(
    (initialCategory as InquiryDomainCategory) || "Flagship Architecture & Subsystems"
  );
  const [missionScope, setMissionScope] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<InquiryConfirmation | null>(null);

  const handleClose = useCallback(() => {
    setConfirmation(null);
    setErrorMessage(null);
    setIsSubmitting(false);
    setFullName("");
    setEmail("");
    setOrganization("");
    setMissionScope("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    // Prevent background page scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Close on Escape key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          organization,
          category,
          missionScope,
        }),
      });

      const data: ApiResponse<InquiryConfirmation> = await response.json();

      if (!response.ok || !data.success || !data.data) {
        throw new Error(data.error || "Failed to submit request. Please verify fields and retry.");
      }

      setConfirmation(data.data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected network error occurred.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[92dvh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-zinc-950 border border-cyan-500/25 p-4 sm:p-8 md:p-10 shadow-[0_0_60px_rgba(6,182,212,0.15)]"
      >
        {/* Top Glowing Laser Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

        {/* Modal Close Button */}
        <Button
          variant="ghost"
          size="icon"
          shape="pill"
          onClick={handleClose}
          className="absolute top-3.5 sm:top-6 right-3.5 sm:right-6 text-zinc-400 hover:text-white z-20 min-w-[36px] min-h-[36px] sm:min-w-[42px] sm:min-h-[42px]"
          aria-label="Close Inquiry Modal"
        >
          <X className="w-5 h-5" />
        </Button>

        {confirmation ? (
          /* Confirmation Success Screen */
          <div className="text-center py-8 sm:py-10 space-y-4">
            <div className="w-12 h-12 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center mx-auto mb-4 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Check className="w-6 h-6" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Brief Request Transmitted
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
              Our maritime systems autonomy team has logged your operational request. You will receive encrypted capability documentation at <span className="text-cyan-300 font-mono">{email}</span>.
            </p>

            <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-left font-mono text-[11px] text-zinc-400 max-w-xs mx-auto space-y-1">
              <div><span className="text-zinc-500">REF:</span> <span className="text-white">{confirmation.inquiryId}</span></div>
              <div><span className="text-zinc-500">CATEGORY:</span> <span className="text-cyan-300">{confirmation.category}</span></div>
              <div><span className="text-zinc-500">STATUS:</span> <span className="text-emerald-400 font-bold">{confirmation.status}</span></div>
            </div>

            <Button
              variant="primary"
              size="md"
              shape="pill"
              onClick={handleClose}
              className="mt-5 sm:mt-6"
            >
              Close Window
            </Button>
          </div>
        ) : (
          /* Input Form */
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] sm:tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 uppercase block mb-1.5 sm:mb-2 font-semibold">
              CONFIDENTIAL INQUIRY
            </span>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
              Request Capability Brief
            </h3>

            <p className="text-xs text-zinc-400 mb-5 sm:mb-6 leading-relaxed">
              Submit operational criteria for defense swarms, subsea surveillance, acoustic arrays, bathymetric sensing, or fleet integration.
            </p>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Commander / Director"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white text-[16px] sm:text-xs focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
                    Official Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.mil / .com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white text-[16px] sm:text-xs focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
                  Organization / Agency *
                </label>
                <input
                  required
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Ministry of Defense / Maritime Security / Allied Command"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white text-[16px] sm:text-xs focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
                  Primary Domain of Interest
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white text-[16px] sm:text-xs focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all cursor-pointer"
                >
                  {INQUIRY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
                  Mission Objectives & Operational Scope
                </label>
                <textarea
                  rows={3}
                  value={missionScope}
                  onChange={(e) => setMissionScope(e.target.value)}
                  placeholder="Specify mission depth, endurance requirements, sensor packages, or theater parameters..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white text-[16px] sm:text-xs focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                shape="pill"
                fullWidth
                isLoading={isSubmitting}
                className="mt-4"
              >
                {isSubmitting ? "Transmitting Encrypted Request..." : "Transmit Request"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
