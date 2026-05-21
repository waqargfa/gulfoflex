import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers, Shield, Zap, Wind } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Insulation Technologies | Gulf-O-Flex® NBR Rubber | UAE",
  description:
    "Discover Gulf-O-Flex® advanced insulation technologies — closed-cell NBR rubber, XLPE, acoustic insulation, and fire-rated systems engineered for extreme performance.",
  alternates: { canonical: "https://gulfoflex.com/technologies" },
};

const technologies = [
  {
    icon: Layers,
    title: "Closed-Cell NBR Elastomeric",
    tag: "Core Technology",
    color: "orange",
    desc: "Nitrile Butadiene Rubber (NBR) closed-cell foam is our foundational insulation technology. The closed-cell structure prevents moisture absorption — the primary cause of insulation failure in humid climates like the GCC — while delivering class-leading thermal performance.",
    specs: [
      { label: "Thermal Conductivity", value: "≤0.036 W/(m·K)" },
      { label: "Temperature Range", value: "-40°C to +105°C" },
      { label: "Water Vapour Resistance", value: "μ ≥ 10,000" },
      { label: "Fire Class", value: "B1 / BS Class O" },
    ],
    benefits: ["Zero water absorption", "No surface condensation", "Flexible at low temperatures", "Long-term dimensional stability"],
  },
  {
    icon: Zap,
    title: "Cross-Linked Polyethylene (XLPE)",
    tag: "Advanced Polymer",
    color: "blue",
    desc: "XLPE foam insulation extends performance into higher-temperature applications while maintaining the flexibility and workability engineers expect. The cross-linked molecular structure provides superior resistance to compression, UV, and chemical exposure.",
    specs: [
      { label: "Thermal Conductivity", value: "≤0.038 W/(m·K)" },
      { label: "Temperature Range", value: "-50°C to +120°C" },
      { label: "Density", value: "25–35 kg/m³" },
      { label: "Compressive Strength", value: ">100 kPa" },
    ],
    benefits: ["Higher temperature resistance", "UV-resistant formulation", "Chemical inertness", "Lightweight installation"],
  },
  {
    icon: Wind,
    title: "Acoustic Insulation System",
    tag: "Sound Control",
    color: "purple",
    desc: "Gulf-O-Flex Sound is engineered for dual thermal and acoustic performance in HVAC ductwork, pipework, and mechanical rooms. A multi-layer composite of mass-loaded vinyl, NBR foam, and fibre combines to achieve up to 32 dB sound reduction.",
    specs: [
      { label: "Sound Reduction Index", value: "Up to 32 dB" },
      { label: "Frequency Range", value: "100–3150 Hz" },
      { label: "Thermal λ", value: "≤0.036 W/(m·K)" },
      { label: "Surface Burning Class", value: "Class A" },
    ],
    benefits: ["Duct-borne noise reduction", "Impact sound damping", "Combined thermal + acoustic", "Pre-slit for fast fitting"],
  },
  {
    icon: Shield,
    title: "Aluglass & Aluclad Cladding",
    tag: "Surface Finish",
    color: "green",
    desc: "Premium aluminium-glass reinforced laminate claddings protect insulation systems from UV, mechanical damage, and weather in outdoor and industrial applications. Bonded directly to NBR or XLPE core without adhesive for permanent performance.",
    specs: [
      { label: "Aluminium Thickness", value: "0.025–0.05 mm" },
      { label: "Operating Temp", value: "-30°C to +80°C" },
      { label: "UV Resistance", value: "Class A (ASTM G154)" },
      { label: "Peel Strength", value: "≥8 N/cm" },
    ],
    benefits: ["UV & weather protection", "Chemical resistance", "Self-adhesive variants available", "Clean professional finish"],
  },
];

export default function TechnologiesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-24" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="/images/products/nbr-banner.jpeg" focalY="45%" />
        <div className="container-wide relative z-10">
          <div className="max-w-4xl">
            <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-700">Technologies</span>
            </nav>
            <div className="eyebrow mb-6"><span className="eyebrow-dot" />Core Technologies · 4 Systems</div>
            <h1 className="text-neutral-900 leading-[0.95] mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
              Engineering<br />
              <span className="gradient-text">insulation science</span><span className="serif-italic text-orange-600">.</span>
            </h1>
            <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-3xl">
              Every Gulf-O-Flex® product is built on decades of material science research and real-world performance data from the world&rsquo;s most demanding environments.
            </p>
          </div>
        </div>
      </section>

      {/* ── Technologies ── */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="container-wide">
          <div className="space-y-6">
            {technologies.map((tech, i) => (
              <div key={tech.title}
                className="group relative rounded-3xl border bg-white overflow-hidden transition-all duration-500 hover:border-orange-300/60 hover:shadow-[0_40px_80px_-30px_rgba(234,88,12,0.25)]"
                style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-6 right-7 text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-400">
                  0{i + 1} / 0{technologies.length}
                </div>
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 p-8 lg:p-12 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                        style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))", border: "1px solid rgba(249,115,22,0.20)" }}>
                        <tech.icon size={20} className="text-orange-600" strokeWidth={2.2} />
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase text-orange-700 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {tech.tag}
                      </span>
                    </div>
                    <h2 className="text-neutral-900 leading-[1.05] mb-4"
                      style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
                      {tech.title}
                    </h2>
                    <p className="text-neutral-600 leading-relaxed mb-6">{tech.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {tech.benefits.map((b) => (
                        <div key={b} className="flex items-center gap-2 text-sm text-neutral-700 rounded-lg px-3 py-2 bg-neutral-50 border"
                          style={{ borderColor: "rgba(0,0,0,0.05)" }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specs panel */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />
                    <div className="relative rounded-2xl border bg-gradient-to-br from-white to-orange-50/40 overflow-hidden"
                      style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                      <div className="px-6 py-4 border-b flex items-center justify-between"
                        style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                        <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">Technical Data</div>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                        {tech.specs.map((spec) => (
                          <div key={spec.label} className="flex items-center justify-between px-6 py-3.5 hover:bg-orange-50/60 transition-colors"
                            style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                            <span className="text-sm text-neutral-500 font-medium">{spec.label}</span>
                            <span className="text-sm font-bold text-neutral-900" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden py-20" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 grid-bg opacity-[0.10]" />
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-500/20 blur-[90px] pointer-events-none" />
        <div className="absolute -right-32 bottom-0 w-80 h-80 rounded-full bg-orange-500/12 blur-[80px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <div className="container-wide relative z-10 text-center">
          <div className="eyebrow mb-5 mx-auto w-fit"
            style={{ background: "rgba(249,115,22,0.12)", borderColor: "rgba(249,115,22,0.30)", color: "#fb923c" }}>
            <span className="eyebrow-dot" />Engineering Support
          </div>
          <h2 className="text-white leading-[1.05] mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            Need help choosing the<br /><span className="serif-italic text-orange-400">right technology?</span>
          </h2>
          <p className="text-white/55 max-w-xl mx-auto mb-8">
            Our technical team provides free specification consultations, thermal calculations, and product selection guidance.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/contact" className="btn-primary">
              Get Technical Support <ArrowRight size={16} />
            </Link>
            <Link href="/products" className="btn-ghost"
              style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.18)" }}>
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
