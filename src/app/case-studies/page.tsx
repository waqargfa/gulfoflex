"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import CountUp from "react-countup";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Layers,
  Lightbulb,
  Link2,
  MapPin,
  Quote,
  Search,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import PageHero from "@/components/layout/PageHero";

type Region = "UAE" | "KSA";

type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h"; text: string };

type CaseStudy = {
  id: string;
  slug: string;
  region: Region;
  title: string;
  subtitle: string;
  client: string;
  location: string;
  sector: string;
  year: string;
  image: string;
  overview: string;
  challenge: Block[];
  solution: Block[];
  result: Block[];
  metrics: { label: string; value: string }[];
  highlight: string;
};

const caseStudies: CaseStudy[] = [
  {
    id: "01",
    slug: "sobha-hartland",
    region: "UAE",
    title: "Resolving Insulation Installation Issues for Sobha Hartland",
    subtitle:
      "GI duct insulation for enhanced thermal efficiency and condensation prevention.",
    client: "Sobha Hartland",
    location: "Dubai, UAE",
    sector: "Luxury Residential · HVAC",
    year: "2024",
    image: "/case-studies/sobha-hartland.webp",
    overview:
      "The purpose of the project was to work on insulation of GI ducts for enhanced thermal efficiency and condensation prevention.",
    challenge: [
      {
        type: "p",
        text: "During the insulation phase, the contractor faced issues with the insulation detaching from the GI ducts. Initially, this was perceived as a material defect or product quality complaint. The issue risked delaying the project timeline and compromising the ductwork's thermal efficiency and durability.",
      },
      {
        type: "p",
        text: "Insulation was being applied without following the proper installation guidelines, leading to poor bonding between the insulation and the GI ducts. Edge finishing and joint sealing were not executed as per standard practices.",
      },
    ],
    solution: [
      {
        type: "p",
        text: "To rectify this issue, we conducted a technical training session for the site technicians, focusing on:",
      },
      {
        type: "ul",
        items: [
          "Proper surface preparation of GI ducts before insulation application",
          "Proper alignment and sealing of insulation edges to prevent detachment",
          "Demonstrated the correct installation process step-by-step",
        ],
      },
    ],
    result: [
      {
        type: "p",
        text: "With the proper training, the technicians secured the insulation effectively to the GI ducts. This ensured that the project continued as per the timeline.",
      },
    ],
    metrics: [
      { value: "0", label: "Detachment incidents" },
      { value: "100%", label: "Bond integrity" },
      { value: "On-Time", label: "Project delivery" },
    ],
    highlight: "Hands-on installer training restored timeline and bond integrity.",
  },
  {
    id: "02",
    slug: "six-senses-palm-jumeirah",
    region: "UAE",
    title: "Insulation Solutions for Six Senses Project in Palm Jumeirah",
    subtitle:
      "Humidity-resilient insulation for a flagship luxury residential and resort development.",
    client: "Six Senses · Palm Jumeirah",
    location: "Palm Jumeirah, Dubai, UAE",
    sector: "Luxury Hospitality · MEP",
    year: "2024",
    image: "/case-studies/palm-six-senses.webp",
    overview:
      "Our client was advancing the luxury residential and resort developments within Palm Jumeirah. Known as one of the most affluent areas in the city, the continued construction of top-notch housing, boasting state-of-the-art amenities was key.",
    challenge: [
      {
        type: "p",
        text: "Due to the site's proximity to the sea, there were strong concerns over high humidity levels. The increased humidity can lead to insulation not working as expected, thus damaging the equipment needed to maintain the development and increasing maintenance costs.",
      },
    ],
    solution: [
      {
        type: "p",
        text: "To address the unique environmental conditions, we conducted a detailed site analysis and recommended adjustments to our standard insulation specifications:",
      },
      { type: "h", text: "Exposed Ducts" },
      {
        type: "ul",
        items: [
          "Normal Recommendation: 32 mm or 38 mm sheet rolls",
          "Project-Specific Adjustment: We increased the thickness to 50 mm to counteract the high moisture levels and maintain performance efficiency",
        ],
      },
      { type: "h", text: "Chilled Water Pipes" },
      {
        type: "ul",
        items: [
          "Normal Recommendation: 32 mm insulation for pipes above 150 mm thickness",
          "Project-Specific Adjustment: 75 mm insulation in two layers , First Layer: 50 mm base barrier; Second Layer: 25 mm for enhanced protection and thermal performance",
        ],
      },
    ],
    result: [
      {
        type: "p",
        text: "The increased thickness effectively prevented condensation, ensuring the longevity of the duct and pipe systems. In addition, it maintained thermal efficiency despite the high humidity, reducing the project's overall energy consumption.",
      },
    ],
    metrics: [
      { value: "75 mm", label: "Two-layer pipe spec" },
      { value: "50 mm", label: "Duct thickness" },
      { value: "↓ Energy", label: "Consumption" },
    ],
    highlight: "Custom thickness spec engineered for coastal humidity.",
  },
  {
    id: "03",
    slug: "qiddiya-water-theme-park",
    region: "KSA",
    title: "Qiddiya Water Theme Park",
    subtitle:
      "Insulation specification engineered for Riyadh's dry, dusty desert climate.",
    client: "Qiddiya",
    location: "Riyadh, Saudi Arabia",
    sector: "Entertainment · MEP",
    year: "2024",
    image: "/case-studies/qiddiya.webp",
    overview:
      "The aim for this project was to select appropriate insulation materials for both indoor pipes and ducts, with specific aims to preventing condensation. The Riyadh region, known for its low relative humidity (RH), played a significant role in the material selection and design approach.",
    challenge: [
      {
        type: "p",
        text: "Dry, dusty weather conditions are common in Riyadh. This means that standard insulation will not work under these harsh environmental conditions. This is because when glued with self-adhesive backing, it would not be sufficient to maintain a bond to the ducts due to dust and extreme dryness.",
      },
    ],
    solution: [
      {
        type: "p",
        text: "We had to conduct additional inspections and analysis to determine the right thickness and material to face these environmental conditions.",
      },
      {
        type: "p",
        text: "Based on climate data and environmental conditions in Riyadh, we selected minimal thickness insulation for indoor pipes and ducts. Our analysis was grounded in the following key data:",
      },
      {
        type: "ul",
        items: [
          "Outdoor RH: 5%",
          "Indoor RH: 45-50% (approx.)",
          "Dry Bulb Temperature (DBT): As provided by the contractor's equipment selection",
          "Wet Bulb Temperature (WBT): As provided by the contractor's equipment selection",
        ],
      },
      {
        type: "p",
        text: "Given this data, we calculated the insulation thickness requirements for both indoor and outdoor installations:",
      },
      {
        type: "ul",
        items: [
          "Indoor Insulation Thickness: 19 mm",
          "Outdoor Insulation Thickness: 32 mm",
        ],
      },
      {
        type: "p",
        text: "These thicknesses were sufficient to prevent condensation given the low RH and operating temperatures. The consultant requested a manual calculation for verification , our manual calculation matched the system-generated result, confirming the accuracy of the proposed insulation thickness.",
      },
    ],
    result: [
      {
        type: "p",
        text: "This ensured that the insulation would withstand the dry desert environment, completing the project as per the planned timeline and reducing maintenance costs in the long run. It also means the equipment will operate for a longer lifespan.",
      },
    ],
    metrics: [
      { value: "19 mm", label: "Indoor thickness" },
      { value: "32 mm", label: "Outdoor thickness" },
      { value: "Verified", label: "Manual + system" },
    ],
    highlight: "Climate-data-driven spec, validated by dual calculation methods.",
  },
  {
    id: "04",
    slug: "jeddah-central-stadium",
    region: "KSA",
    title: "Jeddah Central Development , Stadium",
    subtitle:
      "Full specification switch from XLPE to NBR closed-cell elastomeric through an independent test programme on a Vision 2030 flagship venue.",
    client: "Jeddah Central Development · Stadium",
    location: "Jeddah, Saudi Arabia",
    sector: "Sports & Leisure · MEP",
    year: "2025",
    image: "/case-studies/qiddiya.webp",
    overview:
      "The mechanical specification for the stadium's chilled-water, BMU and HVAC distribution was originally issued calling for XLPE/PE foam insulation throughout , a default carried from the consultant's previous large-venue templates. With a high-occupancy sports venue and Saudi Vision 2030 visibility, the fire and life-safety implications warranted a formal challenge.",
    challenge: [
      {
        type: "p",
        text: "The design consultant's template specified XLPE/PE foam for all CHW and HVAC scopes. Independent review identified that XLPE did not meet the fire reaction, smoke density, or vapour resistance thresholds required for an occupied public venue under SASO and the Saudi Building Code (S804.3).",
      },
      {
        type: "p",
        text: "A formal variation was required , supported by an independent comparative test programme , to persuade both the consultant and the authority having jurisdiction to accept the substitution without programme impact.",
      },
    ],
    solution: [
      {
        type: "p",
        text: "Rather than arguing from datasheets, Gulf-O-Flex commissioned an independent comparative test programme covering four standards:",
      },
      {
        type: "ul",
        items: [
          "EN 13501-1 · Reaction to fire: XLPE Class E → Gulf-O-Flex NBR Class B-s2,d0",
          "ASTM E662 · Smoke density (Dm): XLPE >450 → Gulf-O-Flex NBR <200 (>55% lower)",
          "EN 12086 · Water vapour resistance (μ): XLPE ≥3,500 → Gulf-O-Flex NBR ≥7,300 (2�- barrier)",
          "Long-term thermal stability: XLPE showed λ drift and cell collapse; NBR remained dimensionally stable",
        ],
      },
      {
        type: "p",
        text: "The full variation pack , including SASO alignment evidence , was submitted to the consultant and the authority having jurisdiction as a formal technical document.",
      },
    ],
    result: [
      {
        type: "p",
        text: "The consultant amended the specification across all CHW and HVAC scopes. Gulf-O-Flex NBR was approved as the sole insulation system. The variation was accepted with zero programme delay, and the project owner gained a documented audit trail proving the substitution improved fire safety and life-cycle performance at parity installed cost.",
      },
    ],
    metrics: [
      { value: "100%", label: "Spec converted to NBR" },
      { value: "5", label: "Standards independently tested" },
      { value: "0", label: "Programme delay" },
    ],
    highlight: "Independent test evidence secured a full XLPE-to-NBR spec switch on a Vision 2030 landmark.",
  },
  {
    id: "05",
    slug: "district-cooling-dubai",
    region: "UAE",
    title: "District Cooling Network , Dubai",
    subtitle:
      "A hybrid PIR + Gulf-O-Flex Aluclad strategy cut 15-year total cost of ownership by 38% on a 14 km secondary CHW network.",
    client: "District Cooling Operator",
    location: "Dubai, UAE",
    sector: "District Cooling · Infrastructure",
    year: "2025",
    image: "/case-studies/cbd-sharjah.webp",
    overview:
      "A 14 km secondary chilled-water network feeding a mixed-use district. The original specification used 75 mm PIR pre-insulated steel factory-jacketed pipe for straight runs , a well-performing choice for straight sections. The challenge was the 3,000+ field joints, valves, expansion bends, and risers rising into each plot: precisely where rigid foam underperforms.",
    challenge: [
      {
        type: "p",
        text: "Factory-insulated PIR straight sections performed reliably. However, every field joint, valve, expansion bend, and plot take-off was insulated on-site using rigid PIR sections , a labour-intensive process prone to condensation, corrosion under insulation (CUI), and energy loss at fittings.",
      },
      {
        type: "p",
        text: "Mid-life re-insulation events were projected at years 10 and 20, driven by CUI at poorly sealed field joints. Total cost of ownership over 15 years under the all-rigid strategy was modelled at USD 138/m.",
      },
    ],
    solution: [
      {
        type: "p",
        text: "Gulf-O-Flex proposed a hybrid strategy:",
      },
      {
        type: "ul",
        items: [
          "Retain PIR pre-insulated pipe for all straight, factory-jacketed runs , no change to the performing element",
          "Substitute Gulf-O-Flex Aluclad at every fitting, valve, riser break, and plot take-off",
          "Deliver a single, sealed, vapour-tight system at the network's failure points",
          "Reduce field-joint installation time by 3�- versus the rigid-only approach",
        ],
      },
    ],
    result: [
      {
        type: "p",
        text: "The hybrid strategy eliminated mid-life re-insulation events. No condensation defects were recorded at flexible-insulated fittings. The 15-year total cost of ownership dropped from USD 138/m to USD 79/m , a 38% reduction , driven by avoided rework, reduced joint installation hours, and zero replacement events.",
      },
    ],
    metrics: [
      { value: "−38%", label: "15-year TCO vs rigid-only" },
      { value: "�-3", label: "Faster field-joint install" },
      { value: "0", label: "Mid-life re-insulations" },
    ],
    highlight: "Hybrid PIR + Aluclad strategy delivered 38% lower 15-year TCO by targeting the network's failure points.",
  },
  {
    id: "06",
    slug: "sustainable-city-abu-dhabi",
    region: "UAE",
    title: "The Sustainable City , Abu Dhabi",
    subtitle:
      "150,000 m² of closed-cell duct liner specified to meet LEED, Estidama, and zero-fibre-shedding mandates on a flagship UAE sustainable development.",
    client: "The Sustainable City · JEET MEP Contractors",
    location: "Abu Dhabi, UAE",
    sector: "Sustainable Development · HVAC",
    year: "2024",
    image: "/case-studies/sustainable-city-uae.webp",
    overview:
      "A flagship sustainable development demanding the highest Indoor Air Quality, thermal efficiency, and long-term material durability standards across all MEP systems. JEET MEP Contractors specified Gulf-O-Flex closed-cell elastomeric foam duct liner as the sole internal duct insulation system for 150,000 m² of HVAC distribution.",
    challenge: [
      {
        type: "p",
        text: "The project's sustainability brief mandated zero-fibre-shedding duct insulation to satisfy Estidama Pearl and LEED IEQ credit requirements. Open-cell fiberglass, the conventional duct liner, posed an IAQ risk in occupied spaces and was rejected by the sustainability consultant at design stage.",
      },
      {
        type: "p",
        text: "The scale of the installation , 150,000 m² , required a material with factory-laminated self-adhesive backing to meet the programme throughput target, and a 20-year acoustic and thermal performance guarantee without mid-life replacement.",
      },
    ],
    solution: [
      {
        type: "p",
        text: "Gulf-O-Flex closed-cell elastomeric foam duct liner was selected and installed via the KHANSAHEB Pre-Insulated 'Specialite' panel system. Key installation disciplines applied across the full scope:",
      },
      {
        type: "ul",
        items: [
          "Full surface preparation , ducts cleaned of dust, oils and contaminants prior to bonding",
          "Precision cutting using sharp blades to eliminate acoustic leak paths at joints",
          "Adhesive activation maintained between 18-35°C to ensure self-adhesive backing performance",
          "Approved sealant at all seams to eliminate thermal bridges and acoustic leakage",
        ],
      },
    ],
    result: [
      {
        type: "p",
        text: "Zero fibre-shedding was recorded across all occupied zones. NRC performance was independently verified by Dubai Acoustics Research Laboratory at 0.40 for 19 mm thickness , stable across the 20-year design life. The installation contributed to IEQ and energy credits under both LEED and Estidama Pearl, and completed on programme.",
      },
    ],
    metrics: [
      { value: "150k m²", label: "Duct liner installed" },
      { value: "0%", label: "Fibre shedding" },
      { value: "20 yr", label: "Acoustic performance life" },
    ],
    highlight: "Zero-fibre, 20-year stable acoustic performance across 150,000 m² on a LEED & Estidama flagship.",
  },
];

