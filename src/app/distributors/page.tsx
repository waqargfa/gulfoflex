import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, Phone, Mail, MapPin, Globe2 } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Global Distributors | Gulf-O-Flex® Authorized Distribution Network",
  description:
    "Find an authorized Gulf-O-Flex® distributor near you. Our global distribution network spans 90+ countries across the Middle East, Africa, Asia, Europe, and the Americas.",
  alternates: { canonical: "https://gulfoflex.com/distributors" },
};

const regions = [
  {
    name: "GCC & Middle East",
    color: "orange",
    countries: [
      { name: "United Arab Emirates", dist: "Direct - Gulf-O-Flex®", city: "Ajman, Dubai, Abu Dhabi", phone: "+971 6 743 4176", email: "sales@gulfoflex.com" },
      { name: "Saudi Arabia", dist: "Gulf-O-Flex® KSA", city: "Riyadh, Jeddah, Dammam", phone: "+966 11 XXX XXXX", email: "ksa@gulfoflex.com" },
      { name: "Qatar", dist: "Authorized Distributor", city: "Doha", phone: "Contact HQ", email: "info@gulfoflex.com" },
      { name: "Kuwait", dist: "Authorized Distributor", city: "Kuwait City", phone: "Contact HQ", email: "info@gulfoflex.com" },
      { name: "Bahrain", dist: "Authorized Distributor", city: "Manama", phone: "Contact HQ", email: "info@gulfoflex.com" },
      { name: "Oman", dist: "Authorized Distributor", city: "Muscat", phone: "Contact HQ", email: "info@gulfoflex.com" },
    ],
  },
  {
    name: "South Asia",
    color: "neutral",
    countries: [
      { name: "India", dist: "Authorized Distributor", city: "Mumbai, Delhi, Chennai", phone: "Contact HQ", email: "info@gulfoflex.com" },
      { name: "Pakistan", dist: "Authorized Distributor", city: "Karachi, Lahore", phone: "Contact HQ", email: "info@gulfoflex.com" },
      { name: "Bangladesh", dist: "Authorized Distributor", city: "Dhaka", phone: "Contact HQ", email: "info@gulfoflex.com" },
      { name: "Sri Lanka", dist: "Gulf-O-Flex® Manufacturing", city: "Colombo", phone: "Contact HQ", email: "info@gulfoflex.com" },
    ],
  },
  {
    name: "East Asia & Pacific",
    color: "orange",
    countries: [
      { name: "South Korea", dist: "KoreaTech Distribution", city: "Seoul", phone: "Contact HQ", email: "info@gulfoflex.com" },
      { name: "Singapore", dist: "Authorized Distributor", city: "Singapore", phone: "Contact HQ", email: "info@gulfoflex.com" },
      { name: "Malaysia", dist: "Authorized Distributor", city: "Kuala Lumpur", phone: "Contact HQ", email: "info@gulfoflex.com" },
      { name: "Australia", dist: "Authorized Distributor", city: "Sydney, Melbourne", phone: "Contact HQ", email: "info@gulfoflex.com" },
    ],
  },
  {
    name: "Africa",
    color: "neutral",
    countries: [
      { name: "Egypt", dist: "Authorized Distributor", city: "Cairo, Alexandria", phone: "Contact HQ", email: "info@gulfoflex.com" },
      { name: "Nigeria", dist: "Authorized Distributor", city: "Lagos, Abuja", phone: "Contact HQ", email: "info@gulfoflex.com" },
      { name: "Kenya", dist: "Authorized Distributor", city: "Nairobi", phone: "Contact HQ", email: "info@gulfoflex.com" },
      { name: "South Africa", dist: "Authorized Distributor", city: "Johannesburg, Cape Town", phone: "Contact HQ", email: "info@gulfoflex.com" },
    ],
  },
];

