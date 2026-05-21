import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, MessageCircle, Clock, Globe, Send } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Contact Gulf-O-Flex® | Technical Support & Sales Enquiries",
  description:
    "Contact Gulf-O-Flex® for product enquiries, technical support, and quote requests. Head Office in Ajman, UAE. Phone: +971 6 743 4176. Email: info@gulfoflex.com",
  alternates: { canonical: "https://gulfoflex.com/contact" },
};

const offices = [
  {
    title: "Head Office & Manufacturing",
    address: "P.O. Box 2435, New Industrial Area, Ajman, UAE",
    phone: "+971 6 743 4176",
    email: "info@gulfoflex.com",
    hours: "Sun – Thu: 8:00 AM – 6:00 PM GST",
    primary: true,
  },
  {
    title: "Sales & Export Enquiries",
    address: "Same as Head Office",
    phone: "+971 6 743 4176",
    email: "sales@gulfoflex.com",
    hours: "Sun – Thu: 8:00 AM – 6:00 PM GST",
    primary: false,
  },
  {
    title: "Technical Support",
    address: "GOF Assist Platform",
    phone: "+971 6 743 4176",
    email: "technical@gulfoflex.com",
    hours: "24/7 via GOF Assist",
    primary: false,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-20" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=80" focalY="40%" />
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
            <div className="lg:col-span-2 space-y-4">
              {offices.map((o, i) => (
                <div key={i}
                  className={`relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5 ${o.primary ? "bg-gradient-to-br from-orange-50 to-white shadow-[0_20px_50px_-20px_rgba(234,88,12,0.30)]" : "bg-white hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.10)]"}`}
                  style={{ borderColor: o.primary ? "rgba(249,115,22,0.30)" : "rgba(0,0,0,0.06)" }}>
                  {o.primary && (
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1 text-[9px] font-bold tracking-[0.18em] uppercase text-orange-700 bg-white border border-orange-200 px-2 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Primary
                    </div>
                  )}
                  <div className="text-neutral-900 font-bold mb-4 pr-20" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>{o.title}</div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin size={15} className="text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700 text-sm">{o.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={15} className="text-orange-600 flex-shrink-0" />
                      <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="text-neutral-700 text-sm hover:text-orange-600 transition-colors">{o.phone}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={15} className="text-orange-600 flex-shrink-0" />
                      <a href={`mailto:${o.email}`} className="text-neutral-700 text-sm hover:text-orange-600 transition-colors">{o.email}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={15} className="text-orange-600 flex-shrink-0" />
                      <span className="text-neutral-500 text-xs">{o.hours}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border bg-white p-6" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))", border: "1px solid rgba(249,115,22,0.20)" }}>
                    <Globe size={16} className="text-orange-600" />
                  </div>
                  <span className="text-neutral-900 font-bold" style={{ fontFamily: "var(--font-display)" }}>GOF Assist AI</span>
                </div>
                <p className="text-neutral-500 text-sm mb-4">Get instant technical answers, product calculations, and compliance reports — 24/7.</p>
                <Link href="https://gulfoflexassist.com" target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center text-sm">
                  Launch GOF Assist <ArrowRight size={14} />
                </Link>
              </div>

              <a href="https://wa.me/97167434176" target="_blank" rel="noopener noreferrer"
                className="block rounded-2xl border bg-white p-6 hover:border-emerald-300 hover:shadow-[0_20px_40px_-20px_rgba(16,185,129,0.30)] transition-all"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <MessageCircle size={16} className="text-emerald-600" />
                  </div>
                  <span className="text-neutral-900 font-bold" style={{ fontFamily: "var(--font-display)" }}>WhatsApp us</span>
                </div>
                <p className="text-neutral-500 text-sm">Send a quick message — we typically reply in minutes during business hours.</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
