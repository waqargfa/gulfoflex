import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import {
  ArrowUpRight,
  Atom,
  Award,
  BadgeCheck,
  CheckCircle2,
  Compass,
  Crown,
  Droplets,
  Factory,
  Flame,
  Gauge,
  Globe,
  Globe2,
  Leaf,
  MapPin,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
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
    "Learn about Gulf-O-Flex® by Rubber World Industry , the GCC's leading NBR rubber insulation manufacturer since 1993. Discover our manufacturing facilities, team, and commitment to quality.",
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
  { icon: Users,       title: "Customer Partnership",     desc: "We build long-term partnerships with engineers, contractors, and consultants , not just transactions." },
  { icon: Leaf,        title: "Sustainability First",     desc: "Committed to sustainable manufacturing, zero ODP products, and supporting the global net-zero agenda." },
  { icon: Globe,       title: "Global Standards",         desc: "Meeting and exceeding international standards across BS, ASTM, EN, DIN, IMO, NFPA, and ASHRAE." },
  { icon: Factory,     title: "Manufacturing Excellence", desc: "State-of-the-art facilities with advanced QA processes, trained workforce, and modern production lines." },
];

const facilities = [
  { location: "Ajman, UAE",       country: "UAE",      desc: "Flagship manufacturing campus , head office and primary production facility",  capacity: "Primary Campus",    status: "Operational", img: "/images/factory/UAE-1.png",         alt: "Gulf-O-Flex flagship manufacturing facility in Ajman, UAE" },
  { location: "Ajman, UAE",       country: "UAE",      desc: "Secondary production and logistics hub within the industrial area",            capacity: "Secondary Hub",     status: "Operational", img: "/images/factory/ultra.jpeg",        alt: "Gulf-O-Flex secondary production and logistics hub" },
  { location: "Sri Lanka",        country: "Asia",     desc: "Offshore manufacturing facility serving Asian markets",                        capacity: "Asia Pacific",      status: "Operational", img: "/images/factory/Srilanka-1.png",   alt: "RWI Industries manufacturing plant in Sri Lanka" },
  { location: "Saudi Arabia",     country: "KSA",      desc: "In-Kingdom manufacturing supporting Vision 2030 localization",                 capacity: "KSA Operations",    status: "Operational", img: "/images/factory/KSA-1.jpg",        alt: "Gulf-O-Flex in-Kingdom manufacturing facility in Saudi Arabia" },
];

const milestones = [
  { year: "1993", title: "Founded",            desc: "Rubber World Industry established in Ajman, UAE by the Shaikhani Group." },
  { year: "2002", title: "ISO 9001 Certified", desc: "First Gulf insulation manufacturer to achieve ISO 9001 quality certification." },
  { year: "2007", title: "Class O Approval",   desc: "Achieved BS 476 Part 6 & 7 Class O opening the door to GCC mega-projects." },
  { year: "2011", title: "FM Approved",        desc: "Earned FM Global approval unlocking critical insurance-grade specifications." },
  { year: "2015", title: "Sri Lanka Plant",    desc: "Commissioned the Colombo offshore facility to serve the Asia-Pacific region." },
  { year: "2018", title: "Global Reach",       desc: "Crossed 70 export countries with Gulf-O-Flex® branded products." },
  { year: "2021", title: "UL Listed",        desc: "Earned UL listing completing the Tier-1 fire approval matrix." },
  { year: "2024", title: "KSA Manufacturing",  desc: "Localized production in the Kingdom supporting Saudi Vision 2030 and IKTVA." },
  { year: "2025", title: "Gulf-O-Flex Assist", desc: "Launched Gulf-O-Flex Assist an AI-powered specification and technical support platform for consultants and contractors." },
];

const pillars = [
  { icon: ShieldCheck, title: "Engineered to Spec",   desc: "Every roll, sheet and tube is engineered against BS, ASTM, EN, DIN, IMO, NFPA and ASHRAE standards." },
  { icon: Flame,       title: "Fire-Safe by Design",  desc: "Class O / B-s1,d0 / 25/50 ratings Gulf-O-Flex® meets the world's strictest fire performance codes." },
  { icon: Gauge,       title: "Lifetime Performance", desc: "Closed-cell NBR maintains thermal conductivity and vapour resistance for the asset's full design life." },
  { icon: Zap,         title: "Energy Saved",         desc: "Every meter we ship cuts HVAC and process energy losses measured in megawatt-hours, not slogans." },
];

