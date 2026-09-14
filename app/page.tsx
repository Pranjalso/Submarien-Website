"use client";

import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import ArraysShowcaseSection from "@/components/ArraysShowcaseSection";
import AbyssalFlagshipCardSection from "@/components/AbyssalFlagshipCardSection";
import SubseaTelemetryStatsBanner from "@/components/SubseaTelemetryStatsBanner";
import UnderseaMissionVideoSection from "@/components/UnderseaMissionVideoSection";
import SiteFooter from "@/components/SiteFooter";
import InquiryModal from "@/components/InquiryModal";
import { InquiryDomainCategory } from "@/types";

export default function Home() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryCategory, setInquiryCategory] = useState<InquiryDomainCategory>(
    "Flagship Architecture & Subsystems"
  );

  const handleOpenInquiry = (category?: InquiryDomainCategory) => {
    if (category) setInquiryCategory(category);
    setIsInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white font-sans selection:bg-cyan-500/20 selection:text-cyan-200 overflow-x-clip">
      {/* 1. CINEMATIC HERO SECTION WITH TOP NAV & VIDEO */}
      <HeroSection onOpenInquiry={handleOpenInquiry} />

      {/* 2. ACOUSTIC SUPREMACY MANIFESTO */}
      <ManifestoSection />

      {/* 3. ACOUSTIC INTELLIGENCE ARRAYS SHOWCASE */}
      <ArraysShowcaseSection
        onExploreArrays={() => handleOpenInquiry("Surveillance")}
      />

      {/* 4. MONUMENTAL ABYSSAL FLAGSHIP SUBMERSIBLE */}
      <AbyssalFlagshipCardSection
        onRequestBrief={() => handleOpenInquiry("Sensing")}
      />

      {/* 5. SUBSEA TELEMETRY 3-STATS TRANSITION BANNER */}
      <SubseaTelemetryStatsBanner
        onExploreStats={() => handleOpenInquiry("Water Quality")}
      />

      {/* 6. BUILT FOR THE MISSION — CINEMATIC UNDERSEA VIDEO SECTION */}
      <UnderseaMissionVideoSection
        onExploreMission={() => handleOpenInquiry("Defense")}
      />

      {/* 7. CINEMATIC DEFENSE-GRADE FOOTER */}
      <SiteFooter onOpenInquiry={handleOpenInquiry} />

      {/* 8. BACKEND-CONNECTED INQUIRY MODAL */}
      <InquiryModal
        key={inquiryCategory}
        isOpen={isInquiryModalOpen}
        initialCategory={inquiryCategory}
        onClose={handleCloseInquiry}
      />
    </main>
  );
}
