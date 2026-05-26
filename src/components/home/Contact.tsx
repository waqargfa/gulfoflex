"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, MessageCircle, Clock, Headphones } from "lucide-react";
import { useCountry } from "@/context/CountryContext";

export default function Contact() {
  const { country } = useCountry();

  const contactOptions = [
    {
      icon: Phone,
      title: "Call Us",
      value: country.phone,
      action: country.phoneHref,
      color: "text-orange-600",
      bg: "bg-orange-500/8",
      border: "border-orange-500/20",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: country.email,
      action: `mailto:${country.email}`,
      color: "text-blue-500",
      bg: "bg-blue-500/8",
      border: "border-blue-500/20",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "Chat with us",
      action: country.whatsappHref,
      color: "text-green-500",
      bg: "bg-green-500/8",
      border: "border-green-500/20",
    },
    {
      icon: Headphones,
      title: "GOF Assist",
      value: "AI Technical Help",
      action: "https://gulfoflexassist.com",
      color: "text-purple-500",
      bg: "bg-purple-500/8",
      border: "border-purple-500/20",
    },
  ];

  return (
    <section className="py-16 bg-neutral-50 relative overflow-hidden" aria-labelledby="contact-heading">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px tech-divider" />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 reveal">
          <div className="eyebrow justify-center mb-4">
            <span className="eyebrow-dot" />
            Get in Touch
          </div>
          <h2
            id="contact-heading"
            className="text-neutral-900 mb-3 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 700, letterSpacing: "-0.03em" }}
          >
            Let&rsquo;s build your{" "}
            <span className="serif-italic text-orange-600">next project.</span>
          </h2>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Our technical team is ready to assist with product selection, project calculations, and customized solutions.
          </p>
        </div>

        {/* Two-column: form + sidebar */}
        <div className="grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-6 reveal">

          {/* Form card */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-neutral-900 font-bold text-lg leading-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>
                  Request a Quote
                </h3>
                <p className="text-neutral-400 text-xs mt-0.5">We respond within 1 business day</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-500/8 border border-green-500/20 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Online
              </div>
            </div>

            <form
              action="/api/contact"
              method="POST"
              className="space-y-4"
              onSubmit={(e) => { e.preventDefault(); }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Full Name *</label>
                  <input type="text" required name="name" placeholder="Your full name"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 text-sm placeholder-neutral-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Company</label>
                  <input type="text" name="company" placeholder="Company name"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 text-sm placeholder-neutral-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Email *</label>
                  <input type="email" required name="email" placeholder="your@email.com"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 text-sm placeholder-neutral-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Phone</label>
                  <input type="tel" name="phone" placeholder="+971 ..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 text-sm placeholder-neutral-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Product Interest</label>
                  <select name="product"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 text-sm focus:outline-none focus:border-orange-400 transition-all duration-200 appearance-none">
                    <option value="">Select a product...</option>
                    <option value="nbr">Gulf-O-Flex NBR</option>
                    <option value="xlpe">Gulf-O-Flex XLPE</option>
                    <option value="sound">Gulf-O-Flex Sound</option>
                    <option value="aluglass">Gulf-O-Flex Aluglass</option>
                    <option value="aluclad">Gulf-O-Flex Aluclad</option>
                    <option value="accessories">Accessories</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Project Details</label>
                  <textarea name="message" rows={1} placeholder="Brief project description..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 text-sm placeholder-neutral-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200 resize-none" />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full justify-center py-3 text-sm mt-1">
                Send Inquiry <ArrowRight size={15} />
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Contact channels */}
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3">Reach Us Directly</p>
              <div className="space-y-2">
                {contactOptions.map((opt) => (
                  <a
                    key={opt.title}
                    href={opt.action}
                    target={opt.action.startsWith("http") ? "_blank" : undefined}
                    rel={opt.action.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`group flex items-center gap-3 p-2.5 rounded-xl border ${opt.border} ${opt.bg} hover:shadow-sm transition-all duration-200`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-white border ${opt.border} flex items-center justify-center shrink-0`}>
                      <opt.icon size={14} className={opt.color} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-neutral-500 leading-none mb-0.5">{opt.title}</p>
                      <p className={`text-xs font-semibold ${opt.color} truncate`}>{opt.value}</p>
                    </div>
                    <ArrowRight size={12} className={`${opt.color} ml-auto shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Office info */}
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3">Head Office</p>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <MapPin size={13} className="text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-neutral-800">Rubber World Industry LLC</p>
                    <p className="text-xs text-neutral-500 leading-relaxed">{country.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock size={13} className="text-orange-500 shrink-0" />
                  <p className="text-xs text-neutral-500">Mon – Fri: 8:00 AM – 5:00 PM GST</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <Link href="/contact" className="btn-primary justify-center py-2.5 text-sm">
              Full Contact Page <ArrowRight size={14} />
            </Link>
            <Link href="/distributors" className="flex items-center justify-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors py-1">
              Find a Distributor <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
