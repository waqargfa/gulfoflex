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
  { city: "Ajman",   country: "UAE",          label: "Global HQ & Plant",   role: "HQ",           coordinates: [55.51, 25.41],  established: "1993" },
  { city: "Riyadh",  country: "Saudi Arabia", label: "KSA Manufacturing",   role: "Plant",        coordinates: [46.72, 24.69],  established: "2024" },
  { city: "Colombo", country: "Sri Lanka",    label: "Asia-Pacific Plant",  role: "Plant",        coordinates: [79.86, 6.93],   established: "2015" },
  { city: "Lagos",   country: "Nigeria",      label: "Africa Sales Hub",    role: "Sales Office", coordinates: [3.38,  6.52],   established: "2022" },
];

const REGIONS: { name: string; countries: string[] }[] = [
  {
    name: "Middle East & GCC",
    countries: ["UAE", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Kuwait", "Jordan", "Lebanon", "Iraq", "Yemen"],
  },
  {
    name: "Asia-Pacific",
    countries: ["India", "Sri Lanka", "Pakistan", "Bangladesh", "Singapore", "Malaysia", "Indonesia", "Vietnam", "Philippines", "South Korea", "Japan", "China", "Thailand"],
  },
  {
    name: "Africa",
    countries: ["Nigeria", "Egypt", "Kenya", "South Africa", "Ghana", "Morocco", "Tanzania", "Ethiopia", "Algeria", "Tunisia"],
  },
  {
    name: "Europe",
    countries: ["United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands", "Belgium", "Poland", "Turkey", "Greece"],
  },
  {
    name: "Americas",
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
    <section className="relative overflow-hidden py-24 md:py-32 bg-white">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/[0.07] blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-orange-400/[0.05] blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(249,115,22,0.06) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="container-wide relative z-10">
        {/* -- Section header -- */}
        <div className="max-w-3xl mb-16">
          <h2
            className="text-neutral-900 leading-[1.05] mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
            }}
          >
            Our reach <span className="serif-italic text-orange-500">worldwide</span>.
          </h2>
          <p className="text-neutral-500 text-base md:text-lg leading-relaxed max-w-2xl">
            From our headquarters in the UAE, Gulf-O-Flex® powers landmark projects across six
            continents — backed by three manufacturing plants, dedicated sales offices, and a
            distributor network spanning <span className="text-neutral-900 font-semibold">90+ countries</span>.
          </p>
        </div>

        {/* -- Stats row -- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-3xl overflow-hidden border border-neutral-200 bg-neutral-100 mb-16">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white p-6 md:p-8 group hover:bg-orange-500/[0.04] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <Icon size={18} className="text-orange-600" />
                </div>
                <div
                  className="corp-stat-value font-black mb-1"
                  style={{
                    fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
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
          <div className="relative rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
            <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-500">
                Live network · {HUBS.length} hubs
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
          <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm p-2">
            <div className="px-4 py-3 border-b border-neutral-100 mb-2">
              <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400">
                Manufacturing &amp; Offices
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
                        ? "bg-orange-500 text-white shadow-[0_8px_24px_-8px_rgba(249,115,22,0.45)]"
                        : "hover:bg-neutral-50"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`font-bold text-sm ${isActive ? "text-white" : "text-neutral-900"}`}>
                          {h.city}, {h.country}
                        </span>
                        {isHQ && (
                          <span className={`text-[9px] font-black tracking-[0.15em] uppercase px-1.5 py-0.5 rounded-full ${
                            isActive ? "bg-white/25 text-white" : "bg-orange-500 text-white"
                          }`}>
                            HQ
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-xs ${
                          isActive ? "text-white/70" : "text-neutral-400"
                        }`}
                      >
                        {h.label} · est. {h.established}
                      </div>
                    </div>
                    <MapPin
                      size={14}
                      className={`flex-shrink-0 ${
                        isActive ? "text-white" : "text-neutral-400"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* -- Regional country breakdown -- */}
        <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-neutral-100">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600 mb-2">
                  Distributor Network
                </div>
                <h3
                  className="text-neutral-900"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.025em",
                  }}
                >
                  Where you&rsquo;ll find Gulf-O-Flex®.
                </h3>
              </div>
              <div className="text-xs text-neutral-400">
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
                      ? "bg-orange-500 text-white border-orange-500 shadow-[0_4px_16px_-4px_rgba(249,115,22,0.45)]"
                      : "bg-white text-neutral-600 border-neutral-200 hover:bg-orange-500/5 hover:border-orange-500/30 hover:text-orange-600"
                  }`}
                >
                  <span>{r.name}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/25 text-white" : "bg-neutral-100 text-neutral-500"
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
                  className="group flex items-center gap-2 px-3 py-2.5 rounded-xl border border-neutral-100 bg-neutral-50 hover:bg-orange-500/5 hover:border-orange-500/25 transition-all"
                >
                  <MapPin size={12} className="text-orange-500 group-hover:text-orange-600" />
                  <span className="text-sm text-neutral-600 group-hover:text-neutral-900 truncate">{c}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(249, 115, 22, 0.25);
          border-radius: 3px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(249, 115, 22, 0.45);
        }
      `}</style>
    </section>
  );
}
