"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  BookOpen,
  Download,
  Flame,
  FolderOpen,
  Globe2,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Case Studies ─── */
const caseStudies = [
  {
    slug: "sobha-hartland",
    title: "Sobha Hartland - GI Duct Insulation",
    subtitle: "On-site technical training resolved bond failures — zero detachments since install.",
    client: "Sobha Hartland",
    location: "Dubai, UAE",
    sector: "Luxury Residential · HVAC",
    year: "2024",
    image: "/case-studies/sobha-hartland.webp",
    accentColor: "#F97316",
    metrics: [
      { value: "0", label: "Detachment incidents" },
      { value: "100%", label: "Bond integrity" },
    ],
  },
  {
    slug: "six-senses-palm-jumeirah",
    title: "Six Senses · Palm Jumeirah",
    subtitle: "Humidity-resilient insulation spec for Dubai's most prestigious coastal resort.",
    client: "Six Senses · Palm Jumeirah",
    location: "Palm Jumeirah, Dubai",
    sector: "Luxury Hospitality · MEP",
    year: "2024",
    image: "/case-studies/palm-six-senses.webp",
    accentColor: "#737373",
    metrics: [
      { value: "75 mm", label: "Two-layer pipe spec" },
      { value: "↓ Energy", label: "Consumption" },
    ],
  },
  {
    slug: "district-cooling-dubai",
    title: "District Cooling Network - Dubai",
    subtitle: "Hybrid PIR + Aluclad strategy cut 15-year total cost by 38% across a 14 km network.",
    client: "District Cooling Operator",
    location: "Dubai, UAE",
    sector: "District Cooling · Infrastructure",
    year: "2025",
    image: "/case-studies/cbd-sharjah.webp",
    accentColor: "#F97316",
    metrics: [
      { value: "−38%", label: "15-yr total cost" },
      { value: "3×", label: "Faster install" },
    ],
  },
  {
    slug: "sustainable-city-abu-dhabi",
    title: "The Sustainable City - Abu Dhabi",
    subtitle: "150,000 m² zero-fibre duct liner meeting LEED & Estidama Pearl requirements.",
    client: "JEET MEP · The Sustainable City",
    location: "Abu Dhabi, UAE",
    sector: "Sustainable Development · HVAC",
    year: "2024",
    image: "/case-studies/sustainable-city-uae.webp",
    accentColor: "#737373",
    metrics: [
      { value: "150k m²", label: "Installed" },
      { value: "0%", label: "Fibre shedding" },
    ],
  },
];

/* ─── Featured Projects ─── */
const featuredProjects = [
  { name: "Sharjah Airport Expansion", location: "Sharjah, UAE", country: "UAE", image: "/images/projects/project1.png" },
  { name: "Palm Six Senses Project", location: "Dubai, UAE", country: "UAE", image: "/images/projects/project2.png" },
  { name: "JCD Stadium", location: "Jeddah, Saudi Arabia", country: "KSA", image: "/images/projects/project8.png" },
  { name: "Tivoli & Avani Hotels", location: "Zallaq, Bahrain", country: "Bahrain", image: "/images/projects/project5.png" },
  { name: "Waterfront Promenade Mina", location: "Old Doha Port, Qatar", country: "Qatar", image: "/images/projects/project7.png" },
  { name: "Sustainable City Abu Dhabi", location: "Yas Island, UAE", country: "UAE", image: "/images/projects/project9.png" },
];

/* ─── Certifications ─── */
type Cert = { abbr: string; name: string; sub: string; Icon: LucideIcon; body: string };

