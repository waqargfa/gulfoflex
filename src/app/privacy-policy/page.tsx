import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | Gulf-O-Flex® — Rubber World Industry LLC",
  description: "Privacy Policy for gulfoflex.com — how Rubber World Industry LLC collects, uses, and protects your personal information.",
  alternates: { canonical: "https://gulfoflex.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-16" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2400&q=80" focalY="center" intensity={0.7} />
        <div className="container-wide relative z-10">
          <div className="max-w-4xl">
            <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-700">Privacy Policy</span>
            </nav>
            <div className="eyebrow mb-6"><span className="eyebrow-dot" />Legal · Updated January 2025</div>
            <h1 className="text-neutral-900 leading-[0.95] mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
              Privacy <span className="gradient-text">Policy</span><span className="serif-italic text-orange-600">.</span>
            </h1>
            <p className="text-neutral-600 text-base">How Rubber World Industry LLC collects, uses, and protects your personal information.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container-wide max-w-3xl">
          <div className="rounded-3xl border bg-white p-8 md:p-12" style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 30px 80px -40px rgba(0,0,0,0.10)" }}>
          <div className="prose prose-neutral max-w-none">
            <div className="space-y-10 text-neutral-500 leading-relaxed">

              <div>
                <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>1. Who We Are</h2>
                <p>This Privacy Policy applies to gulfoflex.com and is operated by <strong className="text-neutral-900">Rubber World Industry LLC</strong> (trading as Gulf-O-Flex®), registered at P.O. Box 2435, New Industrial Area, Ajman, United Arab Emirates. We are committed to protecting your personal data in accordance with applicable UAE privacy laws and international best practices.</p>
              </div>

              <div>
                <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>2. Information We Collect</h2>
                <p>We may collect the following personal information when you use our website or contact us:</p>
                <ul className="space-y-2 mt-3 list-none">
                  {[
                    "Contact details: name, email address, phone number, company name",
                    "Technical enquiry details: project description, product requirements",
                    "Communication history: emails, chat records, support tickets",
                    "Usage data: pages visited, time on site, device and browser information (collected via analytics cookies)",
                    "Location data: country, city (inferred from IP address)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>3. How We Use Your Information</h2>
                <p>We use your personal data to:</p>
                <ul className="space-y-2 mt-3 list-none">
                  {[
                    "Respond to product enquiries, quotation requests, and technical questions",
                    "Process orders and coordinate delivery",
                    "Send requested technical documentation, datasheets, and catalogues",
                    "Send occasional product updates or newsletters (only with your consent)",
                    "Improve our website and services through analytics",
                    "Comply with legal and regulatory obligations",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>4. Data Sharing</h2>
                <p>We do not sell, rent, or trade your personal information to third parties. We may share data with:</p>
                <ul className="space-y-2 mt-3 list-none">
                  {[
                    "Our authorized distributors, when you request a local contact",
                    "Technology service providers (web hosting, CRM, email services) under strict data processing agreements",
                    "Legal authorities where required by UAE law",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>5. Cookies</h2>
                <p>Our website uses cookies for analytics (via Google Analytics) and to improve user experience. You may disable cookies in your browser settings. Disabling analytics cookies does not affect your ability to use the website. We do not use advertising or tracking cookies.</p>
              </div>

              <div>
                <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>6. Data Retention</h2>
                <p>We retain personal data for as long as necessary to provide our services or as required by applicable law. Enquiry records are typically retained for 3 years. You may request deletion of your data at any time.</p>
              </div>

              <div>
                <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>7. Your Rights</h2>
                <p>You have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your data; opt-out of marketing communications at any time. To exercise these rights, email us at <a href="mailto:privacy@gulfoflex.com" className="text-orange-600 hover:text-orange-600 transition-colors">privacy@gulfoflex.com</a>.</p>
              </div>

              <div>
                <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>8. Security</h2>
                <p>We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, loss, or misuse. Our website uses HTTPS encryption for all data transmissions.</p>
              </div>

              <div>
                <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>9. Contact</h2>
                <p>For privacy-related enquiries, please contact our Data Privacy Officer at:</p>
                <div className="mt-3 glass-card rounded-xl border border-neutral-200 p-5">
                  <p className="text-neutral-900 font-semibold">Rubber World Industry LLC</p>
                  <p>P.O. Box 2435, New Industrial Area, Ajman, UAE</p>
                  <a href="mailto:privacy@gulfoflex.com" className="text-orange-600 hover:text-orange-600 transition-colors">privacy@gulfoflex.com</a>
                </div>
              </div>

            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
