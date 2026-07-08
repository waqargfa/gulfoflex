import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import ContactSidebar from "@/components/layout/ContactSidebar";
import GlobalPresence from "@/components/home/GlobalPresence";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Gulf-O-Flex® | Technical Support & Sales Enquiries",
  description:
    "Contact Gulf-O-Flex® for product enquiries, technical support, and quote requests. Head Office in Ajman, UAE. Phone: +971 6 743 4176. Email: info@gulfoflex.com",
  alternates: { canonical: "https://gulfoflex.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 md:pt-24 pb-8 md:pb-10" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1584060245918-3bb6fbcf2f7b?auto=format&fit=crop&w=2400&q=80" focalY="40%" />
        <div className="container-wide relative z-10">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">Contact</span>
          </nav>
          <div className="eyebrow mb-6"><span className="eyebrow-dot" />Get In Touch · Reply within 24 hrs</div>
          <h1 className="text-neutral-900 leading-[1.05] mb-6 max-w-4xl"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
            Let&rsquo;s engineer your{" "}
            <span className="gradient-text">next project</span> <span className="serif-italic text-orange-600">together.</span>
          </h1>
          <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-3xl">
            From product enquiries and technical specifications to sample requests and distributor information - our team is ready to help.
          </p>
        </div>
      </section>

      {/* ── Contact section ── */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl border bg-white p-8 lg:p-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.10)]"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="eyebrow mb-4"><span className="eyebrow-dot" />Send a message</div>
                <h2 className="text-neutral-900 leading-[1.05] mb-2"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.4vw, 2rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
                  Tell us about your <span className="serif-italic text-orange-600">project</span>.
                </h2>
                <p className="text-neutral-500 text-sm mb-8">We&rsquo;ll route your enquiry to the right specialist and get back to you within one business day.</p>

                <ContactForm />
              </div>
            </div>

            {/* Sidebar */}
            <ContactSidebar />
          </div>
        </div>
      </section>

      {/* ── Global Presence section ── */}
      <GlobalPresence />
    </>
  );
}
