"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  Shield,
  Zap,
  Sparkles,
  Cpu,
  Bot,
  Calculator,
  GraduationCap,
  FileCheck2,
  Atom,
  ChevronRight,
  CheckCircle2,
  Gauge,
  Thermometer,
  Volume2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

/* ──────────────────────────────────────────────────────────────────
   Technology data - 6 material technologies + 1 digital platform
─────────────────────────────────────────────────────────────────── */
type Tech = {
  id: string;
  Icon: LucideIcon;
  title: string;
  tag: string;
  tier: "Core" | "Premium" | "Specialty";
  /** primary brand colour for the card accent */
  accent: string;
  /** soft tint used in backgrounds */
  tint: string;
  desc: string;
  specs: { label: string; value: string }[];
  benefits: string[];
};

const technologies: Tech[] = [
  {
    id: "nbr",
    Icon: Layers,
    title: "Closed-Cell NBR Elastomeric",
    tag: "Core Technology",
    tier: "Core",
    accent: "#f97316",
    tint: "rgba(249,115,22,0.10)",
    desc: "Nitrile Butadiene Rubber closed-cell foam - our flagship insulation. The closed-cell structure prevents moisture absorption (the #1 cause of insulation failure in humid climates) while delivering class-leading thermal performance across HVAC and process applications.",
    specs: [
      { label: "Thermal Conductivity", value: "≤0.036 W/(m·K)" },
      { label: "Temperature Range",   value: "−40°C to +105°C" },
      { label: "Water Vapour Resist.", value: "μ ≥ 7,300" },
      { label: "Fire Class",           value: "B1 / BS Class O" },
    ],
    benefits: ["Zero water absorption", "No surface condensation", "Flexible at −40°C", "Long-term dimensional stability"],
  },
  {
    id: "nbr-ultra",
    Icon: Sparkles,
    title: "Gulf-O-Flex NBR Ultra",
    tag: "Ultra Performance",
    tier: "Premium",
    accent: "#737373",
    tint: "rgba(115,115,115,0.10)",
    desc: "Ultra-density NBR engineered for projects that demand the best - district cooling mains, chiller plants, and critical pharma/data-centre piping. Higher cell density delivers improved thermal lambda and stronger mechanical performance over standard NBR.",
    specs: [
      { label: "Thermal Conductivity", value: "≤0.033 W/(m·K)" },
      { label: "Temperature Range",   value: "−50°C to +110°C" },
      { label: "Water Vapour Resist.", value: "μ ≥ 10,000" },
      { label: "Density",              value: "70–90 kg/m³" },
    ],
    benefits: ["Up to 8% thinner wall", "Higher compressive resistance", "Premium chiller-line spec", "Enhanced acoustic damping"],
  },
  {
    id: "nbr-ultra-line",
    Icon: Atom,
    title: "Gulf-O-Flex NBR Ultra Line",
    tag: "Ultra Line · Pre-formed",
    tier: "Premium",
    accent: "#f97316",
    tint: "rgba(249,115,22,0.10)",
    desc: "Pre-formed, line-extruded NBR Ultra tubes and sheets cut to project lengths in our factory - eliminating site-seam losses, ensuring uniform thickness, and dramatically reducing installation time on long pipe runs and large-diameter plant.",
    specs: [
      { label: "Tube Lengths",          value: "2 m / 5 m / Custom" },
      { label: "Thicknesses",           value: "9 → 50 mm" },
      { label: "Pipe Sizes",            value: "6 → 168 mm OD" },
      { label: "Factory Tolerance",     value: "±0.5 mm" },
    ],
    benefits: ["Factory pre-cut to BOQ", "Zero seam-loss energy", "−30% installation time", "Consistent λ over the run"],
  },
  {
    id: "xlpe",
    Icon: Zap,
    title: "Cross-Linked Polyethylene (XLPE)",
    tag: "Advanced Polymer",
    tier: "Core",
    accent: "#737373",
    tint: "rgba(115,115,115,0.10)",
    desc: "XLPE foam extends performance into higher-temperature applications while staying flexible and easy to install. The cross-linked molecular network provides superior resistance to compression, UV exposure, and aggressive chemical environments.",
    specs: [
      { label: "Thermal Conductivity", value: "≤0.038 W/(m·K)" },
      { label: "Temperature Range",   value: "−50°C to +120°C" },
      { label: "Density",              value: "25–35 kg/m³" },
      { label: "Compressive Strength", value: ">100 kPa" },
    ],
    benefits: ["Higher heat resistance", "UV-resistant formulation", "Chemical inertness", "Lightweight & easy to cut"],
  },
  {
    id: "sound",
    Icon: Volume2,
    title: "Acoustic Insulation System",
    tag: "Sound Control",
    tier: "Specialty",
    accent: "#737373",
    tint: "rgba(115,115,115,0.10)",
    desc: "Gulf-O-Flex Sound is engineered for combined thermal and acoustic performance on HVAC ducts, pumps, and mechanical rooms. A multi-layer composite of mass-loaded vinyl, NBR foam and fibre delivers up to 32 dB sound reduction.",
    specs: [
      { label: "Sound Reduction Index", value: "Up to 32 dB" },
      { label: "Frequency Range",       value: "100–3150 Hz" },
      { label: "Thermal λ",             value: "≤0.036 W/(m·K)" },
      { label: "Surface Burning",       value: "Class A" },
    ],
    benefits: ["Duct-borne noise cut", "Impact sound damping", "Thermal + acoustic in one", "Pre-slit for fast fitting"],
  },
  {
    id: "cladding",
    Icon: Shield,
    title: "Aluglass & Aluclad Cladding",
    tag: "Surface Finish",
    tier: "Specialty",
    accent: "#f97316",
    tint: "rgba(249,115,22,0.10)",
    desc: "Premium aluminium-glass reinforced laminate claddings protect insulation from UV, mechanical damage and weather in outdoor and industrial use. Bonded directly to the NBR or XLPE core for permanent, glue-free performance.",
    specs: [
      { label: "Aluminium Thickness", value: "0.025–0.05 mm" },
      { label: "Operating Temp",       value: "−30°C to +80°C" },
      { label: "UV Resistance",        value: "Class A (ASTM G154)" },
      { label: "Peel Strength",        value: "≥8 N/cm" },
    ],
    benefits: ["UV & weather protection", "Chemical resistance", "Self-adhesive variants", "Clean architectural finish"],
  },
];

