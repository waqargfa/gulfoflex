"use client";

import { useState } from "react";
import Image from "next/image";
import { Trophy, Star, Award, Crown, Zap, BadgeCheck, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AwardItem = {
  title: string;
  org: string;
  year?: string;
  Icon: LucideIcon;
  featured?: boolean;
  link?: string;
};

const AWARDS: AwardItem[] = [
  {
    title: "Pak-UAE Business Award",
    org: "UAE Excellence Programme",
    year: "2025",
    Icon: Crown,
    featured: true,
    link: "/images/awards/pak-uae business award 2025.png",
  },
  {
    title: "Meera Award",
    org: "Industry Recognition",
    Icon: Trophy,
    featured: true,
    link: "/images/awards/meera digital invotation award.png",
  },
  {
    title: "MEP Award",
    org: "MEP Middle East",
    year: "2022",
    Icon: Award,
    link: "/images/awards/cbmne2022.png",
  },
  {
    title: "MEP Award",
    org: "MEP Middle East",
    year: "2023",
    Icon: Award,
    link: "/images/awards/cbmne2023.png",
  },
  {
    title: "Climate Control Award",
    org: "Climate Control Middle East",
    year: "2017",
    Icon: Zap,
    link: "/images/awards/Climate control award 2017.png",
  },
  {
    title: "One UAE Business Award",
    org: "UAE Business Excellence",
    Icon: BadgeCheck,
    featured: true,
    link: "/images/awards/UAE ONE Business award.png",
  },
];

export default function Awards() {
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);

  return (
    <section
      className="section-padding relative overflow-hidden bg-white"
      aria-labelledby="awards-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 grid-bg opacity-[0.18]" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[800px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 65%)",
          }}
        />
      </div>
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

      {/* Corner marks */}
      <div className="hidden md:block absolute top-10 left-10 w-10 h-10 border-t border-l border-orange-500/20 pointer-events-none" />
      <div className="hidden md:block absolute top-10 right-10 w-10 h-10 border-t border-r border-orange-500/20 pointer-events-none" />
      <div className="hidden md:block absolute bottom-10 left-10 w-10 h-10 border-b border-l border-orange-500/20 pointer-events-none" />
      <div className="hidden md:block absolute bottom-10 right-10 w-10 h-10 border-b border-r border-orange-500/20 pointer-events-none" />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <h2
            id="awards-heading"
            className="text-neutral-900 mb-4 leading-[1.0]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            Awards &amp;{" "}
            <span
              className="serif-italic"
              style={{ color: "#f97316" }}
            >
              Acknowledgements.
            </span>
          </h2>
          <p className="text-neutral-500 text-base leading-relaxed">
            Over three decades of engineering excellence recognised by the
            region's most prestigious industry bodies and award programmes.
          </p>
        </div>

        {/* Award cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 stagger-reveal">
          {/* Featured awards span 2 cols on lg */}
          {AWARDS.map((award, i) => {
            const Icon = award.Icon;
            const isSpan = award.featured && i < 2;
            return (
              <div
                onClick={() => award.link && setSelectedAward(award)}
                key={`${award.title}-${award.year ?? i}`}
                className={`group relative flex flex-col items-center text-center py-8 px-5 rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-0.5 ${
                  isSpan ? "sm:col-span-1 lg:col-span-1" : ""
                }`}
                style={{
                  background: award.featured
                    ? "linear-gradient(135deg, rgba(249,115,22,0.09) 0%, rgba(249,115,22,0.03) 100%)"
                    : "rgba(255,255,255,0.95)",
                  border: award.featured
                    ? "1px solid rgba(249,115,22,0.28)"
                    : "1px solid rgba(10,10,10,0.07)",
                  boxShadow: award.featured
                    ? "0 4px 24px rgba(249,115,22,0.08), 0 1px 3px rgba(10,10,10,0.04)"
                    : "0 1px 3px rgba(10,10,10,0.04), 0 8px 24px -8px rgba(10,10,10,0.07)",
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] transition-all duration-500"
                  style={{
                    width: award.featured ? "40%" : "0%",
                    background: "linear-gradient(90deg, transparent, #f97316, transparent)",
                  }}
                />
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    width: "60%",
                    background: "linear-gradient(90deg, transparent, #f97316, transparent)",
                  }}
                />

                {/* Inner glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 70%)",
                  }}
                />

                <div className="relative z-10 flex flex-col items-center">
                  {/* Icon medallion */}
                  <div
                    className="relative mb-4 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: award.featured
                        ? "linear-gradient(135deg, rgba(249,115,22,0.22), rgba(249,115,22,0.06))"
                        : "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.03))",
                      border: "1px solid rgba(249,115,22,0.22)",
                    }}
                  >
                    <Icon
                      size={22}
                      style={{ color: "#f97316" }}
                      strokeWidth={1.8}
                    />
                    {award.featured && (
                      <div
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: "#f97316" }}
                      >
                        <Star size={8} fill="#ffffff" color="#ffffff" strokeWidth={0} />
                      </div>
                    )}
                  </div>

                  {/* Year badge */}
                  {award.year && (
                    <div
                      className="text-[9px] font-black tracking-[0.25em] uppercase mb-2 px-2.5 py-0.5 rounded-full"
                      style={{
                        background: "rgba(249,115,22,0.12)",
                        border: "1px solid rgba(249,115,22,0.22)",
                        color: "#f97316",
                      }}
                    >
                      {award.year}
                    </div>
                  )}

                  {/* Title */}
                  <div
                    className="text-neutral-900 font-black text-base leading-tight mb-1.5 group-hover:text-orange-600 transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {award.title}
                  </div>

                  {/* Org */}
                  <div
                    className="text-[10px] font-semibold uppercase tracking-wider leading-snug"
                    style={{ color: "rgba(249,115,22,0.65)" }}
                  >
                    {award.org}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedAward && selectedAward.link && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedAward(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedAward(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
              aria-label="Close"
            >
              <X size={16} className="text-neutral-600" />
            </button>

            <div className="p-6">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-50">
                <Image
                  src={selectedAward.link}
                  alt={selectedAward.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 512px) 100vw, 512px"
                />
              </div>
              <div className="mt-4 text-center">
                <h3
                  className="text-neutral-900 font-bold text-lg"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                >
                  {selectedAward.title}
                  {selectedAward.year && <span className="text-orange-600 ml-2">({selectedAward.year})</span>}
                </h3>
                <p className="text-neutral-500 text-sm mt-1">{selectedAward.org}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
