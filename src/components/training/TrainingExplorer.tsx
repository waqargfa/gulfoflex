"use client";

import { useState } from "react";
import {
  Play,
  CheckCircle2,
  Brush,
  Ruler,
  Droplets,
  Layers,
  Wrench,
  ListChecks,
  Video,
  Sparkles,
  Maximize2,
} from "lucide-react";

type Lesson = {
  key: string;
  step: string;
  index: string;
  title: string;
  subtitle: string;
  desc: string;
  youtubeId: string;
  duration: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  tips: string[];
};

const lessons: Lesson[] = [
  {
    key: "overview",
    step: "Overview",
    index: "00",
    title: "Installation Steps",
    subtitle: "Complete installation walkthrough",
    desc: "A complete overview of the Gulf-O-Flex® insulation installation process, from surface preparation to final application. Watch this first to understand the full workflow before diving into each individual step.",
    youtubeId: "tAUscoXxMi0",
    duration: "Full guide",
    icon: ListChecks,
    tips: [
      "Review the complete process before starting any installation",
      "Keep tools, adhesive, and insulation ready before you begin",
      "Follow each step in sequence for a professional finish",
    ],
  },
  {
    key: "surface",
    step: "Module 1",
    index: "01",
    title: "Surface Preparation",
    subtitle: "Clean, dry & ready surfaces",
    desc: "Proper surface preparation is the foundation of a durable insulation job. Learn how to clean, degrease, and prepare pipes and ducts so that adhesive bonds correctly and lasts for the lifetime of the asset.",
    youtubeId: "UBl8phGcV9o",
    duration: "Module 1",
    icon: Brush,
    tips: [
      "Ensure surfaces are completely clean, dry, and free of oil or rust",
      "Remove any loose paint, dust, or debris before applying adhesive",
      "Allow primed or treated surfaces to fully dry",
    ],
  },
  {
    key: "measuring",
    step: "Module 2",
    index: "02",
    title: "Measuring & Cutting",
    subtitle: "Precision sizing for a perfect fit",
    desc: "Accurate measuring and cutting prevent gaps and material waste. This lesson covers how to measure pipe diameters and lengths, mark the insulation, and cut clean, precise sections every time.",
    youtubeId: "5V5-9SXrsJM",
    duration: "Module 2",
    icon: Ruler,
    tips: [
      "Always measure twice, cut once to avoid wasted material",
      "Use a sharp blade for clean, straight cuts",
      "Account for the insulation wall thickness when sizing",
    ],
  },
  {
    key: "gluing",
    step: "Module 3",
    index: "03",
    title: "Gluing & Making Shapes",
    subtitle: "Adhesive technique & fittings",
    desc: "Master the correct adhesive application and the technique for forming elbows, tees, and complex shapes. Proper gluing ensures airtight, vapor-sealed joints that maintain thermal performance.",
    youtubeId: "Hl6W0H4TMRg",
    duration: "Module 3",
    icon: Droplets,
    tips: [
      "Apply a thin, even coat of adhesive to both surfaces",
      "Wait for the correct tack time before joining surfaces",
      "Press joints firmly to create a continuous vapor seal",
    ],
  },
  {
    key: "application",
    step: "Module 4",
    index: "04",
    title: "Application",
    subtitle: "Final fitting & finishing",
    desc: "The final step, fitting the insulation onto the system and finishing the installation. Learn how to seal seams, secure the insulation, and inspect the work for a clean, professional result.",
    youtubeId: "IzzhMwTe7Z8",
    duration: "Module 4",
    icon: Layers,
    tips: [
      "Seal all seams and joints to prevent condensation",
      "Avoid stretching or compressing the insulation during fitting",
      "Inspect the finished work for gaps or open seams",
    ],
  },
];

