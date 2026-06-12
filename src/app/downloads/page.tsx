import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, Download, Sparkles, ShieldCheck, Clock } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import DownloadsExplorer from "@/components/downloads/DownloadsExplorer";

export const metadata: Metadata = {
  title: "Download Center | Gulf-O-Flex® Technical Datasheets, Certifications & Guides",
  description:
    "Download Gulf-O-Flex® product technical datasheets, installation guides, compliance certificates, CAD/BIM resources, and master specifications. Free technical resources for MEP engineers.",
  alternates: { canonical: "https://gulfoflex.com/downloads" },
};

export default function DownloadsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-20" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1708005383082-3a0e5e79a347?auto=format&fit=crop&w=2400&q=80" focalY="center" />

        <div className="container-wide relative z-10">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">Downloads</span>
          </nav>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="eyebrow mb-6"><span className="eyebrow-dot" />Download Center · v2026</div>
              <h1
                className="text-neutral-900 leading-[0.95] mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}
              >
                Every spec.<br />
                <span className="gradient-text">Every certificate.</span>
                <span className="serif-italic text-orange-600">.</span>
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                A living technical library for MEP engineers, contractors, and consultants. Search, filter, preview, and download - datasheets, ISO certificates, fire approvals, BIM families, and ready-to-paste master specifications.
              </p>

              <div className="mt-8 flex items-center gap-3 flex-wrap">
                <a href="#datasheets" className="btn-primary">
                  Explore Library <ArrowDown size={16} />
                </a>
                <Link href="/gulf-o-flex-assist" className="btn-ghost">
                  <Sparkles size={14} /> Try GOF Assist
                </Link>
              </div>

              {/* trust badges */}
              <div className="mt-8 flex items-center gap-6 flex-wrap text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                <span className="inline-flex items-center gap-2"><ShieldCheck size={13} className="text-orange-500" /> Verified Sources</span>
                <span className="inline-flex items-center gap-2"><Clock size={13} className="text-orange-500" /> Updated Quarterly</span>
                <span className="inline-flex items-center gap-2"><Download size={13} className="text-neutral-500" /> Free for Spec Use</span>
              </div>
            </div>

            {/* Glass card visual */}
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/20 via-orange-500/5 to-transparent rounded-[2rem] blur-3xl pointer-events-none" />
              <div className="relative rounded-3xl border bg-white/85 backdrop-blur-2xl overflow-hidden shadow-[0_40px_100px_-30px_rgba(234,88,12,0.30)]"
                   style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="px-7 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <Download size={14} className="text-orange-600" />
                    <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">Library Overview</div>
                  </div>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-50 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-400" />
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-px" style={{ background: "rgba(0,0,0,0.06)" }}>
                  {[
                    { n: "13+",  l: "Documents" },
                    { n: "3",    l: "Categories" },
                    { n: "2",    l: "Formats" },
                    { n: "ISO",  l: "Certified" },
                    { n: "Local", l: "Hosted" },
                    { n: "2026", l: "Edition" },
                  ].map((s) => (
                    <div key={s.l} className="bg-white p-5">
                      <div
                        className="text-neutral-900 font-black mb-1"
                        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.2vw, 2rem)", letterSpacing: "-0.025em" }}
                      >
                        {s.n}
                      </div>
                      <div className="text-neutral-500 text-[10px] uppercase tracking-[0.18em] font-bold">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="px-7 py-4 border-t flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500"
                     style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <span>Last sync · Today</span>
                  <span className="text-orange-600">All systems healthy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Explorer (toolbar + results + CTA) ── */}
      <DownloadsExplorer />
    </>
  );
}
