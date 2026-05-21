"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Globe, MessageCircle, ArrowRight } from "lucide-react";
import { useCountry } from "@/context/CountryContext";

export default function ContactSidebar() {
  const { country } = useCountry();

  const offices = [
    {
      title: "Head Office & Manufacturing",
      address: country.address,
      phone: country.phone,
      phoneHref: country.phoneHref,
      email: country.email,
      hours: "Sun – Thu: 8:00 AM – 6:00 PM",
      primary: true,
    },
    {
      title: "Sales & Export Enquiries",
      address: "Same as Head Office",
      phone: country.phone,
      phoneHref: country.phoneHref,
      email: `sales@gulfoflex.com`,
      hours: "Sun – Thu: 8:00 AM – 6:00 PM",
      primary: false,
    },
    {
      title: "Technical Support",
      address: "GOF Assist Platform",
      phone: country.phone,
      phoneHref: country.phoneHref,
      email: "technical@gulfoflex.com",
      hours: "24/7 via GOF Assist",
      primary: false,
    },
  ];

  return (
    <div className="lg:col-span-2 space-y-4">
      {offices.map((o, i) => (
        <div
          key={i}
          className={`relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5 ${
            o.primary
              ? "bg-gradient-to-br from-orange-50 to-white shadow-[0_20px_50px_-20px_rgba(234,88,12,0.30)]"
              : "bg-white hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.10)]"
          }`}
          style={{ borderColor: o.primary ? "rgba(249,115,22,0.30)" : "rgba(0,0,0,0.06)" }}
        >
          {o.primary && (
            <div className="absolute top-4 right-4 inline-flex items-center gap-1 text-[9px] font-bold tracking-[0.18em] uppercase text-orange-700 bg-white border border-orange-200 px-2 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Primary
            </div>
          )}
          <div
            className="text-neutral-900 font-bold mb-4 pr-20"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
          >
            {o.title}
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin size={15} className="text-orange-600 mt-0.5 flex-shrink-0" />
              <span className="text-neutral-700 text-sm">{o.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={15} className="text-orange-600 flex-shrink-0" />
              <a
                href={o.phoneHref}
                className="text-neutral-700 text-sm hover:text-orange-600 transition-colors"
              >
                {o.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={15} className="text-orange-600 flex-shrink-0" />
              <a
                href={`mailto:${o.email}`}
                className="text-neutral-700 text-sm hover:text-orange-600 transition-colors"
              >
                {o.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={15} className="text-orange-600 flex-shrink-0" />
              <span className="text-neutral-500 text-xs">{o.hours}</span>
            </div>
          </div>
        </div>
      ))}

      <div
        className="rounded-2xl border bg-white p-6"
        style={{ borderColor: "rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))",
              border: "1px solid rgba(249,115,22,0.20)",
            }}
          >
            <Globe size={16} className="text-orange-600" />
          </div>
          <span
            className="text-neutral-900 font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            GOF Assist AI
          </span>
        </div>
        <p className="text-neutral-500 text-sm mb-4">
          Get instant technical answers, product calculations, and compliance reports — 24/7.
        </p>
        <Link
          href="https://gulfoflexassist.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full justify-center text-sm"
        >
          Launch GOF Assist <ArrowRight size={14} />
        </Link>
      </div>

      <a
        href={country.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-2xl border bg-white p-6 hover:border-emerald-300 hover:shadow-[0_20px_40px_-20px_rgba(16,185,129,0.30)] transition-all"
        style={{ borderColor: "rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <MessageCircle size={16} className="text-emerald-600" />
          </div>
          <span
            className="text-neutral-900 font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            WhatsApp us
          </span>
        </div>
        <p className="text-neutral-500 text-sm">
          Send a quick message — we typically reply in minutes during business hours.
        </p>
      </a>
    </div>
  );
}
