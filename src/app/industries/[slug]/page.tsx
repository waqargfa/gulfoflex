import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Wind, Flame, Anchor, Building, Thermometer, Factory, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

const industries = {
  hvac: {
    icon: Wind,
    name: "HVAC & MEP",
    tagline: "The thermal insulation backbone of every MEP system",
    color: "orange",
    description: [
      "Gulf-O-Flex® NBR is the region's most widely specified thermal insulation for HVAC and MEP applications. Its closed-cell structure provides outstanding vapor barrier performance, preventing condensation on chilled water pipes and cold surfaces in the Gulf's high-humidity environment.",
      "From mega-mall district cooling connections to individual apartment FCU lines, Gulf-O-Flex® delivers consistent performance backed by FM Approval, LPCB certification, and full compliance with ASHRAE 90.1 energy efficiency standards.",
    ],
    products: ["Gulf-O-Flex® NBR Tubes", "Gulf-O-Flex® NBR Sheets", "Aluglass Duct Facing", "GOF Contact Adhesive"],
    requirements: ["ASHRAE 90.1 Energy Compliance", "Condensation Prevention", "Fire Spread Control", "Acoustic Attenuation"],
    keyProjects: ["Dubai Metro Stations", "Burj Khalifa HVAC", "Dubai Mall Chilled Water", "Abu Dhabi Airport"],
    stats: [
      { n: "6,500+", l: "HVAC Projects" },
      { n: "56%", l: "GCC Market Share" },
      { n: "#1", l: "Specified Brand" },
      { n: "30+", l: "Years Experience" },
    ],
  },
  "oil-gas": {
    icon: Flame,
    name: "Oil & Gas",
    tagline: "Process insulation for upstream, midstream and downstream operations",
    color: "red",
    description: [
      "The oil and gas sector demands insulation that performs reliably in extreme temperatures, corrosive environments, and safety-critical applications. Gulf-O-Flex® provides certified insulation solutions for refineries, petrochemical plants, LNG facilities, and offshore platforms.",
      "Our insulation systems meet NORSOK, API, and ISO requirements for process piping and are compatible with fire protection systems, supporting safety-critical applications from cryogenic storage to high-temperature steam systems.",
    ],
    products: ["Gulf-O-Flex® NBR (Process)", "Gulf-O-Flex® Aluclad Jacketing", "Stainless Steel Cladding", "Vapor Seal Systems"],
    requirements: ["NORSOK M-501 Compliance", "Cryogenic to High-Temp Range", "Fire Safety (IMO/NFPA)", "Corrosion Resistance"],
    keyProjects: ["Saudi Aramco Facilities", "ADNOC Refineries", "Qatar LNG Plants", "Kuwait Oil Company"],
    stats: [
      { n: "1,800+", l: "O&G Projects" },
      { n: "-200°C", l: "Min Temperature" },
      { n: "IMO", l: "FTP Certified" },
      { n: "25+", l: "Years O&G Experience" },
    ],
  },
  marine: {
    icon: Anchor,
    name: "Marine & Shipbuilding",
    tagline: "IMO FTP compliant insulation systems for sea applications",
    color: "blue",
    description: [
      "Marine environments present unique challenges: salt air corrosion, constant vibration, high humidity, and strict fire safety regulations governed by the International Maritime Organization (IMO) FTP Code. Gulf-O-Flex® marine-grade insulation is specifically formulated to meet these demands.",
      "From HVAC systems on cruise ships to process piping on offshore production platforms, Gulf-O-Flex® delivers certified performance backed by IMO FTP Code compliance and major class society approvals.",
    ],
    products: ["Gulf-O-Flex® NBR Marine Grade", "Gulf-O-Flex® Aluclad Marine", "Fire Barrier Systems", "Acoustic Panels"],
    requirements: ["IMO FTP Code Compliance", "Class Society Approval", "Salt Spray Resistance", "Vibration Resistance"],
    keyProjects: ["Dubai Dry Docks", "Singapore Container Terminal", "Abu Dhabi Shipbuilding", "Qatar Offshore Vessels"],
    stats: [
      { n: "850+", l: "Marine Projects" },
      { n: "IMO", l: "FTP Approved" },
      { n: "Class", l: "Society Approved" },
      { n: "20+", l: "Years Marine Experience" },
    ],
  },
  construction: {
    icon: Building,
    name: "Construction",
    tagline: "From residential towers to landmark commercial developments",
    color: "yellow",
    description: [
      "Construction projects across the GCC depend on Gulf-O-Flex® for thermal and acoustic insulation of HVAC systems, plumbing, and building services. Our products meet Dubai Green Building Regulations, ADBC, and international green building certification requirements including LEED and BREEAM.",
      "With over 12,000 completed construction projects, Gulf-O-Flex® is the contractor's first choice — backed by comprehensive technical support, regional availability, and a trusted brand recognized by consultants and authorities.",
    ],
    products: ["Gulf-O-Flex® NBR Tubes & Sheets", "Gulf-O-Flex® Sound", "Aluglass Facing", "Installation Accessories"],
    requirements: ["LEED & BREEAM Credits", "Dubai Green Building Regs", "Fire Classification", "Acoustic Compliance"],
    keyProjects: ["Emaar Developments", "Aldar Properties", "Meydan City Projects", "Qatar FIFA Stadiums"],
    stats: [
      { n: "12,000+", l: "Construction Projects" },
      { n: "LEED", l: "Compatible Products" },
      { n: "#1", l: "Builder Preference" },
      { n: "All GCC", l: "Markets Covered" },
    ],
  },
  "district-cooling": {
    icon: Thermometer,
    name: "District Cooling",
    tagline: "High-efficiency insulation for district cooling networks",
    color: "cyan",
    description: [
      "The GCC operates some of the world's largest district cooling networks, with Dubai and Abu Dhabi leading in district cooling adoption. Gulf-O-Flex® is the primary insulation specified for district cooling distribution mains, branch connections, and end-user interfaces.",
      "Our closed-cell NBR insulation's extremely high vapor diffusion resistance factor (μ ≥ 10,000) ensures zero condensation on chilled water pipes carrying temperatures as low as 3°C, even in the region's extreme humidity conditions.",
    ],
    products: ["Gulf-O-Flex® NBR (Large Bore)", "Aluglass Facing Systems", "Pipe Hanger Insulation Kits", "Pre-insulated Systems"],
    requirements: ["Zero Condensation (3°C Pipes)", "ASHRAE 90.1 Compliance", "Long-Term Vapor Barrier", "Fire Safety (NFPA 90A)"],
    keyProjects: ["Empower District Cooling (Dubai)", "Tabreed Network (UAE)", "Qatar Cool (Doha)", "KHIZA (Saudi Arabia)"],
    stats: [
      { n: "380+", l: "DC Projects" },
      { n: "μ≥10k", l: "Vapor Resistance Factor" },
      { n: "3°C", l: "Min Design Temp" },
      { n: "ASHRAE", l: "90.1 Compliant" },
    ],
  },
  industrial: {
    icon: Factory,
    name: "Industrial Plants",
    tagline: "Insulation solutions for process-critical industrial applications",
    color: "purple",
    description: [
      "Industrial manufacturing plants, power generation facilities, food processing plants, pharmaceutical factories, and water treatment works all have demanding insulation requirements. Gulf-O-Flex® provides complete industrial insulation systems engineered for reliability, safety, and regulatory compliance.",
      "Our products are compatible with standard pipe sizes up to DN500 and are available in thicknesses up to 100mm, covering the widest range of industrial applications from cold utilities to high-temperature process systems.",
    ],
    products: ["Gulf-O-Flex® NBR (Industrial)", "Gulf-O-Flex® Aluclad", "High-Temp Composite Systems", "Custom Fabrications"],
    requirements: ["Process Temperature Range", "Chemical Resistance", "Mechanical Protection", "Maintenance Access"],
    keyProjects: ["KIZAD Industrial Zone (UAE)", "Jubail Industrial City (KSA)", "Duqm Special Economic Zone", "Khalifa Port Industrial Zone"],
    stats: [
      { n: "2,200+", l: "Industrial Projects" },
      { n: "DN500", l: "Max Pipe Size" },
      { n: "100mm", l: "Max Thickness" },
      { n: "Chemical", l: "Resistant Grades" },
    ],
  },
};

const industryHeroImages: Record<string, string> = {
  hvac: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=2400&q=80",
  "oil-gas": "https://images.unsplash.com/photo-1518707399486-6d702f84bd07?auto=format&fit=crop&w=2400&q=80",
  marine: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=2400&q=80",
  construction: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=80",
  "district-cooling": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2400&q=80",
  industrial: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=80",
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
  const heroImage =
    industryHeroImages[slug] ??
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=80";

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-24" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
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
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
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

          {/* Reference Projects */}
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
