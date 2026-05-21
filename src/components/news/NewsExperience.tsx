"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import {
  ArrowUpRight,
  Calendar,
  Tag,
  Newspaper,
  Search,
  LayoutGrid,
  List,
  Clock,
  TrendingUp,
  Radio,
  Sparkles,
  Bookmark,
  Filter,
  X,
  Mail,
  CheckCircle2,
  Rss,
} from "lucide-react";

export type Article = {
  title: string;
  date: string;        // human-readable
  iso: string;         // ISO date for sorting / <time>
  category: string;
  color: string;
  summary: string;
  featured?: boolean;
  readTime: number;    // minutes
  author: string;
  tags: string[];
  trending?: boolean;
  image?: string;      // optional cover image
};

const accentMap: Record<string, { text: string; bg: string; border: string; ring: string }> = {
  orange: { text: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200", ring: "ring-orange-500/30" },
  blue:   { text: "text-blue-700",   bg: "bg-blue-50",   border: "border-blue-200",   ring: "ring-blue-500/30" },
  green:  { text: "text-emerald-700",bg: "bg-emerald-50",border: "border-emerald-200",ring: "ring-emerald-500/30" },
  purple: { text: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200", ring: "ring-purple-500/30" },
  cyan:   { text: "text-cyan-700",   bg: "bg-cyan-50",   border: "border-cyan-200",   ring: "ring-cyan-500/30" },
};

function useCountUp(target: number, durationMs = 1200, start = true) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, start]);
  return value;
}