export default function TrainingExplorer() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const lesson = lessons[active];
  const Icon = lesson.icon;
  const progress = Math.round((completed.size / lessons.length) * 100);

  const select = (i: number) => {
    setActive(i);
    setPlaying(false);
  };

  const startPlay = () => {
    setPlaying(true);
    setCompleted((prev) => new Set(prev).add(active));
  };

  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0a0b 0%, #111113 60%, #0a0a0b 100%)" }}>
      {/* ambient glows */}
      <div className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] bg-orange-600/10 pointer-events-none" />
      <div className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] bg-orange-500/[0.07] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" />

      <div className="container-wide relative section-padding">
        {/* Heading */}
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.28em] uppercase text-orange-400 mb-5">
            <span className="w-8 h-px bg-gradient-to-r from-orange-500 to-transparent" />
            <Wrench size={12} /> Installation Curriculum
          </span>
          <h2
            className="text-white leading-[1.04]"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.6vw, 3.1rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
          >
            A guided program to install <span className="serif-italic text-orange-400">flawlessly.</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-lg leading-relaxed">
            Five professionally produced modules that take you from bare pipework to a certified-grade finish. Track your progress as you complete each module.
          </p>


        </div>

        <div className="grid lg:grid-cols-[1.65fr_1fr] gap-8 items-start">
          {/* ── Player ── */}
          <div className="lg:sticky lg:top-24">
            {/* Premium player frame */}
            <div className="relative rounded-3xl p-1.5 bg-gradient-to-b from-white/[0.12] to-white/[0.02] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]">
              <div className="relative rounded-[1.35rem] overflow-hidden bg-black ring-1 ring-white/10">
                {/* Top chrome bar */}
                <div className="flex items-center gap-2 px-4 h-9 bg-white/[0.03] border-b border-white/[0.06]">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500/60" />
                  <span className="ml-2 text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-500 truncate">
                    Gulf-O-Flex® Academy · {lesson.title}
                  </span>
                  <span className="ml-auto flex items-center gap-1.5 text-[10px] font-semibold text-orange-400/90">
                    <Sparkles size={11} /> HD
                  </span>
                </div>

                {/* Video / facade */}
                <div className="relative aspect-video">
                  {playing ? (
                    <iframe
                      key={lesson.youtubeId}
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${lesson.youtubeId}?rel=0&autoplay=1&modestbranding=1&playsinline=1&color=white&iv_load_policy=3`}
                      title={lesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <button
                      onClick={startPlay}
                      className="group absolute inset-0 w-full h-full"
                      aria-label={`Play ${lesson.title}`}
                    >
                      {/* Thumbnail */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://img.youtube.com/vi/${lesson.youtubeId}/maxresdefault.jpg`}
                        alt={lesson.title}
                        className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[1200ms] group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (!img.dataset.fallback) {
                            img.dataset.fallback = "1";
                            img.src = `https://img.youtube.com/vi/${lesson.youtubeId}/hqdefault.jpg`;
                          }
                        }}
                      />
                      {/* Branded overlay — hides the YouTube look */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-orange-950/30 via-transparent to-transparent" />
                      <div className="absolute inset-0 grid-bg opacity-[0.06]" />

                      {/* Center play */}
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="relative flex items-center justify-center">
                          <span className="absolute w-24 h-24 rounded-full bg-orange-500/30 animate-ping" />
                          <span className="relative w-[72px] h-[72px] rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-[0_20px_60px_-10px_rgba(249,115,22,0.6)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-orange-500">
                            <Play size={26} className="text-neutral-900 ml-1 transition-colors group-hover:text-white" fill="currentColor" />
                          </span>
                        </span>
                      </span>

                      {/* Bottom-left info */}
                      <span className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-4 text-left">
                        <span>
                          <span className="flex items-center gap-2 mb-1.5">
                            <span className="text-[9px] font-black tracking-[0.25em] uppercase text-orange-400">{lesson.step}</span>
                            <span className="w-1 h-1 rounded-full bg-white/40" />
                            <span className="text-[10px] font-semibold text-white/70">{lesson.duration}</span>
                          </span>
                          <span className="block text-white font-bold text-xl md:text-2xl leading-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                            {lesson.title}
                          </span>
                        </span>
                        <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-semibold text-white/60 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/10 whitespace-nowrap">
                          <Maximize2 size={11} /> Watch lesson
                        </span>
                      </span>

                      {/* Watermark to break the YouTube identity */}
                      <span className="absolute top-4 right-4 text-[10px] font-black tracking-[0.2em] uppercase text-white/40">
                        Gulf-O-Flex®
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Active lesson detail */}
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 md:p-7">
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(249,115,22,0.22), rgba(249,115,22,0.05))",
                    border: "1px solid rgba(249,115,22,0.3)",
                  }}
                >
                  <Icon size={22} className="text-orange-400" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black tracking-[0.25em] uppercase text-orange-400">{lesson.step}</span>
                    {completed.has(active) && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-wide uppercase text-emerald-400">
                        <CheckCircle2 size={11} /> Completed
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-white font-bold text-xl mt-1"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                  >
                    {lesson.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed mt-2">{lesson.desc}</p>
                </div>
              </div>

              {/* Tips */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <span className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-neutral-400 mb-3">
                  <CheckCircle2 size={13} className="text-orange-400" /> Key Techniques
                </span>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {lesson.tips.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-neutral-300 text-sm leading-relaxed">
                      <CheckCircle2 size={16} className="text-orange-400 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── Lesson list ── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-400">
                Course Modules
              </span>
              <span className="text-[11px] font-semibold text-orange-400">{lessons.length} lessons</span>
            </div>
            <div className="space-y-2.5">
              {lessons.map((l, i) => {
                const LIcon = l.icon;
                const isActive = i === active;
                const isDone = completed.has(i);
                return (
                  <button
                    key={l.key}
                    onClick={() => select(i)}
                    className={`group relative w-full text-left rounded-2xl border p-3.5 transition-all duration-300 ${
                      isActive
                        ? "border-orange-500/50 bg-orange-500/[0.08] shadow-[0_20px_50px_-30px_rgba(234,88,12,0.7)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Index */}
                      <span
                        className={`shrink-0 text-sm font-black tabular-nums transition-colors ${
                          isActive ? "text-orange-400" : "text-white/25 group-hover:text-white/40"
                        }`}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {l.index}
                      </span>

                      {/* Thumbnail */}
                      <div className="relative shrink-0 w-24 h-14 rounded-lg overflow-hidden bg-neutral-900 ring-1 ring-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://img.youtube.com/vi/${l.youtubeId}/mqdefault.jpg`}
                          alt={l.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                              isActive ? "bg-orange-500" : "bg-white/90"
                            }`}
                          >
                            <Play size={11} className={isActive ? "text-white ml-0.5" : "text-neutral-900 ml-0.5"} fill="currentColor" />
                          </span>
                        </span>
                      </div>

                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <LIcon size={12} className={isActive ? "text-orange-400" : "text-neutral-500"} />
                          <span className={`text-[8px] font-black tracking-[0.2em] uppercase ${isActive ? "text-orange-400" : "text-neutral-500"}`}>
                            {l.step}
                          </span>
                        </div>
                        <h4 className={`font-bold text-sm leading-tight truncate ${isActive ? "text-white" : "text-neutral-200"}`}>
                          {l.title}
                        </h4>
                        <p className="text-neutral-500 text-xs mt-0.5 truncate">{l.subtitle}</p>
                      </div>

                      {/* Status */}
                      <span className="shrink-0">
                        {isDone ? (
                          <CheckCircle2 size={18} className="text-emerald-400" />
                        ) : isActive ? (
                          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        ) : (
                          <Video size={13} className="text-white/20 group-hover:text-white/35 transition-colors" />
                        )}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Recommended order */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-neutral-400 mb-2">
                <ListChecks size={13} className="text-orange-400" /> Recommended Path
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Begin with the full overview, then complete each module in order: Surface Preparation → Measuring &amp; Cutting → Gluing &amp; Shaping → Application for a certified-grade installation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
