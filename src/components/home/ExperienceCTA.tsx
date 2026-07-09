import Link from "next/link";
import { Building2, ArrowUpRight, CalendarDays, Compass } from "lucide-react";

export default function ExperienceCTA() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 p-8 md:p-12 lg:p-16">
          {/* Decorative blurs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500 rounded-full blur-[100px] opacity-15" />
          <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-orange-600 rounded-full blur-[80px] opacity-10" />

          <div className="relative z-10 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-orange-400 mb-5">
                <Building2 size={13} /> Experience Centre
              </span>
              <h2
                className="text-white mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
              >
                See it. Touch it. Test it.
              </h2>
              <p className="text-neutral-400 text-base leading-relaxed mb-8 max-w-xl">
                Visit our immersive showroom for hands-on product demonstrations, live performance testing, and one-on-one technical consultations. Book your private one-hour slot today.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/experience-centre#book-visit"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <CalendarDays size={16} /> Book a Visit <ArrowUpRight size={14} />
                </Link>
                <Link
                  href="/experience-centre#virtual-tour"
                  className="inline-flex items-center gap-2 text-neutral-300 hover:text-orange-400 transition-colors text-sm font-medium"
                >
                  <Compass size={16} /> Virtual Tour
                </Link>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-3">
              {[
                { n: "3000+", l: "Sq. Ft" },
                { n: "7", l: "Product Zones" },
                { n: "30+", l: "Live Demos" },
                { n: "1hr", l: "Private Slots" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center"
                >
                  <div
                    className="text-orange-400 mb-1"
                    style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800 }}
                  >
                    {s.n}
                  </div>
                  <div className="text-neutral-400 text-xs font-medium">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