const certs = [
  "ISO 9001", "ISO 14001", "ISO 45001", "FM Approved", "UL Listed",
  "DCL", "DCD", "EPD", "ASTM E84", "BS 476", "IMO MED",
  "EU REACH", "ASHRAE", "ECAS",
];

const certCards = [
  { abbr: "ISO 9001",    label: "Quality Management",           body: "Bureau Veritas certified quality system.",           Icon: BadgeCheck },
  { abbr: "ISO 14001",   label: "Environmental Management",      body: "Verified environmental performance & compliance.",    Icon: Leaf },
  { abbr: "ISO 45001",   label: "Occupational H&S",              body: "Workforce safety at every manufacturing stage.",      Icon: ShieldCheck },
  { abbr: "FM Approved", label: "FM Global Standards",           body: "Insurance-grade fire performance approval.",          Icon: Flame },
  { abbr: "UL Listed",   label: "ASTM E84 / UL 723",             body: "North American fire classification listed product.", Icon: Star },
  { abbr: "DCL",         label: "Dubai Central Lab",             body: "Approved for Dubai Municipality specification.",      Icon: Globe2 },
  { abbr: "DCD",         label: "Dubai Civil Defence",           body: "UAE fire & life-safety code compliance.",            Icon: ShieldCheck },
  { abbr: "EPD",         label: "Environmental Product Decl.",   body: "Independently verified life-cycle data.",            Icon: Sparkles },
];

