"use client";

import React, { useState } from "react";
import SensingHero from "@/components/sensing/SensingHero";
import SensingWhereItWorks from "@/components/sensing/SensingWhereItWorks";
import SensingWhatWeOffer from "@/components/sensing/SensingWhatWeOffer";
import SensingBenefits from "@/components/sensing/SensingBenefits";
import SiteFooter from "@/components/SiteFooter";
import InquiryModal from "@/components/InquiryModal";
import { InquiryDomainCategory } from "@/types";

export default function SensingPage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryCategory, setInquiryCategory] = useState<InquiryDomainCategory>("Sensing");

  const handleOpenInquiry = (category: InquiryDomainCategory = "Sensing") => {
    setInquiryCategory(category);
    setIsInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#010712] text-white font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* 1. SENSING HERO SECTION WITH VIDEO BACKGROUND & EMBEDDED NAV */}
      <SensingHero onOpenInquiry={handleOpenInquiry} />

      {/* 2. WHERE IT WORKS HORIZONTAL SLIDER SECTION */}
      <SensingWhereItWorks />

      {/* 3. WHAT WE OFFER SECTION WITH 3D WHITE SUBMARINE OVERLAY */}
      <SensingWhatWeOffer />

      {/* 4. SENSING BENEFITS & CAPABILITIES SECTION */}
      <SensingBenefits />

      {/* 5. GLOBAL FOOTER */}
      <SiteFooter onOpenInquiry={handleOpenInquiry} />

      {/* 6. CONNECTED INQUIRY MODAL PRE-SET TO SENSING */}
      <InquiryModal
        key={inquiryCategory}
        isOpen={isInquiryModalOpen}
        initialCategory={inquiryCategory}
        onClose={handleCloseInquiry}
      />
    </main>
  );
}
