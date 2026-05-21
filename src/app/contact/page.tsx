import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import ContactSidebar from "@/components/layout/ContactSidebar";

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
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-20" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1584060245918-3bb6fbcf2f7b?auto=format&fit=crop&w=2400&q=80" focalY="40%" />
        <div className="container-wide relative z-10">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">Contact</span>
          </nav>
          <div className="eyebrow mb-6"><span className="eyebrow-dot" />Get In Touch · Reply within 24 hrs</div>
          <h1 className="text-neutral-900 leading-[0.95] mb-6 max-w-4xl"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
            Let&rsquo;s engineer your<br />
            <span className="gradient-text">next project</span> <span className="serif-italic text-orange-600">together.</span>
          </h1>
          <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-3xl">
            From product enquiries and technical specifications to sample requests and distributor information — our team is ready to help.
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

                <form className="space-y-5" action="#" method="POST" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.18em] mb-2" htmlFor="name">
                        Full Name <span className="text-orange-600">*</span>
                      </label>
                      <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your full name"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.18em] mb-2" htmlFor="company">Company</label>
                      <input id="company" name="company" type="text" autoComplete="organization" placeholder="Company name"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.18em] mb-2" htmlFor="email">
                        Email Address <span className="text-orange-600">*</span>
                      </label>
                      <input id="email" name="email" type="email" required autoComplete="email" placeholder="your@email.com"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.18em] mb-2" htmlFor="phone">Phone Number</label>
                      <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+971 xx xxx xxxx"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.18em] mb-2" htmlFor="product">Product of Interest</label>
                    <select id="product" name="product"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-700 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition">
                      <option value="">Select a product…</option>
                      <option value="nbr">Gulf-O-Flex® NBR</option>
                      <option value="xlpe">Gulf-O-Flex® XLPE</option>
                      <option value="sound">Gulf-O-Flex® Sound</option>
                      <option value="aluglass">Gulf-O-Flex® Aluglass</option>
                      <option value="aluclad">Gulf-O-Flex® Aluclad</option>
                      <option value="accessories">Accessories & Adhesives</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.18em] mb-2" htmlFor="message">
                      Message <span className="text-orange-600">*</span>
                    </label>
                    <textarea id="message" name="message" required rows={5} placeholder="Describe your project, application, or question…"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition resize-none" />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    Send Message <Send size={16} />
                  </button>
                  <p className="text-[11px] text-neutral-400 text-center">By sending you agree to our privacy policy. We never share your data.</p>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <ContactSidebar />
          </div>
        </div>
      </section>
    </>
  );
}
