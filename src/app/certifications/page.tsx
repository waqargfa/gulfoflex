import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  FlaskConical,
  ClipboardCheck,
  BadgeCheck,
  RefreshCw,
  Globe2,
  Building2,
  ArrowUpRight,
  Download,
  CheckCircle2,
  Flame,
  Leaf,
  Award,
} from "lucide-react";
import CertificationsGrid from "@/components/certifications/CertificationsGrid";
import { DownloadGateProvider } from "@/components/downloads/DownloadGate";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Certifications & Compliance | Gulf-O-Flex® ISO 9001, FM Approved, UL Listed",
  description:
    "Gulf-O-Flex® holds ISO 9001, ISO 14001, FM Approved, UL Listed, TUV Singapore, Singapore Green Building, CE & REACH, and Saudi Made certifications. Our products meet BS 476, ASTM E84, EN 13501-1, NFPA, ASHRAE, and IMO standards.",
  alternates: { canonical: "https://gulfoflex.com/certifications" },
};

const certifications = [
  {
    name: "ISO 9001:2015",
    authority: "Bureau Veritas",
    category: "Quality Management",
    color: "orange",
    desc: "International standard for Quality Management Systems. Certifies that our manufacturing, quality assurance, and customer service processes meet the highest global standards.",
    scope: "Manufacture of closed-cell elastomeric insulation products",
    pdfUrl: "/images/certificates/Certificate-ISO-9001.pdf",
  },
  {
    name: "ISO 14001:2015",
    authority: "Bureau Veritas",
    category: "Environmental",
    color: "orange",
    desc: "Environmental Management System certification. Demonstrates our commitment to reducing environmental impact, managing waste, and sustainable manufacturing practices.",
    scope: "Environmental management of manufacturing operations",
    pdfUrl: "/images/certificates/Certificate-ISO-14001_2015.pdf",
  },
  {
    name: "ISO 45001:2018",
    authority: "Bureau Veritas",
    category: "Occupational H&S",
    color: "neutral",
    desc: "Occupational Health and Safety Management System certification. Demonstrates our commitment to a safe and healthy workplace across all manufacturing operations.",
    scope: "Health & safety management of manufacturing operations",
    pdfUrl: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-ISO-45001-2018.pdf",
  },
  {
    name: "FM Approved",
    authority: "FM Global",
    category: "Fire Safety",
    color: "orange",
    desc: "FM Approved certification , one of the world's most recognized and demanding fire safety approvals. Covers thermal, fire, and smoke performance to FM 4924 standards.",
    scope: "NBR closed-cell elastomeric insulation products",
    pdfUrl: "/images/certificates/Certificate-FM-4924.pdf",
  },
  {
    name: "UL Listed",
    authority: "Underwriters Laboratories",
    category: "Fire Safety",
    color: "orange",
    desc: "UL Listed for surface burning characteristics to ASTM E84 / UL 723. Verifies flame spread and smoke developed indices for North American specification.",
    scope: "Elastomeric insulation , ASTM E84 / UL 723",
    pdfUrl: "/images/certificates/Certificate-UL.pdf",
  },
  {
    name: "DCL",
    authority: "Dubai Central Laboratory",
    category: "UAE Compliance",
    color: "orange",
    desc: "Dubai Central Laboratory product certification. Mandatory product listing for materials specified on projects within the Emirate of Dubai, verifying conformity to UAE technical regulations.",
    scope: "Insulation products , Dubai Municipality requirements",
    pdfUrl: "/images/certificates/Certificate-DCL-Al-Safat-Dubai-Green-Building (1).pdf",
  },
  {
    name: "DCD",
    authority: "Dubai Civil Defence",
    category: "UAE Fire Code",
    color: "neutral",
    desc: "Dubai Civil Defence approval for fire-rated insulation. Required listing under the UAE Fire & Life Safety Code of Practice for materials installed in buildings across Dubai.",
    scope: "Fire-rated insulation , UAE Fire & Life Safety Code",
    pdfUrl: "/images/certificates/Certificate-DCD.pdf",
  },
  {
    name: "EPD",
    authority: "EPD International / IBU",
    category: "Sustainability",
    color: "orange",
    desc: "Environmental Product Declaration verified to ISO 14025 / EN 15804. Transparent, third-party Life-Cycle Assessment data for LEED, BREEAM, and Estidama credits.",
    scope: "Life-cycle environmental performance disclosure",
    pdfUrl: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/EPD-Catalogue.pdf",
  },
  {
    name: "TUV Singapore",
    authority: "TÜV SÜD",
    category: "International Certification",
    color: "orange",
    desc: "TÜV SÜD Singapore certification , one of the world's most respected testing, inspection, and certification marks. Verifies product safety, quality, and compliance to international standards.",
    scope: "Elastomeric insulation products , safety and quality compliance",
    pdfUrl: "/images/certificates/Certificate-ISO-9001.pdf",
  },
  {
    name: "Singapore Green Building",
    authority: "Singapore Green Building Council",
    category: "Sustainability",
    color: "orange",
    desc: "Singapore Green Building Product certification. Recognizes products that meet the environmental and sustainability criteria set by the Singapore Green Building Council (SGBC) for green building projects.",
    scope: "Green building , environmental and sustainability standards",
    pdfUrl: "/images/certificates/SINGAPORE-GREEN-BUILDING-CERTIFICATE.pdf",
  },
  {
    name: "CE & Reach Mark",
    authority: "European Union",
    category: "EU Compliance",
    color: "neutral",
    desc: "CE marking and REACH compliance for products sold in the European Economic Area. CE verifies conformity to EU health, safety, and environmental protection standards. REACH ensures safe chemical substances throughout manufacturing.",
    scope: "EU market access , CE marking and REACH chemical regulation compliance",
    pdfUrl: "/images/certificates/REACH-DIRECTIVE-CERTIFICATE.pdf",
  },
  {
    name: "Saudi Made",
    authority: "Saudi Authority for Industrial Cities & Technology Zones (MODON)",
    category: "Saudi Arabia Compliance",
    color: "orange",
    desc: "Saudi Made certification , a national mark awarded to products manufactured in Saudi Arabia, promoting local industry and verifying that products meet Saudi national quality and manufacturing standards.",
    scope: "Local manufacturing and quality standards , Kingdom of Saudi Arabia",
    pdfUrl: "/images/certificates/Certificate-ISO-9001.pdf",
  },
];

