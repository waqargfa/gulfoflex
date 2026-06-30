"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, Globe2, MapPin, Search, X } from "lucide-react";

export type Project = {
  id: number;
  name: string;
  location: string;
  country: string;
  type: string;
  image: string;
  gallery?: string[];
};

type CountryMeta = {
  code: string;        // matches Project.country
  label: string;       // display name
  flag: string;        // emoji flag
};

const COUNTRY_META: CountryMeta[] = [
  { code: "UAE",       label: "United Arab Emirates", flag: "🇦🇪" },
  { code: "KSA",       label: "Saudi Arabia",         flag: "🇸🇦" },
  { code: "Oman",      label: "Oman",                 flag: "🇴🇲" },
  { code: "Qatar",     label: "Qatar",                flag: "🇶🇦" },
  { code: "Bahrain",   label: "Bahrain",              flag: "🇧🇭" },
  { code: "Kuwait",    label: "Kuwait",               flag: "🇰🇼" },
  { code: "Sri Lanka", label: "Sri Lanka",            flag: "🇱🇰" },
];

export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("ALL");
  const [query, setQuery] = useState("");
  const [lightbox, setLightbox] = useState<{ project: Project; imageIndex: number } | null>(null);

  // Build tabs dynamically from the data, ordered by COUNTRY_META, then any extras
  const tabs = useMemo(() => {
    const counts = projects.reduce<Record<string, number>>((acc, p) => {
      acc[p.country] = (acc[p.country] || 0) + 1;
      return acc;
    }, {});

    const known = COUNTRY_META
      .filter((c) => counts[c.code])
      .map((c) => ({ ...c, count: counts[c.code] }));

    const extras = Object.keys(counts)
      .filter((code) => !COUNTRY_META.find((c) => c.code === code))
      .map((code) => ({ code, label: code, flag: "🌐", count: counts[code] }));

    return [
      { code: "ALL", label: "All Regions", flag: "🌍", count: projects.length },
      ...known,
      ...extras,
    ];
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchCountry = active === "ALL" || p.country === active;
      if (!matchCountry) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
      );
    });
  }, [projects, active, query]);

  const activeMeta = tabs.find((t) => t.code === active);

  const getGallery = (p: Project) => p.gallery?.length ? p.gallery : [p.image];

  const openLightbox = useCallback((project: Project) => {
    setLightbox({ project, imageIndex: 0 });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const goNext = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return null;
      const images = getGallery(prev.project);
      return { ...prev, imageIndex: (prev.imageIndex + 1) % images.length };
    });
  }, []);

  const goPrev = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return null;
      const images = getGallery(prev.project);
      return { ...prev, imageIndex: (prev.imageIndex - 1 + images.length) % images.length };
    });
  }, []);

  // Navigate between projects in the filtered list
  const goNextProject = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return null;
      const idx = filtered.findIndex((p) => p.id === prev.project.id);
      if (idx === -1) return prev;
      const next = filtered[(idx + 1) % filtered.length];
      return { project: next, imageIndex: 0 };
    });
  }, [filtered]);

  const goPrevProject = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return null;
      const idx = filtered.findIndex((p) => p.id === prev.project.id);
      if (idx === -1) return prev;
      const next = filtered[(idx - 1 + filtered.length) % filtered.length];
      return { project: next, imageIndex: 0 };
    });
  }, [filtered]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowDown") goNextProject();
      else if (e.key === "ArrowUp") goPrevProject();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, closeLightbox, goNext, goPrev, goNextProject, goPrevProject]);

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="eyebrow mb-4">
              <span className="eyebrow-dot" />
              Featured References · {projects.length}
            </div>
            <h2
              className="text-neutral-900 leading-[1.05]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
              }}
            >
              Landmark <span className="serif-italic text-orange-600">projects</span> worldwide.
            </h2>
            <p className="text-neutral-600 text-base md:text-lg mt-4 leading-relaxed">
              Filter by country to explore Gulf-O-Flex® installations across the GCC and beyond.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80 flex-shrink-0">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, cities…"
              className="w-full pl-11 pr-4 py-3 rounded-full border border-neutral-200 bg-white text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>
        </div>

        {/* Country Tabs */}
        <div className="mb-10">
          <div
            className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide"
            role="tablist"
            aria-label="Filter projects by country"
          >
            {tabs.map((tab) => {
              const isActive = tab.code === active;
              return (
                <button
                  key={tab.code}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(tab.code)}
                  className={`group flex-shrink-0 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                    isActive
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-orange-300 hover:text-orange-700 hover:bg-orange-50/40"
                  }`}
                >
                  <span className="text-base leading-none" aria-hidden="true">
                    {tab.flag}
                  </span>
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-neutral-100 text-neutral-600 group-hover:bg-orange-100 group-hover:text-orange-700"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Result meta strip */}
        <div className="flex items-center justify-between mb-6 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <Globe2 size={13} className="text-orange-600" />
            <span>
              Showing <span className="font-bold text-neutral-900">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "project" : "projects"}
              {activeMeta && active !== "ALL" && (
                <>
                  {" "}in <span className="font-bold text-neutral-900">{activeMeta.label}</span>
                </>
              )}
              {query && (
                <>
                  {" "}matching <span className="font-bold text-neutral-900">&ldquo;{query}&rdquo;</span>
                </>
              )}
            </span>
          </div>
          {(active !== "ALL" || query) && (
            <button
              onClick={() => {
                setActive("ALL");
                setQuery("");
              }}
              className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
            >
              Clear filters →
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, i) => (
              <button
                key={project.id}
                type="button"
                onClick={() => openLightbox(project)}
                className="group relative rounded-3xl border bg-white overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-30px_rgba(234,88,12,0.30)] hover:border-orange-300/60 flex flex-col text-left cursor-pointer"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase border px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-orange-600 border-orange-500/25">
                      {project.country}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 text-[10px] font-bold tracking-[0.18em] uppercase text-white/90 bg-black/40 backdrop-blur px-2 py-1 rounded-full">
                    {String(i + 1).padStart(2, "0")} / {filtered.length}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3
                    className="text-neutral-900 leading-[1.15] mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-4">
                    <MapPin size={12} className="text-orange-600" />
                    {project.location}
                  </div>
                  <div
                    className="mt-auto flex items-center justify-between pt-4 border-t"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}
                  >
                    <span className="text-[10px] font-semibold text-neutral-600 border border-neutral-200 bg-neutral-50 px-2.5 py-1 rounded-full">
                      {project.type}
                    </span>
                    <div
                      className="w-9 h-9 rounded-full border bg-white flex items-center justify-center transition-all duration-300 group-hover:bg-orange-500 group-hover:border-orange-500"
                      style={{ borderColor: "rgba(0,0,0,0.10)" }}
                    >
                      <ArrowUpRight
                        size={15}
                        className="text-neutral-500 transition-colors group-hover:text-white"
                      />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-neutral-200 bg-neutral-50/60 py-20 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-neutral-900 font-bold text-lg mb-2">No projects found</h3>
            <p className="text-neutral-500 text-sm max-w-md mx-auto">
              Try a different country or clear your search to see all references.
            </p>
            <button
              onClick={() => {
                setActive("ALL");
                setQuery("");
              }}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
            >
              Show all projects
            </button>
          </div>
        )}
      </div>

      {/* ── Lightbox Modal ── */}
      {lightbox && (() => {
        const images = getGallery(lightbox.project);
        const currentImage = images[lightbox.imageIndex];
        const projectIndex = filtered.findIndex((p) => p.id === lightbox.project.id);
        return (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close gallery"
            >
              <X size={20} />
            </button>

            {/* Project info */}
            <div className="absolute top-5 left-5 z-10 text-white">
              <h3 className="text-lg font-bold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                {lightbox.project.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1 text-sm text-white/70">
                <MapPin size={13} className="text-orange-400" />
                {lightbox.project.location}
              </div>
            </div>

            {/* Main image */}
            <div
              className="relative w-full max-w-5xl mx-auto aspect-[4/3] px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentImage}
                alt={`${lightbox.project.name} - Image ${lightbox.imageIndex + 1}`}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain rounded-2xl"
                priority
              />

              {/* Image navigation arrows (when multiple images in gallery) */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); goPrev(); }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); goNext(); }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Bottom bar: project navigation + image dots */}
            <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-3">
              {/* Image dots */}
              {images.length > 1 && (
                <div className="flex items-center gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightbox((prev) => prev ? { ...prev, imageIndex: idx } : null);
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        idx === lightbox.imageIndex
                          ? "bg-orange-500 scale-125"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Project navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => { e.stopPropagation(); goPrevProject(); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={14} />
                  Prev Project
                </button>
                <span className="text-white/60 text-xs font-bold tracking-wider">
                  {projectIndex + 1} / {filtered.length}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); goNextProject(); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
                  aria-label="Next project"
                >
                  Next Project
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Hide scrollbar utility (local) */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
