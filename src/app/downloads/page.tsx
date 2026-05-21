import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, FileText, Award, Wrench } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Download Center | Gulf-O-Flex® Technical Datasheets, Certifications & Guides",
  description:
    "Download Gulf-O-Flex® product technical datasheets, installation guides, compliance certificates, CAD drawings, and BIM files. Free technical resources for MEP engineers.",
  alternates: { canonical: "https://gulfoflex.com/downloads" },
};

const categories = [
  {
    icon: FileText,
    name: "Product Datasheets",
    color: "orange",
    desc: "Technical datasheets with full product specifications, performance data, and application guidance.",
    files: [
      { name: "Gulf-O-Flex® NBR — Full Datasheet", size: "2.4 MB", type: "PDF" },
      { name: "Gulf-O-Flex® XLPE — Full Datasheet", size: "1.9 MB", type: "PDF" },
      { name: "Gulf-O-Flex® Sound — Full Datasheet", size: "2.1 MB", type: "PDF" },
      { name: "Gulf-O-Flex® Aluglass — Datasheet", size: "1.6 MB", type: "PDF" },
      { name: "Gulf-O-Flex® Aluclad — Datasheet", size: "1.8 MB", type: "PDF" },
      { name: "Accessories & Adhesives Catalogue", size: "2.7 MB", type: "PDF" },
    ],
  },
  {
    icon: Award,
    name: "Certifications & Test Reports",
    color: "blue",
    desc: "ISO certifications, fire & life safety approvals, and UAE compliance documents for specification.",
    files: [
      { name: "ISO 9001:2015 Quality Management Certificate", size: "0.5 MB", type: "PDF", href: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-ISO-9001.pdf" },
      { name: "ISO 14001:2015 Environmental Management Certificate", size: "0.5 MB", type: "PDF", href: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-ISO-14001:2015.pdf" },
      { name: "ISO 45001:2018 Occupational H&S Certificate", size: "0.5 MB", type: "PDF", href: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-ISO-45001-2028.pdf" },
      { name: "FM Approved Certificate — FM 4924", size: "1.2 MB", type: "PDF", href: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-FM-4924.pdf" },
      { name: "UL Listed Certificate — ASTM E84 / UL 723", size: "0.8 MB", type: "PDF" },
      { name: "DCL Certificate — Dubai Central Laboratory", size: "0.6 MB", type: "PDF", href: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-DCL-Al-Safat-Dubai-Green-Building.pdf" },
      { name: "DCD Approval — Dubai Civil Defence", size: "0.7 MB", type: "PDF", href: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-DCD.pdf" },
      { name: "EPD — Environmental Product Declaration", size: "1.4 MB", type: "PDF" },
    ],
  },
  {
    icon: Wrench,
    name: "Installation Guides",
    color: "green",
    desc: "Step-by-step installation instructions, best practice guides, and maintenance recommendations.",
    files: [
      { name: "NBR Pipe Insulation Installation Guide", size: "3.2 MB", type: "PDF" },
      { name: "Sheet Insulation Installation Guide", size: "2.4 MB", type: "PDF" },
      { name: "Ductwork Insulation Guide", size: "2.8 MB", type: "PDF" },
      { name: "Adhesive Application Guidelines", size: "1.1 MB", type: "PDF" },
      { name: "Cold Storage Installation Manual", size: "2.5 MB", type: "PDF" },
    ],
  },
];

const totalFiles = categories.reduce((sum, c) => sum + c.files.length, 0);

export default function DownloadsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-24" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1708005383082-3a0e5e79a347?auto=format&fit=crop&w=2400&q=80" focalY="center" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                <span className="text-neutral-300">/</span>
                <span className="text-neutral-700">Downloads</span>
              </nav>
              <div className="eyebrow mb-6"><span className="eyebrow-dot" />Technical Resources · {totalFiles} files</div>
              <h1 className="text-neutral-900 leading-[0.95] mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
                The complete<br />
                <span className="gradient-text">download center</span><span className="serif-italic text-orange-600">.</span>
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                Access our comprehensive library of technical documentation — product datasheets, test certificates, installation guides, CAD drawings, and BIM files.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/15 to-transparent rounded-[2rem] blur-3xl pointer-events-none" />
              <div className="relative rounded-3xl border bg-white/90 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(234,88,12,0.20)]"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="px-7 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <Download size={14} className="text-orange-600" />
                    <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">Library overview</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(0,0,0,0.06)" }}>
                  {categories.map((cat) => (
                    <div key={cat.name} className="bg-white p-6">
                      <div className="text-neutral-900 font-black mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)", letterSpacing: "-0.025em" }}>{cat.files.length}</div>
                      <div className="text-neutral-500 text-[10px] uppercase tracking-[0.18em] font-bold">{cat.name.split(" ")[0]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-20 md:py-24 bg-white relative">
        <div className="container-wide space-y-6">
          {categories.map((cat, i) => (
            <div key={cat.name}
              className="group relative rounded-3xl border bg-white overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_-30px_rgba(234,88,12,0.20)] hover:border-orange-300/60"
              style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-5 p-7 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))", border: "1px solid rgba(249,115,22,0.20)" }}>
                  <cat.icon size={20} className="text-orange-600" strokeWidth={2.2} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-neutral-900 font-bold"
                      style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
                      {cat.name}
                    </h2>
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">0{i + 1} / 0{categories.length}</span>
                  </div>
                  <p className="text-neutral-600 text-sm">{cat.desc}</p>
                </div>
                <div className="hidden md:block text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400">{cat.files.length} files</div>
              </div>
              <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                {cat.files.map((f) => (
                  <a key={f.name} href={(f as { href?: string }).href ?? "#"}
                    target={(f as { href?: string }).href ? "_blank" : undefined}
                    rel={(f as { href?: string }).href ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-between px-7 py-4 hover:bg-orange-50/40 transition-colors group/row cursor-pointer"
                    aria-disabled={!(f as { href?: string }).href}>
                    <div className="flex items-center gap-4">
                      <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.20)" }}>
                        <span className="text-[9px] font-black text-orange-600">{f.type}</span>
                      </span>
                      <span className="text-neutral-800 text-sm font-semibold group-hover/row:text-orange-600 transition-colors">{f.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-neutral-400 text-xs font-medium tabular-nums">{f.size}</span>
                      <span className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 group-hover/row:bg-orange-500 group-hover/row:border-orange-500"
                        style={{ borderColor: "rgba(0,0,0,0.10)" }}>
                        <Download size={13} className="text-neutral-700 group-hover/row:text-white transition-colors" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
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
            Need a custom<br /><span className="serif-italic text-orange-400">spec or report?</span>
          </h2>
          <p className="text-white/55 max-w-xl mx-auto mb-8">
            Use Gulf-O-Flex Assist to generate custom technical calculations, compliance reports, and product selection guidance for your specific project.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="https://gulfoflexassist.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Launch GOF Assist <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-ghost"
              style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.18)" }}>
              Contact Technical Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
