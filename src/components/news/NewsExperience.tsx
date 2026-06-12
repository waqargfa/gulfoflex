"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  Tag,
  Search,
  LayoutGrid,
  List,
  Clock,
  TrendingUp,
  Radio,
  Bookmark,
  Filter,
  X,
  Mail,
  CheckCircle2,
  Rss,
  MapPin,
  CalendarDays,
  PlayCircle,
  Camera,
  ChevronLeft,
  ChevronRight,
  Sparkles,
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

export type GofEvent = {
  title: string;
  tagline?: string;
  type: string;
  color: string;
  startISO: string;
  endISO: string;
  dateLabel: string;
  location: string;
  summary: string;
  image: string;
  cta?: { label: string; href: string };
  featured?: boolean;
  status: "upcoming" | "past";
};

export type GalleryItem = {
  src: string;
  caption: string;
  tag: string;
};

const accentMap: Record<string, { text: string; bg: string; border: string; ring: string }> = {
  orange: { text: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200", ring: "ring-orange-500/30" },
  blue:   { text: "text-neutral-700",bg: "bg-neutral-50",border: "border-neutral-200",ring: "ring-neutral-500/30" },
  green:  { text: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200", ring: "ring-orange-500/30" },
  purple: { text: "text-neutral-700",bg: "bg-neutral-50",border: "border-neutral-200",ring: "ring-neutral-500/30" },
  cyan:   { text: "text-neutral-700",bg: "bg-neutral-50",border: "border-neutral-200",ring: "ring-neutral-500/30" },
};

export default function NewsExperience({
  articles,
  categories,
  events = [],
  gallery = [],
}: {
  articles: Article[];
  categories: string[];
  events?: GofEvent[];
  gallery?: GalleryItem[];
}) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [eventsTab, setEventsTab] = useState<"upcoming" | "past">("upcoming");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [sliderIdx, setSliderIdx] = useState(0);
  const [sliderPaused, setSliderPaused] = useState(false);

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

  // Slider: featured articles + top trending fallbacks
  const sliderSlides = useMemo(() => {
    const base = articles.filter((a) => a.featured || a.trending);
    return base.length >= 3 ? base : [...base, ...articles.filter((a) => !base.includes(a))].slice(0, 5);
  }, [articles]);

  useEffect(() => {
    if (sliderPaused || sliderSlides.length <= 1) return;
    const id = setInterval(() => setSliderIdx((i) => (i + 1) % sliderSlides.length), 6000);
    return () => clearInterval(id);
  }, [sliderPaused, sliderSlides.length]);

  const sliderPrev = () => setSliderIdx((i) => (i - 1 + sliderSlides.length) % sliderSlides.length);
  const sliderNext = () => setSliderIdx((i) => (i + 1) % sliderSlides.length);

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

  const upcomingEvents = useMemo(
    () => events.filter((e) => e.status === "upcoming").sort((a, b) => +new Date(a.startISO) - +new Date(b.startISO)),
    [events],
  );
  const pastEvents = useMemo(
    () => events.filter((e) => e.status === "past").sort((a, b) => +new Date(b.startISO) - +new Date(a.startISO)),
    [events],
  );
  const heroEvent = upcomingEvents.find((e) => e.featured) ?? upcomingEvents[0];
  const visibleEvents = eventsTab === "upcoming" ? upcomingEvents : pastEvents;

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % gallery.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, gallery.length]);

  return (
    <>
      {/* ── Hero Slider ── */}
      <section
        className="relative overflow-hidden bg-neutral-950"
        style={{ minHeight: "100svh" }}
        onMouseEnter={() => setSliderPaused(true)}
        onMouseLeave={() => setSliderPaused(false)}
      >
        {/* Slide backgrounds */}
        {sliderSlides.map((slide, i) => (
          <div
            key={slide.iso + i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === sliderIdx ? 1 : 0, zIndex: i === sliderIdx ? 1 : 0 }}
          >
            {slide.image && (
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority={i === 0}
              />
            )}
            {/* Multi-layer dark gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          </div>
        ))}

        {/* Navbar spacer */}
        <div className="relative z-10 pt-28 md:pt-36" />

        {/* Breadcrumb */}
        <div className="relative z-10 container-wide">
          <nav className="flex items-center gap-2 text-xs text-white/50" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/25">/</span>
            <span className="text-white/80">News &amp; Media</span>
          </nav>
        </div>

        {/* Slide content */}
        <div className="relative z-10 container-wide pb-40 md:pb-48">
          <div className="max-w-4xl">
            {sliderSlides.map((slide, i) => {
              const c = accentMap[slide.color] ?? accentMap.orange;
              return (
                <div
                  key={slide.iso + i}
                  className="transition-all duration-700"
                  style={{
                    opacity: i === sliderIdx ? 1 : 0,
                    transform: i === sliderIdx ? "translateY(0)" : "translateY(24px)",
                    position: i === sliderIdx ? "relative" : "absolute",
                    pointerEvents: i === sliderIdx ? "auto" : "none",
                    top: i === sliderIdx ? undefined : 0,
                  }}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-6 mt-8">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase border px-2.5 py-1.5 rounded-full backdrop-blur ${c.text} ${c.bg} ${c.border}`}>
                      <Tag size={9} />{slide.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1.5 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur">
                      <Radio size={10} className="animate-pulse text-orange-400" /> Live · {articles.length} stories
                    </span>
                    {slide.trending && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1.5 rounded-full border border-orange-400/40 bg-orange-500/15 text-orange-300">
                        <TrendingUp size={9} /> Trending
                      </span>
                    )}
                  </div>

                  <h1
                    className="text-white leading-[0.95] mb-5"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      textShadow: "0 2px 32px rgba(0,0,0,0.5)",
                    }}
                  >
                    {slide.title}
                    <span className="serif-italic text-orange-400">.</span>
                  </h1>
                  <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mb-7">
                    {slide.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Calendar size={13} className="text-orange-400" />
                      <time dateTime={slide.iso}>{slide.date}</time>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Clock size={13} />
                      {slide.readTime} min read
                    </div>
                    <div className="text-white/50 text-sm">By {slide.author}</div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {slide.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold tracking-wider uppercase text-white/60 border border-white/15 px-2.5 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <Link href="#all-stories" className="btn-primary">
                      Read full story <ArrowUpRight size={16} />
                    </Link>
                    <Link href="#all-stories" className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-5 py-3 rounded-xl transition-all">
                      Browse all news
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search bar + controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          {/* Slide progress bar */}
          <div className="h-0.5 bg-white/10">
            <div
              key={sliderIdx}
              className="h-full bg-orange-500"
              style={{
                width: sliderPaused ? `${((sliderIdx) / sliderSlides.length) * 100}%` : "0%",
                animation: sliderPaused ? "none" : "sliderProgress 6s linear forwards",
              }}
            />
          </div>

          <div className="bg-gradient-to-t from-black/70 to-transparent backdrop-blur-none pt-6 pb-8">
            <div className="container-wide flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-xl">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search news, certifications, projects…"
                  className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-400/60 transition"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Clear"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Dot indicators + arrows */}
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-1.5">
                  {sliderSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSliderIdx(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        i === sliderIdx ? "w-7 h-2 bg-orange-500" : "w-2 h-2 bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={sliderPrev}
                    aria-label="Previous slide"
                    className="w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={sliderNext}
                    aria-label="Next slide"
                    className="w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
                <span className="text-white/40 text-xs font-mono tabular-nums">
                  {String(sliderIdx + 1).padStart(2, "0")} / {String(sliderSlides.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes sliderProgress {
            from { width: 0% }
            to { width: 100% }
          }
        `}</style>
      </section>

      {/* ── Events ── */}
      {events.length > 0 && (
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
          <div className="absolute inset-0 grid-bg opacity-[0.06]" />
          <div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-orange-500/20 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-40 -right-24 w-[520px] h-[520px] rounded-full bg-orange-400/15 blur-[120px] pointer-events-none" />

          <div className="container-wide relative z-10">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
              <div>
                <div
                  className="eyebrow mb-4"
                  style={{ background: "rgba(249,115,22,0.12)", borderColor: "rgba(249,115,22,0.30)", color: "#fb923c" }}
                >
                  <span className="eyebrow-dot" />Where to meet us
                </div>
                <h2
                  className="text-white leading-[1.02]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 4vw, 3.25rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.035em",
                  }}
                >
                  Events &amp; <span className="serif-italic text-orange-400">happenings.</span>
                </h2>
                <p className="text-white/60 mt-4 max-w-xl leading-relaxed">
                  From global trade shows to in-house technical workshops — connect with the Gulf-O-Flex® team in person or online.
                </p>
              </div>

              <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] backdrop-blur p-1">
                {(["upcoming", "past"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setEventsTab(t)}
                    className={`text-xs font-bold uppercase tracking-[0.16em] px-4 py-2 rounded-full transition-all ${
                      eventsTab === t
                        ? "bg-orange-500 text-white shadow-[0_8px_24px_-10px_rgba(234,88,12,0.8)]"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {t === "upcoming" ? `Upcoming · ${upcomingEvents.length}` : `Past · ${pastEvents.length}`}
                  </button>
                ))}
              </div>
            </div>

            {eventsTab === "upcoming" && heroEvent && (
              <FeaturedEventCard event={heroEvent} />
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
              {visibleEvents
                .filter((e) => !(eventsTab === "upcoming" && e === heroEvent))
                .map((e) => (
                  <EventCard key={e.title} event={e} />
                ))}
              {visibleEvents.length === 0 && (
                <div className="col-span-full rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur p-10 text-center">
                  <CalendarDays size={28} className="text-orange-400 mx-auto mb-3" />
                  <p className="text-white/70">No {eventsTab} events to show right now.</p>
                </div>
              )}
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

          {/* Media Gallery */}
          {gallery.length > 0 && (
            <div className="mt-20">
              <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
                <div>
                  <div className="eyebrow mb-3"><span className="eyebrow-dot" />In pictures</div>
                  <h3
                    className="text-neutral-900"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    Media <span className="serif-italic text-orange-600">highlights.</span>
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-500">
                  <Camera size={12} /> {gallery.length} photos · click to expand
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3">
                {gallery.map((g, i) => {
                  const span = i === 0 ? "row-span-2 col-span-2" : i === 3 ? "row-span-2" : "";
                  return (
                    <button
                      key={g.src + i}
                      onClick={() => setLightbox(i)}
                      className={`group relative overflow-hidden rounded-2xl border bg-neutral-100 ${span}`}
                      style={{ borderColor: "rgba(0,0,0,0.06)" }}
                    >
                      <Image
                        src={g.src}
                        alt={g.caption}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                        <span className="inline-block text-[9px] font-bold tracking-[0.18em] uppercase text-orange-300 mb-1">{g.tag}</span>
                        <p className="text-white text-sm font-semibold leading-snug line-clamp-2">{g.caption}</p>
                      </div>
                      <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle size={14} className="text-white" />
                      </span>
                    </button>
                  );
                })}
              </div>
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

      {/* ── Lightbox ── */}
      {lightbox !== null && gallery[lightbox] && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-[fadeIn_.2s_ease]"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            aria-label="Close"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition"
          >
            <X size={18} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length)); }}
            aria-label="Previous"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? null : (i + 1) % gallery.length)); }}
            aria-label="Next"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition"
          >
            <ChevronRight size={20} />
          </button>
          <div className="relative w-full max-w-5xl aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={gallery[lightbox].src}
              alt={gallery[lightbox].caption}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
              <span className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase text-orange-300 mb-1">
                {gallery[lightbox].tag}
              </span>
              <p className="text-white text-base font-semibold">{gallery[lightbox].caption}</p>
              <p className="text-white/50 text-xs mt-1">{lightbox + 1} / {gallery.length}</p>
            </div>
          </div>
          <style jsx>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
        </div>
      )}
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
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700">
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

function FeaturedEventCard({ event }: { event: GofEvent }) {
  const c = accentMap[event.color] ?? accentMap.orange;
  const start = new Date(event.startISO);
  const day = start.getDate();
  const month = start.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return (
    <article
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm grid lg:grid-cols-[1.1fr_1fr] hover:border-orange-400/40 transition-all duration-500"
    >
      <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r lg:bg-gradient-to-l from-transparent via-black/10 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent lg:hidden" />

        {/* Date badge */}
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <div className="rounded-2xl bg-white text-neutral-900 px-3.5 py-2.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] text-center min-w-[68px]">
            <div className="text-[9px] font-bold tracking-[0.2em] text-orange-600">{month}</div>
            <div className="font-black leading-none mt-0.5" style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "-0.04em" }}>
              {day}
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase text-white bg-black/40 backdrop-blur border border-white/15 px-2.5 py-1 rounded-full">
            <Sparkles size={10} className="text-orange-400" /> Featured
          </span>
        </div>
      </div>

      <div className="relative p-7 md:p-10 flex flex-col justify-center">
        <span className={`self-start inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase border px-2.5 py-1 rounded-full ${c.text} ${c.bg} ${c.border} mb-5`}>
          <Tag size={9} />{event.type}
        </span>
        <h3
          className="text-white font-bold leading-[1.05] mb-3"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 2.6vw, 2.25rem)", letterSpacing: "-0.03em" }}
        >
          {event.title}
        </h3>
        {event.tagline && (
          <p className="text-orange-300 text-sm font-semibold mb-4">{event.tagline}</p>
        )}
        <p className="text-white/70 leading-relaxed mb-6">{event.summary}</p>

        <div className="grid sm:grid-cols-2 gap-3 mb-7">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <CalendarDays size={16} className="text-orange-400 shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/40 font-bold">Date</div>
              <div className="text-white text-sm font-semibold">{event.dateLabel}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <MapPin size={16} className="text-orange-400 shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/40 font-bold">Location</div>
              <div className="text-white text-sm font-semibold line-clamp-1">{event.location}</div>
            </div>
          </div>
        </div>

        {event.cta && (
          <div className="flex items-center gap-3">
            <Link href={event.cta.href} className="btn-primary !py-3">
              {event.cta.label} <ArrowUpRight size={16} />
            </Link>
            <span className="text-xs text-white/40">Limited slots · RSVP recommended</span>
          </div>
        )}
      </div>
    </article>
  );
}

