"use client";

import Link from "next/link";
import { ArrowRight, Cpu, Thermometer, Activity, Wifi, Layers, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "AI Insulation Calculator",
    desc: "Instantly calculate optimal insulation thickness, heat gain/loss, and condensation risk for any pipe size, fluid temperature, and application.",
    tag: "AI-Powered",
  },
  {
    icon: Activity,
    title: "Compliance Reports",
    desc: "Generate instant compliance reports to ASHRAE 90.1, local energy codes, and international standards — ready for specification and approval.",
    tag: "Instant",
  },
  {
    icon: BarChart3,
    title: "Energy Savings Analysis",
    desc: "Model energy savings, CO₂ reduction, and ROI projections for insulation investment over the building lifecycle.",
    tag: "Sustainability",
  },
  {
    icon: Wifi,
    title: "Smart Technical Support",
    desc: "AI-powered technical assistant trained on Gulf-O-Flex® engineering data, providing expert answers 24/7.",
    tag: "24/7",
  },
  {
    icon: Layers,
    title: "Product Selector",
    desc: "Intelligent product selection engine that recommends the right Gulf-O-Flex® product for your specific application requirements.",
    tag: "Smart",
  },
  {
    icon: Thermometer,
    title: "MEP Learning Hub",
    desc: "Free MEP engineering courses, installation guides, technical videos, and professional development resources for engineers.",
    tag: "Free",
  },
];

export default function TechShowcase() {
  return (
    <section className="section-padding bg-white relative overflow-hidden" aria-labelledby="tech-heading">
      {/* Cinematic background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 60%)" }} />
        {/* Tech circuit lines */}
        <svg className="absolute inset-0 w-full h-full opacity-8" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 50 L30 50 L35 40 L65 40 L70 50 L100 50" stroke="rgba(249,115,22,0.3)" strokeWidth="0.3" fill="none" />
          <path d="M50 0 L50 30 L60 35 L60 65 L50 70 L50 100" stroke="rgba(249,115,22,0.2)" strokeWidth="0.3" fill="none" />
        </svg>
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="reveal-left">
            <div className="eyebrow mb-5">
              <span className="eyebrow-dot" />
              Technology &amp; Innovation
            </div>
            <h2
              id="tech-heading"
              className="text-neutral-900 mb-5 leading-[1.02]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 4.5vw, 4.25rem)", fontWeight: 700, letterSpacing: "-0.035em" }}
            >
              Gulf-O-Flex Assist —<br />
              <span className="serif-italic text-orange-600">your smart MEP partner.</span>
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-8">
              The world&rsquo;s first AI-powered insulation engineering platform. Gulf-O-Flex Assist combines artificial intelligence with 30+ years of insulation expertise to give MEP engineers, contractors, and consultants an unfair advantage.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://gulfoflexassist.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary shadow-[0_0_30px_rgba(249,115,22,0.35)]"
              >
                Launch GOF Assist <ArrowRight size={16} />
              </Link>
              <Link href="/technologies" className="btn-ghost">
                Our Technologies
              </Link>
            </div>
          </div>

          {/* Platform preview visual */}
          <div className="reveal relative">
            <div className="relative rounded-3xl bg-neutral-950 border border-neutral-200/10 overflow-hidden p-6 aspect-square max-w-md ml-auto shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
              {/* Dark grid bg */}
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(249,115,22,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              {/* Top orange line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <Cpu size={14} className="text-orange-600" />
                    </div>
                    <span className="text-neutral-200 font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>GOF Assist</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-neutral-500">Live</span>
                  </div>
                </div>

                {/* Mock input */}
                <div className="rounded-xl p-4 border border-white/8 bg-white/5">
                  <div className="text-xs text-neutral-400 mb-1">Pipe: DN100 · Fluid: Chilled Water · 7°C</div>
                  <div className="text-xs text-neutral-400">Location: Dubai, UAE · Ambient: 35°C</div>
                </div>

                {/* Mock output */}
                <div className="rounded-xl p-4 bg-orange-500/15 border border-orange-500/30">
                  <div className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">AI Recommendation</div>
                  <div className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                    Gulf-O-Flex® NBR
                  </div>
                  <div className="text-neutral-300 text-xs mt-1">Thickness: 38mm · λ: 0.034 W/mK</div>
                  <div className="flex items-center gap-4 mt-3">
                    <div>
                      <div className="text-orange-400 font-black text-base" style={{ fontFamily: "var(--font-display)" }}>94%</div>
                      <div className="text-neutral-400 text-[10px]">Heat Loss Prevented</div>
                    </div>
                    <div>
                      <div className="text-green-400 font-black text-base">✓</div>
                      <div className="text-neutral-400 text-[10px]">ASHRAE Compliant</div>
                    </div>
                    <div>
                      <div className="text-green-400 font-black text-base">✓</div>
                      <div className="text-neutral-400 text-[10px]">No Condensation</div>
                    </div>
                  </div>
                </div>

                {/* Chart bars */}
                <div className="rounded-xl p-4 border border-white/8 bg-white/5">
                  <div className="text-xs text-neutral-400 mb-3">Energy Savings Analysis</div>
                  <div className="flex items-end gap-2 h-16">
                    {[40, 65, 80, 92, 88, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-orange-500/80 to-orange-400/40 rounded-sm"
                        style={{ height: `${h}%`, transition: `height ${i * 150 + 500}ms ease` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -left-4 bottom-1/4 glass-card rounded-xl px-4 py-3 border border-neutral-200 shadow-xl">
              <div className="text-orange-600 font-black text-xl" style={{ fontFamily: "var(--font-display)" }}>AI</div>
              <div className="text-neutral-500 text-[10px] uppercase tracking-wide">Powered</div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 stagger-reveal">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass-card rounded-2xl border border-neutral-200 p-7 hover-lift group"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors duration-300">
                  <f.icon size={20} className="text-orange-600" />
                </div>
                <span className="tag text-[9px]">{f.tag}</span>
              </div>
              <h3 className="text-neutral-900 font-bold text-lg mb-2" style={{ fontFamily: "var(--font-syne)" }}>{f.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
