"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  RefreshCw,
  Download,
  ArrowLeft,
  LogOut,
  Copy,
  X,
  Trash2,
  ChevronDown,
  Mail,
  CheckCircle2,
} from "lucide-react";

interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: "ADMIN" | "OPERATOR" | "ANALYST";
}

interface InquiryRecord {
  id: string;
  reference_id: string;
  full_name: string;
  email: string;
  organization: string;
  category: string;
  mission_scope: string;
  status: "RECEIVED" | "UNDER_REVIEW" | "PROCESSING" | "DISPATCHED" | "ARCHIVED";
  ip_address?: string | null;
  user_agent?: string | null;
  created_at: string;
  updated_at: string;
}

const CATEGORIES = [
  "All Categories",
  "Flagship Architecture & Subsystems",
  "Defense",
  "Surveillance",
  "Sensing",
  "Water Quality",
  "Serve",
  "Arrays & Acoustic Sensors",
];

const STATUS_CONFIG: Record<
  InquiryRecord["status"],
  { label: string; dot: string; text: string; bg: string }
> = {
  RECEIVED: {
    label: "Received",
    dot: "bg-amber-400",
    text: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
  },
  UNDER_REVIEW: {
    label: "Under Review",
    dot: "bg-blue-400",
    text: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
  PROCESSING: {
    label: "Processing",
    dot: "bg-indigo-400",
    text: "text-indigo-400",
    bg: "bg-indigo-400/10 border-indigo-400/20",
  },
  DISPATCHED: {
    label: "Dispatched",
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
  },
  ARCHIVED: {
    label: "Archived",
    dot: "bg-zinc-400",
    text: "text-zinc-400",
    bg: "bg-zinc-400/10 border-zinc-400/20",
  },
};

export default function AdminDashboardPage() {
  const router = useRouter();

  // State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // Overlays
  const [activeInquiry, setActiveInquiry] = useState<InquiryRecord | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<InquiryRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  // 1. Session check
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/auth");
      const data = await res.json();
      if (data.authenticated === true && data.user) {
        setCurrentUser(data.user);
        setIsAuthLoading(false);
      } else {
        router.replace("/admin/login");
      }
    } catch {
      router.replace("/admin/login");
    }
  }, [router]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAuth();
  }, [checkAuth]);

  // 2. Fetch live data
  const fetchInquiries = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const res = await fetch("/api/inquiries?page=1&limit=200");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setInquiries(json.data);
        }
      } else if (res.status === 401) {
        router.replace("/admin/login");
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      if (!silent) setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!isAuthLoading && currentUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchInquiries();
    }
  }, [isAuthLoading, currentUser, fetchInquiries]);

  // Auto-refresh every 20 seconds
  useEffect(() => {
    if (isAuthLoading) return;
    const interval = setInterval(() => {
      fetchInquiries(true);
    }, 20000);
    return () => clearInterval(interval);
  }, [isAuthLoading, fetchInquiries]);

  // 3. Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setCurrentUser(null);
      setInquiries([]);
      router.replace("/admin/login");
    }
  };

  // 4. Update status
  const handleUpdateStatus = async (
    referenceId: string,
    newStatus: InquiryRecord["status"]
  ) => {
    setInquiries((prev) =>
      prev.map((item) =>
        item.reference_id === referenceId ? { ...item, status: newStatus } : item
      )
    );
    if (activeInquiry?.reference_id === referenceId) {
      setActiveInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      const res = await fetch(`/api/inquiries/${encodeURIComponent(referenceId)}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        showToast(`Status updated to ${STATUS_CONFIG[newStatus].label}`);
      } else {
        fetchInquiries(true);
        showToast("Failed to update status");
      }
    } catch {
      fetchInquiries(true);
      showToast("Network error updating status");
    }
  };

  // 5. Delete inquiry
  const handleDeleteInquiry = async () => {
    if (!deleteCandidate) return;
    setIsDeleting(true);
    const ref = deleteCandidate.reference_id;

    try {
      const res = await fetch(`/api/inquiries/${encodeURIComponent(ref)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.reference_id !== ref));
        if (activeInquiry?.reference_id === ref) setActiveInquiry(null);
        setDeleteCandidate(null);
        showToast(`Deleted ${ref}`);
      }
    } catch {
      showToast("Failed to delete");
    } finally {
      setIsDeleting(false);
    }
  };

  // 6. CSV Export
  const handleExportCSV = () => {
    if (!filteredInquiries.length) return;
    const headers = ["Reference ID", "Date", "Name", "Email", "Organization", "Category", "Status", "Message"];
    const rows = filteredInquiries.map((i) => [
      `"${i.reference_id}"`,
      `"${new Date(i.created_at).toISOString()}"`,
      `"${(i.full_name || "").replace(/"/g, '""')}"`,
      `"${(i.email || "").replace(/"/g, '""')}"`,
      `"${(i.organization || "").replace(/"/g, '""')}"`,
      `"${(i.category || "").replace(/"/g, '""')}"`,
      `"${i.status}"`,
      `"${(i.mission_scope || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV file exported");
  };

  // Filtered inquiries
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const filteredInquiries = useMemo(() => {
    return inquiries
      .filter((i) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = (i.full_name || "").toLowerCase().includes(q);
          const matchEmail = (i.email || "").toLowerCase().includes(q);
          const matchOrg = (i.organization || "").toLowerCase().includes(q);
          const matchRef = (i.reference_id || "").toLowerCase().includes(q);
          if (!matchName && !matchEmail && !matchOrg && !matchRef) return false;
        }
        if (selectedCategory !== "All Categories" && i.category !== selectedCategory) {
          return false;
        }
        if (selectedStatus !== "ALL" && i.status !== selectedStatus) {
          return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [inquiries, searchQuery, selectedCategory, selectedStatus]);

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      ALL: inquiries.length,
      RECEIVED: inquiries.filter((i) => i.status === "RECEIVED").length,
      UNDER_REVIEW: inquiries.filter((i) => i.status === "UNDER_REVIEW").length,
      PROCESSING: inquiries.filter((i) => i.status === "PROCESSING").length,
      DISPATCHED: inquiries.filter((i) => i.status === "DISPATCHED").length,
      ARCHIVED: inquiries.filter((i) => i.status === "ARCHIVED").length,
    };
  }, [inquiries]);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-mono text-xs">
        <RefreshCw className="w-3.5 h-3.5 animate-spin mr-2 text-zinc-400" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white">
      {/* Toast Feedback */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 shadow-xl animate-in fade-in">
          <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* 1. Header */}
      <header className="border-b border-zinc-900 bg-black/90 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Website</span>
            </Link>
            <span className="text-zinc-800">/</span>
            <span className="text-sm font-medium text-white">Inquiries</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                fetchInquiries();
                showToast("Refreshed");
              }}
              title="Refresh"
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-900 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleExportCSV}
              disabled={filteredInquiries.length === 0}
              className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-zinc-900 transition-colors flex items-center gap-1 disabled:opacity-30"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            <button
              onClick={handleLogout}
              className="text-xs text-zinc-500 hover:text-red-400 px-2 py-1 rounded hover:bg-zinc-900 transition-colors flex items-center gap-1 ml-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Status Strip & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-2 border-b border-zinc-900">
          {/* Status Tabs */}
          <div className="flex items-center gap-4 overflow-x-auto text-xs scrollbar-none">
            {[
              { id: "ALL", label: "All", count: counts.ALL },
              { id: "RECEIVED", label: "Received", count: counts.RECEIVED },
              { id: "UNDER_REVIEW", label: "Under Review", count: counts.UNDER_REVIEW },
              { id: "PROCESSING", label: "Processing", count: counts.PROCESSING },
              { id: "DISPATCHED", label: "Dispatched", count: counts.DISPATCHED },
              { id: "ARCHIVED", label: "Archived", count: counts.ARCHIVED },
            ].map((tab) => {
              const isActive = selectedStatus === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStatus(tab.id)}
                  className={`pb-2 -mb-2 text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-white font-medium border-b-2 border-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="text-[11px] font-mono text-zinc-500">{tab.count}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Category */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-48 pl-7 pr-6 py-1 rounded bg-zinc-900/60 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pl-2.5 pr-6 py-1 rounded bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 focus:outline-none focus:border-zinc-500 transition-colors cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-zinc-900 text-zinc-200">
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 3. Clean Table */}
        <div className="border border-zinc-900 rounded-lg overflow-hidden bg-zinc-950/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-900 text-zinc-500 text-[11px] font-mono uppercase bg-zinc-950/60">
                  <th className="py-2.5 px-4">Client</th>
                  <th className="py-2.5 px-4 hidden sm:table-cell">Reference</th>
                  <th className="py-2.5 px-4 hidden md:table-cell">Category</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-zinc-600 font-mono text-xs">
                      No inquiries match your filter.
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inquiry) => {
                    const statusCfg = STATUS_CONFIG[inquiry.status] || STATUS_CONFIG.RECEIVED;
                    const dateFormatted = new Date(inquiry.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });

                    return (
                      <tr
                        key={inquiry.id}
                        onClick={() => setActiveInquiry(inquiry)}
                        className="hover:bg-zinc-900/40 transition-colors cursor-pointer"
                      >
                        {/* Client & Org */}
                        <td className="py-3 px-4">
                          <div className="font-medium text-white">{inquiry.full_name}</div>
                          <div className="text-[11px] text-zinc-500 truncate max-w-xs">
                            {inquiry.organization} • {inquiry.email}
                          </div>
                        </td>

                        {/* Reference */}
                        <td className="py-3 px-4 hidden sm:table-cell font-mono text-zinc-400 text-[11px]">
                          {inquiry.reference_id}
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4 hidden md:table-cell text-zinc-400 text-[11px]">
                          {inquiry.category}
                        </td>

                        {/* Status (Clickable to change or view) */}
                        <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                          <div className="relative inline-block">
                            <select
                              value={inquiry.status}
                              onChange={(e) =>
                                handleUpdateStatus(
                                  inquiry.reference_id,
                                  e.target.value as InquiryRecord["status"]
                                )
                              }
                              className={`appearance-none pl-4 pr-5 py-0.5 rounded text-[11px] font-medium border ${statusCfg.bg} ${statusCfg.text} focus:outline-none cursor-pointer`}
                            >
                              <option value="RECEIVED" className="bg-zinc-900 text-amber-400">Received</option>
                              <option value="UNDER_REVIEW" className="bg-zinc-900 text-blue-400">Under Review</option>
                              <option value="PROCESSING" className="bg-zinc-900 text-indigo-400">Processing</option>
                              <option value="DISPATCHED" className="bg-zinc-900 text-emerald-400">Dispatched</option>
                              <option value="ARCHIVED" className="bg-zinc-900 text-zinc-400">Archived</option>
                            </select>
                            <span className={`w-1.5 h-1.5 rounded-full absolute left-1.5 top-1/2 -translate-y-1/2 ${statusCfg.dot} pointer-events-none`} />
                            <ChevronDown className="w-2.5 h-2.5 absolute right-1.5 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
                          </div>
                        </td>

                        {/* Date */}
                        <td className="py-3 px-4 text-right text-zinc-500 font-mono text-[11px]">
                          {dateFormatted}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="py-2 px-4 border-t border-zinc-900 text-[11px] text-zinc-600 font-mono flex items-center justify-between">
            <span>{filteredInquiries.length} inquiries</span>
            <span>Live PostgreSQL</span>
          </div>
        </div>
      </main>

      {/* 4. Minimal Detail Modal */}
      {activeInquiry && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveInquiry(null)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl text-xs space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-zinc-900 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold text-white">
                    {activeInquiry.reference_id}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(activeInquiry.reference_id);
                      showToast("Copied code");
                    }}
                    title="Copy reference code"
                    className="text-zinc-500 hover:text-zinc-300"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-[11px] text-zinc-500">
                  Received {new Date(activeInquiry.created_at).toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => setActiveInquiry(null)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500">Client</span>
                <div className="font-medium text-white mt-0.5">{activeInquiry.full_name}</div>
                <div className="text-zinc-400 font-mono text-[11px] truncate">{activeInquiry.email}</div>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500">Organization</span>
                <div className="font-medium text-white mt-0.5">{activeInquiry.organization}</div>
                <div className="text-zinc-400 text-[11px] truncate">{activeInquiry.category}</div>
              </div>
            </div>

            {/* Status Picker */}
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1.5">Lifecycle Status</span>
              <div className="grid grid-cols-5 gap-1">
                {(["RECEIVED", "UNDER_REVIEW", "PROCESSING", "DISPATCHED", "ARCHIVED"] as const).map((st) => {
                  const isSelected = activeInquiry.status === st;
                  const cfg = STATUS_CONFIG[st];
                  return (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(activeInquiry.reference_id, st)}
                      className={`py-1 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
                        isSelected
                          ? `${cfg.bg} ${cfg.text} font-semibold`
                          : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scope / Message */}
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Message / Scope</span>
              <div className="p-3 rounded bg-zinc-900/60 border border-zinc-800 text-zinc-300 font-mono text-[11px] leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto">
                {activeInquiry.mission_scope || "No message provided."}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${activeInquiry.email}?subject=Inquiry ${activeInquiry.reference_id}`}
                  className="px-3 py-1.5 rounded bg-white hover:bg-zinc-200 text-black font-medium text-xs transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </a>
                <button
                  onClick={() => {
                    setDeleteCandidate(activeInquiry);
                    setActiveInquiry(null);
                  }}
                  className="text-zinc-500 hover:text-red-400 p-1.5 rounded transition-colors"
                  title="Delete record"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => setActiveInquiry(null)}
                className="text-xs text-zinc-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Delete Confirmation Modal */}
      {deleteCandidate && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setDeleteCandidate(null)}
        >
          <div
            className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-medium text-sm text-white">Delete inquiry</h3>
            <p className="text-zinc-400 mt-1 leading-normal">
              Delete inquiry <span className="font-mono text-white">{deleteCandidate.reference_id}</span>?
            </p>

            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="px-3 py-1.5 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteInquiry}
                disabled={isDeleting}
                className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-medium transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
