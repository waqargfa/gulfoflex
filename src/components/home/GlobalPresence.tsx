"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Factory, Globe2, MapPin, Sparkles, TrendingUp, Users } from "lucide-react";
import WorldMap, { type HubDef } from "@/components/home/WorldMap";

/* ---------------------------------------------------------------------
   Data ? manufacturing hubs (lon/lat coords) + countries by region
--------------------------------------------------------------------- */
type Hub = HubDef;

const HUBS: Hub[] = [
  { city: "Ajman",   country: "UAE",          flag: "🇦🇪", label: "Global HQ & Plant",   role: "HQ",           coordinates: [55.51, 25.41],  established: "1993" },
  { city: "Riyadh",  country: "Saudi Arabia", flag: "🇸🇦", label: "KSA Manufacturing",   role: "Plant",        coordinates: [46.72, 24.69],  established: "2024" },
  { city: "Colombo", country: "Sri Lanka",    flag: "🇱🇰", label: "Asia-Pacific Plant",  role: "Plant",        coordinates: [79.86, 6.93],   established: "2015" },
  { city: "Doha",    country: "Qatar",        flag: "🇶🇦", label: "Sales Office",        role: "Sales Office", coordinates: [51.53, 25.29],  established: "2018" },
  { city: "Muscat",  country: "Oman",         flag: "🇴🇲", label: "Sales Office",        role: "Sales Office", coordinates: [58.59, 23.59],  established: "2017" },
  { city: "Lagos",   country: "Nigeria",      flag: "🇳🇬", label: "Africa Sales Hub",    role: "Sales Office", coordinates: [3.38,  6.52],   established: "2022" },
  { city: "Mumbai",  country: "India",        flag: "🇮🇳", label: "South Asia Office",   role: "Sales Office", coordinates: [72.88, 19.08],  established: "2019" },
];

