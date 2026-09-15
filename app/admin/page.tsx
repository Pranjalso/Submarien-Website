"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuthAndRedirect() {
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
        // Fall through to login
      }
      router.replace("/admin/login");
    }

    checkAuthAndRedirect();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#050609] flex items-center justify-center">
      <div className="flex items-center gap-2.5 text-zinc-500 font-mono text-xs">
        <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
        <span>Routing to command console...</span>
      </div>
    </div>
  );
}
