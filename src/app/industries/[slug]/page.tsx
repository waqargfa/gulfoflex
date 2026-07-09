import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Building2, Flame, Anchor, Snowflake, Cog, Factory, Server, HeartPulse, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

const industries = {
  hvac: {
    icon: Building2,
    name: "HVAC, MEP & Construction",
    tagline: "Energy-efficient building services",
    color: "orange",
    description: [
      "Gulf-O-Flex® NBR is the region's most widely specified thermal insulation for HVAC and MEP applications. Its closed-cell structure provides outstanding vapor barrier performance, preventing condensation on chilled water pipes and cold surfaces in the Gulf's high-humidity environment.",
      "From mega-mall district cooling connections to individual apartment FCU lines, Gulf-O-Flex® delivers consistent performance backed by FM Approval and full compliance with ASHRAE 90.1 energy efficiency standards.",
    ],
    products: ["Gulf-O-Flex® NBR", "Gulf-O-Flex® XLPE", "Gulf-O-Flex® Sound", "Gulf-O-Flex® Ultra"],
    requirements: ["ASHRAE 90.1 Energy Compliance", "Condensation Prevention", "Fire Spread Control", "Acoustic Attenuation"],
    keyProjects: [],
    stats: [
      { n: "6,500+", l: "HVAC Projects" },
      { n: "56%", l: "GCC Market Share" },
      { n: "#1", l: "Specified Brand" },
      { n: "30+", l: "Years Experience" },
    ],
    heroImage: "/images/industries/hvac.jpg",
  },
  "oil-gas": {
    icon: Flame,
    name: "Oil & Gas Industries",
    tagline: "Extreme-temperature performance",
    color: "orange",
    description: [
      "The oil and gas sector demands insulation that performs reliably in extreme temperatures, corrosive environments, and safety-critical applications. Gulf-O-Flex® provides certified insulation solutions for refineries, petrochemical plants, LNG facilities, and offshore platforms.",
      "Our insulation systems meet API and ISO requirements for process piping and are compatible with fire protection systems, supporting safety-critical applications from cryogenic storage to high-temperature steam systems.",
    ],
    products: ["Gulf-O-Flex® NBR", "Gulf-O-Flex® Aluclad", "Gulf-O-Flex® Ultra"],
    requirements: ["Cryogenic to High-Temp Range", "Fire Safety (IMO/NFPA)", "Corrosion Resistance"],
    keyProjects: [],
    stats: [
      { n: "1,200+", l: "O&G Projects" },
      { n: "-40°C", l: "Min Temperature" },
      { n: "+105°C", l: "Max Temperature" },
      { n: "25+", l: "Years O&G Experience" },
    ],
    heroImage: "/images/industries/oil-gas.jpg",
  },
  marine: {
    icon: Anchor,
    name: "Marine Manufacturing & Offshores",
    tagline: "Salt-spray & humidity resistant",
    color: "orange",
    description: [
      "Marine environments present unique challenges: salt air corrosion, constant vibration, high humidity, and strict fire safety regulations governed by the International Maritime Organization (IMO) FTP Code. Gulf-O-Flex® marine-grade insulation is specifically formulated to meet these demands.",
      "From HVAC systems on cruise ships to process piping on offshore production platforms, Gulf-O-Flex® delivers certified performance backed by IMO FTP Code compliance and major class society approvals.",
    ],
    products: ["Gulf-O-Flex® NBR", "Gulf-O-Flex® Sound", "Gulf-O-Flex® Ultra", "Gulf-O-Flex® Ultraline"],
    requirements: ["IMO FTP Code Compliance", "Class Society Approval", "Salt Spray Resistance", "Vibration Resistance"],
    keyProjects: [],
    stats: [
      { n: "850+", l: "Marine Projects" },
      { n: "IMO", l: "FTP Approved" },
      { n: "99.9%", l: "Humidity Resistance" },
      { n: "20+", l: "Years Marine Experience" },
    ],
    heroImage: "/images/industries/marine.jpg",
  },
  "district-cooling": {
    icon: Snowflake,
    name: "District Cooling Sector",
    tagline: "GCC-scale cooling networks",
    color: "orange",
    description: [
      "The GCC operates some of the world's largest district cooling networks, with Dubai and Abu Dhabi leading in district cooling adoption. Gulf-O-Flex® is the primary insulation specified for district cooling distribution mains, branch connections, and end-user interfaces.",
      "Our closed-cell NBR insulation's extremely high vapor diffusion resistance factor (μ ≥ 7,300) ensures zero condensation on chilled water pipes carrying temperatures as low as 3°C, even in the region's extreme humidity conditions.",
    ],
    products: ["Gulf-O-Flex® NBR", "Gulf-O-Flex® Aluclad", "Gulf-O-Flex® Ultra"],
    requirements: ["Zero Condensation (3°C Pipes)", "ASHRAE 90.1 Compliance", "Long-Term Vapor Barrier", "Fire Safety (NFPA 90A)"],
    keyProjects: [],
    stats: [
      { n: "380+", l: "DC Projects" },
      { n: "μ≥7,300", l: "Vapor Resistance Factor" },
      { n: "35%", l: "Heat Loss Reduction" },
      { n: "ASHRAE", l: "90.1 Compliant" },
    ],
    heroImage: "/images/industries/district-cooling.jpg",
  },
  industrial: {
    icon: Cog,
    name: "Industrial Plants",
    tagline: "Process-grade durability",
    color: "orange",
    description: [
      "Industrial manufacturing plants, power generation facilities, food processing plants, pharmaceutical factories, and water treatment works all have demanding insulation requirements. Gulf-O-Flex® provides complete industrial insulation systems engineered for reliability, safety, and regulatory compliance.",
      "Our products are compatible with standard pipe sizes up to DN500 and are available in thicknesses up to 100mm, covering the widest range of industrial applications from cold utilities to high-temperature process systems.",
    ],
    products: ["Gulf-O-Flex® NBR", "Gulf-O-Flex® XLPE", "Gulf-O-Flex® Aluclad", "Gulf-O-Flex® Ultra"],
    requirements: ["Process Temperature Range", "Chemical Resistance", "Mechanical Protection", "Maintenance Access"],
    keyProjects: [],
    stats: [
      { n: "2,200+", l: "Industrial Projects" },
      { n: "DN500", l: "Max Pipe Size" },
      { n: "20+", l: "Years Service Life" },
      { n: "100mm", l: "Max Thickness" },
    ],
    heroImage: "/images/industries/industrial.jpg",
  },
  oem: {
    icon: Factory,
    name: "Manufacturing & OEM",
    tagline: "Custom-engineered solutions",
    color: "orange",
    description: [
      "Gulf-O-Flex® partners with original equipment manufacturers to develop custom-specification insulation integrated directly into HVAC units, refrigeration equipment, and industrial machinery during production.",
      "Our OEM solutions include custom-cut tubes, sheets, and roll goods manufactured to precise tolerances, with dedicated technical support for material selection, thickness optimization, and compliance documentation across global markets.",
    ],
    products: ["Gulf-O-Flex® NBR", "Gulf-O-Flex® XLPE", "Gulf-O-Flex® Ultra"],
    requirements: ["Custom Specifications", "Volume Manufacturing", "Consistent Quality", "Technical Support"],
    keyProjects: [],
    stats: [
      { n: "120+", l: "OEM Clients" },
      { n: "Custom", l: "Fabrication Available" },
      { n: "ISO 9001", l: "Certified Production" },
      { n: "Global", l: "Supply Chain" },
    ],
    heroImage: "/images/industries/oem.jpg",
  },
  "data-center": {
    icon: Server,
    name: "Data Centers",
    tagline: "Mission-critical cooling",
    color: "orange",
    description: [
      "Data center cooling infrastructure demands insulation that delivers zero condensation, precise temperature control, and 24/7 reliability. Gulf-O-Flex® is specified across hyperscale, colocation, and enterprise data centers for chilled water piping, CRAH/CRAC units, and liquid cooling systems.",
      "Our closed-cell NBR insulation prevents moisture ingress on sub-ambient chilled water loops, protecting critical IT infrastructure from water damage while ensuring energy-efficient cooling performance in high-density server environments.",
    ],
    products: ["Gulf-O-Flex® NBR", "Gulf-O-Flex® Ultra", "Gulf-O-Flex® Aluclad"],
    requirements: ["Zero Condensation Risk", "24/7 Uptime Support", "Energy Efficiency", "Fire Safety Compliance"],
    keyProjects: [],
    stats: [
      { n: "100+", l: "DC Projects" },
      { n: "24/7", l: "Uptime Support" },
      { n: "Zero", l: "Condensation Risk" },
      { n: "Tier III+", l: "Facility Grade" },
    ],
    heroImage: "/images/industries/data-center.jpg",
  },
  "healthcare-hospitality": {
    icon: HeartPulse,
    name: "Healthcare & Hospitality",
    tagline: "Hygienic, quiet & efficient",
    color: "orange",
    description: [
      "Hospitals, laboratories, pharmaceutical facilities, hotels, resorts, and leisure complexes require insulation that meets stringent hygiene standards while delivering superior acoustic and thermal performance. Gulf-O-Flex® anti-microbial insulation prevents mold and mildew growth, ensuring safe indoor environments.",
      "Our acoustic insulation solutions reduce mechanical noise transmission to patient rooms and guest suites, while our thermal products maintain precise climate control for operating theatres, clean rooms, and temperature-sensitive storage areas.",
    ],
    products: ["Gulf-O-Flex® NBR", "Gulf-O-Flex® Ultra", "Gulf-O-Flex® Sound", "Gulf-O-Flex® XLPE"],
    requirements: ["Hygiene & Anti-microbial", "Acoustic Performance", "Fire Classification", "Energy Efficiency"],
    keyProjects: [],
    stats: [
      { n: "1,800+", l: "Projects Delivered" },
      { n: "25dB", l: "Noise Reduction" },
      { n: "Anti-microbial", l: "Certified" },
      { n: "Class O", l: "Fire Rated" },
    ],
    heroImage: "/images/industries/healthcare-hospitality.jpg",
  },
};

