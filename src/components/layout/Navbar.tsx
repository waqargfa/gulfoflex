"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  ArrowRight,
  Zap,
  Shield,
  Layers,
  Package,
  Globe,
  Award,
  FileText,
  Users,
  Building2,
  Wrench,
} from "lucide-react";
import { useCountry } from "@/context/CountryContext";

const products = [
  {
    name: "Gulf-O-Flex NBR",
    desc: "Closed-cell elastomeric rubber insulation",
    href: "/products/nbr",
    icon: Layers,
  },
  {
    name: "Gulf-O-Flex XLPE",
    desc: "Cross-linked polyethylene foam insulation",
    href: "/products/xlpe",
    icon: Zap,
  },
  {
    name: "Gulf-O-Flex Sound",
    desc: "Premium acoustic insulation solutions",
    href: "/products/sound",
    icon: Shield,
  },
  {
    name: "Gulf-O-Flex Aluglass",
    desc: "Aluminum glass fibre reinforced facing",
    href: "/products/aluglass",
    icon: Package,
  },
  {
    name: "Gulf-O-Flex Aluclad",
    desc: "Aluminum cladding & jacketing systems",
    href: "/products/aluclad",
    icon: Wrench,
  },
  {
    name: "Accessories",
    desc: "Tapes, glues and installation accessories",
    href: "/products/accessories",
    icon: Package,
  },
];

const industries = [
  { name: "HVAC & MEP", href: "/industries/hvac", icon: Building2 },
  { name: "Oil & Gas", href: "/industries/oil-gas", icon: Zap },
  { name: "Marine", href: "/industries/marine", icon: Globe },
  { name: "Construction", href: "/industries/construction", icon: Building2 },
  { name: "District Cooling", href: "/industries/district-cooling", icon: Shield },
  { name: "Industrial Plants", href: "/industries/industrial", icon: Wrench },
];

const company = [
  { name: "About Us", href: "/about", icon: Users },
  { name: "Certifications", href: "/certifications", icon: Award },
  { name: "Projects", href: "/projects", icon: FileText },
  { name: "Downloads", href: "/downloads", icon: FileText },
  { name: "News & Media", href: "/news", icon: FileText },
  { name: "Careers", href: "/careers", icon: Users },
];

