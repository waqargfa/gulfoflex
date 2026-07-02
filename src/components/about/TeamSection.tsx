"use client";

import { useState, useEffect, useMemo } from "react";
import { Mail, Phone, MapPin, Users, ArrowUpRight, Copy, Check, Globe2, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCountry } from "@/context/CountryContext";

// Map CountryContext codes → TeamSection codes
const COUNTRY_CODE_MAP: Record<string, string> = {
  ae: "uae",
  sa: "ksa",
  qa: "other-gcc",
  kw: "other-gcc",
  bh: "other-gcc",
  om: "other-gcc",
  lk: "srilanka",
};

type TeamMember = {
  name: string;
  role: string;
  roleType: "head" | "sales" | "retail";
  email?: string;
  phone?: string;
};

type CountryTeam = {
  country: string;
  flag: string;
  code: string;
  members: TeamMember[];
};

const teams: CountryTeam[] = [
  {
    country: "UAE",
    flag: "🇦🇪",
    code: "uae",
    members: [
       { name: "Vijay Vaidyanathan",   role: "Head-Technical and Commercial-GCC ",  roleType: "head", email: "vijay.v@gulfoflex.com" },
      { name: "Arjun Pradeep",   role: "Assistance Sales Manager",    roleType: "sales",  email: "sales@gulfoflex.com" },
      { name: "Jiswan Pm",  role: "Sr. Sales Engineer",  roleType: "sales", email: "jiswan@gulfoflex.com"},
      { name: "Rohith S",   role: "Sales engineer",  roleType: "sales", email: "rohith@gulfoflex.com" },
      { name: "Deepak Balaji",  role: "Specification manager",  roleType: "sales", email: "deepak@gulfoflex.com" },
      { name: "Nirmal Philip",  role: "Specification engineer",  roleType: "sales", email: "nirmal@gulfoflex.com" },
      { name: "Mohammed Thanveer", role: "Technical engineer",  roleType: "sales", email: "technical@gulfoflex.com" },
      { name: "Jesfer Thaivalappil",  role: "Retails Head",  roleType: "head", email: "jesfer@gulfoflex.com" },
      { name: "Muhammed Jinshad",  role: "Retail Sales Engineer",  roleType: "retail", email: "Jinshad@gulfoflex.com" },
      { name: "Anees Aboobacker",  role: "Retail Sales Engineer",  roleType: "retail", email: "sales@ultralamin.ae" },
      { name: "Anwarul Hak",  role: "Retail Sales Engineer",  roleType: "retail", email: "abudhabi@gulfoflex.com" },
      { name: "Shaik Nissar Ahmed",  role: "Retail Sales Engineer",  roleType: "retail", email: "sales.dubai@gulfoflex.com" },
    ],
  },
  {
    country: "Saudi Arabia",
    flag: "🇸🇦",
    code: "ksa",
    members: [
      { name: "Shadab Ahmed",      role: "Head of Sales-KSA", roleType: "head",  email: "shad@rwi.sa", phone: "+966 00 000 0000" },
      { name: "Sai Taj",     role: "Sales Engineer",     roleType: "sales", email: "saiteja@gulfoflex.com", phone: "+966 00 000 0000" },
      { name: "Deepak Balaji",  role: "Specification manager",  roleType: "sales", email: "deepak@gulfoflex.com" },
      { name: "Shahbaz Mirza", role: "Sales Engineer",     roleType: "sales", email: "Shahbaz@rwi.sa", phone: "+966 00 000 0000" },
      { name: "Muhammad Saquib", role: "Retail Sales Engineer",     roleType: "sales", email: "saquib@rwi.sa", phone: "+966 00 000 0000" },
      { name: "Hammad Raza", role: "Retail Sales Engineer",     roleType: "sales", email: "hammad@rwi.sa", phone: "+966 00 000 0000" },
    ],
  },
  {
    country: "Other GCC Countries",
    flag: "GC",
    code: "other-gcc",
    members: [
      { name: "Jubin Varghese", role: "Sales Engineer", roleType: "sales", email: "sales@gulfoflex.com" },
      { name: "Deepak Balaji",  role: "Specification manager",  roleType: "sales", email: "deepak@gulfoflex.com" },
    ],
  },
  {
    country: "Sri Lanka",
    flag: "🇱🇰",
    code: "srilanka",
    members: [
      { name: "Oswin", role: "Sales & Specification Engineer", roleType: "sales", email: "oswin@gulfoflex.com", phone: "+94 11 000 0000" },
      { name: "Mohsin", role: "Sales Executive", roleType: "sales", email: "sales@rwi.lk" },
    ],
  },
  {
    country: "Egypt",
    flag: "🇪🇬",
    code: "egypt",
    members: [
      { name: "Mohamed Khaled Mamdouh", role: "Retail Sales Engineer", roleType: "sales", email: "sales.egypt@gulfoflex.com", phone: "+966 00 000 0000" },
    ],
  },
  {
    country: "Africa",
    flag: "Af",
    code: "africa",
    members: [
      { name: "Morayo Durojaye", role: "Retail Sales Engineer", roleType: "sales", email: "sales.africa@gulfoflex.com", phone: "+966 00 000 0000" },
    ],
  },
];