const certs: Cert[] = [
  { abbr: "ISO 9001", name: "ISO 9001:2015", sub: "Quality Management", Icon: BadgeCheck, body: "Bureau Veritas" },
  { abbr: "ISO 14001", name: "ISO 14001:2015", sub: "Environmental Mgmt", Icon: Leaf, body: "Bureau Veritas" },
  { abbr: "ISO 45001", name: "ISO 45001:2018", sub: "Occupational H&S", Icon: ShieldCheck, body: "Bureau Veritas" },
  { abbr: "FM", name: "FM Approved", sub: "FM Global Standards", Icon: Flame, body: "FM Global" },
  { abbr: "UL", name: "UL Listed", sub: "ASTM E84 / UL 723", Icon: Award, body: "Underwriters Labs" },
  { abbr: "DCL", name: "DCL Certified", sub: "Dubai Municipality", Icon: Globe2, body: "Dubai Central Lab" },
  { abbr: "DCD", name: "DCD Approved", sub: "UAE Fire & Life Safety", Icon: ShieldCheck, body: "Dubai Civil Defence" },
  { abbr: "EPD", name: "EPD Verified", sub: "Environmental Product", Icon: Sparkles, body: "EPD International" },
  { abbr: "TUV", name: "TUV Singapore", sub: "Product Safety & Quality", Icon: BadgeCheck, body: "TÜV SÜD" },
  { abbr: "SGBC", name: "Singapore Green Building", sub: "Green Building Product", Icon: Leaf, body: "SGBC Council" },
  { abbr: "CE/REACH", name: "CE & Reach Mark", sub: "EU Compliance", Icon: Globe2, body: "European Union" },
  { abbr: "Saudi Made", name: "Saudi Made", sub: "Saudi Arabia", Icon: ShieldCheck, body: "MODON" },
];

const trustNumbers = [
  { value: "10,000+", label: "Projects completed" },
  { value: "90+", label: "Countries served" },
  { value: "12+", label: "Active certifications" },
  { value: "30+", label: "Years of excellence" },
];