const REGIONS: { name: string; flag: string; countries: string[] }[] = [
  {
    name: "Middle East & GCC",
    flag: "🕌",
    countries: ["UAE", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Kuwait", "Jordan", "Lebanon", "Iraq", "Yemen"],
  },
  {
    name: "Asia-Pacific",
    flag: "🌏",
    countries: ["India", "Sri Lanka", "Pakistan", "Bangladesh", "Singapore", "Malaysia", "Indonesia", "Vietnam", "Philippines", "South Korea", "Japan", "China", "Thailand"],
  },
  {
    name: "Africa",
    flag: "🌍",
    countries: ["Nigeria", "Egypt", "Kenya", "South Africa", "Ghana", "Morocco", "Tanzania", "Ethiopia", "Algeria", "Tunisia"],
  },
  {
    name: "Europe",
    flag: "🇪🇺",
    countries: ["United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands", "Belgium", "Poland", "Turkey", "Greece"],
  },
  {
    name: "Americas",
    flag: "🌎",
    countries: ["USA", "Canada", "Mexico", "Brazil", "Argentina", "Chile", "Colombia"],
  },
];

const STATS = [
  { icon: Globe2,     value: 90,     suffix: "+", label: "Countries Served" },
  { icon: TrendingUp, value: 33,     suffix: "+", label: "Years of Excellence" },
  { icon: Factory,    value: 3,      suffix: "",  label: "Manufacturing Plants" },
  { icon: Users,      value: 10000,  suffix: "+", label: "Projects Delivered" },
];

/* ---------------------------------------------------------------------
   Animated counter
--------------------------------------------------------------------- */
function Counter({ to, suffix = "", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const formatted = val.toLocaleString();
  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

/* ---------------------------------------------------------------------
   Component
--------------------------------------------------------------------- */
export default function GlobalPresence() {
  const [activeHub, setActiveHub] = useState<number | null>(0);
  const [activeRegion, setActiveRegion] = useState(0);

  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-neutral-950 text-white">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-amber-400/8 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container-wide relative z-10">
        {/* -- Section header -- */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6">
            <Sparkles size={12} className="text-orange-400" />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-300">
              Global Presence
            </span>
          </div>
          <h2
            className="leading-[1.05] mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
            }}
          >
            Our reach <span className="serif-italic text-orange-400">worldwide</span>.
          </h2>
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl">
            From our headquarters in the UAE, Gulf-O-Flex? powers landmark projects across six
            continents ? backed by three manufacturing plants, dedicated sales offices, and a
            distributor network spanning <span className="text-white font-semibold">90+ countries</span>.
          </p>
        </div>

        {/* -- Stats row -- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm mb-16">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-neutral-950/60 p-6 md:p-8 group hover:bg-white/[0.03] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center mb-4 group-hover:bg-orange-500/25 transition-colors">
                  <Icon size={18} className="text-orange-400" />
                </div>
                <div
                  className="text-white font-black mb-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-neutral-400 text-[10px] uppercase tracking-[0.18em] font-bold">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* -- Map + hub list -- */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-stretch mb-16">
          {/* Map */}
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400">
                Live network ? {HUBS.length} hubs
              </span>
            </div>

            <div className="relative aspect-[16/9] w-full">
              {/* Accurate interactive world map */}
              <WorldMap
                hubs={HUBS}
                activeHub={activeHub}
                onHubClick={setActiveHub}
              />
            </div>

          </div>

          {/* Hub list */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-2">
            <div className="px-4 py-3 border-b border-white/10 mb-2">
              <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400">
                Manufacturing & Offices
              </div>
            </div>
            <div className="space-y-1 max-h-[480px] overflow-y-auto custom-scroll">
              {HUBS.map((h, i) => {
                const isActive = activeHub === i;
                const isHQ = h.role === "HQ";
                return (
                  <button
                    key={h.city}
                    onClick={() => setActiveHub(i)}
                    className={`w-full text-left p-4 rounded-2xl transition-all flex items-center gap-3 ${
                      isActive
                        ? "bg-white text-neutral-900 shadow-[0_10px_30px_-10px_rgba(255,255,255,0.2)]"
                        : "hover:bg-white/[0.05]"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl border ${
                        isActive
                          ? "bg-neutral-100 border-neutral-200"
                          : "bg-white/[0.04] border-white/10"
                      }`}
                    >
                      {h.flag}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`font-bold text-sm ${isActive ? "text-neutral-900" : "text-white"}`}>
                          {h.city}, {h.country}
                        </span>
                        {isHQ && (
                          <span className="text-[9px] font-black tracking-[0.15em] uppercase px-1.5 py-0.5 rounded-full bg-orange-500 text-white">
                            HQ
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-xs ${
                          isActive ? "text-neutral-500" : "text-neutral-400"
                        }`}
                      >
                        {h.label} ? est. {h.established}
                      </div>
                    </div>
                    <MapPin
                      size={14}
                      className={`flex-shrink-0 ${
                        isActive ? "text-orange-500" : "text-neutral-500"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* -- Regional country breakdown -- */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-white/10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-400 mb-2">
                  Distributor Network
                </div>
                <h3
                  className="text-white"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.025em",
                  }}
                >
                  Where you&rsquo;ll find Gulf-O-Flex?.
                </h3>
              </div>
              <div className="text-xs text-neutral-400">
                <span className="text-white font-bold text-lg mr-1">
                  {REGIONS.reduce((a, r) => a + r.countries.length, 0)}+
                </span>
                countries listed ? 90+ in total
              </div>
            </div>
          </div>

          {/* Region tabs */}
          <div className="px-6 md:px-8 pt-6 flex flex-wrap gap-2">
            {REGIONS.map((r, i) => {
              const isActive = activeRegion === i;
              return (
                <button
                  key={r.name}
                  onClick={() => setActiveRegion(i)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                    isActive
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white/[0.03] text-neutral-300 border-white/10 hover:bg-white/[0.07] hover:border-white/20"
                  }`}
                >
                  <span className="text-sm">{r.flag}</span>
                  <span>{r.name}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-white/[0.05] text-neutral-400"
                    }`}
                  >
                    {r.countries.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Country grid */}
          <div className="p-6 md:p-8">
            <motion.div
              key={activeRegion}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2"
            >
              {REGIONS[activeRegion].countries.map((c) => (
                <div
                  key={c}
                  className="group flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-orange-500/30 transition-all"
                >
                  <MapPin size={12} className="text-orange-400 group-hover:text-orange-300" />
                  <span className="text-sm text-neutral-200 group-hover:text-white truncate">{c}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.12);
          border-radius: 3px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </section>
  );
}
