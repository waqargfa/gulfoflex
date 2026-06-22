"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Flame,
  Anchor,
  Snowflake,
  Cog,
  CheckCircle2,
  Package,
  ChevronRight,
  MapPin,
  Factory,
  Server,
  HeartPulse,
} from "lucide-react";

const industries = [
  {
    id: "hvac",
    name: "HVAC, MEP & Construction",
    shortName: "HVAC & Construction",
    icon: Building2,
    image: "/images/industries/hvac.jpg",
    imageAlt: "HVAC mechanical room with insulated chilled water piping and air handling units",
    tagline: "Energy-efficient building services",
    desc: "Comprehensive insulation solutions for heating, ventilation, air conditioning, mechanical, electrical & plumbing systems, and building construction. Reduces energy consumption, prevents condensation",
    applications: ["Chilled water pipes", "Refrigerant lines", "Air handling units", "Ductwork insulation", "Green buildings"],
    products: ["Gulf-O-Flex NBR", "Gulf-O-Flex XLPE", "Gulf-O-Flex Sound", "Gulf-O-Flex Ultra"],
    stat: { label: "Energy Savings", value: "Up to 30%" },
    color: "text-orange-600",
    accentRgb: "234 88 12",
    bg: "bg-orange-500/8",
    border: "border-orange-500/20",
    activeBg: "bg-orange-600",
    gradient: "from-orange-600/10 via-orange-500/5 to-transparent",
    href: "/industries/hvac",
  },
  {
    id: "marine",
    name: "Marine Manufacturing & Offshores",
    shortName: "Marine Manufacturing & Offshores",
    icon: Anchor,
    image: "/images/industries/marine.jpg",
    imageAlt: "Marine offshore platform with insulated piping systems in ocean environment",
    tagline: "Salt-spray & humidity resistant",
    desc: "Marine-grade insulation engineered to withstand harsh sea environments, salt spray, humidity, and vibration on ships, offshore platforms, and naval vessels. Certified to international marine standards.",
    applications: ["HVAC systems", "Engine rooms", "Piping systems", "Refrigeration", "Acoustic damping", "Offshore platforms"],
    products: ["Gulf-O-Flex NBR", "Gulf-O-Flex Sound", "Gulf-O-Flex Ultra", "Gulf-O-Flex Ultraline"],
    stat: { label: "Humidity Resistance", value: "99.9%" },
    color: "text-orange-500",
    accentRgb: "249 115 22",
    bg: "bg-orange-500/8",
    border: "border-orange-500/20",
    activeBg: "bg-orange-500",
    gradient: "from-orange-600/10 via-orange-500/5 to-transparent",
    href: "/industries/marine",
  },
  {
    id: "district-cooling",
    name: "District Cooling Sector",
    shortName: "District Cooling Sector",
    icon: Snowflake,
    image: "/images/industries/district-cooling.jpg",
    imageAlt: "Large-diameter insulated pipes in a district cooling plant facility",
    tagline: "GCC-scale cooling networks",
    desc: "Specialized insulation for district cooling networks, the backbone of sustainable urban cooling in GCC cities. Prevents energy loss across extensive pipe networks and ensures maximum system efficiency.",
    applications: ["Distribution mains", "Energy transfer stations", "Chiller plants", "Storage tanks"],
    products: ["Gulf-O-Flex NBR", "Gulf-O-Flex Aluclad", "Gulf-O-Flex Ultra"],
    stat: { label: "Heat Loss Reduction", value: "Up to 35%" },
    color: "text-orange-500",
    accentRgb: "249 115 22",
    bg: "bg-orange-500/8",
    border: "border-orange-500/20",
    activeBg: "bg-orange-500",
    gradient: "from-orange-600/10 via-orange-500/5 to-transparent",
    href: "/industries/district-cooling",
  },
  {
    id: "industrial",
    name: "Industrial Plants",
    shortName: "Industrial Plants",
    icon: Cog,
    image: "/images/industries/industrial.jpg",
    imageAlt: "Industrial plant with insulated process piping and manufacturing equipment",
    tagline: "Process-grade durability",
    desc: "Heavy-duty thermal insulation for manufacturing plants, food processing facilities, pharmaceutical plants, and general industrial processes requiring precise temperature control and long-term durability.",
    applications: ["HVAC systems", "Chilled water pipes", "Air handling units", "Duct insulation", "Ventilation systems"],
    products: ["Gulf-O-Flex NBR", "Gulf-O-Flex XLPE", "Gulf-O-Flex Aluclad", "Gulf-O-Flex Ultra"],
    stat: { label: "Service Life", value: "20+ Years" },
    color: "text-orange-500",
    accentRgb: "249 115 22",
    bg: "bg-orange-500/8",
    border: "border-orange-500/20",
    activeBg: "bg-orange-500",
    gradient: "from-orange-600/10 via-orange-500/5 to-transparent",
    href: "/industries/industrial",
  },
  {
    id: "oem",
    name: "Manufacturing & OEM",
    shortName: "Manufacturing & OEM",
    icon: Factory,
    image: "/images/industries/oem.jpg",
    imageAlt: "OEM manufacturing facility with automated insulation production line",
    tagline: "Custom-engineered solutions",
    desc: "Tailored insulation products for original equipment manufacturers. Gulf-O-Flex partners with OEMs to develop custom-spec insulation integrated directly into HVAC units, refrigeration equipment, and industrial machinery during production.",
    applications: ["HVAC equipment", "Refrigeration units", "Custom fabrication", "Equipment lining", "Appliance insulation"],
    products: ["Gulf-O-Flex NBR", "Gulf-O-Flex XLPE", "Gulf-O-Flex Ultra"],
    stat: { label: "OEM Clients", value: "120+" },
    color: "text-orange-500",
    accentRgb: "249 115 22",
    bg: "bg-orange-500/8",
    border: "border-orange-500/20",
    activeBg: "bg-orange-500",
    gradient: "from-orange-600/10 via-orange-500/5 to-transparent",
    href: "/industries/oem",
  },
  {
    id: "data-center",
    name: "Data Centers",
    shortName: "Data Centers",
    icon: Server,
    image: "/images/industries/data-center.jpg",
    imageAlt: "Data center server room with cooling infrastructure and insulated piping",
    tagline: "Mission-critical cooling",
    desc: "High-reliability insulation for data center cooling infrastructure. Prevents condensation on chilled water systems, maintains precise temperature control, and supports 24/7 uptime requirements for hyperscale and colocation facilities.",
    applications: ["Chilled water loops", "CRAH/CRAC units", "Cooling towers", "Hot/cold aisle containment", "Liquid cooling systems"],
    products: ["Gulf-O-Flex NBR", "Gulf-O-Flex Ultra", "Gulf-O-Flex Aluclad"],
    stat: { label: "Datacenters Projects", value: "100+" },
    color: "text-orange-500",
    accentRgb: "249 115 22",
    bg: "bg-orange-500/8",
    border: "border-orange-500/20",
    activeBg: "bg-orange-500",
    gradient: "from-orange-600/10 via-orange-500/5 to-transparent",
    href: "/industries/data-center",
  },
  {
    id: "healthcare-hospitality",
    name: "Healthcare & Hospitality",
    shortName: "Healthcare & Hospitality",
    icon: HeartPulse,
    image: "/images/industries/healthcare-hospitality.jpg",
    imageAlt: "Modern hospital corridor with climate-controlled HVAC environment",
    tagline: "Hygienic, quiet & efficient",
    desc: "Insulation solutions for hospitals, laboratories, pharmaceutical facilities, hotels, resorts, and leisure complexes. Meets stringent hygiene standards, prevents microbial growth, delivers superior acoustic performance for guest and patient comfort, and ensures energy-efficient climate control.",
    applications: ["Hospital HVAC", "Clean rooms", "Guest room HVAC", "Central plant rooms", "Swimming pool piping"],
    products: ["Gulf-O-Flex NBR", "Gulf-O-Flex Ultra", "Gulf-O-Flex Sound", "Gulf-O-Flex XLPE"],
    stat: { label: "Noise Reduction", value: "Up to 25dB" },
    color: "text-orange-500",
    accentRgb: "249 115 22",
    bg: "bg-orange-500/8",
    border: "border-orange-500/20",
    activeBg: "bg-orange-500",
    gradient: "from-orange-600/10 via-orange-500/5 to-transparent",
    href: "/industries/healthcare-hospitality",
  },
    {
    id: "oil-gas",
    name: "Oil & Gas Industries",
    shortName: "Oil & Gas Industries",
    icon: Flame,
    image: "/images/industries/oil-gas.jpg",
    imageAlt: "Oil refinery with insulated process piping and industrial infrastructure",
    tagline: "Extreme-temperature performance",
    desc: "High-performance thermal insulation rated for extreme temperatures found in refineries, petrochemical plants, pipelines, and offshore platforms. Engineered to meet the most demanding international standards.",
    applications: ["Chilled water pipes", "Refrigerant lines", "Air handling units", "Duct insulation", "Fan coil units"],
    products: ["Gulf-O-Flex NBR", "Gulf-O-Flex Aluclad", "Gulf-O-Flex Ultra"],
    stat: { label: "Temp. Range", value: "-40°C to 105°C" },
    color: "text-orange-500",
    accentRgb: "249 115 22",
    bg: "bg-orange-500/8",
    border: "border-orange-500/20",
    activeBg: "bg-orange-500",
    gradient: "from-orange-600/10 via-orange-500/5 to-transparent",
    href: "/industries/oil-gas",
  },
];

