"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Leaf, Award } from "lucide-react";

const strengths = [
  "56% of GCC rubber insulation supply",
  "5 state-of-the-art manufacturing facilities",
  "ISO 9001 & ISO 14001 certified",
  "0 ODP — CFC & HCFC free products",
  "Full technical support & training programs",
  "Customizable solutions for every application",
];

export default function About() {
  return (
    <section className="section-padding bg-neutral-50 relative overflow-hidden" aria-labelledby="about-heading">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange-600/8 rounded-full blur-[100px]" />
      </div>
      <div className="absolute bottom-0 left-0 w-px h-2/3 bg-gradient-to-b from-transparent via-orange-500/20 to-transparent" />

      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left – visual */}
          <div className="relative reveal-left">
            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 aspect-[4/5] max-w-lg shadow-[0_30px_80px_-30px_rgba(249,115,22,0.25)]">
              {/* Real manufacturing background image */}
              <Image
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=75"
                alt="Gulf-O-Flex manufacturing facility"
                fill
                className="object-cover object-center"
                style={{ opacity: 0.18 }}
                sizes="480px"
              />
              {/* Grid bg */}
              <div className="absolute inset-0 grid-bg opacity-40" />

              {/* GOF emblem watermark */}
              <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                <Image
                  src="/images/logos/gof-emblem.png"
                  alt="Gulf-O-Flex emblem"
                  width={320}
                  height={320}
                  className="object-contain"
                  style={{ opacity: 0.07 }}
                />
              </div>

              {/* Top: branding */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <div className="text-[9px] font-bold tracking-[0.35em] uppercase text-neutral-400">Gulf-O-Flex®</div>
                <span className="tag text-[9px]">Est. 1993</span>
              </div>

              {/* Center: large animated stat */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-center">
                  <div
                    className="stat-number leading-none"
                    style={{ fontSize: "clamp(5.5rem, 14vw, 11rem)" }}
                  >
                    30+
                  </div>
                  <div className="text-neutral-500 font-semibold text-sm mt-3 uppercase tracking-[0.25em]">
                    Years Manufacturing
                  </div>
                  <div className="mx-auto mt-5 w-20 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
                </div>
              </div>

              {/* Bottom: stats overlay */}
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
                {[
                  { n: "56%", l: "GCC Share" },
                  { n: "5", l: "Plants" },
                  { n: "500+", l: "Engineers" },
                ].map((s) => (
                  <div key={s.l} className="glass-card rounded-xl p-3 text-center">
                    <div className="text-orange-600 font-black text-xl" style={{ fontFamily: "var(--font-display)" }}>{s.n}</div>
                    <div className="text-neutral-500 text-[10px] uppercase tracking-wide mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating mini card */}
            <div className="hidden lg:block absolute -right-6 top-1/3 glass-orange rounded-2xl p-5 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              <Leaf size={20} className="text-orange-600 mb-2" />
              <div className="text-neutral-900 font-bold text-sm">Eco-Engineered</div>
              <div className="text-neutral-500 text-xs mt-1">0 ODP · CFC Free</div>
            </div>
          </div>

          {/* Right – content */}
          <div className="reveal">
            <div className="eyebrow mb-6">
              <span className="eyebrow-dot" />
              About Gulf-O-Flex
            </div>
            <h2
              id="about-heading"
              className="text-neutral-900 mb-6 leading-[1.02]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 4vw, 3.75rem)", fontWeight: 700, letterSpacing: "-0.035em" }}
            >
              Pioneer in<br />
              <span className="gradient-text">Elastic Rubber NBR</span><br />
              <span className="serif-italic text-neutral-900">insulation.</span>
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-6">
              Founded in 1993 by the Shaikhani Group, Rubber World Industry (RWI) has grown into the GCC&rsquo;s most trusted rubber insulation manufacturer. With five state-of-the-art facilities across the UAE, Sri Lanka, and Saudi Arabia, we supply premium closed-cell elastomeric insulation to 90+ countries.
            </p>
            <p className="text-neutral-500 leading-relaxed mb-8">
              Gulf-O-Flex® technology delivers unmatched thermal and acoustic performance — saving energy, extending system lifespans, and meeting the most stringent international fire safety and compliance standards.
            </p>

            {/* Strengths */}
            <ul className="space-y-3 mb-10">
              {strengths.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm text-neutral-700">
                  <CheckCircle2 size={16} className="text-orange-500 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="btn-primary">
                Our Story <ArrowRight size={16} />
              </Link>
              <Link href="/certifications" className="btn-ghost">
                <Award size={16} /> View Certifications
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
