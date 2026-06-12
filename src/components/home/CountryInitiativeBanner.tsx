"use client";

import Image from "next/image";
import { useCountry } from "@/context/CountryContext";

/* ── Per-country background imagery (Unsplash) ─────────────────────── */
const COUNTRY_BG: Record<string, string> = {
  ae: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=2400&q=70",
  sa: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=2400&q=70",
  lk: "https://images.unsplash.com/photo-1588598198321-9735fd53867e?auto=format&fit=crop&w=2400&q=70",
  eg: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=2400&q=70",
  pk: "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=2400&q=70",
  za: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=2400&q=70",
};

/* ── Banner ────────────────────────────────────────────────────────── */
export default function CountryInitiativeBanner() {
  const { country } = useCountry();
  if (!country.initiative) return null;

  const v = country.initiative;
  const { themeColor, accentColor } = v;
  const bgImg = COUNTRY_BG[country.code];
  const isThreeMetricLayout = v.metrics.length === 3;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${themeColor} 0%, color-mix(in srgb, ${themeColor} 65%, black) 55%, color-mix(in srgb, ${themeColor} 45%, black) 100%)`,
      }}
      aria-label={`${v.title} Partnership`}
    >
      {/* Real country background image */}
      {bgImg && (
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={bgImg}
            alt={`${country.name} infrastructure`}
            fill
            className="object-cover object-center"
            style={{ opacity: 0.10, mixBlendMode: "luminosity" }}
            sizes="100vw"
          />
          {/* Re-apply the gradient on top of the image so the design is preserved */}
          <div className="absolute inset-0" style={{
            background: `linear-gradient(160deg, ${themeColor}e0 0%, color-mix(in srgb, ${themeColor} 70%, black)cc 55%, color-mix(in srgb, ${themeColor} 50%, black)dd 100%)`,
          }} />
        </div>
      )}

      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(${accentColor}40 1px, transparent 1px), linear-gradient(90deg, ${accentColor}40 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial glow top-right */}
      <div
        className="absolute -top-20 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top right, ${accentColor}25 0%, transparent 65%)`,
          filter: "blur(30px)",
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${accentColor} 30%, ${accentColor} 70%, transparent 100%)` }}
      />
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)` }}
      />

      <div className="container-wide py-8 sm:py-10 lg:py-12 relative z-10">

        {/* ── Header: badge + title + tagline ── */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-8 sm:mb-10">

          {/* Initiative emblem */}
          <div
            className="flex-shrink-0 self-start flex flex-col items-center justify-center rounded-2xl px-5 py-4 min-w-[110px] text-center"
            style={{
              background: `rgba(0,0,0,0.30)`,
              border: `1px solid ${accentColor}50`,
              boxShadow: `0 0 24px ${accentColor}20`,
            }}
          >
            {(() => {
              const words = v.title.split(" ");
              const last = words[words.length - 1];
              const main = words.slice(0, -1).join(" ");
              return (
                <>
                  <span className="text-white/70 text-[9px] font-bold tracking-[0.18em] uppercase leading-tight block mt-1">
                    {main}
                  </span>
                  <span
                    className="font-black text-lg leading-none tracking-tight"
                    style={{ color: accentColor }}
                  >
                    {last}
                  </span>
                </>
              );
            })()}
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h2
              className="text-white font-black text-xl sm:text-2xl lg:text-3xl leading-tight mb-2"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              {v.title}
            </h2>

            {/* Tagline */}
            <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-2xl">
              {v.tagline}
            </p>
          </div>
        </div>

        {/* ── Metrics grid ── */}
        <div
          className={`grid gap-3 sm:gap-4 mb-8 sm:mb-10 ${isThreeMetricLayout ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}
        >
          {v.metrics.map((m, i) => (
            <div
              key={m.label}
              className={`relative rounded-2xl text-center overflow-hidden group ${isThreeMetricLayout ? "px-5 py-5 sm:px-6 sm:py-7" : "px-4 py-4 sm:py-5"}`}
              style={{
                background: "rgba(0,0,0,0.28)",
                border: `1px solid ${accentColor}30`,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: `${accentColor}10` }}
              />
              {/* Number */}
              <div
                className={`font-black leading-none relative z-10 ${isThreeMetricLayout ? "text-3xl sm:text-4xl mb-2" : "text-2xl sm:text-3xl mb-1.5"}`}
                style={{
                  color: accentColor,
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.03em",
                  textShadow: `0 0 20px ${accentColor}50`,
                }}
              >
                {m.value}
              </div>
              {/* Label */}
              <div className={`text-white/55 uppercase tracking-wider font-semibold leading-tight relative z-10 ${isThreeMetricLayout ? "text-[11px] sm:text-xs" : "text-[10px] sm:text-[11px]"}`}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div
          className="h-px mb-6 sm:mb-8"
          style={{ background: `linear-gradient(90deg, ${accentColor}40, ${accentColor}15, transparent)` }}
        />

        {/* ── Key projects ── */}
        <div>
          <p
            className="text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase mb-4"
            style={{ color: `${accentColor}80` }}
          >
            Key Projects &amp; Programmes
          </p>
          <div className="flex flex-wrap gap-2">
            {v.keyProjects.map((p) => {
              const regionLabel = /\bOMAN\b/i.test(p.name) ? "Oman" : p.type;

              return (
              <span
                key={`${p.name}-${regionLabel}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.13)",
                  color: "rgba(255,255,255,0.80)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: accentColor }}
                />
                <span>{p.name}</span>
                <span
                  suppressHydrationWarning
                  className="text-[9px] font-semibold tracking-wide px-1.5 py-0.5 rounded-full"
                  style={{
                    background: `${accentColor}20`,
                    color: accentColor,
                  }}
                >
                  {regionLabel}
                </span>
              </span>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
}
