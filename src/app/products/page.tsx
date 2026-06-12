import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Layers,
  Package,
  Shield,
  Sparkles,
  Thermometer,
  Volume2,
  Zap,
} from "lucide-react";
import ProductAnimation from "@/components/products/ProductAnimation";

export const metadata: Metadata = {
  title: "Insulation Products | Gulf-O-Flex® NBR, XLPE, Sound & Facing Systems",
  description:
    "Explore Gulf-O-Flex® full range of insulation products: NBR closed-cell rubber, XLPE foam, acoustic insulation, Aluglass and Aluclad facing systems. ISO 9001, FM Approved.",
  alternates: { canonical: "https://gulfoflex.com/products" },
};

const products = [
  {
    slug: "nbr",
    icon: Thermometer,
    name: "Gulf-O-Flex® NBR",
    shortName: "NBR Rubber Insulation",
    tagline: "Closed-cell thermal benchmark",
    desc: "Premium closed-cell Nitrile Butadiene Rubber (NBR) thermal and acoustic insulation. Engineered for HVAC, plumbing, refrigeration, and district cooling applications. Zero ODP, Class 1 fire rated.",
    keyFeatures: ["Class 1 Fire Rated (ASTM E84)", "Zero ODP/GWP", "λ ≤ 0.036 W/mK", "Temp Range −40°C to +105°C"],
    applications: ["HVAC", "District Cooling", "Cold Water", "Industrial"],
    tag: "Best Seller",
    image: "/assets/plain/C_107249.jpg",
  },
  {
    slug: "xlpe",
    icon: Zap,
    name: "Gulf-O-Flex® XLPE",
    shortName: "Crosslinked Polyethylene Foam",
    tagline: "Closed-cell XLPE with alupet facing",
    desc: "Chemically crosslinked polyethylene closed-cell foam with a thin alupet facing - a passive, self-sustaining solution engineered for difficult environments. Lightweight, high-pressure tolerant, and self-extinguishing for thermal and acoustic insulation.",
    keyFeatures: ["λ 0.045 W/m·K @ 35°C", "Class O Fire Rated (BS 476)", "μ ≥ 11,000 (foil side)", "Operating −183°C to +115°C"],
    applications: ["HVAC Ducts", "Underfloor", "Automotive", "Marine"],
    tag: "Premium",
    image: "/assets/duct.webp",
  },
  {
    slug: "sound",
    icon: Volume2,
    name: "Gulf O Sound",
    shortName: "Open-Cell Acoustic Elastomeric Foam",
    tagline: "Engineered sound absorption",
    desc: "Flexible, open-cell elastomeric foam engineered to absorb sound and dampen vibration in HVAC/R systems, pipelines, plant rooms, and industrial applications - made from 100% recycled materials.",
    keyFeatures: ["NRC up to 1.00", "High Flexibility", "Class 1 Fire Rated", "100% Recycled Material"],
    applications: ["HVAC Duct Liner", "Plant Rooms", "Conference Rooms", "OEM"],
    tag: "Acoustic",
    image: "/assets/plain/C_107300.jpg",
  },
  {
    slug: "aluglass",
    icon: Layers,
    name: "Gulf-O-Flex® Aluglass",
    shortName: "NBR Foam with Aluglass Facing",
    tagline: "Best-selling rubber insulation, self-sustaining energy efficiency",
    desc: "Flexible NBR elastomeric foam (6–50mm) finished with a factory-applied 7μm aluminum + 110 GSM glass fiber cloth facing. Passive thermal insulation with zero water vapour transmission, Class O fire rating, and FM Approved performance - in sheet and tube forms, with or without self-adhesive.",
    keyFeatures: ["High Flexibility", "Sustainable · Zero ODP", "Physical Protection", "Easy Installation"],
    applications: ["Hot & Cold Plumbing", "Refrigeration Lines", "HVAC Ducts", "Oil & Gas"],
    tag: "Best Seller",
    image: "/assets/ALUGLASS.png",
  },
  {
    slug: "aluclad",
    icon: Shield,
    name: "Gulf-O-Flex® Aluclad",
    shortName: "NBR Foam with Alu-Clad Facing",
    tagline: "Outdoor-ready insulation",
    desc: "Best-selling closed-cell NBR insulation with factory-applied Alu-Clad facing - a passive, self-sustaining solution for mechanical systems and outdoor environments. UV, moisture, and fire resistant.",
    keyFeatures: ["UV Stable - 8+ Years / 10,000h", "Self-Extinguishing (Class O)", "0.00 Perm Vapour Barrier", "Sheet or Tube, ± Self-Adhesive"],
    applications: ["Outdoor", "HVAC Ducts", "Plumbing", "Refrigeration"],
    tag: "Best Seller",
    image: "/assets/ALUCLAD 2 (2).png",
  },
  {
    slug: "ultra",
    icon: Sparkles,
    name: "Gulf-O-Flex® Ultra",
    shortName: "Ultra-Low Conductivity Premium Foam",
    tagline: "Next-gen NBR/EPDM blend, λ 0.030 W/m·K",
    desc: "Premium closed-cell NBR/EPDM hybrid insulation with an industry-leading thermal conductivity of 0.030 W/m·K at 0°C and an extended operating window from -50°C to +115°C. FM Approved, UL Listed, EPD Verified - engineered for chilled water, district cooling, and low-temperature process lines.",
    keyFeatures: ["λ 0.030 W/m·K @ 0°C", "Operating −50°C to +115°C", "μ > 10,000 (BS EN 12086)", "Class O Fire Rated · Zero ODP"],
    applications: ["Chilled Water", "District Cooling", "Cryogenic Piping", "Data Centres"],
    tag: "Premium",
    image: "/assets/plain/C_107249.jpg",
  },
  {
    slug: "ultraline",
    icon: Layers,
    name: "Gulf-O-Flex® UltraLine",
    shortName: "Pre-Insulated Continuous Tube Line System",
    tagline: "Factory pre-insulated copper line - coils up to 50 m",
    desc: "Complete factory pre-insulated copper tube line system supplied in continuous coils up to 50 m. Nitrogen-charged copper tube + closed-cell NBR core + UV-stable LDPE jacket - a one-pull, joint-free vapour barrier for VRF/VRV, split AC, chilled-water mini-loops, and solar thermal piping.",
    keyFeatures: ["Continuous Coils up to 50 m", "Single / Twin / Multi-Tube", "Integral Vapour Barrier", "UV-Stable LDPE Outer Jacket"],
    applications: ["VRF / VRV", "Split AC", "Chilled Water", "Solar Thermal"],
    tag: "System",
    image: "/assets/duct.webp",
  },
  {
    slug: "accessories",
    icon: Package,
    name: "Accessories & Adhesives",
    shortName: "Adhesives, Sealants, Tapes & Anti-Vibration",
    tagline: "Complete system accessories",
    desc: "Gulf O Glue, Gulf-O-Seal 81-10 & 32-17 adhesives and sealants; Aluglass, Aluminium Foil, Alupet, PVC, and NBR Foam tapes; plus Anti-Vibration Cork and Metal Sandwich pads - all engineered for full compatibility with Gulf-O-Flex® insulation.",
    keyFeatures: ["Low-VOC Polychloroprene Adhesive", "Fire-Resistive Duct Sealant", "Foil / Glass / PVC / Alupet Tapes", "Cork & Metal Anti-Vibration Pads"],
    applications: ["Adhesives", "Duct Sealing", "Vapour Sealing", "Anti-Vibration"],
    tag: "System",
    image: "/assets/aluminium.webp",
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-24" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1769695832202-0f10d9d21f27?auto=format&fit=crop&w=2400&q=80" focalY="center" />

        <div className="container-wide relative z-10">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">Products</span>
          </nav>

          <div className="max-w-4xl">
            <div className="eyebrow mb-6"><span className="eyebrow-dot" />Product Range · 6 Systems</div>
            <h1 className="text-neutral-900 leading-[0.95] mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
              {/* Line 1 */}
              <span className="block">
                <span className="word-fade-up" style={{ animationDelay: "80ms" }}>Complete</span>
              </span>
              {/* Line 2 */}
              <span className="block" style={{ color: "rgba(12,10,9,0.45)" }}>
                <span className="word-fade-up" style={{ animationDelay: "200ms" }}>insulation</span>
              </span>
              {/* Line 3 */}
              <span className="block">
                <span className="word-fade-up gradient-text serif-italic" style={{ animationDelay: "310ms" }}>solutions.</span>
              </span>
            </h1>
            <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-3xl mb-8">
              From thermal and acoustic insulation to facing systems and installation accessories, Gulf-O-Flex® offers a complete range engineered for performance in the world&rsquo;s most demanding environments.
            </p>

            {/* Quick chips */}
            <div className="flex flex-wrap gap-2">
              {products.map((p) => (
                <a key={p.slug} href={`#${p.slug}`} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border text-xs font-semibold text-neutral-700 hover:border-orange-300 hover:text-orange-700 hover:-translate-y-0.5 transition-all"
                  style={{ borderColor: "rgba(0,0,0,0.10)" }}>
                  <p.icon size={13} className="text-orange-500" />
                  {p.shortName}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Products grid ── */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="container-wide relative z-10">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {products.map((p, i) => (
              <Link
                key={p.slug}
                id={p.slug}
                href={`/products/${p.slug}`}
                className="product-card group relative rounded-3xl border bg-white overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-30px_rgba(234,88,12,0.35)] hover:border-orange-300/60"
                style={{ borderColor: "rgba(0,0,0,0.08)" }}
                aria-label={`View ${p.name} details`}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Corner number */}
                <div className="absolute top-5 right-5 z-10 text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400">
                  0{i + 1}
                </div>

                {/* Product image */}
                {p.image && (
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white/30" />
                  </div>
                )}

                <div className="relative px-7 pt-8 pb-7">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))", border: "1px solid rgba(249,115,22,0.20)" }}>
                      <p.icon size={20} className="text-orange-600" strokeWidth={2.2} />
                    </div>
                    <span className="tag text-[9px]">{p.tag}</span>
                  </div>

                  <h2 className="text-neutral-900 font-bold text-xl mb-1.5"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>
                    {p.name}
                  </h2>
                  <div className="text-orange-600 text-[11px] uppercase tracking-[0.15em] font-bold mb-3">
                    {p.tagline}
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-5">{p.desc}</p>

                  <ul className="space-y-1.5 mb-5">
                    {p.keyFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[12.5px] text-neutral-700">
                        <CheckCircle2 size={13} className="text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 mb-5 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    <div className="text-[10px] uppercase font-bold tracking-[0.15em] text-neutral-400 mb-2">Applications</div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.applications.map((a) => (
                        <span key={a} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-orange-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                      View specifications <ArrowRight size={14} />
                    </span>
                    <span className="w-9 h-9 rounded-full border flex items-center justify-center text-neutral-400 group-hover:bg-orange-600 group-hover:border-orange-600 group-hover:text-white transition-all"
                      style={{ borderColor: "rgba(0,0,0,0.10)" }}>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works · Live 3D ── */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "#080a0f" }}>
        <div className="absolute inset-0 grid-bg opacity-[0.10]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[460px] bg-orange-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

        <div className="container-wide relative z-10">
          <div className="text-center mb-14">
            <div
              className="eyebrow mb-4 mx-auto w-fit"
              style={{ background: "rgba(249,115,22,0.12)", borderColor: "rgba(249,115,22,0.30)", color: "#fb923c" }}
            >
              <span className="eyebrow-dot" />How It Works · Live 3D
            </div>
            <h2
              className="text-white leading-[1.05] mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.8vw, 3.25rem)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
              }}
            >
              See every product <span className="serif-italic text-orange-400">in motion.</span>
            </h2>
            <p className="text-white/55 max-w-2xl mx-auto">
              A live, cinematic walkthrough of how each Gulf-O-Flex® system performs - engineered animations show
              structure, application, and the science behind the spec.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-7">
            {products.map((p, i) => (
              <div
                key={`live-${p.slug}`}
                className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.015] backdrop-blur-2xl overflow-hidden shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] group hover:border-orange-400/30 transition-colors"
              >
                <div className="absolute -inset-10 bg-gradient-to-br from-orange-500/15 via-orange-500/0 to-transparent rounded-[3rem] blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />

                {/* Header bar */}
                <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-50 animate-ping" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.7)]" />
                    </span>
                    <span className="text-[10px] tracking-[0.22em] uppercase font-bold text-white/65">Live Simulation</span>
                  </div>
                  <span className="text-[10px] tracking-[0.22em] uppercase font-bold text-orange-300">
                    {String(i + 1).padStart(2, "0")} · {p.slug.toUpperCase()}
                  </span>
                </div>

                {/* Title strip */}
                <div className="relative px-6 pt-5 pb-3 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, rgba(249,115,22,0.22), rgba(249,115,22,0.06))",
                          border: "1px solid rgba(249,115,22,0.28)",
                        }}
                      >
                        <p.icon size={16} className="text-orange-300" strokeWidth={2.2} />
                      </span>
                      <h3
                        className="text-white font-bold text-lg md:text-xl"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                      >
                        {p.name}
                      </h3>
                    </div>
                    <div className="text-orange-300/90 text-[10.5px] uppercase tracking-[0.18em] font-bold">
                      {p.tagline}
                    </div>
                  </div>
                  <span className="tag text-[9px] shrink-0 mt-1">{p.tag}</span>
                </div>

                {/* The animation */}
                <div className="relative">
                  <ProductAnimation
                    slug={p.slug}
                    shortName={p.shortName}
                    specValue={p.keyFeatures[2]}
                    productCount={products.length}
                    index={i + 1}
                  />
                </div>

                {/* Key features mini grid */}
                <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
                  {p.keyFeatures.slice(0, 4).map((f) => (
                    <div key={f} className="bg-[#0c0c0c] px-5 py-4 flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 text-[12px] leading-snug font-medium">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/10 bg-black/30">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/50">
                    <BadgeCheck size={12} className="text-orange-300" /> Engineered system
                  </div>
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-[11px] uppercase tracking-[0.16em] font-bold text-orange-300 hover:text-orange-200 inline-flex items-center gap-1.5 transition-colors"
                  >
                    Explore <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <div className="inline-flex items-center gap-2 text-white/55 text-[12px]">
              <Sparkles size={14} className="text-orange-400" />
              Animations are illustrative - request a sample for true material performance.
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      </section>

      {/* ── Why our system ── */}
      <section className="relative overflow-hidden py-20 md:py-24" style={{ background: "#080a0f" }}>
        <div className="absolute inset-0 grid-bg opacity-[0.10]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[460px] bg-orange-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

        <div className="container-wide relative z-10">
          <div className="text-center mb-12">
            <div className="eyebrow mb-4 mx-auto w-fit"
              style={{ background: "rgba(249,115,22,0.12)", borderColor: "rgba(249,115,22,0.30)", color: "#fb923c" }}>
              <span className="eyebrow-dot" />One Engineered System
            </div>
            <h2 className="text-white leading-[1.05] mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.8vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Every component, <span className="serif-italic text-orange-400">engineered together.</span>
            </h2>
            <p className="text-white/55 max-w-2xl mx-auto">
              From the insulation core to the facing, adhesive, and accessory - every Gulf-O-Flex® product is engineered to perform as one certified system.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden max-w-4xl mx-auto"
            style={{ background: "rgba(255,255,255,0.08)" }}>
            {[
              { n: "6",   l: "Product families" },
              { n: "30+", l: "Years field-proven" },
              { n: "10K+",l: "Projects delivered" },
              { n: "ISO", l: "9001 Certified" },
            ].map((s) => (
              <div key={s.l} className="px-6 py-7 text-center" style={{ background: "#0a0c12" }}>
                <div className="text-orange-500 font-black text-3xl md:text-4xl leading-none mb-1.5"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>
                  {s.n}
                </div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider font-semibold">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact" className="btn-primary">
              Get product specifications <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      </section>
    </>
  );
}