/* Assist platform is rendered as its own showcase, not a generic card */
const assistFeatures = [
  { Icon: Calculator,    title: "AI Calculators",       desc: "Thermal, condensation, BTU, and pipe-sizing calculators that auto-spec the right Gulf-O-Flex® product." },
  { Icon: FileCheck2,    title: "Compliance Reports",   desc: "Instant ASHRAE 90.1, Estidama Pearl and Dubai Green Building reports in PDF." },
  { Icon: Bot,           title: "Smart Support Agents", desc: "24/7 AI agents trained on Gulf-O-Flex® datasheets, fire approvals and case studies." },
  { Icon: GraduationCap, title: "Free MEP Courses",     desc: "On-demand training for engineers, contractors and technicians - with certificates." },
];

/* ──────────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────────── */
export default function TechnologiesPage() {
  const [activeId, setActiveId] = useState<string>(technologies[0].id);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  // Scroll-spy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    Object.values(sectionsRef.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-20 md:pt-24 pb-8 md:pb-10"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}
      >
        <PageHero src="/images/products/nbr-banner.jpeg" focalY="45%" />

        {/* Glow */}
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-orange-500/[0.10] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] bg-orange-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-end">
            <div>
              <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                <span className="text-neutral-300">/</span>
                <span className="text-neutral-700">Technologies</span>
              </nav>
              <div className="eyebrow mb-6">
                <span className="eyebrow-dot" />Core Technologies · {technologies.length} systems + AI Platform
              </div>
              <h1
                className="text-neutral-900 leading-[0.95] mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                Engineering<br />
                <span className="gradient-text">insulation science</span>
                <span className="serif-italic text-orange-600">.</span>
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                Every Gulf-O-Flex® product is built on decades of material science research, real-world performance data, and - now - AI-assisted specification through Gulf-O-Flex Assist.
              </p>
            </div>

            {/* Tech chip grid */}
            <div className="grid grid-cols-2 gap-2">
              {technologies.slice(0, 6).map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl border bg-white/85 backdrop-blur transition-all duration-300 hover:border-orange-300/60 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)]"
                  style={{ borderColor: "rgba(0,0,0,0.07)" }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${t.accent}22, ${t.accent}08)`,
                      border: `1px solid ${t.accent}33`,
                    }}
                  >
                    <t.Icon size={13} style={{ color: t.accent }} strokeWidth={2.4} />
                  </div>
                  <span className="text-[11px] font-bold text-neutral-700 leading-tight truncate">
                    {t.title.replace("Gulf-O-Flex ", "")}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky side-nav + tech sections ── */}
      <section className="relative bg-white">
        <div className="container-wide py-14 md:py-20">
          <div className="grid lg:grid-cols-[240px_1fr] gap-10 lg:gap-14 items-start">
            {/* Side nav */}
            <aside className="lg:sticky lg:top-28">
              <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-neutral-400 mb-4 pl-1">
                Technology Index
              </div>
              <nav className="space-y-1">
                {technologies.map((t, i) => {
                  const active = activeId === t.id;
                  return (
                    <a
                      key={t.id}
                      href={`#${t.id}`}
                      className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300"
                      style={{
                        background: active ? `${t.accent}10` : "transparent",
                        border: `1px solid ${active ? `${t.accent}30` : "transparent"}`,
                      }}
                    >
                      <span
                        className="text-[10px] font-black tabular-nums tracking-wider transition-colors"
                        style={{ color: active ? t.accent : "#a3a3a3" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="text-xs font-bold leading-tight flex-1"
                        style={{ color: active ? "#171717" : "#525252" }}
                      >
                        {t.title.replace("Gulf-O-Flex ", "")}
                      </span>
                      <ChevronRight
                        size={12}
                        className="transition-transform duration-300"
                        style={{
                          color: active ? t.accent : "#d4d4d4",
                          transform: active ? "translateX(2px)" : "translateX(0)",
                        }}
                      />
                    </a>
                  );
                })}
              </nav>
            </aside>

            {/* Tech cards */}
            <div className="space-y-6">
              {technologies.map((tech, i) => (
                <article
                  key={tech.id}
                  id={tech.id}
                  ref={(el) => {
                    sectionsRef.current[tech.id] = el;
                  }}
                  className="group relative rounded-3xl border bg-white overflow-hidden transition-all duration-500 hover:-translate-y-1 scroll-mt-28"
                  style={{
                    borderColor: "rgba(0,0,0,0.08)",
                    boxShadow: `0 20px 50px -30px ${tech.accent}40`,
                  }}
                >
                  {/* Accent top bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${tech.accent}, transparent)`,
                    }}
                  />
                  {/* Big counter */}
                  <div
                    className="absolute top-7 right-8 text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-400"
                  >
                    {String(i + 1).padStart(2, "0")} / {String(technologies.length).padStart(2, "0")}
                  </div>
                  {/* Tier badge */}
                  <div
                    className="absolute top-7 left-8 text-[9px] font-black tracking-[0.22em] uppercase px-2.5 py-1 rounded-full"
                    style={{
                      background: tech.tint,
                      border: `1px solid ${tech.accent}33`,
                      color: tech.accent,
                    }}
                  >
                    {tech.tier}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 p-8 lg:p-12 pt-20 items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                          style={{
                            background: `linear-gradient(135deg, ${tech.accent}22, ${tech.accent}08)`,
                            border: `1px solid ${tech.accent}33`,
                          }}
                        >
                          <tech.Icon size={22} style={{ color: tech.accent }} strokeWidth={2.2} />
                        </div>
                        <span
                          className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
                          style={{
                            color: tech.accent,
                            background: tech.tint,
                            border: `1px solid ${tech.accent}33`,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: tech.accent }}
                          />
                          {tech.tag}
                        </span>
                      </div>
                      <h2
                        className="text-neutral-900 leading-[1.05] mb-4"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
                          fontWeight: 800,
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {tech.title}
                      </h2>
                      <p className="text-neutral-600 leading-relaxed mb-6">{tech.desc}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {tech.benefits.map((b) => (
                          <div
                            key={b}
                            className="flex items-center gap-2 text-sm text-neutral-700 rounded-lg px-3 py-2 bg-neutral-50 border"
                            style={{ borderColor: "rgba(0,0,0,0.05)" }}
                          >
                            <CheckCircle2
                              size={14}
                              strokeWidth={2.4}
                              style={{ color: tech.accent }}
                            />
                            {b}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specs panel */}
                    <div className="relative">
                      <div
                        className="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, ${tech.accent}1A, transparent)`,
                        }}
                      />
                      <div
                        className="relative rounded-2xl border bg-white overflow-hidden"
                        style={{ borderColor: "rgba(0,0,0,0.06)" }}
                      >
                        <div
                          className="px-6 py-4 border-b flex items-center justify-between"
                          style={{
                            borderColor: "rgba(0,0,0,0.06)",
                            background: `linear-gradient(90deg, ${tech.tint}, transparent)`,
                          }}
                        >
                          <div
                            className="text-[10px] font-bold tracking-[0.18em] uppercase"
                            style={{ color: tech.accent }}
                          >
                            Technical Data
                          </div>
                          <span
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ background: tech.accent }}
                          />
                        </div>
                        <div>
                          {tech.specs.map((spec, idx) => (
                            <div
                              key={spec.label}
                              className="flex items-center justify-between px-6 py-3.5 transition-colors"
                              style={{
                                borderTop: idx === 0 ? "none" : "1px solid rgba(0,0,0,0.04)",
                              }}
                            >
                              <span className="text-sm text-neutral-500 font-medium">{spec.label}</span>
                              <span
                                className="text-sm font-bold text-neutral-900 tabular-nums"
                                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                              >
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison Matrix ── */}
      <section
        className="relative section-padding overflow-hidden"
        style={{ background: "linear-gradient(180deg, #fafafa 0%, #fff 100%)" }}
      >
        <div className="absolute inset-0 dotted-bg opacity-[0.30]" />
        <div className="container-wide relative">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="eyebrow mb-4 mx-auto w-fit">
              <span className="eyebrow-dot" />At a glance
            </div>
            <h2
              className="text-neutral-900 leading-[1.05]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
              }}
            >
              The Gulf-O-Flex® <span className="serif-italic text-orange-600">technology matrix.</span>
            </h2>
          </div>

          <div
            className="overflow-x-auto rounded-2xl border bg-white"
            style={{ borderColor: "rgba(0,0,0,0.07)" }}
          >
            <table className="w-full text-sm min-w-[760px]">
              <thead>
                <tr
                  className="text-left text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-500"
                  style={{ background: "#fafafa", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <th className="px-5 py-4">Technology</th>
                  <th className="px-5 py-4">Tier</th>
                  <th className="px-5 py-4">
                    <span className="inline-flex items-center gap-1"><Thermometer size={11} /> λ</span>
                  </th>
                  <th className="px-5 py-4">
                    <span className="inline-flex items-center gap-1"><Gauge size={11} /> Temp Range</span>
                  </th>
                  <th className="px-5 py-4">Best for</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "NBR", tier: "Core",     lambda: "≤0.036", temp: "−40° → +105°",  best: "HVAC chilled water, ducts",         accent: "#f97316" },
                  { name: "NBR Ultra",       tier: "Premium",  lambda: "≤0.033", temp: "−50° → +110°",  best: "District cooling mains, plants",    accent: "#737373" },
                  { name: "NBR Ultra Line",  tier: "Premium",  lambda: "≤0.033", temp: "−50° → +110°",  best: "Pre-formed factory runs",           accent: "#f97316" },
                  { name: "XLPE",            tier: "Core",     lambda: "≤0.038", temp: "−50° → +120°",  best: "Hot water, solar, industrial",      accent: "#737373" },
                  { name: "Sound",           tier: "Specialty",lambda: "≤0.036", temp: "−40° → +105°",  best: "Acoustic-critical zones",           accent: "#737373" },
                  { name: "Aluglass / Aluclad",tier: "Specialty",lambda: "-",     temp: "−30° → +80°",   best: "Outdoor, plant rooms, UV exposure", accent: "#f97316" },
                ].map((row) => (
                  <tr
                    key={row.name}
                    className="transition-colors hover:bg-orange-50/30"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
                  >
                    <td className="px-5 py-3.5 font-bold text-neutral-900">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: row.accent }}
                        />
                        {row.name}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="text-[9px] font-black tracking-[0.18em] uppercase px-2 py-0.5 rounded-full"
                        style={{
                          background: `${row.accent}14`,
                          border: `1px solid ${row.accent}33`,
                          color: row.accent,
                        }}
                      >
                        {row.tier}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-neutral-700 tabular-nums" style={{ fontFamily: "var(--font-display)" }}>
                      {row.lambda}
                    </td>
                    <td className="px-5 py-3.5 text-neutral-700 tabular-nums" style={{ fontFamily: "var(--font-display)" }}>
                      {row.temp}
                    </td>
                    <td className="px-5 py-3.5 text-neutral-500">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Gulf-O-Flex Assist Showcase (futuristic / AI theme) ── */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: "#0a0a0a" }}>
        {/* Aurora */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full blur-[140px]" style={{ background: "rgba(249,115,22,0.18)" }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: "rgba(249,115,22,0.18)" }} />
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: "rgba(249,115,22,0.12)" }} />
        </div>
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 80%)",
          }}
        />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.22em] uppercase mb-6"
                style={{
                  background: "linear-gradient(90deg, rgba(249,115,22,0.18), rgba(234,88,12,0.18))",
                  border: "1px solid rgba(249,115,22,0.40)",
                  color: "#fdba74",
                }}
              >
                <Cpu size={11} /> NEW · AI Platform
              </div>
              <h2
                className="text-white leading-[0.98] mb-5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                Meet{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #fdba74 0%, #f97316 60%, #ea580c 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Gulf-O-Flex Assist
                </span>
                <br />
                <span className="serif-italic text-white/80">your smart MEP partner.</span>
              </h2>
              <p className="text-white/65 text-lg leading-relaxed max-w-xl mb-8">
                The first all-in-one digital platform built for HVAC and MEP engineers - AI-powered calculators, instant compliance reports, intelligent support agents, and free training, all in one workspace.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <a
                  href="https://gulfoflexassist.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_-10px_rgba(249,115,22,0.50)]"
                  style={{
                    background: "linear-gradient(90deg, #f97316 0%, #ea580c 100%)",
                    color: "#fff",
                  }}
                >
                  Try Assist <ArrowUpRight size={14} />
                </a>
                <Link
                  href="/gulf-o-flex-assist"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold border transition-all duration-300 hover:border-white/40"
                  style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.85)" }}
                >
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/50">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  Live · v2.0
                </span>
                <span className="w-px h-3 bg-white/20" />
                <span>5,000+ active engineers</span>
                <span className="w-px h-3 bg-white/20" />
                <span>200+ projects specified</span>
              </div>
            </div>

            {/* Right: feature panel */}
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(249,115,22,0.18), rgba(234,88,12,0.18), transparent)",
                }}
              />
              <div
                className="relative rounded-3xl p-6 md:p-7 backdrop-blur-xl border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.10)",
                }}
              >
                {/* Top bar */}
                <div
                  className="flex items-center justify-between pb-4 mb-4 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">
                    gulfoflexassist.com
                  </span>
                  <Bot size={14} className="text-orange-400" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {assistFeatures.map((f) => (
                    <div
                      key={f.title}
                      className="group rounded-2xl p-4 border transition-all duration-400 hover:-translate-y-0.5"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        borderColor: "rgba(255,255,255,0.08)",
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(249,115,22,0.20), rgba(234,88,12,0.20))",
                          border: "1px solid rgba(249,115,22,0.30)",
                        }}
                      >
                        <f.Icon size={16} className="text-orange-300" strokeWidth={2.2} />
                      </div>
                      <div
                        className="text-white font-bold text-sm mb-1"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}
                      >
                        {f.title}
                      </div>
                      <p className="text-white/50 text-[11px] leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>

                {/* AI prompt bar mock */}
                <div
                  className="mt-5 flex items-center gap-3 px-4 py-3 rounded-2xl border"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    borderColor: "rgba(249,115,22,0.25)",
                  }}
                >
                  <Sparkles size={14} className="text-orange-300" />
                  <span className="text-[12px] text-white/55 flex-1 truncate">
                    "Specify NBR thickness for 6\" chilled water in 45°C ambient…"
                  </span>
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
