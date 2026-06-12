"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, BookOpen, FolderOpen } from "lucide-react";

const caseStudies = [
  {
    slug: "sobha-hartland",
    title: "Sobha Hartland — GI Duct Insulation",
    subtitle: "Resolving installer bond failures through on-site technical training.",
    client: "Sobha Hartland",
    location: "Dubai, UAE",
    sector: "Luxury Residential · HVAC",
    year: "2024",
    image: "/case-studies/sobha-hartland.webp",
    highlight: "100% bond integrity · On-time delivery",
    accentColor: "#F97316",
    tagColor: "rgba(249,115,22,0.15)",
    tagTextColor: "#F97316",
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
    location: "Palm Jumeirah, Dubai, UAE",
    sector: "Luxury Hospitality · MEP",
    year: "2024",
    image: "/case-studies/palm-six-senses.webp",
    highlight: "75 mm two-layer pipe spec · ↓ Energy consumption",
    accentColor: "#737373",
    tagColor: "rgba(115,115,115,0.15)",
    tagTextColor: "#737373",
    metrics: [
      { value: "75 mm", label: "Two-layer pipe spec" },
      { value: "↓ Energy", label: "Consumption" },
    ],
  },
  {
    slug: "district-cooling-dubai",
    title: "District Cooling Network — Dubai",
    subtitle: "Hybrid PIR + Aluclad strategy cut 15-year TCO by 38% across a 14 km CHW network.",
    client: "District Cooling Operator",
    location: "Dubai, UAE",
    sector: "District Cooling · Infrastructure",
    year: "2025",
    image: "/case-studies/cbd-sharjah.webp",
    highlight: "−38% 15-year TCO · 3× faster field-joint install",
    accentColor: "#F97316",
    tagColor: "rgba(249,115,22,0.15)",
    tagTextColor: "#F97316",
    metrics: [
      { value: "−38%", label: "15-yr TCO" },
      { value: "×3", label: "Faster install" },
    ],
  },
  {
    slug: "sustainable-city-abu-dhabi",
    title: "The Sustainable City — Abu Dhabi",
    subtitle: "150,000 m² zero-fibre duct liner meeting LEED & Estidama Pearl requirements.",
    client: "JEET MEP · The Sustainable City",
    location: "Abu Dhabi, UAE",
    sector: "Sustainable Development · HVAC",
    year: "2024",
    image: "/case-studies/sustainable-city-uae.webp",
    highlight: "150,000 m² installed · 20-year acoustic life",
    accentColor: "#737373",
    tagColor: "rgba(115,115,115,0.15)",
    tagTextColor: "#737373",
    metrics: [
      { value: "150k m²", label: "Installed" },
      { value: "0%", label: "Fibre shedding" },
    ],
  },
];

const featuredProjects = [
  { name: "Sharjah Airport Expansion",      location: "Sharjah, UAE",          country: "UAE",     image: "/images/projects/project1.png"  },
  { name: "Palm Six Senses Project",        location: "Dubai, UAE",             country: "UAE",     image: "/images/projects/project2.png"  },
  { name: "JCD Stadium",                    location: "Jeddah, Saudi Arabia",   country: "KSA",     image: "/images/projects/project8.png"  },
  { name: "Tivoli & Avani Hotels",          location: "Zallaq, Bahrain",        country: "Bahrain", image: "/images/projects/project5.png"  },
  { name: "Waterfront Promenade Mina",      location: "Old Doha Port, Qatar",   country: "Qatar",   image: "/images/projects/project7.png"  },
  { name: "Sustainable City Abu Dhabi",     location: "Yas Island, UAE",        country: "UAE",     image: "/images/projects/project9.png"  },
];

