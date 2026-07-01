"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight,
  Thermometer, Volume2, Layers, Wrench, ZapIcon, Package,
  ShieldCheck, Award, CheckCircle2,
} from "lucide-react";

const CYCLE_MS = 5000;

const products = [
  {
    id: "nbr",
    name: "Gulf-O-Flex® NBR",
    short: "NBR",
    category: "Thermal & Acoustic",
    tagline: "Closed-cell elastomeric rubber insulation - the industry benchmark for thermal efficiency, moisture resistance, and acoustic performance across HVAC and industrial environments.",
    features: ["−40°C to +105°C", "FM Approved", "Versatile & flexible"],
    icon: Thermometer,
    images: [
      "/images/products/nbr/White NBR_C10009.png",
      "/images/products/nbr/White NBR_C20009.png",
      "/images/products/nbr/White NBR_C30009.png",
      "/images/products/nbr/White NBR_C40009.png",
    ],
    image: "/images/products/nbr/White NBR_C10009.png",
    href: "/products/nbr",
    badge: "Best Seller",
  },
  {
    id: "xlpe",
    name: "Gulf-O-Flex® XLPE",
    short: "XLPE",
    category: "Cross-Linked Polyethylene",
    tagline: "Superior compressive strength, chemical resistance, and excellent thermal properties for demanding industrial and marine applications worldwide.",
    features: ["Aesthetic Finish", "Free from VOC", "Excellent UV"],
    icon: Layers,
    images: [
      "/images/products/xlpe/xlpe.png",
      "/images/products/xlpe/xlpe-2.png",
      "/images/products/xlpe/xlpe-3.png",
      "/images/products/xlpe/xlpe-4.png",
    ],
    image: "/images/products/xlpe/xlpe.png",
    href: "/products/xlpe",
    badge: "Industrial Grade",
  },
  {
    id: "sound",
    name: "Gulf-O-Flex® Sound",
    short: "SND",
    category: "Acoustic Insulation",
    tagline: "Engineered for superior sound attenuation in mechanical rooms, duct systems, and industrial environments - combining thermal and acoustic performance in one solution.",
    features: ["Noise Reduction", "Shock Absorption", "Excellent Flexibility"],
    icon: Volume2,
    images: [
      "/images/products/sound/White Sound_C1.0040021.png",
      "/images/products/sound/White Sound_C2.0040021.png",
      "/images/products/sound/White Sound_C3.0030021.png",
    ],
    image: "/images/products/sound/White Sound_C1.0040021.png",
    href: "/products/sound",
    badge: "Acoustic Expert",
  },
  {
    id: "aluglass",
    name: "Gulf-O-Flex® Aluglass",
    short: "ALG",
    category: "Aluminum Facing",
    tagline: "Premium aluminum glass fibre reinforced facing for exceptional protection against mechanical damage, moisture ingress, and UV degradation in external applications.",
    features: ["High resistance to water vapour diffusion", "FM Approved"],
    icon: ZapIcon,
    images: [
      "/images/products/aluglass/White Aluglass_C1.0010016.png",
      "/images/products/aluglass/White Aluglass_C2.0010016.png",
      "/images/products/aluglass/White Aluglass_C3.0010016.png",
      "/images/products/aluglass/White Aluglass_C4.0010016.png",
    ],
    image: "/images/products/aluglass/White Aluglass_C1.0010016.png",
    href: "/products/aluglass",
    badge: "External Use",
  },
  {
    id: "aluclad",
    name: "Gulf-O-Flex® Aluclad",
    short: "ALC",
    category: "Cladding Systems",
    tagline: "Heavy-duty aluminum cladding and jacketing for industrial pipe insulation protection. Engineered for harsh environments and demanding construction sites.",
    features: ["UV Resistant", "Mechanical Protection", "Anti-corrosion"],
    icon: Wrench,
    images: [
      "/images/products/aluclad/White Aluclad_C1.0010048.png",
      "/images/products/aluclad/White Aluclad_C2.0010048.png",
      "/images/products/aluclad/White Aluclad_C3.0010048.png",
      "/images/products/aluclad/White Aluclad_C4.0010048.png",
    ],
    image: "/images/products/aluclad/White Aluclad_C1.0010048.png",
    href: "/products/aluclad",
    badge: "Heavy Duty",
  },
  {
    id: "ultra",
    name: "Gulf-O-Flex® Ultra",
    short: "ULT",
    category: "Ultra-Low Conductivity",
    tagline: "Next-generation NBR/EPDM hybrid closed-cell foam with industry-leading thermal conductivity of 0.030 W/m·K at 0°C - engineered for chilled water, district cooling, and low-temperature process lines.",
    features: ["Product with reaction to fire Europlus B-S1-D0", "Low VOC & no ROHS detected", "Aesthetic finish"],
    icon: ShieldCheck,
    images: [
      "/images/products/ultra/ultra.png",
      "/images/products/ultra/ultra-1.png",
    ],
    image: "/images/products/ultra/ultra.png",
    href: "/products/ultra",
    badge: "Premium",
  },
  {
    id: "ultraline",
    name: "Gulf-O-Flex® UltraLine",
    short: "ULN",
    category: "Pre-Insulated Tube Line",
    tagline: "Factory pre-insulated continuous copper tube line system - nitrogen-charged copper + closed-cell NBR core + UV-stable LDPE jacket, supplied in coils up to 50 m for VRF/VRV, split AC, chilled water and solar thermal piping.",
    features: ["UV Resistant", "Polymeric Jacketing", "Mechanical Protection"],
    icon: Layers,
    images: [
      "/images/products/ultraline/ultraline.png",
      "/images/products/ultraline/ultraline-1.png",
    ],
    image: "/images/products/ultraline/ultraline.png",
    href: "/products/ultraline",
    badge: "System",
  },
  {
    id: "accessories",
    name: "Accessories",
    short: "ACC",
    category: "Complete System",
    tagline: "Premium adhesives, tapes, scrims, and installation accessories engineered to complement and enhance the performance of every Gulf-O-Flex insulation system.",
    features: ["Pressure-sensitive adhesive", "Self-adhesive tapes", "Full color range"],
    icon: Package,
    image: "/images/products/accessories-nbr-glue.webp",
    href: "/products/accessories",
    badge: "Essential",
  },
];