export default function TrustAndProjects() {
  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="trust-heading"
    >
      {/* ════════════════════════════════════════════════
          PART 1 — Projects & Case Studies (light bg)
         ════════════════════════════════════════════════ */}
      <div className="section-padding bg-neutral-50 relative overflow-x-hidden">
        <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px tech-divider" />

        <div className="container-wide relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 reveal">
            <h2
              id="trust-heading"
              className="text-neutral-900 mb-4 leading-[1.02]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4.5vw, 4.25rem)", fontWeight: 700, letterSpacing: "-0.035em" }}
            >
              Proven performance on the{" "}
              <span className="serif-italic text-orange-600">world&rsquo;s biggest projects.</span>
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              From luxury resorts to district cooling networks, Gulf&#8209;O&#8209;Flex® insulation is the choice of leading
              engineers and contractors worldwide. Here&rsquo;s the proof.
            </p>
          </div>

          {/* Trust numbers strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 sm:mb-12 reveal">
            {trustNumbers.map((s) => (
              <div
                key={s.label}
                className="relative flex flex-col items-center text-center py-5 px-4 rounded-2xl border border-neutral-200 bg-white"
              >
                <div
                  className="text-orange-600 font-black mb-1"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.4vw, 2.2rem)", letterSpacing: "-0.03em" }}
                >
                  {s.value}
                </div>
                <div className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Case Studies heading */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 reveal">
            <div>
              <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-500 mb-1">Real-world results</div>
              <h3
                className="text-neutral-900 font-black"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}
              >
                Case Studies
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/case-studies" className="btn-ghost">
                <BookOpen size={14} /> All Case Studies <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Case Studies grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-4 stagger-reveal">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies#${cs.slug}`}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden hover:-translate-y-1 sm:hover:-translate-y-1.5 transition-all duration-500 block"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
              >
                <div className="relative h-44 sm:h-52 overflow-hidden">
                  <Image src={cs.image} alt={cs.title} fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.72) 100%)" }} />
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <span className="text-[9px] sm:text-[10px] font-semibold text-white/70 bg-black/30 px-2 py-1 sm:px-2.5 rounded-full backdrop-blur-sm">{cs.year}</span>
                  </div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <h4 className="text-white font-black text-sm sm:text-base leading-tight"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                      {cs.title}
                    </h4>
                  </div>
                </div>
                <div className="bg-white border-x border-b border-neutral-100 rounded-b-2xl sm:rounded-b-3xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-2 text-neutral-400 text-xs">
                    <MapPin size={11} className="flex-shrink-0" style={{ color: cs.accentColor }} />
                    <span className="truncate">{cs.location}</span>
                  </div>
                  <p className="text-neutral-500 text-[13px] sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">{cs.subtitle}</p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 border-t border-neutral-100">
                    {cs.metrics.map((m) => (
                      <div key={m.label} className="flex-shrink-0">
                        <div className="text-sm font-black leading-none mb-0.5" style={{ fontFamily: "var(--font-display)", color: cs.accentColor }}>{m.value}</div>
                        <div className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-wider">{m.label}</div>
                      </div>
                    ))}
                    <div className="ml-auto flex items-center gap-1 text-[11px] font-semibold sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: cs.accentColor }}>
                      <span className="hidden sm:inline">Read more</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Projects strip */}
          <div className="mt-12 sm:mt-14 reveal">
            <div className="flex items-end justify-between mb-5 sm:mb-7 gap-4">
              <div>
                <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 mb-1">Selected highlights</div>
                <h3 className="text-neutral-900 font-black"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}>
                  Featured Projects
                </h3>
              </div>
              <Link href="/projects" className="btn-ghost flex-shrink-0 !py-2.5 !px-4 !text-[11px]">
                <FolderOpen size={12} /> View all <ArrowRight size={13} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 stagger-reveal">
              {featuredProjects.map((proj) => (
                <Link
                  key={proj.name}
                  href="/projects"
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[3/4] block active:scale-95 sm:hover:-translate-y-1 transition-transform duration-300"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.10)" }}
                >
                  <Image src={proj.image} alt={proj.name} fill className="object-cover object-center transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3">
                    <div className="text-[8px] sm:text-[9px] font-bold tracking-[0.14em] uppercase text-white/60 mb-0.5">{proj.country}</div>
                    <div className="text-white text-[11px] sm:text-xs font-bold leading-tight line-clamp-2" style={{ fontFamily: "var(--font-display)" }}>{proj.name}</div>
                    <div className="hidden sm:flex items-center gap-1 mt-1 text-white/50 text-[9px]">
                      <MapPin size={8} className="flex-shrink-0" />
                      <span className="truncate">{proj.location}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          PART 2 — Certifications (dark bg)
         ════════════════════════════════════════════════ */}
      <div
        className="section-padding relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0f0e0c 0%, #0a0908 55%, #0d0b09 100%)" }}
      >
        <div className="absolute inset-0 grid-bg opacity-[0.08]" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[1000px] h-[500px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.11) 0%, transparent 62%)", filter: "blur(20px)" }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="container-wide relative z-10">
          {/* Certifications header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 reveal">
            <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-500/80 mb-3">
              Why professionals trust us
            </div>
            <h3
              className="text-white mb-4 leading-[1.0]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.04em" }}
            >
              Backed by{" "}
              <span className="serif-italic text-orange-500">12+ global certifications.</span>
            </h3>
            <p className="text-white/55 text-base leading-relaxed max-w-xl mx-auto">
              Every Gulf&#8209;O&#8209;Flex® product is independently tested and approved by the world&rsquo;s most
              respected labs — so you can specify with complete confidence.
            </p>
          </div>

          {/* Certification badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 mb-10 stagger-reveal">
            {certs.map((cert) => {
              const Icon = cert.Icon;
              return (
                <div
                  key={cert.abbr}
                  className="cert-card group relative flex flex-col items-center text-center py-6 px-4 rounded-2xl transition-all duration-500 cursor-default overflow-hidden"
                >
                  <div className="cert-card-border absolute inset-0 rounded-2xl pointer-events-none" />
                  <div className="cert-card-glow absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="cert-card-accent absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-8 group-hover:w-16 transition-all duration-500" />

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative mb-3 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.18), rgba(249,115,22,0.04))", border: "1px solid rgba(249,115,22,0.20)" }}>
                      <Icon size={18} className="text-orange-400" strokeWidth={2.2} />
                    </div>
                    <div className="text-white font-black text-base leading-tight mb-1 group-hover:text-orange-300 transition-colors duration-300"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>
                      {cert.abbr}
                    </div>
                    <div className="text-white/45 text-[10px] font-semibold uppercase tracking-wider leading-snug mb-2">
                      {cert.sub}
                    </div>
                    <div className="text-orange-500/75 text-[9px] font-bold uppercase tracking-[0.18em]">
                      {cert.body}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 reveal">
            <Link href="/downloads" className="btn-primary whitespace-nowrap">
              <Download size={14} /> Download Certificates <ArrowRight size={14} />
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
