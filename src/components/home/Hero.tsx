"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import YouTubeBackground from "@/components/home/YouTubeBackground";
import { useCountry } from "@/context/CountryContext";

/* ─────────────────────────── slide data ─────────────────────────── */

const SLIDES = [
  {
    align:    "left" as const,
    line1:    "Engineered",
    line2a:   "for\u00a0",
    line2b:   "Extreme",
    line3:    "performance",
    subtitle: null,                   // resolved from country context
    cta1:     { label: "Explore Products",    href: "/products" },
    cta2:     { label: "GOF Assist AI",       href: "/gulf-o-flex-assist" },
  },
  {
    align:    "right" as const,
    line1:    "Certified",
    line2a:   "to\u00a0",
    line2b:   "Global",
    line3:    "standards.",
    subtitle: "ISO 9001 · FM Approved · UL Listed · EPD Verified · TUV Singapore · Singapore Green Building · CE & Reach Mark · Saudi Made - every roll ships with the world's most rigorous third-party certifications behind it.",
    cta1:     { label: "View Certifications", href: "/certifications" },
    cta2:     { label: "Our Projects",        href: "/projects" },
  },
  {
    align:    "left" as const,
    line1:    "Trusted",
    line2a:   "across\u00a0",
    line2b:   "90+",
    line3:    "countries.",
    subtitle: "From HVAC mega-projects in the GCC to LNG terminals worldwide - Gulf-O-Flex® insulation is specified where failure is not an option.",
    cta1:     { label: "About Us",            href: "https://gulfoflex.com/about-us/" },
    cta2:     { label: "Our Projects",        href: "/projects" },
  },
];

/* ─────────────────────────── component ──────────────────────────── */

