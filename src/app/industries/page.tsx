import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Wind, Flame, Anchor, Building, Thermometer, Factory } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Industries Served | Gulf-O-Flex® HVAC, Oil & Gas, Marine, Construction",
  description:
    "Gulf-O-Flex® serves HVAC & MEP, Oil & Gas, Marine, Construction, District Cooling, and Industrial sectors. Premium insulation solutions for the world's most demanding environments.",
  alternates: { canonical: "https://gulfoflex.com/industries" },
};

const industries = [
  {
    slug: "hvac",
    icon: Wind,
    name: "HVAC & MEP",
    tagline: "The thermal insulation backbone of every MEP system",
    desc: "Gulf-O-Flex® NBR is the preferred choice for HVAC, plumbing, and MEP insulation in the Middle East and beyond. Engineered for chilled water pipes, AHU connections, FCUs, and district cooling networks.",
    applications: ["Chilled Water Piping", "AHU & FCU Connections", "Cold Water Plumbing", "Duct Lining & Wrap"],
    projects: "6,500+",
    color: "orange",
  },
  {
    slug: "oil-gas",
    icon: Flame,
    name: "Oil & Gas",
    tagline: "Engineered for the harshest process environments",
    desc: "Process piping insulation for refineries, petrochemical plants, upstream production, and LNG storage. Meeting NORSOK, API, and international offshore standards.",
    applications: ["Process Pipe Insulation", "LNG Storage Systems", "Flare Systems", "Offshore Platforms"],
    projects: "1,800+",
    color: "orange",
  },
  {
    slug: "marine",
    icon: Anchor,
    name: "Marine & Shipbuilding",
    tagline: "IMO FTP Code compliant insulation for sea applications",
    desc: "Marine-grade insulation systems meeting IMO FTP Code requirements for ships, offshore vessels, naval vessels, and port infrastructure. Corrosion and moisture resistant.",
    applications: ["Ship HVAC Systems", "Engine Room Insulation", "Cargo Hold Insulation", "Offshore Vessels"],
    projects: "850+",
    color: "neutral",
  },
  {
    slug: "construction",
    icon: Building,
    name: "Construction",
    tagline: "From residential towers to iconic landmark projects",
    desc: "Comprehensive insulation solutions for commercial, residential, hospitality, and healthcare construction. Compliant with Dubai Green Building Regulations, ADBC, and international green building standards.",
    applications: ["High-Rise Towers", "Hotels & Resorts", "Hospitals & Healthcare", "Data Centers"],
    projects: "12,000+",
    color: "orange",
  },
  {
    slug: "district-cooling",
    icon: Thermometer,
    name: "District Cooling",
    tagline: "Specialized solutions for district cooling networks",
    desc: "Gulf-O-Flex® insulation is specified across the GCC for district cooling distribution networks, chiller plant rooms, and end-user connections — ensuring energy efficiency and condensation control.",
    applications: ["Distribution Pipes", "Chiller Plant Rooms", "End-User Connections", "Storage Tanks"],
    projects: "380+",
    color: "neutral",
  },
  {
    slug: "industrial",
    icon: Factory,
    name: "Industrial Plants",
    tagline: "Engineered insulation for demanding process environments",
    desc: "Industrial thermal and acoustic insulation for manufacturing plants, power generation, food processing, pharmaceutical, and water treatment facilities across the region.",
    applications: ["Process Piping", "Steam Systems", "Cold Storage Plants", "Power Generation"],
    projects: "2,200+",
    color: "neutral",
  },
];

export default function IndustriesPage() {
  const totalProjects = industries.reduce((sum, ind) => sum + parseInt(ind.projects.replace(/[^0-9]/g, ""), 10), 0);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-24" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1511454493857-0a29f2c023c7?auto=format&fit=crop&w=2400&q=80" focalY="center" />

        <div className="container-wide relative z-10">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">Industries</span>
          </nav>

          <div className="max-w-4xl">
            <div className="eyebrow mb-6"><span className="eyebrow-dot" />Industry Expertise · 6 Sectors</div>
            <h1 className="text-neutral-900 leading-[0.95] mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
              {/* Line 1 */}
              <span className="block">
                <span className="word-fade-up" style={{ animationDelay: "80ms" }}>Trusted</span>
              </span>
              {/* Line 2 */}
              <span className="block" style={{ color: "rgba(12,10,9,0.45)" }}>
                <span className="word-fade-up" style={{ animationDelay: "200ms" }}>across&nbsp;</span>
                <span className="word-fade-up" style={{ animationDelay: "290ms" }}>every</span>
              </span>
              {/* Line 3 */}
              <span className="block">
                <span className="word-fade-up gradient-text serif-italic" style={{ animationDelay: "390ms" }}>critical sector.</span>
              </span>
            </h1>
            <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-3xl mb-8">
              From HVAC systems in skyscrapers to cryogenic piping on offshore platforms, Gulf-O-Flex® insulation solutions are proven across the world&rsquo;s most demanding industries.
            </p>
            <div className="inline-flex items-center gap-6 px-5 py-3 rounded-full border bg-white shadow-sm"
              style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-xs font-semibold text-neutral-600">{totalProjects.toLocaleString()}+ projects delivered</span>
              </div>
              <span className="w-px h-4 bg-neutral-200" />
              <span className="text-xs font-semibold text-orange-600">90+ countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries grid ── */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="container-wide relative z-10">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group relative rounded-3xl border bg-white p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-30px_rgba(234,88,12,0.35)] hover:border-orange-300/60"
                style={{ borderColor: "rgba(0,0,0,0.08)" }}
                aria-label={`View ${ind.name} solutions`}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-5 right-5 text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400">
                  0{i + 1}
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))", border: "1px solid rgba(249,115,22,0.20)" }}>
                      <ind.icon size={20} className="text-orange-600" strokeWidth={2.2} />
                    </div>
                  </div>

                  <h2 className="text-neutral-900 font-bold text-xl mb-1.5"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>
                    {ind.name}
                  </h2>
                  <div className="text-orange-600 text-[11px] uppercase tracking-[0.15em] font-bold mb-3">
                    {ind.tagline}
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-5">{ind.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {ind.applications.map((a) => (
                      <span key={a} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                        {a}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    <div>
                      <div className="text-orange-600 font-black text-2xl leading-none"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>
                        {ind.projects}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400 mt-0.5">projects</div>
                    </div>
                    <span className="w-10 h-10 rounded-full border flex items-center justify-center text-neutral-400 group-hover:bg-orange-600 group-hover:border-orange-600 group-hover:text-white transition-all"
                      style={{ borderColor: "rgba(0,0,0,0.10)" }}>
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="relative overflow-hidden py-20" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 grid-bg opacity-[0.10]" />
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-500/20 blur-[90px] pointer-events-none" />
        <div className="absolute -right-32 bottom-0 w-80 h-80 rounded-full bg-orange-500/12 blur-[80px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <div className="container-wide relative z-10 text-center">
          <div className="eyebrow mb-5 mx-auto w-fit"
            style={{ background: "rgba(249,115,22,0.12)", borderColor: "rgba(249,115,22,0.30)", color: "#fb923c" }}>
            <span className="eyebrow-dot" />Project consultation
          </div>
          <h2 className="text-white leading-[1.05] mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            Need a sector <span className="serif-italic text-orange-400">specialist?</span>
          </h2>
          <p className="text-white/55 mb-8 max-w-xl mx-auto">
            Our application engineers know your industry — and the regulations, standards, and project realities that shape it.
          </p>
          <Link href="/contact" className="btn-primary">
            Talk to an engineer <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