function getInitials(name: string) {
  if (!name || name === "TBA") return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Per-country accent colors (orange-anchored brand spectrum)
const COUNTRY_ACCENT: Record<string, { rgb: string; label: string }> = {
  uae:     { rgb: "249,115,22",  label: "Dubai · Sharjah · Abu Dhabi" },
  ksa:     { rgb: "234,88,12",   label: "Riyadh · Jeddah · Dammam" },
  "other-gcc": { rgb: "194,65,12", label: "Qatar · Kuwait · Bahrain · Oman" },
  srilanka: { rgb: "251,146,60",  label: "Colombo" },
  egypt:   { rgb: "194,65,12",   label: "Cairo · Alexandria" },
  africa:  { rgb: "251,146,60",  label: "Lagos · Nairobi · Accra" },
};

export default function TeamSection() {
  const { country } = useCountry();

  const teamCode = COUNTRY_CODE_MAP[country.code] ?? "all";
  const defaultTab = teams.some((t) => t.code === teamCode) ? teamCode : "all";

  const [activeCountry, setActiveCountry] = useState(defaultTab);
  const [copied, setCopied] = useState<string | null>(null);

  // When the global country changes, switch the active tab automatically
  useEffect(() => {
    const mapped = COUNTRY_CODE_MAP[country.code] ?? "all";
    setActiveCountry(teams.some((t) => t.code === mapped) ? mapped : "all");
  }, [country.code]);

  const displayed =
    activeCountry === "all"
      ? teams
      : teams.filter((t) => t.code === activeCountry);

  const totals = useMemo(() => {
    const reps = teams.reduce((a, t) => a + t.members.length, 0);
    const heads = teams.reduce(
      (a, t) => a + t.members.filter((m) => m.roleType === "head").length,
      0
    );
    return { reps, heads, countries: teams.length };
  }, []);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/4 -left-24 w-[28rem] h-[28rem] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-[24rem] h-[24rem] bg-orange-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-wide relative z-10">

        {/* ── Header: two-column ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-14 items-end">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-5">
              <span className="eyebrow-dot" />Sales Network
            </div>
            <h2
              className="text-neutral-900 leading-[0.95] mb-5"
              style={{
                fontFamily: "var(--font-display, var(--font-syne))",
                fontSize: "clamp(2.25rem, 4.8vw, 4.25rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              People behind every{" "}
              <span className="gradient-text">specification</span>
              <span className="serif-italic text-orange-600">.</span>
            </h2>
            <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-xl">
              A regional team of specification engineers and account managers - embedded across the GCC to support consultants, contractors, and developers from spec to site.
            </p>
          </div>

          {/* Network stat card */}
          <div className="lg:col-span-5">
            <div
              className="relative rounded-3xl border border-neutral-200 bg-white p-6 lg:p-7 overflow-hidden"
              style={{ boxShadow: "0 30px 80px -40px rgba(0,0,0,0.18)" }}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-5">
                <Globe2 size={14} className="text-orange-600" />
                <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-neutral-500">
                  Regional Coverage
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { v: totals.reps,      l: "Sales reps" },
                  { v: totals.countries, l: "GCC markets" },
                  { v: "24h",            l: "RFQ response" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl bg-neutral-50 border border-neutral-100 p-3.5">
                    <div
                      className="text-orange-600 font-black leading-none mb-1.5"
                      style={{
                        fontFamily: "var(--font-display, var(--font-syne))",
                        fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {s.v}
                    </div>
                    <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-neutral-500">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Country filter tabs (with sliding pill) ── */}
        <div className="mb-10 -mx-4 px-4 overflow-x-auto no-scrollbar">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full border border-neutral-200 bg-white/80 backdrop-blur-md shadow-sm">
            {[{ code: "all", flag: "🌍", country: "All Countries", count: totals.reps }, ...teams.map((t) => ({ code: t.code, flag: t.flag, country: t.country, count: t.members.length }))].map((t) => {
              const isActive = activeCountry === t.code;
              return (
                <button
                  key={t.code}
                  onClick={() => setActiveCountry(t.code)}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 flex items-center gap-2 whitespace-nowrap ${
                    isActive ? "text-white" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="sales-tab-pill"
                      className="absolute inset-0 rounded-full bg-neutral-900"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 text-base leading-none">{t.flag}</span>
                  <span className="relative z-10">{t.country}</span>
                  <span
                    className={`relative z-10 text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded-full transition-colors ${
                      isActive ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {t.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Teams grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCountry}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-14"
          >
            {displayed.map((team, teamIdx) => {
              const accent = COUNTRY_ACCENT[team.code] ?? { rgb: "234,88,12", label: "" };
              return (
                <div key={team.code}>
                  {/* Country header strip */}
                  <div className="flex items-end gap-5 mb-7">
                    <div
                      className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 border"
                      style={{
                        background: `rgba(${accent.rgb}, 0.08)`,
                        borderColor: `rgba(${accent.rgb}, 0.2)`,
                      }}
                    >
                      <span>{team.flag}</span>
                      <span
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-[10px] font-black text-neutral-500 tabular-nums"
                        style={{ fontFamily: "var(--font-display, var(--font-syne))" }}
                      >
                        {String(teamIdx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-neutral-900 leading-none mb-1.5"
                        style={{
                          fontFamily: "var(--font-display, var(--font-syne))",
                          fontWeight: 800,
                          fontSize: "clamp(1.5rem, 2.4vw, 2.125rem)",
                          letterSpacing: "-0.035em",
                        }}
                      >
                        {team.country}
                      </h3>
                      {accent.label && (
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                          <MapPin size={12} style={{ color: `rgb(${accent.rgb})` }} />
                          {accent.label}
                        </div>
                      )}
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase text-neutral-500">
                      <Users size={12} />
                      {team.members.length} {team.members.length > 1 ? "members" : "member"}
                    </div>
                  </div>

                  {/* Members grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {team.members.map((member, idx) => {
                      const isHead = member.roleType === "head";
                      const isUnnamed = member.name === "TBA";
                      const emailCopied = member.email && copied === member.email;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                          className="group relative rounded-2xl border border-neutral-200 bg-white p-6 flex flex-col gap-5 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                          style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
                        >
                          {/* Accent top bar */}
                          <span
                            className="absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-300"
                            style={{
                              background: `linear-gradient(90deg, rgb(${accent.rgb}), transparent)`,
                              opacity: isHead ? 1 : 0.35,
                            }}
                          />
                          {/* Hover glow */}
                          <span
                            className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                              background: `radial-gradient(400px circle at 50% 0%, rgba(${accent.rgb},0.1), transparent 60%)`,
                            }}
                          />

                          {/* Top: avatar + role badge */}
                          <div className="relative flex items-start justify-between">
                            <div
                              className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black shrink-0 border"
                              style={{
                                fontFamily: "var(--font-display, var(--font-syne))",
                                background: isHead
                                  ? `rgb(${accent.rgb})`
                                  : "#fafafa",
                                color: isHead ? "#fff" : "rgb(115,115,115)",
                                borderColor: isHead
                                  ? `rgba(${accent.rgb}, 0.4)`
                                  : "rgb(229,229,229)",
                                boxShadow: isHead
                                  ? `0 8px 24px -8px rgba(${accent.rgb},0.5)`
                                  : "none",
                              }}
                            >
                              {getInitials(member.name)}
                            </div>
                            <span
                              className="text-[9px] uppercase tracking-[0.18em] font-bold px-2.5 py-1 rounded-full border"
                              style={
                                isHead
                                  ? {
                                      color: `rgb(${accent.rgb})`,
                                      borderColor: `rgba(${accent.rgb},0.25)`,
                                      background: `rgba(${accent.rgb},0.08)`,
                                    }
                                  : {
                                      color: "rgb(115,115,115)",
                                      borderColor: "rgb(229,229,229)",
                                      background: "#fafafa",
                                    }
                              }
                            >
                              {isHead ? "Head" : "Sales"}
                            </span>
                          </div>

                          {/* Info */}
                          <div className="relative">
                            <div
                              className="text-neutral-900 font-bold text-base mb-1 leading-tight"
                              style={{ fontFamily: "var(--font-display, var(--font-syne))", letterSpacing: "-0.02em" }}
                            >
                              {isUnnamed ? (
                                <span className="text-neutral-400 italic">Name - TBA</span>
                              ) : (
                                member.name
                              )}
                            </div>
                            <div className="text-neutral-500 text-sm leading-snug">{member.role}</div>
                          </div>

                          {/* Contact */}
                          <div className="relative mt-auto pt-4 border-t border-neutral-100 space-y-2">
                            {member.email && (
                              <div className="flex items-center gap-1.5">
                                <a
                                  href={`mailto:${member.email}`}
                                  className="flex items-center gap-2 text-xs text-neutral-600 hover:text-neutral-900 transition-colors min-w-0 flex-1"
                                >
                                  <Mail size={13} className="shrink-0" style={{ color: `rgb(${accent.rgb})` }} />
                                  <span className="truncate">{member.email}</span>
                                </a>
                                <button
                                  type="button"
                                  onClick={() => member.email && handleCopy(member.email)}
                                  aria-label="Copy email"
                                  className="shrink-0 w-7 h-7 rounded-lg border border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 flex items-center justify-center text-neutral-400 hover:text-neutral-700 transition-colors"
                                >
                                  {emailCopied ? <Check size={12} /> : <Copy size={11} />}
                                </button>
                              </div>
                            )}
                            {member.phone && (
                              <a
                                href={`tel:${member.phone.replace(/\s/g, "")}`}
                                className="flex items-center gap-2 text-xs text-neutral-600 hover:text-neutral-900 transition-colors"
                              >
                                <Phone size={13} className="shrink-0" style={{ color: `rgb(${accent.rgb})` }} />
                                <span className="tabular-nums">{member.phone}</span>
                              </a>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── Footer CTA card ── */}
        <div className="mt-16 relative rounded-3xl overflow-hidden border border-neutral-200 bg-gradient-to-br from-neutral-900 via-neutral-900 to-orange-950 text-white p-8 lg:p-12">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-500/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] uppercase text-orange-300 mb-4">
                <Headphones size={12} /> Talk to a Specialist
              </div>
              <h3
                className="leading-tight mb-3"
                style={{
                  fontFamily: "var(--font-display, var(--font-syne))",
                  fontWeight: 800,
                  fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
                  letterSpacing: "-0.035em",
                }}
              >
                Need a quote, datasheet, or site visit?
              </h3>
              <p className="text-white/65 text-sm md:text-base leading-relaxed">
                Reach the regional team directly - we route your enquiry to the right specifier within one business day.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <a
                href="mailto:sales@gulfoflex.com"
                className="inline-flex items-center justify-between gap-3 px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Mail size={14} /> sales@gulfoflex.com
                </span>
                <ArrowUpRight size={14} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-between gap-3 px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-bold text-sm transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Globe2 size={14} /> Contact Page
                </span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Copied toast */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold flex items-center gap-2 shadow-2xl"
            >
              <Check size={13} className="text-orange-400" />
              Email copied to clipboard
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
