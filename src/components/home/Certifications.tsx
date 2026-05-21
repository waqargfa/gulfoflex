"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Download,
  Flame,
  Globe2,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Cert = {
  abbr: string;
  name: string;
  sub: string;
  Icon: LucideIcon;
  since: string;
};

const certs: Cert[] = [
  { abbr: "ISO 9001",  name: "ISO 9001:2015",   sub: "Quality Management",       Icon: BadgeCheck,  since: "Since 2002" },
  { abbr: "ISO 14001", name: "ISO 14001:2015",  sub: "Environmental Mgmt",       Icon: Leaf,        since: "Since 2008" },
  { abbr: "FM",        name: "FM Approved",     sub: "FM Global Standards",      Icon: ShieldCheck, since: "Since 2011" },
  { abbr: "LPCB",      name: "LPCB Certified",  sub: "Loss Prevention Board",    Icon: Flame,       since: "Since 2013" },
  { abbr: "CE",        name: "CE Marked",       sub: "European Compliance",      Icon: Globe2,      since: "Since 2004" },
  { abbr: "Gulf Mark", name: "Gulf Mark",       sub: "GCC Standardization",      Icon: Award,       since: "Since 2010" },
];

const standards = [
  "BS 476 Part 4 & 7",
  "ASTM E84",
  "EN 13501-1",
  "DIN 4102",
  "IMO FTP Code",
  "NFPA 90A/B",
  "ASHRAE 90.1",
  "LEED Compliant",
];

const trustStats = [
  { value: "12+", label: "Active certifications" },
  { value: "90+", label: "Countries approved" },
  { value: "30+", label: "Years audited" },
  { value: "100%", label: "Independent labs" },
];

export default function Certifications() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "#080a0f" }}
      aria-labelledby="certs-heading"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-[0.10]" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[900px] h-[460px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.13) 0%, transparent 65%)" }}
        />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Decorative corner marks */}
      <div className="hidden md:block absolute top-10 left-10 w-10 h-10 border-t border-l border-white/10 pointer-events-none" />
      <div className="hidden md:block absolute top-10 right-10 w-10 h-10 border-t border-r border-white/10 pointer-events-none" />
      <div className="hidden md:block absolute bottom-10 left-10 w-10 h-10 border-b border-l border-white/10 pointer-events-none" />
      <div className="hidden md:block absolute bottom-10 right-10 w-10 h-10 border-b border-r border-white/10 pointer-events-none" />

      <div className="container-wide relative z-10">
        {/* Section header — centered */}
        <div className="text-center max-w-2xl mx-auto mb-12 reveal">
          <div
            className="eyebrow mb-5 mx-auto w-fit"
            style={{ background: "rgba(249,115,22,0.12)", borderColor: "rgba(249,115,22,0.25)", color: "#f97316" }}
          >
            <span className="eyebrow-dot" />
            Compliance &amp; Quality
          </div>
          <h2
            id="certs-heading"
            className="text-white mb-4 leading-[1.0]"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 4.5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.04em" }}
          >
            Globally certified.{" "}
            <span className="serif-italic text-orange-500">Universally trusted.</span>
          </h2>
          <p className="text-white/55 text-base leading-relaxed">
            The most stringent international approvals — giving engineers, consultants,
            and project owners full confidence to specify Gulf&#8209;O&#8209;Flex® on any critical project worldwide.
          </p>
        </div>

        {/* Trust stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-12 rounded-2xl overflow-hidden reveal"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {trustStats.map((s) => (
            <div key={s.label} className="px-5 py-5 flex items-baseline gap-3" style={{ background: "#0a0c12" }}>
              <div
                className="text-white"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
              >
                {s.value}
              </div>
              <div className="text-white/50 text-[11px] font-semibold uppercase tracking-wider leading-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Certification badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12 stagger-reveal">
          {certs.map((cert) => {
            const Icon = cert.Icon;
            return (
              <div
                key={cert.abbr}
                className="cert-card group relative flex flex-col items-center text-center py-6 px-4 rounded-2xl transition-all duration-500 cursor-default overflow-hidden"
              >
                {/* Gradient border */}
                <div className="cert-card-border absolute inset-0 rounded-2xl pointer-events-none" />
                {/* Inner glow on hover */}
                <div className="cert-card-glow absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* Top accent */}
                <div className="cert-card-accent absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-8 group-hover:w-16 transition-all duration-500" />

                <div className="relative z-10 flex flex-col items-center">
                  {/* Icon medallion */}
                  <div className="relative mb-3 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg, rgba(249,115,22,0.18), rgba(249,115,22,0.04))",
                      border: "1px solid rgba(249,115,22,0.20)",
                    }}>
                    <Icon size={18} className="text-orange-400" strokeWidth={2.2} />
                  </div>
                  <div
                    className="text-white font-black text-base leading-tight mb-1 group-hover:text-orange-300 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}
                  >
                    {cert.abbr}
                  </div>
                  <div className="text-white/45 text-[10px] font-semibold uppercase tracking-wider leading-snug mb-2">
                    {cert.sub}
                  </div>
                  <div className="text-orange-500/75 text-[9px] font-bold uppercase tracking-[0.18em]">
                    {cert.since}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Standards strip + CTA */}
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pt-8 reveal"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <div className="text-white/45 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <Sparkles size={11} className="text-orange-400" />
              Testing &amp; Compliance Standards
            </div>
            <div className="flex flex-wrap gap-2">
              {standards.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200 hover:text-white hover:border-orange-400/40 hover:bg-orange-500/10"
                  style={{ border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.65)" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link href="/downloads" className="btn-primary whitespace-nowrap">
              <Download size={14} />
              Download Certificates
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/certifications"
              className="btn-ghost whitespace-nowrap text-center"
              style={{ color: "rgba(255,255,255,0.70)", borderColor: "rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.04)" }}
            >
              All Certifications
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cert-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
        }
        .cert-card-border {
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.5s ease;
        }
        .cert-card:hover .cert-card-border {
          border-color: rgba(249,115,22,0.35);
        }
        .cert-card-glow {
          background: radial-gradient(circle at 50% 0%, rgba(249,115,22,0.18) 0%, transparent 60%);
        }
        .cert-card-accent {
          background: linear-gradient(90deg, transparent, rgba(249,115,22,0.85), transparent);
          opacity: 0;
        }
        .cert-card:hover .cert-card-accent {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
