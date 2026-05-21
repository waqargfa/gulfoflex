import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import {
  ArrowUpRight,
  Atom,
  Award,
  BadgeCheck,
  CheckCircle2,
  Compass,
  Droplets,
  Factory,
  Flame,
  Gauge,
  Globe,
  Leaf,
  MapPin,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  Thermometer,
  TrendingUp,
  Trophy,
  Users,
  Volume2,
  Zap,
} from "lucide-react";
import TeamSection from "@/components/about/TeamSection";
import AnimatedCounter from "@/components/about/AnimatedCounter";
import ScrollProgress from "@/components/about/ScrollProgress";
import Reveal from "@/components/about/Reveal";

export const metadata: Metadata = {
  title: "About Gulf-O-Flex® | Premium Insulation Manufacturer Since 1993",
  description:
    "Learn about Gulf-O-Flex® by Rubber World Industry — the GCC's leading NBR rubber insulation manufacturer since 1993. Discover our manufacturing facilities, team, and commitment to quality.",
  alternates: { canonical: "https://gulfoflex.com/about" },
};

/* ─────────────────────────────  DATA  ───────────────────────────── */

const heroStats = [
  { n: 30,  suf: "+", l: "Years of expertise" },
  { n: 56,  suf: "%", l: "GCC market share" },
  { n: 90,  suf: "+", l: "Export countries" },
  { n: 4,   suf: "",  l: "Manufacturing plants" },
  { n: 500, suf: "+", l: "Technical team" },
  { n: 10,  suf: "K+",l: "Projects delivered" },
];

const values = [
  { icon: Award,       title: "Uncompromising Quality",   desc: "ISO 9001 certified quality management ensures every product exceeds specifications. No compromise, ever." },
  { icon: TrendingUp,  title: "Continuous Innovation",    desc: "Investing in R&D to develop next-generation insulation solutions that define the future of the industry." },
  { icon: Users,       title: "Customer Partnership",     desc: "We build long-term partnerships with engineers, contractors, and consultants — not just transactions." },
  { icon: Leaf,        title: "Sustainability First",     desc: "Committed to sustainable manufacturing, zero ODP products, and supporting the global net-zero agenda." },
  { icon: Globe,       title: "Global Standards",         desc: "Meeting and exceeding international standards across BS, ASTM, EN, DIN, IMO, NFPA, and ASHRAE." },
  { icon: Factory,     title: "Manufacturing Excellence", desc: "State-of-the-art facilities with advanced QA processes, trained workforce, and modern production lines." },
];

const facilities = [
  { location: "Ajman, UAE",       country: "UAE",      desc: "Flagship manufacturing campus — head office and primary production facility",  capacity: "Primary Campus",    status: "Operational" },
  { location: "Ajman, UAE",       country: "UAE",      desc: "Secondary production and logistics hub within the industrial area",            capacity: "Secondary Hub",     status: "Operational" },
  { location: "Sri Lanka",        country: "Asia",     desc: "Offshore manufacturing facility serving Asian markets",                        capacity: "Asia Pacific",      status: "Operational" },
  { location: "Saudi Arabia",     country: "KSA",      desc: "In-Kingdom manufacturing supporting Vision 2030 localization",                 capacity: "KSA Operations",    status: "Operational" },
];

const milestones = [
  { year: "1993", title: "Founded",            desc: "Rubber World Industry established in Ajman, UAE by the Shaikhani Group." },
  { year: "2002", title: "ISO 9001 Certified", desc: "First Gulf insulation manufacturer to achieve ISO 9001 quality certification." },
  { year: "2007", title: "Class O Approval",   desc: "Achieved BS 476 Part 6 & 7 Class O — opening the door to GCC mega-projects." },
  { year: "2011", title: "FM Approved",        desc: "Earned FM Global approval — unlocking critical insurance-grade specifications." },
  { year: "2015", title: "Sri Lanka Plant",    desc: "Commissioned the Colombo offshore facility to serve the Asia-Pacific region." },
  { year: "2018", title: "Global Reach",       desc: "Crossed 70 export countries with Gulf-O-Flex® branded products." },
  { year: "2021", title: "LPCB & UL Listed",   desc: "Added LPCB and UL listings — completing the Tier-1 fire approval matrix." },
  { year: "2024", title: "KSA Manufacturing",  desc: "Localized production in the Kingdom — supporting Saudi Vision 2030 and IKTVA." },
];