function EventCard({ event }: { event: GofEvent }) {
  const c = accentMap[event.color] ?? accentMap.orange;
  const start = new Date(event.startISO);
  const day = start.getDate();
  const month = start.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const isPast = event.status === "past";
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm flex flex-col transition-all duration-500 hover:-translate-y-1 hover:border-orange-400/40 hover:shadow-[0_40px_80px_-30px_rgba(234,88,12,0.45)] ${
        isPast ? "opacity-90" : ""
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${isPast ? "grayscale-[20%]" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="rounded-xl bg-white text-neutral-900 px-3 py-2 text-center shadow-[0_15px_40px_-15px_rgba(0,0,0,0.6)] min-w-[58px]">
            <div className="text-[9px] font-bold tracking-[0.18em] text-orange-600">{month}</div>
            <div className="font-black leading-none mt-0.5" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", letterSpacing: "-0.03em" }}>
              {day}
            </div>
          </div>
          {isPast && (
            <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-white bg-black/50 border border-white/15 backdrop-blur px-2 py-1 rounded-full">
              Recap
            </span>
          )}
        </div>

        <span className={`absolute top-4 right-4 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase border px-2.5 py-1 rounded-full backdrop-blur ${c.text} ${c.bg} ${c.border}`}>
          <Tag size={9} />{event.type}
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h4
          className="text-white font-bold leading-snug mb-2 group-hover:text-orange-300 transition-colors"
          style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", letterSpacing: "-0.02em" }}
        >
          {event.title}
        </h4>
        {event.tagline && <p className="text-orange-300/90 text-xs font-semibold mb-3">{event.tagline}</p>}
        <p className="text-white/60 text-sm leading-relaxed line-clamp-3 mb-5 flex-1">{event.summary}</p>

        <div className="space-y-2 mb-5 text-xs text-white/70">
          <div className="flex items-center gap-2"><CalendarDays size={12} className="text-orange-400" />{event.dateLabel}</div>
          <div className="flex items-center gap-2"><MapPin size={12} className="text-orange-400" /><span className="line-clamp-1">{event.location}</span></div>
        </div>

        {event.cta && (
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <Link href={event.cta.href} className="text-sm font-semibold text-orange-400 hover:text-orange-300 inline-flex items-center gap-1.5">
              {event.cta.label} <ArrowUpRight size={14} />
            </Link>
            <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center transition-all group-hover:bg-orange-500 group-hover:border-orange-500">
              <ArrowUpRight size={13} className="text-white/70 group-hover:text-white transition-colors" />
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
