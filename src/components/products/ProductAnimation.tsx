/**
 * ProductAnimation — unique cinematic SVG animation for each Gulf-O-Flex® product.
 * Server component: pure SVG + CSS keyframes, no client state required.
 */

type Props = {
  slug: string;
  shortName: string;
  specValue?: string; // e.g. "≤ 0.036 W/mK"
  productCount?: number;
  index?: number;
};

export default function ProductAnimation({ slug, shortName, specValue, productCount = 6, index = 1 }: Props) {
  switch (slug) {
    case "xlpe":        return <XLPEAnimation shortName={shortName} productCount={productCount} index={index} />;
    case "sound":       return <SoundAnimation shortName={shortName} productCount={productCount} index={index} />;
    case "aluglass":    return <AluglassAnimation shortName={shortName} productCount={productCount} index={index} />;
    case "aluclad":     return <AluCladAnimation shortName={shortName} productCount={productCount} index={index} />;
    case "accessories": return <AccessoriesAnimation shortName={shortName} productCount={productCount} index={index} />;
    default:            return <NBRAnimation shortName={shortName} specValue={specValue} productCount={productCount} index={index} />;
  }
}

/* ─────────────────────────────────────────────────────────────
   1.  NBR  —  Rubber insulation sleeve sliding onto a steel pipe
   ───────────────────────────────────────────────────────────── */
