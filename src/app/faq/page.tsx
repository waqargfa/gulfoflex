import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle, Plus } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "FAQ | Gulf-O-Flex® Insulation — Frequently Asked Questions",
  description:
    "Frequently asked questions about Gulf-O-Flex® rubber insulation products, installation, fire ratings, applications, and specifications. Technical answers from our engineering team.",
  alternates: { canonical: "https://gulfoflex.com/faq" },
};

const faqs = [
  {
    category: "Products",
    questions: [
      {
        q: "What is the difference between Gulf-O-Flex® NBR and XLPE insulation?",
        a: "Gulf-O-Flex® NBR (Nitrile Butadiene Rubber) is our premium closed-cell elastomeric insulation, offering superior moisture resistance, fire performance, and flexibility. XLPE (Cross-Linked Polyethylene) is suited to higher-temperature applications (up to 120°C) and provides excellent UV and chemical resistance. NBR is typically preferred for HVAC and refrigeration applications; XLPE for industrial and higher-temperature services.",
      },
      {
        q: "What temperature range does Gulf-O-Flex® insulation operate in?",
        a: "Gulf-O-Flex® NBR operates from -40°C to +105°C continuous service temperature. Our XLPE range extends to +120°C. For high-temperature applications above these ranges, please contact our technical team for our industrial mineral wool and composite systems.",
      },
      {
        q: "Does Gulf-O-Flex® insulation absorb water?",
        a: "No. Gulf-O-Flex® products are closed-cell insulation, meaning each cell is an independent sealed unit. This structure gives the material a water vapour resistance factor (μ) of ≥7,300, making it essentially impermeable to moisture. This is critical for chilled water and below-ambient applications where condensation control is required.",
      },
      {
        q: "What is Aluglass and when should I use it?",
        a: "Aluglass is a reinforced aluminium-glass laminate facing bonded directly to the NBR or XLPE foam core. It is used as an outer cladding layer where the insulation is exposed to UV radiation, mechanical impact, or weather. It provides a clean professional finish for outdoor applications such as rooftop chillers, exposed pipework, and outdoor tanks.",
      },
    ],
  },
  {
    category: "Fire & Compliance",
    questions: [
      {
        q: "Is Gulf-O-Flex® fire rated?",
        a: "Yes. Gulf-O-Flex® products achieve B1 fire rating under DIN 4102 and Class O under BS 476. Selected products also hold FM Approval. All products comply with NFPA 90A/90B smoke and flame spread requirements. Fire test certificates and test reports are available from our technical team.",
      },
      {
        q: "Which international standards does Gulf-O-Flex® comply with?",
        a: "Gulf-O-Flex® products are tested and certified to BS 476, DIN 4102, ASTM E84, EN 13501, IMO SOLAS (marine), ASHRAE 90.1, DIN 1988, BS 5422, and regional standards including UAE GSO and Saudi Standards (SASO). A full list of current certifications is available on our Certifications page.",
      },
      {
        q: "Does Gulf-O-Flex® contain HCFC or HFC blowing agents?",
        a: "No. All Gulf-O-Flex® products use blowing agents with zero Ozone Depletion Potential (ODP = 0). Our latest product generation uses a low-GWP blowing agent, reducing embodied carbon by approximately 40% vs. older formulations. We are fully compliant with the Montreal Protocol and EU F-Gas Regulations.",
      },
    ],
  },
  {
    category: "Installation",
    questions: [
      {
        q: "How do I calculate the correct insulation thickness?",
        a: "Insulation thickness depends on pipe size/diameter, service temperature, ambient conditions (temperature and relative humidity), and the target heat gain/loss. We recommend using our GOF Assist AI platform at gulfoflexassist.com which can perform ASHRAE 90.1 calculations automatically, or contact our technical team for a free calculation service.",
      },
      {
        q: "What adhesive should I use with Gulf-O-Flex® products?",
        a: "We recommend Gulf-O-Flex® contact adhesive (Part No. GOF-ADH-01) specifically formulated for our NBR and XLPE materials. Third-party contact adhesives based on neoprene or polyurethane are generally compatible, but we recommend a compatibility test before large-scale application. Never use solvent-based adhesives on closed-cell foam.",
      },
      {
        q: "Can Gulf-O-Flex® be installed outdoors?",
        a: "Gulf-O-Flex® NBR and XLPE are UV-sensitive and require protection when installed outdoors. We recommend the Gulf-O-Flex® Aluglass or Aluclad facings for all outdoor applications, or aluminium jacketing. Without UV protection, surface degradation may occur within 6–12 months depending on UV exposure level.",
      },
    ],
  },
  {
    category: "Commercial",
    questions: [
      {
        q: "How do I find a local Gulf-O-Flex® distributor?",
        a: "Gulf-O-Flex® products are available through our network of authorized distributors in 90+ countries. Visit our Distributors page to find the nearest authorized dealer, or contact our export team at sales@gulfoflex.com for direct supply options.",
      },
      {
        q: "Can I get product samples for a project specification?",
        a: "Yes. We provide free product samples, technical data sheets, and specification documentation to engineers and consultants. Submit your request through our Contact page or email samples@gulfoflex.com with your project details.",
      },
      {
        q: "What lead times should I plan for?",
        a: "Standard Gulf-O-Flex® products are available ex-stock from our UAE and KSA warehouses. Regional distributors maintain local stock of standard sizes. For large project quantities, we recommend placing orders 4–8 weeks in advance. Custom dimensions and special products may require 2–4 weeks production time.",
      },
    ],
  },
];

