"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NavLinkItem } from "@/types";

interface NavbarProps {
  currentRoute?: string;
  onNavClick?: () => void;
  onSelectCategory?: (category: string) => void;
}

export const NAV_LINKS: NavLinkItem[] = [
  { label: "Defense", href: "/defense", category: "Defense" },
  { label: "Serve", href: "/serve", category: "Serve" },
  { label: "Water Quality", href: "/water-quality", category: "Water Quality" },
  { label: "Sensing", href: "/sensing", category: "Sensing" },
];

export default function Navbar({ currentRoute = "/", onNavClick, onSelectCategory }: NavbarProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // When at the very top resting position, keep navbar visible
      if (currentScrollY <= 0) {
        setIsVisible(true);
        lastScrollY = 0;
        return;
      }

      const diff = currentScrollY - lastScrollY;
      if (Math.abs(diff) < 2) return;

      if (isMobileMenuOpen) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      if (diff > 10 && currentScrollY > 100) {
        setIsVisible(false);
      } else if (diff < -10) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLinkItem) => {
    setIsMobileMenuOpen(false);
    setIsVisible(true);
    if (onNavClick) onNavClick();

    if (link.href === "/defense" || link.href === "/serve" || link.href === "/water-quality" || link.href === "/sensing") {
      if (currentRoute === link.href) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (link.href.startsWith("#")) {
      const targetId = link.href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", link.href);
      } else if (currentRoute !== "/") {
        e.preventDefault();
        router.push("/" + link.href);
      }
    }
  };

  return (
    <>
      {/* Layout flow spacer to preserve exact hero heights and content alignment */}
      <div className="h-[57px] sm:h-[77px] w-full shrink-0 pointer-events-none" aria-hidden="true" />

      {/* Floating dynamic navbar: hides when scrolling down, shows when scrolling up */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] backdrop-blur-xl ${
          isMobileMenuOpen ? "bg-[#020610]" : "bg-black/80"
        } w-full transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "-translate-y-full"
        }`}
      >
        <div className="relative z-50 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-3.5 sm:py-5 flex items-center justify-between">
          {/* Brand Identity / Wordmark */}
          <Link
            href="/"
            onClick={(e) => {
              if (currentRoute === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2.5 sm:gap-3 group transition-transform active:scale-95 shrink-0"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_14px_#38bdf8] group-hover:scale-125 transition-transform" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-white uppercase group-hover:text-cyan-100 transition-colors">
              AETHEL
            </span>
          </Link>

          {/* Desktop Navigation Links + Action CTA */}
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] font-mono tracking-[0.18em] xl:tracking-[0.22em] text-zinc-300">
              {NAV_LINKS.map((link) => {
                const isActive = link.href === currentRoute;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`hover:text-white hover:text-cyan-200 transition-colors uppercase whitespace-nowrap cursor-pointer py-1 relative ${
                      isActive ? "text-cyan-300 font-bold" : "text-zinc-300"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {onSelectCategory && (
              <Button
                variant="tactical"
                size="sm"
                shape="pill"
                className="hidden sm:inline-flex shrink-0 font-bold"
                leftIcon={<span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse mr-0.5" />}
                onClick={() => {
                  if (onNavClick) onNavClick();
                  onSelectCategory("Defense");
                }}
              >
                REQUEST BRIEF
              </Button>
            )}

            {/* Mobile Menu Trigger - Crystal clear high-contrast white */}
            <button
              type="button"
              className="lg:hidden p-1.5 rounded-md text-white hover:text-cyan-300 focus:outline-none transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white hover:text-cyan-300 stroke-[2.5]" />
              ) : (
                <Menu className="w-6 h-6 text-white stroke-[2]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Backdrop strictly behind the header controls (z-30) */}
        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-30"
            aria-hidden="true"
          />
        )}

        {/* Mobile Dropdown Menu (Fully opaque solid background to prevent bleed-through) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden relative z-40 px-5 sm:px-8 py-5 bg-[#020610] flex flex-col gap-3 text-xs font-mono tracking-[0.2em] uppercase border-t border-b border-white/[0.1] shadow-[0_30px_60px_rgba(0,0,0,0.95)]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="py-2.5 px-3 rounded-lg text-zinc-200 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-cyan-400 text-xs">&rarr;</span>
              </Link>
            ))}
            {onSelectCategory && (
              <Button
                variant="primary"
                size="md"
                shape="pill"
                fullWidth
                className="mt-2 text-xs font-bold"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onNavClick) onNavClick();
                  onSelectCategory("Defense");
                }}
              >
                REQUEST BRIEF
              </Button>
            )}
          </div>
        )}
      </header>
    </>
  );
}
