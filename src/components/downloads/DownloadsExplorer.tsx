"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Award,
  Check,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Grid3x3,
  List,
  Package,
  Search,
  Share2,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";

type FileItem = {
  name: string;
  size: string;
  type: string;
  href?: string;
  badge?: "NEW" | "UPDATED" | "POPULAR";
  downloads?: number;
  updated?: string;
};

type Category = {
  key: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  name: string;
  desc: string;
  accent: string; // tailwind-compatible RGB triplet, e.g. "249,115,22"
  files: FileItem[];
};

const categories: Category[] = [
  {
    key: "datasheets",
    icon: FileText,
    name: "Product Datasheets",
    accent: "249,115,22",
    desc: "Full product specifications, performance data, and application guidance.",
    files: [
      { name: "Gulf-O-Flex® NBR - Full Datasheet", size: "2.4 MB", type: "PDF", badge: "POPULAR", href: "/images/downloads/Gulf_O_Flex tds.pdf", downloads: 12480, updated: "2026-04-12" },
      { name: "Gulf-O-Flex® Aluglass - Datasheet", size: "1.6 MB", type: "PDF", href: "/images/downloads/TDS Aluglass_Final.pdf", downloads: 6810, updated: "2026-03-18" },
      { name: "Material Safety Data Sheet (MSDS)", size: "0.8 MB", type: "PDF", href: "/images/downloads/MSDS_design.pdf", downloads: 4210, updated: "2026-03-01" },
      { name: "Storage & Handling Guide", size: "1.2 MB", type: "PDF", href: "/images/downloads/Storage and Handling.pdf", downloads: 3520, updated: "2026-02-15" },
    ],
  },
  {
    key: "certifications",
    icon: Award,
    name: "Certifications & Test Reports",
    accent: "234,88,12",
    desc: "ISO certifications, fire & life safety approvals, and UAE compliance documents.",
    files: [
      { name: "ISO 9001:2015 Quality Management Certificate", size: "0.5 MB", type: "PDF", href: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-ISO-9001.pdf", downloads: 9210, updated: "2025-11-08" },
      { name: "ISO 14001:2015 Environmental Management Certificate", size: "0.5 MB", type: "PDF", href: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-ISO-14001:2015.pdf", downloads: 6450, updated: "2025-11-08" },
      { name: "ISO 45001:2018 Occupational H&S Certificate", size: "0.5 MB", type: "PDF", href: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-ISO-45001-2028.pdf", downloads: 5104, updated: "2025-11-08" },
      { name: "FM Approved Certificate - FM 4924", size: "1.2 MB", type: "PDF", href: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-FM-4924.pdf", badge: "POPULAR", downloads: 8820, updated: "2026-02-01" },
      { name: "UL Listed Certificate - ASTM E84 / UL 723", size: "0.8 MB", type: "PDF", downloads: 4710, updated: "2026-01-22" },
      { name: "DCL Certificate - Dubai Central Laboratory", size: "0.6 MB", type: "PDF", href: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-DCL-Al-Safat-Dubai-Green-Building.pdf", downloads: 3940, updated: "2026-02-14" },
      { name: "DCD Approval - Dubai Civil Defence", size: "0.7 MB", type: "PDF", href: "https://gulfoflexstorage.blob.core.windows.net/certificate-test-reports/Certificate-DCD.pdf", downloads: 4280, updated: "2026-02-14" },
      { name: "EPD - Environmental Product Declaration", size: "1.4 MB", type: "PDF", badge: "UPDATED", downloads: 2810, updated: "2026-04-30" },
    ],
  },
  {
    key: "guides",
    icon: Wrench,
    name: "Installation Guides",
    accent: "194,65,12",
    desc: "Step-by-step instructions and best practice guides for installation.",
    files: [
      { name: "Installation Manual - Gulf-O-Flex®", size: "3.5 MB", type: "PDF", badge: "POPULAR", href: "/images/downloads/Installation Manual - Gulf O Flex®.pdf", downloads: 8920, updated: "2026-03-15" },
    ],
  },

];

const allTypes = Array.from(new Set(categories.flatMap((c) => c.files.map((f) => f.type)))).sort();

const sortOptions = [
  { value: "popular", label: "Most Downloaded" },
  { value: "newest", label: "Recently Updated" },
  { value: "az", label: "A → Z" },
  { value: "size", label: "File Size" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

export default function DownloadsExplorer() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [view, setView] = useState<"grid" | "list">("list");
  const [sort, setSort] = useState<SortValue>("popular");
  const [copied, setCopied] = useState<string | null>(null);

  const toggleType = (t: string) =>
    setActiveTypes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((c) => activeCat === "all" || c.key === activeCat)
      .map((c) => {
        const files = c.files
          .filter((f) => !q || f.name.toLowerCase().includes(q))
          .filter((f) => activeTypes.length === 0 || activeTypes.includes(f.type))
          .slice() // copy
          .sort((a, b) => {
            switch (sort) {
              case "popular":
                return (b.downloads ?? 0) - (a.downloads ?? 0);
              case "newest":
                return (b.updated ?? "").localeCompare(a.updated ?? "");
              case "az":
                return a.name.localeCompare(b.name);
              case "size":
                return parseFloat(b.size) - parseFloat(a.size);
            }
          });
        return { ...c, files };
      })
      .filter((c) => c.files.length > 0);
  }, [query, activeCat, activeTypes, sort]);

  const matchCount = results.reduce((s, c) => s + c.files.length, 0);
  const totalFiles = categories.reduce((s, c) => s + c.files.length, 0);

  const handleCopy = async (name: string, href?: string) => {
    const url =
      href && href.startsWith("http")
        ? href
        : typeof window !== "undefined"
        ? `${window.location.origin}/downloads#${encodeURIComponent(name)}`
        : name;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(name);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      /* silently ignore clipboard errors */
    }
  };

  const hasFilters = activeTypes.length > 0 || activeCat !== "all" || !!query;
  const resetAll = () => {
    setActiveTypes([]);
    setActiveCat("all");
    setQuery("");
  };

  return (
    <>
      {/* ── Top bar (search · sort · view · count) ── */}
      <section className="sticky top-[72px] z-30 border-b border-neutral-200/70 bg-white/85 backdrop-blur-xl">
        <div className="container-wide py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-2xl">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search datasheets, certifications, guides, BIM…"
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-medium text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 transition"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition"
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Right toolbar */}
            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortValue)}
                className="px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-700 focus:outline-none focus:border-orange-400 cursor-pointer"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    Sort · {o.label}
                  </option>
                ))}
              </select>

              <div className="flex items-center rounded-xl border border-neutral-200 bg-neutral-50 p-1">
                <button
                  onClick={() => setView("list")}
                  aria-label="List view"
                  className={`p-2 rounded-lg transition ${view === "list" ? "bg-white shadow-sm text-orange-600" : "text-neutral-500 hover:text-neutral-700"}`}
                >
                  <List size={15} />
                </button>
                <button
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={`p-2 rounded-lg transition ${view === "grid" ? "bg-white shadow-sm text-orange-600" : "text-neutral-500 hover:text-neutral-700"}`}
                >
                  <Grid3x3 size={15} />
                </button>
              </div>

              <div className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-50 border border-orange-200">
                <Sparkles size={13} className="text-orange-600" />
                <span className="text-[11px] font-bold tracking-wider uppercase text-orange-700">
                  {matchCount} / {totalFiles} files
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body: Filters (left) · Results (right) ── */}
      <section className="py-10 md:py-14 bg-gradient-to-b from-white via-neutral-50/40 to-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10">
            {/* ── Sidebar ── */}
            <aside className="lg:sticky lg:top-[168px] lg:self-start lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto scrollbar-thin">
              <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                    <Filter size={11} /> Filters
                  </div>
                  {hasFilters && (
                    <button
                      onClick={resetAll}
                      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-orange-600 hover:text-orange-700"
                    >
                      <X size={11} /> Reset
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 mb-2.5 px-1">
                    Categories
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <SidebarChip
                      active={activeCat === "all"}
                      onClick={() => setActiveCat("all")}
                      label="All Categories"
                      icon={Package}
                      accent="0,0,0"
                      count={totalFiles}
                    />
                    {categories.map((c) => (
                      <SidebarChip
                        key={c.key}
                        active={activeCat === c.key}
                        onClick={() => setActiveCat(c.key)}
                        label={c.name}
                        icon={c.icon}
                        accent={c.accent}
                        count={c.files.length}
                      />
                    ))}
                  </div>
                </div>

                {/* Format */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 mb-2.5 px-1">
                    Format
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {allTypes.map((t) => {
                      const active = activeTypes.includes(t);
                      return (
                        <button
                          key={t}
                          onClick={() => toggleType(t)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition ${
                            active
                              ? "bg-neutral-900 text-white border border-neutral-900"
                              : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Results ── */}
            <div className="space-y-10 min-w-0">
              {results.length === 0 && (
                <div className="text-center py-24 border-2 border-dashed border-neutral-200 rounded-3xl">
                  <Search size={28} className="text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-500 font-semibold">No files match your filters.</p>
                  <p className="text-neutral-400 text-sm mt-1">Try a different keyword or reset filters.</p>
                </div>
              )}

              {results.map((cat) => (
                <div key={cat.key} id={cat.key} className="scroll-mt-44">
                  {/* Section header */}
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        background: `linear-gradient(135deg, rgba(${cat.accent},0.16), rgba(${cat.accent},0.04))`,
                        border: `1px solid rgba(${cat.accent},0.28)`,
                      }}
                    >
                      <span style={{ color: `rgb(${cat.accent})`, display: "contents" }}><cat.icon size={18} strokeWidth={2.2} /></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-neutral-900 font-bold truncate" style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", letterSpacing: "-0.02em" }}>
                        {cat.name}
                      </h2>
                      <p className="text-neutral-500 text-sm truncate">{cat.desc}</p>
                    </div>
                    <span className="hidden md:inline text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 shrink-0">
                      {cat.files.length} file{cat.files.length === 1 ? "" : "s"}
                    </span>
                  </div>

                  {/* Files */}
                  {view === "list" ? (
                    <div
                      className="rounded-2xl border bg-white overflow-hidden"
                      style={{ borderColor: "rgba(0,0,0,0.06)" }}
                    >
                      <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                        {cat.files.map((f) => (
                          <FileRow key={f.name} file={f} accent={cat.accent} onCopy={() => handleCopy(f.name, f.href)} copied={copied === f.name} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {cat.files.map((f) => (
                        <FileCard key={f.name} file={f} accent={cat.accent} onCopy={() => handleCopy(f.name, f.href)} copied={copied === f.name} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden py-20" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 grid-bg opacity-[0.10]" />
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-500/20 blur-[90px] pointer-events-none" />
        <div className="absolute -right-32 bottom-0 w-80 h-80 rounded-full bg-orange-500/12 blur-[80px] pointer-events-none" />
        <div className="container-wide relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.22em] uppercase mb-5"
               style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.30)", color: "#fb923c" }}>
            <Sparkles size={11} /> AI-Powered Support
          </div>
          <h2 className="text-white leading-[1.05] mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            Need a custom<br /><span className="serif-italic text-orange-400">spec or report?</span>
          </h2>
          <p className="text-white/55 max-w-xl mx-auto mb-8">
            Use Gulf-O-Flex Assist to generate custom technical calculations, compliance reports, and product selection guidance for your specific project.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="https://gulfoflexassist.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Launch GOF Assist <ExternalLink size={14} />
            </Link>
            <Link href="/contact" className="btn-ghost" style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.18)" }}>
              Contact Technical Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ───────── helpers ───────── */

function SidebarChip({
  active,
  onClick,
  label,
  icon: Icon,
  accent,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all group"
      style={{
        background: active ? `rgba(${accent},0.10)` : "transparent",
        border: `1px solid ${active ? `rgba(${accent},0.30)` : "transparent"}`,
      }}
    >
      <span
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition"
        style={{
          background: active ? `rgb(${accent})` : `rgba(${accent},0.10)`,
          color: active ? "white" : `rgb(${accent})`,
        }}
      >
        <Icon size={13} />
      </span>
      <span
        className="flex-1 text-[12.5px] font-bold tracking-tight truncate transition"
        style={{ color: active ? `rgb(${accent})` : "#404040" }}
      >
        {label}
      </span>
      <span
        className="inline-flex items-center justify-center min-w-[22px] h-[19px] px-1.5 rounded-full text-[10px] font-black shrink-0"
        style={{
          background: active ? `rgb(${accent})` : "rgba(0,0,0,0.05)",
          color: active ? "white" : "#525252",
        }}
      >
        {count}
      </span>
    </button>
  );
}

function BadgePill({ kind }: { kind: "NEW" | "UPDATED" | "POPULAR" }) {
  const palette =
    kind === "NEW"
      ? { bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.35)", color: "#f97316" }
      : kind === "UPDATED"
      ? { bg: "rgba(115,115,115,0.12)", border: "rgba(115,115,115,0.35)", color: "#525252" }
      : { bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.35)", color: "#ea580c" };
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black tracking-[0.18em] uppercase"
      style={{ background: palette.bg, border: `1px solid ${palette.border}`, color: palette.color }}
    >
      {kind}
    </span>
  );
}

function FileRow({ file, accent, onCopy, copied }: { file: FileItem; accent: string; onCopy: () => void; copied: boolean }) {
  const href = file.href ?? "#";
  const external = !!file.href && file.href.startsWith("http");
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4 group hover:bg-neutral-50/60 transition">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `linear-gradient(135deg, rgba(${accent},0.14), rgba(${accent},0.04))`,
            border: `1px solid rgba(${accent},0.22)`,
          }}
        >
          <span className="text-[9px] font-black tabular-nums" style={{ color: `rgb(${accent})` }}>{file.type}</span>
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-neutral-800 text-sm font-semibold truncate group-hover:text-neutral-900">{file.name}</span>
            {file.badge && <BadgePill kind={file.badge} />}
          </div>
          <div className="flex items-center gap-3 mt-1 text-[11px] text-neutral-500 font-medium">
            <span className="tabular-nums">{file.size}</span>
            {file.updated && (
              <>
                <span className="text-neutral-300">•</span>
                <span>Updated {new Date(file.updated).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
              </>
            )}
            {typeof file.downloads === "number" && (
              <>
                <span className="text-neutral-300">•</span>
                <span className="inline-flex items-center gap-1"><Eye size={11} /> {file.downloads.toLocaleString()} downloads</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onCopy}
          title="Copy link"
          className="w-9 h-9 rounded-full border border-neutral-200 bg-white hover:border-neutral-400 flex items-center justify-center transition"
        >
          {copied ? <Check size={13} className="text-orange-500" /> : <Share2 size={13} className="text-neutral-600" />}
        </button>
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1.5 pl-3 pr-3 h-9 rounded-full text-white text-xs font-bold tracking-wider uppercase transition hover:scale-[1.04]"
          style={{ background: `rgb(${accent})` }}
        >
          <Download size={13} /> Get
        </a>
      </div>
    </div>
  );
}

function FileCard({ file, accent, onCopy, copied }: { file: FileItem; accent: string; onCopy: () => void; copied: boolean }) {
  const href = file.href ?? "#";
  const external = !!file.href && file.href.startsWith("http");
  return (
    <div
      className="group relative rounded-2xl bg-white border overflow-hidden p-5 transition-all duration-500 hover:-translate-y-1"
      style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 1px 0 rgba(0,0,0,0.02)" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1 opacity-0 group-hover:opacity-100 transition"
        style={{ background: `linear-gradient(90deg, transparent, rgb(${accent}), transparent)` }}
      />
      <div className="flex items-start justify-between mb-4">
        <span
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, rgba(${accent},0.14), rgba(${accent},0.04))`,
            border: `1px solid rgba(${accent},0.22)`,
          }}
        >
          <span className="text-[10px] font-black tabular-nums" style={{ color: `rgb(${accent})` }}>{file.type}</span>
        </span>
        {file.badge && <BadgePill kind={file.badge} />}
      </div>
      <h3 className="text-neutral-900 font-bold leading-snug text-sm mb-2 line-clamp-2 min-h-[40px]">{file.name}</h3>
      <div className="flex items-center gap-3 text-[11px] text-neutral-500 font-medium mb-4">
        <span className="tabular-nums">{file.size}</span>
        {typeof file.downloads === "number" && (
          <span className="inline-flex items-center gap-1 ml-auto"><Eye size={11} /> {file.downloads.toLocaleString()}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-xl text-white text-xs font-bold tracking-wider uppercase transition hover:scale-[1.02]"
          style={{ background: `rgb(${accent})` }}
        >
          <Download size={13} /> Download
        </a>
        <button
          type="button"
          onClick={onCopy}
          title="Copy link"
          className="w-10 h-10 rounded-xl border border-neutral-200 bg-white hover:border-neutral-400 flex items-center justify-center transition"
        >
          {copied ? <Check size={14} className="text-orange-500" /> : <Copy size={14} className="text-neutral-600" />}
        </button>
      </div>
    </div>
  );
}