const recognitions = [
  { Icon: Crown,      title: "One UAE Award",          org: "UAE Excellence Programme",       year: undefined, featured: true  },
  { Icon: Trophy,     title: "Meera Award",            org: "Industry Recognition",           year: undefined, featured: true  },
  { Icon: Award,      title: "MEP Award",              org: "MEP Middle East",               year: "2022",    featured: false },
  { Icon: Award,      title: "MEP Award",              org: "MEP Middle East",               year: "2023",    featured: false },
  { Icon: Globe2,     title: "CBNME Award",            org: "Construction Business News ME", year: undefined, featured: false },
  { Icon: BadgeCheck, title: "UAE Business Award",     org: "UAE Business Excellence",       year: undefined, featured: false },
  { Icon: Zap,        title: "Climate Control Award",  org: "Climate Control Middle East",   year: "2017",    featured: false },
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
        className="relative overflow-hidden pt-20 md:pt-24 pb-8 md:pb-10"
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
                <Link href="/projects" className="btn-ghost">
                  See our projects
                </Link>
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-neutral-500">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  Specified by Tier-1 GCC consultants & EPCs
                </span>
                <span className="hidden sm:block w-px h-3 bg-neutral-300" />
                <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-orange-500" />ISO · FM · UL · DCD · EPD</span>
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
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
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
                      <CheckCircle2 size={12} className="text-orange-500" /> ISO 9001 · FM · UL Listed
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
              { icon: Target,   tag: "Purpose", title: "Why we exist",       body: "To shield the world's critical infrastructure from energy loss, noise, fire, and time using premium NBR rubber engineered in the Gulf." },
              { icon: Compass,  tag: "Mission", title: "What we do daily",   body: "Manufacture certified, high-performance closed-cell elastomeric insulation that engineers can specify with absolute confidence." },
              { icon: Sparkles, tag: "Vision",  title: "Where we're going",  body: "Be the most trusted insulation partner across the Gulf, Asia, and Africa recognized for craft, compliance, and climate-positive impact." },
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

      {/* ── Corporate Video ── */}
      <section className="relative overflow-hidden">
        <div className="relative w-full">
          {/* Overlay content */}
          <div className="absolute inset-0 z-10 flex items-end pointer-events-none">
            <div className="w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 py-12 md:py-20">
              <div className="container-wide">
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-orange-400 mb-3">
                  <Sparkles size={12} /> Our Story
                </span>
                <h2
                  className="text-white leading-[1.05] max-w-2xl"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
                >
                  Engineering excellence <span className="serif-italic text-orange-400">since 1993.</span>
                </h2>
                <p className="mt-3 text-white/70 text-base max-w-xl leading-relaxed">
                  From raw NBR compounds to finished insulation covering the world&rsquo;s most critical infrastructure.
                </p>
              </div>
            </div>
          </div>
          {/* Video */}
          <video
            className="w-full aspect-[21/9] object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="https://gulfoflex.com/CORPORATE%20VIDEO-HD.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ── Who we are + Timeline ── */}
      <section className="relative pb-24" style={{ background: "linear-gradient(180deg, #fff 0%, #fafafa 100%)" }}>
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <h2
                  className="text-neutral-900 leading-[1.05] mb-6"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
                >
                  Rubber World<br />Industry <span className="serif-italic text-orange-600">LLC.</span>
                </h2>
                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <p>Rubber World Industry (RWI), trading as Gulf-O-Flex®, was founded in 1993 by the Shaikhani Group in Ajman, UAE. From a single facility, we have grown into one of the world&rsquo;s leading manufacturers of closed-cell elastomeric rubber insulation.</p>
                  <p>Today, with four state-of-the-art manufacturing facilities across the UAE, Sri Lanka, and Saudi Arabia, we supply 56% of the GCC&rsquo;s rubber insulation demand and export to over 90 countries worldwide.</p>
                  <p>Our insulation technology is based on Nitrile Butadiene Rubber (NBR) a premium closed-cell elastomeric material engineered for thermal and acoustic performance, moisture resistance, fire safety compliance, and long-term durability in the harshest environments.</p>
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
                    &ldquo;We don&rsquo;t make insulation to ship containers , we make it to be specified, installed, and trusted for the lifetime of the asset.&rdquo;
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



      {/* ── Facilities ── */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
        <div className="container-wide relative z-10">
          <Reveal>
            <div className="max-w-2xl mb-12">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-orange-600 mb-4">
                <Factory size={12} /> Global Manufacturing Footprint
              </span>
              <h2
                className="text-neutral-900 leading-[1.05] mb-3"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.2vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
              >
                4 world-class <span className="serif-italic text-orange-600">facilities.</span>
              </h2>
              <p className="text-neutral-500 text-lg leading-relaxed">
                Strategically located across three countries , engineered for capacity, redundancy, and proximity to our customers.
              </p>
            </div>
          </Reveal>

          {/* Featured flagship + supporting grid */}
          <div className="grid lg:grid-cols-12 gap-5">
            {/* Featured UAE flagship */}
            <Reveal className="lg:col-span-7">
              <article className="group relative h-full min-h-[360px] rounded-3xl overflow-hidden border shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                <Image
                  src={facilities[0].img}
                  alt={facilities[0].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase text-white bg-orange-600/90 backdrop-blur px-3 py-1.5 rounded-full">
                    <Star size={11} /> Headquarters
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-white/90 bg-white/15 backdrop-blur px-3 py-1.5 rounded-full border border-white/20">
                    {facilities[0].country}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <div className="flex items-center gap-1.5 text-orange-300 text-[10px] font-bold uppercase tracking-[0.18em] mb-2">
                    <MapPin size={11} /> {facilities[0].location}
                  </div>
                  <h3 className="text-white font-bold text-2xl md:text-3xl mb-2" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                    {facilities[0].capacity}
                  </h3>
                  <p className="text-white/70 max-w-lg leading-relaxed mb-4">{facilities[0].desc}</p>
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {facilities[0].status}
                  </span>
                </div>
              </article>
            </Reveal>

            {/* Supporting facilities */}
            <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-5">
              {facilities.slice(1).map((f, i) => (
                <Reveal key={i} delay={(i + 1) * 80}>
                  <article className="group relative h-full min-h-[168px] rounded-3xl overflow-hidden border shadow-[0_20px_50px_-25px_rgba(0,0,0,0.3)]" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                    <Image
                      src={f.img}
                      alt={f.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 28vw"
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                    <span className="absolute top-4 right-4 inline-flex items-center text-[9px] font-bold tracking-[0.18em] uppercase text-white bg-white/15 backdrop-blur px-2.5 py-1 rounded-full border border-white/20">
                      {f.country}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="flex items-center gap-1.5 text-orange-300 text-[9px] font-bold uppercase tracking-[0.18em] mb-1">
                        <MapPin size={10} /> {f.location}
                      </div>
                      <h3 className="text-white font-bold text-lg leading-tight mb-1" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                        {f.capacity}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-white/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {f.status}
                      </span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Recognition & Awards ── */}
      <section className="relative py-16 bg-white border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <div className="container-wide">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
              <div>
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
              <Reveal key={`${r.title}-${r.year ?? i}`} delay={i * 60}>
                <div
                  className="group relative h-full rounded-2xl border p-5 overflow-hidden transition-all duration-500 hover:-translate-y-1"
                  style={{
                    background: r.featured
                      ? "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)"
                      : "linear-gradient(135deg, #fff 0%, #fff7ed 100%)",
                    borderColor: r.featured ? "rgba(234,88,12,0.40)" : "rgba(0,0,0,0.07)",
                    boxShadow: r.featured ? "0 0 0 0 rgba(234,88,12,0)" : "none",
                  }}
                >
                  {/* Featured top accent */}
                  {r.featured && (
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={{ background: "linear-gradient(90deg, transparent, #ea580c, transparent)" }}
                    />
                  )}
                  {/* Hover accent for non-featured */}
                  {!r.featured && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}

                  <div className="flex items-start gap-3 mb-2">
                    {/* Icon medallion */}
                    <div
                      className="relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-400 group-hover:scale-110"
                      style={{
                        background: r.featured
                          ? "linear-gradient(135deg, rgba(234,88,12,0.22), rgba(234,88,12,0.06))"
                          : "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))",
                        border: r.featured ? "1px solid rgba(234,88,12,0.30)" : "1px solid rgba(249,115,22,0.22)",
                      }}
                    >
                      <r.Icon
                        size={17}
                        strokeWidth={2.2}
                        style={{ color: r.featured ? "#c2410c" : undefined }}
                        className={r.featured ? undefined : "text-orange-600"}
                      />
                      {r.featured && (
                        <div
                          className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                          style={{ background: "#ea580c" }}
                        >
                          <Star size={7} fill="#fff" color="#fff" strokeWidth={0} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Year badge */}
                      {r.year && (
                        <span
                          className="inline-block text-[8px] font-black tracking-[0.22em] uppercase px-2 py-0.5 rounded-full mb-1"
                          style={{
                            background: "rgba(234,88,12,0.08)",
                            border: "1px solid rgba(234,88,12,0.18)",
                            color: "#c2410c",
                          }}
                        >
                          {r.year}
                        </span>
                      )}
                      <div
                        className="text-neutral-900 font-bold text-sm leading-tight"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}
                      >
                        {r.title}
                      </div>
                    </div>
                  </div>

                  <p
                    className="text-[10px] font-semibold uppercase tracking-wider leading-snug pl-[3.25rem]"
                    style={{ color: r.featured ? "rgba(196,65,12,0.75)" : "rgba(0,0,0,0.40)" }}
                  >
                    {r.org}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications grid ── */}
      <section className="relative section-padding bg-white border-t overflow-hidden" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none" />
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-orange-500/[0.05] rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide relative z-10">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div>
                <h2
                  className="text-neutral-900 leading-[1.05]"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 2.6vw, 2.25rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
                >
                  Globally certified.{" "}
                  <span className="serif-italic text-orange-600">Universally trusted.</span>
                </h2>
              </div>
              <Link href="/certifications" className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] uppercase text-orange-600 hover:text-orange-700 transition-colors">
                Full certifications list <ArrowUpRight size={13} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {certCards.map((cert, i) => (
              <Reveal key={cert.abbr} delay={i * 55}>
                <div
                  className="group relative h-full rounded-2xl border bg-white p-5 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-orange-300/60 hover:shadow-[0_20px_50px_-20px_rgba(234,88,12,0.25)]"
                  style={{ borderColor: "rgba(0,0,0,0.07)" }}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-400 group-hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))",
                      border: "1px solid rgba(249,115,22,0.22)",
                    }}
                  >
                    <cert.Icon size={16} className="text-orange-600" strokeWidth={2.2} />
                  </div>
                  <div
                    className="text-neutral-900 font-black text-sm mb-0.5 group-hover:text-orange-700 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                  >
                    {cert.abbr}
                  </div>
                  <div className="text-orange-600 text-[9px] font-bold tracking-[0.18em] uppercase mb-2">{cert.label}</div>
                  <p className="text-neutral-500 text-[11px] leading-relaxed">{cert.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Additional certs pill strip */}
          <Reveal delay={200}>
            <div className="mt-5 flex flex-wrap gap-2">
              {["ASTM E84", "BS 476", "IMO MED", "EU REACH", "ASHRAE", "ECAS"].map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-600 bg-neutral-50 border border-neutral-200/80"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Sustainability ── */}
      <section className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(160deg, #0a0a0a 0%, #1a0e06 45%, #2a1407 100%)" }}>
        {/* Ambient glows */}
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-orange-500/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-400/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none" />

        <div className="container-wide relative z-10">

          {/* , Headline centered , */}
          <Reveal>
            <div className="text-center mb-16">
              <h2
                className="text-white leading-[1.0] mb-5 mx-auto"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4.5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.04em", maxWidth: "18ch" }}
              >
                Insulation is{" "}
                <span className="relative inline-block">
                  <span className="serif-italic text-orange-300">climate action</span>
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                    style={{ background: "linear-gradient(90deg, transparent, #fb923c, transparent)" }}
                  />
                </span>
                .
              </h2>
              <p className="text-white/60 leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
                Every meter of Gulf-O-Flex® specified prevents waste energy from escaping a pipe, duct, or chiller. Zero-ODP, REACH-compliant, engineered for decades of service , the longest carbon payback in the building envelope.
              </p>
              <Link
                href="/sustainability"
                className="mt-8 inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold tracking-[0.10em] uppercase transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.25), rgba(234,88,12,0.15))", border: "1px solid rgba(249,115,22,0.40)", color: "#fdba74" }}
              >
                <Leaf size={13} /> Read our Sustainability Report <ArrowUpRight size={13} />
              </Link>
            </div>
          </Reveal>

          {/* , Stats row , */}
          <Reveal delay={80}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { stat: "0",     unit: "ODP",   label: "Ozone Depletion Potential",     icon: Leaf,       note: "Zero harmful blowing agents" },
                { stat: "−72",   unit: "%",      label: "HVAC Energy Loss Reduction",    icon: Zap,        note: "vs. uninsulated systems" },
                { stat: "100",   unit: "%",      label: "Recyclable Cores & Reels",      icon: TrendingUp, note: "Steel cores, full circularity" },
                { stat: "REACH", unit: "",       label: "Compliant Supply Chain",        icon: ShieldCheck,note: "EU REACH & RoHS certified" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="group relative rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-20px_rgba(249,115,22,0.35)]"
                  style={{
                    background: "linear-gradient(135deg, rgba(42,20,7,0.70) 0%, rgba(26,14,6,0.85) 100%)",
                    border: "1px solid rgba(249,115,22,0.18)",
                  }}
                >
                  {/* top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(90deg, transparent, #fb923c, transparent)" }} />
                  {/* corner glow */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-400/10 rounded-full blur-2xl group-hover:bg-orange-400/20 transition-colors duration-500" />

                  <div className="relative z-10">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.25)" }}
                    >
                      <s.icon size={16} className="text-orange-400" />
                    </div>
                    <div className="flex items-end gap-1 mb-2">
                      <span
                        className="text-orange-300 font-black leading-none"
                        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em" }}
                      >
                        {s.stat}
                      </span>
                      {s.unit && (
                        <span className="text-orange-400/80 font-bold text-xl mb-0.5">{s.unit}</span>
                      )}
                    </div>
                    <div className="text-white font-bold text-sm mb-1 leading-tight">{s.label}</div>
                    <div className="text-white/45 text-[11px] tracking-wide">{s.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* , Bottom commitment strip , */}
          <Reveal delay={160}>
            <div
              className="mt-10 rounded-2xl px-8 py-5 flex flex-wrap items-center justify-between gap-4"
              style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)" }}
            >
              {["ISO 14001 Certified", "Zero ODP , CFC & HCFC Free", "EPD Verified Products", "EU REACH Compliant", "LEED Contribution"].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-[11px] font-semibold text-orange-300/80 uppercase tracking-[0.15em]">
                  <CheckCircle2 size={12} className="text-orange-400 shrink-0" />
                  {badge}
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      {/* Team */}
      <TeamSection />
    </>
  );
}