const navLinks = [
  { name: "Products", href: "/products", mega: "products" },
  { name: "Industries", href: "/industries", mega: "industries" },
  { name: "Technologies", href: "/technologies" },
  { name: "Company", href: "/about", mega: "company" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [countryOpen, setCountryOpen] = useState(false);
  const { country: selectedCountry, setCountry: setSelectedCountry, countries } = useCountry();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-white border-b border-neutral-200/60 text-xs text-neutral-500">
        <div className="container-wide flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="orange-dot" style={{ width: 5, height: 5 }} />
              {selectedCountry.tagline}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href={selectedCountry.phoneHref} className="flex items-center gap-1.5 hover:text-orange-600 transition-colors">
              <Phone size={11} />
              {selectedCountry.phone}
            </a>
            <a href={`mailto:${selectedCountry.email}`} className="flex items-center gap-1.5 hover:text-orange-600 transition-colors">
              <Mail size={11} />
              {selectedCountry.email}
            </a>
            <div ref={countryRef} className="relative">
              <button
                onClick={() => setCountryOpen(!countryOpen)}
                className="flex items-center gap-1.5 hover:text-orange-600 transition-colors font-medium border-l border-neutral-200 pl-5"
              >
                <span className="text-sm leading-none">{selectedCountry.flag}</span>
                <span>{selectedCountry.name}</span>
                <ChevronDown
                  size={11}
                  className={cn("transition-transform duration-200", countryOpen ? "rotate-180 text-orange-600" : "")}
                />
              </button>
              {countryOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-40 bg-white border border-neutral-200 rounded-xl shadow-[0_8px_30px_rgba(10,10,10,0.10)] py-1 z-50 animate-[fadeUp_0.15s_ease_forwards]">
                  {countries.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { setSelectedCountry(c); setCountryOpen(false); }}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3.5 py-2 text-xs transition-colors hover:bg-neutral-50",
                        selectedCountry.code === c.code ? "text-orange-600 font-semibold bg-orange-50/60" : "text-neutral-700"
                      )}
                    >
                      <span className="text-sm">{c.flag}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        ref={navRef}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "bg-neutral-50/95 backdrop-blur-xl border-b border-neutral-200 shadow-[0_4px_30px_rgba(10,10,10,0.08)]"
            : "bg-neutral-50/80 backdrop-blur-md border-b border-neutral-200/60"
        )}
      >
        <div className="container-wide">
          <nav className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/logos/gof-emblem.png"
                  alt="Gulf-O-Flex logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <div className="whitespace-nowrap">
                <div className="text-neutral-900 font-bold text-lg leading-none tracking-tight" style={{ fontFamily: "var(--font-syne), system-ui, sans-serif" }}>
                  Gulf-O-Flex<span className="text-orange-500">®</span>
                </div>
                <div className="hidden sm:block text-neutral-500 text-[10px] tracking-[0.15em] uppercase font-semibold leading-none mt-1">
                  Rubber World Industry
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.mega ? handleMouseEnter(link.mega) : undefined}
                  onMouseLeave={link.mega ? handleMouseLeave : undefined}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                      pathname === link.href || pathname.startsWith(link.href + "/")
                        ? "text-orange-600"
                        : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100"
                    )}
                  >
                    {link.name}
                    {link.mega && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          activeMenu === link.mega ? "rotate-180 text-orange-600" : ""
                        )}
                      />
                    )}
                  </Link>

                  {/* Mega menu */}
                  {link.mega === "products" && activeMenu === "products" && (
                    <MegaMenuProducts onMouseEnter={() => handleMouseEnter("products")} onMouseLeave={handleMouseLeave} />
                  )}
                  {link.mega === "industries" && activeMenu === "industries" && (
                    <MegaMenuIndustries onMouseEnter={() => handleMouseEnter("industries")} onMouseLeave={handleMouseLeave} />
                  )}
                  {link.mega === "company" && activeMenu === "company" && (
                    <MegaMenuCompany onMouseEnter={() => handleMouseEnter("company")} onMouseLeave={handleMouseLeave} />
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link href="/gulf-o-flex-assist" className="hidden xl:inline-flex items-center gap-1 text-sm text-neutral-700 hover:text-orange-600 font-semibold transition-colors px-3 whitespace-nowrap">
                GOF Assist <span className="text-orange-500">✦</span>
              </Link>
              <Link href="/contact" className="btn-primary text-xs py-2.5 px-5 whitespace-nowrap">
                Get a Quote
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-neutral-900"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          mobileOpen ? "visible" : "invisible"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-80 max-w-full bg-white border-l border-neutral-200 flex flex-col transition-transform duration-400",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-5 border-b border-neutral-200">
            <span className="font-bold text-lg text-neutral-900" style={{ fontFamily: "var(--font-syne)" }}>
              Gulf-O-Flex<span className="text-orange-500">®</span>
            </span>
            <button onClick={() => setMobileOpen(false)} className="p-1 text-neutral-500 hover:text-neutral-900">
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.mega ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === link.mega ? null : (link.mega ?? null))}
                      className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100"
                    >
                      {link.name}
                      <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform",
                          mobileExpanded === link.mega ? "rotate-180 text-orange-600" : ""
                        )}
                      />
                    </button>
                    {mobileExpanded === link.mega && (
                      <div className="bg-neutral-50 border-y border-neutral-200/60">
                        {(link.mega === "products" ? products : link.mega === "industries" ? industries : company).map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-8 py-3 text-sm text-neutral-500 hover:text-neutral-900"
                          >
                            <ArrowRight size={12} className="text-orange-500" />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center px-5 py-3.5 text-sm font-semibold text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="p-5 border-t border-neutral-200 space-y-3">
            <div className="flex flex-wrap gap-1.5 pb-1">
              {countries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSelectedCountry(c)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                    selectedCountry.code === c.code
                      ? "bg-orange-50 border-orange-300 text-orange-700"
                      : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-orange-300 hover:text-orange-600"
                  )}
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
            <a href="tel:+97167434176" className="flex items-center gap-2 text-sm text-neutral-500">
              <Phone size={14} className="text-orange-500" />
              +971 6 743 4176
            </a>
            <Link href="/contact" className="btn-primary w-full justify-center text-xs py-3">
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function MegaMenuProducts({ onMouseEnter, onMouseLeave }: { onMouseEnter: () => void; onMouseLeave: () => void }) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white/98 backdrop-blur-2xl rounded-2xl border border-neutral-200 shadow-[0_24px_80px_rgba(10,10,10,0.12)] p-6 animate-[fadeUp_0.2s_ease_forwards]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center gap-2 mb-5">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-orange-600 border border-orange-500/30 bg-orange-500/8 px-2.5 py-1 rounded-full">
          <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
          Our Product Range
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {products.map((p) => (
          <Link
            key={p.name}
            href={p.href}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-100 transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
              <p.icon size={16} className="text-orange-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-neutral-900 group-hover:text-orange-600 transition-colors">{p.name}</div>
              <div className="text-xs text-neutral-500 mt-0.5 leading-snug">{p.desc}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="tech-divider mt-5 mb-4" />
      <Link href="/products" className="flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-600 transition-colors">
        View all products <ArrowRight size={14} />
      </Link>
    </div>
  );
}

function MegaMenuIndustries({ onMouseEnter, onMouseLeave }: { onMouseEnter: () => void; onMouseLeave: () => void }) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[400px] bg-white/98 backdrop-blur-2xl rounded-2xl border border-neutral-200 shadow-[0_24px_80px_rgba(10,10,10,0.12)] p-6 animate-[fadeUp_0.2s_ease_forwards]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center gap-2 mb-5">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-orange-600 border border-orange-500/30 bg-orange-500/8 px-2.5 py-1 rounded-full">
          <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
          Industries We Serve
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {industries.map((ind) => (
          <Link
            key={ind.name}
            href={ind.href}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-100 transition-all duration-200 group"
          >
            <ind.icon size={15} className="text-orange-600" />
            <span className="text-sm font-medium text-neutral-800 group-hover:text-neutral-900 transition-colors">{ind.name}</span>
          </Link>
        ))}
      </div>
      <div className="tech-divider mt-4 mb-3" />
      <Link href="/industries" className="flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-600 transition-colors">
        All industries <ArrowRight size={14} />
      </Link>
    </div>
  );
}

function MegaMenuCompany({ onMouseEnter, onMouseLeave }: { onMouseEnter: () => void; onMouseLeave: () => void }) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[320px] bg-white/98 backdrop-blur-2xl rounded-2xl border border-neutral-200 shadow-[0_24px_80px_rgba(10,10,10,0.12)] p-6 animate-[fadeUp_0.2s_ease_forwards]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center gap-2 mb-5">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-orange-600 border border-orange-500/30 bg-orange-500/8 px-2.5 py-1 rounded-full">
          <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
          Company
        </span>
      </div>
      <div className="space-y-1">
        {company.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-100 transition-all duration-200 group"
          >
            <item.icon size={15} className="text-orange-600" />
            <span className="text-sm font-medium text-neutral-800 group-hover:text-neutral-900 transition-colors">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
