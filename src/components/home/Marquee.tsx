"use client";

/* ─────────────────────────────────────────────────────────
   Partner logo data — branded monograms for consistency
───────────────────────────────────────────────────────── */
const partners: { name: string; short: string; accent: string }[] = [
  { name: "EMAAR",         short: "EM",  accent: "#0057A8" },
  { name: "DEWA",          short: "DW",  accent: "#00843D" },
  { name: "ADNOC",         short: "AD",  accent: "#E63027" },
  { name: "ARAMCO",        short: "AR",  accent: "#009A44" },
  { name: "QATAR RAIL",    short: "QR",  accent: "#8B1A4A" },
  { name: "ALEC",          short: "AL",  accent: "#1D3557" },
  { name: "DRAKE & SCULL", short: "DS",  accent: "#2563EB" },
  { name: "KEO",           short: "KE",  accent: "#F97316" },
  { name: "WSP",           short: "WS",  accent: "#CC0000" },
  { name: "AECOM",         short: "AE",  accent: "#FF6600" },
  { name: "BECHTEL",       short: "BC",  accent: "#003087" },
  { name: "PARSONS",       short: "PA",  accent: "#00205B" },
  { name: "JACOBS",        short: "JA",  accent: "#C8102E" },
  { name: "ARCADIS",       short: "AC",  accent: "#F97316" },
  { name: "L&T",           short: "L&T", accent: "#0EA5E9" },
  { name: "CCC",           short: "CC",  accent: "#10B981" },
];

const specs = [
  "λ ≤ 0.034 W/mK", "Class O · BS 476", "ISO 9001 · ISO 14001",
  "FM Approved", "LPCB Certified", "CE Marked · Gulf Mark",
  "−40°C to +105°C", "μ ≥ 10,000", "CFC & HCFC Free · 0 ODP",
  "ASTM E84 Compliant", "IMO FTP Code", "ASHRAE 90.1",
];

function LogoBadge({ partner }: { partner: typeof partners[0] }) {
  return (
    <div
      className="group flex-shrink-0 flex flex-col items-center gap-2.5 cursor-default select-none"
      style={{ width: 110 }}
    >
      {/* Badge */}
      <div
        className="relative flex items-center justify-center rounded-2xl border transition-all duration-500 overflow-hidden group-hover:scale-105"
        style={{
          width: 76,
          height: 76,
          background: "rgba(255,255,255,0.04)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        {/* Colored glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${partner.accent}33 0%, transparent 70%)`,
            boxShadow: `inset 0 0 0 1px ${partner.accent}55`,
          }}
        />

        {/* Top accent bar */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            width: "60%",
            background: partner.accent,
            boxShadow: `0 0 12px ${partner.accent}`,
          }}
        />

        {/* Monogram */}
        <span
          className="relative z-10 font-black leading-none transition-all duration-500 text-neutral-500 group-hover:text-white"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: partner.short.length > 2 ? "0.9rem" : "1.35rem",
            letterSpacing: "-0.04em",
          }}
        >
          {partner.short}
        </span>
      </div>

      {/* Company name */}
      <span
        className="text-neutral-500 group-hover:text-neutral-200 transition-colors duration-400 text-center leading-tight"
        style={{
          fontSize: "0.52rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-inter)",
        }}
      >
        {partner.name}
      </span>
    </div>
  );
}

export default function Marquee() {
  const doubled = [...partners, ...partners];

  return (
    <section
      className="relative overflow-hidden bg-neutral-950 border-y"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
      aria-label="Trusted partners"
    >
      {/* Gradient lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      {/* Header */}
      <div className="container-wide pt-10 pb-8">
        <div className="flex items-center justify-center gap-4">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-orange-500/60" />
          <span
            className="text-neutral-500"
            style={{
              fontSize: "0.625rem",
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              fontFamily: "var(--font-inter)",
            }}
          >
            Trusted by Industry Leaders · GCC & Beyond
          </span>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-orange-500/60" />
        </div>
      </div>

      {/* ── Logo marquee row ── */}
      <div
        className="relative mb-8"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div
          className="flex w-max"
          style={{
            gap: "2.5rem",
            animation: "marquee 55s linear infinite",
          }}
        >
          {doubled.map((p, i) => (
            <LogoBadge key={`${p.name}-${i}`} partner={p} />
          ))}
        </div>
      </div>

      {/* ── Specs ticker — reverse ── */}
      <div
        className="relative pb-8"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div
          className="flex w-max"
          style={{
            gap: "3.5rem",
            animation: "marquee 65s linear infinite reverse",
          }}
        >
          {[...specs, ...specs].map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 flex-shrink-0 text-neutral-600 hover:text-orange-400 transition-colors duration-300"
            >
              <span className="text-orange-500/40" style={{ fontSize: "0.5rem" }}>◆</span>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  whiteSpace: "nowrap",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