export default function NewsExperience({
  articles,
  categories,
}: {
  articles: Article[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Sticky filter bar shadow on scroll
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Persist bookmarks
  useEffect(() => {
    try {
      const raw = localStorage.getItem("gof-news-bookmarks");
      if (raw) setBookmarks(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("gof-news-bookmarks", JSON.stringify(bookmarks));
    } catch {}
  }, [bookmarks]);

  const featured = useMemo(() => articles.filter((a) => a.featured), [articles]);
  const trending = useMemo(() => articles.filter((a) => a.trending).slice(0, 5), [articles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = articles.filter((a) => !a.featured);
    if (activeCat !== "All") list = list.filter((a) => a.category === activeCat);
    if (q) {
      list = list.filter((a) =>
        [a.title, a.summary, a.category, a.author, ...a.tags].join(" ").toLowerCase().includes(q),
      );
    }
    list = [...list].sort((a, b) => {
      const da = new Date(a.iso).getTime();
      const db = new Date(b.iso).getTime();
      return sort === "newest" ? db - da : da - db;
    });
    return list;
  }, [articles, activeCat, query, sort]);

  // Animated stat counts
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => {
    if (!heroRef.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setHeroIn(true), { threshold: 0.2 });
    io.observe(heroRef.current);
    return () => io.disconnect();
  }, []);
  const cStories = useCountUp(articles.length, 900, heroIn);
  const cFeatured = useCountUp(featured.length, 900, heroIn);
  const cYears = useCountUp(30, 1100, heroIn);
  const cMarkets = useCountUp(90, 1300, heroIn);

  const toggleBookmark = (title: string) => {
    setBookmarks((b) => ({ ...b, [title]: !b[title] }));
  };

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/.+@.+\..+/.test(email)) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  const tickerItems = [...articles].slice(0, 6);

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-20"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}
      >
        <PageHero src="https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=2400&q=80" focalY="40%" />

        <div className="container-wide relative z-10" ref={heroRef}>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                <span className="text-neutral-300">/</span>
                <span className="text-neutral-700">News &amp; Media</span>
              </nav>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="eyebrow"><span className="eyebrow-dot" />Newsroom · {articles.length} stories</div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
                  <Radio size={10} className="animate-pulse" /> Live
                </div>
              </div>

              <h1
                className="text-neutral-900 leading-[0.95] mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                Latest news &amp;<br />
                <span className="gradient-text">industry updates</span>
                <span className="serif-italic text-orange-600">.</span>
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                Product launches, certification achievements, market expansions, and industry insights from
                Gulf-O-Flex® and Rubber World Industry LLC.
              </p>

              {/* Quick search */}
              <div className="relative max-w-xl">
                <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search news, certifications, projects…"
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border bg-white/90 backdrop-blur text-sm shadow-[0_20px_50px_-30px_rgba(234,88,12,0.30)] focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-300 transition"
                  style={{ borderColor: "rgba(0,0,0,0.08)" }}
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/15 to-transparent rounded-[2rem] blur-3xl pointer-events-none" />
              <div
                className="relative rounded-3xl border bg-white/90 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(234,88,12,0.20)]"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}
              >
                <div className="px-7 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <Newspaper size={14} className="text-orange-600" />
                    <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">Newsroom · {new Date().getFullYear()}</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(0,0,0,0.06)" }}>
                  {[
                    { n: cStories, l: "Recent stories", suffix: "" },
                    { n: cFeatured, l: "Featured", suffix: "" },
                    { n: cYears, l: "Years coverage", suffix: "+" },
                    { n: cMarkets, l: "Markets", suffix: "+" },
                  ].map((s) => (
                    <div key={s.l} className="bg-white p-6">
                      <div
                        className="text-neutral-900 font-black mb-1"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
                          letterSpacing: "-0.025em",
                        }}
                      >
                        {s.n}{s.suffix}
                      </div>
                      <div className="text-neutral-500 text-[10px] uppercase tracking-[0.18em] font-bold">{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* Live ticker */}
                <div className="border-t px-7 py-3 flex items-center gap-3 overflow-hidden" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600 shrink-0">
                    <Sparkles size={11} /> Wire
                  </span>
                  <div className="relative flex-1 overflow-hidden">
                    <div className="flex gap-8 whitespace-nowrap animate-[ticker_30s_linear_infinite]">
                      {[...tickerItems, ...tickerItems].map((t, i) => (
                        <span key={i} className="text-xs text-neutral-600">
                          <span className="text-orange-600 font-bold">{t.category}</span>
                          <span className="mx-2 text-neutral-300">·</span>
                          {t.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ── Featured spotlight ── */}
      {featured.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container-wide">
            <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
              <div>
                <div className="eyebrow mb-3"><span className="eyebrow-dot" />Featured Stories</div>
                <h2
                  className="text-neutral-900"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Top of the <span className="serif-italic text-orange-600">newsroom.</span>
                </h2>
              </div>
              <Link
                href="#all-stories"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-orange-600 transition-colors"
              >
                Browse all <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
              {/* Main featured */}
              {featured[0] && <FeaturedHero article={featured[0]} bookmarked={!!bookmarks[featured[0].title]} onBookmark={toggleBookmark} />}

              {/* Secondary featured + trending */}
              <div className="grid grid-rows-2 gap-5">
                {featured[1] && <FeaturedSide article={featured[1]} bookmarked={!!bookmarks[featured[1].title]} onBookmark={toggleBookmark} />}

                {/* Trending list */}
                <div
                  className="rounded-3xl border bg-gradient-to-br from-neutral-50 to-white p-6 overflow-hidden"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] uppercase text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full">
                      <TrendingUp size={11} /> Trending now
                    </span>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-[0.18em] font-bold">Updated daily</span>
                  </div>
                  <ol className="space-y-3">
                    {trending.map((t, i) => (
                      <li key={t.title} className="group flex gap-3 items-start cursor-pointer">
                        <span
                          className="text-orange-500/80 font-black shrink-0 mt-0.5"
                          style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", letterSpacing: "-0.02em" }}
                        >
                          0{i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-neutral-800 font-semibold leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                            {t.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500">
                            <span>{t.category}</span>
                            <span className="text-neutral-300">·</span>
                            <span className="inline-flex items-center gap-1"><Clock size={10} />{t.readTime} min</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Sticky filter bar + grid ── */}
      <section id="all-stories" className="pt-6 pb-20 md:pb-28 bg-white">
        <div
          className={`sticky top-16 z-30 -mx-4 sm:mx-0 backdrop-blur-xl bg-white/80 border-y transition-shadow ${
            stuck ? "shadow-[0_10px_30px_-20px_rgba(0,0,0,0.20)]" : ""
          }`}
          style={{ borderColor: "rgba(0,0,0,0.06)" }}
        >
          <div className="container-wide py-3 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-500 mr-1">
              <Filter size={12} /> Filter
            </div>
            <div className="flex flex-wrap gap-2 flex-1 min-w-0">
              {categories.map((cat) => {
                const active = activeCat === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCat(cat)}
                    className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
                      active
                        ? "bg-orange-600 text-white border-orange-600 shadow-[0_8px_24px_-10px_rgba(234,88,12,0.6)]"
                        : "bg-white text-neutral-600 border-neutral-200 hover:text-neutral-900 hover:border-neutral-300"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border bg-white text-neutral-700 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                style={{ borderColor: "rgba(0,0,0,0.10)" }}
                aria-label="Sort order"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
              <div className="inline-flex rounded-full border p-0.5 bg-white" style={{ borderColor: "rgba(0,0,0,0.10)" }}>
                <button
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                    view === "grid" ? "bg-neutral-900 text-white" : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  <LayoutGrid size={14} />
                </button>
                <button
                  onClick={() => setView("list")}
                  aria-label="List view"
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                    view === "list" ? "bg-neutral-900 text-white" : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-wide pt-10">
          <div className="flex items-center justify-between mb-6 text-sm">
            <p className="text-neutral-500">
              Showing <span className="font-bold text-neutral-900">{filtered.length}</span> of{" "}
              <span className="font-bold text-neutral-900">{articles.filter((a) => !a.featured).length}</span> stories
              {activeCat !== "All" && (
                <>
                  {" "}in <span className="font-semibold text-orange-600">{activeCat}</span>
                </>
              )}
              {query && (
                <>
                  {" "}matching <span className="font-semibold text-orange-600">&ldquo;{query}&rdquo;</span>
                </>
              )}
            </p>
            {(activeCat !== "All" || query) && (
              <button
                onClick={() => { setActiveCat("All"); setQuery(""); }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-orange-600"
              >
                <X size={12} /> Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <EmptyState onReset={() => { setActiveCat("All"); setQuery(""); }} />
          ) : view === "grid" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((a, i) => (
                <ArticleCard key={a.title} a={a} index={i} bookmarked={!!bookmarks[a.title]} onBookmark={toggleBookmark} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((a, i) => (
                <ArticleRow key={a.title} a={a} index={i} bookmarked={!!bookmarks[a.title]} onBookmark={toggleBookmark} />
              ))}
            </div>
          )}

          {/* Newsletter */}
          <div
            className="mt-20 relative overflow-hidden rounded-[2rem] border bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8 md:p-12"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="absolute inset-0 grid-bg opacity-[0.08]" />
            <div className="absolute -top-24 -right-20 w-[420px] h-[420px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-20 w-[380px] h-[380px] bg-orange-400/14 rounded-full blur-[90px] pointer-events-none" />
            <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
              <div>
                <div
                  className="eyebrow mb-5"
                  style={{ background: "rgba(249,115,22,0.12)", borderColor: "rgba(249,115,22,0.30)", color: "#fb923c" }}
                >
                  <span className="eyebrow-dot" />Newsroom delivered
                </div>
                <h3
                  className="text-white leading-[1.05] mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.035em",
                  }}
                >
                  Get the Gulf-O-Flex® <span className="serif-italic text-orange-400">monthly brief.</span>
                </h3>
                <p className="text-white/60 max-w-lg leading-relaxed">
                  Curated product launches, certification updates, project wins and technical notes — straight to your inbox. No spam.
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 text-white/50 text-xs">
                  <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={13} className="text-orange-400" /> Once a month</span>
                  <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={13} className="text-orange-400" /> Unsubscribe any time</span>
                  <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={13} className="text-orange-400" /> 3-minute read</span>
                </div>
              </div>
              <form
                onSubmit={onSubscribe}
                className="rounded-2xl border bg-white/[0.04] backdrop-blur p-5"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-orange-400 mb-2">
                  Your work email
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border bg-black/30 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/40"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    />
                  </div>
                  <button type="submit" className="btn-primary !py-3">
                    {subscribed ? <><CheckCircle2 size={16} /> Subscribed</> : <>Subscribe <ArrowUpRight size={16} /></>}
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-4 text-[11px] text-white/40">
                  <Rss size={12} />
                  Prefer a reader? <a href="/rss.xml" className="text-orange-400 hover:text-orange-300 underline-offset-4 hover:underline">RSS feed</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ────────────────────────── Sub-components ────────────────────────── */

function FeaturedHero({
  article,
  bookmarked,
  onBookmark,
}: {
  article: Article;
  bookmarked: boolean;
  onBookmark: (title: string) => void;
}) {
  const c = accentMap[article.color] ?? accentMap.orange;
  return (
    <article
      className="group relative rounded-3xl border bg-white overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_50px_100px_-30px_rgba(234,88,12,0.40)] hover:border-orange-300/60 cursor-pointer"
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
    >
      {/* Visual */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700">
        {article.image ? (
          <>
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 grid-bg opacity-[0.18]" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/12 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-black/20 rounded-full blur-3xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-white/15 font-black tracking-tighter select-none"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(5rem, 14vw, 12rem)", letterSpacing: "-0.06em" }}
              >
                {article.category.split(" ")[0]}
              </span>
            </div>
          </>
        )}
        <div className="absolute top-5 left-5 flex items-center gap-2 z-10">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase text-white bg-white/15 border border-white/25 backdrop-blur px-2.5 py-1 rounded-full">
            <Sparkles size={10} /> Featured
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase text-white bg-black/30 border border-white/15 backdrop-blur px-2.5 py-1 rounded-full">
            <Tag size={10} /> {article.category}
          </span>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); onBookmark(article.title); }}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
          className={`absolute top-5 right-5 z-10 w-9 h-9 rounded-full backdrop-blur border flex items-center justify-center transition ${
            bookmarked ? "bg-white text-orange-600 border-white" : "bg-white/15 text-white border-white/25 hover:bg-white/25"
          }`}
        >
          <Bookmark size={14} fill={bookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-7 md:p-8">
        <div className="flex items-center gap-3 mb-4 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-1.5"><Calendar size={11} className="text-orange-600" /><time dateTime={article.iso}>{article.date}</time></span>
          <span className="text-neutral-300">·</span>
          <span className="inline-flex items-center gap-1.5"><Clock size={11} /> {article.readTime} min read</span>
          <span className="text-neutral-300">·</span>
          <span>By {article.author}</span>
        </div>
        <h3
          className="text-neutral-900 font-bold mb-3 group-hover:text-orange-600 transition-colors leading-tight"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.4vw, 2rem)", letterSpacing: "-0.025em" }}
        >
          {article.title}
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-5">{article.summary}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {article.tags.map((t) => (
            <span key={t} className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${c.text} ${c.bg} ${c.border}`}>
              #{t}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-5 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <span className="text-sm font-semibold text-orange-600 inline-flex items-center gap-1.5">
            Read full story <ArrowUpRight size={14} />
          </span>
          <span
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:bg-orange-500 group-hover:border-orange-500"
            style={{ borderColor: "rgba(0,0,0,0.10)" }}
          >
            <ArrowUpRight size={15} className="text-neutral-700 group-hover:text-white transition-colors" />
          </span>
        </div>
      </div>
    </article>
  );
}

function FeaturedSide({
  article,
  bookmarked,
  onBookmark,
}: {
  article: Article;
  bookmarked: boolean;
  onBookmark: (title: string) => void;
}) {
  const c = accentMap[article.color] ?? accentMap.orange;
  return (
    <article
      className="group relative rounded-3xl border bg-white overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.20)] hover:border-orange-300/60 cursor-pointer"
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      {article.image && (
        <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        </div>
      )}
      <div className="p-6 md:p-7">
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase border px-2.5 py-1 rounded-full ${c.text} ${c.bg} ${c.border}`}>
          <Tag size={9} />{article.category}
        </span>
        <button
          onClick={(e) => { e.preventDefault(); onBookmark(article.title); }}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition ${
            bookmarked ? "bg-orange-50 text-orange-600 border-orange-200" : "text-neutral-400 hover:text-orange-600"
          }`}
          style={{ borderColor: bookmarked ? undefined : "rgba(0,0,0,0.08)" }}
        >
          <Bookmark size={13} fill={bookmarked ? "currentColor" : "none"} />
        </button>
      </div>
      <h3
        className="text-neutral-900 font-bold mb-3 group-hover:text-orange-600 transition-colors leading-snug"
        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.15rem, 1.5vw, 1.4rem)", letterSpacing: "-0.02em" }}
      >
        {article.title}
      </h3>
      <p className="text-neutral-600 text-sm leading-relaxed mb-5 line-clamp-3">{article.summary}</p>
      <div className="flex items-center justify-between pt-4 border-t text-xs text-neutral-500" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex items-center gap-1"><Calendar size={11} className="text-orange-600" /><time dateTime={article.iso}>{article.date}</time></span>
          <span className="text-neutral-300">·</span>
          <span className="inline-flex items-center gap-1"><Clock size={11} />{article.readTime} min</span>
        </span>
        <span
          className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:bg-orange-500 group-hover:border-orange-500"
          style={{ borderColor: "rgba(0,0,0,0.10)" }}
        >
          <ArrowUpRight size={13} className="text-neutral-700 group-hover:text-white transition-colors" />
        </span>
      </div>
      </div>
    </article>
  );
}

function ArticleCard({
  a,
  index,
  bookmarked,
  onBookmark,
}: {
  a: Article;
  index: number;
  bookmarked: boolean;
  onBookmark: (title: string) => void;
}) {
  const c = accentMap[a.color] ?? accentMap.orange;
  return (
    <article
      className="group relative rounded-2xl border bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(234,88,12,0.30)] hover:border-orange-300/60 cursor-pointer flex flex-col"
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      <div className={`relative aspect-[16/9] overflow-hidden ${c.bg}`}>
        {a.image ? (
          <>
            <Image
              src={a.image}
              alt={a.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 grid-bg opacity-[0.10]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`opacity-30 font-black tracking-tighter select-none ${c.text}`}
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 8vw, 5rem)", letterSpacing: "-0.06em" }}
              >
                0{index + 1}
              </span>
            </div>
          </>
        )}
        <div className="absolute top-4 left-4 z-10">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase border px-2.5 py-1 rounded-full bg-white/90 backdrop-blur ${c.text} ${c.border}`}>
            <Tag size={9} />{a.category}
          </span>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); onBookmark(a.title); }}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
          className={`absolute top-4 right-4 z-10 w-8 h-8 rounded-full border flex items-center justify-center transition backdrop-blur ${
            bookmarked ? "bg-white text-orange-600 border-white" : "bg-white/70 text-neutral-600 border-white/80 hover:bg-white"
          }`}
        >
          <Bookmark size={13} fill={bookmarked ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3 text-[11px] text-neutral-500">
          <span className="inline-flex items-center gap-1"><Calendar size={10} className="text-orange-600" /><time dateTime={a.iso}>{a.date}</time></span>
          <span className="text-neutral-300">·</span>
          <span className="inline-flex items-center gap-1"><Clock size={10} />{a.readTime} min</span>
        </div>
        <h3
          className="text-neutral-900 font-bold mb-2 group-hover:text-orange-600 transition-colors leading-snug"
          style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", letterSpacing: "-0.018em" }}
        >
          {a.title}
        </h3>
        <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">{a.summary}</p>
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <span className="text-xs text-neutral-500">By {a.author}</span>
          <span
            className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:bg-orange-500 group-hover:border-orange-500"
            style={{ borderColor: "rgba(0,0,0,0.10)" }}
          >
            <ArrowUpRight size={13} className="text-neutral-700 group-hover:text-white transition-colors" />
          </span>
        </div>
      </div>
    </article>
  );
}

function ArticleRow({
  a,
  index,
  bookmarked,
  onBookmark,
}: {
  a: Article;
  index: number;
  bookmarked: boolean;
  onBookmark: (title: string) => void;
}) {
  const c = accentMap[a.color] ?? accentMap.orange;
  return (
    <article
      className="group relative rounded-2xl border bg-white p-6 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-30px_rgba(234,88,12,0.25)] hover:border-orange-300/60 cursor-pointer flex flex-col lg:flex-row gap-6"
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className={`hidden lg:flex shrink-0 w-32 aspect-square rounded-xl items-center justify-center ${c.bg} border ${c.border} relative overflow-hidden`}>
        {a.image ? (
          <Image
            src={a.image}
            alt={a.title}
            fill
            sizes="128px"
            className="object-cover"
          />
        ) : (
          <span
            className={`font-black ${c.text}`}
            style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", letterSpacing: "-0.04em" }}
          >
            0{index + 1}
          </span>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className={`text-[10px] font-bold tracking-[0.18em] uppercase border px-2 py-0.5 rounded-full ${c.text} ${c.bg} ${c.border}`}>
            {a.category}
          </span>
          <span className="text-xs text-neutral-500 inline-flex items-center gap-1"><Calendar size={11} className="text-orange-600" /><time dateTime={a.iso}>{a.date}</time></span>
          <span className="text-xs text-neutral-500 inline-flex items-center gap-1"><Clock size={11} />{a.readTime} min</span>
          <span className="text-xs text-neutral-500">· By {a.author}</span>
        </div>
        <h3
          className="text-neutral-900 font-bold mb-2 group-hover:text-orange-600 transition-colors"
          style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", letterSpacing: "-0.018em" }}
        >
          {a.title}
        </h3>
        <p className="text-neutral-600 text-sm leading-relaxed">{a.summary}</p>
      </div>
      <div className="flex items-center justify-end shrink-0 gap-3">
        <button
          onClick={(e) => { e.preventDefault(); onBookmark(a.title); }}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition ${
            bookmarked ? "bg-orange-50 text-orange-600 border-orange-200" : "text-neutral-500 hover:text-orange-600"
          }`}
          style={{ borderColor: bookmarked ? undefined : "rgba(0,0,0,0.10)" }}
        >
          <Bookmark size={14} fill={bookmarked ? "currentColor" : "none"} />
        </button>
        <span
          className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:bg-orange-500 group-hover:border-orange-500"
          style={{ borderColor: "rgba(0,0,0,0.10)" }}
        >
          <ArrowUpRight size={14} className="text-neutral-700 group-hover:text-white transition-colors" />
        </span>
      </div>
    </article>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div
      className="rounded-3xl border bg-white py-16 px-6 text-center"
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
    >
      <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-5">
        <Search size={22} className="text-orange-600" />
      </div>
      <h4
        className="text-neutral-900 font-bold mb-2"
        style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", letterSpacing: "-0.02em" }}
      >
        No stories match your filters.
      </h4>
      <p className="text-neutral-500 max-w-md mx-auto mb-6">
        Try a different keyword or category — we cover product launches, certifications, projects, and operations across
        every market.
      </p>
      <button onClick={onReset} className="btn-primary">
        Reset filters <ArrowUpRight size={15} />
      </button>
    </div>
  );
}
