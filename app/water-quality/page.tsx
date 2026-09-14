"use client";

import React, { useState } from "react";
import WaterQualityHero from "@/components/water-quality/WaterQualityHero";
import WaterQualitySubmarineScan from "@/components/water-quality/WaterQualitySubmarineScan";
import WaterQualityMissionSection from "@/components/water-quality/WaterQualityMissionSection";
import WaterQualityDesignedForMission from "@/components/water-quality/WaterQualityDesignedForMission";
import SiteFooter from "@/components/SiteFooter";
import InquiryModal from "@/components/InquiryModal";
import { InquiryDomainCategory } from "@/types";

export default function WaterQualityPage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryCategory, setInquiryCategory] = useState<InquiryDomainCategory>("Water Quality");

  const handleOpenInquiry = (category: InquiryDomainCategory = "Water Quality") => {
    setInquiryCategory(category);
    setIsInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#010712] text-white font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* 1. HERO SECTION WITH OCEAN WATER BACKGROUND VIDEO & NAV */}
      <WaterQualityHero onOpenInquiry={handleOpenInquiry} />

      {/* 2. CENTERPIECE INTERACTIVE SUBMARINE WATER QUALITY SCANNER */}
      <WaterQualitySubmarineScan onOpenInquiry={handleOpenInquiry} />

      {/* 3. EDITORIAL MISSION STATEMENT OVER AERIAL COASTAL BACKGROUND */}
      <WaterQualityMissionSection />

      {/* 4. DESIGNED FOR THE MISSION: 3-PHOTO EDITORIAL WATER QUALITY GRID */}
      <WaterQualityDesignedForMission />

      {/* 5. GLOBAL FOOTER WITH REAL-TIME CAVITATION PARTICLES */}
      <SiteFooter onOpenInquiry={handleOpenInquiry} />

      {/* 7. CONNECTED INQUIRY MODAL PRE-SET TO WATER QUALITY */}
      <InquiryModal
        key={inquiryCategory}
        isOpen={isInquiryModalOpen}
        initialCategory={inquiryCategory}
        onClose={handleCloseInquiry}
      />
    </main>
  );
}
