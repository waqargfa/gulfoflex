import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Terms of Use | Gulf-O-Flex® — gulfoflex.com",
  description: "Terms of Use for gulfoflex.com — the official website of Rubber World Industry LLC, manufacturer of Gulf-O-Flex® rubber insulation products.",
  alternates: { canonical: "https://gulfoflex.com/terms" },
};

export default function TermsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-16" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2400&q=80" focalY="center" intensity={0.7} />
        <div className="container-wide relative z-10">
          <div className="max-w-4xl">
            <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-700">Terms of Use</span>
            </nav>
            <div className="eyebrow mb-6"><span className="eyebrow-dot" />Legal · Updated January 2025</div>
            <h1 className="text-neutral-900 leading-[0.95] mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
              Terms of <span className="gradient-text">Use</span><span className="serif-italic text-orange-600">.</span>
            </h1>
            <p className="text-neutral-600 text-base">Terms governing the use of gulfoflex.com — operated by Rubber World Industry LLC.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container-wide max-w-3xl">
          <div className="rounded-3xl border bg-white p-8 md:p-12" style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 30px 80px -40px rgba(0,0,0,0.10)" }}>
          <div className="space-y-10 text-neutral-600 leading-relaxed">

            <div>
              <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>1. Acceptance of Terms</h2>
              <p>By accessing and using gulfoflex.com (the &ldquo;Site&rdquo;), you accept and agree to be bound by these Terms of Use. If you do not agree, please do not use the Site. These terms are governed by the laws of the United Arab Emirates.</p>
            </div>

            <div>
              <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>2. Intellectual Property</h2>
              <p>All content on this Site — including text, images, product data, technical specifications, logos, trademarks, and software — is the property of Rubber World Industry LLC or its licensors. Gulf-O-Flex® is a registered trademark. Unauthorized reproduction, distribution, or use of any content is strictly prohibited.</p>
            </div>

            <div>
              <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>3. Technical Information</h2>
              <p>Technical data, specifications, and performance values published on this Site are provided in good faith and based on testing conducted under controlled conditions. Real-world performance may vary depending on installation quality, application conditions, and environmental factors. Gulf-O-Flex® insulation must be installed by qualified professionals in accordance with applicable codes and our technical guidelines. Always consult our technical team for project-specific recommendations.</p>
            </div>

            <div>
              <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>4. Limitation of Liability</h2>
              <p>Rubber World Industry LLC provides this Site on an &ldquo;as-is&rdquo; basis. We make no warranties, express or implied, regarding the accuracy, completeness, or fitness for purpose of information on this Site. We shall not be liable for any direct, indirect, consequential, or incidental damages arising from use of this Site or reliance on its content.</p>
            </div>

            <div>
              <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>5. External Links</h2>
              <p>This Site may contain links to third-party websites. These links are provided for convenience only. Rubber World Industry LLC is not responsible for the content, accuracy, or privacy practices of any linked external sites.</p>
            </div>

            <div>
              <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>6. Product Availability</h2>
              <p>Products shown on this Site are subject to availability and may vary by market. Prices, if indicated, are subject to change without notice. Please contact your local Gulf-O-Flex® distributor or our sales team for current pricing and availability.</p>
            </div>

            <div>
              <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>7. Prohibited Uses</h2>
              <p>You may not use this Site to: transmit harmful, defamatory, or illegal content; attempt unauthorized access to our systems; scrape or harvest data for commercial purposes without written permission; misrepresent your identity or affiliation with Gulf-O-Flex®.</p>
            </div>

            <div>
              <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>8. Amendments</h2>
              <p>We reserve the right to modify these Terms at any time. Continued use of the Site after changes constitutes acceptance of the updated Terms. We recommend reviewing this page periodically.</p>
            </div>

            <div>
              <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>9. Governing Law</h2>
              <p>These Terms are governed by the laws of the Emirate of Ajman and the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of Ajman, UAE.</p>
            </div>

            <div>
              <h2 className="text-neutral-900 font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>10. Contact</h2>
              <p>For questions about these Terms, contact:</p>
              <div className="mt-3 glass-card rounded-xl border border-neutral-200 p-5">
                <p className="text-neutral-900 font-semibold">Rubber World Industry LLC</p>
                <p>P.O. Box 2435, New Industrial Area, Ajman, UAE</p>
                <a href="mailto:legal@gulfoflex.com" className="text-orange-600 hover:text-orange-600 transition-colors">legal@gulfoflex.com</a>
              </div>
            </div>

          </div>
          </div>
        </div>
      </section>
    </>
  );
}