const principles = [
  {
    icon: Target,
    title: "Site-First Diagnosis",
    desc: "Every case begins with an on-site audit by our technical team , not assumptions.",
  },
  {
    icon: Lightbulb,
    title: "Engineered Solutions",
    desc: "We specify products, thicknesses, and installation methods tuned to the exact environment.",
  },
  {
    icon: Trophy,
    title: "Measurable Outcomes",
    desc: "Performance is verified , bond integrity, condensation control, energy savings.",
  },
];

function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-3">
      {blocks.map((b, i) => {
        if (b.type === "p") {
          return (
            <p
              key={i}
              className="text-[13px] md:text-sm text-neutral-700 leading-relaxed"
            >
              {b.text}
            </p>
          );
        }
        if (b.type === "h") {
          return (
            <div
              key={i}
              className="text-[11px] font-bold tracking-[0.14em] uppercase text-orange-700 pt-1"
            >
              {b.text}
            </div>
          );
        }
        return (
          <ul key={i} className="space-y-1.5">
            {b.items.map((item, j) => (
              <li
                key={j}
                className="flex items-start gap-2 text-[13px] md:text-sm text-neutral-700 leading-relaxed"
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

// ── Scroll progress bar (top of viewport) ──────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 shadow-[0_0_12px_rgba(234,88,12,0.45)] pointer-events-none"
      style={{ scaleX }}
    />
  );
}

// ── 3D tilt-on-hover wrapper ───────────────────────────────────────────
function TiltCard({
  children,
  className = "",
  intensity = 6,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });
  const rotateX = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [intensity, -intensity]);
  const rotateY = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-intensity, intensity]);
  const glareX = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(sy, [-0.5, 0.5], ["20%", "80%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.35), transparent 55%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay opacity-60"
        style={{ background: glare }}
      />
    </motion.div>
  );
}

// ── Animated metric value (CountUp on first view) ──────────────────────
function MetricCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const match = /^([↓↑]?\s?)(-?\d+(?:\.\d+)?)(.*)$/.exec(value);

  if (!match) {
    return <span ref={ref}>{value}</span>;
  }
  const prefix = match[1] ?? "";
  const num = parseFloat(match[2]);
  const suffix = match[3] ?? "";
  const decimals = match[2].includes(".") ? 1 : 0;

  return (
    <span ref={ref}>
      {prefix}
      {inView ? (
        <CountUp end={num} duration={1.8} decimals={decimals} separator="," />
      ) : (
        "0"
      )}
      {suffix}
    </span>
  );
}

// ── Hook: scroll-spy active section id ─────────────────────────────────
function useScrollSpy(ids: string[], offset = 160) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    if (!ids.length) return;
    const onScroll = () => {
      const y = window.scrollY + offset;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);
  return active;
}

