"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Star,
  Quote,
  ArrowRight,
  Building2,
  MapPin,
  Filter,
  Sparkles,
  Globe,
  Users,
  Award,
  TrendingUp,
  ChevronDown,
  Play,
} from "lucide-react";
import PageHero from "@/components/layout/PageHero";

/* ─────────────── Data ─────────────── */

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  sector: string;
  quote: string;
  rating: number;
  highlight: string;
  initials: string;
  featured?: boolean;
  year: string;
};

const ALL_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Eng. Ahmed Al-Rashid",
    role: "Senior MEP Engineer",
    company: "Al Habtoor Group",
    location: "Dubai, UAE",
    sector: "Hospitality",
    quote: "Gulf-O-Flex NBR insulation has been our go-to specification for over a decade. The consistency in quality, zero moisture absorption, and their on-site technical support is simply unmatched in the GCC market. Every project we deliver benefits from their expertise.",
    rating: 5,
    highlight: "10+ years trusted partner",
    initials: "AA",
    featured: true,
    year: "2024",
  },
  {
    id: 2,
    name: "James Henderson",
    role: "Project Director",
    company: "Drake & Scull International",
    location: "Abu Dhabi, UAE",
    sector: "District Cooling",
    quote: "We tested 6 different insulation brands for our 14 km chilled water network. Gulf-O-Flex delivered the lowest thermal conductivity, fastest installation time, and their Aluclad jacketing system reduced our field-joint time by 3x. The ROI was clear within the first phase.",
    rating: 5,
    highlight: "3x faster installation",
    initials: "JH",
    featured: true,
    year: "2024",
  },
  {
    id: 3,
    name: "Eng. Fatima Al-Suwaidi",
    role: "Head of Sustainability",
    company: "Masdar City",
    location: "Abu Dhabi, UAE",
    sector: "Green Building",
    quote: "For our LEED Platinum-rated facilities, we needed insulation with zero ODP and verified environmental credentials. Gulf-O-Flex ticked every box, ISO 14001 certified, CFC-free, and they provided full lifecycle analysis documentation without us having to ask.",
    rating: 5,
    highlight: "LEED Platinum certified project",
    initials: "FA",
    featured: true,
    year: "2025",
  },
  {
    id: 4,
    name: "Rajesh Krishnamurthy",
    role: "Chief Engineer",
    company: "Qatar Cool",
    location: "Doha, Qatar",
    sector: "District Cooling",
    quote: "The thermal performance data Gulf-O-Flex provides is accurate and verifiable. After 8 years in the field, our independent audit showed less than 2% degradation, far exceeding any competing product we've tested. They stand behind their numbers.",
    rating: 5,
    highlight: "<2% degradation over 8 years",
    initials: "RK",
    year: "2024",
  },
  {
    id: 5,
    name: "Eng. Mohammed Al-Otaibi",
    role: "VP of Operations",
    company: "Saudi Aramco Contractors",
    location: "Dammam, KSA",
    sector: "Oil & Gas",
    quote: "In oil & gas, there is zero tolerance for insulation failure. Gulf-O-Flex products meet FM 4924 and UL 723, and their technical team flew in within 48 hours for our emergency specification review. That level of commitment is extremely rare in this industry.",
    rating: 5,
    highlight: "FM & UL certified",
    initials: "MA",
    year: "2023",
  },
  {
    id: 6,
    name: "Sarah Mitchell",
    role: "Procurement Director",
    company: "AECOM Middle East",
    location: "Dubai, UAE",
    sector: "Infrastructure",
    quote: "We've standardized on Gulf-O-Flex across our MEP division. Consistent product quality, competitive pricing, and the fastest lead times in the region. Their local manufacturing in Ajman means we never face import delays or supply uncertainty.",
    rating: 5,
    highlight: "Standardized across division",
    initials: "SM",
    year: "2024",
  },
  {
    id: 7,
    name: "Dr. Khalid Al-Mansouri",
    role: "Facilities Director",
    company: "Cleveland Clinic Abu Dhabi",
    location: "Abu Dhabi, UAE",
    sector: "Healthcare",
    quote: "Healthcare facilities demand insulation that prevents microbial growth and meets the strictest indoor air quality standards. Gulf-O-Flex closed-cell structure and anti-microbial properties made it the only product that passed our infection control committee's review.",
    rating: 5,
    highlight: "Anti-microbial certified",
    initials: "KM",
    year: "2023",
  },
  {
    id: 8,
    name: "Eng. Omar Bin Saleh",
    role: "Technical Manager",
    company: "Tabreed",
    location: "Dubai, UAE",
    sector: "District Cooling",
    quote: "Managing 80+ district cooling plants requires a reliable insulation partner. Gulf-O-Flex has been spec'd across 90% of our new builds. Their Sound product line also solved our acoustic compliance issue in residential plant rooms, a dual benefit we didn't expect.",
    rating: 5,
    highlight: "90% of new builds spec'd",
    initials: "OB",
    year: "2024",
  },
  {
    id: 9,
    name: "Antonio Ferreira",
    role: "Marine Division Lead",
    company: "Drydocks World",
    location: "Dubai, UAE",
    sector: "Marine",
    quote: "Marine insulation faces the harshest conditions: salt spray, vibration, extreme temperature swings. Gulf-O-Flex NBR has proven itself on 40+ vessel refits. Their technical team understands marine classification requirements like no other insulation manufacturer.",
    rating: 5,
    highlight: "40+ vessel refits",
    initials: "AF",
    year: "2024",
  },
  {
    id: 10,
    name: "Eng. Noura Al-Ketbi",
    role: "Senior Project Engineer",
    company: "Emaar Properties",
    location: "Dubai, UAE",
    sector: "Commercial",
    quote: "From Downtown Dubai towers to residential communities, Gulf-O-Flex insulation is part of our approved vendor list for all MEP subcontractors. The product quality is reliable and their customer service team resolves queries within hours, not days.",
    rating: 5,
    highlight: "Approved vendor across Emaar",
    initials: "NK",
    year: "2025",
  },
  {
    id: 11,
    name: "Patrick O'Brien",
    role: "Energy Manager",
    company: "Majid Al Futtaim",
    location: "Dubai, UAE",
    sector: "Retail",
    quote: "Across our mall portfolio, energy efficiency is the top priority. Switching to Gulf-O-Flex XLPE for our chilled water systems delivered a measurable 12% reduction in cooling energy costs. The payback period was under 18 months.",
    rating: 5,
    highlight: "12% energy cost reduction",
    initials: "PO",
    year: "2024",
  },
  {
    id: 12,
    name: "Eng. Abdulaziz Al-Harbi",
    role: "Plant Manager",
    company: "SABIC",
    location: "Jubail, KSA",
    sector: "Industrial",
    quote: "Gulf-O-Flex insulation performs exceptionally in our petrochemical environment. High chemical resistance, excellent fire ratings, and their local factory tour gave our safety committee full confidence in the manufacturing process and quality controls.",
    rating: 5,
    highlight: "High chemical resistance verified",
    initials: "AH",
    year: "2023",
  },
];