function NBRAnimation({ shortName, specValue, productCount, index }: Omit<Props, "slug"> & { productCount: number; index: number }) {
  return (
    <div className="relative h-80 flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes nbr-sleeve {
          0%   { transform: translate(315px, 0); opacity: 0; }
          8%   { opacity: 0.95; }
          45%  { transform: translate(0px,   0); opacity: 1; }
          82%  { transform: translate(0px,   0); opacity: 1; }
          100% { transform: translate(0px,   0); opacity: 1; }
        }
        @keyframes nbr-seal-flash {
          0%, 60%  { opacity: 0; }
          66%      { opacity: 1; }
          75%      { opacity: 0.4; }
          83%      { opacity: 0.9; }
          100%     { opacity: 0.55; }
        }
        @keyframes nbr-mist {
          0%   { transform: translate(0,0) scale(0.6); opacity: 0; }
          20%  { opacity: 0.8; }
          100% { transform: translate(var(--mx,0px), -40px) scale(1.6); opacity: 0; }
        }
        @keyframes nbr-flow {
          0%   { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes nbr-scan {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(120%); }
        }
        @keyframes nbr-roller {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes nbr-bead {
          0%   { transform: translateX(0); opacity: 0; }
          10%  { opacity: 0.9; }
          90%  { opacity: 0.9; }
          100% { transform: translateX(60px); opacity: 0; }
        }
        @keyframes nbr-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.05); }
        }
        @keyframes nbr-counter { 0%,100%{opacity:.55}50%{opacity:1} }
        .nbr-sleeve  { animation: nbr-sleeve  5.5s cubic-bezier(0.7,0,0.25,1) infinite; }
        .nbr-seal    { animation: nbr-seal-flash 5.5s ease-in-out infinite; }
        .nbr-mist    { animation: nbr-mist 2.4s ease-out infinite; }
        .nbr-flow    { stroke-dasharray: 4 6; animation: nbr-flow 1.2s linear infinite; }
        .nbr-scan    { animation: nbr-scan 3.6s linear infinite; }
        .nbr-counter { animation: nbr-counter 2s ease-in-out infinite; }
        .nbr-roller  { animation: nbr-roller 1.8s linear infinite; transform-origin: center; transform-box: fill-box; }
        .nbr-bead    { animation: nbr-bead 2.4s ease-out infinite; }
        .nbr-pulse   { animation: nbr-pulse 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .nbr-sleeve,.nbr-seal,.nbr-mist,.nbr-flow,.nbr-scan,.nbr-counter,.nbr-roller,.nbr-bead,.nbr-pulse { animation: none !important; }
          .nbr-sleeve { transform: translate(0,0); opacity: 1; }
          .nbr-seal   { opacity: 0.55; }
        }
      `}</style>

      {/* Stage backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(249,115,22,0.20),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(56,189,248,0.08),transparent_55%)]" />
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* Scan line */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="nbr-scan h-full w-1/3 bg-gradient-to-r from-transparent via-orange-400/80 to-transparent" />
      </div>

      {/* Cold mist particles */}
      <div className="absolute inset-0 pointer-events-none">
        {([
          { x: "32%", y: "62%", d: "0s",   mx: "-6px" },
          { x: "48%", y: "58%", d: "0.6s", mx: "4px"  },
          { x: "62%", y: "60%", d: "1.1s", mx: "-3px" },
          { x: "72%", y: "57%", d: "1.6s", mx: "8px"  },
          { x: "40%", y: "65%", d: "0.3s", mx: "2px"  },
          { x: "55%", y: "63%", d: "1.9s", mx: "-4px" },
        ] as const).map((p, i) => (
          <span
            key={i}
            className="nbr-mist absolute block w-1.5 h-1.5 rounded-full bg-cyan-200/35 blur-[1px]"
            style={{ left: p.x, top: p.y, animationDelay: p.d, ["--mx" as never]: p.mx }}
          />
        ))}
      </div>

      <svg viewBox="0 0 360 200" className="relative z-10 w-[94%] h-auto" aria-hidden="true">
        <defs>
          <linearGradient id="nbr-pipe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#3f3f46" />
            <stop offset="18%" stopColor="#a1a1aa" />
            <stop offset="35%" stopColor="#f4f4f5" />
            <stop offset="50%" stopColor="#e4e4e7" />
            <stop offset="68%" stopColor="#71717a" />
            <stop offset="100%" stopColor="#27272a" />
          </linearGradient>
          <linearGradient id="nbr-pipe-inner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(0,0,0,0.55)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          <radialGradient id="nbr-hollow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"   stopColor="#000000" />
            <stop offset="55%"  stopColor="#0a0a0a" />
            <stop offset="100%" stopColor="#3f3f46" />
          </radialGradient>
          <linearGradient id="nbr-cap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#a1a1aa" />
            <stop offset="50%"  stopColor="#52525b" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>
          <linearGradient id="nbr-rubber" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1f1f1f" />
            <stop offset="22%"  stopColor="#2a2a2a" />
            <stop offset="50%"  stopColor="#0c0c0c" />
            <stop offset="78%"  stopColor="#1c1c1c" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <linearGradient id="nbr-seal-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#fb923c" />
            <stop offset="50%"  stopColor="#ea580c" />
            <stop offset="100%" stopColor="#7c2d12" />
          </linearGradient>
          <pattern id="nbr-cells" x="0" y="0" width="10" height="9" patternUnits="userSpaceOnUse">
            <path d="M5 0 L10 2.5 L10 6.5 L5 9 L0 6.5 L0 2.5 Z" fill="none" stroke="rgba(251,146,60,0.18)" strokeWidth="0.4" />
          </pattern>
          <radialGradient id="nbr-flash" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"   stopColor="rgba(251,146,60,0.85)" />
            <stop offset="60%"  stopColor="rgba(251,146,60,0.18)" />
            <stop offset="100%" stopColor="rgba(251,146,60,0)" />
          </radialGradient>
          <clipPath id="nbr-sleeve-clip">
            <rect x="50" y="69" width="260" height="80" rx="14" />
          </clipPath>
        </defs>

        {/* Conveyor rails */}
        <g opacity="0.55">
          <line x1="20" y1="170" x2="340" y2="170" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <line x1="20" y1="176" x2="340" y2="176" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          {[40, 90, 140, 190, 240, 290, 330].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="173" r="4.5" fill="#27272a" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
              <g className="nbr-roller" style={{ animationDelay: `${(cx % 7) * 0.1}s` }}>
                <line x1={cx - 3} y1="173" x2={cx + 3} y2="173" stroke="rgba(251,146,60,0.7)" strokeWidth="0.7" />
              </g>
            </g>
          ))}
        </g>

        {/* Flow arrows */}
        <g opacity="0.6">
          <line x1="40" y1="188" x2="320" y2="188" stroke="rgba(251,146,60,0.45)" strokeWidth="0.6" className="nbr-flow" />
          <path d="M 320 184 l 6 4 l -6 4" fill="none" stroke="#fb923c" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Steel pipe */}
        <g>
          <rect x="20" y="88" width="320" height="42" rx="3" fill="url(#nbr-pipe)" />
          <rect x="20" y="88" width="320" height="8"  fill="url(#nbr-pipe-inner)" />
          <rect x="20" y="92" width="320" height="2"  fill="rgba(255,255,255,0.85)" opacity="0.7" />
          <rect x="20" y="95" width="320" height="1"  fill="rgba(255,255,255,0.35)" />
          <rect x="20" y="124" width="320" height="3" fill="rgba(0,0,0,0.55)" />
          <ellipse cx="20"  cy="109" rx="4.5" ry="21" fill="url(#nbr-hollow)" />
          <ellipse cx="20"  cy="109" rx="2.2" ry="14" fill="#000" />
          <ellipse cx="340" cy="109" rx="5"   ry="21" fill="url(#nbr-cap)" />
          <line x1="180" y1="88" x2="180" y2="130" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.6" />
          <text x="30" y="139" fill="rgba(255,255,255,0.35)" fontSize="5.5" letterSpacing="1.8" fontWeight="700">⌀ DN50 · CARBON STEEL</text>
        </g>

        {/* Temperature labels */}
        <g opacity="0.7">
          <text x="30"  y="58" fill="rgba(251,146,60,0.9)"  fontSize="6" fontWeight="800" letterSpacing="2">AMBIENT +48°C</text>
          <line x1="30" y1="62" x2="80"  y2="62" stroke="rgba(251,146,60,0.35)" strokeWidth="0.5" strokeDasharray="2 2" />
          <text x="232" y="58" fill="rgba(125,211,252,0.9)" fontSize="6" fontWeight="800" letterSpacing="2">MEDIA +6°C</text>
          <line x1="232" y1="62" x2="312" y2="62" stroke="rgba(125,211,252,0.35)" strokeWidth="0.5" strokeDasharray="2 2" />
        </g>

        {/* Seal flash */}
        <g className="nbr-seal">
          <ellipse cx="180" cy="109" rx="120" ry="32" fill="url(#nbr-flash)" />
        </g>

        {/* NBR sleeve */}
        <g className="nbr-sleeve">
          <g clipPath="url(#nbr-sleeve-clip)">
            <rect x="50" y="69" width="260" height="80" rx="14" fill="url(#nbr-rubber)" />
            <rect x="50" y="69" width="260" height="80" rx="14" fill="url(#nbr-cells)" />
            <rect x="54" y="74" width="252" height="3"  rx="1.5" fill="rgba(255,255,255,0.10)" />
            <rect x="54" y="78" width="252" height="1.2" fill="rgba(255,255,255,0.05)" />
            <rect x="54" y="142" width="252" height="4" rx="2"   fill="rgba(0,0,0,0.55)" />
            <g opacity="0.22" stroke="#fb923c" strokeWidth="0.4">
              {[80, 110, 140, 170, 200, 230, 260, 290].map((x) => (
                <line key={x} x1={x} y1="74" x2={x} y2="145" />
              ))}
            </g>
            <text x="180" y="106" textAnchor="middle" fill="rgba(251,146,60,0.92)" fontSize="13" fontWeight="900" letterSpacing="4" style={{ fontFamily: "var(--font-display)" }}>
              GULF-O-FLEX®
            </text>
            <text x="180" y="120" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="6.5" letterSpacing="5" fontWeight="700">
              {shortName.toUpperCase().slice(0, 28)}
            </text>
            <g opacity="0.5">
              <line x1="62" y1="74" x2="62" y2="82" stroke="#fb923c" strokeWidth="0.6" />
              <text x="64" y="80" fill="rgba(251,146,60,0.7)" fontSize="4.5" letterSpacing="1">19mm</text>
            </g>
          </g>
          <rect x="50"    y="69" width="3.5"  height="80" rx="1.75" fill="url(#nbr-seal-grad)" />
          <rect x="306.5" y="69" width="3.5"  height="80" rx="1.75" fill="url(#nbr-seal-grad)" opacity="0.55" />
          <rect x="50"    y="69" width="260"  height="80" rx="14"   fill="none" stroke="rgba(234,88,12,0.55)" strokeWidth="0.8" />
        </g>

        {/* Quality brackets */}
        <g className="nbr-pulse" opacity="0.8" style={{ transformOrigin: "180px 105px", transformBox: "fill-box" }}>
          <path d="M 155 77 L 150 77 L 150 82"  fill="none" stroke="#fb923c" strokeWidth="1" strokeLinecap="round" />
          <path d="M 205 77 L 210 77 L 210 82"  fill="none" stroke="#fb923c" strokeWidth="1" strokeLinecap="round" />
          <path d="M 155 141 L 150 141 L 150 136" fill="none" stroke="#fb923c" strokeWidth="1" strokeLinecap="round" />
          <path d="M 205 141 L 210 141 L 210 136" fill="none" stroke="#fb923c" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Tracer beads */}
        {[0, 0.8, 1.6].map((d) => (
          <circle key={d} className="nbr-bead" cx="40" cy="188" r="1.2" fill="#fb923c" style={{ animationDelay: `${d}s` }} />
        ))}
      </svg>

      {/* HUD: line status */}
      <div className="absolute left-4 top-3.5 z-20 flex items-center gap-2 px-2 py-1 rounded-md bg-black/45 backdrop-blur-md border border-white/[0.06]">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-60 animate-ping" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400" />
        </span>
        <span className="nbr-counter text-[8.5px] tracking-[0.22em] font-bold uppercase text-orange-200/85">Line A · Active</span>
      </div>

      {/* HUD: lambda */}
      <div className="absolute right-4 top-3.5 z-20 flex flex-col items-end gap-0.5 px-2.5 py-1 rounded-md bg-black/45 backdrop-blur-md border border-white/[0.06]">
        <span className="text-[7.5px] tracking-[0.22em] uppercase font-bold text-white/45">λ · NBR</span>
        <span className="text-[10px] tracking-[0.04em] font-bold text-orange-300" style={{ fontFamily: "var(--font-display)" }}>
          {specValue ?? "≤ 0.036 W/mK"}
        </span>
      </div>

      <span className="absolute bottom-4 left-4 text-[9px] tracking-[0.2em] font-bold text-white/30">
        0{index} / {String(productCount).padStart(2, "0")}
      </span>
      <span className="absolute bottom-4 right-4 text-[9px] tracking-[0.2em] font-bold text-white/30">REV. 2026</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   2.  XLPE  —  Cross-linked foam roll unrolling
   ───────────────────────────────────────────────────────────── */
function XLPEAnimation({ shortName, productCount, index }: Omit<Props, "slug"> & { productCount: number; index: number }) {
  return (
    <div className="relative h-80 flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes xlpe-unroll {
          0%   { clip-path: inset(0 100% 0 0); opacity: 0; }
          5%   { opacity: 1; }
          50%  { clip-path: inset(0 0%   0 0); opacity: 1; }
          85%  { clip-path: inset(0 0%   0 0); opacity: 1; }
          95%  { clip-path: inset(0 100% 0 0); opacity: 0.3; }
          100% { clip-path: inset(0 100% 0 0); opacity: 0; }
        }
        @keyframes xlpe-roll-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes xlpe-scan {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(120%); }
        }
        @keyframes xlpe-cross-pulse {
          0%,100% { opacity: 0.25; }
          50%     { opacity: 0.55; }
        }
        @keyframes xlpe-temp-blink {
          0%,100% { opacity: 0.6; }
          50%     { opacity: 1; }
        }
        @keyframes xlpe-cut-line {
          0%,60% { opacity: 0; transform: scaleY(0); }
          65%    { opacity: 1; transform: scaleY(1); }
          80%    { opacity: 1; }
          90%    { opacity: 0; }
          100%   { opacity: 0; }
        }
        .xlpe-unroll    { animation: xlpe-unroll 5s cubic-bezier(0.6,0,0.3,1) infinite; }
        .xlpe-spin      { animation: xlpe-roll-spin 3s linear infinite; transform-origin: center; transform-box: fill-box; }
        .xlpe-scan      { animation: xlpe-scan 4s linear infinite; }
        .xlpe-cross     { animation: xlpe-cross-pulse 2s ease-in-out infinite; }
        .xlpe-temp      { animation: xlpe-temp-blink 1.8s ease-in-out infinite; }
        .xlpe-cut       { animation: xlpe-cut-line 5s ease-in-out infinite; transform-origin: top; transform-box: fill-box; }
        @media (prefers-reduced-motion: reduce) {
          .xlpe-unroll,.xlpe-spin,.xlpe-scan,.xlpe-cross,.xlpe-temp,.xlpe-cut { animation: none !important; }
          .xlpe-unroll { clip-path: inset(0 0% 0 0); opacity: 1; }
        }
      `}</style>

      {/* Stage — blue/teal backdrop for XLPE */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,rgba(59,130,246,0.22),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(16,185,129,0.10),transparent_55%)]" />
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* Top scan */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="xlpe-scan h-full w-1/3 bg-gradient-to-r from-transparent via-blue-400/80 to-transparent" />
      </div>

      <svg viewBox="0 0 360 200" className="relative z-10 w-[94%] h-auto" aria-hidden="true">
        <defs>
          {/* Foam body — light grey/white for XLPE */}
          <linearGradient id="xlpe-foam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#e8f4fd" />
            <stop offset="25%"  stopColor="#dbeafe" />
            <stop offset="50%"  stopColor="#bfdbfe" />
            <stop offset="75%"  stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          {/* Roll core */}
          <radialGradient id="xlpe-roll-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"   stopColor="#1e40af" />
            <stop offset="60%"  stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#3b82f6" />
          </radialGradient>
          {/* Roll outer foam */}
          <radialGradient id="xlpe-roll-foam" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"   stopColor="#93c5fd" />
            <stop offset="70%"  stopColor="#bfdbfe" />
            <stop offset="100%" stopColor="#dbeafe" />
          </radialGradient>
          {/* Cross-link pattern */}
          <pattern id="xlpe-xlink" x="0" y="0" width="14" height="12" patternUnits="userSpaceOnUse">
            <circle cx="7"  cy="6" r="1.2" fill="rgba(59,130,246,0.6)" />
            <line x1="7" y1="6" x2="14" y2="0"  stroke="rgba(59,130,246,0.3)" strokeWidth="0.5" />
            <line x1="7" y1="6" x2="14" y2="12" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5" />
            <line x1="7" y1="6" x2="0"  y2="0"  stroke="rgba(59,130,246,0.3)" strokeWidth="0.5" />
            <line x1="7" y1="6" x2="0"  y2="12" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5" />
            <line x1="7" y1="6" x2="7"  y2="0"  stroke="rgba(59,130,246,0.25)" strokeWidth="0.4" />
          </pattern>
          <clipPath id="xlpe-foam-clip">
            <rect x="80" y="65" width="240" height="80" rx="6" />
          </clipPath>
        </defs>

        {/* FOAM ROLL — left side */}
        <g transform="translate(50,105)">
          {/* Outer foam ring layers */}
          <circle r="38" fill="url(#xlpe-roll-foam)" stroke="rgba(147,197,253,0.5)" strokeWidth="0.8" />
          <circle r="30" fill="#bfdbfe" />
          <circle r="22" fill="#93c5fd" />
          <circle r="14" fill="url(#xlpe-roll-core)" />
          {/* Core hole */}
          <circle r="6"  fill="#0a0a0a" />
          {/* Spinning radial lines on roll */}
          <g className="xlpe-spin" opacity="0.5">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <line
                key={a}
                x1="0" y1="6" x2="0" y2="13"
                stroke="rgba(59,130,246,0.8)"
                strokeWidth="0.8"
                transform={`rotate(${a})`}
              />
            ))}
          </g>
          {/* Roll highlight */}
          <ellipse cx="-10" cy="-22" rx="12" ry="7" fill="rgba(255,255,255,0.35)" opacity="0.7" style={{ transform: "rotate(-25deg)" }} />
          {/* Axle cap */}
          <circle r="6" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="0.8" />
          <circle r="2" fill="#93c5fd" />
        </g>

        {/* FOAM SHEET unrolling from roll to right */}
        <g className="xlpe-unroll">
          {/* Sheet body */}
          <g clipPath="url(#xlpe-foam-clip)">
            <rect x="80" y="65" width="240" height="80" fill="url(#xlpe-foam)" />
            {/* Cross-link molecular pattern */}
            <g className="xlpe-cross">
              <rect x="80" y="65" width="240" height="80" fill="url(#xlpe-xlink)" />
            </g>
            {/* Top highlight */}
            <rect x="80" y="65" width="240" height="5" fill="rgba(255,255,255,0.55)" />
            <rect x="80" y="70" width="240" height="2" fill="rgba(255,255,255,0.25)" />
            {/* Bottom shadow */}
            <rect x="80" y="139" width="240" height="6" fill="rgba(59,130,246,0.4)" />
            {/* Thickness measurement */}
            <line x1="100" y1="63" x2="100" y2="147" stroke="rgba(59,130,246,0.6)" strokeWidth="0.6" strokeDasharray="2 2" />
            <text x="103" y="72" fill="rgba(59,130,246,0.9)" fontSize="5" letterSpacing="0.5" fontWeight="700">25mm</text>
            {/* Brand label */}
            <text x="200" y="101" textAnchor="middle" fill="rgba(30,64,175,0.85)" fontSize="11" fontWeight="900" letterSpacing="4" style={{ fontFamily: "var(--font-display)" }}>
              GULF-O-FLEX®
            </text>
            <text x="200" y="115" textAnchor="middle" fill="rgba(30,64,175,0.65)" fontSize="6" letterSpacing="4" fontWeight="700">
              XLPE · CROSS-LINKED
            </text>
          </g>
          {/* Leading edge with cut indicator */}
          <g className="xlpe-cut">
            <rect x="317" y="63" width="2.5" height="84" fill="rgba(59,130,246,0.9)" />
            <text x="322" y="76" fill="rgba(59,130,246,0.8)" fontSize="5" fontWeight="700" letterSpacing="1">CUT</text>
          </g>
          {/* Sheet outline */}
          <rect x="80" y="65" width="240" height="80" rx="6" fill="none" stroke="rgba(96,165,250,0.6)" strokeWidth="0.8" />
        </g>

        {/* Floor / surface line */}
        <line x1="20" y1="170" x2="340" y2="170" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

        {/* Temperature range badge */}
        <g opacity="0.75" className="xlpe-temp">
          <rect x="24" y="22" width="90" height="18" rx="4" fill="rgba(30,64,175,0.7)" />
          <text x="69" y="34" textAnchor="middle" fill="rgba(219,234,254,0.95)" fontSize="6" fontWeight="800" letterSpacing="1.5">−80°C to +120°C</text>
        </g>

        {/* Density / moisture badge */}
        <rect x="246" y="22" width="90" height="18" rx="4" fill="rgba(16,185,129,0.25)" stroke="rgba(16,185,129,0.4)" strokeWidth="0.6" />
        <text x="291" y="34" textAnchor="middle" fill="rgba(110,231,183,0.9)" fontSize="6" fontWeight="800" letterSpacing="1">WVP &gt; 10,000μ</text>
      </svg>

      {/* HUD */}
      <div className="absolute left-4 top-3.5 z-20 flex items-center gap-2 px-2 py-1 rounded-md bg-black/45 backdrop-blur-md border border-white/[0.06]">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60 animate-ping" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400" />
        </span>
        <span className="text-[8.5px] tracking-[0.22em] font-bold uppercase text-blue-200/85">Rolling · Active</span>
      </div>
      <div className="absolute right-4 top-3.5 z-20 flex flex-col items-end gap-0.5 px-2.5 py-1 rounded-md bg-black/45 backdrop-blur-md border border-white/[0.06]">
        <span className="text-[7.5px] tracking-[0.22em] uppercase font-bold text-white/45">λ · XLPE</span>
        <span className="text-[10px] tracking-[0.04em] font-bold text-blue-300" style={{ fontFamily: "var(--font-display)" }}>≤ 0.038 W/mK</span>
      </div>
      <span className="absolute bottom-4 left-4  text-[9px] tracking-[0.2em] font-bold text-white/30">0{index} / {String(productCount).padStart(2, "0")}</span>
      <span className="absolute bottom-4 right-4 text-[9px] tracking-[0.2em] font-bold text-white/30">REV. 2026</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   3.  SOUND  —  Acoustic waves absorbed by insulation panel
   ───────────────────────────────────────────────────────────── */
