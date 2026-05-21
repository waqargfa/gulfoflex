"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "What is Gulf-O-Flex® NBR insulation made of?",
    a: "Gulf-O-Flex® NBR is manufactured from Nitrile Butadiene Rubber (NBR) using a closed-cell elastomeric foam technology. The closed-cell structure traps air in tightly packed cells, resulting in a flexible, moisture-resistant, and thermally efficient material. It is CFC and HCFC-free with zero Ozone Depletion Potential (ODP).",
    tag: "Product",
  },
  {
    q: "What temperature range does Gulf-O-Flex® NBR handle?",
    a: "Gulf-O-Flex® NBR is rated for operating temperatures from -40°C to +105°C (-40°F to +221°F), making it suitable for both cryogenic and high-temperature applications including chilled water systems, refrigeration pipelines, HVAC ductwork, and hot water services.",
    tag: "Technical",
  },
  {
    q: "Is Gulf-O-Flex® fire rated and compliant with safety standards?",
    a: "Yes. Gulf-O-Flex® products are fire tested and certified to Class O (BS 476 Part 4 & 7), ASTM E84, EN 13501-1, and IMO FTP Code for marine applications. The products are FM Approved and LPCB Certified, meeting the most stringent fire safety requirements globally.",
    tag: "Compliance",
  },
  {
    q: "What is the difference between NBR and XLPE insulation?",
    a: "NBR (Nitrile Butadiene Rubber) offers superior flexibility, excellent moisture resistance, and Class O fire rating — ideal for HVAC, refrigeration, and acoustic applications. XLPE (Cross-Linked Polyethylene) provides higher compressive strength, chemical resistance, and UV stability, better suited for industrial pipe insulation and outdoor applications requiring mechanical protection.",
    tag: "Product",
  },
  {
    q: "Is Gulf-O-Flex® environmentally sustainable?",
    a: "Yes. Gulf-O-Flex® is CFC and HCFC-free with zero Ozone Depletion Potential (0 ODP). Our products contribute to energy efficiency, lower greenhouse gas emissions, and are LEED-compliant. We also hold ISO 14001:2015 environmental management certification and manufacture without harmful blowing agents.",
    tag: "Sustainability",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-neutral-50 relative overflow-hidden" aria-labelledby="faq-heading">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-px tech-divider" />

      <div className="container-wide relative z-10">
        {/* Header — single col, left-aligned */}
        <div className="max-w-xl mb-12 reveal-left">
          <div className="eyebrow mb-5">
            <span className="eyebrow-dot" />
            Frequently Asked Questions
          </div>
          <h2
            id="faq-heading"
            className="text-neutral-900 mb-4 leading-[1.02]"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.035em" }}
          >
            Expert answers to your{" "}
            <span className="serif-italic text-orange-600">insulation questions.</span>
          </h2>
          <p className="text-neutral-500 leading-relaxed">
            Precise, reliable technical clarity from Gulf-O-Flex® engineers —
            structured for MEP engineers, consultants, and project specifiers.
          </p>
        </div>

        {/* Two-column: accordion left, CTA card right */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* FAQ Accordion */}
          <div className="space-y-3 reveal" itemScope itemType="https://schema.org/FAQPage">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  open === i
                    ? "glass-orange border-orange-500/25"
                    : "glass-card border-neutral-200 hover:border-neutral-300"
                }`}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left group"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="tag text-[9px] flex-shrink-0">{faq.tag}</span>
                    <h3
                      className={`font-semibold text-sm leading-snug transition-colors truncate ${
                        open === i ? "text-orange-600" : "text-neutral-800 group-hover:text-neutral-900"
                      }`}
                      itemProp="name"
                    >
                      {faq.q}
                    </h3>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-orange-600 flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                  />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-72" : "max-h-0"}`}>
                  <div
                    className="px-5 pb-5"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div className="w-full h-px bg-orange-500/15 mb-4" />
                    <p className="text-neutral-600 text-sm leading-relaxed" itemProp="text">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: sticky CTA card */}
          <div className="lg:sticky lg:top-28 reveal">
            <div className="glass-card rounded-2xl p-6 border border-neutral-200">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                <span className="text-orange-600 font-black text-sm" style={{ fontFamily: "var(--font-display)" }}>?</span>
              </div>
              <h3 className="text-neutral-900 font-bold text-lg mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                More questions?
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-5">
                Browse our full FAQ center or use Gulf-O-Flex Assist — our AI engineering platform — for instant technical answers.
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/faq" className="btn-primary text-xs py-3">
                  Full FAQ Center <ArrowRight size={13} />
                </Link>
                <Link
                  href="https://gulfoflexassist.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-xs py-3 text-center"
                >
                  Try GOF Assist ✦
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