export default function DistributorsPage() {
  const totalCountries = regions.reduce((s, r) => s + r.countries.length, 0);
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 md:pt-24 pb-8 md:pb-10" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1538474705339-e87de81450e8?auto=format&fit=crop&w=2400&q=80" focalY="center" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                <span className="text-neutral-300">/</span>
                <span className="text-neutral-700">Distributors</span>
              </nav>
              <div className="eyebrow mb-6"><span className="eyebrow-dot" />Global Distribution · {totalCountries} markets shown</div>
              <h1 className="text-neutral-900 leading-[0.95] mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
                Find a distributor<br />
                <span className="gradient-text">near you</span><span className="serif-italic text-orange-600">.</span>
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                Gulf-O-Flex® products are available through our network of authorized distributors and direct sales offices across 90+ countries worldwide.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/15 to-transparent rounded-[2rem] blur-3xl pointer-events-none" />
              <div className="relative rounded-3xl border bg-white/90 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(234,88,12,0.20)]"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="px-7 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <Globe2 size={14} className="text-orange-600" />
                    <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">Global footprint</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(0,0,0,0.06)" }}>
                  {[{ n: "90+", l: "Countries" }, { n: "200+", l: "Distributors" }, { n: "6", l: "Continents" }, { n: "30+", l: "Years" }].map((s) => (
                    <div key={s.l} className="bg-white p-6">
                      <div className="text-neutral-900 font-black mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)", letterSpacing: "-0.025em" }}>{s.n}</div>
                      <div className="text-neutral-500 text-[10px] uppercase tracking-[0.18em] font-bold">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Regions ── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-wide">
          <div className="space-y-14">
            {regions.map((region, rIdx) => (
              <div key={region.name}>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">0{rIdx + 1} / 0{regions.length}</span>
                  <h2 className="text-neutral-900 font-bold"
                    style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.2vw, 1.85rem)", letterSpacing: "-0.025em" }}>
                    {region.name}
                  </h2>
                  <div className="flex-1 h-px bg-neutral-200" />
                  <span className="text-xs text-neutral-400 font-semibold">{region.countries.length} markets</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {region.countries.map((country) => (
                    <div key={country.name}
                      className="group relative rounded-2xl border bg-white p-6 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(234,88,12,0.30)] hover:border-orange-300/60"
                      style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-neutral-900 font-bold mb-1"
                            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}>
                            {country.name}
                          </h3>
                          <p className="text-xs text-orange-600 font-semibold">{country.dist}</p>
                        </div>
                        <span className="w-9 h-9 rounded-xl flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))", border: "1px solid rgba(249,115,22,0.20)" }}>
                          <Globe size={14} className="text-orange-600" />
                        </span>
                      </div>
                      <div className="space-y-2 pt-4 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                        <div className="flex items-center gap-2 text-xs text-neutral-600">
                          <MapPin size={11} className="text-orange-600 flex-shrink-0" />{country.city}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-600">
                          <Phone size={11} className="text-orange-600 flex-shrink-0" />{country.phone}
                        </div>
                        <a href={`mailto:${country.email}`} className="flex items-center gap-2 text-xs text-neutral-600 hover:text-orange-600 transition-colors">
                          <Mail size={11} className="text-orange-600 flex-shrink-0" />{country.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
            <span className="eyebrow-dot" />Distribution Partners
          </div>
          <h2 className="text-white leading-[1.05] mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            Become an authorized<br /><span className="serif-italic text-orange-400">Gulf-O-Flex® distributor.</span>
          </h2>
          <p className="text-white/55 max-w-xl mx-auto mb-8">
            We are actively looking for distribution partners in underserved markets. Exclusive territorial rights, full technical training, and marketing support available.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/contact" className="btn-primary">
              Apply for Distributorship <ArrowRight size={16} />
            </Link>
            <a href="mailto:sales@gulfoflex.com" className="btn-ghost"
              style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.18)" }}>
              <Mail size={15} /> sales@gulfoflex.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