export default function FAQPage() {
  const totalQuestions = faqs.reduce((sum, s) => sum + s.questions.length, 0);
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-24" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1698031610524-c35e7ebbba2c?auto=format&fit=crop&w=2400&q=80" focalY="center" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                <span className="text-neutral-300">/</span>
                <span className="text-neutral-700">FAQ</span>
              </nav>
              <div className="eyebrow mb-6"><span className="eyebrow-dot" />Technical FAQ · {totalQuestions} answers</div>
              <h1 className="text-neutral-900 leading-[0.95] mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
                Frequently asked<br />
                <span className="gradient-text">questions</span><span className="serif-italic text-orange-600">.</span>
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                Technical and commercial answers from the Gulf-O-Flex® engineering team. If you don&rsquo;t find what you&rsquo;re looking for, our team is available to help.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/15 to-transparent rounded-[2rem] blur-3xl pointer-events-none" />
              <div className="relative rounded-3xl border bg-white/90 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(234,88,12,0.20)]"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="px-7 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <HelpCircle size={14} className="text-orange-600" />
                    <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">Knowledge base</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(0,0,0,0.06)" }}>
                  {faqs.map((s) => (
                    <div key={s.category} className="bg-white p-6">
                      <div className="text-neutral-900 font-black mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)", letterSpacing: "-0.025em" }}>{s.questions.length}</div>
                      <div className="text-neutral-500 text-[10px] uppercase tracking-[0.18em] font-bold">{s.category}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Sections ── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-wide max-w-5xl">
          <div className="space-y-16">
            {faqs.map((section, sIdx) => (
              <div key={section.category}>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">0{sIdx + 1}</span>
                  <h2 className="text-neutral-900 font-bold"
                    style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.025em" }}>
                    {section.category}
                  </h2>
                  <div className="flex-1 h-px bg-neutral-200" />
                  <span className="text-xs text-neutral-400 font-semibold">{section.questions.length} questions</span>
                </div>
                <div className="space-y-3">
                  {section.questions.map((faq, qIdx) => (
                    <details key={faq.q}
                      className="group relative rounded-2xl border bg-white overflow-hidden transition-all duration-300 hover:border-orange-300/60 hover:shadow-[0_20px_50px_-30px_rgba(234,88,12,0.20)] open:border-orange-300/60 open:shadow-[0_20px_50px_-30px_rgba(234,88,12,0.25)]"
                      style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                      <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                        <div className="flex items-start gap-4 flex-1">
                          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 mt-1 w-8 flex-shrink-0">0{qIdx + 1}</span>
                          <h3 className="text-neutral-900 font-semibold leading-snug group-open:text-orange-600 transition-colors pr-4"
                            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}>
                            {faq.q}
                          </h3>
                        </div>
                        <span className="w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 group-open:bg-orange-500 group-open:border-orange-500 group-open:rotate-45"
                          style={{ borderColor: "rgba(0,0,0,0.10)" }}>
                          <Plus size={14} className="text-neutral-700 group-open:text-white transition-colors" />
                        </span>
                      </summary>
                      <div className="px-6 pb-6 pl-[4.5rem]">
                        <div className="h-px bg-gradient-to-r from-orange-500/30 to-transparent mb-4" />
                        <p className="text-neutral-600 leading-relaxed">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
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
            <span className="eyebrow-dot" />AI-Powered Support
          </div>
          <h2 className="text-white leading-[1.05] mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            Still have questions?<br /><span className="serif-italic text-orange-400">Ask GOF Assist.</span>
          </h2>
          <p className="text-white/55 max-w-xl mx-auto mb-8">
            Our AI engineering assistant can answer technical questions, perform thickness calculations, and generate specification documents — 24/7.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a href="https://gulfoflexassist.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Launch GOF Assist <ArrowRight size={16} />
            </a>
            <Link href="/contact" className="btn-ghost"
              style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.18)" }}>
              Talk to a Human
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
