"use client";

import React, { useState } from "react";
import DefenseHero from "@/components/defense/DefenseHero";
import DefenseWaterDemands from "@/components/defense/DefenseWaterDemands";
import DefenseRecentlySurfaced from "@/components/defense/DefenseRecentlySurfaced";
import DefenseMissionCallout from "@/components/defense/DefenseMissionCallout";
import SiteFooter from "@/components/SiteFooter";
import InquiryModal from "@/components/InquiryModal";
import { InquiryDomainCategory } from "@/types";

export default function DefensePage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryCategory, setInquiryCategory] = useState<InquiryDomainCategory>("Defense");

  const handleOpenInquiry = (category: InquiryDomainCategory = "Defense") => {
    setInquiryCategory(category);
    setIsInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#020610] text-white font-sans selection:bg-cyan-500/20 selection:text-cyan-200 overflow-x-clip">
      {/* 1. DEFENSE HERO SECTION WITH EMBEDDED NAV */}
      <DefenseHero onOpenInquiry={() => handleOpenInquiry("Defense")} />

      {/* 2. WHAT THE WATER DEMANDS - STICKY SUBMARINE CAPABILITIES */}
      <DefenseWaterDemands />

      {/* 3. RECENTLY SURFACED - DEFENSE INTELLIGENCE & DISPATCHES */}
      <DefenseRecentlySurfaced onOpenInquiry={handleOpenInquiry} />

      {/* 4. DEFENSE MISSION CALLOUT - AERIAL OCEAN THEATER */}
      <DefenseMissionCallout onOpenInquiry={handleOpenInquiry} />

      {/* 5. GLOBAL FOOTER WITH INQUIRY HANDLER */}
      <SiteFooter onOpenInquiry={handleOpenInquiry} />

      {/* 6. BACKEND-CONNECTED INQUIRY MODAL */}
      <InquiryModal
        key={inquiryCategory}
        isOpen={isInquiryModalOpen}
        initialCategory={inquiryCategory}
        onClose={handleCloseInquiry}
      />
    </main>
  );
}
