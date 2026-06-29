import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Leaf, Recycle, Sun, Droplets, Wind, BarChart3 } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Sustainability | Gulf-O-Flex® Green Manufacturing & ESG",
  description:
    "Gulf-O-Flex® is committed to sustainable insulation manufacturing. Discover our zero-ODP products, energy-saving impact data, waste reduction initiatives, and ESG commitments.",
  alternates: { canonical: "https://gulfoflex.com/sustainability" },
};

const commitments = [
  {
    icon: Leaf,
    title: "Zero ODP Materials",
    color: "orange",
    desc: "All Gulf-O-Flex® products use blowing agents with zero Ozone Depletion Potential (ODP = 0), compliant with the Montreal Protocol and Dubai Green Building Regulations.",
    metric: "ODP = 0",
    metricLabel: "All Product Range",
  },
  {
    icon: Sun,
    title: "Low GWP Formulation",
    color: "orange",
    desc: "Our next-generation NBR formulation uses a low-GWP blowing agent, reducing the product's embedded carbon footprint by 5% versus conventional HFC-based cellular insulation.",
    metric: "–5%",
    metricLabel: "Embodied Carbon Reduction",
  },
  {
    icon: BarChart3,
    title: "Energy Saving Impact",
    color: "neutral",
    desc: "Every 1 tonne of Gulf-O-Flex® insulation installed prevents an estimated 12 tonnes of CO₂ emissions over a 25-year system life through reduced heating and cooling energy demand.",
    metric: "12:1",
    metricLabel: "CO₂ Savings Ratio",
  },
  {
    icon: Recycle,
    title: "Manufacturing Waste Reduction",
    color: "neutral",
    desc: "Our closed-loop manufacturing process recycles 95% of production offcuts back into raw material. We have reduced landfill waste from manufacturing by 72% since 2018.",
    metric: "95%",
    metricLabel: "Offcut Recycling Rate",
  },
  {
    icon: Droplets,
    title: "Natural Cooling System",
    color: "neutral",
    desc: "Our Ajman facilities use a natural air-cooling system for manufacturing processes, eliminating the need for water-based cooling entirely and reducing overall resource consumption.",
    metric: "0",
    metricLabel: "Water Used in Cooling",
  },
  {
    icon: Wind,
    title: "Carbon-Neutral Target",
    color: "orange",
    desc: "Gulf-O-Flex® has committed to achieving carbon-neutral manufacturing by 2035, through a combination of renewable energy procurement, process efficiency, and verified carbon offsetting.",
    metric: "2035",
    metricLabel: "Carbon-Neutral Target Year",
  },
];

const standards = [
  "Dubai Green Building Regulations",
  "UAE Net Zero 2050 Aligned",
  "ISO 14001 Environmental Management",
];

export default function SustainabilityPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 md:pt-24 pb-8 md:pb-10" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=80" focalY="40%" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                <span className="text-neutral-300">/</span>
                <span className="text-neutral-700">Sustainability</span>
              </nav>
              <h1 className="text-neutral-900 leading-[0.95] mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
                Insulation that<br />
                <span className="gradient-text">saves the planet</span><span className="serif-italic text-orange-600">.</span>
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                Our insulation products are not just performance-optimized - they&rsquo;re engineered to reduce energy consumption and carbon emissions over their entire lifecycle, contributing directly to a net-zero future.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/15 to-transparent rounded-[2rem] blur-3xl pointer-events-none" />
              <div className="relative rounded-3xl border bg-white/90 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(234,88,12,0.20)]"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="px-7 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <Leaf size={14} className="text-orange-600" />
                    <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">Impact metrics</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(0,0,0,0.06)" }}>
                  {[
                    { n: "0", l: "ODP rating" },
                    { n: "–5%", l: "Embodied carbon" },
                    { n: "95%", l: "Offcuts recycled" },
                    { n: "2035", l: "Carbon-neutral" },
                  ].map((s) => (
                    <div key={s.l} className="bg-white p-6">
                      <div className="text-neutral-900 font-black mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)", letterSpacing: "-0.025em" }}>{s.n}</div>
                      <div className="text-neutral-500 text-[10px] uppercase tracking-[0.18em] font-bold">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Commitments ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <div className="eyebrow mb-4"><span className="eyebrow-dot" />Our ESG Pillars</div>
            <h2 className="text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Six commitments to <span className="serif-italic text-orange-600">a greener future.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commitments.map((c, i) => (
              <div key={c.title}
                className="group relative rounded-3xl border bg-white p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-30px_rgba(234,88,12,0.30)] hover:border-orange-300/60"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-6 right-7 text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-400">0{i + 1} / 06</div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))", border: "1px solid rgba(249,115,22,0.20)" }}>
                  <c.icon size={20} className="text-orange-600" strokeWidth={2.2} />
                </div>
                <div className="text-neutral-900 font-black mb-1"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2vw, 2rem)", letterSpacing: "-0.025em" }}>
                  {c.metric}
                </div>
                <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600 mb-4">{c.metricLabel}</div>
                <h3 className="text-neutral-900 font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}>{c.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Standards split ── */}
      <section className="py-20 md:py-28 bg-neutral-50 relative">
        <div className="absolute inset-0 grid-bg opacity-[0.10]" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="eyebrow mb-5"><span className="eyebrow-dot" />Standards &amp; Ratings</div>
              <h2 className="text-neutral-900 leading-[1.05] mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
                Supporting green<br /><span className="serif-italic text-orange-600">building certifications.</span>
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-8 max-w-xl">
                Gulf-O-Flex® products support achievement of the world&rsquo;s leading green building rating systems. Our technical team can provide all required documentation, EPDs, and calculations to support your project&rsquo;s sustainability targets.
              </p>
              <Link href="/contact" className="btn-primary">
                Request Sustainability Data <ArrowRight size={16} />
              </Link>
            </div>
            <div className="rounded-3xl border bg-white overflow-hidden" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600 flex items-center gap-2">
                  <Leaf size={12} />Green Standards · {standards.length}
                </div>
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              </div>
              <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                {standards.map((std, i) => (
                  <div key={std} className="flex items-center gap-4 px-6 py-4 hover:bg-orange-50/40 transition-colors group">
                    <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 w-8">0{i + 1}</div>
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                    <span className="text-sm font-semibold text-neutral-800 flex-1">{std}</span>
                    <ArrowUpRight size={14} className="text-neutral-300 group-hover:text-orange-600 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden py-20" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 grid-bg opacity-[0.10]" />
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-500/20 blur-[90px] pointer-events-none" />
        <div className="absolute -right-32 bottom-0 w-80 h-80 rounded-full bg-orange-500/15 blur-[80px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <div className="container-wide relative z-10 text-center">
          <div className="eyebrow mb-5 mx-auto w-fit"
            style={{ background: "rgba(249,115,22,0.12)", borderColor: "rgba(249,115,22,0.30)", color: "#fb923c" }}>
            <span className="eyebrow-dot" />Build sustainably
          </div>
          <h2 className="text-white leading-[1.05] mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            Specify low-carbon<br /><span className="serif-italic text-orange-400">insulation today.</span>
          </h2>
          <p className="text-white/55 max-w-xl mx-auto mb-8">
            Talk to our sustainability team about EPDs, embodied carbon data, and LEED/Estidama documentation for your project.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/contact" className="btn-primary">
              Request EPD &amp; Data <ArrowRight size={16} />
            </Link>
            <Link href="/downloads" className="btn-ghost"
              style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.18)" }}>
              Download Reports
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
