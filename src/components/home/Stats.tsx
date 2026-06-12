"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  desc: string;
}

const stats: StatItem[] = [
  { value: 30, suffix: "+", label: "Years of Excellence", desc: "Manufacturing since 1993 in Ajman, UAE" },
  { value: 56, suffix: "%", label: "GCC Market Share", desc: "Dominant share of the region's rubber insulation supply" },
  { value: 90, suffix: "+", label: "Export Countries", desc: "Trusted partner to engineers and contractors worldwide" },
  { value: 5, suffix: "", label: "Manufacturing Facilities", desc: "In UAE, Sri Lanka, and Saudi Arabia" },
  { value: 500, suffix: "+", label: "Technical Team", desc: "Expert engineers and trained installation specialists" },
  { value: 10000, suffix: "+", label: "Projects Completed", desc: "Across HVAC, Oil & Gas, Marine, and Construction" },
];

function AnimatedNumber({ value, suffix, started }: { value: number; suffix: string; started: boolean }) {
  const [current, setCurrent] = useState(0);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    return () => { if (animRef.current) clearTimeout(animRef.current); };
  }, [started, value]);

  return (
    <span>
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="section-padding bg-white relative overflow-hidden" aria-label="Company statistics">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/5 to-transparent" />
        {/* Horizontal scan lines */}
        <div className="absolute top-0 left-0 right-0 h-px tech-divider" />
        <div className="absolute bottom-0 left-0 right-0 h-px tech-divider" />
        {/* Vertical accents */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/10 to-transparent" />
      </div>

      <div className="container-wide relative z-10" ref={ref}>
        {/* Section header - asymmetric two-column */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 xl:gap-20 items-end mb-16 reveal">
          <div>
            <h2
              className="text-neutral-900 leading-[0.95]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.75rem, 5.5vw, 5.5rem)", fontWeight: 800, letterSpacing: "-0.05em" }}
            >
              Numbers that<br />
              <span className="serif-italic text-orange-600">prove it.</span>
            </h2>
          </div>
          <p className="text-neutral-500 text-base leading-relaxed max-w-sm pb-2">
            Three decades of manufacturing excellence - the numbers behind Gulf-O-Flex&rsquo;s global leadership.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100 rounded-3xl overflow-hidden stagger-reveal">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white p-5 sm:p-8 xl:p-12 group hover:bg-gradient-to-br hover:from-orange-500/8 hover:to-transparent transition-all duration-300 flex flex-col relative overflow-hidden"
            >
              {/* Hover glow sweep */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 transition-all duration-500 pointer-events-none" />
              
              {/* Faint decorative index - ultra-transparent */}
              <div
                className="absolute -bottom-3 -right-3 font-black leading-none select-none pointer-events-none"
                style={{ fontFamily: "var(--font-display)", fontSize: "9rem", letterSpacing: "-0.05em", color: "rgba(249,115,22,0.055)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Counter */}
              <div
                className="stat-number mb-1 leading-none relative z-10"
                style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} started={inView} />
              </div>

              {/* Label */}
              <div className="text-neutral-900 font-bold text-base mt-3 mb-2 relative z-10" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                {stat.label}
              </div>

              {/* Divider */}
              <div className="w-8 h-0.5 bg-gradient-to-r from-orange-500 to-transparent mb-3 group-hover:w-20 transition-all duration-500 relative z-10" />

              {/* Description */}
              <p className="text-neutral-500 text-sm leading-relaxed relative z-10">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom highlight */}
        <div className="mt-16 glass-orange rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 reveal">
          <div className="text-center md:text-left">
            <div className="text-neutral-900 font-black text-2xl mb-2" style={{ fontFamily: "var(--font-syne)" }}>
              The GCC&rsquo;s Most Trusted Insulation Brand
            </div>
            <p className="text-neutral-500 text-sm max-w-lg">
              From Ajman to the world - Gulf-O-Flex® has been the engineer&rsquo;s first choice for three decades, delivering quality that never compromises.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-center">
              <div className="text-orange-600 font-black text-3xl" style={{ fontFamily: "var(--font-syne)" }}>A+</div>
              <div className="text-neutral-500 text-xs uppercase tracking-wide">Quality Rating</div>
            </div>
            <div className="w-px h-12 bg-neutral-100" />
            <div className="text-center">
              <div className="text-orange-600 font-black text-3xl" style={{ fontFamily: "var(--font-syne)" }}>ISO</div>
              <div className="text-neutral-500 text-xs uppercase tracking-wide">9001 Certified</div>
            </div>
            <div className="w-px h-12 bg-neutral-100" />
            <div className="text-center">
              <div className="text-orange-600 font-black text-3xl" style={{ fontFamily: "var(--font-syne)" }}>FM</div>
              <div className="text-neutral-500 text-xs uppercase tracking-wide">Approved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
