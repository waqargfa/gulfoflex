"use client";

import { useCountry } from "@/context/CountryContext";
import type { CountryInitiative } from "@/context/CountryContext";

/* ── Per-country initiative logo/badge ────────────────────────────── */
function InitiativeLogo({ initiative }: { initiative: CountryInitiative }) {
  const { themeColor, accentColor, title } = initiative;
  // Split "UAE Net Zero 2050" → ["UAE NET ZERO", "2050"] or similar for display
  const words = title.split(" ");
  const mainWords = words.slice(0, -1).join(" ");
  const lastWord = words[words.length - 1];

  return (
    <svg
      viewBox="0 0 188 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[110px] h-auto flex-shrink-0"
      aria-label={title}
    >
      <rect width="188" height="58" rx="6" fill={themeColor} />
      {/* Accent top bar */}
      <rect y="0" width="188" height="3" rx="0" fill={accentColor} />
      {/* Main words */}
      <text
        x="94" y="24"
        textAnchor="middle"
        fill="white"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="11"
        letterSpacing="3"
      >
        {mainWords.toUpperCase()}
      </text>
      {/* Last word (year / key term) in accent */}
      <text
        x="94" y="44"
        textAnchor="middle"
        fill={accentColor}
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontSize="17"
        letterSpacing="2"
      >
        {lastWord}
      </text>
      {/* Decorative circles */}
      <circle cx="15" cy="29" r="7" fill="none" stroke={accentColor} strokeWidth="0.8" opacity="0.55" />
      <circle cx="173" cy="29" r="7" fill="none" stroke={accentColor} strokeWidth="0.8" opacity="0.55" />
    </svg>
  );
}

/* ── Banner ────────────────────────────────────────────────────────── */
export default function CountryInitiativeBanner() {
  const { country } = useCountry();
  if (!country.initiative) return null;

  const v = country.initiative;
  const { themeColor, accentColor } = v;

  /* Darken theme for gradient end */
  const darken = (hex: string) => hex; // gradient handled inline

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${themeColor} 0%, color-mix(in srgb, ${themeColor} 70%, black) 60%, color-mix(in srgb, ${themeColor} 50%, black) 100%)`,
      }}
      aria-label={`${v.title} Partnership`}
    >
      {/* Grid texture */}
      <div className="absolute inset-0 grid-bg opacity-[0.06]" />

      {/* Accent glow */}
      <div
        className="absolute -top-32 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentColor}30 0%, transparent 65%)`,
          filter: "blur(40px)",
        }}
      />

      {/* Top & bottom accent lines */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }}
      />

      <div className="container-wide py-10 relative z-10">

        {/* ── Top row: logo + headline + desktop metrics ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">

          <InitiativeLogo initiative={v} />

          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 text-[9px] font-black tracking-[0.28em] uppercase px-3 py-1 rounded-full mb-2"
              style={{
                background: `${accentColor}1A`,
                border: `1px solid ${accentColor}55`,
                color: accentColor,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: accentColor }}
              />
              {v.badge}
            </div>
            <p
              className="text-white/75 text-sm leading-relaxed max-w-2xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {v.tagline}
            </p>
          </div>

          {/* Metrics — desktop only */}
          <div
            className="hidden lg:grid grid-cols-4 gap-px rounded-xl overflow-hidden flex-shrink-0"
            style={{
              background: `${accentColor}1F`,
              border: `1px solid ${accentColor}33`,
            }}
          >
            {v.metrics.map((m) => (
              <div
                key={m.label}
                className="px-5 py-4 text-center"
                style={{ background: "rgba(0,0,0,0.20)" }}
              >
                <div
                  className="font-black text-xl leading-none mb-1"
                  style={{
                    color: accentColor,
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {m.value}
                </div>
                <div className="text-white/55 text-[9px] uppercase tracking-wider font-semibold leading-tight whitespace-nowrap">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Metrics — mobile ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 lg:hidden">
          {v.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl px-4 py-3 text-center"
              style={{
                background: "rgba(0,0,0,0.25)",
                border: `1px solid ${accentColor}33`,
              }}
            >
              <div
                className="font-black text-lg leading-none mb-1"
                style={{ color: accentColor, fontFamily: "var(--font-display)" }}
              >
                {m.value}
              </div>
              <div className="text-white/55 text-[9px] uppercase tracking-wider font-semibold">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Key-project chip strip ── */}
        <div>
          <p
            className="text-[9px] font-black tracking-[0.25em] uppercase mb-3"
            style={{ color: `${accentColor}99` }}
          >
            Key Projects &amp; Programmes
          </p>
          <div className="flex flex-wrap gap-2">
            {v.keyProjects.map((p) => (
              <span
                key={p.name}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wide"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: accentColor }}
                />
                {p.name}
                <span
                  className="text-[8px] font-semibold tracking-wider px-1.5 py-0.5 rounded-full"
                  style={{
                    background: `${accentColor}22`,
                    color: accentColor,
                  }}
                >
                  {p.type}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
