import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import CertificationsGrid from "@/components/certifications/CertificationsGrid";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Certifications & Compliance | Gulf-O-Flex® ISO 9001, FM Approved, LPCB",
  description:
    "Gulf-O-Flex® holds ISO 9001, ISO 14001, FM Approved, LPCB, CE Marked, and Gulf Mark certifications. Our products meet BS 476, ASTM E84, EN 13501-1, NFPA, ASHRAE, and IMO standards.",
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
    pdfUrl: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-ISO-9001.pdf",
  },
  {
    name: "ISO 14001:2015",
    authority: "Bureau Veritas",
    category: "Environmental",
    color: "green",
    desc: "Environmental Management System certification. Demonstrates our commitment to reducing environmental impact, managing waste, and sustainable manufacturing practices.",
    scope: "Environmental management of manufacturing operations",
    pdfUrl: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-ISO-14001:2015.pdf",
  },
  {
    name: "ISO 45001:2018",
    authority: "Bureau Veritas",
    category: "Occupational H&S",
    color: "blue",
    desc: "Occupational Health and Safety Management System certification. Demonstrates our commitment to a safe and healthy workplace across all manufacturing operations.",
    scope: "Health & safety management of manufacturing operations",
    pdfUrl: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-ISO-45001-2028.pdf",
  },
  {
    name: "FM Approved",
    authority: "FM Global",
    category: "Fire Safety",
    color: "red",
    desc: "FM Approved certification — one of the world's most recognized and demanding fire safety approvals. Covers thermal, fire, and smoke performance to FM 4924 standards.",
    scope: "NBR closed-cell elastomeric insulation products",
    pdfUrl: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-FM-4924.pdf",
  },
  {
    name: "UL Listed",
    authority: "Underwriters Laboratories",
    category: "Fire Safety",
    color: "red",
    desc: "UL Listed for surface burning characteristics to ASTM E84 / UL 723. Verifies flame spread and smoke developed indices for North American specification.",
    scope: "Elastomeric insulation — ASTM E84 / UL 723",
    pdfUrl: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-UL.pdf",
  },
  {
    name: "DCL",
    authority: "Dubai Central Laboratory",
    category: "UAE Compliance",
    color: "yellow",
    desc: "Dubai Central Laboratory product certification. Mandatory product listing for materials specified on projects within the Emirate of Dubai, verifying conformity to UAE technical regulations.",
    scope: "Insulation products — Dubai Municipality requirements",
    pdfUrl: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-DCL-Al-Safat-Dubai-Green-Building.pdf",
  },
  {
    name: "DCD",
    authority: "Dubai Civil Defence",
    category: "UAE Fire Code",
    color: "purple",
    desc: "Dubai Civil Defence approval for fire-rated insulation. Required listing under the UAE Fire & Life Safety Code of Practice for materials installed in buildings across Dubai.",
    scope: "Fire-rated insulation — UAE Fire & Life Safety Code",
    pdfUrl: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-DCD.pdf",
  },
  {
    name: "EPD",
    authority: "EPD International / IBU",
    category: "Sustainability",
    color: "green",
    desc: "Environmental Product Declaration verified to ISO 14025 / EN 15804. Transparent, third-party Life-Cycle Assessment data for LEED, BREEAM, and Estidama credits.",
    scope: "Life-cycle environmental performance disclosure",
    pdfUrl: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/EPD-Catalogue.pdf",
  },
];

const standards = [
  { code: "FM 4924", name: "Fire Protection Standard for Elastomeric Insulation", region: "USA" },
  { code: "ASTM E84 / UL 723", name: "Surface Burning Characteristics", region: "USA" },
  { code: "ISO 14025", name: "Environmental Product Declarations (Type III)", region: "International" },
  { code: "EN 15804", name: "Sustainability of Construction Works — EPD", region: "Europe" },
  { code: "LEED", name: "Leadership in Energy & Environmental Design", region: "International" },
  { code: "BREEAM", name: "Building Research Establishment Environmental Assessment", region: "UK/International" },
  { code: "Estidama", name: "Pearl Building Rating System", region: "UAE" },
];

export default function CertificationsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-20" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2400&q=80" focalY="40%" />
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
                Internationally<br />
                <span className="gradient-text">certified</span> <span className="serif-italic text-orange-600">excellence.</span>
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                Every Gulf-O-Flex® product is independently tested and certified to the world&rsquo;s most rigorous standards for fire safety, thermal performance, environmental responsibility, and quality management.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/15 to-transparent rounded-[2rem] blur-3xl pointer-events-none" />
              <div className="relative rounded-3xl border bg-white/90 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(234,88,12,0.20)]"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="px-7 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">Trust signals</div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(0,0,0,0.06)" }}>
                  {[
                    { n: "8", l: "Top certifications" },
                    { n: "7", l: "Std. compliance" },
                    { n: "30+", l: "Years audited" },
                    { n: "100%", l: "Independently tested" },
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

      {/* ── Certifications grid ── */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="container-wide">
          <CertificationsGrid certifications={certifications} />
        </div>
      </section>

      {/* ── Standards table ── */}
      <section className="py-20 md:py-28 bg-neutral-50 relative">
        <div className="absolute inset-0 grid-bg opacity-[0.10]" />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl mb-12">
            <div className="eyebrow mb-4"><span className="eyebrow-dot" />Compliance Standards · {standards.length}</div>
            <h2 className="text-neutral-900 leading-[1.05] mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Tested against the <span className="serif-italic text-orange-600">global rulebook.</span>
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Gulf-O-Flex® products are tested against the following international standards, enabling specification on projects worldwide.
            </p>
          </div>
          <div className="rounded-3xl border bg-white overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.10)]"
            style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <div className="px-7 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-orange-600" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">International standards register</span>
              </div>
              <span className="text-xs text-neutral-400">{standards.length} entries</span>
            </div>
            {standards.map((s, i) => (
              <div key={s.code}
                className={`grid grid-cols-[140px_1fr_auto] items-center gap-4 px-7 py-4 transition-colors hover:bg-orange-50/40 ${i % 2 === 0 ? "bg-neutral-50/60" : "bg-white"}`}
                style={{ borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.04)" }}>
                <span className="inline-flex items-center justify-center text-[10px] font-bold tracking-[0.12em] uppercase text-orange-700 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full">
                  {s.code}
                </span>
                <span className="text-neutral-800 text-sm">{s.name}</span>
                <span className="text-neutral-500 text-xs">{s.region}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