type Params = { slug: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries[slug as keyof typeof industries];
  if (!industry) return {};
  return {
    title: `${industry.name} Insulation Solutions | Gulf-O-Flex®`,
    description: industry.description[0].slice(0, 160),
    alternates: { canonical: `https://gulfoflex.com/industries/${slug}` },
  };
}

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export default async function IndustryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const industry = industries[slug as keyof typeof industries];
  if (!industry) notFound();

  const Icon = industry.icon;
  const heroImage = industry.heroImage;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 md:pt-24 pb-8 md:pb-10" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src={heroImage} focalY="35%" />
        <div className="container-wide relative z-10">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span className="text-neutral-300">/</span>
            <Link href="/industries" className="hover:text-orange-600 transition-colors">Industries</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">{industry.name}</span>
          </nav>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))", border: "1px solid rgba(249,115,22,0.20)" }}>
                  <Icon size={20} className="text-orange-600" strokeWidth={2.2} />
                </div>
                <div className="eyebrow"><span className="eyebrow-dot" />Industry Solutions</div>
              </div>
              <h1 className="text-neutral-900 leading-[0.95] mb-5"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
                {industry.name}<span className="serif-italic text-orange-600">.</span>
              </h1>
              <p className="text-orange-600 font-semibold text-lg md:text-xl mb-5" style={{ fontFamily: "var(--font-display)" }}>
                {industry.tagline}
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8 max-w-xl">{industry.description[0]}</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Get Solutions <ArrowRight size={16} />
                </Link>
                <Link href="/products" className="btn-ghost">
                  View Products
                </Link>
              </div>
            </div>

            {/* Stats panel */}
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/15 to-transparent rounded-[2rem] blur-3xl pointer-events-none" />
              <div className="relative rounded-3xl border bg-white/90 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(234,88,12,0.20)]"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="px-7 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">By the numbers</div>
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(0,0,0,0.06)" }}>
                  {industry.stats.map((s) => (
                    <div key={s.l} className="bg-white p-6">
                      <div className="text-neutral-900 font-black mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)", letterSpacing: "-0.025em" }}>
                        {s.n}
                      </div>
                      <div className="text-neutral-500 text-[10px] uppercase tracking-[0.18em] font-bold">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Detail ── */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="container-wide space-y-16">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16">
            <div>
              <div className="eyebrow mb-4"><span className="eyebrow-dot" />Our Approach</div>
              <h2 className="text-neutral-900 leading-[1.05] mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
                Engineered for <span className="serif-italic text-orange-600">{industry.name.toLowerCase()}</span>
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                {industry.description.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="space-y-8">
              <div className="rounded-2xl border bg-gradient-to-br from-white to-orange-50/40 p-7" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600 mb-4">Key Requirements</div>
                <ul className="space-y-3">
                  {industry.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-neutral-800 text-sm">
                      <CheckCircle2 size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border bg-neutral-50 p-7" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-500 mb-4">Recommended Products</div>
                <ul className="space-y-3">
                  {industry.products.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-neutral-800 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {industry.keyProjects.length > 0 && (
            <div>
              <div className="eyebrow mb-4"><span className="eyebrow-dot" />Reference Projects · {industry.keyProjects.length}</div>
              <h2 className="text-neutral-900 leading-[1.05] mb-8"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
                  Proven on the world&rsquo;s most <span className="serif-italic text-orange-600">demanding</span> jobs.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {industry.keyProjects.map((p, i) => (
                  <div key={p} className="group rounded-2xl border bg-white p-5 transition-all duration-300 hover:border-orange-300/60 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-20px_rgba(234,88,12,0.25)]"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600 mb-2">Project · 0{i + 1}</div>
                    <div className="text-neutral-900 text-sm font-semibold leading-snug">{p}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden py-20" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 grid-bg opacity-[0.10]" />
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-500/20 blur-[90px] pointer-events-none" />
        <div className="absolute -right-32 bottom-0 w-80 h-80 rounded-full bg-orange-500/12 blur-[80px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <div className="container-wide relative z-10 text-center">
          <div className="eyebrow mb-5 mx-auto w-fit"
            style={{ background: "rgba(249,115,22,0.12)", borderColor: "rgba(249,115,22,0.30)", color: "#fb923c" }}>
            <span className="eyebrow-dot" />Technical Support
          </div>
          <h2 className="text-white leading-[1.05] mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            Specify Gulf-O-Flex® for your<br /><span className="serif-italic text-orange-400">{industry.name.toLowerCase()}</span> project.
          </h2>
          <p className="text-white/55 max-w-xl mx-auto mb-8">
            Our technical team has deep expertise in {industry.name.toLowerCase()} insulation and can provide product recommendations, calculations, and compliance documentation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              Contact Technical Team <ArrowRight size={16} />
            </Link>
            <Link href="https://gulfoflexassist.com" target="_blank" rel="noopener noreferrer" className="btn-ghost inline-flex items-center gap-2"
              style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.18)" }}>
              Use GOF Assist AI <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
