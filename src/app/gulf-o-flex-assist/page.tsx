import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, Calculator, FileCheck, TrendingUp, Package, Bot, GraduationCap } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Gulf-O-Flex Assist | AI-Powered Insulation Engineering Platform",
  description:
    "Gulf-O-Flex Assist is the world's first AI-powered insulation engineering platform. Calculate insulation thickness, generate compliance reports, and get expert support — free for MEP engineers.",
  alternates: { canonical: "https://gulfoflex.com/gulf-o-flex-assist" },
};

const features = [
  { icon: Calculator, title: "AI Insulation Calculator", desc: "Instantly calculate optimal insulation thickness per ASHRAE 90.1, pipe size, fluid temperature, and ambient conditions. Accurate, code-compliant results in seconds." },
  { icon: FileCheck, title: "Compliance Reports", desc: "Generate project-ready compliance reports for ASHRAE, LEED, and local energy codes. Download PDF reports ready for consultant submission." },
  { icon: TrendingUp, title: "Energy Savings Analysis", desc: "Model energy savings, CO₂ reduction, and ROI projections for insulation investment. Quantify the business case for optimal insulation thickness." },
  { icon: Package, title: "Product Selector", desc: "Intelligent product selection tool that recommends the right Gulf-O-Flex® product for your application based on temperature, application type, and environment." },
  { icon: Bot, title: "Technical Support AI", desc: "AI assistant trained on Gulf-O-Flex® technical data, installation guides, and engineering standards. Expert answers to your questions — 24/7." },
  { icon: GraduationCap, title: "MEP Learning Hub", desc: "Free courses, installation guides, and technical videos covering insulation engineering, MEP design, and energy efficiency for professional development." },
];

export default function GOFAssistPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-24" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1734340216653-fb2cd5aaf9ac?auto=format&fit=crop&w=2400&q=80" focalY="center" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                <span className="text-neutral-300">/</span>
                <span className="text-neutral-700">GOF Assist</span>
              </nav>
              <div className="eyebrow mb-6"><span className="eyebrow-dot" />AI Engineering Platform · Free</div>
              <h1 className="text-neutral-900 leading-[0.95] mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.75rem, 6vw, 5.5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
                Gulf-O-Flex<br />
                <span className="gradient-text">Assist</span><span className="serif-italic text-orange-600">.</span>
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                The world&rsquo;s first AI-powered insulation engineering platform. Free for all MEP engineers, consultants, and contractors.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="https://gulfoflexassist.com" target="_blank" rel="noopener noreferrer"
                  className="btn-primary text-base px-7 py-3.5 shadow-[0_20px_50px_-15px_rgba(249,115,22,0.55)]">
                  Launch GOF Assist Free <ArrowRight size={18} />
                </Link>
                <Link href="/downloads" className="btn-ghost">View Resources</Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/20 to-transparent rounded-[2rem] blur-3xl pointer-events-none" />
              <div className="relative rounded-3xl border bg-white/90 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(234,88,12,0.25)]"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="px-7 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-orange-600" />
                    <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">AI capabilities</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(0,0,0,0.06)" }}>
                  {[
                    { n: "24/7", l: "AI Support" },
                    { n: "6", l: "Tools" },
                    { n: "Free", l: "For engineers" },
                    { n: "<5s", l: "Calc time" },
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

      {/* ── Features ── */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <div className="eyebrow mb-4"><span className="eyebrow-dot" />Platform Capabilities</div>
            <h2 className="text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Everything an MEP engineer<br />needs <span className="serif-italic text-orange-600">in one place.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={f.title}
                className="group relative rounded-3xl border bg-white p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-30px_rgba(234,88,12,0.35)] hover:border-orange-300/60"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-6 right-7 text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-400">0{i + 1} / 06</div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))", border: "1px solid rgba(249,115,22,0.20)" }}>
                  <f.icon size={20} className="text-orange-600" strokeWidth={2.2} />
                </div>
                <h3 className="text-neutral-900 font-bold mb-3"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", letterSpacing: "-0.02em" }}>{f.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{f.desc}</p>
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
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <div className="container-wide relative z-10 text-center">
          <div className="eyebrow mb-5 mx-auto w-fit"
            style={{ background: "rgba(249,115,22,0.12)", borderColor: "rgba(249,115,22,0.30)", color: "#fb923c" }}>
            <span className="eyebrow-dot" />Free forever for engineers
          </div>
          <h2 className="text-white leading-[1.05] mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            Start engineering with<br /><span className="serif-italic text-orange-400">AI today.</span>
          </h2>
          <p className="text-white/55 max-w-xl mx-auto mb-8">
            Join thousands of MEP engineers using Gulf-O-Flex Assist for thickness calculations, energy modeling, and compliance reporting.
          </p>
          <a href="https://gulfoflexassist.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Launch GOF Assist <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