const SECTORS = ["All", "District Cooling", "Oil & Gas", "Hospitality", "Green Building", "Healthcare", "Marine", "Infrastructure", "Commercial", "Industrial", "Retail"];

const STATS = [
  { value: "98%", label: "Client Satisfaction Rate", icon: TrendingUp },
  { value: "90+", label: "Countries Worldwide", icon: Globe },
  { value: "500+", label: "Enterprise Clients", icon: Users },
  { value: "30+", label: "Years of Trust", icon: Award },
];

/* ─────────────── Component ─────────────── */

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "text-orange-500 fill-orange-500" : "text-neutral-300"}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index, featured = false }: { testimonial: Testimonial; index: number; featured?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
      className={`group relative ${featured ? "lg:col-span-2 lg:row-span-2" : ""}`}
    >
      <div
        className={`h-full rounded-3xl border relative overflow-hidden transition-all duration-500 hover-lift ${
          featured
            ? "bg-gradient-to-br from-white via-white to-orange-50/40 border-orange-500/20 p-8 sm:p-10 lg:p-12 shadow-lg shadow-orange-500/5"
            : "glass-card p-7 sm:p-8"
        }`}
      >
        {/* Spotlight effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-orange-500/[0.06] blur-[60px]" />
        </div>

        {/* Top accent line */}
        {featured && (
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
        )}

        <div className="relative z-10 flex flex-col h-full">
          {/* Header row */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-2">
              <StarRating rating={testimonial.rating} size={featured ? 16 : 13} />
              {featured && (
                <span className="ml-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase bg-orange-500/10 text-orange-600 border border-orange-500/20">
                  <Sparkles size={9} />
                  Featured
                </span>
              )}
            </div>
            <Quote
              size={featured ? 36 : 24}
              className={`flex-shrink-0 ${featured ? "text-orange-500/20" : "text-neutral-200"}`}
              strokeWidth={1.2}
            />
          </div>

          {/* Highlight tag */}
          <div className="mb-4">
            <span className="tag text-[10px]">{testimonial.highlight}</span>
          </div>

          {/* Quote */}
          <blockquote
            className={`text-neutral-700 leading-[1.75] text-pretty flex-1 mb-6 ${
              featured ? "text-lg lg:text-xl" : "text-[0.95rem]"
            }`}
          >
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>

          {/* Author */}
          <div className="flex items-center gap-4 pt-5 border-t border-neutral-200/60">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm relative overflow-hidden flex-shrink-0"
              style={{
                background: featured
                  ? "linear-gradient(135deg, #f97316, #ea580c)"
                  : "linear-gradient(135deg, #737373, #525252)",
              }}
            >
              {testimonial.initials}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-neutral-900 text-[0.95rem]">{testimonial.name}</div>
              <div className="text-neutral-500 text-sm">{testimonial.role}</div>
              <div className="flex items-center gap-1.5 text-neutral-400 text-xs mt-0.5 flex-wrap">
                <Building2 size={10} />
                <span>{testimonial.company}</span>
                <span className="text-neutral-300">·</span>
                <MapPin size={10} />
                <span>{testimonial.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsPage() {
  const [activeSector, setActiveSector] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  const filtered = activeSector === "All"
    ? ALL_TESTIMONIALS
    : ALL_TESTIMONIALS.filter((t) => t.sector === activeSector);

  const featured = filtered.filter((t) => t.featured);
  const regular = filtered.filter((t) => !t.featured);
  const displayRegular = showAll ? regular : regular.slice(0, 6);

  return (
    <main>
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
        style={{ background: "linear-gradient(180deg, #fffbf5 0%, #fff7ed 40%, #ffffff 100%)" }}
      >
        <PageHero src="/images/projects/project1.png" alt="" intensity={0.12} />

        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            >
              <span className="eyebrow mb-6 inline-flex">
                <span className="eyebrow-dot" />
                Client Testimonials
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="text-neutral-900 mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              Hear from the engineers{" "}
              <span className="serif-italic text-orange-600">who trust us.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="text-neutral-500 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10"
            >
              For over 30 years, Gulf-O-Flex has earned the confidence of contractors,
              engineers, and facility managers across 90+ countries. Here&rsquo;s what
              they have to say.
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-wrap gap-3"
            >
              {["ISO 9001 Certified", "FM Approved", "UL Listed", "90+ Countries"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide bg-white/80 text-neutral-600 border border-neutral-200 backdrop-blur-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="relative bg-neutral-900 overflow-hidden" ref={statsRef}>
        <div className="absolute inset-0 grid-bg opacity-[0.06]" />
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-orange-500/15 blur-[80px] pointer-events-none" />
        <div className="absolute -right-20 top-0 w-60 h-60 rounded-full bg-orange-500/10 blur-[60px] pointer-events-none" />

        <div className="container-wide relative z-10 py-12 sm:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
                className="text-center lg:text-left"
              >
                <div className="flex items-center gap-3 justify-center lg:justify-start mb-2">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
                    <stat.icon size={18} className="text-orange-400" />
                  </div>
                  <div className="stat-number text-3xl sm:text-4xl">{stat.value}</div>
                </div>
                <div className="text-neutral-400 text-xs font-medium uppercase tracking-[0.15em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FILTER + GRID ═══════════════ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.08]" />

        <div className="container-wide relative z-10">
          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
              <Filter size={16} className="text-orange-500" />
              <span>Filter by sector</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SECTORS.map((sector) => (
                <button
                  key={sector}
                  onClick={() => { setActiveSector(sector); setShowAll(false); }}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
                    activeSector === sector
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-lg shadow-neutral-900/15"
                      : "bg-white text-neutral-500 border-neutral-200 hover:border-orange-500/40 hover:text-orange-600"
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>

          {/* Featured testimonials */}
          {featured.length > 0 && (
            <div className="mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                {featured.map((t, i) => (
                  <TestimonialCard key={t.id} testimonial={t} index={i} featured />
                ))}
              </div>
            </div>
          )}

          {/* Regular grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayRegular.map((t, i) => (
                <TestimonialCard key={t.id} testimonial={t} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Show more */}
          {regular.length > 6 && !showAll && (
            <div className="text-center mt-12">
              <button onClick={() => setShowAll(true)} className="btn-ghost">
                Show All Testimonials
                <ChevronDown size={14} />
              </button>
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                <Quote size={28} className="text-neutral-300" />
              </div>
              <p className="text-neutral-400 text-lg">No testimonials for this sector yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ TRUST CTA ═══════════════ */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #0f0e0c 0%, #0a0908 55%, #0d0b09 100%)" }}>
        <div className="absolute inset-0 grid-bg opacity-[0.06]" />
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-500/20 blur-[90px] pointer-events-none" />
        <div className="absolute -right-32 top-0 w-80 h-80 rounded-full bg-orange-500/10 blur-[80px] pointer-events-none" />

        {/* Large watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <Quote className="text-white/[0.03]" style={{ width: 400, height: 400 }} strokeWidth={0.5} />
        </div>

        <div className="container-wide py-20 sm:py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            >
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-orange-300 border border-orange-500/35 bg-orange-500/12 px-2.5 py-1 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                Join 500+ Satisfied Clients
              </span>

              <h2
                className="text-white mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                Ready to experience the{" "}
                <span className="serif-italic text-orange-400">Gulf-O-Flex difference?</span>
              </h2>

              <p className="text-neutral-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                Request a consultation or product sample and discover why the world&rsquo;s
                top engineers specify Gulf-O-Flex for their most demanding projects.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="btn-primary">
                  Request Consultation <ArrowRight size={16} />
                </Link>
                <Link href="/products" className="btn-ghost text-white border-white/20 hover:border-orange-500 hover:text-orange-400">
                  Explore Products <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