const pillars = [
  { icon: ShieldCheck, title: "Engineered to Spec",   desc: "Every roll, sheet and tube is engineered against BS, ASTM, EN, DIN, IMO, NFPA and ASHRAE standards." },
  { icon: Flame,       title: "Fire-Safe by Design",  desc: "Class O / B-s3,d0 / 25/50 ratings — Gulf-O-Flex® meets the world's strictest fire performance codes." },
  { icon: Gauge,       title: "Lifetime Performance", desc: "Closed-cell NBR maintains thermal conductivity and vapour resistance for the asset's full design life." },
  { icon: Zap,         title: "Energy Saved",         desc: "Every meter we ship cuts HVAC and process energy losses — measured in megawatt-hours, not slogans." },
];

const certs = [
  "ISO 9001", "ISO 14001", "ISO 45001", "FM Approved", "UL Listed",
  "DCL", "DCD", "EPD", "ASTM E84", "BS 476", "IMO MED",
  "EU REACH", "ASHRAE", "ECAS",
];

const regions = [
  { name: "Gulf Cooperation Council", share: 56, countries: 6,  highlight: "Market leader" },
  { name: "Middle East & Africa",     share: 22, countries: 24, highlight: "Project specified" },
  { name: "Asia Pacific",             share: 14, countries: 18, highlight: "Local manufacturing" },
  { name: "Europe & Americas",        share: 8,  countries: 42, highlight: "OEM partnerships" },
];

const proofPoints = [
  { icon: Thermometer, value: "0.0321", unit: "W/m·K",  label: "Thermal conductivity",  detail: "At 35°C mean — ASTM C518" },
  { icon: Flame,       value: "Class O", unit: "",        label: "Fire reaction",         detail: "BS 476 Part 6 & 7 / ASTM E84" },
  { icon: Droplets,    value: ">10,000", unit: "μ",       label: "Vapour resistance",     detail: "Closed-cell, Perm-in ≈ 0.00" },
  { icon: Volume2,     value: "NRC 1.00", unit: "",       label: "Sound absorption",      detail: "50mm Gulf-O-Sound — ASTM C423" },
  { icon: Gauge,       value: "-183 → +115", unit: "°C", label: "Service temperature",  detail: "NBR / XLPE elastomeric range" },
  { icon: Atom,        value: "0",        unit: "ODP",     label: "Ozone depletion",       detail: "REACH & RoHS compliant" },
];

const recognitions = [
  { icon: Trophy,      title: "Dubai Quality Award",       desc: "Recognized for excellence in manufacturing" },
  { icon: BadgeCheck,  title: "Sheikh Khalifa Excellence",  desc: "Industrial excellence finalist" },
  { icon: Award,       title: "Energy Globe Award",         desc: "Climate-positive product nomination" },
  { icon: Sparkles,    title: "ICV Certified — UAE",        desc: "In-Country Value certification (UAE)" },
];

const sustainability = [
  { stat: "0",     label: "Ozone Depletion Potential (ODP)" },
  { stat: "-72%",  label: "HVAC energy loss reduction" },
  { stat: "100%",  label: "Recyclable steel cores & reels" },
  { stat: "REACH", label: "Compliant supply chain" },
];

/* ─────────────────────────────  PAGE  ───────────────────────────── */

