"use client";

import { useCountry } from "@/context/CountryContext";

/* Official Vision 2030 colour palette */
const V_GREEN = "#006C35";
const V_GOLD  = "#C8A84B";

/* Inline SVG badge matching the Saudi Vision 2030 identity */
function Vision2030Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Saudi Vision 2030"
    >
      <rect width="180" height="56" rx="6" fill={V_GREEN} />
      {/* Gold top accent line */}
      <rect y="0" width="180" height="3" rx="0" fill={V_GOLD} />
      {/* "VISION" label */}
      <text
        x="90" y="22"
        textAnchor="middle"
        fill="white"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="13"
        letterSpacing="4"
      >
        VISION
      </text>
      {/* "2030" bold large */}
      <text
        x="90" y="42"
        textAnchor="middle"
        fill={V_GOLD}
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontSize="18"
        letterSpacing="2"
      >
        2030
      </text>
      {/* subtle Saudi star motif */}
      <circle cx="16" cy="28" r="7" fill="none" stroke={V_GOLD} strokeWidth="0.8" opacity="0.6" />
      <circle cx="164" cy="28" r="7" fill="none" stroke={V_GOLD} strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

export default function KSAVision2030Banner() {
  const { country } = useCountry();

  if (!country.initiative || country.code !== 'sa') return null;
  const v = country.initiative;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${V_GREEN} 0%, #004d27 60%, #003319 100%)` }}
      aria-label="Saudi Vision 2030 Partnership"
    >
      {/* Grid texture */}
      <div className="absolute inset-0 grid-bg opacity-[0.06]" />

      {/* Gold glow orb */}
      <div
        className="absolute -top-32 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(200,168,75,0.18) 0%, transparent 65%)`, filter: "blur(40px)" }}
      />
      {/* Top & bottom accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${V_GOLD}, transparent)` }} />
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${V_GOLD}60, transparent)` }} />

      <div className="container-wide py-10 relative z-10">
        {/* Top row: logo + headline */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <Vision2030Logo className="w-[110px] h-auto flex-shrink-0" />
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 text-[9px] font-black tracking-[0.28em] uppercase px-3 py-1 rounded-full mb-2"
              style={{ background: "rgba(200,168,75,0.18)", border: `1px solid rgba(200,168,75,0.40)`, color: V_GOLD }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: V_GOLD }}
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

          {/* Metrics row — desktop right */}
          <div className="hidden lg:grid grid-cols-4 gap-px rounded-xl overflow-hidden flex-shrink-0" style={{ background: "rgba(200,168,75,0.12)", border: `1px solid rgba(200,168,75,0.20)` }}>
            {v.metrics.map((m) => (
              <div key={m.label} className="px-5 py-4 text-center" style={{ background: "rgba(0,0,0,0.20)" }}>
                <div
                  className="font-black text-xl leading-none mb-1"
                  style={{ color: V_GOLD, fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
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

        {/* Metrics row — mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 lg:hidden">
          {v.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl px-4 py-3 text-center"
              style={{ background: "rgba(0,0,0,0.25)", border: `1px solid rgba(200,168,75,0.20)` }}
            >
              <div
                className="font-black text-lg leading-none mb-1"
                style={{ color: V_GOLD, fontFamily: "var(--font-display)" }}
              >
                {m.value}
              </div>
              <div className="text-white/55 text-[9px] uppercase tracking-wider font-semibold">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mega-projects chip strip */}
        <div>
          <p
            className="text-[9px] font-black tracking-[0.25em] uppercase mb-3"
            style={{ color: `${V_GOLD}99` }}
          >
            Active on Vision 2030 Key Projects
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
                  style={{ background: V_GOLD }}
                />
                {p.name}
                <span
                  className="text-[8px] font-semibold tracking-wider px-1.5 py-0.5 rounded-full"
                  style={{ background: `rgba(200,168,75,0.15)`, color: V_GOLD }}
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