const standards = [
  { code: "FM 4924", name: "Fire Protection Standard for Elastomeric Insulation", region: "USA" },
  { code: "ASTM E84 / UL 723", name: "Surface Burning Characteristics", region: "USA" },
  { code: "ISO 14025", name: "Environmental Product Declarations (Type III)", region: "International" },
  { code: "EN 15804", name: "Sustainability of Construction Works , EPD", region: "Europe" },
  { code: "LEED", name: "Leadership in Energy & Environmental Design", region: "International" },
  { code: "BREEAM", name: "Building Research Establishment Environmental Assessment", region: "UK/International" },
  { code: "Estidama", name: "Pearl Building Rating System", region: "UAE" },
];

export default function CertificationsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 md:pt-24 pb-8 md:pb-10" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero
          src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=2400&q=80"
          focalY="45%"
        />
        <div className="container-wide relative z-10">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">Certifications</span>
          </nav>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="eyebrow mb-6"><span className="eyebrow-dot" />Quality &amp; Compliance · {certifications.length} certifications</div>
              <h1 className="text-neutral-900 leading-[0.95] mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
                Independently<br />
                <span className="gradient-text">certified</span> <span className="serif-italic text-orange-600">at every stage.</span>
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-7">
                Every Gulf-O-Flex® product is tested, audited, and approved by accredited third-party bodies for fire safety, thermal performance, environmental responsibility, and quality management across {certifications.length}+ international frameworks.
              </p>

              {/* Trust chips */}
              <div className="flex flex-wrap items-center gap-2.5">
                {[
                  { icon: Flame,        label: "Fire Safety",     accent: "rgb(234,88,12)" },
                  { icon: ShieldCheck,  label: "Quality (ISO 9001)", accent: "rgb(234,88,12)" },
                  { icon: Leaf,         label: "Sustainability",  accent: "rgb(194,65,12)" },
                  { icon: Building2,    label: "UAE & GCC Listed", accent: "rgb(115,115,115)" },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <span
                      key={c.label}
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.04em] uppercase px-3 py-1.5 rounded-full border bg-white/85 backdrop-blur-md"
                      style={{
                        color: c.accent,
                        borderColor: `${c.accent.replace("rgb", "rgba").replace(")", ",0.2)")}`,
                      }}
                    >
                      <Icon size={12} />
                      {c.label}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/15 to-transparent rounded-[2rem] blur-3xl pointer-events-none" />
              <div className="relative rounded-3xl border bg-white/90 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(234,88,12,0.20)]"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="px-7 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <BadgeCheck size={14} className="text-orange-600" />
                    <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">Trust signals</div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] uppercase text-orange-600">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    Live
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(0,0,0,0.06)" }}>
                  {[
                    { n: certifications.length.toString(), l: "Top certifications" },
                    { n: standards.length.toString(),      l: "Std. compliance" },
                    { n: "30+",  l: "Years audited" },
                    { n: "100%", l: "Independently tested" },
                  ].map((s) => (
                    <div key={s.l} className="bg-white p-6">
                      <div className="text-neutral-900 font-black mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)", letterSpacing: "-0.025em" }}>{s.n}</div>
                      <div className="text-neutral-500 text-[10px] uppercase tracking-[0.18em] font-bold">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="px-7 py-3.5 border-t flex items-center justify-between text-[11px]" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <span className="text-neutral-500">Last audit cycle</span>
                  <span className="text-neutral-700 font-semibold">2025 · Bureau Veritas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications grid ── */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="container-wide">
          <DownloadGateProvider>
            <CertificationsGrid certifications={certifications} />
          </DownloadGateProvider>
        </div>
      </section>

      {/* ── Audit & Certification process ── */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden border-t" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
        <div className="absolute -top-32 -right-24 w-[28rem] h-[28rem] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-24 w-[24rem] h-[24rem] bg-orange-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-14">
            <div className="lg:col-span-7">
              <div className="eyebrow mb-4"><span className="eyebrow-dot" />Our Certification Process · 4 stages</div>
              <h2 className="text-neutral-900 leading-[1.0]"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
                How every claim is <span className="serif-italic text-orange-600">earned.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 text-neutral-600 text-base md:text-lg leading-relaxed">
              No badge is self-issued. Each certification is the outcome of a structured, repeating cycle of testing, audit, approval, and surveillance , by accredited bodies independent of Gulf-O-Flex®.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: "01",
                icon: FlaskConical,
                title: "Test",
                body: "Samples submitted to accredited laboratories , fire (FM 4924, ASTM E84), thermal (EN 12667), environmental (EN 15804).",
              },
              {
                step: "02",
                icon: ClipboardCheck,
                title: "Audit",
                body: "On-site quality, environmental and OH&S audits by certifying bodies (Bureau Veritas, FM Global, UL) against ISO frameworks.",
              },
              {
                step: "03",
                icon: BadgeCheck,
                title: "Certify",
                body: "Certificate issued with defined scope, validity period, and license to mark , published transparently with downloadable PDFs.",
              },
              {
                step: "04",
                icon: RefreshCw,
                title: "Maintain",
                body: "Annual surveillance audits, re-testing of production samples, and recertification cycles every 3 years , without exception.",
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="group relative rounded-2xl border bg-white p-6 lg:p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(234,88,12,0.30)]"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}
                >
                  <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-orange-400 to-transparent opacity-70" />
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200/70 flex items-center justify-center">
                      <Icon size={20} className="text-orange-600" strokeWidth={2.2} />
                    </div>
                    <span
                      className="text-neutral-200 font-black leading-none select-none"
                      style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", letterSpacing: "-0.04em" }}
                    >
                      {s.step}
                    </span>
                  </div>
                  <h3
                    className="text-neutral-900 mb-2"
                    style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.025em" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why this matters ── */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="container-wide">
          <div className="max-w-2xl mb-12">
            <div className="eyebrow mb-4"><span className="eyebrow-dot" />Why this matters</div>
            <h2 className="text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Compliance you can <span className="serif-italic text-orange-600">specify with confidence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Award,
                title: "Specifier-ready",
                body: "Every certificate is project-ready: scope, expiry and license number disclosed. Drop the PDF straight into your submittal package.",
              },
              {
                icon: Globe2,
                title: "Globally recognized",
                body: "Marks accepted by consultants and authorities in 90+ markets , ISO, FM, UL, TUV, Singapore Green Building, CE & REACH, Saudi Made, Dubai Civil Defence, LEED, BREEAM, Estidama.",
              },
              {
                icon: RefreshCw,
                title: "Continuously audited",
                body: "Annual surveillance and three-year recertification cycles, with batch-level production testing maintained on file.",
              },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="rounded-2xl border bg-gradient-to-br from-white to-orange-50/30 p-7 hover:shadow-[0_30px_60px_-30px_rgba(234,88,12,0.25)] transition-shadow"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center mb-5 shadow-[0_10px_30px_-10px_rgba(234,88,12,0.6)]">
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                  <h3 className="text-neutral-900 mb-2"
                    style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.025em" }}>
                    {c.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="pb-24 md:pb-32 bg-white">
        <div className="container-wide">
          <div className="relative rounded-3xl overflow-hidden border border-neutral-200 bg-gradient-to-br from-neutral-900 via-neutral-900 to-orange-950 text-white p-8 lg:p-14">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative grid lg:grid-cols-[1.2fr_auto] gap-10 items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] uppercase text-orange-300 mb-4">
                  <CheckCircle2 size={12} /> Submittal-ready
                </div>
                <h3 className="leading-tight mb-4"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
                  Need certificates, datasheets, or a tested-system letter?
                </h3>
                <p className="text-white/65 text-base leading-relaxed">
                  Our specification team will package the exact compliance evidence your project requires , fire reports, EPDs, IMO/ASTM listings, third-party audit letters , usually within one business day.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <Link
                  href="/downloads"
                  className="inline-flex items-center justify-between gap-3 px-5 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm transition-colors"
                >
                  <span className="flex items-center gap-2"><Download size={14} /> Download Centre</span>
                  <ArrowUpRight size={14} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-between gap-3 px-5 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-bold text-sm transition-colors"
                >
                  <span className="flex items-center gap-2"><ShieldCheck size={14} /> Request Compliance Pack</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
