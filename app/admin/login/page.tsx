"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  User,
  ShieldCheck,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Check if session already active, redirect to dashboard
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/admin/auth");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            router.replace("/admin/dashboard");
            return;
          }
        }
      } catch {
        // Not authenticated
      } finally {
        setIsCheckingSession(false);
      }
    }
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.replace("/admin/dashboard");
      } else {
        setError(data.error || "Authentication failed. Invalid username or password.");
      }
    } catch {
      setError("Unable to connect to security gateway. Verify backend service status.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-zinc-500 font-mono text-xs">
        <RefreshCw className="w-4 h-4 animate-spin mr-2 text-cyan-400" />
        <span>Verifying security credentials...</span>
      </div>
    );
  }

  return (
    <div
      style={{ colorScheme: "dark" }}
      className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col items-center justify-center p-4 sm:p-6 antialiased selection:bg-cyan-500/20 selection:text-cyan-200 relative overflow-hidden"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-cyan-500/8 via-blue-600/3 to-transparent blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-950/20 blur-[150px] rounded-full" />

      {/* Main Container Card */}
      <div className="w-full max-w-[420px] relative z-10">
        <div className="relative rounded-2xl border border-white/[0.08] bg-[#0b0f17]/90 p-8 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-cyan-500/40 before:to-transparent">
          {/* Brand Header */}
          <div className="mb-7">
            <div className="flex items-center gap-3 mb-4">
              {/* Precision Submarine Emblem */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 flex items-center justify-center shadow-inner">
                <svg
                  className="w-5 h-5 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Oceanic sonar / submarine silhouette */}
                  <path d="M2 13a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v4Z" />
                  <circle cx="10" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="15" cy="12" r="1.5" fill="currentColor" />
                  <path d="M12 5V2" />
                  <path d="M14 2h-4" />
                </svg>
              </div>

              <div>
                <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-cyan-400 block">
                  Aethel Oceanic
                </span>
                <span className="text-xs font-medium text-zinc-400 tracking-wide">
                  Admiralty Command
                </span>
              </div>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Sign in to Console
            </h1>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Authorized access portal for naval briefs, client inquiries, and system telemetry.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* Formal Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username / Operator ID */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Operator ID or Email
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  autoFocus
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  disabled={isLoading}
                  className="w-full h-11 pl-10 pr-3.5 rounded-lg bg-[#0e131f]/90 border border-white/[0.08] text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all font-mono disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-zinc-300">
                  Security Passcode
                </label>
                <span className="text-[10px] font-mono text-zinc-500">
                  256-bit Encrypted
                </span>
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="w-full h-11 pl-10 pr-10 rounded-lg bg-[#0e131f]/90 border border-white/[0.08] text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all font-mono disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-3 rounded-lg bg-white hover:bg-zinc-100 text-zinc-950 font-semibold text-xs tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg shadow-white/5 active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-zinc-800" />
                  <span>Verifying Clearance...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-zinc-800" />
                  <span>Authenticate & Enter</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Reference Note */}
          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>Operator: admin</span>
            <span className="text-zinc-400">submarine2026!</span>
          </div>
        </div>

        {/* Outer Navigation & Trust Badges */}
        <div className="mt-6 flex items-center justify-between text-xs text-zinc-500 px-1">
          <Link
            href="/"
            className="hover:text-zinc-200 transition-colors inline-flex items-center gap-1.5 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Return to website</span>
          </Link>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>PostgreSQL Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
