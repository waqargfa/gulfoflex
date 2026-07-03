import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import TrainingExplorer from "@/components/training/TrainingExplorer";
import {
  GraduationCap,
  Brush,
  Ruler,
  Droplets,
  Layers,
  CheckCircle2,
  PlayCircle,
  ShieldCheck,
  Wrench,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Installation Training | Gulf-O-Flex® Insulation Video Guides",
  description:
    "Learn how to install Gulf-O-Flex® NBR rubber insulation correctly with our step-by-step video training: surface preparation, measuring and cutting, gluing and shaping, and application.",
  alternates: { canonical: "https://gulfoflex.com/training" },
};

const steps = [
  { icon: Brush,    title: "Surface Preparation",   desc: "Clean, degrease and prime surfaces for a lasting bond." },
  { icon: Ruler,    title: "Measuring & Cutting",   desc: "Precise sizing for a gap-free, waste-free fit." },
  { icon: Droplets, title: "Gluing & Making Shapes",desc: "Correct adhesive technique for elbows, tees and fittings." },
  { icon: Layers,   title: "Application",           desc: "Final fitting, seam sealing and professional finishing." },
];

const benefits = [
  { icon: ShieldCheck, title: "Maximize Performance", desc: "Correct installation preserves the rated thermal conductivity and vapor resistance of the insulation." },
  { icon: CheckCircle2, title: "Avoid Common Errors", desc: "Learn the right techniques to prevent gaps, open seams, and condensation problems." },
  { icon: Wrench,      title: "Professional Finish",  desc: "Achieve a clean, durable result that meets specification on every project." },
];

export default function TrainingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-20 md:pt-24 pb-8 md:pb-10"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}
      >
        <PageHero src="/heroimg/training.jpg" focalY="50%" />
        <div className="noise" />

        <div className="container-wide relative z-10">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">Training</span>
          </nav>

          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-orange-600 mb-6">
                <GraduationCap size={14} /> Gulf-O-Flex® Academy
              </span>
              <h1
                className="text-neutral-900 leading-[0.95] mb-7"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}
              >
                Installation<br />
                <span className="gradient-text">Training</span><br />
                <span className="serif-italic">Made simple.</span>
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                Master the correct way to install Gulf-O-Flex® rubber insulation with our practical, step-by-step video guides, covering everything from surface preparation to the final finish.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#training" className="btn-primary inline-flex items-center gap-2">
                  <PlayCircle size={18} /> Start watching
                </a>
                <Link href="/downloads" className="btn-ghost inline-flex items-center gap-2">
                  <BookOpen size={16} /> Download guides
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-neutral-500">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  5 step-by-step video lessons
                </span>
                <span className="hidden sm:block w-px h-3 bg-neutral-300" />
                <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-orange-500" />Practical, on-site techniques</span>
              </div>
            </div>

            {/* Steps preview panel */}
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />
              <div className="relative rounded-3xl p-7 border bg-white/90 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(234,88,12,0.20)]" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-orange-600 mb-5">
                  <Wrench size={11} /> The 4 core steps
                </div>
                <div className="space-y-3">
                  {steps.map((s, i) => (
                    <div key={s.title} className="flex items-center gap-4 rounded-2xl border border-neutral-200/80 bg-white px-4 py-3.5 hover:bg-orange-50/40 transition-colors">
                      <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-orange-50 border border-orange-100">
                        <s.icon size={17} className="text-orange-600" strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] font-black tracking-[0.2em] uppercase text-orange-700/70">Step {i + 1}</div>
                        <div className="text-sm font-bold text-neutral-900 truncate">{s.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why training matters ── */}
      <section className="border-y bg-white" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <div className="container-wide py-14 md:py-16">
          <div className="grid md:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group rounded-3xl border bg-gradient-to-b from-white to-orange-50/30 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-25px_rgba(234,88,12,0.30)]"
                style={{ borderColor: "rgba(0,0,0,0.07)" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: "linear-gradient(135deg, rgba(249,115,22,0.16), rgba(249,115,22,0.04))",
                    border: "1px solid rgba(249,115,22,0.22)",
                  }}
                >
                  <b.icon size={20} className="text-orange-600" strokeWidth={2.2} />
                </div>
                <h3 className="text-neutral-900 font-bold text-lg mb-2" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                  {b.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video training ── */}
      <div id="training">
        <TrainingExplorer />
      </div>

      {/* ── CTA ── */}
      <section className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)" }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(249,115,22,0.18), transparent 70%)" }} />
        <div className="container-wide relative z-10 text-center">
          <h2
            className="text-white leading-[1.05] max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
          >
            Need on-site or technical <span className="serif-italic text-orange-500">support?</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Our technical team can provide hands-on training, installation guidance, and specification support for your project.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Contact our team <ArrowUpRight size={18} />
            </Link>
            <Link href="/downloads" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors">
              <BookOpen size={16} /> Installation guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