type Phase = "idle" | "out" | "in";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const { country } = useCountry();

  const [active, setActive] = useState(0);
  const [phase, setPhase]   = useState<Phase>("in");
  const [animKey, setAnimKey] = useState(0);          // bumped to re-trigger CSS animations
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef   = useRef<number | null>(null);

  const slide   = SLIDES[active];
  const isRight = slide.align === "right";

  /* ── navigate ── */
  const goTo = useCallback((idx: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("out");
    timerRef.current = setTimeout(() => {
      setActive(idx);
      setPhase("in");
      setAnimKey(k => k + 1);
    }, 420);
  }, []);

  /* ── auto-advance every 7 s ── */
  useEffect(() => {
    const id = setTimeout(() => goTo((active + 1) % SLIDES.length), 7000);
    return () => clearTimeout(id);
  }, [active, goTo]);

  /* ── cursor follow spotlight ── */
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!heroRef.current || !spotRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      spotRef.current.style.background = `radial-gradient(720px circle at ${x}% ${y}%, rgba(249,115,22,0.10), rgba(249,115,22,0.02) 35%, transparent 60%)`;
    };
    const el = heroRef.current;
    el?.addEventListener("mousemove", handle, { passive: true });
    return () => el?.removeEventListener("mousemove", handle);
  }, []);

  /* ── cleanup on unmount ── */
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current)   cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── inline transition styles ── */
  const outX  = isRight ? "60px" : "-60px";    // exit direction
  const inX   = isRight ? "60px" : "-60px";    // enter direction (mirror)

  const slideStyle: React.CSSProperties = {
    opacity:   phase === "out" ? 0 : 1,
    transform: phase === "out"
      ? `translateX(${outX})`
      : phase === "in"
        ? "translateX(0)"
        : "translateX(0)",
    transition: phase === "out"
      ? "opacity 380ms cubic-bezier(0.4,0,1,1), transform 400ms cubic-bezier(0.4,0,0.6,1)"
      : "none",
  };

  /* on "in" phase: use CSS @keyframes keyed by animKey so it runs fresh */
  const contentStyle: React.CSSProperties =
    phase === "in"
      ? {
          animation: `hero-slide-in-${isRight ? "right" : "left"} 700ms cubic-bezier(0.19,1,0.22,1) both`,
        }
      : slideStyle;

  return (
    <section
      ref={heroRef}
      className="relative min-h-[50vh] flex flex-col overflow-hidden"
      aria-label="Hero"
      style={{ background: "#0d0c0b" }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <YouTubeBackground src="/slidervideonew.webm" />

        {/* Ambient blooms */}
        <div
          className="absolute -top-32 -right-24 w-[640px] h-[640px] rounded-full opacity-70"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.22) 0%, rgba(249,115,22,0.06) 40%, transparent 70%)", filter: "blur(40px)" }}
        />
        <div
          className="absolute -bottom-40 -left-32 w-[720px] h-[720px] rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.14) 0%, rgba(249,115,22,0.04) 45%, transparent 75%)", filter: "blur(60px)" }}
        />

        <div className="absolute inset-0 grid-bg opacity-[0.18]" />
        <div ref={spotRef} className="absolute inset-0" />
        <div className="noise" />

        {/* ── Directional gradient overlay - transitions with slide ── */}
        <div
          className="absolute inset-y-0 left-0 w-3/4 transition-opacity duration-500"
          style={{
            background: "linear-gradient(to right, rgba(10,8,4,0.88), rgba(10,8,4,0.44) 55%, rgba(10,8,4,0))",
            opacity: isRight ? 0 : 1,
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-3/4 transition-opacity duration-500"
          style={{
            background: "linear-gradient(to left, rgba(10,8,4,0.88), rgba(10,8,4,0.44) 55%, rgba(10,8,4,0))",
            opacity: isRight ? 1 : 0,
          }}
        />

        {/* Top / bottom fades */}
        <div className="absolute inset-x-0 top-0 h-56" style={{ background: "linear-gradient(to bottom, rgba(10,8,4,0.55), rgba(10,8,4,0))" }} />
        <div className="absolute inset-x-0 bottom-0 h-56" style={{ background: "linear-gradient(to top, rgba(10,8,4,0.85), rgba(10,8,4,0))" }} />

        {/* Accent line below navbar */}
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"
          style={{ top: "var(--navbar-height)" }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center pt-24 md:pt-28 pb-10 overflow-hidden">
        <div
          className={`container-wide w-full flex ${isRight ? "justify-end" : "justify-start"} transition-[justify-content] duration-500`}
        >
          {/* Text panel - animates in from its side */}
          <div
            key={animKey}
            className="w-full max-w-[640px]"
            style={{
              ...contentStyle,
              textAlign: isRight ? "right" : "left",
            }}
          >
            {/* ── Heading - staggered per-line ── */}
            <h1 className="mega-heading">
              <span
                className="block overflow-hidden"
                style={{
                  animation: `hero-word 700ms cubic-bezier(0.19,1,0.22,1) ${isRight ? "120ms" : "80ms"} both`,
                  paddingTop: "0.18em",
                  paddingBottom: "0.12em",
                  marginTop: "-0.18em",
                  marginBottom: "-0.12em",
                }}
              >
                <span className="inline-block text-white" style={{ lineHeight: 1.02 }}>{slide.line1}</span>
              </span>
              <span
                className="block overflow-hidden"
                style={{
                  animation: `hero-word 700ms cubic-bezier(0.19,1,0.22,1) ${isRight ? "220ms" : "180ms"} both`,
                  paddingTop: "0.12em",
                  paddingBottom: "0.12em",
                  marginTop: "-0.12em",
                  marginBottom: "-0.12em",
                }}
              >
                <span className="inline-block text-white/55">{slide.line2a}</span>
                <span className="inline-block text-white/55">{slide.line2b}</span>
              </span>
              <span
                className="block"
                style={{
                  animation: `hero-word 700ms cubic-bezier(0.19,1,0.22,1) ${isRight ? "320ms" : "280ms"} both`,
                  paddingTop: "0.08em",
                  paddingBottom: "0.18em",
                  overflow: "visible",
                }}
              >
                <span className="inline-block serif-italic gradient-text" style={{ fontSize: "1.02em", lineHeight: 1.12 }}>
                  {slide.line3}
                </span>
              </span>
            </h1>

            {/* ── CTAs ── */}
            <div
              className={`mt-8 flex flex-wrap items-center gap-4 ${isRight ? "justify-end" : "justify-start"}`}
              style={{ animation: "hero-fade-up 650ms cubic-bezier(0.19,1,0.22,1) 500ms both" }}
            >
              <Link href={slide.cta1.href} className="btn-primary group">
                {slide.cta1.label}
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <Link href={slide.cta2.href} className="btn-ghost group" style={{ color: "rgba(255,255,255,0.82)", borderColor: "rgba(255,255,255,0.22)" }}>
                {slide.cta2.label}
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* ── Slide dots ── */}
            <div
              className={`mt-10 flex items-center gap-3 ${isRight ? "justify-end" : "justify-start"}`}
              style={{ animation: "hero-fade-up 600ms cubic-bezier(0.19,1,0.22,1) 560ms both" }}
            >
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className="relative h-[3px] rounded-full overflow-hidden transition-[width] duration-500"
                  style={{
                    width: i === active ? 44 : 16,
                    background: i === active ? "transparent" : "rgba(255,255,255,0.22)",
                  }}
                >
                  {i === active && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-white/20" />
                      <span
                        className="absolute left-0 top-0 bottom-0 rounded-full bg-orange-500"
                        style={{ animation: "hero-dot-fill 7s linear forwards" }}
                      />
                    </>
                  )}
                </button>
              ))}
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/30 ml-1">
                0{active + 1}&thinsp;/&thinsp;0{SLIDES.length}
              </span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
