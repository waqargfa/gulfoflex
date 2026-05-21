import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const footerProducts = [
  { name: "Gulf-O-Flex NBR", href: "/products/nbr" },
  { name: "Gulf-O-Flex XLPE", href: "/products/xlpe" },
  { name: "Gulf-O-Flex Sound", href: "/products/sound" },
  { name: "Gulf-O-Flex Aluglass", href: "/products/aluglass" },
  { name: "Gulf-O-Flex Aluclad", href: "/products/aluclad" },
  { name: "Accessories", href: "/products/accessories" },
];

const footerCompany = [
  { name: "About Us", href: "/about" },
  { name: "Technologies", href: "/technologies" },
  { name: "Certifications", href: "/certifications" },
  { name: "Projects", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "News & Media", href: "/news" },
];

const footerIndustries = [
  { name: "HVAC & MEP", href: "/industries/hvac" },
  { name: "Oil & Gas", href: "/industries/oil-gas" },
  { name: "Marine", href: "/industries/marine" },
  { name: "Construction", href: "/industries/construction" },
  { name: "District Cooling", href: "/industries/district-cooling" },
  { name: "Industrial Plants", href: "/industries/industrial" },
];

const certLogos = ["ISO 9001", "ISO 14001", "FM Approved", "CE Marked", "Gulf Mark", "LPCB"];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200">
      {/* CTA Banner — premium dark */}
      <div className="relative overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 grid-bg opacity-[0.10]" />
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-500/22 blur-[90px] pointer-events-none" />
        <div className="absolute -right-32 top-0 w-80 h-80 rounded-full bg-orange-500/10 blur-[80px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <div className="container-wide py-12 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-orange-300 border border-orange-500/35 bg-orange-500/12 px-2.5 py-1 rounded-full mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                Start Your Project
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-1.5 leading-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.035em" }}>
                Ready to engineer your{" "}
                <span className="serif-italic text-orange-400">next insulation solution?</span>
              </h2>
              <p className="text-white/55 text-sm">
                Get customized recommendations and expert guidance for your project.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link href="/contact" className="btn-primary text-sm px-5 py-2.5">
                Request a Quote <ArrowRight size={14} />
              </Link>
              <a href="tel:+97167434176" className="btn-ghost text-sm px-5 py-2.5" style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.18)" }}>
                <Phone size={13} /> Call Us
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      </div>

      {/* Main footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image
                  src="/images/logos/gof-emblem.png"
                  alt="Gulf-O-Flex logo"
                  fill
                  className="object-contain"
                  sizes="44px"
                />
              </div>
              <div>
                <div className="text-neutral-900 font-bold text-xl leading-none" style={{ fontFamily: "var(--font-display)" }}>
                  Gulf-O-Flex<span className="text-orange-500">®</span>
                </div>
                <div className="text-neutral-500 text-[10px] tracking-[0.15em] uppercase font-semibold mt-0.5">
                  Rubber World Industry
                </div>
              </div>
            </Link>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6 max-w-sm">
              Pioneer in closed-cell elastomeric NBR rubber insulation. Manufacturing excellence since 1993 in the UAE, serving HVAC, Oil & Gas, Marine and industrial sectors across 90+ countries.
            </p>
            <div className="space-y-3 mb-8">
              <a href="tel:+97167434176" className="flex items-center gap-3 text-sm text-neutral-500 hover:text-orange-600 transition-colors group">
                <Phone size={15} className="text-orange-500 flex-shrink-0" />
                +971 6 743 4176
              </a>
              <a href="mailto:info@gulfoflex.com" className="flex items-center gap-3 text-sm text-neutral-500 hover:text-orange-600 transition-colors">
                <Mail size={15} className="text-orange-500 flex-shrink-0" />
                info@gulfoflex.com
              </a>
              <div className="flex items-start gap-3 text-sm text-neutral-500">
                <MapPin size={15} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <span>P.O. Box 2435, New Industrial Area,<br />Ajman, UAE</span>
              </div>
            </div>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: FacebookIcon, href: "https://www.facebook.com/gulfoflex/", label: "Facebook" },
                { icon: InstagramIcon, href: "https://www.instagram.com/rubberworldindustry/", label: "Instagram" },
                { icon: LinkedinIcon, href: "https://www.linkedin.com/company/rubber-world-industries-l-l-c-", label: "LinkedIn" },
                { icon: XIcon, href: "https://twitter.com/Gulfoflex", label: "X (Twitter)" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-orange-500/20 hover:border-orange-500/30 transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <h3 className="text-neutral-900 font-bold text-xs tracking-[0.18em] uppercase" style={{ fontFamily: "var(--font-syne)" }}>
                Products
              </h3>
            </div>
            <ul className="space-y-3">
              {footerProducts.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-neutral-500 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-orange-500/40 group-hover:bg-orange-500 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <h3 className="text-neutral-900 font-bold text-xs tracking-[0.18em] uppercase" style={{ fontFamily: "var(--font-syne)" }}>
                Industries
              </h3>
            </div>
            <ul className="space-y-3">
              {footerIndustries.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-neutral-500 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-orange-500/40 group-hover:bg-orange-500 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <h3 className="text-neutral-900 font-bold text-xs tracking-[0.18em] uppercase" style={{ fontFamily: "var(--font-syne)" }}>
                Company
              </h3>
            </div>
            <ul className="space-y-3">
              {footerCompany.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-neutral-500 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-orange-500/40 group-hover:bg-orange-500 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <h3 className="text-neutral-900 font-bold text-xs tracking-[0.18em] uppercase" style={{ fontFamily: "var(--font-syne)" }}>
                  Certifications
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {certLogos.map((cert) => (
                  <span key={cert} className="tag text-[9px]">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200/60">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500" suppressHydrationWarning>
            © {new Date().getFullYear()} Gulf-O-Flex® · Rubber World Industry LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-neutral-500 text-[10px]">
            <span className="w-1 h-1 rounded-full bg-orange-500/50" />
            <span className="text-neutral-500 font-medium">Member of Shaikhani Group · Est. 1993 · Ajman, UAE</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-neutral-500">
            <Link href="/privacy-policy" className="hover:text-neutral-700 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-700 transition-colors">Terms of Use</Link>
            <Link href="/sitemap.xml" className="hover:text-neutral-700 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
