import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import BookingSection from "@/components/experience/BookingSection";
import {
  ArrowUpRight,
  Building2,
  Camera,
  CalendarDays,
  CheckCircle2,
  Compass,
  Eye,
  Globe2,
  Layers,
  MapPin,
  Maximize2,
  MousePointerClick,
  Play,
  RotateCcw,
  Sparkles,
  ThermometerSun,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Experience Centre | Gulf-O-Flex® Immersive Product Showcase",
  description:
    "Step inside the Gulf-O-Flex® Experience Centre – a state-of-the-art immersive showroom featuring 3D virtual tours, live product displays, and hands-on demonstrations of our insulation solutions.",
  alternates: { canonical: "https://gulfoflex.com/experience-centre" },
};

/* ─────────────────────────────  DATA  ───────────────────────────── */

const highlights = [
  {
    icon: Layers,
    title: "Full Product Range",
    desc: "Explore every Gulf-O-Flex® product line — NBR, XLPE, Sound, Ultra, Aluglass, Aluclad & UltraLine — all in one immersive space.",
  },
  {
    icon: ThermometerSun,
    title: "Live Performance Demos",
    desc: "Witness real-time thermal conductivity, fire resistance, and acoustic performance demonstrations on actual product samples.",
  },
  {
    icon: Compass,
    title: "3D Virtual Tour",
    desc: "Can't visit in person? Walk through our centre from anywhere in the world with our interactive 360° virtual experience.",
  },
  {
    icon: Building2,
    title: "Application Mockups",
    desc: "Full-scale piping, duct, and equipment mockups showing correct installation methods across HVAC, oil & gas, and marine sectors.",
  },
  {
    icon: Eye,
    title: "Material Comparison Lab",
    desc: "Side-by-side comparisons of insulation types, densities, and facing options — feel the difference and understand the science.",
  },
  {
    icon: Sparkles,
    title: "Innovation Showcase",
    desc: "Preview upcoming products and R&D breakthroughs before they hit the market — exclusive to centre visitors.",
  },
];

const galleryImages = [
  { src: "/images/experience/_DSC9952.jpg", alt: "Gulf-O-Flex Experience Centre main hall" },
  { src: "/images/experience/side image.jpeg", alt: "Gulf-O-Flex Experience Centre product wall" },
];

const tourFeatures = [
  { icon: RotateCcw, label: "360° Navigation" },
  { icon: MousePointerClick, label: "Interactive Hotspots" },
  { icon: Maximize2, label: "Full-Screen Mode" },
  { icon: Globe2, label: "Access Anywhere" },
];

const stats = [
  { value: "3000+", label: "Sq. Metres" },
  { value: "7", label: "Product Zones" },
  { value: "30+", label: "Live Demos" },
  { value: "360°", label: "Virtual Tour" },
];

/* ─────────────────────────────  PAGE  ───────────────────────────── */

