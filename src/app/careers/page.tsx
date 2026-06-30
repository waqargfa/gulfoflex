import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Users, Star, Sparkles, Heart, Factory, Globe, Leaf } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Careers at Gulf-O-Flex® | Join the UAE's Leading Insulation Manufacturer",
  description:
    "Discover life at Gulf-O-Flex® - the GCC's leading rubber insulation manufacturer. Explore our office culture, state-of-the-art factory, and team environment across UAE and globally.",
  alternates: { canonical: "https://gulfoflex.com/careers" },
};

const perks = [
  { icon: Star, title: "Competitive Package", desc: "Market-leading salary, annual bonus, and performance incentives" },
  { icon: Users, title: "Diverse Team", desc: "Work alongside 500+ colleagues from 30+ nationalities" },
  { icon: Factory, title: "World-Class Facility", desc: "State-of-the-art manufacturing plants with the latest technology" },
  { icon: Globe, title: "Global Exposure", desc: "Work with clients and partners in 90+ countries" },
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
              <div className="eyebrow mb-6"><span className="eyebrow-dot" />Life at Gulf-O-Flex®</div>
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

      {/* ── Our Culture & Environment ── */}
      <section className="py-20 md:py-28 bg-neutral-50 relative">
        <div className="absolute inset-0 grid-bg opacity-[0.10]" />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl mb-12">
            <div className="eyebrow mb-4"><span className="eyebrow-dot" />Our Environment</div>
            <h2 className="text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Where <span className="serif-italic text-orange-600">innovation happens.</span>
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed mt-4">
              From our state-of-the-art manufacturing plants in Ajman to our modern office spaces, Gulf-O-Flex® provides an environment where engineering excellence meets team collaboration.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Factory,
                title: "Advanced Manufacturing",
                desc: "Our flagship Ajman plant features fully automated extrusion lines, in-house R&D labs, and rigorous quality testing - operating 24/7 to meet global demand.",
              },
              {
                icon: Users,
                title: "Collaborative Office Culture",
                desc: "Open-plan offices with cross-functional teams working together - engineers, sales, and operations united by a shared mission to deliver insulation excellence.",
              },
              {
                icon: Leaf,
                title: "Sustainability Focused",
                desc: "Our facilities are designed with sustainability in mind - from energy-efficient production processes to waste-reduction programs and EPD-verified products.",
              },
              {
                icon: Globe,
                title: "Global Team",
                desc: "Over 500 team members from 30+ nationalities working together, bringing diverse perspectives and expertise to solve complex engineering challenges.",
              },
              {
                icon: Heart,
                title: "Employee Wellbeing",
                desc: "We invest in our people with health & safety programs, regular team events, professional development opportunities, and a supportive work-life balance.",
              },
              {
                icon: Star,
                title: "Innovation-Driven",
                desc: "Our in-house laboratory and R&D team continuously develop next-generation products, encouraging creative problem-solving and technical expertise at every level.",
              },
            ].map((item, i) => (
              <div key={item.title}
                className="group relative rounded-3xl border bg-white p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-30px_rgba(234,88,12,0.30)] hover:border-orange-300/60"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-6 right-7 text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-400">0{i + 1}</div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))", border: "1px solid rgba(249,115,22,0.20)" }}>
                  <item.icon size={20} className="text-orange-600" strokeWidth={2.2} />
                </div>
                <h3 className="text-neutral-900 font-bold mb-2" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>{item.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join Us CTA ── */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="container-wide text-center max-w-3xl mx-auto">
          <div className="eyebrow mb-4 justify-center"><span className="eyebrow-dot" />Get In Touch</div>
          <h2 className="text-neutral-900 leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            Interested in joining <span className="serif-italic text-orange-600">our team?</span>
          </h2>
          <p className="text-neutral-600 text-lg leading-relaxed mb-8">
            We&rsquo;re always looking for talented individuals who share our passion for engineering excellence. Send your CV to our HR team and we&rsquo;ll get back to you.
          </p>
          <Link href="mailto:hr@gulfoflex.com" className="btn-primary inline-flex">
            Send Your CV <MapPin size={14} />
          </Link>
        </div>
      </section>

    </>
  );
}
