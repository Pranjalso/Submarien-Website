"use client";

import React, { useState, useRef } from "react";
import ServeHero from "@/components/serve/ServeHero";
import ServePillars from "@/components/serve/ServePillars";
import ServeGlobalReadiness from "@/components/serve/ServeGlobalReadiness";
import ServeDeploymentCallout from "@/components/serve/ServeDeploymentCallout";
import ServeAnimatedSubmarine from "@/components/serve/ServeAnimatedSubmarine";
import SiteFooter from "@/components/SiteFooter";
import InquiryModal from "@/components/InquiryModal";
import { InquiryDomainCategory } from "@/types";

export default function ServePage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryCategory, setInquiryCategory] = useState<InquiryDomainCategory>("Serve");
  const journeyContainerRef = useRef<HTMLDivElement | null>(null);

  const handleOpenInquiry = (category: InquiryDomainCategory = "Serve") => {
    setInquiryCategory(category);
    setIsInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#020610] text-white font-sans selection:bg-cyan-500/20 selection:text-cyan-200 overflow-x-clip">
      {/* 1. SERVE HERO SECTION WITH EMBEDDED NAV */}
      <ServeHero onOpenInquiry={handleOpenInquiry} />

      {/* 2 & 3. THREE SERVICE ARCHITECTURE PILLARS + GLOBAL READINESS WITH CONTINUOUS CONNECTING SUBMARINE DIVE */}
      <div ref={journeyContainerRef} className="relative overflow-visible">
        {/* Animated Submarine that starts over Step 1 top-right and glides to next section's right side */}
        <ServeAnimatedSubmarine containerRef={journeyContainerRef} />
        
        <ServePillars onOpenInquiry={handleOpenInquiry} />
        <ServeGlobalReadiness onOpenInquiry={handleOpenInquiry} />
      </div>

      {/* 4. EXPEDITIONARY MARITIME THEATER CALLOUT */}
      <ServeDeploymentCallout onOpenInquiry={handleOpenInquiry} />

      {/* 5. GLOBAL FOOTER WITH INQUIRY HANDLER */}
      <SiteFooter onOpenInquiry={handleOpenInquiry} />

      {/* 6. INQUIRY MODAL PRE-CONFIGURED FOR SERVE / READINESS */}
      <InquiryModal
        key={inquiryCategory}
        isOpen={isInquiryModalOpen}
        initialCategory={inquiryCategory}
        onClose={handleCloseInquiry}
      />
    </main>
  );
}
