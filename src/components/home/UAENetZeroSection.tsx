"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCountry } from "@/context/CountryContext";
import {
  Leaf, Zap, Sun, Wind, ArrowRight, CheckCircle2,
  BarChart3, Globe2, Award, Droplets, TrendingUp, Sparkles,
} from "lucide-react";

/* ─── UAE-specific data ──────────────────────────────────────────── */
const IMPACT_STATS = [
  { value: "30%+",  label: "Energy Saved\nPer Project",    icon: Zap,      color: "#10B981", glow: "rgba(16,185,129,0.35)" },
  { value: "12:1",  label: "CO₂ Savings\nRatio",           icon: Leaf,     color: "#34D399", glow: "rgba(52,211,153,0.30)" },
  { value: "ODP=0", label: "Zero Ozone\nDepletion",         icon: Wind,     color: "#6EE7B7", glow: "rgba(110,231,183,0.28)" },
  { value: "EPD",   label: "Environmentally\nDeclared",     icon: Award,    color: "#059669", glow: "rgba(5,150,105,0.32)" },
];

const GREEN_PILLARS = [
  {
    icon: Sun,
    title: "Zero ODP Materials",
    desc: "All products use blowing agents with zero Ozone Depletion Potential — fully Montreal Protocol compliant.",
    metric: "ODP = 0",
    color: "#10B981",
  },
  {
    icon: BarChart3,
    title: "Low-GWP Formulation",
    desc: "Next-generation NBR formulation reduces embodied carbon footprint by 40% vs conventional HFC insulation.",
    metric: "–40% Carbon",
    color: "#34D399",
  },
  {
    icon: Droplets,
    title: "Water Conservation",
    desc: "100% process water recycled through our closed-loop cooling system at the Ajman manufacturing facility.",
    metric: "85% Recycled",
    color: "#6EE7B7",
  },
  {
    icon: TrendingUp,
    title: "Carbon-Neutral 2030",
    desc: "Committed to carbon-neutral manufacturing by 2030 through renewable energy and verified carbon offsetting.",
    metric: "Target: 2030",
    color: "#059669",
  },
];

const UAE_PROJECTS = [
  {
    name: "Sustainable City UAE",
    type: "Net-Zero Community",
    img: "/case-studies/sustainable-city-uae.webp",
    stat: "46,000 m²",
  },
  {
    name: "Sustainable City Oman",
    type: "Green Development",
    img: "/case-studies/sustainable-city-oman.webp",
    stat: "32,000 m²",
  },
  {
    name: "Sobha Hartland",
    type: "LEED Certified Residences",
    img: "/case-studies/sobha-hartland.webp",
    stat: "8 Million sq ft",
  },
  {
    name: "CBD Sharjah",
    type: "Urban Sustainability",
    img: "/case-studies/cbd-sharjah.webp",
    stat: "120+ Buildings",
  },
];