function SoundAnimation({ shortName, productCount, index }: Omit<Props, "slug"> & { productCount: number; index: number }) {
  return (
    <div className="relative h-80 flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes snd-wave {
          0%   { transform: translateX(0);    opacity: 0.9; }
          100% { transform: translateX(80px); opacity: 0; }
        }
        @keyframes snd-wave-right {
          0%   { transform: translateX(0);    opacity: 0.5; }
          100% { transform: translateX(40px); opacity: 0; }
        }
        @keyframes snd-scan {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(120%); }
        }
        @keyframes snd-panel-glow {
          0%,100% { opacity: 0.6; }
          50%     { opacity: 1; }
        }
        @keyframes snd-nrc {
          0%,100% { opacity: 0.65; }
          50%     { opacity: 1; }
        }
        @keyframes snd-absorb {
          0%,100% { transform: scaleY(1); }
          50%     { transform: scaleY(1.04); }
        }
        .snd-w1  { animation: snd-wave 1.4s ease-out infinite; }
        .snd-w2  { animation: snd-wave 1.4s ease-out 0.35s infinite; }
        .snd-w3  { animation: snd-wave 1.4s ease-out 0.7s  infinite; }
        .snd-w4  { animation: snd-wave 1.4s ease-out 1.05s infinite; }
        .snd-r1  { animation: snd-wave-right 1.8s ease-out infinite; }
        .snd-r2  { animation: snd-wave-right 1.8s ease-out 0.5s infinite; }
        .snd-scan     { animation: snd-scan 4s linear infinite; }
        .snd-panel    { animation: snd-panel-glow 2.4s ease-in-out infinite; }
        .snd-nrc      { animation: snd-nrc 2s ease-in-out infinite; }
        .snd-absorb   { animation: snd-absorb 1.5s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
        @media (prefers-reduced-motion: reduce) {
          .snd-w1,.snd-w2,.snd-w3,.snd-w4,.snd-r1,.snd-r2,.snd-scan,.snd-panel,.snd-nrc,.snd-absorb { animation: none !important; }
        }
      `}</style>

      {/* Stage — purple/indigo for acoustic */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(139,92,246,0.22),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.15),transparent_50%)]" />
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="snd-scan h-full w-1/3 bg-gradient-to-r from-transparent via-purple-400/80 to-transparent" />
      </div>

      <svg viewBox="0 0 360 200" className="relative z-10 w-[94%] h-auto" aria-hidden="true">
        <defs>
          {/* Wall (drywall / concrete) gradient — receding into scene */}
          <linearGradient id="snd-wall-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1a0f2e" />
            <stop offset="50%"  stopColor="#241640" />
            <stop offset="100%" stopColor="#140828" />
          </linearGradient>
          {/* Floor */}
          <linearGradient id="snd-floor-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0e0820" />
            <stop offset="100%" stopColor="#050210" />
          </linearGradient>
          {/* Acoustic panel face — Gulf-O-Flex Sound */}
          <linearGradient id="snd-panel-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#5b21b6" />
            <stop offset="50%"  stopColor="#6d28d9" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
          <pattern id="snd-hatch" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <line x1="0" y1="6" x2="6" y2="0" stroke="rgba(167,139,250,0.32)" strokeWidth="0.6" />
          </pattern>
          {/* Subtle wall texture — vertical brushed lines */}
          <pattern id="snd-wall-tex" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="14" stroke="rgba(167,139,250,0.06)" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="snd-speaker-grad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"  stopColor="#6d28d9" />
            <stop offset="100%" stopColor="#2e1065" />
          </radialGradient>
        </defs>

        {/* ── ROOM: floor + back wall (wide, clearly a wall — not a pipe) ── */}
        {/* Back wall — spans the full background */}
        <g>
          {/* Floor plane (perspective trapezoid) */}
          <path d="M 0 170 L 360 170 L 360 200 L 0 200 Z" fill="url(#snd-floor-grad)" />
          <line x1="0" y1="170" x2="360" y2="170" stroke="rgba(167,139,250,0.18)" strokeWidth="0.6" />
          {/* Floor perspective lines */}
          {[40, 90, 140, 220, 270, 320].map((x, i) => (
            <line key={i} x1={x} y1="170" x2={x + (x - 180) * 0.25} y2="200" stroke="rgba(167,139,250,0.08)" strokeWidth="0.4" />
          ))}

          {/* Back WALL — the surface that holds Gulf-O-Flex® Sound */}
          <rect x="105" y="22" width="230" height="148" fill="url(#snd-wall-grad)" stroke="rgba(167,139,250,0.22)" strokeWidth="0.8" />
          <rect x="105" y="22" width="230" height="148" fill="url(#snd-wall-tex)" />
          {/* Wall edges / corners */}
          <line x1="105" y1="22" x2="335" y2="22" stroke="rgba(167,139,250,0.30)" strokeWidth="0.6" />
          <line x1="105" y1="22" x2="105" y2="170" stroke="rgba(167,139,250,0.30)" strokeWidth="0.6" />
          <line x1="335" y1="22" x2="335" y2="170" stroke="rgba(167,139,250,0.22)" strokeWidth="0.5" />
          {/* Skirting board */}
          <rect x="105" y="164" width="230" height="6" fill="rgba(10,5,25,0.85)" stroke="rgba(167,139,250,0.20)" strokeWidth="0.4" />
          {/* Wall label */}
          <text x="320" y="34" textAnchor="end" fill="rgba(167,139,250,0.45)" fontSize="5" fontWeight="700" letterSpacing="1.5">WALL · TEST CHAMBER</text>
        </g>

        {/* ── SPEAKER (left, sitting on floor in front of wall) ── */}
        <g transform="translate(46,128)">
          <rect x="-14" y="-26" width="24" height="52" rx="3" fill="url(#snd-speaker-grad)" stroke="rgba(167,139,250,0.5)" strokeWidth="0.8" />
          <path d="M 10 -18 L 10 18 L 22 26 L 22 -26 Z" fill="rgba(109,40,217,0.7)" stroke="rgba(167,139,250,0.4)" strokeWidth="0.5" />
          {[-14, -7, 0, 7, 14].map((y) => (
            <circle key={y} cx="-5" cy={y} r="1.5" fill="rgba(167,139,250,0.55)" />
          ))}
          <rect x="-13" y="-9" width="6" height="18" rx="2" fill="#3b0764" />
          <circle cx="-5" cy="-22" r="2.3" fill="#a855f7" opacity="0.85">
            <animate attributeName="opacity" values="0.85;0.3;0.85" dur="0.7s" repeatCount="indefinite" />
          </circle>
          <text x="4" y="38" textAnchor="middle" fill="rgba(167,139,250,0.7)" fontSize="5" fontWeight="700" letterSpacing="1">SOUND SOURCE</text>
        </g>

        {/* ── INCOMING SOUND WAVES (from speaker toward wall-mounted panel) ── */}
        <g>
          <g className="snd-w1" style={{ transformOrigin: "75px 105px", transformBox: "fill-box" }}>
            <path d="M 75 70 Q 90 105 75 140" fill="none" stroke="rgba(167,139,250,0.85)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <g className="snd-w2" style={{ transformOrigin: "88px 105px", transformBox: "fill-box" }}>
            <path d="M 88 77 Q 102 105 88 133" fill="none" stroke="rgba(167,139,250,0.70)" strokeWidth="1.3" strokeLinecap="round" />
          </g>
          <g className="snd-w3" style={{ transformOrigin: "102px 105px", transformBox: "fill-box" }}>
            <path d="M 102 84 Q 115 105 102 126" fill="none" stroke="rgba(167,139,250,0.55)" strokeWidth="1.1" strokeLinecap="round" />
          </g>
          <g className="snd-w4" style={{ transformOrigin: "116px 105px", transformBox: "fill-box" }}>
            <path d="M 116 90 Q 127 105 116 120" fill="none" stroke="rgba(167,139,250,0.4)" strokeWidth="0.9" strokeLinecap="round" />
          </g>
        </g>

        {/* ── GULF-O-FLEX® SOUND PANEL — mounted on the wall ── */}
        <g className="snd-absorb">
          {/* Panel drop shadow on the wall */}
          <rect x="156" y="48" width="120" height="100" rx="3" fill="rgba(0,0,0,0.45)" />
          {/* Panel body */}
          <rect x="152" y="44" width="120" height="100" rx="3" fill="url(#snd-panel-grad)" />
          <rect x="152" y="44" width="120" height="100" rx="3" fill="url(#snd-hatch)" />
          {/* Top highlight */}
          <rect x="152" y="44" width="120" height="3.5" rx="1.5" fill="rgba(255,255,255,0.18)" />
          {/* Surface grooves (horizontal — like acoustic baffle slats) */}
          {[58, 70, 82, 94, 106, 118, 130].map((y) => (
            <line key={y} x1="156" y1={y} x2="268" y2={y} stroke="rgba(109,40,217,0.55)" strokeWidth="0.5" />
          ))}
          {/* Mounting bolts (4 corners) */}
          {[[160,52],[264,52],[160,136],[264,136]].map(([cx,cy],i)=>(
            <g key={i}>
              <circle cx={cx} cy={cy} r="2" fill="#1e0a3c" stroke="rgba(167,139,250,0.6)" strokeWidth="0.5" />
              <circle cx={cx} cy={cy} r="0.7" fill="rgba(167,139,250,0.8)" />
            </g>
          ))}
          {/* NRC rating disc (centered) */}
          <g className="snd-panel" style={{ transformOrigin: "212px 80px", transformBox: "fill-box" }}>
            <circle cx="212" cy="80" r="16" fill="rgba(30,10,60,0.55)" stroke="rgba(167,139,250,0.55)" strokeWidth="1" strokeDasharray="3 2" />
            <text x="212" y="78" textAnchor="middle" fill="rgba(216,180,254,0.95)" fontSize="7.5" fontWeight="900" style={{ fontFamily: "var(--font-display)" }}>NRC</text>
            <text x="212" y="88" textAnchor="middle" fill="rgba(167,139,250,0.9)" fontSize="6.5" fontWeight="700">0.85</text>
          </g>
          {/* Gulf-O-Flex® Sound branding */}
          <text x="212" y="120" textAnchor="middle" fill="rgba(216,180,254,0.95)" fontSize="7" fontWeight="800" letterSpacing="2" style={{ fontFamily: "var(--font-display)" }}>GULF-O-FLEX® SOUND</text>
          <text x="212" y="130" textAnchor="middle" fill="rgba(167,139,250,0.55)" fontSize="4.5" fontWeight="600" letterSpacing="2">ACOUSTIC WALL PANEL</text>
          {/* Panel outline */}
          <rect x="152" y="44" width="120" height="100" rx="3" fill="none" stroke="rgba(167,139,250,0.6)" strokeWidth="0.9" />
        </g>

        {/* ── ABSORPTION energy indicator (floating on wall, top-right) ── */}
        <g opacity="0.85">
          <rect x="282" y="50" width="48" height="14" rx="4" fill="rgba(109,40,217,0.45)" stroke="rgba(167,139,250,0.4)" strokeWidth="0.5" />
          <text x="306" y="61" textAnchor="middle" fill="rgba(216,180,254,0.95)" fontSize="5.5" fontWeight="700" letterSpacing="1">−52 dB ATTN.</text>
        </g>

        {/* ── dB bar chart (on wall, lower-right) ── */}
        <g transform="translate(282,90)">
          {[60, 50, 38, 26, 18, 10].map((h, i) => (
            <rect
              key={i}
              x={i * 8}
              y={60 - h}
              width="6"
              height={h}
              rx="1.2"
              fill={`rgba(167,139,250,${0.3 + i * 0.09})`}
              stroke="rgba(167,139,250,0.25)"
              strokeWidth="0.4"
            />
          ))}
          <text x="24" y="70" textAnchor="middle" fill="rgba(167,139,250,0.6)" fontSize="4.5" letterSpacing="0.5">STC PROFILE</text>
        </g>

        {/* Frequency label */}
        <text x="46" y="192" fill="rgba(167,139,250,0.5)" fontSize="5" letterSpacing="1.5" fontWeight="700">125Hz → 4kHz TESTED</text>
      </svg>

      {/* HUD */}
      <div className="absolute left-4 top-3.5 z-20 flex items-center gap-2 px-2 py-1 rounded-md bg-black/45 backdrop-blur-md border border-white/[0.06]">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60 animate-ping" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-400" />
        </span>
        <span className="text-[8.5px] tracking-[0.22em] font-bold uppercase text-purple-200/85">Acoustic Test · Live</span>
      </div>
      <div className="absolute right-4 top-3.5 z-20 flex flex-col items-end gap-0.5 px-2.5 py-1 rounded-md bg-black/45 backdrop-blur-md border border-white/[0.06]">
        <span className="text-[7.5px] tracking-[0.22em] uppercase font-bold text-white/45">NRC · SOUND</span>
        <span className="text-[10px] tracking-[0.04em] font-bold text-purple-300" style={{ fontFamily: "var(--font-display)" }}>0.65–0.90</span>
      </div>
      <span className="absolute bottom-4 left-4  text-[9px] tracking-[0.2em] font-bold text-white/30">0{index} / {String(productCount).padStart(2, "0")}</span>
      <span className="absolute bottom-4 right-4 text-[9px] tracking-[0.2em] font-bold text-white/30">REV. 2026</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   4.  ALUGLASS  —  Pipe → Rubber → Aluglass facing build-up
   ───────────────────────────────────────────────────────────── */
function AluglassAnimation({ shortName, productCount, index }: Omit<Props, "slug"> & { productCount: number; index: number }) {
  return (
    <div className="relative h-80 flex items-center justify-center overflow-hidden">
      <style>{`
        /* 1) Pipe slides in from the left */
        @keyframes alug-pipe-in {
          0%     { transform: translateX(-260px); opacity: 0; }
          10%    { opacity: 1; }
          22%    { transform: translateX(0);     opacity: 1; }
          100%   { transform: translateX(0);     opacity: 1; }
        }
        /* 2) Rubber sleeve wraps over the pipe */
        @keyframes alug-rubber-wrap {
          0%,24%  { transform: scaleX(0); opacity: 0; }
          30%     { opacity: 1; }
          52%     { transform: scaleX(1); opacity: 1; }
          100%    { transform: scaleX(1); opacity: 1; }
        }
        @keyframes alug-rubber-end {
          0%,28%  { opacity: 0; }
          34%     { opacity: 1; }
          100%    { opacity: 1; }
        }
        /* 3) Aluglass facing wraps over the rubber */
        @keyframes alug-wrap-top {
          0%,54%  { transform: scaleX(0); opacity: 0; }
          60%     { opacity: 1; }
          84%     { transform: scaleX(1); opacity: 1; }
          100%    { transform: scaleX(1); opacity: 1; }
        }
        @keyframes alug-wrap-bottom {
          0%,58%  { transform: scaleX(0); opacity: 0; }
          64%     { opacity: 1; }
          88%     { transform: scaleX(1); opacity: 1; }
          100%    { transform: scaleX(1); opacity: 1; }
        }
        @keyframes alug-shine {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes alug-scan {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(120%); }
        }
        @keyframes alug-pulse {
          0%,100% { opacity: 0; }
          85%     { opacity: 0; }
          92%     { opacity: 1; }
        }
        @keyframes alug-label-pop {
          0%,70%  { opacity: 0; transform: translateY(4px); }
          80%     { opacity: 1; transform: translateY(0); }
          100%    { opacity: 1; transform: translateY(0); }
        }
        .alug-pipe     { animation: alug-pipe-in    6s ease-in-out infinite; transform-box: fill-box; }
        .alug-rubber   { animation: alug-rubber-wrap 6s ease-in-out infinite; transform-origin: left center; transform-box: fill-box; }
        .alug-rubber-cap { animation: alug-rubber-end 6s ease-in-out infinite; transform-box: fill-box; }
        .alug-top      { animation: alug-wrap-top    6s ease-in-out infinite; transform-origin: left center; transform-box: fill-box; }
        .alug-bottom   { animation: alug-wrap-bottom 6s ease-in-out infinite; transform-origin: left center; transform-box: fill-box; }
        .alug-shine    { animation: alug-shine  2.2s cubic-bezier(0.4,0,0.6,1) infinite; }
        .alug-scan     { animation: alug-scan 4s linear infinite; }
        .alug-pulse    { animation: alug-pulse 6s ease-in-out infinite; }
        .alug-label    { animation: alug-label-pop 6s ease-in-out infinite; transform-box: fill-box; }
        @media (prefers-reduced-motion: reduce) {
          .alug-pipe,.alug-rubber,.alug-rubber-cap,.alug-top,.alug-bottom,.alug-shine,.alug-scan,.alug-pulse,.alug-label { animation: none !important; }
          .alug-pipe { transform: translateX(0); opacity: 1; }
          .alug-rubber,.alug-top,.alug-bottom { transform: scaleX(1); opacity: 1; }
          .alug-rubber-cap,.alug-pulse,.alug-label { opacity: 1; }
        }
      `}</style>

      {/* Stage — cyan/silver for aluglass */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(6,182,212,0.18),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(148,163,184,0.12),transparent_55%)]" />
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="alug-scan h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />
      </div>

      <svg viewBox="0 0 360 200" className="relative z-10 w-[94%] h-auto" aria-hidden="true">
        <defs>
          {/* Aluminum surface */}
          <linearGradient id="alug-alu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#f8fafc" />
            <stop offset="20%"  stopColor="#e2e8f0" />
            <stop offset="40%"  stopColor="#cbd5e1" />
            <stop offset="60%"  stopColor="#94a3b8" />
            <stop offset="80%"  stopColor="#64748b" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          {/* Steel pipe */}
          <linearGradient id="alug-pipe-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#6b7280" />
            <stop offset="30%"  stopColor="#9ca3af" />
            <stop offset="50%"  stopColor="#d1d5db" />
            <stop offset="70%"  stopColor="#6b7280" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
          {/* NBR rubber insulation */}
          <linearGradient id="alug-rubber-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#27272a" />
            <stop offset="35%"  stopColor="#3f3f46" />
            <stop offset="55%"  stopColor="#52525b" />
            <stop offset="80%"  stopColor="#27272a" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>
          {/* Shine sweep */}
          <linearGradient id="alug-shine-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
            <stop offset="40%"  stopColor="rgba(255,255,255,0.55)" />
            <stop offset="60%"  stopColor="rgba(255,255,255,0.75)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          {/* Glass cloth backing texture */}
          <pattern id="alug-cloth" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <line x1="0" y1="4" x2="8" y2="4" stroke="rgba(148,163,184,0.35)" strokeWidth="0.5" />
            <line x1="4" y1="0" x2="4" y2="8" stroke="rgba(148,163,184,0.35)" strokeWidth="0.5" />
          </pattern>
          {/* Rubber speckle */}
          <pattern id="alug-rubber-tex" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.4" fill="rgba(255,255,255,0.05)" />
            <circle cx="4"   cy="4"   r="0.3" fill="rgba(0,0,0,0.25)" />
          </pattern>
          <clipPath id="alug-top-clip">
            <rect x="55" y="56" width="250" height="14" />
          </clipPath>
          <clipPath id="alug-bottom-clip">
            <rect x="55" y="130" width="250" height="14" />
          </clipPath>
          <clipPath id="alug-rubber-top-clip">
            <rect x="55" y="70" width="250" height="14" />
          </clipPath>
          <clipPath id="alug-rubber-bottom-clip">
            <rect x="55" y="116" width="250" height="14" />
          </clipPath>
        </defs>

        {/* STAGE 1 — STEEL PIPE (slides in first) */}
        <g className="alug-pipe">
          {/* Pipe body */}
          <rect x="55" y="84" width="250" height="32" fill="url(#alug-pipe-grad)" />
          <rect x="55" y="84" width="250" height="3"  fill="rgba(255,255,255,0.35)" />
          <rect x="55" y="113" width="250" height="3" fill="rgba(0,0,0,0.45)" />
          {/* Pipe end-cap (left) — gives 3D look */}
          <ellipse cx="55" cy="100" rx="6" ry="16" fill="#1f2937" />
          <ellipse cx="55" cy="100" rx="3.5" ry="11" fill="#0b1220" />
          {/* Pipe end-cap (right) */}
          <ellipse cx="305" cy="100" rx="6" ry="16" fill="url(#alug-pipe-grad)" />
          <ellipse cx="305" cy="100" rx="3.5" ry="11" fill="#0b1220" />
          {/* Faint pipe label */}
          <text x="180" y="103" textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize="6" letterSpacing="3" fontWeight="700">STEEL PIPE · Ø 100mm</text>
        </g>

        {/* STAGE 2 — NBR RUBBER INSULATION (wraps over pipe) */}
        {/* Top half of rubber sleeve */}
        <g className="alug-rubber">
          <g clipPath="url(#alug-rubber-top-clip)">
            <rect x="55" y="70" width="250" height="14" fill="url(#alug-rubber-grad)" />
            <rect x="55" y="70" width="250" height="14" fill="url(#alug-rubber-tex)" opacity="0.6" />
            <rect x="55" y="70" width="250" height="2"  fill="rgba(255,255,255,0.18)" />
          </g>
          <rect x="55" y="70" width="250" height="14" fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="0.5" />
        </g>
        {/* Bottom half of rubber sleeve */}
        <g className="alug-rubber" style={{ animationDelay: "0.15s" }}>
          <g clipPath="url(#alug-rubber-bottom-clip)">
            <rect x="55" y="116" width="250" height="14" fill="url(#alug-rubber-grad)" />
            <rect x="55" y="116" width="250" height="14" fill="url(#alug-rubber-tex)" opacity="0.6" />
            <rect x="55" y="127" width="250" height="2"  fill="rgba(0,0,0,0.55)" />
          </g>
          <rect x="55" y="116" width="250" height="14" fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="0.5" />
        </g>
        {/* Rubber end-cap (cross-section at right) — ring around pipe end */}
        <g className="alug-rubber-cap">
          <ellipse cx="305" cy="100" rx="11" ry="22" fill="url(#alug-rubber-grad)" stroke="rgba(0,0,0,0.55)" strokeWidth="0.5" />
          <ellipse cx="305" cy="100" rx="6"  ry="16" fill="url(#alug-pipe-grad)" />
          <ellipse cx="305" cy="100" rx="3.5" ry="11" fill="#0b1220" />
        </g>

        {/* STAGE 3 — ALUGLASS FACING (wraps over rubber) */}
        {/* Top face */}
        <g className="alug-top">
          <g clipPath="url(#alug-top-clip)">
            <rect x="55" y="56" width="250" height="14" fill="url(#alug-alu)" />
            <rect x="55" y="56" width="250" height="14" fill="url(#alug-cloth)" opacity="0.35" />
            <rect x="55" y="56" width="250" height="14" fill="url(#alug-shine-grad)" className="alug-shine" />
            <text x="68" y="66" fill="rgba(71,85,105,0.85)" fontSize="5" fontWeight="700" letterSpacing="0.5">70μm ALU-GL</text>
          </g>
          <rect x="55" y="56" width="250" height="14" fill="none" stroke="rgba(148,163,184,0.55)" strokeWidth="0.6" />
        </g>
        {/* Bottom face */}
        <g className="alug-bottom">
          <g clipPath="url(#alug-bottom-clip)">
            <rect x="55" y="130" width="250" height="14" fill="url(#alug-alu)" />
            <rect x="55" y="130" width="250" height="14" fill="url(#alug-cloth)" opacity="0.35" />
            <rect x="55" y="130" width="250" height="14" fill="url(#alug-shine-grad)" className="alug-shine" style={{ animationDelay: "0.4s" }} />
          </g>
          <rect x="55" y="130" width="250" height="14" fill="none" stroke="rgba(148,163,184,0.55)" strokeWidth="0.6" />
        </g>
        {/* Aluglass facing end-cap (final outer ring) */}
        <g className="alug-top" style={{ animationDelay: "0.05s" }}>
          <ellipse cx="305" cy="100" rx="14" ry="28" fill="none" stroke="rgba(148,163,184,0.65)" strokeWidth="1.2" />
          <ellipse cx="305" cy="100" rx="14" ry="28" fill="url(#alug-alu)" opacity="0.35" />
        </g>

        {/* FOIL ROLL on the left (supply reel) */}
        <g transform="translate(28,100)">
          <circle r="20" fill="#1e293b" stroke="rgba(148,163,184,0.4)" strokeWidth="0.8" />
          <circle r="14" fill="url(#alug-alu)" />
          <circle r="8"  fill="#1e293b" />
          <circle r="4"  fill="url(#alug-alu)" />
          <circle r="1.5" fill="#0f172a" />
          <ellipse cx="-7" cy="-10" rx="6" ry="3" fill="rgba(255,255,255,0.4)" opacity="0.6" />
          <text x="0" y="30" textAnchor="middle" fill="rgba(148,163,184,0.7)" fontSize="5" fontWeight="700" letterSpacing="1">FOIL ROLL</text>
        </g>

        {/* Brand label — appears only after all layers complete */}
        <g className="alug-pulse">
          <text x="180" y="156" textAnchor="middle" fill="rgba(6,182,212,0.85)" fontSize="9" fontWeight="900" letterSpacing="3" style={{ fontFamily: "var(--font-display)" }}>GULF-O-FLEX® ALUGLASS</text>
        </g>

        {/* Stage label badges (top-center) */}
        <g>
          <g className="alug-label">
            <rect x="120" y="22" width="120" height="14" rx="4" fill="rgba(6,182,212,0.22)" stroke="rgba(6,182,212,0.45)" strokeWidth="0.5" />
            <text x="180" y="31" textAnchor="middle" fill="rgba(165,243,252,0.95)" fontSize="5.5" fontWeight="800" letterSpacing="1.5">PIPE · RUBBER · ALUGLASS</text>
          </g>
        </g>

        {/* Perm rating badge */}
        <g opacity="0.85">
          <rect x="248" y="22" width="92" height="14" rx="4" fill="rgba(6,182,212,0.25)" stroke="rgba(6,182,212,0.4)" strokeWidth="0.5" />
          <text x="294" y="31" textAnchor="middle" fill="rgba(103,232,249,0.9)" fontSize="5.5" fontWeight="800" letterSpacing="1">&lt; 0.02 PERMS WVT</text>
        </g>

        {/* Temperature range */}
        <g opacity="0.8">
          <rect x="20" y="22" width="90" height="14" rx="4" fill="rgba(30,41,59,0.8)" />
          <text x="65" y="31" textAnchor="middle" fill="rgba(148,163,184,0.9)" fontSize="5.5" fontWeight="800" letterSpacing="1">−20°C to +120°C</text>
        </g>

        {/* Cross-section indicator arrows */}
        <g opacity="0.6">
          <line x1="328" y1="72"  x2="328" y2="128" stroke="rgba(6,182,212,0.5)" strokeWidth="0.6" strokeDasharray="2 2" />
          <path d="M 325 72  l 3 -5 l 3 5"  fill="rgba(6,182,212,0.7)" />
          <path d="M 325 128 l 3  5 l 3 -5" fill="rgba(6,182,212,0.7)" />
          <text x="345" y="103" textAnchor="middle" fill="rgba(6,182,212,0.7)" fontSize="5" fontWeight="700" transform="rotate(90,345,103)">SYSTEM</text>
        </g>
      </svg>

      {/* HUD */}
      <div className="absolute left-4 top-3.5 z-20 flex items-center gap-2 px-2 py-1 rounded-md bg-black/45 backdrop-blur-md border border-white/[0.06]">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60 animate-ping" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
        </span>
        <span className="text-[8.5px] tracking-[0.22em] font-bold uppercase text-cyan-200/85">Laminating · Active</span>
      </div>
      <div className="absolute right-4 top-3.5 z-20 flex flex-col items-end gap-0.5 px-2.5 py-1 rounded-md bg-black/45 backdrop-blur-md border border-white/[0.06]">
        <span className="text-[7.5px] tracking-[0.22em] uppercase font-bold text-white/45">VB · ALUGLASS</span>
        <span className="text-[10px] tracking-[0.04em] font-bold text-cyan-300" style={{ fontFamily: "var(--font-display)" }}>&lt; 0.02 Perms</span>
      </div>
      <span className="absolute bottom-4 left-4  text-[9px] tracking-[0.2em] font-bold text-white/30">0{index} / {String(productCount).padStart(2, "0")}</span>
      <span className="absolute bottom-4 right-4 text-[9px] tracking-[0.2em] font-bold text-white/30">REV. 2026</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   5.  ALUCLAD  —  Aluminum cladding halves closing on insulated pipe
   ───────────────────────────────────────────────────────────── */
function AluCladAnimation({ shortName, productCount, index }: Omit<Props, "slug"> & { productCount: number; index: number }) {
  return (
    <div className="relative h-80 flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes aclad-slide {
          0%      { transform: translateX(320px); opacity: 0; }
          8%      { opacity: 1; }
          55%     { transform: translateX(0);     opacity: 1; }
          90%     { transform: translateX(0);     opacity: 1; }
          100%    { transform: translateX(0);     opacity: 1; }
        }
        @keyframes aclad-seam {
          0%,55%  { opacity: 0; }
          62%     { opacity: 1; }
          100%    { opacity: 0.85; }
        }
        @keyframes aclad-rivet {
          0%,60%  { opacity: 0; r: 0.6; }
          66%     { opacity: 1; r: 2.2; }
          75%     { r: 1.8; }
          100%    { opacity: 0.95; r: 1.8; }
        }
        @keyframes aclad-shine {
          0%   { transform: translateX(-110%); }
          100% { transform: translateX(260%); }
        }
        @keyframes aclad-scan {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(120%); }
        }
        @keyframes aclad-arrow {
          0%,100% { opacity: 0.35; transform: translateX(0); }
          50%     { opacity: 1;    transform: translateX(-6px); }
        }
        @keyframes aclad-pulse { 0%,100%{opacity:.6}50%{opacity:1} }
        .aclad-slide  { animation: aclad-slide  5s cubic-bezier(0.7,0,0.25,1) infinite; transform-box: fill-box; }
        .aclad-seam   { animation: aclad-seam   5s ease-in-out infinite; }
        .aclad-rivet  { animation: aclad-rivet  5s ease-in-out infinite; }
        .aclad-shine  { animation: aclad-shine 2.6s cubic-bezier(0.4,0,0.6,1) 2.4s infinite; }
        .aclad-scan   { animation: aclad-scan 4s linear infinite; }
        .aclad-arrow  { animation: aclad-arrow 1.4s ease-in-out infinite; }
        .aclad-pulse  { animation: aclad-pulse 2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .aclad-slide,.aclad-seam,.aclad-rivet,.aclad-shine,.aclad-scan,.aclad-arrow,.aclad-pulse { animation: none !important; }
          .aclad-slide { transform: translateX(0); opacity:1; }
          .aclad-seam,.aclad-rivet { opacity:0.9; }
        }
      `}</style>

      {/* Stage — amber/yellow for aluclad */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(245,158,11,0.18),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(161,161,170,0.12),transparent_55%)]" />
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="aclad-scan h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />
      </div>

      <svg viewBox="0 0 360 200" className="relative z-10 w-[94%] h-auto" aria-hidden="true">
        <defs>
          {/* Steel pipe gradient (cylindrical) */}
          <linearGradient id="aclad-pipe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#3f3f46" />
            <stop offset="25%"  stopColor="#d4d4d8" />
            <stop offset="50%"  stopColor="#f4f4f5" />
            <stop offset="75%"  stopColor="#a1a1aa" />
            <stop offset="100%" stopColor="#27272a" />
          </linearGradient>
          {/* Insulation layer (cylindrical) */}
          <linearGradient id="aclad-insul" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1a1a1a" />
            <stop offset="20%"  stopColor="#2a2a2a" />
            <stop offset="50%"  stopColor="#0e0e0e" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>
          {/* Aluminum cladding (cylindrical sleeve) */}
          <linearGradient id="aclad-alu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#a1a1aa" />
            <stop offset="20%"  stopColor="#e4e4e7" />
            <stop offset="45%"  stopColor="#fafafa" />
            <stop offset="55%"  stopColor="#f4f4f5" />
            <stop offset="80%"  stopColor="#d4d4d8" />
            <stop offset="100%" stopColor="#71717a" />
          </linearGradient>
          {/* Shine gradient */}
          <linearGradient id="aclad-shine-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
            <stop offset="50%"  stopColor="rgba(255,255,255,0.75)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          {/* Corrugated cladding pattern (vertical ribs) */}
          <pattern id="aclad-ribs" x="0" y="0" width="8" height="60" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="60" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" />
            <line x1="4" y1="0" x2="4" y2="60" stroke="rgba(255,255,255,0.18)" strokeWidth="0.4" />
          </pattern>
          <clipPath id="aclad-sleeve-clip">
            <rect x="55" y="76" width="250" height="48" rx="6" />
          </clipPath>
        </defs>

        {/* ── Bare insulated pipe (always visible, horizontal, low-profile) ── */}
        {/* Insulation layer */}
        <rect x="55" y="76" width="250" height="48" rx="6" fill="url(#aclad-insul)" />
        <rect x="55" y="76" width="250" height="3"  fill="rgba(255,255,255,0.07)" />
        <rect x="55" y="121" width="250" height="3" fill="rgba(0,0,0,0.55)" />
        {/* Steel pipe inside */}
        <rect x="55" y="88" width="250" height="24" rx="2" fill="url(#aclad-pipe)" />
        <rect x="55" y="88" width="250" height="2.5" fill="rgba(255,255,255,0.55)" opacity="0.8" />
        <rect x="55" y="109" width="250" height="2" fill="rgba(0,0,0,0.45)" />
        {/* Pipe end caps */}
        <ellipse cx="55"  cy="100" rx="4" ry="12" fill="#27272a" />
        <ellipse cx="305" cy="100" rx="4" ry="12" fill="#3f3f46" />

        {/* Insulation thickness indicator */}
        <g opacity="0.6">
          <line x1="46" y1="76" x2="46" y2="124" stroke="rgba(245,158,11,0.6)" strokeWidth="0.6" strokeDasharray="2 2" />
          <path d="M 43 76  l 3 -5 l 3 5"  fill="rgba(245,158,11,0.7)" />
          <path d="M 43 124 l 3  5 l 3 -5" fill="rgba(245,158,11,0.7)" />
          <text x="38" y="103" fill="rgba(245,158,11,0.8)" fontSize="5" fontWeight="700" transform="rotate(-90,38,103)">50mm INSUL</text>
        </g>

        {/* Direction-of-travel arrows (right → left) */}
        <g className="aclad-arrow" opacity="0.5">
          <path d="M 332 100 L 322 95 L 322 105 Z" fill="rgba(252,211,77,0.85)" />
          <path d="M 322 100 L 312 95 L 312 105 Z" fill="rgba(252,211,77,0.55)" />
        </g>

        {/* ── ALUCLAD SLEEVE — slides in from the right onto the pipe ── */}
        <g className="aclad-slide">
          <g clipPath="url(#aclad-sleeve-clip)">
            {/* Sleeve body wraps the insulation tightly */}
            <rect x="55" y="76" width="250" height="48" rx="6" fill="url(#aclad-alu)" />
            {/* Corrugated ribs */}
            <rect x="55" y="76" width="250" height="48" fill="url(#aclad-ribs)" opacity="0.7" />
            {/* Cylindrical top highlight */}
            <rect x="55" y="78" width="250" height="3" fill="rgba(255,255,255,0.85)" opacity="0.9" />
            {/* Cylindrical bottom shadow */}
            <rect x="55" y="119" width="250" height="3" fill="rgba(0,0,0,0.55)" />
            {/* Center seam line (overlap) */}
            <rect x="55" y="99" width="250" height="1" fill="rgba(0,0,0,0.25)" />
            {/* Shine sweep */}
            <rect x="55" y="76" width="90" height="48" fill="url(#aclad-shine-g)" className="aclad-shine" />
            {/* Sleeve label */}
            <text x="180" y="103" textAnchor="middle" fill="rgba(82,82,91,0.85)" fontSize="6.5" fontWeight="800" letterSpacing="3">ALUCLAD · SLEEVE</text>
          </g>
          {/* Sleeve outline */}
          <rect x="55" y="76" width="250" height="48" rx="6" fill="none" stroke="rgba(161,161,170,0.7)" strokeWidth="0.8" />
          {/* Leading edge bevel (left side - approaches pipe end) */}
          <rect x="55" y="76" width="2" height="48" fill="rgba(0,0,0,0.35)" />
          <rect x="57" y="76" width="1" height="48" fill="rgba(255,255,255,0.4)" />
          {/* Trailing edge */}
          <rect x="303" y="76" width="2" height="48" fill="rgba(0,0,0,0.35)" />

          {/* Rivets along the seam line (revealed once seated) */}
          {[80, 115, 150, 185, 220, 255, 290].map((x, i) => (
            <circle
              key={x}
              className="aclad-rivet"
              cx={x}
              cy="100"
              r="1.8"
              fill="#fbbf24"
              stroke="rgba(120,53,15,0.7)"
              strokeWidth="0.4"
              style={{ animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </g>

        {/* Seam glow (settles after sleeve is in place) */}
        <line className="aclad-seam" x1="60" y1="100" x2="300" y2="100" stroke="rgba(245,158,11,0.55)" strokeWidth="0.5" strokeDasharray="3 3" />

        {/* Material spec badge */}
        <g opacity="0.85">
          <rect x="220" y="22" width="115" height="16" rx="4" fill="rgba(245,158,11,0.22)" stroke="rgba(245,158,11,0.45)" strokeWidth="0.5" />
          <text x="277" y="33" textAnchor="middle" fill="rgba(252,211,77,0.95)" fontSize="5.5" fontWeight="800" letterSpacing="1">ALLOY 1050 · 0.8mm</text>
        </g>

        {/* Service life badge */}
        <g opacity="0.8">
          <rect x="25" y="22" width="78" height="16" rx="4" fill="rgba(30,41,59,0.8)" />
          <text x="64" y="33" textAnchor="middle" fill="rgba(252,211,77,0.95)" fontSize="5.5" fontWeight="800" letterSpacing="1">25+ YEAR LIFE</text>
        </g>

        {/* Ground/floor line */}
        <line x1="20" y1="160" x2="340" y2="160" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      </svg>

      {/* HUD */}
      <div className="absolute left-4 top-3.5 z-20 flex items-center gap-2 px-2 py-1 rounded-md bg-black/45 backdrop-blur-md border border-white/[0.06]">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60 animate-ping" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
        </span>
        <span className="text-[8.5px] tracking-[0.22em] font-bold uppercase text-amber-200/85">Cladding · Assembly</span>
      </div>
      <div className="absolute right-4 top-3.5 z-20 flex flex-col items-end gap-0.5 px-2.5 py-1 rounded-md bg-black/45 backdrop-blur-md border border-white/[0.06]">
        <span className="text-[7.5px] tracking-[0.22em] uppercase font-bold text-white/45">ALUCLAD · ALLOY</span>
        <span className="text-[10px] tracking-[0.04em] font-bold text-amber-300" style={{ fontFamily: "var(--font-display)" }}>1050 / 3003</span>
      </div>
      <span className="absolute bottom-4 left-4  text-[9px] tracking-[0.2em] font-bold text-white/30">0{index} / {String(productCount).padStart(2, "0")}</span>
      <span className="absolute bottom-4 right-4 text-[9px] tracking-[0.2em] font-bold text-white/30">REV. 2026</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   6.  ACCESSORIES  —  Adhesive sealing a pipe joint
   ───────────────────────────────────────────────────────────── */
function AccessoriesAnimation({ shortName, productCount, index }: Omit<Props, "slug"> & { productCount: number; index: number }) {
  return (
    <div className="relative h-80 flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes acc-tape {
          0%   { clip-path: inset(0 100% 0 0); opacity: 0; }
          5%   { opacity: 1; }
          45%  { clip-path: inset(0 0%   0 0); opacity: 1; }
          80%  { clip-path: inset(0 0%   0 0); opacity: 1; }
          90%  { clip-path: inset(0 100% 0 0); opacity: 0; }
          100% { clip-path: inset(0 100% 0 0); opacity: 0; }
        }
        @keyframes acc-bead-drop {
          0%   { transform: translateY(-20px); opacity: 0; }
          10%  { opacity: 1; }
          45%  { transform: translateY(0);    opacity: 1; }
          80%  { transform: translateY(0);    opacity: 1; }
          90%  { opacity: 0; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        @keyframes acc-check {
          0%,50%  { opacity: 0; transform: scale(0); }
          55%     { opacity: 1; transform: scale(1.2); }
          65%     { transform: scale(0.95); }
          90%     { opacity: 1; transform: scale(1); }
          95%     { opacity: 0; }
          100%    { opacity: 0; }
        }
        @keyframes acc-scan {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(120%); }
        }
        @keyframes acc-spool {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes acc-pulse { 0%,100%{opacity:.6}50%{opacity:1} }
        .acc-tape   { animation: acc-tape 5s cubic-bezier(0.6,0,0.3,1) infinite; }
        .acc-bead   { animation: acc-bead-drop 5s ease-in-out infinite; }
        .acc-check  { animation: acc-check 5s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
        .acc-scan   { animation: acc-scan 4s linear infinite; }
        .acc-spool  { animation: acc-spool 2s linear infinite; transform-origin: center; transform-box: fill-box; }
        .acc-pulse  { animation: acc-pulse 2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .acc-tape,.acc-bead,.acc-check,.acc-scan,.acc-spool,.acc-pulse { animation: none !important; }
          .acc-tape { clip-path: inset(0 0% 0 0); opacity: 1; }
          .acc-bead { transform: translateY(0); opacity: 1; }
          .acc-check { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Stage — green for accessories */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(16,185,129,0.18),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(52,211,153,0.10),transparent_55%)]" />
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="acc-scan h-full w-1/3 bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent" />
      </div>

      <svg viewBox="0 0 360 200" className="relative z-10 w-[94%] h-auto" aria-hidden="true">
        <defs>
          {/* Pipe metal */}
          <linearGradient id="acc-pipe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#3f3f46" />
            <stop offset="30%"  stopColor="#d4d4d8" />
            <stop offset="50%"  stopColor="#f4f4f5" />
            <stop offset="70%"  stopColor="#a1a1aa" />
            <stop offset="100%" stopColor="#27272a" />
          </linearGradient>
          {/* Insulation */}
          <linearGradient id="acc-insul" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>
          {/* Tape orange */}
          <linearGradient id="acc-tape-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#fb923c" />
            <stop offset="50%"  stopColor="#ea580c" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
          {/* Adhesive green */}
          <radialGradient id="acc-adhesive" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"   stopColor="rgba(16,185,129,0.9)" />
            <stop offset="60%"  stopColor="rgba(16,185,129,0.5)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0)" />
          </radialGradient>
          {/* Tape spool */}
          <radialGradient id="acc-spool-grad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"   stopColor="#1a1a1a" />
            <stop offset="65%"  stopColor="#ea580c" />
            <stop offset="100%" stopColor="#fb923c" />
          </radialGradient>
          <clipPath id="acc-tape-clip">
            <rect x="105" y="78" width="150" height="44" />
          </clipPath>
        </defs>

        {/* LEFT PIPE section (with NBR insulation on it) */}
        {/* Insulation left */}
        <rect x="20"  y="78"  width="130" height="44" rx="4" fill="url(#acc-insul)" />
        <rect x="20"  y="78"  width="130" height="4"  fill="rgba(255,255,255,0.07)" />
        <rect x="20"  y="117" width="130" height="4"  fill="rgba(0,0,0,0.5)" />
        {/* Pipe inside left */}
        <rect x="20"  y="88"  width="130" height="24" rx="2" fill="url(#acc-pipe)" />
        <rect x="20"  y="88"  width="130" height="3"  fill="rgba(255,255,255,0.5)" opacity="0.6" />
        {/* Left end caps */}
        <ellipse cx="20"  cy="100" rx="4" ry="22" fill="url(#acc-insul)" />
        <ellipse cx="20"  cy="100" rx="2" ry="12" fill="#27272a" />
        {/* RIGHT PIPE section */}
        <rect x="210" y="78"  width="130" height="44" rx="4" fill="url(#acc-insul)" />
        <rect x="210" y="78"  width="130" height="4"  fill="rgba(255,255,255,0.07)" />
        <rect x="210" y="117" width="130" height="4"  fill="rgba(0,0,0,0.5)" />
        <rect x="210" y="88"  width="130" height="24" rx="2" fill="url(#acc-pipe)" />
        <rect x="210" y="88"  width="130" height="3"  fill="rgba(255,255,255,0.5)" opacity="0.6" />
        <ellipse cx="340" cy="100" rx="4" ry="22" fill="url(#acc-insul)" />
        <ellipse cx="340" cy="100" rx="2" ry="12" fill="#27272a" />

        {/* JOINT GAP — the open seam between the two insulation ends */}
        <g>
          {/* Gap fill */}
          <rect x="148" y="76" width="64" height="48" fill="#0a0a0a" />
          {/* Exposed steel pipe crossing the gap */}
          <rect x="148" y="90" width="64" height="20" fill="url(#acc-pipe)" opacity="0.6" />
          {/* Gap edge lines */}
          <line x1="150" y1="76" x2="150" y2="124" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
          <line x1="210" y1="76" x2="210" y2="124" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
          {/* Gap label */}
          <text x="180" y="72" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="5" fontWeight="700" letterSpacing="1">JOINT SEAM</text>
        </g>

        {/* ADHESIVE BEAD (drops down from above to fill gap) */}
        <g className="acc-bead">
          <ellipse cx="180" cy="74" rx="28" ry="10" fill="url(#acc-adhesive)" />
          <ellipse cx="180" cy="74" rx="18" ry="6"  fill="rgba(16,185,129,0.7)" />
          <ellipse cx="174" cy="71" rx="5"  ry="2"  fill="rgba(167,243,208,0.6)" />
        </g>

        {/* SELF-ADHESIVE TAPE wrapping over the joint */}
        <g className="acc-tape">
          <g clipPath="url(#acc-tape-clip)">
            <rect x="105" y="78"  width="150" height="44" fill="url(#acc-tape-grad)" opacity="0.85" />
            {/* Tape highlight */}
            <rect x="105" y="78"  width="150" height="4"  fill="rgba(255,255,255,0.3)" />
            {/* Tape grain lines */}
            {[0, 10, 20, 30, 40].map((i) => (
              <line key={i} x1={105 + i * 3} y1="78" x2={105 + i * 3} y2="122" stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" />
            ))}
            {/* Width mark */}
            <line x1="105" y1="78"  x2="105" y2="122" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
            <line x1="255" y1="78"  x2="255" y2="122" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
            <text x="180" y="95" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="8" fontWeight="900" letterSpacing="2" style={{ fontFamily: "var(--font-display)" }}>GULF-O-FLEX®</text>
            <text x="180" y="108" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="5.5" letterSpacing="3.5" fontWeight="700">SELF-ADHESIVE TAPE</text>
            <text x="180" y="118" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="4.5" letterSpacing="2">50mm · VAPOR SEAL</text>
          </g>
          <rect x="105" y="78" width="150" height="44" fill="none" stroke="rgba(234,88,12,0.6)" strokeWidth="0.7" />
        </g>

        {/* COMPLETION CHECK — green tick appears after sealing */}
        <g className="acc-check">
          <circle cx="180" cy="100" r="14" fill="rgba(16,185,129,0.25)" stroke="rgba(52,211,153,0.7)" strokeWidth="1.5" />
          <path d="M 172 100 l 5 5 l 10 -10" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* TAPE SPOOL (right side) */}
        <g transform="translate(320,100)">
          <g className="acc-spool">
            <circle r="24" fill="#1a1a1a" stroke="rgba(251,146,60,0.4)" strokeWidth="0.8" />
            {/* Tape layers */}
            {[18, 15, 12].map((r, i) => (
              <circle key={r} r={r} fill="none" stroke="rgba(251,146,60,0.4)" strokeWidth={1.5 - i * 0.4} />
            ))}
            <circle r="8"  fill="#ea580c" />
            <circle r="5"  fill="#1a1a1a" />
            <circle r="2"  fill="#fb923c" />
            {/* Spoke lines */}
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <line key={a} x1="0" y1="0" x2={Math.cos((a * Math.PI) / 180) * 7} y2={Math.sin((a * Math.PI) / 180) * 7}
                stroke="rgba(251,146,60,0.5)" strokeWidth="0.5" />
            ))}
          </g>
          <text x="0" y="34" textAnchor="middle" fill="rgba(251,146,60,0.7)" fontSize="4.5" fontWeight="700" letterSpacing="1">50mm TAPE</text>
        </g>

        {/* ADHESIVE TUB (left side) */}
        <g transform="translate(38,115)">
          <rect x="-14" y="-28" width="28" height="40" rx="5" fill="rgba(16,185,129,0.6)" stroke="rgba(52,211,153,0.5)" strokeWidth="0.8" />
          <rect x="-14" y="-28" width="28" height="10" rx="5" fill="rgba(16,185,129,0.9)" />
          <text x="0" y="-14" textAnchor="middle" fill="rgba(6,78,59,0.9)" fontSize="4.5" fontWeight="800" letterSpacing="0.5">ADHESIVE</text>
          <text x="0" y="-5"  textAnchor="middle" fill="rgba(167,243,208,0.7)" fontSize="4" letterSpacing="0.5">VOC-FREE</text>
          <text x="0" y="6"   textAnchor="middle" fill="rgba(167,243,208,0.7)" fontSize="4" letterSpacing="0.5">4L</text>
        </g>

        {/* Labels */}
        <text x="55"  y="145" fill="rgba(255,255,255,0.3)" fontSize="5.5" fontWeight="700" letterSpacing="1">NBR INSULATION</text>
        <text x="210" y="145" fill="rgba(255,255,255,0.3)" fontSize="5.5" fontWeight="700" letterSpacing="1">NBR INSULATION</text>

        {/* Bond strength badge */}
        <g opacity="0.8">
          <rect x="155" y="14" width="50" height="16" rx="4" fill="rgba(16,185,129,0.25)" stroke="rgba(16,185,129,0.4)" strokeWidth="0.5" />
          <text x="180" y="25" textAnchor="middle" fill="rgba(110,231,183,0.9)" fontSize="5.5" fontWeight="800" letterSpacing="0.5">&gt;1.0 N/mm²</text>
        </g>
      </svg>

      {/* HUD */}
      <div className="absolute left-4 top-3.5 z-20 flex items-center gap-2 px-2 py-1 rounded-md bg-black/45 backdrop-blur-md border border-white/[0.06]">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
        </span>
        <span className="text-[8.5px] tracking-[0.22em] font-bold uppercase text-emerald-200/85">Sealing · Active</span>
      </div>
      <div className="absolute right-4 top-3.5 z-20 flex flex-col items-end gap-0.5 px-2.5 py-1 rounded-md bg-black/45 backdrop-blur-md border border-white/[0.06]">
        <span className="text-[7.5px] tracking-[0.22em] uppercase font-bold text-white/45">BOND · ACCESSORIES</span>
        <span className="text-[10px] tracking-[0.04em] font-bold text-emerald-300" style={{ fontFamily: "var(--font-display)" }}>&gt;1.0 N/mm²</span>
      </div>
      <span className="absolute bottom-4 left-4  text-[9px] tracking-[0.2em] font-bold text-white/30">0{index} / {String(productCount).padStart(2, "0")}</span>
      <span className="absolute bottom-4 right-4 text-[9px] tracking-[0.2em] font-bold text-white/30">REV. 2026</span>
    </div>
  );
}
