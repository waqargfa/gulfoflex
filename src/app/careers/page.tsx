import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, MapPin, Clock, Users, Star, ChevronRight, Sparkles } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Careers at Gulf-O-Flex® | Join the UAE's Leading Insulation Manufacturer",
  description:
    "Build your career at Gulf-O-Flex® - the GCC's leading rubber insulation manufacturer. Explore engineering, sales, manufacturing, and management roles across UAE, Saudi Arabia, and globally.",
  alternates: { canonical: "https://gulfoflex.com/careers" },
};

const openRoles = [
  {
    title: "Senior Applications Engineer",
    dept: "Technical Sales",
    location: "Dubai, UAE",
    type: "Full-time",
    level: "Senior",
    color: "orange",
    desc: "Provide technical guidance to MEP consultants, contractors and distributors on Gulf-O-Flex® product selection, thermal calculations, and system design. You will be the bridge between our product technology and real-world engineering challenges.",
    requirements: ["B.Eng Mechanical or HVAC", "5+ years MEP/HVAC experience", "ASHRAE / BS 5422 knowledge", "Arabic language a plus"],
  },
  {
    title: "Territory Sales Manager - KSA",
    dept: "Commercial",
    location: "Riyadh, Saudi Arabia",
    type: "Full-time",
    level: "Mid-Senior",
    color: "neutral",
    desc: "Lead sales strategy and key account management across the Kingdom of Saudi Arabia. Build distribution partnerships, win specification on major projects, and grow Gulf-O-Flex® market share in the Kingdom's booming construction and industrial sectors.",
    requirements: ["5+ years construction sales", "Strong KSA market network", "Arabic speaker required", "Track record with large accounts"],
  },
  {
    title: "Production Supervisor",
    dept: "Manufacturing",
    location: "Ajman, UAE",
    type: "Full-time",
    level: "Mid-level",
    color: "orange",
    desc: "Supervise day-to-day production operations at our flagship Ajman manufacturing facility. Coordinate shift teams, monitor output quality against ISO 9001 standards, and drive continuous improvement initiatives.",
    requirements: ["Engineering diploma or degree", "3+ years in manufacturing", "ISO 9001 / Lean experience", "Mandarin or Hindi a plus"],
  },
  {
    title: "Digital Marketing Specialist",
    dept: "Marketing",
    location: "Ajman, UAE (Hybrid)",
    type: "Full-time",
    level: "Mid-level",
    color: "neutral",
    desc: "Drive Gulf-O-Flex®'s digital presence across SEO, SEM, LinkedIn, and technical content marketing. Collaborate with engineering teams to create compelling technical content that resonates with HVAC consultants and procurement professionals.",
    requirements: ["3+ years B2B digital marketing", "SEO & content strategy", "LinkedIn Ads experience", "Technical writing ability"],
  },
  {
    title: "Export & Logistics Coordinator",
    dept: "Operations",
    location: "Ajman, UAE",
    type: "Full-time",
    level: "Junior-Mid",
    color: "neutral",
    desc: "Coordinate international shipments to our network of 90+ country distributors. Manage freight forwarders, export documentation, LC handling, and customer delivery communication.",
    requirements: ["2+ years freight/logistics", "Export documentation knowledge", "ERP system experience", "English + Arabic required"],
  },
  {
    title: "R&D Formulation Chemist",
    dept: "Innovation",
    location: "Ajman, UAE",
    type: "Full-time",
    level: "Senior",
    color: "orange",
    desc: "Lead elastomeric rubber compound development for our next generation of NBR and XLPE insulation products. Work in our in-house laboratory to develop formulations that meet evolving fire, environmental, and performance standards.",
    requirements: ["B.Sc / M.Sc in Chemistry or Materials", "Rubber / polymer compounding", "Experience with fire testing", "Publications a plus"],
  },
];

