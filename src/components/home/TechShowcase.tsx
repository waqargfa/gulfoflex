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

          {/* Platform preview visual — premium light app UI */}
          <div className="reveal relative">
            {/* App window chrome */}
            <div className="relative rounded-3xl bg-white border border-neutral-200 overflow-hidden max-w-md ml-auto shadow-[0_32px_80px_-16px_rgba(10,10,10,0.14),0_0_0_1px_rgba(10,10,10,0.04)]">
              {/* Window title bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 bg-neutral-50/80">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-neutral-200" />
                    <span className="w-3 h-3 rounded-full bg-neutral-200" />
                    <span className="w-3 h-3 rounded-full bg-orange-400" />
                  </div>
                  <div className="flex items-center gap-1.5 ml-2">
                    <div className="w-5 h-5 rounded-md bg-orange-500/15 flex items-center justify-center">
                      <Cpu size={11} className="text-orange-600" />
                    </div>
                    <span className="text-neutral-700 font-bold text-xs" style={{ fontFamily: "var(--font-display)" }}>GOF Assist</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[10px] text-neutral-400 font-medium">Live</span>
                </div>
              </div>
              {/* Orange accent line below title bar */}
              <div className="h-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-transparent" />

              <div className="p-5 space-y-3">
                {/* Input card */}
                <div className="rounded-xl p-4 border border-neutral-100 bg-neutral-50">
                  <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400 mb-2">Project Parameters</div>
                  <div className="text-xs text-neutral-600 mb-1">Pipe: <span className="text-neutral-900 font-semibold">DN100</span> · Fluid: <span className="text-neutral-900 font-semibold">Chilled Water · 7°C</span></div>
                  <div className="text-xs text-neutral-600">Location: <span className="text-neutral-900 font-semibold">Dubai, UAE</span> · Ambient: <span className="text-neutral-900 font-semibold">35°C</span></div>
                </div>

                {/* AI output card */}
                <div className="rounded-xl p-4 bg-gradient-to-br from-orange-500/10 to-orange-400/5 border border-orange-500/20">
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <div className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">AI Recommendation</div>
                  </div>
                  <div className="text-neutral-900 font-black text-base mb-1" style={{ fontFamily: "var(--font-display)" }}>
                    Gulf-O-Flex® NBR
                  </div>
                  <div className="text-neutral-500 text-xs mb-3">Thickness: 38mm · λ: 0.034 W/mK</div>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-orange-600 font-black text-sm" style={{ fontFamily: "var(--font-display)" }}>94%</div>
                      <div className="text-neutral-400 text-[10px]">Heat Loss Prevented</div>
                    </div>
                    <div>
                      <div className="text-orange-600 font-black text-sm">✓</div>
                      <div className="text-neutral-400 text-[10px]">ASHRAE Compliant</div>
                    </div>
                    <div>
                      <div className="text-orange-600 font-black text-sm">✓</div>
                      <div className="text-neutral-400 text-[10px]">No Condensation</div>
                    </div>
                  </div>
                </div>

                {/* Chart bars */}
                <div className="rounded-xl p-4 border border-neutral-100 bg-neutral-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">Energy Savings Analysis</div>
                    <div className="text-[10px] text-orange-600 font-bold">+38% avg</div>
                  </div>
                  <div className="flex items-end gap-2 h-14">
                    {[40, 65, 80, 92, 88, 95].map((h, idx) => (
                      <div key={idx} className="flex-1 flex flex-col justify-end gap-0.5">
                        <div
                          className="w-full rounded-sm bg-gradient-to-t from-orange-500 to-orange-300/70"
                          style={{ height: `${h}%`, transition: `height ${idx * 150 + 500}ms ease` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5">
                    {["Jan","Feb","Mar","Apr","May","Jun"].map(m => (
                      <span key={m} className="text-[8px] text-neutral-300 flex-1 text-center">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -left-4 bottom-1/4 bg-white rounded-xl px-4 py-3 border border-neutral-200 shadow-[0_8px_32px_rgba(10,10,10,0.10)]">
              <div className="text-orange-600 font-black text-xl" style={{ fontFamily: "var(--font-display)" }}>AI</div>
              <div className="text-neutral-400 text-[10px] uppercase tracking-wide">Powered</div>
            </div>
            {/* Second floating badge — top right */}
            <div className="absolute -right-3 top-1/4 bg-white rounded-xl px-3 py-2.5 border border-neutral-200 shadow-[0_8px_32px_rgba(10,10,10,0.10)] flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Thermometer size={12} className="text-orange-600" />
              </div>
              <div>
                <div className="text-neutral-900 font-bold text-xs">−40°C to +105°C</div>
                <div className="text-neutral-400 text-[9px]">Operating Range</div>
              </div>
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