export default function AboutPage() {
  return (
    <>
      <ScrollProgress />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}
      >
        <PageHero src="https://images.unsplash.com/photo-1670309178236-d8180b68e2f1?auto=format&fit=crop&w=2400&q=80" focalY="50%" />
        <div className="noise" />

        <div className="container-wide relative z-10">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">About Us</span>
          </nav>

          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">
            <Reveal>
              <div className="eyebrow mb-6"><span className="eyebrow-dot" />Our Story · Since 1993</div>
              <h1
                className="text-neutral-900 leading-[0.95] mb-7"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}
              >
                Pioneer in<br />
                <span className="gradient-text">Elastic Rubber NBR</span><br />
                <span className="serif-italic">Insulation.</span>
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                For over 30 years, Gulf-O-Flex® has been engineering insulation solutions that protect critical infrastructure, save energy, and enable the region&rsquo;s most ambitious projects. Founded in 1993, we have grown from a UAE manufacturer to a globally recognized brand.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact" className="btn-primary">
                  Partner with us <ArrowUpRight size={16} />
                </Link>
                <Link href="/projects" className="btn-ghost">
                  See our projects
                </Link>
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-neutral-500">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Specified by Tier-1 GCC consultants & EPCs
                </span>
                <span className="hidden sm:block w-px h-3 bg-neutral-300" />
                <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500" />ISO · FM · UL · DCD · EPD</span>
                <span className="hidden sm:block w-px h-3 bg-neutral-300" />
                <span className="flex items-center gap-2"><Globe size={12} className="text-orange-600" />Shipping to 90+ countries</span>
              </div>
            </Reveal>

            {/* Right floating stat panel */}
            <Reveal delay={150}>
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />
                <div className="relative rounded-3xl p-7 border bg-white/90 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(234,88,12,0.20)]" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-orange-600">
                      <Sparkles size={11} /> By the numbers
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
                    {heroStats.map((s) => (
                      <div key={s.l} className="bg-white px-4 py-5 group hover:bg-orange-50/60 transition-colors">
                        <div
                          className="text-orange-600 font-black text-2xl md:text-3xl leading-none mb-1.5"
                          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
                        >
                          <AnimatedCounter value={s.n} suffix={s.suf} />
                        </div>
                        <div className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold leading-tight">{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between text-[11px] text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-500" /> ISO 9001 · FM · LPCB · CE
                    </span>
                    <Link href="/certifications" className="font-semibold text-orange-600 hover:text-orange-700">
                      View all →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none">
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-neutral-400">Scroll</span>
          <span className="w-px h-8 bg-gradient-to-b from-orange-500/60 to-transparent" />
        </div>
      </section>

      {/* ── Certifications marquee ── */}
      <section className="relative border-y bg-white" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <div className="container-wide py-6">
          <div className="flex items-center gap-6">
            <span className="hidden md:flex shrink-0 items-center gap-2 text-[10px] font-bold tracking-[0.22em] uppercase text-neutral-500">
              <ShieldCheck size={12} className="text-orange-600" /> Certified · Approved · Compliant
            </span>
            <div
              className="relative flex-1 overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
              }}
            >
              <div className="flex gap-3 whitespace-nowrap py-1 about-marquee">
                {[...certs, ...certs].map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase text-neutral-700 bg-neutral-50 border border-neutral-200/80"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission / Vision / Purpose ── */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-wide relative">
          <Reveal>
            <div className="max-w-3xl mb-14">
              <div className="eyebrow mb-5"><span className="eyebrow-dot" />Purpose · Mission · Vision</div>
              <h2
                className="text-neutral-900 leading-[1.05]"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
              >
                Engineered with intent. <span className="serif-italic text-orange-600">Built to last.</span>
              </h2>
              <p className="mt-4 text-neutral-500 text-lg max-w-2xl leading-relaxed">
                Three statements guide every roll, sheet, and tube that leaves our plants.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Target,   tag: "Purpose", title: "Why we exist",       body: "To shield the world's critical infrastructure from energy loss, noise, fire, and time — using premium NBR rubber engineered in the Gulf." },
              { icon: Compass,  tag: "Mission", title: "What we do daily",   body: "Manufacture certified, high-performance closed-cell elastomeric insulation that engineers can specify with absolute confidence." },
              { icon: Sparkles, tag: "Vision",  title: "Where we're going",  body: "Be the most trusted insulation partner across the Gulf, Asia, and Africa — recognized for craft, compliance, and climate-positive impact." },
            ].map((c, i) => (
              <Reveal key={c.tag} delay={i * 100}>
                <div
                  className="group relative h-full rounded-3xl border bg-gradient-to-b from-white to-orange-50/30 p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-25px_rgba(234,88,12,0.30)]"
                  style={{ borderColor: "rgba(0,0,0,0.07)" }}
                >
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors duration-700 blur-2xl" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, rgba(249,115,22,0.16), rgba(249,115,22,0.04))",
                          border: "1px solid rgba(249,115,22,0.22)",
                        }}
                      >
                        <c.icon size={20} className="text-orange-600" strokeWidth={2.2} />
                      </div>
                      <span className="text-[9px] font-black tracking-[0.25em] uppercase text-orange-700/80">{c.tag}</span>
                    </div>
                    <h3
                      className="text-neutral-900 font-bold text-xl mb-3"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                    >
                      {c.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">{c.body}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who we are + Timeline ── */}
      <section className="relative pb-24" style={{ background: "linear-gradient(180deg, #fff 0%, #fafafa 100%)" }}>
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="eyebrow mb-5"><span className="eyebrow-dot" />Who We Are</div>
                <h2
                  className="text-neutral-900 leading-[1.05] mb-6"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
                >
                  Rubber World<br />Industry <span className="serif-italic text-orange-600">LLC.</span>
                </h2>
                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <p>Rubber World Industry (RWI), trading as Gulf-O-Flex®, was founded in 1993 by the Shaikhani Group in Ajman, UAE. From a single facility, we have grown into one of the world&rsquo;s leading manufacturers of closed-cell elastomeric rubber insulation.</p>
                  <p>Today, with four state-of-the-art manufacturing facilities across the UAE, Sri Lanka, and Saudi Arabia, we supply 56% of the GCC&rsquo;s rubber insulation demand and export to over 90 countries worldwide.</p>
                  <p>Our insulation technology is based on Nitrile Butadiene Rubber (NBR) — a premium closed-cell elastomeric material engineered for thermal and acoustic performance, moisture resistance, fire safety compliance, and long-term durability in the harshest environments.</p>
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  {["NBR", "XLPE", "Sound", "Aluglass", "Aluclad"].map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Founder quote */}
                <figure
                  className="mt-10 rounded-2xl border bg-white p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.15)]"
                  style={{ borderColor: "rgba(0,0,0,0.07)" }}
                >
                  <Quote className="text-orange-500/30 mb-2" size={28} />
                  <blockquote
                    className="text-neutral-800 text-base md:text-lg leading-relaxed"
                    style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                  >
                    &ldquo;We don&rsquo;t make insulation to ship containers — we make it to be specified, installed, and trusted for the lifetime of the asset.&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white font-bold text-xs">
                      SG
                    </div>
                    <div>
                      <div className="text-sm font-bold text-neutral-900">Shaikhani Group</div>
                      <div className="text-xs text-neutral-500">Founders · Rubber World Industry</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            </div>

            {/* Milestones timeline */}
            <div className="relative">
              <Reveal>
                <div className="mb-8">
                  <div className="eyebrow mb-4"><span className="eyebrow-dot" />Milestones</div>
                  <h3
                    className="text-neutral-900"
                    style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.4vw, 2rem)", fontWeight: 800, letterSpacing: "-0.025em" }}
                  >
                    Three decades of <span className="serif-italic text-orange-600">firsts.</span>
                  </h3>
                </div>
              </Reveal>
              <div className="relative">
                <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-orange-500/40 via-orange-500/15 to-transparent" />
                <div className="space-y-7">
                  {milestones.map((m, i) => (
                    <Reveal key={m.year} delay={i * 80}>
                      <div className="relative pl-16 group">
                        <div
                          className="absolute left-0 top-0 w-12 h-12 rounded-2xl border bg-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-orange-400 group-hover:shadow-[0_10px_30px_-8px_rgba(234,88,12,0.35)]"
                          style={{ borderColor: "rgba(0,0,0,0.10)" }}
                        >
                          <span className="text-orange-600 font-black text-xs" style={{ fontFamily: "var(--font-display)" }}>
                            {m.year}
                          </span>
                        </div>
                        <div
                          className="rounded-2xl border bg-white px-5 py-4 transition-all duration-300 group-hover:border-orange-200 group-hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.10)]"
                          style={{ borderColor: "rgba(0,0,0,0.08)" }}
                        >
                          <div
                            className="text-neutral-900 font-bold text-base mb-1"
                            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                          >
                            {m.title}
                          </div>
                          <p className="text-neutral-500 text-sm leading-relaxed">{m.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand pillars / Differentiators ── */}
      <section className="relative section-padding overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 grid-bg opacity-[0.08]" />
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-orange-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

        <div className="container-wide relative z-10">
          <Reveal>
            <div className="max-w-3xl mb-14">
              <div
                className="eyebrow mb-5"
                style={{ background: "rgba(249,115,22,0.12)", borderColor: "rgba(249,115,22,0.30)", color: "#fb923c" }}
              >
                <span className="eyebrow-dot" />Why Gulf-O-Flex®
              </div>
              <h2
                className="text-white leading-[1.05] mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
              >
                Four pillars behind every <span className="serif-italic text-orange-400">specification.</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                When consultants write &ldquo;Gulf-O-Flex® or approved equal&rdquo; in their drawings, this is what they&rsquo;re trusting.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div
                  className="group relative h-full rounded-3xl p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.10), transparent 60%)" }}
                  />
                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{
                        background: "linear-gradient(135deg, rgba(249,115,22,0.22), rgba(249,115,22,0.05))",
                        border: "1px solid rgba(249,115,22,0.30)",
                      }}
                    >
                      <p.icon size={20} className="text-orange-400" strokeWidth={2.2} />
                    </div>
                    <h3
                      className="text-white font-bold text-lg mb-2"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section-padding bg-white relative">
        <div className="container-wide relative z-10">
          <Reveal>
            <div className="text-center mb-14">
              <div className="eyebrow justify-center mb-4 mx-auto w-fit"><span className="eyebrow-dot" />Our Values</div>
              <h2
                className="text-neutral-900 leading-[1.05]"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
              >
                What drives us <span className="serif-italic text-orange-600">forward.</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 60}>
                <div
                  className="group relative h-full rounded-3xl border bg-white p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(234,88,12,0.30)]"
                  style={{ borderColor: "rgba(0,0,0,0.07)" }}
                >
                  <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-orange-500/0 group-hover:bg-orange-500/8 transition-colors duration-500 blur-2xl" />
                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))",
                        border: "1px solid rgba(249,115,22,0.20)",
                      }}
                    >
                      <v.icon size={20} className="text-orange-600" strokeWidth={2.2} />
                    </div>
                    <h3
                      className="text-neutral-900 font-bold text-lg mb-2"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                    >
                      {v.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engineered Numbers — premium technical proof ── */}
      <section className="relative section-padding overflow-hidden bg-white">
        <div className="absolute inset-0 grid-bg opacity-[0.10] pointer-events-none" />
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[420px] h-[420px] bg-orange-500/[0.06] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[420px] h-[420px] bg-orange-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="container-wide relative z-10">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <div className="eyebrow mb-5"><span className="eyebrow-dot" />Engineered Numbers</div>
              <h2
                className="text-neutral-900 leading-[1.05] mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
              >
                Not adjectives. <span className="serif-italic text-orange-600">Measurements.</span>
              </h2>
              <p className="text-neutral-500 text-lg leading-relaxed max-w-2xl">
                Six numbers behind every Gulf-O-Flex® datasheet — tested against ASTM, BS, EN and DIN protocols.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {proofPoints.map((p, i) => (
              <Reveal key={p.label} delay={i * 60}>
                <div
                  className="group relative h-full rounded-2xl border bg-white p-6 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-orange-300/60 hover:shadow-[0_25px_60px_-25px_rgba(234,88,12,0.30)]"
                  style={{ borderColor: "rgba(0,0,0,0.07)" }}
                >
                  <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-orange-500/0 group-hover:bg-orange-500/8 transition-colors duration-500 blur-2xl" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-1.5 mb-2">
                        <span
                          className="text-neutral-900 font-black leading-none tabular-nums tracking-tight"
                          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.04em" }}
                        >
                          {p.value}
                        </span>
                        {p.unit && (
                          <span className="text-orange-600 font-bold text-sm tracking-tight">{p.unit}</span>
                        )}
                      </div>
                      <div className="text-neutral-900 font-bold text-[15px] mb-1" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}>
                        {p.label}
                      </div>
                      <div className="text-neutral-500 text-xs leading-relaxed">{p.detail}</div>
                    </div>
                    <div
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.03))",
                        border: "1px solid rgba(249,115,22,0.22)",
                      }}
                    >
                      <p.icon size={17} className="text-orange-600" strokeWidth={2.2} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="mt-8 flex items-center justify-between flex-wrap gap-4 rounded-2xl border bg-neutral-50/60 px-5 py-3.5" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-500">
                Independent lab-tested · Third-party certified
              </span>
              <Link href="/downloads" className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] uppercase text-orange-600 hover:text-orange-700 transition-colors">
                Download full TDS pack <ArrowUpRight size={13} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Global presence ── */}
      <section
        className="relative section-padding overflow-hidden"
        style={{ background: "linear-gradient(180deg, #fafafa 0%, #fff 100%)" }}
      >
        <div className="absolute inset-0 dotted-bg opacity-[0.35]" />
        <div className="container-wide relative">
          <Reveal>
            <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-end mb-12">
              <div>
                <div className="eyebrow mb-5"><span className="eyebrow-dot" />Global Presence</div>
                <h2
                  className="text-neutral-900 leading-[1.05]"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
                >
                  90+ countries. <span className="serif-italic text-orange-600">One standard.</span>
                </h2>
              </div>
              <p className="text-neutral-500 text-lg leading-relaxed">
                From the GCC&rsquo;s most demanding mega-projects to OEM partnerships in Europe and Asia — Gulf-O-Flex® performs to the same specification, on every continent.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {regions.map((r, i) => (
              <Reveal key={r.name} delay={i * 80}>
                <div
                  className="group relative h-full rounded-3xl border bg-white p-6 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-orange-300/60 hover:shadow-[0_25px_60px_-20px_rgba(234,88,12,0.25)]"
                  style={{ borderColor: "rgba(0,0,0,0.07)" }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <Globe size={18} className="text-orange-600" />
                    <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                      {r.highlight}
                    </span>
                  </div>
                  <h3
                    className="text-neutral-900 font-bold text-base mb-4"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                  >
                    {r.name}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-neutral-400">Region share</span>
                        <span className="text-neutral-900 font-bold text-sm tabular-nums">
                          <AnimatedCounter value={r.share} suffix="%" />
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-1000 ease-out"
                          style={{ width: `${r.share}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-neutral-400">Countries</span>
                      <span className="text-neutral-700 font-bold text-sm tabular-nums">
                        <AnimatedCounter value={r.countries} />
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Facilities ── */}
      <section className="section-padding bg-white relative">
        <div className="container-wide relative z-10">
          <Reveal>
            <div className="text-center mb-12">
              <div className="eyebrow justify-center mb-4 mx-auto w-fit"><span className="eyebrow-dot" />Manufacturing Network</div>
              <h2
                className="text-neutral-900 leading-[1.05] mb-3 whitespace-nowrap"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 2.8vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
              >
                4 world-class <span className="serif-italic text-orange-600">facilities.</span>
              </h2>
              <p className="text-neutral-500 max-w-xl mx-auto">
                Strategically located across three countries — engineered for capacity, redundancy, and proximity to our customers.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.map((f, i) => (
              <Reveal key={i} delay={i * 60}>
                <div
                  className="group relative h-full rounded-2xl border bg-white p-6 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-orange-300/60 hover:shadow-[0_25px_60px_-20px_rgba(234,88,12,0.25)]"
                  style={{ borderColor: "rgba(0,0,0,0.08)" }}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))",
                        border: "1px solid rgba(249,115,22,0.20)",
                      }}
                    >
                      <Factory size={16} className="text-orange-600" />
                    </div>
                    <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                      {f.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] font-semibold uppercase tracking-wider mb-1">
                    <MapPin size={10} /> Location
                  </div>
                  <div
                    className="text-neutral-900 font-bold text-lg mb-1.5"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                  >
                    {f.location}
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-4">{f.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">{f.capacity}</span>
                    <span className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {f.status}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recognition & Awards ── */}
      <section className="relative py-16 bg-white border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <div className="container-wide">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
              <div>
                <div className="eyebrow mb-4"><span className="eyebrow-dot" />Recognition</div>
                <h2
                  className="text-neutral-900 leading-[1.05]"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 2.6vw, 2.25rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
                >
                  Awards & industry <span className="serif-italic text-orange-600">acknowledgements.</span>
                </h2>
              </div>
              <Link href="/certifications" className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] uppercase text-orange-600 hover:text-orange-700 transition-colors">
                All certifications <ArrowUpRight size={13} />
              </Link>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {recognitions.map((r, i) => (
              <Reveal key={r.title} delay={i * 70}>
                <div
                  className="group relative h-full rounded-2xl border bg-gradient-to-br from-white to-orange-50/40 p-5 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-orange-300/60"
                  style={{ borderColor: "rgba(0,0,0,0.07)" }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: "linear-gradient(135deg, rgba(249,115,22,0.16), rgba(249,115,22,0.04))",
                        border: "1px solid rgba(249,115,22,0.22)",
                      }}
                    >
                      <r.icon size={17} className="text-orange-600" strokeWidth={2.2} />
                    </div>
                    <div className="text-neutral-900 font-bold text-sm" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}>
                      {r.title}
                    </div>
                  </div>
                  <p className="text-neutral-500 text-xs leading-relaxed pl-[3.25rem]">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sustainability strip ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #052e16 0%, #064e3b 60%, #065f46 100%)" }}
      >
        <div className="absolute inset-0 grid-bg opacity-[0.08]" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[110px]" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <Reveal>
              <div
                className="eyebrow mb-5"
                style={{ background: "rgba(16,185,129,0.15)", borderColor: "rgba(16,185,129,0.35)", color: "#6ee7b7" }}
              >
                <Leaf size={11} />Sustainability
              </div>
              <h2
                className="text-white leading-[1.05] mb-5"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.2vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
              >
                Insulation is <span className="serif-italic text-emerald-300">climate action</span>.
              </h2>
              <p className="text-white/70 leading-relaxed max-w-xl">
                Every meter of Gulf-O-Flex® specified prevents waste energy from leaving a pipe, a duct, or a chiller. Our products are zero-ODP, REACH-compliant, and engineered for decades of service — the longest carbon payback in the building envelope.
              </p>
              <Link
                href="/sustainability"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold tracking-[0.12em] uppercase text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                Our sustainability report <ArrowUpRight size={14} />
              </Link>
            </Reveal>

            <Reveal delay={120}>
              <div
                className="grid grid-cols-2 gap-px rounded-3xl overflow-hidden border border-white/10"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                {sustainability.map((s) => (
                  <div
                    key={s.label}
                    className="px-5 py-6 transition-colors hover:bg-white/[0.04]"
                    style={{ background: "rgba(6,78,59,0.55)" }}
                  >
                    <div
                      className="text-emerald-300 font-black text-3xl md:text-4xl leading-none mb-2"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
                    >
                      {s.stat}
                    </div>
                    <div className="text-white/65 text-[11px] uppercase tracking-wider font-semibold leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <TeamSection />
    </>
  );
}