const perks = [
  { icon: Star, title: "Competitive Package", desc: "Market-leading salary, annual bonus, and performance incentives" },
  { icon: Users, title: "Diverse Team", desc: "Work alongside 500+ colleagues from 30+ nationalities" },
  { icon: Briefcase, title: "Career Growth", desc: "Clear progression paths and internal promotion culture" },
  { icon: MapPin, title: "Global Exposure", desc: "Work with clients and partners in 90+ countries" },
];

export default function CareersPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 md:pt-24 pb-8 md:pb-10" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1568066857798-392a983d3150?auto=format&fit=crop&w=2400&q=80" focalY="35%" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                <span className="text-neutral-300">/</span>
                <span className="text-neutral-700">Careers</span>
              </nav>
              <div className="eyebrow mb-6"><span className="eyebrow-dot" />Join Our Team · {openRoles.length} open roles</div>
              <h1 className="text-neutral-900 leading-[0.95] mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
                Build the future of<br />
                <span className="gradient-text">industrial insulation</span><span className="serif-italic text-orange-600">.</span>
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                Join a pioneering manufacturer at the intersection of engineering, sustainability, and global trade. Gulf-O-Flex® is looking for exceptional people to help shape the industry for the next 30 years.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/15 to-transparent rounded-[2rem] blur-3xl pointer-events-none" />
              <div className="relative rounded-3xl border bg-white/90 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(234,88,12,0.20)]"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="px-7 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-orange-600" />
                    <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">Life at GOF</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(0,0,0,0.06)" }}>
                  {[
                    { n: "500+", l: "Team members" },
                    { n: "30+", l: "Nationalities" },
                    { n: "5", l: "Plants worldwide" },
                    { n: "90+", l: "Markets served" },
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

      {/* ── Perks ── */}
      <section className="py-20 md:py-24 bg-white relative">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <div className="eyebrow mb-4"><span className="eyebrow-dot" />Why Gulf-O-Flex?</div>
            <h2 className="text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              A place to build a <span className="serif-italic text-orange-600">real career.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {perks.map((p, i) => (
              <div key={p.title}
                className="group relative rounded-3xl border bg-white p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-30px_rgba(234,88,12,0.30)] hover:border-orange-300/60"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-6 right-7 text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-400">0{i + 1}</div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))", border: "1px solid rgba(249,115,22,0.20)" }}>
                  <p.icon size={20} className="text-orange-600" strokeWidth={2.2} />
                </div>
                <h3 className="text-neutral-900 font-bold mb-2" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>{p.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section className="py-20 md:py-28 bg-neutral-50 relative">
        <div className="absolute inset-0 grid-bg opacity-[0.10]" />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl mb-12">
            <div className="eyebrow mb-4"><span className="eyebrow-dot" />Open Positions · {openRoles.length}</div>
            <h2 className="text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Current <span className="serif-italic text-orange-600">opportunities.</span>
            </h2>
          </div>
          <div className="space-y-3">
            {openRoles.map((role, i) => (
              <Link key={role.title} href={`mailto:hr@gulfoflex.com?subject=Application: ${role.title}`}
                className="group relative block rounded-2xl border bg-white p-6 lg:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-30px_rgba(234,88,12,0.25)] hover:border-orange-300/60"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold tracking-[0.18em] uppercase border px-2.5 py-1 rounded-full text-orange-700 bg-orange-50 border-orange-200">
                        {role.dept}
                      </span>
                      <span className="text-[10px] font-semibold text-neutral-600 border border-neutral-200 bg-neutral-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <MapPin size={10} className="text-orange-600" />{role.location}
                      </span>
                      <span className="text-[10px] font-semibold text-neutral-600 border border-neutral-200 bg-neutral-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Clock size={10} className="text-orange-600" />{role.type}
                      </span>
                      <span className="text-[10px] font-bold text-neutral-400 tracking-[0.18em] uppercase ml-1">0{i + 1}</span>
                    </div>
                    <h3 className="text-neutral-900 font-bold mb-2 group-hover:text-orange-600 transition-colors"
                      style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)", letterSpacing: "-0.025em" }}>
                      {role.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed max-w-2xl">{role.desc}</p>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-3">
                    <span className="btn-primary whitespace-nowrap">
                      Apply Now <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
