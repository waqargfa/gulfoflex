"use client";

import { useState, useEffect } from "react";
import { Mail, Phone } from "lucide-react";
import { useCountry } from "@/context/CountryContext";

// Map CountryContext codes → TeamSection codes
const COUNTRY_CODE_MAP: Record<string, string> = {
  ae: "uae",
  sa: "ksa",
  qa: "qatar",
  kw: "kuwait",
  bh: "bahrain",
  om: "oman",
};

type TeamMember = {
  name: string;
  role: string;
  roleType: "head" | "sales";
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
      { name: "TBA", role: "Head of Sales", roleType: "head", email: "sales@gulfoflex.com", phone: "+971 6 000 0000" },
      { name: "TBA", role: "Senior Sales Manager", roleType: "sales", email: "sales@gulfoflex.com" },
      { name: "TBA", role: "Sales Executive", roleType: "sales", email: "sales@gulfoflex.com" },
    ],
  },
  {
    country: "Saudi Arabia",
    flag: "🇸🇦",
    code: "ksa",
    members: [
      { name: "TBA", role: "Head of Sales — KSA", roleType: "head", email: "ksa@gulfoflex.com", phone: "+966 00 000 0000" },
      { name: "TBA", role: "Sales Executive", roleType: "sales", email: "ksa@gulfoflex.com" },
    ],
  },
  {
    country: "Qatar",
    flag: "🇶🇦",
    code: "qatar",
    members: [
      { name: "TBA", role: "Head of Sales — Qatar", roleType: "head", email: "qatar@gulfoflex.com", phone: "+974 000 00000" },
      { name: "TBA", role: "Sales Executive", roleType: "sales", email: "qatar@gulfoflex.com" },
    ],
  },
  {
    country: "Kuwait",
    flag: "🇰🇼",
    code: "kuwait",
    members: [
      { name: "TBA", role: "Head of Sales — Kuwait", roleType: "head", email: "kuwait@gulfoflex.com", phone: "+965 0000 0000" },
      { name: "TBA", role: "Sales Executive", roleType: "sales", email: "kuwait@gulfoflex.com" },
    ],
  },
  {
    country: "Bahrain",
    flag: "🇧🇭",
    code: "bahrain",
    members: [
      { name: "TBA", role: "Head of Sales — Bahrain", roleType: "head", email: "bahrain@gulfoflex.com", phone: "+973 0000 0000" },
    ],
  },
  {
    country: "Oman",
    flag: "🇴🇲",
    code: "oman",
    members: [
      { name: "TBA", role: "Head of Sales — Oman", roleType: "head", email: "oman@gulfoflex.com", phone: "+968 0000 0000" },
      { name: "TBA", role: "Sales Executive", roleType: "sales", email: "oman@gulfoflex.com" },
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

export default function TeamSection() {
  const { country } = useCountry();

  const teamCode = COUNTRY_CODE_MAP[country.code] ?? "all";
  const defaultTab = teams.some((t) => t.code === teamCode) ? teamCode : "all";

  const [activeCountry, setActiveCountry] = useState(defaultTab);

  // When the global country changes, switch the active tab automatically
  useEffect(() => {
    const mapped = COUNTRY_CODE_MAP[country.code] ?? "all";
    setActiveCountry(teams.some((t) => t.code === mapped) ? mapped : "all");
  }, [country.code]);

  const displayed =
    activeCountry === "all"
      ? teams
      : teams.filter((t) => t.code === activeCountry);

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="eyebrow justify-center mb-4">
            <span className="eyebrow-dot" />Sales Network
          </div>
          <h2
            className="text-neutral-900 font-black text-4xl mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Meet Our Sales Team
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto text-base leading-relaxed">
            Our dedicated sales professionals are ready to assist you across the GCC region and beyond.
          </p>
        </div>

        {/* Country filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCountry("all")}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
              activeCountry === "all"
                ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/25"
                : "border-neutral-200 text-neutral-500 hover:border-orange-400 hover:text-orange-600 bg-white"
            }`}
          >
            All Countries
          </button>
          {teams.map((t) => (
            <button
              key={t.code}
              onClick={() => setActiveCountry(t.code)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 flex items-center gap-2 ${
                activeCountry === t.code
                  ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/25"
                  : "border-neutral-200 text-neutral-500 hover:border-orange-400 hover:text-orange-600 bg-white"
              }`}
            >
              <span>{t.flag}</span>
              {t.country}
            </button>
          ))}
        </div>

        {/* Teams grid */}
        <div className="space-y-10">
          {displayed.map((team) => (
            <div key={team.code}>
              {/* Country header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{team.flag}</span>
                <h3
                  className="text-neutral-900 font-black text-2xl"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {team.country}
                </h3>
                <div className="flex-1 h-px bg-neutral-200" />
                <span className="tag text-[9px]">{team.members.length} member{team.members.length > 1 ? "s" : ""}</span>
              </div>

              {/* Members */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {team.members.map((member, idx) => (
                  <div
                    key={idx}
                    className="glass-card rounded-2xl border border-neutral-200 p-6 hover-lift flex flex-col gap-4 group"
                  >
                    {/* Avatar */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black shrink-0 ${
                          member.roleType === "head"
                            ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                            : "bg-neutral-100 border border-neutral-200 text-neutral-500"
                        }`}
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {getInitials(member.name)}
                      </div>
                      {member.roleType === "head" && (
                        <span className="text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/20">
                          Head
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div>
                      <div
                        className="text-neutral-900 font-bold text-base mb-0.5"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {member.name === "TBA" ? (
                          <span className="text-neutral-400 italic">Name — TBA</span>
                        ) : (
                          member.name
                        )}
                      </div>
                      <div className="text-neutral-500 text-sm">{member.role}</div>
                    </div>

                    {/* Contact */}
                    <div className="mt-auto space-y-1.5 pt-2 border-t border-neutral-100">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 text-xs text-neutral-500 hover:text-orange-600 transition-colors group/link"
                        >
                          <Mail size={12} className="shrink-0" />
                          <span className="truncate">{member.email}</span>
                        </a>
                      )}
                      {member.phone && (
                        <a
                          href={`tel:${member.phone.replace(/\s/g, "")}`}
                          className="flex items-center gap-2 text-xs text-neutral-500 hover:text-orange-600 transition-colors"
                        >
                          <Phone size={12} className="shrink-0" />
                          {member.phone}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-neutral-400 text-sm mt-12">
          Team details are being updated. For immediate assistance, reach us at{" "}
          <a href="mailto:sales@gulfoflex.com" className="text-orange-600 hover:underline">
            sales@gulfoflex.com
          </a>
        </p>
      </div>
    </section>
  );
}