export default function CaseStudiesPage() {
  const [region, setRegion] = useState<Region | "ALL">("ALL");
  const [query, setQuery] = useState("");

  // Hero parallax
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroProg } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProg, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(heroProg, [0, 1], [1, 0.6]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return caseStudies.filter((c) => {
      if (region !== "ALL" && c.region !== region) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.client.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.sector.toLowerCase().includes(q)
      );
    });
  }, [region, query]);

  const tabs: ("ALL" | Region)[] = ["ALL", "UAE", "KSA"];

  // Scroll-spy for the floating preview list + sticky chip nav
  const slugs = useMemo(() => visible.map((c) => c.slug), [visible]);
  const active = useScrollSpy(slugs, 200);

  // Per-card active tab (challenge / solution / result)
  type Tab = "challenge" | "solution" | "result";
  const [openTabs, setOpenTabs] = useState<Record<string, Tab>>({});
  const setCardTab = (id: string, t: Tab) =>
    setOpenTabs((s) => ({ ...s, [id]: t }));

  // Copy link to clipboard with toast
  const [copied, setCopied] = useState<string | null>(null);
  const copyLink = useCallback((slug: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${slug}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(slug);
      setTimeout(() => setCopied(null), 1800);
    });
  }, []);

  // Stats
  const totals = useMemo(() => {
    const sectors = new Set(caseStudies.map((c) => c.sector.split("·")[0].trim()));
    return {
      projects: caseStudies.length,
      regions: new Set(caseStudies.map((c) => c.region)).size,
      sectors: sectors.size,
    };
  }, []);

  return (
    <>
      <ScrollProgress />

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-24"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}
      >
        {/* parallax background */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
          aria-hidden
        >
          <PageHero
            src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=2400&q=80"
            focalY="45%"
          />
        </motion.div>

        {/* decorative gradient mesh */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-50 pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(251,146,60,0.35), rgba(251,146,60,0) 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-20 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(249,115,22,0.30), rgba(249,115,22,0) 70%)",
          }}
        />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <nav
                className="flex items-center gap-2 text-xs text-neutral-500 mb-8"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="hover:text-orange-600 transition-colors">
                  Home
                </Link>
                <ChevronRight size={12} className="text-neutral-300" />
                <span className="text-neutral-700">Case Studies</span>
              </nav>

              <div className="eyebrow mb-6">
                <span className="eyebrow-dot" />
                Real Projects · Real Outcomes
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
                Case studies that
                <br />
                <span className="gradient-text">solve real problems</span>
                <span className="serif-italic text-orange-600">.</span>
              </h1>

              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                Our insulation solutions have played a key role in the region&rsquo;s
                architecture and development. We&rsquo;re proud to have worked with leading
                developers, real estate agencies, government entities and local businesses.
              </p>

              {/* Quick stats */}
              <div className="mb-7 grid grid-cols-3 max-w-md gap-3">
                {[
                  { v: totals.projects, label: "Documented projects", suffix: "+" },
                  { v: totals.regions, label: "GCC regions", suffix: "" },
                  { v: totals.sectors, label: "Sectors served", suffix: "+" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border bg-white/70 backdrop-blur px-4 py-3"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}
                  >
                    <div
                      className="text-neutral-900 font-black leading-none"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.25rem, 2.4vw, 1.85rem)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      <MetricCounter value={`${s.v}${s.suffix}`} />
                    </div>
                    <div className="mt-1 text-[10px] tracking-[0.14em] uppercase font-bold text-neutral-500 leading-tight">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Search + Region tabs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <label
                  className="relative flex items-center gap-2 rounded-full border bg-white px-4 py-2.5 shadow-sm flex-1 max-w-md focus-within:ring-2 focus-within:ring-orange-500/40 focus-within:border-orange-400 transition"
                  style={{ borderColor: "rgba(0,0,0,0.08)" }}
                >
                  <Search size={15} className="text-neutral-400" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by client, city or sector…"
                    className="flex-1 bg-transparent outline-none text-sm text-neutral-800 placeholder:text-neutral-400"
                    aria-label="Search case studies"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="text-[10px] font-bold tracking-[0.14em] uppercase text-neutral-400 hover:text-orange-600"
                    >
                      Clear
                    </button>
                  )}
                </label>

                <div
                  className="inline-flex items-center gap-1 p-1 rounded-full border bg-white shadow-sm self-start"
                  style={{ borderColor: "rgba(0,0,0,0.08)" }}
                >
                  {tabs.map((t) => {
                    const isActive = region === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setRegion(t)}
                        className={`relative px-5 py-2 text-xs font-bold tracking-[0.14em] uppercase rounded-full transition ${
                          isActive ? "text-white" : "text-neutral-600 hover:text-orange-600"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="region-pill"
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 shadow"
                            transition={{ type: "spring", stiffness: 320, damping: 28 }}
                          />
                        )}
                        <span className="relative z-10">
                          {t === "ALL" ? "All Regions" : t}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Floating preview card with 3D tilt + scroll-spy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/20 via-orange-400/10 to-transparent rounded-[2rem] blur-3xl pointer-events-none" />
              <TiltCard intensity={5} className="rounded-3xl">
                <div
                  className="relative rounded-3xl border bg-white/90 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(234,88,12,0.20)]"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}
                >
                  <div
                    className="px-7 py-4 border-b flex items-center justify-between"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-orange-600" />
                      <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">
                        Featured · {visible.length} of {caseStudies.length}
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-700">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
                      </span>
                      Live
                    </span>
                  </div>

                  <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    {visible.length === 0 && (
                      <div className="px-7 py-10 text-center text-sm text-neutral-500">
                        No case studies match those filters yet.
                      </div>
                    )}
                    {visible.map((cs) => {
                      const isActive = active === cs.slug;
                      return (
                        <a
                          key={cs.id}
                          href={`#${cs.slug}`}
                          className={`group relative block px-7 py-5 transition ${
                            isActive ? "bg-orange-50/80" : "hover:bg-orange-50/60"
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="active-rail"
                              className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gradient-to-b from-orange-500 to-orange-600"
                              transition={{ type: "spring", stiffness: 320, damping: 28 }}
                            />
                          )}
                          <div className="flex items-start gap-4">
                            <div
                              className="text-orange-600 font-black text-2xl leading-none mt-1"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {cs.id}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-500 mb-1">
                                {cs.region} · {cs.sector}
                              </div>
                              <div className="text-neutral-900 font-semibold leading-snug mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                                {cs.title}
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                                <MapPin size={11} className="text-orange-600" />
                                {cs.location}
                              </div>
                            </div>
                            <ArrowUpRight
                              size={16}
                              className={`mt-2 transition-colors ${
                                isActive
                                  ? "text-orange-600"
                                  : "text-neutral-400 group-hover:text-orange-600"
                              }`}
                            />
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Sticky jump-to nav (scroll-spy chips) ── */}
      {visible.length > 0 && (
        <div className="sticky top-16 md:top-20 z-30 backdrop-blur-md bg-white/85 border-y" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <div className="container-wide py-3 flex items-center gap-3 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-500 shrink-0">
              Jump to
            </span>
            {visible.map((cs) => {
              const isActive = active === cs.slug;
              return (
                <a
                  key={cs.slug}
                  href={`#${cs.slug}`}
                  className={`relative shrink-0 text-[11px] font-bold tracking-[0.12em] uppercase px-3.5 py-1.5 rounded-full border transition ${
                    isActive
                      ? "text-white border-transparent"
                      : "text-neutral-600 border-neutral-200 hover:text-orange-600 hover:border-orange-300"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="chip-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-600 to-orange-500"
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">
                    {cs.id} · {cs.client.split("·")[0].trim()}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Approach Principles ── */}
      <section
        className="py-16 md:py-20 bg-white border-t"
        style={{ borderColor: "rgba(0,0,0,0.06)" }}
      >
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-5">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-2xl border bg-gradient-to-br from-white to-orange-50/40 p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 overflow-hidden"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-orange-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="w-11 h-11 rounded-xl bg-orange-600/10 flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
                  <p.icon
                    size={20}
                    className="text-orange-600 group-hover:text-white transition-colors"
                  />
                </div>
                <div
                  className="text-neutral-900 font-bold mb-1.5 text-lg"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                >
                  {p.title}
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section id="studies" className="py-20 md:py-28 bg-neutral-50/60 relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-14"
          >
            <div className="eyebrow mb-4">
              <span className="eyebrow-dot" />
              Detailed Case Studies
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
              From <span className="serif-italic text-orange-600">challenge</span> to{" "}
              <span className="gradient-text">measurable result</span>.
            </h2>
          </motion.div>

          {visible.length === 0 && (
            <div className="rounded-2xl border bg-white p-10 text-center text-neutral-500" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <Search size={22} className="mx-auto mb-3 text-neutral-400" />
              <p className="text-sm">
                No case studies match your filters.{" "}
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setRegion("ALL");
                  }}
                  className="font-semibold text-orange-600 hover:underline"
                >
                  Reset filters
                </button>
              </p>
            </div>
          )}

          <div className="space-y-20 md:space-y-28">
            {visible.map((cs, idx) => {
              const tab: Tab = openTabs[cs.id] ?? "challenge";
              const tabConfig = [
                {
                  key: "challenge" as const,
                  label: "Challenge",
                  icon: AlertTriangle,
                  accent: "text-orange-600",
                  ring: "ring-orange-200/70",
                  pill: "from-orange-500 to-orange-600",
                  blocks: cs.challenge,
                },
                {
                  key: "solution" as const,
                  label: "Solution",
                  icon: Lightbulb,
                  accent: "text-orange-600",
                  ring: "ring-orange-200/70",
                  pill: "from-orange-500 to-orange-600",
                  blocks: cs.solution,
                },
                {
                  key: "result" as const,
                  label: "Result",
                  icon: CheckCircle2,
                  accent: "text-orange-600",
                  ring: "ring-orange-200/70",
                  pill: "from-orange-500 to-orange-600",
                  blocks: cs.result,
                },
              ];
              const activeTab = tabConfig.find((t) => t.key === tab)!;

              return (
                <motion.article
                  key={cs.id}
                  id={cs.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="scroll-mt-36 grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-start"
                >
                  {/* Image side */}
                  <div className={`relative ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/20 via-transparent to-transparent rounded-[2rem] blur-3xl pointer-events-none" />
                    <TiltCard intensity={4} className="rounded-3xl">
                      <div
                        className="relative rounded-3xl overflow-hidden border shadow-[0_30px_80px_-30px_rgba(234,88,12,0.30)] aspect-[4/5] bg-neutral-100"
                        style={{ borderColor: "rgba(0,0,0,0.06)" }}
                      >
                        <Image
                          src={cs.image}
                          alt={cs.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 45vw"
                          className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                        <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                          <span className="text-[10px] font-bold tracking-[0.18em] uppercase border px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-orange-600 border-orange-500/25">
                            Case Study {cs.id}
                          </span>
                          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/95 bg-black/45 backdrop-blur px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                            <Calendar size={10} /> {cs.region} · {cs.year}
                          </span>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-300 mb-2 inline-flex items-center gap-1.5">
                            <Layers size={11} /> {cs.sector}
                          </div>
                          <div
                            className="font-bold text-lg leading-tight mb-1 inline-flex items-center gap-2"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            <Building2 size={16} className="text-orange-300" /> {cs.client}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-white/85">
                            <MapPin size={12} className="text-orange-300" />
                            {cs.location}
                          </div>
                        </div>
                      </div>
                    </TiltCard>

                    {/* Animated metrics ribbon */}
                    <div
                      className="relative mt-5 rounded-2xl border bg-white grid grid-cols-3 overflow-hidden"
                      style={{ borderColor: "rgba(0,0,0,0.06)" }}
                    >
                      {cs.metrics.map((m, mi) => (
                        <div
                          key={m.label}
                          className={`relative p-4 text-center ${
                            mi !== 0 ? "border-l" : ""
                          }`}
                          style={{ borderColor: "rgba(0,0,0,0.06)" }}
                        >
                          <div
                            className="text-neutral-900 font-black leading-none mb-1.5 bg-gradient-to-br from-neutral-900 to-orange-700 bg-clip-text text-transparent"
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "clamp(1rem, 1.7vw, 1.55rem)",
                              letterSpacing: "-0.025em",
                            }}
                          >
                            <MetricCounter value={m.value} />
                          </div>
                          <div className="text-[9px] uppercase tracking-[0.14em] font-bold text-neutral-500 leading-tight">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Copy link */}
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => copyLink(cs.slug)}
                        className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase text-neutral-500 hover:text-orange-600 transition"
                      >
                        <Link2 size={13} />
                        {copied === cs.slug ? "Link copied" : "Copy link"}
                      </button>
                      <div className="text-[10px] tracking-[0.16em] uppercase font-bold text-neutral-400">
                        #{cs.slug}
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-orange-600 mb-3 inline-flex items-center gap-2">
                      <Award size={12} /> Case Study · {cs.id} · {cs.region}
                    </div>
                    <h3
                      className="text-neutral-900 leading-[1.08] mb-3"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {cs.title}
                    </h3>
                    <p className="text-neutral-600 text-base md:text-lg leading-relaxed mb-6">
                      {cs.subtitle}
                    </p>

                    {/* Overview */}
                    <div
                      className="rounded-2xl border bg-white p-5 md:p-6 mb-6"
                      style={{ borderColor: "rgba(0,0,0,0.06)" }}
                    >
                      <div className="flex items-start gap-3">
                        <Quote size={20} className="text-orange-500/70 shrink-0 mt-0.5" />
                        <p className="text-neutral-700 text-sm md:text-[15px] leading-relaxed">
                          {cs.overview}
                        </p>
                      </div>
                    </div>

                    {/* Tabbed Challenge / Solution / Result */}
                    <div
                      className="rounded-2xl border bg-white overflow-hidden"
                      style={{ borderColor: "rgba(0,0,0,0.06)" }}
                    >
                      {/* Tab rail */}
                      <div
                        role="tablist"
                        aria-label={`${cs.title} details`}
                        className="relative grid grid-cols-3 border-b"
                        style={{ borderColor: "rgba(0,0,0,0.06)" }}
                      >
                        {tabConfig.map((t) => {
                          const isOn = t.key === tab;
                          return (
                            <button
                              key={t.key}
                              role="tab"
                              aria-selected={isOn}
                              type="button"
                              onClick={() => setCardTab(cs.id, t.key)}
                              className="relative px-3 py-3.5 text-xs font-bold tracking-[0.14em] uppercase transition"
                            >
                              <span
                                className={`relative z-10 inline-flex items-center justify-center gap-1.5 ${
                                  isOn ? t.accent : "text-neutral-500"
                                }`}
                              >
                                <t.icon size={14} /> {t.label}
                              </span>
                              {isOn && (
                                <motion.span
                                  layoutId={`tab-underline-${cs.id}`}
                                  className={`absolute bottom-[-1px] left-3 right-3 h-[2.5px] rounded-full bg-gradient-to-r ${t.pill}`}
                                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <motion.div
                        key={`${cs.id}-${activeTab.key}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className={`relative p-5 md:p-6 ring-1 ${activeTab.ring} rounded-b-2xl`}
                      >
                        <div
                          className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-orange-500/[0.04] to-transparent pointer-events-none rounded-b-none`}
                        />
                        <BlockRenderer blocks={activeTab.blocks as Block[]} />
                      </motion.div>
                    </div>

                    {/* Highlight */}
                    <div className="mt-6 flex items-start gap-3 rounded-xl border border-orange-200/70 bg-gradient-to-br from-orange-50 to-orange-50/60 px-4 py-3.5">
                      <Sparkles size={16} className="text-orange-600 shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold text-orange-900 leading-snug">
                        {cs.highlight}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-neutral-950 via-neutral-900 to-orange-950 p-10 md:p-16"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            {/* animated mesh */}
            <motion.div
              aria-hidden
              className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/25 rounded-full blur-3xl pointer-events-none"
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none"
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
              <div>
                <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-orange-300 mb-4">
                  Have a similar challenge?
                </div>
                <h3
                  className="text-white leading-[1.05] mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Let&rsquo;s engineer the right{" "}
                  <span className="serif-italic text-orange-300">solution</span>.
                </h3>
                <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
                  Our technical team is available for site audits, specification support and
                  installer training , across the GCC and beyond.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:shadow-orange-500/50"
                >
                  Request a site audit{" "}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  View all projects <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}