export default function ExperienceCentrePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-20 md:pt-24 pb-8 md:pb-10"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}
      >
        <PageHero src="/images/experience/side image.jpeg" focalY="40%" intensity={0.7} />
        <div className="noise" />

        <div className="container-wide relative z-10">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">Experience Centre</span>
          </nav>

          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-orange-600 mb-6">
                <Building2 size={14} /> Immersive Showroom
              </span>
              <h1
                className="text-neutral-900 leading-[0.95] mb-7"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}
              >
                Experience<br />
                <span className="gradient-text">Centre</span><br />
                <span className="serif-italic">Step inside.</span>
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                A world-class immersive showroom where engineers, consultants, and partners can explore, touch, and test our full range of insulation solutions — in person or through our interactive 3D virtual tour.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#book-visit" className="btn-primary inline-flex items-center gap-2">
                  <CalendarDays size={18} /> Book a Visit
                </a>
                <a href="#virtual-tour" className="btn-ghost inline-flex items-center gap-2">
                  <Compass size={16} /> Virtual Tour
                </a>
              </div>
            </div>

            {/* Stats card */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div
                      className="gradient-text mb-1"
                      style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800 }}
                    >
                      {s.value}
                    </div>
                    <div className="text-neutral-500 text-sm font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights Grid ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-orange-600 mb-4">
              <Zap size={13} /> What Awaits You
            </span>
            <h2
              className="text-neutral-900 mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              More Than a Showroom
            </h2>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
              Our Experience Centre is designed to educate, inspire, and empower — giving you hands-on access to our full product ecosystem.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="group relative bg-neutral-50 border border-neutral-100 rounded-2xl p-7 hover:bg-white hover:shadow-lg hover:border-orange-100 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mb-5 group-hover:from-orange-500 group-hover:to-orange-400 transition-all duration-300">
                  <h.icon size={22} className="text-orange-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-neutral-900 font-bold text-lg mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {h.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3D Virtual Tour Section ── */}
      <section id="virtual-tour" className="py-20 md:py-28 bg-neutral-950 text-white relative overflow-hidden">
        {/* Background decorative */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600 rounded-full blur-[120px]" />
        </div>

        <div className="container-wide relative z-10">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-orange-400 mb-4">
              <Compass size={13} /> Interactive Experience
            </span>
            <h2
              className="text-white mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              3D Virtual Tour
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Explore our Experience Centre from anywhere in the world. Navigate through product zones, interact with displays, and experience our facility in stunning 360°.
            </p>
          </div>

          {/* Tour embed placeholder */}
          <div className="relative max-w-5xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl shadow-orange-500/10">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-neutral-900/80 to-neutral-950/90">
                <div className="w-20 h-20 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center backdrop-blur-sm">
                  <Play size={32} className="text-orange-400 ml-1" />
                </div>
                <div className="text-center">
                  <p className="text-white text-xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
                    Virtual Tour Coming Soon
                  </p>
                  <p className="text-neutral-400 text-sm">Our immersive 3D walkthrough is being prepared</p>
                </div>
              </div>
              <Image
                src="/images/experience/side image.jpeg"
                alt="Experience Centre virtual tour preview"
                fill
                className="object-cover opacity-30"
              />
            </div>

            {/* Tour features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {tourFeatures.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-xl px-4 py-3"
                >
                  <f.icon size={18} className="text-orange-400 flex-shrink-0" />
                  <span className="text-neutral-300 text-sm font-medium">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="py-20 md:py-28 bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-orange-600 mb-4">
              <Camera size={13} /> Inside The Centre
            </span>
            <h2
              className="text-neutral-900 mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Photo Gallery
            </h2>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
              Get a glimpse into our state-of-the-art facility — designed to showcase the full breadth of Gulf-O-Flex® innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {galleryImages.map((img, i) => (
              <div
                key={img.src}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white font-medium text-sm">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inauguration Video ── */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-orange-600 mb-4">
              <Play size={13} /> Inauguration Day
            </span>
            <h2
              className="text-neutral-900 mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Experience Centre Opening
            </h2>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
              Relive the inauguration of our state-of-the-art Experience Centre — a milestone moment for Gulf-O-Flex®.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden border border-neutral-200 shadow-xl">
              <iframe
                src="https://www.youtube.com/embed/_xBbdDqPclk"
                title="Gulf-O-Flex Experience Centre Inauguration"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Booking ── */}
      <BookingSection />

      {/* ── Visit CTA ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 p-10 md:p-16">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500 rounded-full blur-[100px] opacity-15" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-orange-600 rounded-full blur-[80px] opacity-10" />

            <div className="relative z-10 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-orange-400 mb-5">
                  <MapPin size={13} /> Plan Your Visit
                </span>
                <h2
                  className="text-white mb-5"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
                >
                  Visit Our Experience Centre
                </h2>
                <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-xl">
                  Schedule a private tour with our technical team. Whether you&apos;re an engineer, contractor, consultant, or distributor — we&apos;ll tailor the visit to your specific needs and projects.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#book-visit"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Book a Visit <ArrowUpRight size={16} />
                  </a>
                  <a href="#virtual-tour" className="inline-flex items-center gap-2 text-neutral-300 hover:text-orange-400 transition-colors text-sm font-medium">
                    <Compass size={16} /> Or take the virtual tour
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { icon: CheckCircle2, text: "Hands-on product demonstrations" },
                  { icon: CheckCircle2, text: "Technical consultation with experts" },
                  { icon: CheckCircle2, text: "Custom solution design sessions" },
                  { icon: CheckCircle2, text: "Installation technique workshops" },
                  { icon: CheckCircle2, text: "CPD-accredited presentations" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon size={18} className="text-orange-400 flex-shrink-0" />
                    <span className="text-neutral-300 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
