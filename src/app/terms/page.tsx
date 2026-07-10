import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import {
  FileText,
  Layers,
  FlaskConical,
  AlertTriangle,
  ExternalLink,
  Package,
  Ban,
  RefreshCw,
  Scale,
  Mail,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use | Gulf-O-Flex® - gulfoflex.com",
  description:
    "Terms of Use for gulfoflex.com - the official website of Rubber World Industry LLC, manufacturer of Gulf-O-Flex® rubber insulation products.",
  alternates: { canonical: "https://gulfoflex.com/terms" },
};

const toc = [
  { id: "acceptance",        number: "01", title: "Acceptance of Terms" },
  { id: "ip",                number: "02", title: "Intellectual Property" },
  { id: "technical-info",    number: "03", title: "Technical Information" },
  { id: "liability",         number: "04", title: "Limitation of Liability" },
  { id: "external-links",    number: "05", title: "External Links" },
  { id: "availability",      number: "06", title: "Product Availability" },
  { id: "prohibited",        number: "07", title: "Prohibited Uses" },
  { id: "amendments",        number: "08", title: "Amendments" },
  { id: "governing-law",     number: "09", title: "Governing Law" },
  { id: "contact",           number: "10", title: "Contact" },
];

export default function TermsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-20 md:pt-24 pb-8"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}
      >
        <PageHero
          src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2400&q=80"
          focalY="center"
          intensity={0.55}
        />
        <div className="container-wide relative z-10">
          <div className="max-w-4xl">
            <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-700">Terms of Use</span>
            </nav>
            <div className="eyebrow mb-6">
              <span className="eyebrow-dot" />
              Legal · Updated January 2025
            </div>
            <h1
              className="text-neutral-900 leading-[0.95] mb-5"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}
            >
              Terms of <span className="gradient-text">Use</span><span className="serif-italic text-orange-600">.</span>
            </h1>
            <p className="text-neutral-600 text-lg max-w-2xl leading-relaxed">
              Terms governing the use of gulfoflex.com - operated by Rubber World Industry LLC.
            </p>

            {/* Quick-reference highlights */}
            <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-2xl">
              {[
                { Icon: FileText,      label: "UAE governed",      sub: "Ajman jurisdiction" },
                { Icon: Layers,        label: "IP protected",      sub: "All content reserved" },
                { Icon: RefreshCw,     label: "Subject to change", sub: "Review periodically" },
              ].map(({ Icon, label, sub }) => (
                <div key={label} className="glass-card px-5 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-neutral-900 font-semibold text-sm leading-tight">{label}</p>
                    <p className="text-neutral-400 text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-wide">
          <div className="flex gap-10 xl:gap-16 items-start">

            {/* Sticky TOC sidebar - desktop only */}
            <aside className="hidden lg:block w-60 xl:w-64 flex-shrink-0 sticky top-28 self-start">
              <div
                className="rounded-2xl border bg-white p-6"
                style={{ borderColor: "rgba(0,0,0,0.07)", boxShadow: "0 8px 32px -16px rgba(0,0,0,0.10)" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-5">Contents</p>
                <nav className="space-y-0.5" aria-label="Table of contents">
                  {toc.map(({ id, number, title }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="flex items-center gap-3 py-2 px-3 rounded-xl text-sm text-neutral-500 hover:text-orange-600 hover:bg-orange-50 transition-all group"
                    >
                      <span className="text-xs font-mono text-neutral-300 group-hover:text-orange-400 transition-colors w-5 flex-shrink-0">{number}</span>
                      <span className="leading-snug">{title}</span>
                    </a>
                  ))}
                </nav>
                <div className="mt-5 pt-5 border-t border-neutral-100">
                  <a href="mailto:info@gulfoflex.com" className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors">
                    <Mail className="w-4 h-4" />
                    Legal enquiries
                  </a>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0 max-w-3xl">
              <div className="space-y-3">

                {/* Acceptance */}
                <div id="acceptance" className="scroll-mt-28 rounded-2xl border bg-white p-7 md:p-8 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-neutral-300">01</span>
                        <h2 className="text-neutral-900 font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>Acceptance of Terms</h2>
                      </div>
                      <div className="h-px bg-gradient-to-r from-orange-200 to-transparent" />
                    </div>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-[0.9375rem]">
                    By accessing and using <strong className="text-neutral-900">gulfoflex.com</strong> (the &ldquo;Site&rdquo;), you accept and agree to be
                    bound by these Terms of Use. If you do not agree, please do not use the Site. These terms are governed by
                    the laws of the United Arab Emirates.
                  </p>
                </div>

                {/* IP */}
                <div id="ip" className="scroll-mt-28 rounded-2xl border bg-white p-7 md:p-8 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                      <Layers className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-neutral-300">02</span>
                        <h2 className="text-neutral-900 font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>Intellectual Property</h2>
                      </div>
                      <div className="h-px bg-gradient-to-r from-orange-200 to-transparent" />
                    </div>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-[0.9375rem]">
                    All content on this Site - including text, images, product data, technical specifications, logos,
                    trademarks, and software - is the property of Rubber World Industry LLC or its licensors.{" "}
                    <strong className="text-neutral-900">Gulf-O-Flex® is a registered trademark.</strong> Unauthorized
                    reproduction, distribution, or use of any content is strictly prohibited.
                  </p>
                </div>

                {/* Technical Info */}
                <div id="technical-info" className="scroll-mt-28 rounded-2xl border bg-white p-7 md:p-8 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                      <FlaskConical className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-neutral-300">03</span>
                        <h2 className="text-neutral-900 font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>Technical Information</h2>
                      </div>
                      <div className="h-px bg-gradient-to-r from-orange-200 to-transparent" />
                    </div>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-[0.9375rem] mb-4">
                    Technical data, specifications, and performance values published on this Site are provided in good faith
                    and based on testing conducted under controlled conditions. Real-world performance may vary.
                  </p>
                  <div className="rounded-xl p-4 border border-orange-100 bg-orange-50/60 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-orange-900/80 leading-relaxed">
                      Gulf-O-Flex® insulation must be installed by qualified professionals in accordance with applicable
                      codes and our technical guidelines. Always consult our technical team for project-specific recommendations.
                    </p>
                  </div>
                </div>

                {/* Liability */}
                <div id="liability" className="scroll-mt-28 rounded-2xl border bg-white p-7 md:p-8 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-neutral-300">04</span>
                        <h2 className="text-neutral-900 font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>Limitation of Liability</h2>
                      </div>
                      <div className="h-px bg-gradient-to-r from-orange-200 to-transparent" />
                    </div>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-[0.9375rem]">
                    Rubber World Industry LLC provides this Site on an &ldquo;as-is&rdquo; basis. We make no warranties, express or
                    implied, regarding the accuracy, completeness, or fitness for purpose of information on this Site. We
                    shall not be liable for any direct, indirect, consequential, or incidental damages arising from use of
                    this Site or reliance on its content.
                  </p>
                </div>

                {/* 4-column small sections */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {/* External Links */}
                  <div id="external-links" className="scroll-mt-28 rounded-2xl border bg-white p-7 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-neutral-300 block">05</span>
                        <h2 className="text-neutral-900 font-bold text-base leading-tight" style={{ fontFamily: "var(--font-syne)" }}>External Links</h2>
                      </div>
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      Links to third-party websites are provided for convenience only. Rubber World Industry LLC is not
                      responsible for the content, accuracy, or privacy practices of any linked external sites.
                    </p>
                  </div>

                  {/* Product Availability */}
                  <div id="availability" className="scroll-mt-28 rounded-2xl border bg-white p-7 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                        <Package className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-neutral-300 block">06</span>
                        <h2 className="text-neutral-900 font-bold text-base leading-tight" style={{ fontFamily: "var(--font-syne)" }}>Product Availability</h2>
                      </div>
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      Products shown are subject to availability and may vary by market. Contact your local distributor or
                      our sales team for current pricing and availability.
                    </p>
                  </div>

                  {/* Prohibited Uses */}
                  <div id="prohibited" className="scroll-mt-28 rounded-2xl border bg-white p-7 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                        <Ban className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-neutral-300 block">07</span>
                        <h2 className="text-neutral-900 font-bold text-base leading-tight" style={{ fontFamily: "var(--font-syne)" }}>Prohibited Uses</h2>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-neutral-600">
                      {[
                        "Transmit harmful or illegal content",
                        "Attempt unauthorized system access",
                        "Scrape data for commercial use",
                        "Misrepresent Gulf-O-Flex® affiliation",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Amendments */}
                  <div id="amendments" className="scroll-mt-28 rounded-2xl border bg-white p-7 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                        <RefreshCw className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-neutral-300 block">08</span>
                        <h2 className="text-neutral-900 font-bold text-base leading-tight" style={{ fontFamily: "var(--font-syne)" }}>Amendments</h2>
                      </div>
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      We reserve the right to modify these Terms at any time. Continued use after changes constitutes
                      acceptance of the updated Terms. We recommend reviewing this page periodically.
                    </p>
                  </div>
                </div>

                {/* Governing Law */}
                <div id="governing-law" className="scroll-mt-28 rounded-2xl border bg-white p-7 md:p-8 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                      <Scale className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-neutral-300">09</span>
                        <h2 className="text-neutral-900 font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>Governing Law</h2>
                      </div>
                      <div className="h-px bg-gradient-to-r from-orange-200 to-transparent" />
                    </div>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-[0.9375rem]">
                    These Terms are governed by the laws of the Emirate of Ajman and the United Arab Emirates. Any disputes
                    shall be subject to the exclusive jurisdiction of the courts of Ajman, UAE.
                  </p>
                </div>

                {/* Contact */}
                <div id="contact" className="scroll-mt-28 rounded-2xl border p-7 md:p-8 transition-all hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)", background: "linear-gradient(135deg, rgba(249,115,22,0.04) 0%, rgba(249,115,22,0.01) 100%)" }}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-neutral-300">10</span>
                        <h2 className="text-neutral-900 font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>Contact</h2>
                      </div>
                      <div className="h-px bg-gradient-to-r from-orange-200 to-transparent" />
                    </div>
                  </div>
                  <p className="text-neutral-600 text-[0.9375rem] mb-5">
                    For questions about these Terms, please contact:
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between rounded-xl border border-orange-100 bg-white p-5">
                    <div>
                      <p className="text-neutral-900 font-semibold text-sm mb-0.5">Rubber World Industry LLC</p>
                      <p className="text-neutral-500 text-xs">P.O. Box 2435, New Industrial Area, Ajman, UAE</p>
                    </div>
                    <a href="mailto:info@gulfoflex.com" className="btn-primary text-xs whitespace-nowrap w-full sm:w-auto justify-center normal-case tracking-normal">
                      <Mail className="w-3.5 h-3.5" />
                      info@gulfoflex.com
                    </a>
                  </div>
                </div>

              </div>

              {/* Footer CTA */}
              <div className="mt-8 rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)" }}>
                <p className="text-white font-bold text-lg mb-2">Need clarification on these terms?</p>
                <p className="text-neutral-400 text-sm mb-6">
                  Our legal team is happy to assist with any questions about using our website or products.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="mailto:info@gulfoflex.com" className="btn-primary">
                    <Mail className="w-4 h-4" />
                    Email Legal Team
                  </a>
                  <Link href="/contact" className="btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)" }}>
                    Contact Us <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
