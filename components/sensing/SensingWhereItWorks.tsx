"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WhereItWorksCard {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const CARDS: WhereItWorksCard[] = [
  {
    id: "harbor-defense",
    title: "Harbor Defense",
    description: "Persistent acoustic monitoring of ports and anchorages. Tailor coverage to port geometry and threat profiles.",
    imageSrc: "/images/where-harbor-defense.jpg",
    imageAlt: "Container gantry cranes and shipping terminal at sunset representing harbor defense",
  },
  {
    id: "underwater-barrier",
    title: "Underwater Barrier Defense",
    description: "Distributed arrays across USVs or fixed nodes for persistent area monitoring.",
    imageSrc: "/images/where-barrier-dish.jpg",
    imageAlt: "Coastal telemetry satellite antenna station for persistent acoustic monitoring",
  },
  {
    id: "sentry-operations",
    title: "Sentry Operations",
    description: "Unattended acoustic barrier defense across chokepoints and high-value areas.",
    imageSrc: "/images/where-sentry-ship.jpg",
    imageAlt: "Naval patrol destroyer vessel conducting maritime sentry operations at twilight",
  },
  {
    id: "subsea-infrastructure",
    title: "Distributed Subsea Arrays",
    description: "Detection, classification, and continuous acoustic tracking of submersibles and underwater infrastructure.",
    imageSrc: "/images/where-subsea-cables.jpg",
    imageAlt: "Deep ocean autonomous inspection vehicle inspecting telecommunication cables on seabed",
  },
  {
    id: "littoral-recon",
    title: "Littoral Reconnaissance",
    description: "Autonomous hydro-acoustic transects and bathymetric obstacle profiling in shallow coastal waters.",
    imageSrc: "/images/mission-auv-wake.jpg",
    imageAlt: "Autonomous marine survey vehicle conducting littoral reconnaissance in ocean waters",
  },
];

export default function SensingWhereItWorks() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScrollability();
    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability);
    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    // Calculate card width + gap for precise snap slide
    const card = el.querySelector<HTMLDivElement>(".snap-center, .snap-start");
    const cardWidth = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="where-it-works" className="relative w-full bg-[#181818] text-white pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28 border-b border-white/[0.08] overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 min-[400px]:px-6 sm:px-8 md:px-12 lg:px-16 mb-8 sm:mb-12 text-center sm:text-left">
        {/* Monumental Section Title: Centered in the middle on small screens, left on larger */}
        <h2
          style={{ fontFamily: "forma-djr-display, sans-serif" }}
          className="text-4xl min-[420px]:text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] text-white font-normal tracking-[-0.03em] leading-none"
        >
          Where It Works
        </h2>
      </div>

      {/* Horizontal Carousel Slider */}
      <div className="relative w-full">
        <div
          ref={scrollContainerRef}
          className="flex flex-row items-stretch gap-4 sm:gap-6 overflow-x-auto scrollbar-none px-[8vw] min-[500px]:px-[16vw] sm:px-8 md:px-12 lg:px-16 pb-4 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="relative w-[84vw] min-[500px]:w-[68vw] sm:w-[50vw] md:w-[38vw] lg:w-[30vw] xl:w-[26vw] aspect-square shrink-0 snap-center sm:snap-start bg-[#121212] overflow-hidden group select-none transition-transform duration-500 hover:-translate-y-1 shadow-2xl"
            >
              {/* Background Operational Image */}
              <Image
                src={card.imageSrc}
                alt={card.imageAlt}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-105 brightness-95"
              />

              {/* Gradient Dark Scrim from Top-Down for Crisp Legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-transparent pointer-events-none" />

              {/* Text Content in Top-Left (or Centered on small screens for middle alignment) */}
              <div className="relative z-10 p-6 sm:p-7 md:p-8 flex flex-col justify-start max-w-[340px]">
                <h3
                  style={{ fontFamily: "forma-djr-display, sans-serif" }}
                  className="text-2xl sm:text-3xl text-white font-normal tracking-tight leading-[1.15] mb-2.5 sm:mb-3 drop-shadow-md"
                >
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-200/90 font-light leading-relaxed drop-shadow-sm">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Circular Centered Navigation Buttons (Matching Reference) */}
        <div className="flex items-center justify-center gap-3.5 mt-8 sm:mt-12">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous Slide"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 ${
              canScrollLeft
                ? "border-white/30 bg-black/60 text-white hover:bg-white hover:text-black active:scale-95 shadow-lg"
                : "border-white/10 bg-black/30 text-zinc-600 cursor-not-allowed opacity-40"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next Slide"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 ${
              canScrollRight
                ? "border-white/30 bg-black/60 text-white hover:bg-white hover:text-black active:scale-95 shadow-lg"
                : "border-white/10 bg-black/30 text-zinc-600 cursor-not-allowed opacity-40"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
