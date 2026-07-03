"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star, Quote, ArrowRight, ArrowLeft, ChevronRight, Building2, MapPin } from "lucide-react";

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
  accentColor: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Eng. Ahmed Al-Rashid",
    role: "Senior MEP Engineer",
    company: "Al Habtoor Group",
    location: "Dubai, UAE",
    sector: "Luxury Hospitality",
    quote: "Gulf-O-Flex NBR insulation has been our go-to specification for over a decade. The consistency in quality, zero moisture absorption, and their on-site technical support is simply unmatched in the GCC market.",
    rating: 5,
    highlight: "10+ years trusted partner",
    initials: "AA",
    accentColor: "#F97316",
  },
  {
    id: 2,
    name: "James Henderson",
    role: "Project Director",
    company: "Drake & Scull International",
    location: "Abu Dhabi, UAE",
    sector: "District Cooling",
    quote: "We tested 6 different insulation brands for our 14 km chilled water network. Gulf-O-Flex delivered the lowest thermal conductivity, fastest installation time, and their Aluclad jacketing system reduced our field-joint time by 3x.",
    rating: 5,
    highlight: "3x faster installation",
    initials: "JH",
    accentColor: "#737373",
  },
  {
    id: 3,
    name: "Eng. Fatima Al-Suwaidi",
    role: "Head of Sustainability",
    company: "Masdar City",
    location: "Abu Dhabi, UAE",
    sector: "Green Building",
    quote: "For our LEED Platinum-rated facilities, we needed insulation with zero ODP and verified environmental credentials. Gulf-O-Flex ticked every box, ISO 14001 certified, CFC-free, and they provided full lifecycle analysis documentation.",
    rating: 5,
    highlight: "LEED Platinum certified project",
    initials: "FA",
    accentColor: "#F97316",
  },
  {
    id: 4,
    name: "Rajesh Krishnamurthy",
    role: "Chief Engineer",
    company: "Qatar Cool",
    location: "Doha, Qatar",
    sector: "District Cooling",
    quote: "The thermal performance data Gulf-O-Flex provides is accurate and verifiable. After 8 years in the field, our independent audit showed less than 2% degradation, far exceeding any competing product we've tested.",
    rating: 5,
    highlight: "<2% degradation over 8 years",
    initials: "RK",
    accentColor: "#737373",
  },
  {
    id: 5,
    name: "Eng. Mohammed Al-Otaibi",
    role: "VP of Operations",
    company: "Saudi Aramco Contractors",
    location: "Dammam, KSA",
    sector: "Oil & Gas",
    quote: "In oil & gas, there is zero tolerance for insulation failure. Gulf-O-Flex products meet FM 4924 and UL 723, and their technical team flew in within 48 hours for our emergency specification review. That level of commitment is rare.",
    rating: 5,
    highlight: "FM & UL certified",
    initials: "MA",
    accentColor: "#F97316",
  },
  {
    id: 6,
    name: "Sarah Mitchell",
    role: "Procurement Director",
    company: "AECOM Middle East",
    location: "Dubai, UAE",
    sector: "Infrastructure",
    quote: "We've standardized on Gulf-O-Flex across our MEP division. Consistent product quality, competitive pricing, and the fastest lead times in the region. Their local manufacturing in Ajman means we never face import delays.",
    rating: 5,
    highlight: "Standardized across division",
    initials: "SM",
    accentColor: "#737373",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? "text-orange-500 fill-orange-500" : "text-neutral-300"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  };
  const prev = () => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, active]);

  const t = testimonials[active];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.96 }),
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-neutral-50"
      aria-labelledby="testimonials-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 grid-bg opacity-[0.15]" />
      <div className="absolute top-0 left-0 right-0 h-px tech-divider" />

      {/* Large quote watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <Quote
          className="text-orange-500/[0.04]"
          style={{ width: "clamp(300px, 50vw, 600px)", height: "clamp(300px, 50vw, 600px)" }}
          strokeWidth={0.5}
        />
      </div>

      {/* Glow orbs */}
      <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-orange-500/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-16 w-[400px] h-[400px] rounded-full bg-orange-400/[0.05] blur-[100px] pointer-events-none" />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "none" : "translateY(28px)", transition: "all 0.9s cubic-bezier(0.19, 1, 0.22, 1)" }}
        >
          <div>
            <span className="section-label mb-5 block">Client Testimonials</span>
            <h2
              id="testimonials-heading"
              className="text-neutral-900 leading-[1.02]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4.5vw, 4.25rem)", fontWeight: 700, letterSpacing: "-0.035em" }}
            >
              Trusted by engineers{" "}
              <span className="serif-italic text-orange-600">worldwide.</span>
            </h2>
          </div>
          <Link href="/testimonials" className="btn-ghost hidden sm:inline-flex flex-shrink-0">
            All Testimonials <ArrowRight size={14} />
          </Link>
        </div>

        {/* Main testimonial card */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 xl:gap-12 items-start">
          {/* Featured quote */}
          <div
            className="relative"
            style={{ opacity: isInView ? 1 : 0, transform: isInView ? "none" : "translateY(36px)", transition: "all 1s cubic-bezier(0.19, 1, 0.22, 1) 0.15s" }}
          >
            <div className="glass-card p-8 sm:p-10 lg:p-12 relative min-h-[360px] flex flex-col">
              {/* Top decorative line */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

              {/* Quote icon */}
              <div className="mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <Quote size={20} className="text-white" />
                </div>
              </div>

              {/* Animated quote */}
              <div className="relative flex-1 overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={t.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    className="flex flex-col"
                  >
                    {/* Highlight tag */}
                    <div className="inline-flex items-center gap-2 mb-5">
                      <span className="tag text-[10px]">{t.highlight}</span>
                      <StarRating rating={t.rating} />
                    </div>

                    {/* Quote text */}
                    <blockquote
                      className="text-neutral-800 mb-8 leading-[1.7] text-pretty"
                      style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="mt-auto flex items-center gap-4">
                      {/* Avatar */}
                      <div
                        className="w-13 h-13 rounded-2xl flex items-center justify-center text-white font-bold text-sm relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${t.accentColor}, ${t.accentColor}cc)`, width: 52, height: 52 }}
                      >
                        {t.initials}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                      </div>
                      <div>
                        <div className="font-bold text-neutral-900 text-[0.95rem]">{t.name}</div>
                        <div className="text-neutral-500 text-sm">{t.role}</div>
                        <div className="flex items-center gap-1.5 text-neutral-400 text-xs mt-0.5">
                          <Building2 size={10} />
                          <span>{t.company}</span>
                          <span className="text-neutral-300">·</span>
                          <MapPin size={10} />
                          <span>{t.location}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-200/60">
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                      className="group relative"
                      aria-label={`Testimonial ${i + 1}`}
                    >
                      <div
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{
                          width: i === active ? 32 : 8,
                          background: i === active
                            ? "linear-gradient(90deg, #f97316, #ea580c)"
                            : "rgba(10,10,10,0.12)",
                        }}
                      />
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-xl border border-neutral-200 hover:border-orange-500 flex items-center justify-center text-neutral-400 hover:text-orange-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10"
                    aria-label="Previous testimonial"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-xl border border-neutral-200 hover:border-orange-500 flex items-center justify-center text-neutral-400 hover:text-orange-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10"
                    aria-label="Next testimonial"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side - mini testimonials stack */}
          <div
            className="hidden lg:flex flex-col gap-3"
            style={{ opacity: isInView ? 1 : 0, transform: isInView ? "none" : "translateX(36px)", transition: "all 1s cubic-bezier(0.19, 1, 0.22, 1) 0.3s" }}
          >
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                className={`group text-left p-4 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
                  i === active
                    ? "bg-white border-orange-500/30 shadow-lg shadow-orange-500/8"
                    : "bg-white/60 border-neutral-200/60 hover:border-orange-500/20 hover:bg-white hover:shadow-md"
                }`}
              >
                {/* Active indicator */}
                {i === active && (
                  <motion.div
                    layoutId="activeTestimonial"
                    className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-orange-500 to-orange-600"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: i === active
                        ? `linear-gradient(135deg, ${item.accentColor}, ${item.accentColor}cc)`
                        : "linear-gradient(135deg, #d4d4d4, #a3a3a3)",
                    }}
                  >
                    {item.initials}
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm font-semibold truncate transition-colors ${i === active ? "text-neutral-900" : "text-neutral-600"}`}>
                      {item.name}
                    </div>
                    <div className="text-[11px] text-neutral-400 truncate">{item.company}</div>
                  </div>
                  <ChevronRight
                    size={14}
                    className={`ml-auto flex-shrink-0 transition-all duration-300 ${
                      i === active ? "text-orange-500 translate-x-0" : "text-neutral-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                    }`}
                  />
                </div>
              </button>
            ))}

            {/* Stats mini card */}
            <div className="mt-2 p-5 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white relative overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-[0.06]" />
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-orange-500/20 blur-[40px]" />
              <div className="relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="stat-number text-2xl">98%</div>
                    <div className="text-neutral-400 text-[10px] font-medium uppercase tracking-wider mt-1">Satisfaction</div>
                  </div>
                  <div>
                    <div className="stat-number text-2xl">90+</div>
                    <div className="text-neutral-400 text-[10px] font-medium uppercase tracking-wider mt-1">Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 sm:hidden text-center">
          <Link href="/testimonials" className="btn-ghost w-full justify-center">
            All Testimonials <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