export default function Projects() {
  return (
    <section className="section-padding bg-neutral-50 relative overflow-x-hidden" aria-labelledby="projects-heading">
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px tech-divider" />

      <div className="container-wide relative z-10">

        {/* ── Section header ── */}
        <div className="flex flex-col gap-6 mb-10 sm:mb-12 reveal">
          {/* Top row: eyebrow + desktop CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
            <div>
              <h2
                id="projects-heading"
                className="text-neutral-900 leading-[1.02]"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4.5vw, 4.25rem)", fontWeight: 700, letterSpacing: "-0.035em" }}
              >
                Trusted on the world&rsquo;s{" "}
                <span className="serif-italic text-orange-600">most critical projects.</span>
              </h2>
            </div>
            {/* CTAs — hidden on xs, visible from sm */}
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
              <Link href="/case-studies" className="btn-ghost">
                <BookOpen size={14} /> Case Studies <ArrowRight size={14} />
              </Link>
              <Link href="/projects" className="btn-ghost">
                <FolderOpen size={14} /> Projects <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          {/* Mobile-only CTA row */}
          <div className="flex sm:hidden items-center gap-2">
            <Link href="/case-studies"
              className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] py-3 px-4 rounded-full border border-neutral-200 bg-white text-neutral-700 active:bg-neutral-100 transition-colors">
              <BookOpen size={12} /> Case Studies
            </Link>
            <Link href="/projects"
              className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] py-3 px-4 rounded-full border border-neutral-200 bg-white text-neutral-700 active:bg-neutral-100 transition-colors">
              <FolderOpen size={12} /> Projects
            </Link>
          </div>
        </div>

        {/* ── Case studies grid ── */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-4 stagger-reveal">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies#${cs.slug}`}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden hover:-translate-y-1 sm:hover:-translate-y-1.5 transition-all duration-500 block"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
            >
              {/* Image */}
              <div className="relative h-44 sm:h-52 overflow-hidden">
                <Image
                  src={cs.image}
                  alt={cs.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.72) 100%)" }} />
                {/* Year */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-end gap-2">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-white/70 bg-black/30 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-sm flex-shrink-0">{cs.year}</span>
                </div>
                {/* Title on image */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                  <h3 className="text-white font-black text-sm sm:text-base leading-tight"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                    {cs.title}
                  </h3>
                </div>
              </div>

              {/* Content panel */}
              <div className="bg-white border-x border-b border-neutral-100 rounded-b-2xl sm:rounded-b-3xl p-4 sm:p-5">
                {/* Location + client (truncated) */}
                <div className="flex items-center gap-2 mb-2 text-neutral-400 text-xs min-w-0">
                  <MapPin size={11} className="flex-shrink-0" style={{ color: cs.accentColor }} />
                  <span className="truncate flex-1 min-w-0">{cs.location}</span>
                  <span className="hidden sm:block text-[10px] font-bold uppercase tracking-wider text-neutral-300 truncate max-w-[130px] flex-shrink-0">{cs.client}</span>
                </div>
                <p className="text-neutral-500 text-[13px] sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">{cs.subtitle}</p>
                {/* Metrics row */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 border-t border-neutral-100">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="flex-shrink-0">
                      <div className="text-sm font-black leading-none mb-0.5" style={{ fontFamily: "var(--font-display)", color: cs.accentColor }}>{m.value}</div>
                      <div className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-wider">{m.label}</div>
                    </div>
                  ))}
                  {/* Always visible on mobile, hover-reveal on desktop */}
                  <div className="ml-auto flex items-center gap-1 text-[11px] font-semibold sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: cs.accentColor }}>
                    <span className="hidden sm:inline">Read case study</span>
                    <ArrowUpRight size={14} className="sm:w-[10px] sm:h-[10px]" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Featured Projects strip ── */}
        <div className="mt-12 sm:mt-14 reveal">
          <div className="flex items-end justify-between mb-5 sm:mb-7 gap-4">
            <div>
              <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 mb-1">10,000+ projects worldwide</div>
              <h3 className="text-neutral-900 font-black"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}>
                Featured Projects
              </h3>
            </div>
            <Link href="/projects" className="btn-ghost flex-shrink-0 !py-2.5 !px-4 !text-[11px]">
              View all <ArrowRight size={13} />
            </Link>
          </div>

          {/* 2 cols mobile → 3 cols sm → 6 cols lg */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 stagger-reveal">
            {featuredProjects.map((proj) => (
              <Link
                key={proj.name}
                href="/projects"
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[3/4] block active:scale-95 sm:hover:-translate-y-1 transition-transform duration-300"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.10)" }}
              >
                <Image
                  src={proj.image}
                  alt={proj.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
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
    </section>
  );
}