export default function Products() {
  const [activeId, setActiveId] = useState<string>(products[0].id);
  const [animKey, setAnimKey] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);

  const active = products.find((p) => p.id === activeId) ?? products[0];
  const activeIndex = products.indexOf(active);
  const ActiveIcon = active.icon;
  const activeImages = (active as { images?: string[] }).images;

  const advance = useCallback(() => {
    setActiveId((prev) => {
      const i = products.findIndex((p) => p.id === prev);
      return products[(i + 1) % products.length].id;
    });
    setAnimKey((k) => k + 1);
    setImgIndex(0);
  }, []);

  useEffect(() => {
    const t = setTimeout(advance, CYCLE_MS);
    return () => clearTimeout(t);
  }, [activeId, advance]);

  // Cycle through multiple images for products that have them
  useEffect(() => {
    if (!activeImages || activeImages.length <= 1) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % activeImages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [activeId, activeImages]);

  const handleSelect = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    setAnimKey((k) => k + 1);
    setImgIndex(0);
  };

  return (
    <section className="section-padding bg-white relative overflow-hidden" aria-labelledby="products-heading">
      <style>{`
        @keyframes gof-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gof-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes gof-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .gof-slide-up { animation: gof-slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .gof-fade-in  { animation: gof-fade-in 0.5s ease both; }
        .gof-bar      { animation: gof-progress ${CYCLE_MS}ms linear both; transform-origin: left; }
      `}</style>

      <div className="absolute inset-0 grid-bg opacity-[0.18]" />
      <div className="absolute top-0 left-0 right-0 h-px tech-divider" />
      <div className="absolute bottom-0 left-0 right-0 h-px tech-divider" />
      <div className="absolute -top-48 -right-36 w-[560px] h-[560px] bg-orange-500/[0.09] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-48 -left-36 w-[480px] h-[480px] bg-orange-500/[0.07] rounded-full blur-[140px] pointer-events-none" />

      <div className="container-wide relative z-10">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-14 lg:mb-20 reveal">
          <div className="lg:col-span-7">
            <h2
              id="products-heading"
              className="text-neutral-900 leading-[0.95]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 5vw, 4.75rem)", fontWeight: 800, letterSpacing: "-0.04em" }}
            >
              Engineered insulation<br />
              <span className="gradient-text">systems</span>
              <span className="serif-italic text-orange-600">.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end gap-6">
            <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-md">
              A complete portfolio of certified thermal, acoustic and protective insulation - manufactured in the UAE, KSA and Sri Lanka, specified across{" "}
              <span className="text-neutral-900 font-semibold">90+ markets</span>.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/products" className="btn-primary text-sm py-3 px-6">
                View All Products <ArrowRight size={14} />
              </Link>
              <Link href="/downloads" className="btn-ghost text-sm py-3 px-6">
                Datasheets
              </Link>
            </div>
          </div>
        </div>

        {/* ── Interactive Showcase ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 reveal">

          {/* ── LEFT: Featured visual pane ── */}
          <div
            className="lg:col-span-7 relative rounded-3xl overflow-hidden min-h-[480px]"
            style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 40px 100px -40px rgba(0,0,0,0.28)" }}
          >
            <div className="relative h-full" style={{ minHeight: "inherit" }}>

              {/* Cross-fading product images */}
              {products.map((p) => {
                const pImages = (p as { images?: string[] }).images;
                const currentSrc = p.id === activeId && pImages && pImages.length > 1
                  ? pImages[imgIndex]
                  : p.image;
                return (
                  <Image
                    key={p.id === activeId && pImages ? `${p.id}-${imgIndex}` : p.id}
                    src={currentSrc}
                    alt={p.name}
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: (p as { objectPosition?: string }).objectPosition ?? "center",
                      opacity: p.id === activeId ? 1 : 0,
                      transform: p.id === activeId ? "scale(1.05)" : "scale(1)",
                      transitionProperty: "opacity, transform",
                      transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
                      transitionDuration: "0.9s, 1.8s",
                    }}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={p.id === products[0].id}
                  />
                );
              })}



              {/* Cinematic overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" style={{ zIndex: 2 }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(130deg, rgba(249,115,22,0.22), transparent 52%)", zIndex: 2 }} />

              {/* Large watermark shortcode */}
              <div
                className="absolute right-5 md:right-9 top-1/2 -translate-y-1/2 select-none pointer-events-none font-black text-white leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(5rem, 10vw, 10rem)",
                  letterSpacing: "-0.07em",
                  opacity: 0.11,
                  transition: "opacity 0.8s ease",
                }}
              >
                {active.short}
              </div>

              {/* ── BOTTOM animated info - re-mounts to trigger slide-up ── */}
              <div key={`info-${animKey}`} className="absolute bottom-0 left-0 right-0 px-7 pb-8 z-10">
                <h3
                  className="gof-slide-up text-white font-bold leading-[1.0] mb-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)",
                    letterSpacing: "-0.035em",
                    animationDelay: "60ms",
                  }}
                >
                  {active.name}
                </h3>

                <p
                  className="gof-slide-up text-white/68 text-sm md:text-[15px] leading-relaxed max-w-xl mb-5 hidden sm:block"
                  style={{ animationDelay: "110ms" }}
                >
                  {active.tagline}
                </p>

                <div className="gof-slide-up flex flex-wrap items-center gap-2 mb-6" style={{ animationDelay: "160ms" }}>
                  {active.features.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1.5 text-[10px] md:text-[11px] font-semibold text-white/88 px-3 py-1.5 rounded-full bg-white/[0.09] backdrop-blur-sm border border-white/[0.15]"
                    >
                      <CheckCircle2 size={10} className="text-orange-300 shrink-0" />
                      {f}
                    </span>
                  ))}
                </div>

                <div className="gof-slide-up flex items-center justify-between gap-4" style={{ animationDelay: "210ms" }}>
                  <Link
                    href={active.href}
                    className="inline-flex items-center gap-2.5 text-sm font-bold text-white hover:text-orange-300 transition-colors duration-300"
                  >
                    Explore {active.short}
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-500 hover:bg-orange-400 transition-colors duration-300 shrink-0">
                      <ArrowUpRight size={14} />
                    </span>
                  </Link>
                </div>
              </div>

              {/* ── Auto-cycle progress bar at very bottom of image ── */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/[0.07] z-20">
                <div
                  key={`fp-bar-${animKey}`}
                  className="gof-bar"
                  style={{ height: "100%", width: "100%", background: "linear-gradient(to right, #f97316, #fb923c)" }}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Product selector list ── */}
          <div
            className="lg:col-span-5 rounded-3xl overflow-hidden bg-white flex flex-col min-h-[480px]"
            style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 30px 80px -40px rgba(0,0,0,0.13)" }}
          >
            {/* Dot indicator header - no instructional text */}
            <div className="px-6 md:px-7 py-4 flex items-center justify-between shrink-0" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex items-center gap-[7px]">
                {products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p.id)}
                    aria-label={p.name}
                    className="rounded-full transition-all duration-500"
                    style={{
                      width: p.id === activeId ? "24px" : "7px",
                      height: "7px",
                      background: p.id === activeId ? "#f97316" : "rgba(0,0,0,0.13)",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
              <div
                className="font-bold tabular-nums leading-none"
                style={{ fontFamily: "var(--font-display)", fontSize: "0.88rem", letterSpacing: "-0.025em" }}
              >
                <span className="text-orange-500">{String(activeIndex + 1).padStart(2, "0")}</span>
                <span className="text-neutral-300 mx-1">/</span>
                <span className="text-neutral-400">{String(products.length).padStart(2, "0")}</span>
              </div>
            </div>

            {/* Product rows */}
            <div className="flex-1 divide-y divide-[rgba(0,0,0,0.055)]">
              {products.map((p, i) => {
                const isActive = p.id === activeId;
                const Icon = p.icon;
                return (
                  <Link
                    key={p.id}
                    href={p.href}
                    onMouseEnter={() => handleSelect(p.id)}
                    className="relative group w-full text-left flex items-center gap-4 px-5 md:px-7 py-4 md:py-[18px] overflow-hidden transition-colors duration-300"
                    style={{ background: isActive ? "rgba(249,115,22,0.032)" : "transparent" }}
                    aria-label={p.name}
                  >
                    {/* Left accent rail */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-500"
                      style={{ background: isActive ? "linear-gradient(to bottom, #f97316, #fb923c)" : "transparent" }}
                    />

                    {/* Index number */}
                    <div
                      className="text-[11px] font-bold tracking-[0.18em] w-7 shrink-0 tabular-nums transition-colors duration-300"
                      style={{ color: isActive ? "#f97316" : "#c8c8c8", fontFamily: "var(--font-display)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Icon medallion */}
                    <div
                      className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-all duration-400"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(249,115,22,0.16), rgba(249,115,22,0.05))"
                          : "rgba(0,0,0,0.025)",
                        border: `1px solid ${isActive ? "rgba(249,115,22,0.28)" : "rgba(0,0,0,0.06)"}`,
                      }}
                    >
                      <Icon
                        size={15}
                        style={{ color: isActive ? "#f97316" : "#b5b5b5", transition: "color 0.35s" }}
                      />
                    </div>

                    {/* Name + category */}
                    <div className="flex-1 min-w-0">
                      <div
                        className="font-bold leading-tight truncate transition-colors duration-300"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(0.88rem, 1vw, 0.98rem)",
                          letterSpacing: "-0.02em",
                          color: isActive ? "#0a0a0a" : "#555",
                        }}
                      >
                        {p.name}
                      </div>

                    </div>

                    {/* Arrow circle */}
                    <div
                      className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isActive ? "#f97316" : "transparent",
                        border: `1px solid ${isActive ? "#f97316" : "rgba(0,0,0,0.09)"}`,
                        color: isActive ? "#fff" : "#d4d4d4",
                      }}
                    >
                      <ArrowUpRight size={13} />
                    </div>

                    {/* Row progress bar (only for active row) */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-100/80">
                        <div
                          key={`row-bar-${animKey}`}
                          className="gof-bar"
                          style={{ height: "100%", width: "100%", background: "linear-gradient(to right, #f97316, #fb923c)" }}
                        />
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        {/* ── Dark CTA strip ── */}
        <div
          className="mt-9 relative overflow-hidden rounded-3xl p-8 md:p-12 reveal"
          style={{ background: "#0a0a0a" }}
        >
          <div className="absolute inset-0 grid-bg opacity-[0.10]" />
          <div className="absolute -top-20 -right-20 w-[380px] h-[380px] bg-orange-500/[0.18] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] bg-orange-500/[0.13] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(249,115,22,0.45), transparent)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(249,115,22,0.22), transparent)" }} />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <h3
                className="text-white leading-[1.05] mb-3"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
              >
                Need help specifying the right<br className="hidden md:block" />
                <span className="serif-italic text-orange-400">insulation system?</span>
              </h3>
              <p className="text-white/60 text-sm md:text-[15px] leading-relaxed">
                Our AI-powered GOF Assist recommends optimal products for your application - backed by 30+ years of engineering expertise.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a href="https://gulfoflexassist.com" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-3 px-6">
                Try GOF Assist AI <ArrowRight size={14} />
              </a>
              <Link
                href="/downloads"
                className="btn-ghost text-sm py-3 px-6"
                style={{ color: "rgba(255,255,255,0.82)", borderColor: "rgba(255,255,255,0.18)" }}
              >
                Download Catalogue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