export default function Industries() {
  const [active, setActive] = useState(industries[0].id);

  const current = industries.find((i) => i.id === active)!;
  const ActiveIcon = current.icon;

  return (
    <section className="section-padding bg-white relative overflow-hidden" aria-labelledby="industries-heading">
      {/* Subtle background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full blur-[120px] pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(circle, rgba(${current.accentRgb},0.06) 0%, transparent 70%)` }}
      />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2
            id="industries-heading"
            className="text-neutral-900 mb-5 leading-[1.02]"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 4.5vw, 4.25rem)", fontWeight: 700, letterSpacing: "-0.035em" }}
          >
            Trusted across<br />
            <span className="serif-italic text-orange-600">every sector.</span>
          </h2>
          <p className="text-neutral-500 text-lg">
            Gulf-O-Flex® insulation powers critical infrastructure across eight major industries, delivering consistent performance in the most demanding environments.
          </p>
        </div>

        {/* Interactive Panel */}
        <div className="reveal grid lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] gap-4 mb-12">

          {/* Tab List */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
            {industries.map((ind) => {
              const Icon = ind.icon;
              const isActive = active === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActive(ind.id)}
                  className={`group relative flex items-center gap-3 px-3.5 py-3 rounded-xl border transition-all duration-300 text-left shrink-0 lg:w-full overflow-hidden ${
                    isActive
                      ? `${ind.bg} ${ind.border} shadow-md`
                      : "bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  {/* tiny industry thumbnail */}
                  <div
                    className={`relative h-11 w-11 rounded-lg overflow-hidden shrink-0 border transition-all duration-300 ${
                      isActive ? ind.border : "border-neutral-200"
                    }`}
                  >
                    <Image
                      src={ind.image}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, rgba(${ind.accentRgb},0.55), rgba(0,0,0,0.15))`,
                        opacity: isActive ? 0.65 : 0.85,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon size={15} className="text-white drop-shadow" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <span
                      className={`block font-semibold text-sm transition-colors duration-200 whitespace-nowrap ${
                        isActive ? ind.color : "text-neutral-700 group-hover:text-neutral-900"
                      }`}
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                    >
                      {ind.shortName}
                    </span>

                  </div>
                  {isActive && (
                    <ChevronRight
                      size={14}
                      className={`${ind.color} ml-auto shrink-0 hidden lg:block`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detail Panel */}
          <div
            className={`relative rounded-2xl border ${current.border} overflow-hidden bg-white`}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${current.gradient} pointer-events-none`} />

            {/* Accent top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl z-20"
              style={{ background: `rgb(${current.accentRgb})` }}
            />

            <div className="relative z-10 grid lg:grid-cols-[1fr_minmax(280px,420px)] gap-0 lg:min-h-[600px]">
              {/* ── Left: main info ── */}
              <div className="p-7 lg:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl ${current.bg} border ${current.border} flex items-center justify-center`}
                      >
                        <ActiveIcon size={26} className={current.color} />
                      </div>
                      <div>
                        <div
                          className="text-[10px] font-bold tracking-[0.18em] uppercase mb-1"
                          style={{ color: `rgb(${current.accentRgb})` }}
                        >
                          {current.tagline}
                        </div>
                        <h3
                          className={`font-bold text-2xl ${current.color} leading-tight`}
                          style={{
                            fontFamily: "var(--font-display)",
                            letterSpacing: "-0.03em",
                          }}
                        >
                          {current.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-neutral-600 leading-relaxed mb-6 max-w-xl">
                      {current.desc}
                    </p>

                    {/* Applications */}
                    <div className="mb-6">
                      <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">
                        Key Applications
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {current.applications.map((a) => (
                          <div key={a} className="flex items-center gap-1.5">
                            <CheckCircle2
                              size={13}
                              style={{ color: `rgb(${current.accentRgb})` }}
                            />
                            <span className="text-sm text-neutral-700">{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Products */}
                    <div className="mb-7">
                      <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">
                        Recommended Products
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {current.products.map((p) => (
                          <span
                            key={p}
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border"
                            style={{
                              color: `rgb(${current.accentRgb})`,
                              borderColor: `rgba(${current.accentRgb},0.25)`,
                              background: `rgba(${current.accentRgb},0.06)`,
                            }}
                          >
                            <Package size={11} />
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={current.href}
                      className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
                      style={{
                        background: `rgb(${current.accentRgb})`,
                        boxShadow: `0 4px 20px rgba(${current.accentRgb},0.3)`,
                      }}
                    >
                      Explore {current.name} Solutions
                      <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Right: real image hero with overlay stat ── */}
              <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${active}-img`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={current.image}
                      alt={current.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-cover animate-kenburns"
                      priority={false}
                    />
                    {/* color tint overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(160deg, rgba(${current.accentRgb},0.35) 0%, rgba(0,0,0,0.55) 100%)`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Top-right region badge */}
                <div className="absolute top-5 right-5 z-10">
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] uppercase px-2.5 py-1.5 rounded-full backdrop-blur-md text-white border border-white/25"
                    style={{ background: "rgba(0,0,0,0.35)" }}
                  >
                    <MapPin size={11} /> GCC & Beyond
                  </span>
                </div>

                {/* Floating stat tile (glass) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${active}-stat`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-5 right-5 bottom-5 z-10"
                  >
                    <div
                      className="rounded-2xl border border-white/20 backdrop-blur-xl p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]"
                      style={{ background: "rgba(15,15,15,0.45)" }}
                    >
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/70 mb-1.5">
                            {current.stat.label}
                          </div>
                          <div
                            className="text-white font-black leading-none"
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                              letterSpacing: "-0.035em",
                            }}
                          >
                            {current.stat.value}
                          </div>
                        </div>

                      </div>

                      {/* progress dots */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/60">
                          {industries.findIndex((i) => i.id === active) + 1} / {industries.length}
                        </div>
                        <div className="flex gap-1.5">
                          {industries.map((ind) => (
                            <button
                              key={ind.id}
                              onClick={() => setActive(ind.id)}
                              aria-label={`Show ${ind.name}`}
                              className="h-1.5 rounded-full transition-all duration-300"
                              style={{
                                width: ind.id === active ? "22px" : "6px",
                                background:
                                  ind.id === active
                                    ? `rgb(${current.accentRgb})`
                                    : "rgba(255,255,255,0.45)",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center reveal">
          <Link href="/industries" className="btn-primary">
            View All Industries <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes kenburns {
          0%   { transform: scale(1)    translate(0, 0); }
          50%  { transform: scale(1.08) translate(-1%, -1.5%); }
          100% { transform: scale(1)    translate(0, 0); }
        }
        :global(.animate-kenburns) {
          animation: kenburns 18s ease-in-out infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.animate-kenburns) { animation: none; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
