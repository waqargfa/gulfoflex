import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import {
  Shield,
  Eye,
  Database,
  Share2,
  Cookie,
  Clock,
  UserCheck,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Gulf-O-Flex® - Rubber World Industry LLC",
  description: "Privacy Policy for gulfoflex.com - how Rubber World Industry LLC collects, uses, and protects your personal information.",
  alternates: { canonical: "https://gulfoflex.com/privacy-policy" },
};

const toc = [
  { id: "who-we-are",             number: "01", title: "Who We Are" },
  { id: "information-we-collect", number: "02", title: "Information We Collect" },
  { id: "how-we-use",             number: "03", title: "How We Use Your Information" },
  { id: "data-sharing",           number: "04", title: "Data Sharing" },
  { id: "cookies",                number: "05", title: "Cookies" },
  { id: "data-retention",         number: "06", title: "Data Retention" },
  { id: "your-rights",            number: "07", title: "Your Rights" },
  { id: "security",               number: "08", title: "Security" },
  { id: "contact",                number: "09", title: "Contact" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-32 md:pt-40 pb-20"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}
      >
        <PageHero src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2400&q=80" focalY="center" intensity={0.55} />
        <div className="container-wide relative z-10">
          <div className="max-w-4xl">
            <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-700">Privacy Policy</span>
            </nav>
            <div className="eyebrow mb-6"><span className="eyebrow-dot" />Legal · Updated January 2025</div>
            <h1
              className="text-neutral-900 leading-[0.95] mb-5"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}
            >
              Privacy <span className="gradient-text">Policy</span><span className="serif-italic text-orange-600">.</span>
            </h1>
            <p className="text-neutral-600 text-lg max-w-2xl leading-relaxed">
              How Rubber World Industry LLC collects, uses, and protects your personal information.
            </p>
            {/* Trust highlights */}
            <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-2xl">
              {[
                { Icon: Shield,    label: "No data sold",      sub: "Ever, to anyone" },
                { Icon: Lock,      label: "HTTPS encrypted",   sub: "All transmissions" },
                { Icon: UserCheck, label: "Your rights",       sub: "Honoured always" },
              ].map(({ Icon: I, label, sub }) => (
                <div key={label} className="glass-card px-5 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <I className="w-4 h-4 text-orange-600" />
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
                  <a href="mailto:privacy@gulfoflex.com" className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors">
                    <Mail className="w-4 h-4" />
                    Privacy enquiries
                  </a>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0 max-w-3xl">
              <div className="space-y-3">

                {/* Section 01 */}
                <div id="who-we-are" className="scroll-mt-28 rounded-2xl border bg-white p-7 md:p-8 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-neutral-300">01</span>
                        <h2 className="text-neutral-900 font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>Who We Are</h2>
                      </div>
                      <div className="h-px bg-gradient-to-r from-orange-200 to-transparent" />
                    </div>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-[0.9375rem]">
                    This Privacy Policy applies to <strong className="text-neutral-900">gulfoflex.com</strong> and is operated by{" "}
                    <strong className="text-neutral-900">Rubber World Industry LLC</strong> (trading as Gulf-O-Flex®), registered at
                    P.O. Box 2435, New Industrial Area, Ajman, United Arab Emirates. We are committed to protecting your personal
                    data in accordance with applicable UAE privacy laws and international best practices.
                  </p>
                </div>

                {/* Section 02 */}
                <div id="information-we-collect" className="scroll-mt-28 rounded-2xl border bg-white p-7 md:p-8 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-neutral-300">02</span>
                        <h2 className="text-neutral-900 font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>Information We Collect</h2>
                      </div>
                      <div className="h-px bg-gradient-to-r from-orange-200 to-transparent" />
                    </div>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-[0.9375rem] mb-4">
                    We may collect the following personal information when you use our website or contact us:
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Contact details: name, email address, phone number, company name",
                      "Technical enquiry details: project description, product requirements",
                      "Communication history: emails, chat records, support tickets",
                      "Usage data: pages visited, time on site, device and browser information (collected via analytics cookies)",
                      "Location data: country, city (inferred from IP address)",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-neutral-600">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 03 */}
                <div id="how-we-use" className="scroll-mt-28 rounded-2xl border bg-white p-7 md:p-8 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-neutral-300">03</span>
                        <h2 className="text-neutral-900 font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>How We Use Your Information</h2>
                      </div>
                      <div className="h-px bg-gradient-to-r from-orange-200 to-transparent" />
                    </div>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-[0.9375rem] mb-4">We use your personal data to:</p>
                  <ul className="space-y-2.5">
                    {[
                      "Respond to product enquiries, quotation requests, and technical questions",
                      "Process orders and coordinate delivery",
                      "Send requested technical documentation, datasheets, and catalogues",
                      "Send occasional product updates or newsletters (only with your consent)",
                      "Improve our website and services through analytics",
                      "Comply with legal and regulatory obligations",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-neutral-600">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 04 */}
                <div id="data-sharing" className="scroll-mt-28 rounded-2xl border bg-white p-7 md:p-8 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                      <Share2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-neutral-300">04</span>
                        <h2 className="text-neutral-900 font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>Data Sharing</h2>
                      </div>
                      <div className="h-px bg-gradient-to-r from-orange-200 to-transparent" />
                    </div>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-[0.9375rem] mb-4">
                    We do not sell, rent, or trade your personal information to third parties. We may share data with:
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Our authorized distributors, when you request a local contact",
                      "Technology service providers (web hosting, CRM, email services) under strict data processing agreements",
                      "Legal authorities where required by UAE law",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-neutral-600">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sections 05–08 in a 2-column grid */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Section 05 */}
                  <div id="cookies" className="scroll-mt-28 rounded-2xl border bg-white p-7 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                        <Cookie className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-neutral-300 block">05</span>
                        <h2 className="text-neutral-900 font-bold text-base leading-tight" style={{ fontFamily: "var(--font-syne)" }}>Cookies</h2>
                      </div>
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      Our website uses cookies for analytics (via Google Analytics) and to improve user experience. You may
                      disable cookies in your browser settings. We do not use advertising or tracking cookies.
                    </p>
                  </div>

                  {/* Section 06 */}
                  <div id="data-retention" className="scroll-mt-28 rounded-2xl border bg-white p-7 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-neutral-300 block">06</span>
                        <h2 className="text-neutral-900 font-bold text-base leading-tight" style={{ fontFamily: "var(--font-syne)" }}>Data Retention</h2>
                      </div>
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      Enquiry records are typically retained for 3 years. We retain data for as long as necessary to provide
                      our services or as required by applicable law. You may request deletion at any time.
                    </p>
                  </div>

                  {/* Section 07 */}
                  <div id="your-rights" className="scroll-mt-28 rounded-2xl border bg-white p-7 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                        <UserCheck className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-neutral-300 block">07</span>
                        <h2 className="text-neutral-900 font-bold text-base leading-tight" style={{ fontFamily: "var(--font-syne)" }}>Your Rights</h2>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-neutral-600">
                      {["Access your data", "Correct inaccurate data", "Request data deletion", "Opt-out of marketing"].map((r) => (
                        <li key={r} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />{r}
                        </li>
                      ))}
                    </ul>
                    <a href="mailto:privacy@gulfoflex.com" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                      <Mail className="w-3.5 h-3.5" />privacy@gulfoflex.com
                    </a>
                  </div>

                  {/* Section 08 */}
                  <div id="security" className="scroll-mt-28 rounded-2xl border bg-white p-7 transition-all hover:shadow-[0_8px_40px_-16px_rgba(249,115,22,0.15)] hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                        <Lock className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-neutral-300 block">08</span>
                        <h2 className="text-neutral-900 font-bold text-base leading-tight" style={{ fontFamily: "var(--font-syne)" }}>Security</h2>
                      </div>
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      We implement appropriate technical and organizational security measures to protect your personal data.
                      Our website uses HTTPS encryption for all data transmissions.
                    </p>
                  </div>
                </div>

                {/* Section 09 - Contact */}
                <div id="contact" className="scroll-mt-28 rounded-2xl border p-7 md:p-8 transition-all hover:border-orange-200" style={{ borderColor: "rgba(0,0,0,0.07)", background: "linear-gradient(135deg, rgba(249,115,22,0.04) 0%, rgba(249,115,22,0.01) 100%)" }}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(249,115,22,0.5)]">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-neutral-300">09</span>
                        <h2 className="text-neutral-900 font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>Contact</h2>
                      </div>
                      <div className="h-px bg-gradient-to-r from-orange-200 to-transparent" />
                    </div>
                  </div>
                  <p className="text-neutral-600 text-[0.9375rem] mb-5">
                    For privacy-related enquiries, please contact our Data Privacy Officer:
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between rounded-xl border border-orange-100 bg-white p-5">
                    <div>
                      <p className="text-neutral-900 font-semibold text-sm mb-0.5">Rubber World Industry LLC</p>
                      <p className="text-neutral-500 text-xs">P.O. Box 2435, New Industrial Area, Ajman, UAE</p>
                    </div>
                    <a href="mailto:privacy@gulfoflex.com" className="btn-primary text-xs whitespace-nowrap">
                      <Mail className="w-3.5 h-3.5" />
                      privacy@gulfoflex.com
                    </a>
                  </div>
                </div>

              </div>

              {/* Footer CTA */}
              <div className="mt-8 rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)" }}>
                <p className="text-white font-bold text-lg mb-2">Questions about your privacy?</p>
                <p className="text-neutral-400 text-sm mb-6">
                  We&apos;re committed to transparency. Reach out and we&apos;ll respond within 2 business days.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="mailto:privacy@gulfoflex.com" className="btn-primary">
                    <Mail className="w-4 h-4" />
                    Email Privacy Team
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
