"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Award,
  BadgeCheck,
  Crown,
  Globe2,
  Star,
  Trophy,
  X,
  Zap,
} from "lucide-react";

const recognitions = [
  { Icon: Crown,      title: "Pak-UAE Business Award", org: "UAE Excellence Programme",       year: "2025",    featured: true,  image: "/images/awards/uae business award.png" },
  { Icon: Trophy,     title: "Meera Award",            org: "Industry Recognition",           year: undefined, featured: true,  image: "/images/awards/meera digital invotation award.png" },
  { Icon: Award,      title: "MEP Award",              org: "MEP Middle East",               year: "2022",    featured: false, image: "/images/awards/cbmne2022.png" },
  { Icon: Award,      title: "MEP Award",              org: "MEP Middle East",               year: "2023",    featured: false, image: "/images/awards/cbmne2023.png" },
  { Icon: Globe2,     title: "CBNME Award",            org: "Construction Business News ME", year: undefined, featured: false, image: "/images/awards/cbmne2023.png" },

  { Icon: Zap,        title: "Climate Control Award",  org: "Climate Control Middle East",   year: "2017",    featured: false, image: "/images/awards/Climate control award 2017.png" },
  { Icon: BadgeCheck, title: "One UAE Business Award",  org: "UAE Business Excellence",       year: undefined, featured: true,  image: "/images/awards/UAE ONE Business award.png" },
];

export default function AwardsGrid() {
  const [selected, setSelected] = useState<(typeof recognitions)[number] | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {recognitions.map((r, i) => (
          <button
            key={`${r.title}-${r.year ?? i}`}
            type="button"
            onClick={() => setSelected(r)}
            className="group relative h-full rounded-2xl border p-5 overflow-hidden transition-all duration-500 hover:-translate-y-1 text-left cursor-pointer"
            style={{
              background: r.featured
                ? "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)"
                : "linear-gradient(135deg, #fff 0%, #fff7ed 100%)",
              borderColor: r.featured ? "rgba(234,88,12,0.40)" : "rgba(0,0,0,0.07)",
              boxShadow: r.featured ? "0 0 0 0 rgba(234,88,12,0)" : "none",
            }}
          >
            {r.featured && (
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, transparent, #ea580c, transparent)" }}
              />
            )}
            {!r.featured && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}

            <div className="flex items-start gap-3 mb-2">
              <div
                className="relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-400 group-hover:scale-110"
                style={{
                  background: r.featured
                    ? "linear-gradient(135deg, rgba(234,88,12,0.22), rgba(234,88,12,0.06))"
                    : "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.04))",
                  border: r.featured ? "1px solid rgba(234,88,12,0.30)" : "1px solid rgba(249,115,22,0.22)",
                }}
              >
                <r.Icon
                  size={17}
                  strokeWidth={2.2}
                  style={{ color: r.featured ? "#c2410c" : undefined }}
                  className={r.featured ? undefined : "text-orange-600"}
                />
                {r.featured && (
                  <div
                    className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                    style={{ background: "#ea580c" }}
                  >
                    <Star size={7} fill="#fff" color="#fff" strokeWidth={0} />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                {r.year && (
                  <span
                    className="inline-block text-[8px] font-black tracking-[0.22em] uppercase px-2 py-0.5 rounded-full mb-1"
                    style={{
                      background: "rgba(234,88,12,0.08)",
                      border: "1px solid rgba(234,88,12,0.18)",
                      color: "#c2410c",
                    }}
                  >
                    {r.year}
                  </span>
                )}
                <div
                  className="text-neutral-900 font-bold text-sm leading-tight"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}
                >
                  {r.title}
                </div>
              </div>
            </div>

            <p
              className="text-[10px] font-semibold uppercase tracking-wider leading-snug pl-[3.25rem]"
              style={{ color: r.featured ? "rgba(196,65,12,0.75)" : "rgba(0,0,0,0.40)" }}
            >
              {r.org}
            </p>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
              aria-label="Close"
            >
              <X size={16} className="text-neutral-600" />
            </button>

            <div className="p-6">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-50">
                <Image
                  src={selected.image}
                  alt={selected.title}
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
                  {selected.title}
                  {selected.year && <span className="text-orange-600 ml-2">({selected.year})</span>}
                </h3>
                <p className="text-neutral-500 text-sm mt-1">{selected.org}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