/* ─── Animated counter ───────────────────────────────────────────── */
function GreenBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide"
      style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.35)", color: "#34D399" }}>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      {text}
    </span>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function UAENetZeroSection() {
  const { country } = useCountry();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Only render for UAE */
  if (country.code !== "ae") return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #064e3b 0%, #065f46 45%, #047857 100%)" }}
      aria-label="UAE Net Zero 2050 Sustainability"
    >
      {/* ── Layered backgrounds ───────────────────────────────────── */}

      {/* Real UAE green city background image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=75"
          alt="Dubai sustainable skyline"
          fill
          className="object-cover object-center"
          style={{ opacity: 0.18, mixBlendMode: "luminosity" }}
          sizes="100vw"
        />
        {/* Soft green overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, rgba(6,78,59,0.78) 0%, rgba(6,95,70,0.72) 50%, rgba(4,120,87,0.78) 100%)"
        }} />
      </div>

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glows */}
      <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 65%)", filter: "blur(60px)" }} />
      <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(5,150,105,0.15) 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 65%)", filter: "blur(60px)" }} />

      {/* Top & bottom accent lines */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.60), transparent)" }} />
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.30), transparent)" }} />

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="container-wide relative z-10 py-20 md:py-28 lg:py-32">

        {/* ── Section header ───────────────────────────────────────── */}
        <div className={`max-w-3xl mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <GreenBadge text="UAE Net Zero 2050 Aligned" />
            <GreenBadge text="COP28 Dubai Legacy" />
            <GreenBadge text="EPD Verified" />
          </div>
          <h2 className="text-white font-black leading-[0.95] mb-5"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.04em" }}>
            Insulation engineered<br />
            for a{" "}
            <span style={{
              background: "linear-gradient(135deg, #10B981 0%, #34D399 40%, #6EE7B7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              greener UAE.
            </span>
          </h2>
          <p className="text-white/55 text-lg md:text-xl leading-relaxed max-w-2xl">
            Gulf-O-Flex® insulation directly reduces building energy consumption and carbon emissions —
            actively contributing to the UAE's landmark <strong className="text-emerald-400/80 font-semibold">Net Zero by 2050</strong> Strategic Initiative
            and the COP28 legacy agenda.
          </p>
        </div>

        {/* ── Main two-column layout ────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-10 lg:gap-14 items-start mb-16">

          {/* Left: Pillars grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {GREEN_PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="group relative rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(16,185,129,0.15)",
                    transitionDelay: `${i * 60}ms`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.7s ease ${i * 80}ms, transform 0.7s ease ${i * 80}ms`,
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top left, ${p.color}12 0%, transparent 60%)` }} />

                  {/* Top accent */}
                  <div className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${p.color}80, transparent)` }} />

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${p.color}18`, border: `1px solid ${p.color}30` }}>
                      <Icon size={18} style={{ color: p.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="text-white font-bold text-sm leading-tight"
                          style={{ fontFamily: "var(--font-display)" }}>
                          {p.title}
                        </h3>
                        <span className="flex-shrink-0 text-[10px] font-black px-2 py-0.5 rounded-full"
                          style={{ background: `${p.color}18`, color: p.color }}>
                          {p.metric}
                        </span>
                      </div>
                      <p className="text-white/45 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Visual impact card */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.9s ease 200ms, transform 0.9s ease 200ms",
            }}
          >
            {/* Background image */}
            <div className="relative h-52 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80"
                alt="Solar panels UAE"
                fill
                className="object-cover object-center"
                sizes="460px"
              />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(180deg, rgba(2,13,8,0.3) 0%, rgba(2,13,8,0.85) 100%)"
              }} />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-2"
                  style={{ background: "rgba(16,185,129,0.20)", border: "1px solid rgba(16,185,129,0.40)", color: "#34D399" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Real Environmental Impact
                </div>
                <div className="text-white font-black text-lg leading-tight"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                  Every roll prevents<br />
                  <span style={{ color: "#34D399" }}>tonnes of CO₂</span>
                </div>
              </div>
            </div>

            {/* Stats panel */}
            <div style={{ background: "rgba(4,26,14,0.95)", border: "1px solid rgba(16,185,129,0.15)", borderTop: "none" }}
              className="rounded-b-3xl">
              <div className="grid grid-cols-2 divide-x divide-y"
                style={{ borderColor: "rgba(16,185,129,0.12)" }}>
                {IMPACT_STATS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="p-5 group hover:bg-emerald-500/5 transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${s.color}18` }}>
                          <Icon size={13} style={{ color: s.color }} />
                        </div>
                        <div className="font-black text-xl leading-none"
                          style={{ color: s.color, fontFamily: "var(--font-display)", textShadow: `0 0 16px ${s.glow}` }}>
                          {s.value}
                        </div>
                      </div>
                      <div className="text-white/45 text-[10px] font-semibold uppercase tracking-wide leading-tight whitespace-pre-line">
                        {s.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── UAE Project Showcase ──────────────────────────────────── */}
        <div
          className="mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s ease 350ms, transform 0.9s ease 350ms",
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(16,185,129,0.40), transparent)" }} />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "rgba(16,185,129,0.60)" }}>
              GCC Landmark Projects
            </span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.40))" }} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {UAE_PROJECTS.map((proj, i) => (
              <div
                key={proj.name}
                className="group relative rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(16,185,129,0.15)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.7s ease ${400 + i * 100}ms, transform 0.7s ease ${400 + i * 100}ms`,
                }}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={proj.img}
                    alt={proj.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(180deg, transparent 30%, rgba(2,13,8,0.90) 100%)"
                  }} />
                  {/* Stat badge */}
                  <div className="absolute top-3 right-3 text-[10px] font-black px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(16,185,129,0.22)", border: "1px solid rgba(16,185,129,0.40)", color: "#34D399" }}>
                    {proj.stat}
                  </div>
                </div>
                {/* Info */}
                <div className="p-4" style={{ background: "rgba(6,78,59,0.96)" }}>
                  <div className="text-[9px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: "rgba(110,231,183,0.90)" }}>
                    {proj.type}
                  </div>
                  <div className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
                    {proj.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA row ──────────────────────────────────────────────── */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8"
          style={{
            borderTop: "1px solid rgba(16,185,129,0.15)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease 600ms, transform 0.8s ease 600ms",
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
              <span className="text-white/80 text-sm font-medium">Certified low-carbon product range</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
              <span className="text-white/80 text-sm font-medium">Environmental Product Declaration (EPD) verified</span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/sustainability"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #059669, #10B981)",
                color: "white",
                boxShadow: "0 8px 24px rgba(5,150,105,0.35)",
              }}
            >
              Our Sustainability Commitment
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/certifications"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm border transition-all duration-300 hover:bg-white/5"
              style={{ borderColor: "rgba(16,185,129,0.30)", color: "rgba(16,185,129,0.85)" }}
            >
              View Certifications
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
