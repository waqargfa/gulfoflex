"use client";

import { useEffect, useState } from "react";
import { Award, X, ShieldCheck, ArrowUpRight, FileText, Download, ExternalLink, Info } from "lucide-react";
import Link from "next/link";

export type Certification = {
  name: string;
  authority: string;
  category: string;
  color: string;
  desc: string;
  scope: string;
  pdfUrl?: string;
};

const accentMap: Record<string, string> = {
  orange: "text-orange-600 border-orange-500/20 bg-orange-500/10",
  neutral: "text-neutral-600 border-neutral-500/20 bg-neutral-500/10",
  green: "text-orange-600 border-orange-500/20 bg-orange-500/10",
  red: "text-orange-600 border-orange-500/20 bg-orange-500/10",
  blue: "text-neutral-600 border-neutral-500/20 bg-neutral-500/10",
  yellow: "text-orange-600 border-orange-500/20 bg-orange-500/10",
  purple: "text-neutral-600 border-neutral-500/20 bg-neutral-500/10",
};

export default function CertificationsGrid({ certifications }: { certifications: Certification[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "pdf">("details");
  const active = activeIndex !== null ? certifications[activeIndex] : null;

  // Reset tab to "details" whenever a new cert is opened
  useEffect(() => {
    setActiveTab("details");
  }, [activeIndex]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {certifications.map((cert, i) => {
          const cls = accentMap[cert.color] ?? accentMap.orange;
          const [textCls, borderCls, bgCls] = cls.split(" ");
          return (
            <button
              key={cert.name}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="group relative text-left rounded-3xl border bg-white p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-30px_rgba(234,88,12,0.30)] hover:border-orange-300/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              style={{ borderColor: "rgba(0,0,0,0.06)" }}
              aria-label={`View details for ${cert.name}`}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-6 right-7 flex items-center gap-2">
                {cert.pdfUrl && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-[0.14em] uppercase text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                    <FileText size={9} /> PDF
                  </span>
                )}
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-400">0{i + 1}</span>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-12 h-12 rounded-xl ${bgCls} ${borderCls} border flex items-center justify-center flex-shrink-0`}>
                  <Award size={20} className={textCls} strokeWidth={2.2} />
                </div>
                <div>
                  <div className={`text-[10px] uppercase tracking-[0.18em] font-bold ${textCls}`}>{cert.category}</div>
                  <div className="text-neutral-500 text-xs">{cert.authority}</div>
                </div>
              </div>
              <h2
                className="text-neutral-900 leading-[1.1] mb-2"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)", fontWeight: 800, letterSpacing: "-0.025em" }}
              >
                {cert.name}
              </h2>
              <p className="text-neutral-600 text-sm leading-relaxed mb-5 line-clamp-3">{cert.desc}</p>
              <div className="border-t pt-4 flex items-center justify-between gap-3" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="min-w-0">
                  <div className="text-[10px] text-orange-600 uppercase tracking-[0.18em] font-bold mb-1">Scope</div>
                  <div className="text-neutral-700 text-xs leading-relaxed line-clamp-1">{cert.scope}</div>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.14em] uppercase text-orange-600 group-hover:gap-1.5 transition-all">
                  View <ArrowUpRight size={12} />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {active && activeIndex !== null && (() => {
        const cls = accentMap[active.color] ?? accentMap.orange;
        const [textCls, borderCls, bgCls] = cls.split(" ");
        const hasPdf = !!active.pdfUrl;
        const isPdfTab = activeTab === "pdf";

        return (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} certification details`}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <button
              type="button"
              aria-label="Close certification details"
              onClick={() => setActiveIndex(null)}
              className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm animate-[fadeIn_.2s_ease-out]"
            />
            <div
              className={`relative w-full rounded-3xl border bg-white shadow-[0_50px_120px_-30px_rgba(0,0,0,0.40)] overflow-hidden animate-[modalIn_.28s_cubic-bezier(0.2,0.8,0.2,1)] flex flex-col transition-all duration-300 ${
                isPdfTab ? "max-w-5xl" : "max-w-2xl"
              }`}
              style={{ borderColor: "rgba(0,0,0,0.08)", maxHeight: "92dvh" }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 z-10" />

              {/* Close button */}
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full border bg-white/90 backdrop-blur flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 transition-colors"
                style={{ borderColor: "rgba(0,0,0,0.10)" }}
              >
                <X size={16} />
              </button>

              {/* Header */}
              <div className="px-7 sm:px-9 pt-8 pb-5 border-b shrink-0" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${bgCls} ${borderCls} border flex items-center justify-center flex-shrink-0`}>
                    <Award size={26} className={textCls} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0 pr-10">
                    <div className={`text-[10px] uppercase tracking-[0.20em] font-bold ${textCls} mb-1`}>{active.category}</div>
                    <h3
                      className="text-neutral-900 leading-[1.05] mb-1"
                      style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", fontWeight: 800, letterSpacing: "-0.025em" }}
                    >
                      {active.name}
                    </h3>
                    <div className="text-neutral-500 text-sm">
                      Issued by <span className="text-neutral-700 font-semibold">{active.authority}</span>
                    </div>
                  </div>
                </div>

                {/* Tabs - only shown when a PDF exists */}
                {hasPdf && (
                  <div className="flex items-center gap-1 mt-5 p-1 rounded-xl bg-neutral-100 w-fit">
                    <button
                      type="button"
                      onClick={() => setActiveTab("details")}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-[0.12em] uppercase transition-all ${
                        activeTab === "details"
                          ? "bg-white text-neutral-900 shadow-sm"
                          : "text-neutral-500 hover:text-neutral-700"
                      }`}
                    >
                      <Info size={12} /> Details
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("pdf")}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-[0.12em] uppercase transition-all ${
                        activeTab === "pdf"
                          ? "bg-white text-neutral-900 shadow-sm"
                          : "text-neutral-500 hover:text-neutral-700"
                      }`}
                    >
                      <FileText size={12} /> Certificate PDF
                    </button>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="flex-1 overflow-hidden">
                {/* Details tab */}
                {activeTab === "details" && (
                  <div className="px-7 sm:px-9 py-7 space-y-6 overflow-y-auto h-full max-h-[55vh]">
                    <div>
                      <div className="text-[10px] text-orange-600 uppercase tracking-[0.20em] font-bold mb-2">Overview</div>
                      <p className="text-neutral-700 text-[15px] leading-relaxed">{active.desc}</p>
                    </div>
                    <div>
                      <div className="text-[10px] text-orange-600 uppercase tracking-[0.20em] font-bold mb-2">Scope of certification</div>
                      <p className="text-neutral-700 text-[15px] leading-relaxed">{active.scope}</p>
                    </div>
                    <div className="rounded-2xl border bg-neutral-50 px-5 py-4 flex items-start gap-3" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                      <ShieldCheck size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-neutral-600 leading-relaxed">
                        Independently audited and third-party verified. Original certificates and test reports are available on request.
                      </div>
                    </div>
                    {hasPdf && (
                      <button
                        type="button"
                        onClick={() => setActiveTab("pdf")}
                        className="w-full rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/60 py-4 px-5 flex items-center justify-between gap-3 hover:border-orange-400 hover:bg-orange-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center shrink-0">
                            <FileText size={18} className="text-orange-600" />
                          </div>
                          <div className="text-left">
                            <div className="text-sm font-bold text-neutral-900">{active.name} - Official Certificate</div>
                            <div className="text-xs text-neutral-500">PDF · Issued by {active.authority}</div>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] uppercase text-orange-600 group-hover:gap-2 transition-all">
                          View PDF <ArrowUpRight size={13} />
                        </span>
                      </button>
                    )}
                  </div>
                )}

                {/* PDF tab */}
                {activeTab === "pdf" && active.pdfUrl && (
                  <div className="flex flex-col h-full" style={{ minHeight: "60vh" }}>
                    {/* PDF toolbar */}
                    <div
                      className="flex items-center justify-between px-5 py-2.5 border-b bg-neutral-50/80 shrink-0"
                      style={{ borderColor: "rgba(0,0,0,0.06)" }}
                    >
                      <div className="flex items-center gap-2 text-xs text-neutral-600">
                        <FileText size={13} className="text-orange-600" />
                        <span className="font-semibold">{active.name}</span>
                        <span className="text-neutral-400">· {active.authority}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={active.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-600 hover:text-neutral-900 border rounded-full px-3 py-1.5 bg-white hover:border-neutral-300 transition-colors"
                          style={{ borderColor: "rgba(0,0,0,0.10)" }}
                        >
                          <ExternalLink size={11} /> Open in tab
                        </a>
                        <a
                          href={active.pdfUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.12em] uppercase text-white bg-orange-600 hover:bg-orange-700 border border-orange-600 rounded-full px-3 py-1.5 transition-colors"
                        >
                          <Download size={11} /> Download
                        </a>
                      </div>
                    </div>

                    {/* iFrame */}
                    <div className="relative flex-1 bg-neutral-100">
                      <iframe
                        src={`${active.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                        title={`${active.name} certificate PDF`}
                        className="w-full h-full"
                        style={{ minHeight: "58vh", border: "none" }}
                        loading="lazy"
                      />
                      {/* Fallback overlay shown via CSS if iframe fails - user can still use the Open/Download buttons */}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-7 sm:px-9 py-4 border-t bg-neutral-50/60 flex flex-wrap items-center justify-between gap-3 shrink-0" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-500">
                  Certificate {String(activeIndex + 1).padStart(2, "0")} of {String(certifications.length).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-3">
                  {hasPdf && active.pdfUrl && (
                    <a
                      href={active.pdfUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] uppercase text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      <Download size={12} /> Download PDF
                    </a>
                  )}
                  {!hasPdf && (
                    <Link href="/downloads" className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] uppercase text-orange-600 hover:text-orange-700 transition-colors">
                      Downloads <ArrowUpRight size={12} />
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveIndex(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] uppercase text-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
