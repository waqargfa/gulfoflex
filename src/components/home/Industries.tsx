"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Flame, Anchor, Hammer, Snowflake, Cog, CheckCircle2, Package, ChevronRight } from "lucide-react";

const industries = [
  {
    id: "hvac",
    name: "HVAC & MEP",
    shortName: "HVAC & MEP",
    icon: Building2,
    desc: "Comprehensive insulation solutions for heating, ventilation, air conditioning, and mechanical, electrical & plumbing systems. Reduces energy consumption and prevents condensation in even the most complex building service networks.",
    applications: ["Chilled water pipes", "Refrigerant lines", "Air handling units", "Ductwork insulation", "Fan coil units"],
    products: ["Gulf-O-Flex NBR", "Gulf-O-Flex Sound", "Accessories"],
    projects: "2,000+",
    stat: { label: "Energy Savings", value: "Up to 40%" },
    color: "text-orange-600",
    accentRgb: "234 88 12",
    bg: "bg-orange-500/8",
    border: "border-orange-500/20",
    activeBg: "bg-orange-600",
    gradient: "from-orange-600/10 via-orange-500/5 to-transparent",
    href: "/industries/hvac",
  },
  {
    id: "oil-gas",
    name: "Oil & Gas",
    shortName: "Oil & Gas",
    icon: Flame,
    desc: "High-performance thermal insulation rated for extreme temperatures found in refineries, petrochemical plants, pipelines, and offshore platforms. Engineered to meet the most demanding international standards.",
    applications: ["Process piping", "Cryogenic systems", "Heat exchangers", "Storage tanks", "LNG facilities"],
    products: ["Gulf-O-Flex NBR", "Gulf-O-Flex Aluclad"],
    projects: "500+",
    stat: { label: "Temp. Range", value: "-200°C to 150°C" },
    color: "text-red-500",
    accentRgb: "239 68 68",
    bg: "bg-red-500/8",
    border: "border-red-500/20",
    activeBg: "bg-red-500",
    gradient: "from-red-600/10 via-red-500/5 to-transparent",
    href: "/industries/oil-gas",
  },
  {
    id: "marine",
    name: "Marine",
    shortName: "Marine",
    icon: Anchor,
    desc: "Marine-grade insulation engineered to withstand harsh sea environments, salt spray, humidity, and vibration on ships, offshore platforms, and naval vessels. Certified to international marine standards.",
    applications: ["HVAC systems", "Engine rooms", "Piping systems", "Refrigeration", "Acoustic damping"],
    products: ["Gulf-O-Flex NBR", "Gulf-O-Flex Sound"],
    projects: "300+",
    stat: { label: "Humidity Resistance", value: "99.9%" },
    color: "text-blue-500",
    accentRgb: "59 130 246",
    bg: "bg-blue-500/8",
    border: "border-blue-500/20",
    activeBg: "bg-blue-500",
    gradient: "from-blue-600/10 via-blue-500/5 to-transparent",
    href: "/industries/marine",
  },
  {
    id: "construction",
    name: "Construction",
    shortName: "Construction",
    icon: Hammer,
    desc: "Thermal and acoustic insulation for commercial buildings, residential complexes, hotels, hospitals, and infrastructure projects meeting the latest international energy codes and sustainability standards.",
    applications: ["Building services", "Underfloor heating", "Rooftop units", "Acoustic walls", "Green buildings"],
    products: ["Gulf-O-Flex NBR", "Gulf-O-Flex XLPE", "Gulf-O-Flex Sound"],
    projects: "5,000+",
    stat: { label: "Projects Delivered", value: "5,000+" },
    color: "text-amber-500",
    accentRgb: "245 158 11",
    bg: "bg-amber-500/8",
    border: "border-amber-500/20",
    activeBg: "bg-amber-500",
    gradient: "from-amber-600/10 via-amber-500/5 to-transparent",
    href: "/industries/construction",
  },
  {
    id: "district-cooling",
    name: "District Cooling",
    shortName: "District Cooling",
    icon: Snowflake,
    desc: "Specialized insulation for district cooling networks — the backbone of sustainable urban cooling in GCC cities. Prevents energy loss across extensive pipe networks and ensures maximum system efficiency.",
    applications: ["Distribution mains", "Riser pipes", "Energy transfer stations", "Chiller plants", "Storage tanks"],
    products: ["Gulf-O-Flex NBR", "Gulf-O-Flex Aluclad"],
    projects: "200+",
    stat: { label: "Heat Loss Reduction", value: "Up to 35%" },
    color: "text-cyan-500",
    accentRgb: "6 182 212",
    bg: "bg-cyan-500/8",
    border: "border-cyan-500/20",
    activeBg: "bg-cyan-500",
    gradient: "from-cyan-600/10 via-cyan-500/5 to-transparent",
    href: "/industries/district-cooling",
  },
  {
    id: "industrial",
    name: "Industrial Plants",
    shortName: "Industrial",
    icon: Cog,
    desc: "Heavy-duty thermal insulation for manufacturing plants, food processing facilities, pharmaceutical plants, and general industrial processes requiring precise temperature control and long-term durability.",
    applications: ["Process vessels", "Industrial piping", "Boiler systems", "Cold storage", "Cleanrooms"],
    products: ["Gulf-O-Flex NBR", "Gulf-O-Flex XLPE", "Gulf-O-Flex Aluclad"],
    projects: "800+",
    stat: { label: "Service Life", value: "25+ Years" },
    color: "text-purple-500",
    accentRgb: "168 85 247",
    bg: "bg-purple-500/8",
    border: "border-purple-500/20",
    activeBg: "bg-purple-500",
    gradient: "from-purple-600/10 via-purple-500/5 to-transparent",
    href: "/industries/industrial",
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
          <div className="eyebrow justify-center mb-5">
            <span className="eyebrow-dot" />
            Industries We Serve
          </div>
          <h2
            id="industries-heading"
            className="text-neutral-900 mb-5 leading-[1.02]"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 4.5vw, 4.25rem)", fontWeight: 700, letterSpacing: "-0.035em" }}
          >
            Trusted across<br />
            <span className="serif-italic text-orange-600">every sector.</span>
          </h2>
          <p className="text-neutral-500 text-lg">
            Gulf-O-Flex® insulation powers critical infrastructure across six major industries, delivering consistent performance in the most demanding environments.
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
                  className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-300 text-left shrink-0 lg:w-full ${
                    isActive
                      ? `${ind.bg} ${ind.border} shadow-sm`
                      : "bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive ? `${ind.bg} border ${ind.border}` : "bg-neutral-100 group-hover:bg-neutral-200"
                    }`}
                  >
                    <Icon size={16} className={isActive ? ind.color : "text-neutral-400 group-hover:text-neutral-600"} />
                  </div>
                  <span
                    className={`font-semibold text-sm transition-colors duration-200 whitespace-nowrap ${
                      isActive ? ind.color : "text-neutral-600 group-hover:text-neutral-900"
                    }`}
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                  >
                    {ind.shortName}
                  </span>
                  {isActive && <ChevronRight size={14} className={`${ind.color} ml-auto shrink-0 hidden lg:block`} />}
                </button>
              );
            })}
          </div>

          {/* Detail Panel */}
          <div
            key={active}
            className={`relative rounded-2xl border ${current.border} overflow-hidden bg-white`}
            style={{ animation: "fadeSlideIn 0.35s ease forwards" }}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${current.gradient} pointer-events-none`} />

            {/* Accent top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
              style={{ background: `rgb(${current.accentRgb})` }}
            />

            <div className="relative z-10 p-8 lg:p-10">
              <div className="grid lg:grid-cols-[1fr_auto] gap-8">
                {/* Left: main info */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl ${current.bg} border ${current.border} flex items-center justify-center`}>
                      <ActiveIcon size={28} className={current.color} />
                    </div>
                    <div>
                      <h3
                        className={`font-bold text-2xl ${current.color} leading-tight`}
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
                      >
                        {current.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full border"
                          style={{
                            color: `rgb(${current.accentRgb})`,
                            borderColor: `rgba(${current.accentRgb},0.3)`,
                            background: `rgba(${current.accentRgb},0.08)`,
                          }}
                        >
                          {current.projects} Projects
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-neutral-600 leading-relaxed mb-7 max-w-xl">{current.desc}</p>

                  {/* Applications */}
                  <div className="mb-7">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Key Applications</p>
                    <div className="flex flex-wrap gap-2">
                      {current.applications.map((a) => (
                        <div key={a} className="flex items-center gap-1.5">
                          <CheckCircle2
                            size={13}
                            className={current.color}
                            style={{ color: `rgb(${current.accentRgb})` }}
                          />
                          <span className="text-sm text-neutral-700">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Products */}
                  <div className="mb-8">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Recommended Products</p>
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
                    style={{ background: `rgb(${current.accentRgb})`, boxShadow: `0 4px 20px rgba(${current.accentRgb},0.3)` }}
                  >
                    Explore {current.name} Solutions
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Right: stat card */}
                <div className="hidden lg:flex flex-col items-center justify-center">
                  <div
                    className="w-48 h-48 rounded-3xl flex flex-col items-center justify-center text-center p-6 border"
                    style={{
                      background: `rgba(${current.accentRgb},0.06)`,
                      borderColor: `rgba(${current.accentRgb},0.2)`,
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `rgba(${current.accentRgb},0.12)` }}
                    >
                      <ActiveIcon size={22} style={{ color: `rgb(${current.accentRgb})` }} />
                    </div>
                    <p
                      className="font-black text-2xl leading-tight mb-1"
                      style={{ fontFamily: "var(--font-display)", color: `rgb(${current.accentRgb})`, letterSpacing: "-0.04em" }}
                    >
                      {current.stat.value}
                    </p>
                    <p className="text-xs text-neutral-500 font-medium">{current.stat.label}</p>
                  </div>

                  {/* Industry counter */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-neutral-400">
                      {industries.findIndex((i) => i.id === active) + 1} of {industries.length} Industries
                    </p>
                    <div className="flex gap-1 mt-2 justify-center">
                      {industries.map((ind) => (
                        <button
                          key={ind.id}
                          onClick={() => setActive(ind.id)}
                          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                          style={{
                            background: ind.id === active ? `rgb(${current.accentRgb})` : "#d4d4d4",
                            transform: ind.id === active ? "scale(1.4)" : "scale(1)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
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
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
