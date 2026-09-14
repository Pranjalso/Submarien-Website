"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "solid"
  | "tactical"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "icon";
export type ButtonShape = "pill" | "rounded" | "square";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  // Luminous White/Cyan Primary CTA with high-impact sheen
  primary:
    "relative text-slate-950 font-bold bg-gradient-to-r from-white via-cyan-50 to-teal-100 hover:from-white hover:to-cyan-200 border border-white/80 shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.55)] active:scale-[0.98]",

  // Stark Industrial Solid High-Contrast
  solid:
    "bg-white text-black font-bold hover:bg-cyan-300 hover:text-black border border-white shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] active:scale-[0.98]",

  // Deep Undersea Tactical Cyber Button
  tactical:
    "bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-400/50 hover:border-cyan-300 text-cyan-200 hover:text-white shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] active:scale-[0.98]",

  // Dark Frosted Glass Secondary
  secondary:
    "bg-black/40 hover:bg-black/60 border border-white/20 hover:border-cyan-400/60 text-zinc-300 hover:text-white backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-[0.98]",

  // Subtle Translucent Outline
  outline:
    "bg-white/[0.04] hover:bg-white/[0.09] text-white border border-white/[0.14] hover:border-white/[0.3] backdrop-blur-sm active:scale-[0.98]",

  // Ghost Interactive Hover
  ghost:
    "bg-transparent text-zinc-400 hover:text-white hover:bg-white/[0.06] active:scale-[0.98]",

  // Alert Interdiction / Warning
  danger:
    "bg-red-950/60 hover:bg-red-900/80 border border-red-500/40 text-red-200 hover:text-white shadow-[0_0_15px_rgba(239,68,68,0.2)] active:scale-[0.98]",
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: "text-[9px] sm:text-[10px] px-2.5 py-1 min-h-[26px] sm:min-h-[28px] gap-1.5 font-mono tracking-[0.08em] sm:tracking-wider",
  sm: "text-[10px] sm:text-[11px] px-3 py-1.5 sm:px-4 sm:py-2 min-h-[30px] sm:min-h-[34px] gap-1.5 sm:gap-2 font-mono tracking-[0.1em] sm:tracking-[0.16em]",
  md: "text-[10px] min-[380px]:text-[11px] sm:text-xs px-3 min-[380px]:px-4 sm:px-6 py-1.5 min-[380px]:py-2 sm:py-2.5 min-h-[32px] min-[380px]:min-h-[36px] sm:min-h-[42px] gap-1.5 sm:gap-2 font-mono tracking-[0.08em] sm:tracking-[0.18em]",
  lg: "text-[11px] sm:text-sm px-4 sm:px-7 py-2.5 sm:py-3.5 min-h-[38px] sm:min-h-[46px] gap-2 font-mono tracking-[0.1em] sm:tracking-[0.18em]",
  xl: "text-xs sm:text-base px-5 sm:px-9 py-3 sm:py-4 min-h-[42px] sm:min-h-[52px] gap-2.5 font-mono tracking-[0.12em] sm:tracking-[0.2em]",
  icon: "p-1.5 sm:p-2 min-w-[34px] min-h-[34px] sm:min-w-[40px] sm:min-h-[40px] justify-center",
};

const shapeStyles: Record<ButtonShape, string> = {
  pill: "rounded-full",
  rounded: "rounded-xl",
  square: "rounded-none",
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      shape = "pill",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      href,
      target,
      rel,
      className,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center font-medium uppercase transition-all duration-200 select-none cursor-pointer shrink-0 text-center whitespace-nowrap",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100",
      variantStyles[variant],
      sizeStyles[size],
      shapeStyles[shape],
      fullWidth && "w-full",
      className
    );

    const content = (
      <>
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0 text-current" />
        ) : (
          leftIcon && <span className="shrink-0 flex items-center">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && (
          <span className="shrink-0 flex items-center">{rightIcon}</span>
        )}
      </>
    );

    // If an href is supplied, render as Link
    if (href) {
      const isExternal = href.startsWith("http://") || href.startsWith("https://");
      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target={target || "_blank"}
            rel={rel || "noopener noreferrer"}
            className={baseClasses}
            aria-disabled={disabled || isLoading}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {content}
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={baseClasses}
          aria-disabled={disabled || isLoading}
          onClick={(e) => {
            if (disabled || isLoading) {
              e.preventDefault();
              return;
            }
            if (props.onClick) {
              props.onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
            }
            if (href.startsWith("#")) {
              const targetId = href.slice(1);
              const targetEl = document.getElementById(targetId);
              if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                window.history.pushState(null, "", href);
              }
            }
          }}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={baseClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
