"use client";

import Link from "next/link";
import { ArrowRight, Building2, TrendingUp, Layers, Globe, Cpu } from "lucide-react";

const milestones = [
  { year: "1993", title: "Founded",        desc: "Established in Ajman, UAE by the Shaikhani Group",                icon: Building2,  tag: "Origins" },
  { year: "2000", title: "GCC Expansion",  desc: "Became leading rubber insulation supplier in the region",        icon: TrendingUp, tag: "Growth"  },
  { year: "2010", title: "Multi-Facility", desc: "Expanded to 5 facilities across UAE, Sri Lanka & Saudi Arabia",   icon: Layers,     tag: "Scale"   },
  { year: "2018", title: "Global Reach",   desc: "Exporting premium insulation to 90+ countries worldwide",         icon: Globe,      tag: "Global"  },
  { year: "2023", title: "Innovation Era", desc: "Launched GOF Assist AI platform for smart MEP engineering",       icon: Cpu,        tag: "Future"  },
];

export default function OurJourney() {
  return (
    <section className="section-padding bg-white relative overflow-hidden" aria-labelledby="journey-heading">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vh] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 60%)" }}
      />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 reveal">
          <h2
            id="journey-heading"
            className="text-neutral-900 mb-5 leading-[1.02]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
            }}
          >
            Three decades of manufacturing{" "}
            <span className="serif-italic text-orange-600">excellence.</span>
          </h2>
          <p className="text-neutral-500 text-lg leading-relaxed">
            From a single facility in Ajman to five plants across three countries — a story of ambition, quality, and relentless innovation.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto reveal">
          {/* Mobile spine */}
          <div className="absolute top-5 bottom-5 left-5 w-px bg-gradient-to-b from-transparent via-orange-500/50 to-transparent pointer-events-none md:hidden" />
          {/* Desktop spine */}
          <div className="absolute top-5 bottom-5 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-orange-500/50 to-transparent pointer-events-none hidden md:block" />

          <div className="space-y-8 md:space-y-14">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              const Icon = m.icon;

              const card = (
                <div className="group relative rounded-2xl border border-neutral-200 bg-white/60 backdrop-blur-sm overflow-hidden p-6 hover:border-orange-500/40 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(249,115,22,0.18)] cursor-default">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div
                    className="absolute -bottom-2 -right-1 font-black select-none pointer-events-none leading-none text-orange-500/[0.07]"
                    style={{ fontFamily: "var(--font-display)", fontSize: "5.5rem" }}
                  >
                    {m.year}
                  </div>
                  <div className="relative">
                    <span className="inline-block text-[9px] font-bold tracking-[0.3em] uppercase text-orange-500 bg-orange-500/10 rounded-full px-3 py-1 mb-4">
                      {m.tag}
                    </span>
                    <h4 className="text-neutral-900 font-bold text-lg mb-2" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                      {m.title}
                    </h4>
                    <p className="text-neutral-500 text-sm leading-relaxed">{m.desc}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-5 h-px bg-orange-500" />
                      <span className="text-orange-600 font-bold text-xs tracking-wider" style={{ fontFamily: "var(--font-display)" }}>
                        {m.year}
                      </span>
                    </div>
                  </div>
                </div>
              );

              return (
                <div key={m.year} className="relative flex items-center">
                  <div className={`hidden md:flex flex-1 justify-end pr-10 ${!isLeft ? "invisible pointer-events-none" : ""}`}>
                    {card}
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:static md:translate-y-0 md:flex-shrink-0">
                    <div className="relative flex items-center justify-center" style={{ width: 40, height: 40 }}>
                      <div
                        className="absolute rounded-full border border-orange-500/20 animate-ping"
                        style={{ width: 64, height: 64, top: -12, left: -12, animationDuration: `${3 + i * 0.4}s`, animationDelay: `${i * 0.18}s` }}
                      />
                      <div
                        className="absolute inset-0 rounded-full border border-orange-500/40 animate-ping"
                        style={{ animationDuration: `${2.2 + i * 0.35}s` }}
                      />
                      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-700 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.65)] z-10">
                        <Icon size={16} className="text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                  <div className={`flex-1 pl-16 md:pl-10 ${isLeft ? "md:invisible md:pointer-events-none" : ""}`}>
                    <div className="md:hidden">{card}</div>
                    {!isLeft && <div className="hidden md:block">{card}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center reveal">
          <Link href="/about" className="btn-ghost">
            Read Our Full Story <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
