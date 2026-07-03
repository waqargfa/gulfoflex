"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   NBR RENDER SEQUENCE
───────────────────────────────────────────────────────── */

type RenderSeqProps = {
  progressRef: React.MutableRefObject<number>;
  folder: string;
  prefix: string;
  frameCount: number;
  padLength?: number;
  ext?: string;
  scale?: number;
  topCrop?: number;
};

function RenderSequence({ progressRef, folder, prefix, frameCount, padLength = 4, ext = "png", scale = 1, topCrop = 0 }: RenderSeqProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(frameCount).fill(null));
  const loadedRef = useRef<boolean[]>(new Array(frameCount).fill(false));
  const loadingRef = useRef<Set<number>>(new Set());
  const lastFrameRef = useRef(-1);
  const visibleRef = useRef(false);

  const WINDOW = 10; // load ±10 frames around current position
  const MAX_CONCURRENT = 4; // limit concurrent network requests

  const getUrl = useCallback((i: number) => {
    const filename = `${prefix}${String(i).padStart(padLength, "0")}.${ext}`;
    return `/${folder}/${filename}`;
  }, [folder, prefix, padLength, ext]);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const img = imagesRef.current[frameIndex];
    if (!canvas || !container || !img || !img.naturalWidth) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, w, h);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;
    let dw: number, dh: number, dx: number, dy: number;
    if (imgRatio > canvasRatio) {
      dh = h;
      dw = h * imgRatio;
      dx = (w - dw) / 2;
      dy = 0;
    } else {
      dw = w;
      dh = w / imgRatio;
      dx = 0;
      dy = (h - dh) / 2;
    }
    // Optional scale-down and top crop (shift image up by topCrop fraction of height)
    dw *= scale;
    dh *= scale;
    dx = (w - dw) / 2;
    dy = (h - dh) / 2 - h * topCrop;
    ctx.drawImage(img, dx, dy, dw, dh);
    lastFrameRef.current = frameIndex;
  }, [scale, topCrop]);

  const loadFrame = useCallback((i: number) => {
    if (i < 0 || i >= frameCount || loadedRef.current[i] || loadingRef.current.has(i)) return;
    if (loadingRef.current.size >= MAX_CONCURRENT) return; // throttle concurrent loads
    loadingRef.current.add(i);
    const img = new Image();
    img.decoding = "async";
    img.src = getUrl(i);
    img.onload = () => {
      loadedRef.current[i] = true;
      loadingRef.current.delete(i);
      imagesRef.current[i] = img;
      if (i === 0 && lastFrameRef.current === -1) drawFrame(0);
    };
    img.onerror = () => { loadingRef.current.delete(i); };
  }, [frameCount, getUrl, drawFrame]);

  const loadWindow = useCallback((center: number) => {
    // Load current frame first, then nearby frames
    loadFrame(center);
    for (let d = 1; d <= WINDOW; d++) {
      if (loadingRef.current.size >= MAX_CONCURRENT) break;
      loadFrame(center + d);
      loadFrame(center - d);
    }
  }, [loadFrame]);

  // Visibility observer — only run rAF loop when in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Load first frame immediately
  useEffect(() => { loadWindow(0); }, [loadWindow]);

  useEffect(() => {
    let rafId: number;
    const draw = () => {
      rafId = requestAnimationFrame(draw);
      if (!visibleRef.current) return; // skip work when offscreen

      const p = progressRef.current;
      const frameIndex = Math.min(Math.floor(p * (frameCount - 1)), frameCount - 1);

      // Load frames around current scroll position
      loadWindow(frameIndex);

      if (frameIndex !== lastFrameRef.current && loadedRef.current[frameIndex]) {
        drawFrame(frameIndex);
      }
    };
    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [progressRef, frameCount, loadWindow, drawFrame]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}

/* Two-panel NBR render: Pipe + Duct side by side */
function NbrDualRender({ progressRef, productSlug }: { progressRef: React.MutableRefObject<number>; productSlug?: string }) {
  // Product-specific pipe render folder mapping
  const pipeFolder: Record<string, { folder: string; prefix: string; padLength: number }> = {
    nbr: { folder: "Render/pipe", prefix: "Render", padLength: 4 },
    xlpe: { folder: "Render/pipe/XLPE", prefix: "XLPE_", padLength: 5 },
    sound: { folder: "Render/pipe/Sound", prefix: "Sound_", padLength: 5 },
    aluglass: { folder: "Render/pipe/Aluglass", prefix: "Aluglass_", padLength: 5 },
    aluclad: { folder: "Render/pipe/Aluclad", prefix: "Aluclad_", padLength: 5 },
    ultra: { folder: "Render/pipe/ultra", prefix: "Pipes Render Ultra_", padLength: 5 },
    ultraline: { folder: "Render/pipe/ultra", prefix: "Pipes Render Ultra_", padLength: 5 },
  };

  const activePipe = pipeFolder[productSlug || ""] || pipeFolder.nbr;

  // Product-specific duct render folder mapping
  const ductFolder: Record<string, { folder: string; prefix: string; frameCount: number }> = {
    nbr: { folder: "Render/duct/nbr", prefix: "NBR_Final_Ducts_", frameCount: 361 },
    xlpe: { folder: "Render/duct/xlpe", prefix: "XLPE DUCTS_", frameCount: 361 },
    sound: { folder: "Render/duct/sound", prefix: "Sound Ducts_", frameCount: 375 },
    aluglass: { folder: "Render/duct/aluglass", prefix: "Alu_Glass_Ducts", frameCount: 361 },
    aluclad: { folder: "Render/duct/aluclad", prefix: "ALUCLAD DUCTS_", frameCount: 361 },
    ultra: { folder: "Render/duct/ultra", prefix: "Ultra Ducts_", frameCount: 361 },
    ultraline: { folder: "Render/duct/ultra", prefix: "Ultra Ducts_", frameCount: 361 },
  };

  const activeDuct = ductFolder[productSlug || ""] || ductFolder.nbr;

  // Determine available tabs based on product
  const hasDuct = true;

  type TabType = "pipe" | "duct";
  const tabs: TabType[] = ["pipe"];
  if (hasDuct) tabs.push("duct");

  const [activePanel, setActivePanel] = useState<TabType>(tabs[0]);

  return (
    <div className="absolute inset-0">
      {/* Render panels - only mount active panel */}
      <div className="absolute inset-0">
        {activePanel === "pipe" && (
          <RenderSequence progressRef={progressRef} folder={activePipe.folder} prefix={activePipe.prefix} frameCount={361} padLength={activePipe.padLength} ext="webp" />
        )}
        {activePanel === "duct" && (
          <RenderSequence progressRef={progressRef} folder={activeDuct.folder} prefix={activeDuct.prefix} frameCount={activeDuct.frameCount} padLength={5} ext="webp" scale={0.6} topCrop={-0.12} />
        )}
      </div>

      {/* Tab switcher - overlaid at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActivePanel(tab)}
            className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-md"
            style={{
              background: activePanel === tab ? "rgba(249,115,22,0.25)" : "rgba(0,0,0,0.4)",
              border: `1px solid ${activePanel === tab ? "rgba(249,115,22,0.6)" : "rgba(255,255,255,0.15)"}`,
              color: activePanel === tab ? "#f97316" : "rgba(255,255,255,0.6)",
            }}
          >
            {tab === "pipe" ? "Pipe" : "Duct"}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   LAYER DATA
───────────────────────────────────────────────────────── */
type LayerSpec = {
  readonly id: string;
  readonly sublabel: string;
  readonly label: string;
  readonly description: string;
  readonly specs: readonly string[];
  readonly keyMetric?: { readonly value: string; readonly unit: string; readonly label: string };
  readonly highlights?: readonly string[];
  readonly accent: string;
};

const LAYERS: readonly LayerSpec[] = [
  {
    id: "pipe",
    sublabel: "Step 01  ·  Service Pipe",
    label: "Steel / Copper Service Pipe",
    description:
      "The base service pipe - carbon steel, stainless steel, or copper - carrying chilled water, HVAC refrigerant, domestic cold water, or industrial process fluids across the GCC's most demanding MEP networks.",
    keyMetric: { value: "DN400", unit: "", label: "Maximum bore diameter supported" },
    specs: [
      "DN15 – DN400 bore diameter",
      "−40°C to +105°C service temperature",
      "Carbon steel / Copper / SS304 / CPVC",
      "Wall thickness 1.5 – 16 mm (Sch 40/80)",
      "Working pressure up to 40 bar",
      "HVAC, district cooling & plumbing",
      "ASME B36.10 / ISO 4200 compliant",
    ],
    highlights: [
      "Compatible with all Gulf-O-Flex® insulation systems",
      "Corrosion risk eliminated after insulation application",
      "No surface preparation required prior to NBR application",
    ],
    accent: "#9ca3af",
  },
  {
    id: "insulation",
    sublabel: "Step 02  ·  Gulf-O-Flex® NBR",
    label: "Gulf-O-Flex® NBR Insulation",
    description:
      "Premium closed-cell Nitrile Butadiene Rubber (NBR) elastomeric insulation - the regional benchmark for HVAC, district cooling, and plumbing. Engineered with a closed-cell structure that acts as its own integral vapour barrier - zero water absorption, Class O fire rated, CFC/HCFC free. Manufactured in the UAE since 1993.",
    keyMetric: { value: "0.032", unit: "W/mK", label: "Thermal conductivity at 35°C (ASTM C518)" },
    specs: [
      "λ = 0.032 W/mK at 35°C (ASTM C518)",
      "λ ≤ 0.036 W/mK at 0°C (ASTM C518)",
      "−40°C to +105°C operating range",
      "Density 50–70 kg/m³ (ASTM C302-13)",
      "Water absorption 0.16 vol% (ASTM C534)",
      "WVT 0.00 Perm in - zero vapour pass (ASTM E96)",
      "Vapour diffusion factor μ ≥ 7,300",
      "NRC 0.30 / 0.40 / 0.45 at 13 / 19 / 25 mm",
      "Class O fire rated (BS 476 Pt 6 & 7)",
      "FSI ≤ 25 · SDI ≤ 50 (ASTM E84 / UL 723)",
      "Thickness 6 – 50 mm tubes · 6 – 100 mm sheets",
      "Tubes · Sheets · Rolls · Self-adhesive forms",
    ],
    highlights: [
      "FM Approved · UL Listed · EPD Verified · ISO 9001",
      "Zero ODP - CFC and HCFC free, low GWP",
      "Anti-microbial: resists mold, mildew and fungi growth",
      "Self-extinguishing - no active fire suppression needed",
      "Closed-cell = integral vapour barrier, no tape required",
      "Pre-slit tube design - no mechanical fixings, no thermal bridges",
    ],
    accent: "#f97316",
  },
  {
    id: "vapor",
    sublabel: "Step 03  ·  Gulf-O-Flex® Aluglass",
    label: "Gulf-O-Flex® Aluglass Facing",
    description:
      "High-performance aluminium + glass-cloth + PE-film laminate facing seals the insulation surface with a continuous vapour barrier and mechanical reinforcement - engineered for the heat and humidity of the Gulf climate. Self-adhesive option for fast site application.",
    keyMetric: { value: "< 0.02", unit: "perms", label: "Vapour permeability (ASTM E96)" },
    specs: [
      "Aluminium + Glass Cloth + PE Film laminate",
      "Total thickness 50 – 90 μm",
      "Vapour permeability < 0.02 perms (ASTM E96)",
      "Tensile strength (MD) ≥ 120 N / 50 mm",
      "Tensile strength (TD) ≥ 80 N / 50 mm",
      "Tear resistance ≥ 22 N (ASTM D1004)",
      "Peel strength ≥ 16 N / 25 mm",
      "−20°C to +120°C service temperature",
      "UV and moisture resistant outer aluminium layer",
      "Self-adhesive option for fast application",
    ],
    highlights: [
      "Continuous barrier - eliminates vapour ingress at joints",
      "Glass-cloth scrim provides puncture and tear resistance",
      "PE film backing protects adhesive on site",
      "Tested per ASTM, BS EN and ISO standards",
    ],
    accent: "#9ca3af",
  },
  {
    id: "cladding",
    sublabel: "Step 04  ·  Gulf-O-Flex® Aluclad",
    label: "Gulf-O-Flex® Aluclad Jacketing",
    description:
      "Industrial-grade aluminium jacketing in smooth or stucco-embossed profiles - delivering UV, weather, chemical, and mechanical protection for outdoor pipelines, offshore platforms, petrochemical plants, and rooftop plant rooms across the GCC.",
    keyMetric: { value: "0.4–1.0", unit: "mm", label: "Available gauge range" },
    specs: [
      "Aluminium Alloy 1050 / 3003 (H14 / H16 temper)",
      "Gauge: 0.4 / 0.6 / 0.8 / 1.0 mm",
      "Weight: 1.08 – 2.70 kg/m²",
      "Tensile strength ≥ 100 MPa",
      "Mill finish · Stucco-embossed · Painted",
      "−200°C to +500°C operating temperature",
      "UV, weather and chemical resistant",
      "Cut to pipe circumference + overlap allowance",
      "ISO 9001 · IMO FTP · NORSOK M-501",
    ],
    highlights: [
      "Stucco emboss provides anti-slip and aesthetic finish",
      "NORSOK M-501 approved for offshore environments",
      "IMO FTP certified for marine and naval applications",
      "Polysurlyn moisture-barrier backing option available",
    ],
    accent: "#E5E7EB",
  },
];

/* Product display names for the walkthrough copy */
const WALKTHROUGH_NAMES: Record<string, string> = {
  nbr: "Gulf-O-Flex® NBR",
  xlpe: "Gulf-O-Flex® XLPE",
  sound: "Gulf-O-Flex® Sound",
  aluglass: "Gulf-O-Flex® Aluglass",
  aluclad: "Gulf-O-Flex® Aluclad",
  ultra: "Gulf-O-Flex® Ultra",
  ultraline: "Gulf-O-Flex® UltraLine",
};

/* Product walkthrough — TWO steps only, shared across every product page:
   01 · the bare, uninsulated pipe / duct, and
   02 · the Gulf-O-Flex® insulation applied over it.
   The pipe step is generic; the insulation step is named per product.
   NBR keeps its full, independently-verified data set. */
function buildNbrLayers(productSlug?: string): readonly LayerSpec[] {
  const name = WALKTHROUGH_NAMES[productSlug || ""] || "Gulf-O-Flex®";

  const pipeStep: LayerSpec = {
    id: "pipe",
    sublabel: "Step 01  ·  Uninsulated",
    label: "Bare Pipe / Duct Surface",
    description:
      "A chilled-water line operating at +6°C in a +48°C ambient. Without insulation the cold surface condenses humidity, drips on ceilings, corrodes the line, and bleeds cooling capacity into the air. This is the unprotected baseline - condensation forms immediately.",
    keyMetric: { value: "+48°C", unit: "", label: "Typical GCC ambient temperature" },
    specs: [
      "DN15 – DN400 bore / rectangular ducts",
      "+6°C chilled-water media temperature",
      "+48°C peak ambient (GCC summer)",
      "Carbon steel / Copper / SS304 / GI duct",
      "Condensation onset: immediate without insulation",
    ],
    highlights: [
      "Uninsulated lines lose up to 30% cooling capacity",
      "Surface condensation causes ceiling staining and corrosion",
      "Biological growth risk in humid environments above 80% RH",
    ],
    accent: "#9ca3af",
  };

  const nbrInsulationStep: LayerSpec = {
    id: "insulation",
    sublabel: "Step 02  ·  Gulf-O-Flex® NBR",
    label: "Closed-Cell NBR Rubber Insulation",
    description:
      "Pre-slit Gulf-O-Flex® NBR tube slides over the line and seals along the factory-cut seam with Gulf-O-Flex® adhesive - no mechanical fixings, no thermal bridges. The flexible closed-cell Nitrile Butadiene Rubber encapsulates the pipe in an integral vapour barrier that cannot delaminate or fail at joints.",
    keyMetric: { value: "0.032", unit: "W/mK", label: "Thermal conductivity at 35°C (ASTM C518)" },
    specs: [
      "λ = 0.032 W/mK at 35°C (ASTM C518)",
      "−40°C to +105°C operating range",
      "WVT = 0.00 Perm in - zero vapour pass (ASTM E96)",
      "Class O fire rated (BS 476 Part 6 & 7)",
      "Density 50–70 kg/m³ (ASTM C302-13)",
    ],
    highlights: [
      "FM Approved · UL Listed · EPD Verified · ISO 9001",
      "Zero ODP - CFC and HCFC free, low GWP",
      "Closed-cell = integral vapour barrier, no foil tape needed",
    ],
    accent: "#f97316",
  };

  const genericInsulationStep: LayerSpec = {
    id: "insulation",
    sublabel: `Step 02  ·  ${name}`,
    label: `${name} Applied`,
    description:
      `Pre-cut ${name} is installed over the service line and sealed along the seam - no mechanical fixings, no thermal bridges. It encapsulates the pipe or duct in a continuous, closed-cell barrier for stable thermal and acoustic performance and long-term condensation control.`,
    keyMetric: { value: "30+", unit: "yrs", label: "Passive service life with zero maintenance" },
    specs: [
      "Continuous closed-cell insulation barrier",
      "Integral vapour control - no separate barrier needed",
      "No mechanical fixings, no thermal bridges",
      "Stable thermal & acoustic performance",
      "Suitable for HVAC, district cooling & plumbing",
    ],
    highlights: [
      "Closed-cell structure = integral vapour barrier",
      "CFC & HCFC free - zero ODP",
      "Passive performance - 30+ year service life",
    ],
    accent: "#f97316",
  };

  return [pipeStep, productSlug === "nbr" ? nbrInsulationStep : genericInsulationStep];
}

export type PipeLayerVariant = "full" | "nbr";

/* Geometry constants - smaller, better framed */
const R_PIPE_OUTER  = 0.55;
const R_PIPE_INNER  = 0.44;
const R_INSULATION  = 0.68;
const R_VAPOR       = 0.73;
const R_CLADDING    = 0.83;
const PIPE_LENGTH   = 4.6;

/* ─────────────────────────────────────────────────────────
   SLIDING LAYER
   Full open-ended cylinder that grows from left (y = −L/2)
   toward right (y = +L/2) as progress goes 0 → 1.
   A cross-section ring at the leading edge shows material depth.
───────────────────────────────────────────────────────── */
type SlideProps = {
  radius: number;
  innerCapRadius: number;
  length: number;
  progress: number;
  endCapColor?: string;
  children: React.ReactNode;
};

function SlidingLayer({
  radius, innerCapRadius, length, progress,
  endCapColor = "#111",
  children,
}: SlideProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const capRef  = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const p = THREE.MathUtils.clamp(progress, 0, 1);
    if (!meshRef.current) return;

    if (p < 0.005) {
      meshRef.current.visible = false;
      if (capRef.current) capRef.current.visible = false;
      return;
    }

    const currentLen = Math.max(p * length, 0.02);
    const centerY    = -length / 2 + currentLen / 2;
    const leadY      = -length / 2 + currentLen;

    meshRef.current.visible    = true;
    meshRef.current.position.y = centerY;

    const geom = meshRef.current.geometry as THREE.CylinderGeometry;
    if (Math.abs(geom.parameters.height - currentLen) > 0.008) {
      geom.dispose();
      meshRef.current.geometry = new THREE.CylinderGeometry(radius, radius, currentLen, 80, 1, true);
    }

    if (capRef.current) {
      capRef.current.visible    = p > 0.01;
      capRef.current.position.y = leadY;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={new THREE.CylinderGeometry(radius, radius, 0.02, 80, 1, true)}
      >
        {children}
      </mesh>
      {/* Leading-edge cross-section ring showing material thickness */}
      <mesh ref={capRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[innerCapRadius, radius, 64]} />
        <meshStandardMaterial color={endCapColor} metalness={0.25} roughness={0.75} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────
   VAPOR BARRIER TAPE - arc-sweep wrap
   Tape really wraps around, so we keep the theta sweep here.
───────────────────────────────────────────────────────── */
function VaporTape({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const capRef  = useRef<THREE.Mesh>(null);
  const L = PIPE_LENGTH * 0.93;

  useFrame(() => {
    const p = THREE.MathUtils.clamp(progress, 0, 1);
    if (!meshRef.current) return;
    meshRef.current.visible = p > 0.005;

    const tgt  = Math.PI * 2 * p;
    const geom = meshRef.current.geometry as THREE.CylinderGeometry;
    if (Math.abs((geom.parameters.thetaLength ?? 0) - tgt) > 0.004) {
      geom.dispose();
      meshRef.current.geometry = new THREE.CylinderGeometry(
        R_VAPOR, R_VAPOR, L, 80, 1, true, -Math.PI / 2, Math.max(tgt, 0.002),
      );
    }

    if (capRef.current) {
      capRef.current.visible = p > 0.04;
      const rg = capRef.current.geometry as THREE.RingGeometry;
      if (Math.abs((rg.parameters.thetaLength ?? 0) - tgt) > 0.004) {
        rg.dispose();
        capRef.current.geometry = new THREE.RingGeometry(
          R_INSULATION, R_VAPOR, 64, 1, -Math.PI / 2, Math.max(tgt, 0.002),
        );
      }
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        castShadow
        geometry={new THREE.CylinderGeometry(R_VAPOR, R_VAPOR, L, 80, 1, true, -Math.PI / 2, 0.002)}
      >
        <meshPhysicalMaterial
          color="#9AC0E8"
          metalness={0.92}
          roughness={0.14}
          clearcoat={0.95}
          clearcoatRoughness={0.04}
          envMapIntensity={2.2}
          iridescence={0.55}
          iridescenceIOR={1.45}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        ref={capRef}
        position={[0, L / 2 + 0.001, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        geometry={new THREE.RingGeometry(R_INSULATION, R_VAPOR, 64, 1, -Math.PI / 2, 0.002)}
      >
        <meshStandardMaterial color="#3B5A8C" metalness={0.5} roughness={0.55} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────
   BORE FLOW - pressurised chilled air / fluid streaming through
   the hollow pipe bore. Three layered particle systems:
     coreRef  - 160 tiny fast white streaks (laminar core flow)
     mistRef  - 60 larger cool-blue mist puffs (condensation haze)
     plumeRef - 50 particles that EXIT from the open pipe end
                and expand visibly outward as a cold-air plume
   All systems fade out as NBR insulation slides over.
───────────────────────────────────────────────────────── */
function BoreFlow({ insulProgress }: { insulProgress: number }) {
  const N_CORE  = 160;
  const N_MIST  = 60;
  const N_PLUME = 50;

  const coreRef  = useRef<THREE.Points>(null);
  const mistRef  = useRef<THREE.Points>(null);
  const plumeRef = useRef<THREE.Points>(null);

  const { core, mist, plume } = useMemo(() => {
    /* Core laminar streaks */
    const corePos    = new Float32Array(N_CORE * 3);
    const coreSpeeds = new Float32Array(N_CORE);
    for (let i = 0; i < N_CORE; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r     = Math.random() * R_PIPE_INNER * 0.68;
      corePos[i * 3]     = Math.cos(angle) * r;
      corePos[i * 3 + 1] = (Math.random() - 0.5) * PIPE_LENGTH;
      corePos[i * 3 + 2] = Math.sin(angle) * r;
      coreSpeeds[i]      = 1.8 + Math.random() * 2.8;
    }
    /* Mist haze - slower, wider spread */
    const mistPos    = new Float32Array(N_MIST * 3);
    const mistSpeeds = new Float32Array(N_MIST);
    for (let i = 0; i < N_MIST; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r     = Math.random() * R_PIPE_INNER * 0.88;
      mistPos[i * 3]     = Math.cos(angle) * r;
      mistPos[i * 3 + 1] = (Math.random() - 0.5) * PIPE_LENGTH;
      mistPos[i * 3 + 2] = Math.sin(angle) * r;
      mistSpeeds[i]      = 0.5 + Math.random() * 0.9;
    }
    /* Exit plume - particles that leave the positive-Y pipe end */
    const plumePos  = new Float32Array(N_PLUME * 3);
    const plumeVels = new Float32Array(N_PLUME * 3);
    const plumeAges = new Float32Array(N_PLUME);
    for (let i = 0; i < N_PLUME; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r     = Math.random() * R_PIPE_INNER * 0.55;
      plumePos[i * 3]     = Math.cos(angle) * r;
      plumePos[i * 3 + 1] = PIPE_LENGTH * 0.5 - Math.random() * 0.25;
      plumePos[i * 3 + 2] = Math.sin(angle) * r;
      const vAngle = Math.random() * Math.PI * 2;
      const vR     = 0.18 + Math.random() * 0.32;
      plumeVels[i * 3]     = Math.cos(vAngle) * vR;
      plumeVels[i * 3 + 1] = 1.4 + Math.random() * 1.6;  /* along pipe axis */
      plumeVels[i * 3 + 2] = Math.sin(vAngle) * vR;
      plumeAges[i]         = Math.random();
    }
    return {
      core:  { pos: corePos,  speeds: coreSpeeds },
      mist:  { pos: mistPos,  speeds: mistSpeeds },
      plume: { pos: plumePos, vels: plumeVels, ages: plumeAges },
    };
  }, []);

  useFrame((_, dt) => {
    const fade = Math.max(0, 1 - insulProgress * 3.0);

    /* Core streaks */
    if (coreRef.current) {
      (coreRef.current.material as THREE.PointsMaterial).opacity = fade * 0.90;
      const pos = coreRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < N_CORE; i++) {
        pos[i * 3 + 1] += core.speeds[i] * dt;
        if (pos[i * 3 + 1] > PIPE_LENGTH / 2) pos[i * 3 + 1] = -PIPE_LENGTH / 2;
      }
      coreRef.current.geometry.attributes.position.needsUpdate = true;
    }

    /* Mist haze */
    if (mistRef.current) {
      (mistRef.current.material as THREE.PointsMaterial).opacity = fade * 0.40;
      const pos = mistRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < N_MIST; i++) {
        pos[i * 3 + 1] += mist.speeds[i] * dt;
        if (pos[i * 3 + 1] > PIPE_LENGTH / 2) pos[i * 3 + 1] = -PIPE_LENGTH / 2;
      }
      mistRef.current.geometry.attributes.position.needsUpdate = true;
    }

    /* Exit plume */
    if (plumeRef.current) {
      (plumeRef.current.material as THREE.PointsMaterial).opacity = fade * 0.65;
      const pos = plumeRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < N_PLUME; i++) {
        plume.ages[i] += dt * 0.85;
        pos[i * 3]     += plume.vels[i * 3]     * dt;
        pos[i * 3 + 1] += plume.vels[i * 3 + 1] * dt;
        pos[i * 3 + 2] += plume.vels[i * 3 + 2] * dt;
        /* Recycle particle when aged out or drifted far beyond end */
        if (plume.ages[i] > 1.0 || pos[i * 3 + 1] > PIPE_LENGTH * 0.82) {
          const a = Math.random() * Math.PI * 2;
          const r = Math.random() * R_PIPE_INNER * 0.55;
          pos[i * 3]     = Math.cos(a) * r;
          pos[i * 3 + 1] = PIPE_LENGTH * 0.5 - Math.random() * 0.2;
          pos[i * 3 + 2] = Math.sin(a) * r;
          const va = Math.random() * Math.PI * 2;
          const vr = 0.18 + Math.random() * 0.32;
          plume.vels[i * 3]     = Math.cos(va) * vr;
          plume.vels[i * 3 + 1] = 1.4 + Math.random() * 1.6;
          plume.vels[i * 3 + 2] = Math.sin(va) * vr;
          plume.ages[i]         = 0;
        }
      }
      plumeRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Fast laminar core - bright white streaks */}
      <points ref={coreRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[core.pos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#E8F4FF"
          size={0.016}
          sizeAttenuation
          transparent
          opacity={0.90}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* Mist haze - larger cool-blue puffs */}
      <points ref={mistRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[mist.pos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#A8D0F0"
          size={0.058}
          sizeAttenuation
          transparent
          opacity={0.40}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* Exit plume - visible cloud emerging from pipe end */}
      <points ref={plumeRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[plume.pos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#C8E4FF"
          size={0.078}
          sizeAttenuation
          transparent
          opacity={0.65}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────
   ALUMINUM CORRUGATION RINGS
   Each ring becomes visible as the cladding leading edge passes it.
───────────────────────────────────────────────────────── */
function AlumRings({ progress }: { progress: number }) {
  const CLAD_L   = PIPE_LENGTH * 0.9;
  const COUNT    = 20;
  const groupRef = useRef<THREE.Group>(null);

  const ringYs = useMemo(
    () => Array.from({ length: COUNT }, (_, i) => -CLAD_L / 2 + (i + 0.5) * (CLAD_L / COUNT)),
    [],
  );

  useFrame(() => {
    if (!groupRef.current) return;
    const p            = THREE.MathUtils.clamp(progress, 0, 1);
    const claddingEdge = -CLAD_L / 2 + p * CLAD_L;
    groupRef.current.children.forEach((child, i) => {
      child.visible = ringYs[i] < claddingEdge - 0.04;
    });
  });

  return (
    <group ref={groupRef}>
      {ringYs.map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[R_CLADDING + 0.015, 0.013, 10, 72]} />
          <meshPhysicalMaterial
            color="#F2F5F8"
            metalness={1}
            roughness={0.26}
            clearcoat={1}
            clearcoatRoughness={0.06}
            envMapIntensity={2.4}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────
   CANVAS TEXTURE HELPER
───────────────────────────────────────────────────────── */
function makeCanvasTexture(
  size: number,
  draw: (ctx: CanvasRenderingContext2D, s: number) => void,
  repeat: [number, number] = [1, 1],
): THREE.CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width = size; cv.height = size;
  const ctx = cv.getContext("2d")!;
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat[0], repeat[1]);
  tex.anisotropy = 16;
  tex.needsUpdate = true;
  return tex;
}

/* Brushed steel - 1024 px, high-contrast anisotropic scratches, barrel highlight, edge falloff */
function brushedSteelMaps() {
  const map = makeCanvasTexture(1024, (ctx, s) => {
    /* Base: cool-blue industrial steel gradient */
    const g = ctx.createLinearGradient(0, 0, 0, s);
    g.addColorStop(0,    "#cdd5df");
    g.addColorStop(0.3,  "#c0c8d2");
    g.addColorStop(0.6,  "#b5bdc8");
    g.addColorStop(1,    "#aab2bc");
    ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
    /* Ultra-fine horizontal scratch lines (machine-brushed finish) */
    for (let i = 0; i < 7000; i++) {
      const v = 100 + Math.random() * 120 | 0;
      ctx.strokeStyle = `rgba(${v},${v + 4},${v + 9},${0.06 + Math.random() * 0.24})`;
      ctx.lineWidth = Math.random() * 0.45 + 0.08;
      const y   = Math.random() * s;
      const len = 60 + Math.random() * s;
      ctx.beginPath(); ctx.moveTo(Math.random() * (s - len), y); ctx.lineTo(s, y); ctx.stroke();
    }
    /* Heavy grinding gouges */
    for (let i = 0; i < 900; i++) {
      ctx.strokeStyle = `rgba(24,30,42,${0.06 + Math.random() * 0.18})`;
      ctx.lineWidth = 0.5 + Math.random() * 1.8;
      const y = Math.random() * s;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(s, y); ctx.stroke();
    }
    /* Barrel highlight - strong centre specular band */
    const hg = ctx.createLinearGradient(0, 0, s, 0);
    hg.addColorStop(0,    "rgba(255,255,255,0)");
    hg.addColorStop(0.40, "rgba(255,255,255,0.05)");
    hg.addColorStop(0.46, "rgba(255,255,255,0.28)");
    hg.addColorStop(0.50, "rgba(255,255,255,0.42)");
    hg.addColorStop(0.54, "rgba(255,255,255,0.28)");
    hg.addColorStop(0.60, "rgba(255,255,255,0.05)");
    hg.addColorStop(1,    "rgba(255,255,255,0)");
    ctx.fillStyle = hg; ctx.fillRect(0, 0, s, s);
    /* Edge darkening (cylinder limb falloff) */
    const el = ctx.createLinearGradient(0, 0, s * 0.18, 0);
    el.addColorStop(0, "rgba(12,16,24,0.60)");
    el.addColorStop(1, "rgba(12,16,24,0)");
    ctx.fillStyle = el; ctx.fillRect(0, 0, s, s);
    const er = ctx.createLinearGradient(s * 0.82, 0, s, 0);
    er.addColorStop(0, "rgba(12,16,24,0)");
    er.addColorStop(1, "rgba(12,16,24,0.60)");
    ctx.fillStyle = er; ctx.fillRect(0, 0, s, s);
    /* Subtle oxidation / mill-scale spots */
    for (let i = 0; i < 12; i++) {
      const x = Math.random() * s, y = Math.random() * s, r = 2 + Math.random() * 7;
      const og = ctx.createRadialGradient(x, y, 0, x, y, r);
      og.addColorStop(0, "rgba(130,72,34,0.22)");
      og.addColorStop(1, "rgba(130,72,34,0)");
      ctx.fillStyle = og;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
  }, [4, 1]);

  /* Roughness map: horizontal smear noise - scratch peaks reflect (dark=smooth), base is medium */
  const roughnessMap = makeCanvasTexture(512, (ctx, s) => {
    ctx.fillStyle = "#1c2230"; ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 5000; i++) {
      const v = Math.random() * 255 | 0;
      ctx.fillStyle = `rgba(${v},${v},${v},${0.04 + Math.random() * 0.52})`;
      ctx.fillRect(Math.random() * s, Math.random() * s, 2 + Math.random() * 9, 1);
    }
  }, [4, 1]);

  return { map, roughnessMap };
}

/* Closed-cell NBR foam - matte jet-black rubber with cell pores + slit seam */
function nbrFoamMaps() {
  const map = makeCanvasTexture(512, (ctx, s) => {
    ctx.fillStyle = "#0b0b0b"; ctx.fillRect(0, 0, s, s);
    /* Closed cells - slight radial shading */
    for (let i = 0; i < 2200; i++) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = 1.2 + Math.random() * 3.5;
      const v = 18 + Math.random() * 30 | 0;
      const rg = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, 0, x, y, r);
      rg.addColorStop(0, `rgb(${v + 18},${v + 18},${v + 18})`);
      rg.addColorStop(1, `rgb(${v},${v},${v})`);
      ctx.fillStyle = rg;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    /* Cell walls / micro-pores */
    for (let i = 0; i < 5000; i++) {
      ctx.fillStyle = `rgba(0,0,0,${0.35 + Math.random() * 0.45})`;
      ctx.beginPath();
      ctx.arc(Math.random() * s, Math.random() * s, 0.4 + Math.random() * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
    /* Pre-slit seam line (tube was slit lengthwise for installation) */
    ctx.strokeStyle = "rgba(0,0,0,0.95)";
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(s * 0.5, 0); ctx.lineTo(s * 0.5, s); ctx.stroke();
    ctx.strokeStyle = "rgba(25,25,25,0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(s * 0.5 + 2, 0); ctx.lineTo(s * 0.5 + 2, s); ctx.stroke();
  }, [5, 2]);

  const normalMap = makeCanvasTexture(512, (ctx, s) => {
    ctx.fillStyle = "#8080ff"; ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 2800; i++) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = 1 + Math.random() * 4.5;
      const rg = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
      rg.addColorStop(0, "#a0a0ff");
      rg.addColorStop(0.7, "#8080ff");
      rg.addColorStop(1, "#5858ff");
      ctx.fillStyle = rg;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
  }, [5, 2]);

  return { map, normalMap };
}

/* Stucco-embossed aluminium - 1024 px, deeper emboss, roughnessMap, barrel highlight, groove darkening */
function stuccoAlumMaps() {
  const STEP = 18;

  const map = makeCanvasTexture(1024, (ctx, s) => {
    /* Base: bright polished aluminium with subtle vertical gradient */
    const g = ctx.createLinearGradient(0, 0, 0, s);
    g.addColorStop(0,   "#eff3f7");
    g.addColorStop(0.4, "#f7f9fb");
    g.addColorStop(0.7, "#edf0f4");
    g.addColorStop(1,   "#e5e9ed");
    ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
    /* Very fine horizontal extrusion grain lines */
    for (let i = 0; i < 4000; i++) {
      const v = 180 + Math.random() * 60 | 0;
      ctx.strokeStyle = `rgba(${v},${v},${v},${0.04 + Math.random() * 0.08})`;
      ctx.lineWidth = 0.5;
      const y = Math.random() * s;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(s, y); ctx.stroke();
    }
    /* Stucco bumps - offset diamond grid */
    for (let row = -1; row * STEP < s + STEP * 2; row++) {
      for (let col = -1; col * STEP < s + STEP * 2; col++) {
        const ox = (row & 1) ? STEP * 0.5 : 0;
        const cx = col * STEP + ox, cy = row * STEP;
        ctx.save(); ctx.translate(cx, cy); ctx.scale(1, 0.82);
        /* Top-left specular highlight (strong) */
        const rh = ctx.createRadialGradient(-3.5, -3.5, 0, 0, 0, 9);
        rh.addColorStop(0,   "rgba(255,255,255,0.98)");
        rh.addColorStop(0.25,"rgba(250,252,255,0.72)");
        rh.addColorStop(0.6, "rgba(230,235,240,0.25)");
        rh.addColorStop(1,   "rgba(210,216,222,0.00)");
        ctx.fillStyle = rh;
        ctx.beginPath(); ctx.arc(0, 0, 9, 0, Math.PI * 2); ctx.fill();
        /* Bottom-right shadow (deep) */
        const rs = ctx.createRadialGradient(4.5, 4.5, 0, 3, 3, 9);
        rs.addColorStop(0,   "rgba(55,65,78,0.72)");
        rs.addColorStop(0.45,"rgba(55,65,78,0.30)");
        rs.addColorStop(1,   "rgba(55,65,78,0.00)");
        ctx.fillStyle = rs;
        ctx.beginPath(); ctx.arc(3, 3, 9, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
    }
    /* Groove network - thin dark lines between bumps */
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = "#3a4250";
    ctx.lineWidth = 0.8;
    for (let row = -1; row * STEP < s + STEP * 2; row++) {
      const ox = (row & 1) ? STEP * 0.5 : 0;
      ctx.beginPath(); ctx.moveTo(ox, row * STEP + STEP * 0.5); ctx.lineTo(s + ox, row * STEP + STEP * 0.5); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    /* Barrel highlight strip */
    const hg = ctx.createLinearGradient(0, 0, s, 0);
    hg.addColorStop(0,    "rgba(255,255,255,0)");
    hg.addColorStop(0.43, "rgba(255,255,255,0.10)");
    hg.addColorStop(0.50, "rgba(255,255,255,0.22)");
    hg.addColorStop(0.57, "rgba(255,255,255,0.10)");
    hg.addColorStop(1,    "rgba(255,255,255,0)");
    ctx.fillStyle = hg; ctx.fillRect(0, 0, s, s);
    /* Edge limb-darkening */
    const el = ctx.createLinearGradient(0, 0, s * 0.16, 0);
    el.addColorStop(0, "rgba(20,25,32,0.45)"); el.addColorStop(1, "rgba(20,25,32,0)");
    ctx.fillStyle = el; ctx.fillRect(0, 0, s, s);
    const er = ctx.createLinearGradient(s * 0.84, 0, s, 0);
    er.addColorStop(0, "rgba(20,25,32,0)"); er.addColorStop(1, "rgba(20,25,32,0.45)");
    ctx.fillStyle = er; ctx.fillRect(0, 0, s, s);
  }, [8, 3]);

  /* Normal map - strong emboss vectors for deep stucco relief */
  const normalMap = makeCanvasTexture(1024, (ctx, s) => {
    ctx.fillStyle = "#8080ff"; ctx.fillRect(0, 0, s, s);
    for (let row = -1; row * STEP < s + STEP * 2; row++) {
      for (let col = -1; col * STEP < s + STEP * 2; col++) {
        const ox = (row & 1) ? STEP * 0.5 : 0;
        const cx = col * STEP + ox, cy = row * STEP;
        ctx.save(); ctx.translate(cx, cy); ctx.scale(1, 0.82);
        const rg = ctx.createRadialGradient(-2.5, -2.5, 0, 0, 0, 10);
        rg.addColorStop(0,   "#d8d8ff");  /* upper-left facing normal */
        rg.addColorStop(0.4, "#b0b0ff");  /* tilted face */
        rg.addColorStop(0.75,"#8080ff");  /* flat */
        rg.addColorStop(1,   "#3e3ebb");  /* lower-right shadow side */
        ctx.fillStyle = rg;
        ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
    }
  }, [8, 3]);

  /* Roughness map - bump peaks = low roughness (shiny), grooves = high roughness (matte) */
  const roughnessMap = makeCanvasTexture(512, (ctx, s) => {
    ctx.fillStyle = "#999999"; ctx.fillRect(0, 0, s, s); /* medium base roughness */
    const step = STEP / 2; /* scaled to 512 */
    for (let row = -1; row * step < s + step * 2; row++) {
      for (let col = -1; col * step < s + step * 2; col++) {
        const ox = (row & 1) ? step * 0.5 : 0;
        const cx = col * step + ox, cy = row * step;
        const rg = ctx.createRadialGradient(0 + cx, 0 + cy, 0, cx, cy, step * 0.55);
        rg.addColorStop(0,   "rgba(55,55,55,1)");   /* peak → smooth (dark = low roughness) */
        rg.addColorStop(0.55,"rgba(130,130,130,1)");
        rg.addColorStop(1,   "rgba(215,215,215,1)"); /* groove → matte (light = high roughness) */
        ctx.fillStyle = rg;
        ctx.beginPath(); ctx.arc(cx, cy, step * 0.55, 0, Math.PI * 2); ctx.fill();
      }
    }
  }, [8, 3]);

  return { map, normalMap, roughnessMap };
}

/* ─────────────────────────────────────────────────────────
   PIPE ASSEMBLY
───────────────────────────────────────────────────────── */
type SceneProps = { progressRef: React.MutableRefObject<number>; variant?: PipeLayerVariant };

function PipeAssembly({ progressRef, variant = "full" }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [layerProgs, setLayerProgs] = useState({ ins: 0, vap: 0, clad: 0 });
  const isNbr = variant === "nbr";

  const steelTex = useMemo(() => brushedSteelMaps(), []);
  const foamTex  = useMemo(() => nbrFoamMaps(),      []);
  const alumTex  = useMemo(() => stuccoAlumMaps(),   []);

  useFrame((state, dt) => {
    const p = progressRef.current;
    if (!groupRef.current) return;

    const ease   = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x));
    // NBR variant: only the NBR sleeve animates - slide it across the
    // middle third of scroll progress, then hold full coverage.
    const insulP = isNbr
      ? ease((p - 0.18) / 0.42)
      : ease((p - 0.16) / 0.30);
    const vaporP = isNbr ? 0 : ease((p - 0.46) / 0.22);
    const claddP = isNbr ? 0 : ease((p - 0.68) / 0.30);

    setLayerProgs((prev) => {
      if (
        Math.abs(prev.ins - insulP) < 0.003 &&
        Math.abs(prev.vap - vaporP) < 0.003 &&
        Math.abs(prev.clad - claddP) < 0.003
      ) return prev;
      return { ins: insulP, vap: vaporP, clad: claddP };
    });

    const t         = state.clock.elapsedTime;
    // Slightly gentler camera-relative spin on the NBR-only walkthrough
    // so the closed-cell foam texture stays readable on screen.
    const targetRotY = isNbr ? (-0.15 + p * 0.55) : (-0.2 + p * 0.9);
    const targetRotX = -0.22 - Math.sin(t * 0.45) * 0.018;

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 2.2, dt);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 2.0, dt);
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y, Math.sin(t * 0.5) * 0.045, 3.0, dt,
    );
  });

  return (
    <group rotation={[0, 0, Math.PI / 2]} position={[-1.5, 0, 0]}>
      <group ref={groupRef} rotation={[-0.22, -0.2, 0]} scale={0.62}>

        {/* ── Steel pipe shell ── */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[R_PIPE_OUTER, R_PIPE_OUTER, PIPE_LENGTH, 96, 1, false]} />
          <meshPhysicalMaterial
            color="#C2CCD6"
            map={steelTex.map}
            roughnessMap={steelTex.roughnessMap}
            metalness={1}
            roughness={0.22}
            clearcoat={0.98}
            clearcoatRoughness={0.05}
            envMapIntensity={3.5}
            anisotropy={1.0}
            anisotropyRotation={Math.PI / 2}
          />
        </mesh>

        {/* ── Bore interior ── */}
        <mesh>
          <cylinderGeometry args={[R_PIPE_INNER, R_PIPE_INNER, PIPE_LENGTH + 0.02, 64, 1, true]} />
          <meshStandardMaterial color="#050507" metalness={0.2} roughness={1.0} side={THREE.BackSide} />
        </mesh>

        {/* ── End-cap annular rings (both ends) ── */}
        {([-1, 1] as const).map((side, idx) => (
          <mesh key={idx} position={[0, side * (PIPE_LENGTH / 2), 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[R_PIPE_INNER, R_PIPE_OUTER, 64]} />
            <meshPhysicalMaterial color="#38404E" metalness={1} roughness={0.36} side={THREE.DoubleSide} />
          </mesh>
        ))}

        {/* ── Weld bead bands ── */}
        {[-1.4, 0, 1.4].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[R_PIPE_OUTER + 0.007, 0.009, 8, 72]} />
            <meshPhysicalMaterial color="#8A929F" metalness={1} roughness={0.46} />
          </mesh>
        ))}

        {/* ── Air / fluid bore flow (visible before insulation) ── */}
        <BoreFlow insulProgress={layerProgs.ins} />

        {/* ── NBR insulation - slides on from left ── */}
        <SlidingLayer
          radius={R_INSULATION}
          innerCapRadius={R_PIPE_OUTER}
          length={PIPE_LENGTH * 0.96}
          progress={layerProgs.ins}
          endCapColor="#181818"
        >
          <meshPhysicalMaterial
            color="#111111"
            map={foamTex.map}
            normalMap={foamTex.normalMap}
            normalScale={new THREE.Vector2(0.55, 0.55)}
            metalness={0}
            roughness={0.97}
            sheen={0.75}
            sheenColor="#1e1e1e"
            sheenRoughness={0.75}
            clearcoat={0.04}
            envMapIntensity={0.35}
            side={THREE.DoubleSide}
          />
        </SlidingLayer>

        {/* ── Vapor barrier tape (full variant only) ── */}
        {!isNbr && <VaporTape progress={layerProgs.vap} />}

        {/* ── Aluminum cladding (full variant only) ── */}
        {!isNbr && (
          <SlidingLayer
            radius={R_CLADDING}
            innerCapRadius={R_VAPOR}
            length={PIPE_LENGTH * 0.9}
            progress={layerProgs.clad}
            endCapColor="#8C9298"
          >
            <meshPhysicalMaterial
              color="#EDF1F6"
              map={alumTex.map}
              normalMap={alumTex.normalMap}
              normalScale={new THREE.Vector2(1.85, 1.85)}
              roughnessMap={alumTex.roughnessMap}
              metalness={1}
              roughness={0.26}
              clearcoat={0.98}
              clearcoatRoughness={0.06}
              envMapIntensity={3.4}
              side={THREE.DoubleSide}
            />
          </SlidingLayer>
        )}

        {/* ── Aluminum corrugation rings (full variant only) ── */}
        {!isNbr && <AlumRings progress={layerProgs.clad} />}

      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────
   PARTICLES
───────────────────────────────────────────────────────── */
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const N = 220;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f97316" size={0.04} sizeAttenuation transparent opacity={0.45} depthWrite={false} />
    </points>
  );
}

/* ─────────────────────────────────────────────────────────
   CAMERA RIG
───────────────────────────────────────────────────────── */
function CameraRig({ progressRef, variant = "full" }: SceneProps) {
  const { camera } = useThree();
  useFrame((s, dt) => {
    const p = progressRef.current;
    let tx: number, ty: number, tz: number;
    if (variant === "nbr") {
      // Match the proven full-variant framing so the pipe is always
      // properly centred; only a hair tighter on the final “sealed” step.
      tx = THREE.MathUtils.lerp(2.6, 3.1, p);
      ty = THREE.MathUtils.lerp(0.4, 0.65, p) + Math.sin(s.clock.elapsedTime * 0.4) * 0.022;
      tz = THREE.MathUtils.lerp(5.2, 5.8, p);
    } else {
      tx = THREE.MathUtils.lerp(2.6, 3.4, p);
      ty = THREE.MathUtils.lerp(0.4, 0.8, p) + Math.sin(s.clock.elapsedTime * 0.4) * 0.025;
      tz = THREE.MathUtils.lerp(5.2, 6.2, p);
    }
    camera.position.x = THREE.MathUtils.damp(camera.position.x, tx, 1.6, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, ty, 1.6, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, tz, 1.6, dt);
    camera.lookAt(0.4, 0, 0);
  });
  return null;
}

/* ─────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────── */
export default function PipeLayerSection({ variant = "full", productSlug }: { variant?: PipeLayerVariant; productSlug?: string } = {}) {
  const layers      = variant === "nbr" ? buildNbrLayers(productSlug) : LAYERS;
  const stepCount   = layers.length;
  // 3-step NBR walkthrough needs less scroll runway than the 4-step
  // full walkthrough.
  const sectionHeightVh = variant === "nbr" ? 380 : 500;

  const sectionRef     = useRef<HTMLDivElement>(null);
  const stickyRef      = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const progressRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Compute step thresholds inside the effect so its dependency list
    // only contains primitive `stepCount` - otherwise the array literal
    // would change identity every render and continuously kill / recreate
    // the ScrollTrigger, which leaves the R3F scene in a stale state and
    // can present as a blank canvas.
    const thresholds = Array.from({ length: stepCount - 1 }, (_, i) => (i + 1) / stepCount);

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start:   "top top",
      end:     "bottom bottom",
      scrub:   1,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${self.progress * 100}%`;
        }
        if (self.progress > 0.01) setScrolled(true);
        let step = 0;
        for (let i = 0; i < thresholds.length; i++) {
          if (self.progress > thresholds[i]) step = i + 1;
        }
        setActiveStep((prev) => (prev === step ? prev : step));
      },
    });

    return () => { st.kill(); };
  }, [stepCount]);

  return (
    <section
      ref={sectionRef}
      style={{ height: `${sectionHeightVh}vh` }}
      aria-label="Insulation layer system - 3D visualisation"
    >
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden" style={{ background: "#0a0806" }}>
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 grid-bg opacity-[0.07]" />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 60% 55% at 65% 50%, ${layers[activeStep].accent}22 0%, transparent 60%)`,
              filter: "blur(40px)",
              transition: "background 1.2s ease",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 20% 100%, rgba(249,115,22,0.10) 0%, transparent 55%)",
              filter: "blur(40px)",
            }}
          />
          <div className="noise" style={{ opacity: 0.06 }} />
        </div>

        {/* 3D Canvas — full-screen only for the full variant */}
        {variant !== "nbr" && (
        <div
          className="absolute inset-0 pl-canvas-wrap"
          style={{
            background: "radial-gradient(ellipse 70% 55% at 50% 55%, #130f0a 0%, #0a0806 55%, #060504 100%)",
          }}
        >
          <Canvas
            shadows="soft"
            dpr={[1, 1.5]}
            camera={{ position: [2.4, 0.35, 5.0], fov: 28 }}
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: false }}
            style={{ background: "#080604" }}
            onCreated={({ gl }) => {
              const canvas = gl.domElement;
              const handleLost = (e: Event) => {
                e.preventDefault();
              };
              const handleRestored = () => {
                gl.setClearColor("#080604", 0);
              };
              canvas.addEventListener("webglcontextlost", handleLost, false);
              canvas.addEventListener("webglcontextrestored", handleRestored, false);
              gl.setClearColor("#080604", 0);
            }}
          >
            <color attach="background" args={["#080604"]} />
            <fog attach="fog" args={["#080604", 7, 16]} />

            <ambientLight intensity={0.22} />
            <directionalLight
              position={[7, 8, 6]}
              intensity={2.2}
              color="#fff2e0"
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={30}
              shadow-camera-left={-8}
              shadow-camera-right={8}
              shadow-camera-top={8}
              shadow-camera-bottom={-8}
            />
            {/* Cool fill from rear-left */}
            <directionalLight position={[-7, 3, -5]} intensity={1.4} color="#5FA0F0" />
            {/* Warm under-glow */}
            <directionalLight position={[0, -4, 4]} intensity={0.6} color="#f97316" />
            {/* Rim light from right */}
            <directionalLight position={[6, 1, -4]} intensity={1.1} color="#FFB76A" />
            <pointLight position={[2, 2, 4]} intensity={2.6} color="#FFB76A" distance={14} />
            <pointLight position={[-3, -1, -2]} intensity={1.0} color="#f97316" distance={12} />
            <pointLight position={[0, 3, 2]} intensity={1.4} color="#ffffff" distance={10} />

            <Environment preset="studio" />

            <PipeAssembly progressRef={progressRef} variant={variant} />            <Particles />

            <ContactShadows
              position={[0, -1.45, 0]}
              opacity={0.55}
              scale={9}
              blur={2.6}
              far={3}
              color="#000"
            />

            <CameraRig progressRef={progressRef} variant={variant} />
          </Canvas>
        </div>
        )}

        {/* Right vignette - only for full variant with 3D */}
        {variant !== "nbr" && (
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-[60%] pointer-events-none"
          style={{
            background:
              "linear-gradient(270deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.78) 35%, rgba(0,0,0,0.30) 70%, rgba(0,0,0,0) 100%)",
            zIndex: 2,
          }}
        />
        )}

        {/* Foreground UI */}
        <div
          className="relative h-full container-wide flex flex-col py-6 md:py-8"
          style={{ zIndex: 5, pointerEvents: "auto" }}
        >

          {/* MIDDLE */}
          {variant === "nbr" ? (
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center flex-1 min-h-0">
              {/* LEFT — scroll-synced product description */}
              <div className="max-w-xl">
                <div
                  className="inline-flex items-center gap-2 mb-5 text-[10px] font-bold tracking-[0.24em] uppercase px-3.5 py-1.5 rounded-full backdrop-blur-sm"
                  style={{
                    color: layers[activeStep].accent,
                    background: `${layers[activeStep].accent}1a`,
                    border: `1px solid ${layers[activeStep].accent}40`,
                    transition: "color 0.5s ease, background 0.5s ease, border-color 0.5s ease",
                  }}
                >
                  <Sparkles size={11} /> {layers[activeStep].sublabel}
                </div>
                <h2
                  className="text-white leading-[1.02] mb-5"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.7rem, 3.2vw, 2.85rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
                >
                  {layers[activeStep].label}
                </h2>
                <p className="text-white/60 leading-relaxed mb-7 text-[14px] md:text-[15px]">
                  {layers[activeStep].description}
                </p>
                {layers[activeStep].keyMetric && (
                  <div className="flex items-baseline gap-3 mb-6">
                    <span
                      className="font-bold"
                      style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.9rem, 3.6vw, 2.75rem)", color: layers[activeStep].accent, letterSpacing: "-0.03em", lineHeight: 1 }}
                    >
                      {layers[activeStep].keyMetric!.value}
                      <span className="text-white/50 text-base ml-1">{layers[activeStep].keyMetric!.unit}</span>
                    </span>
                    <span className="text-white/45 text-[11px] max-w-[190px] leading-snug">
                      {layers[activeStep].keyMetric!.label}
                    </span>
                  </div>
                )}
                <ul className="space-y-2.5">
                  {layers[activeStep].highlights?.slice(0, 3).map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-white/70 text-[13px] leading-snug">
                      <CheckCircle2 size={14} style={{ color: layers[activeStep].accent }} className="mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* RIGHT — compact 3D render container */}
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-6 rounded-[2.5rem] blur-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 60% 40%, ${layers[activeStep].accent}22, transparent 70%)`, transition: "background 1.2s ease" }}
                />
                <div className="relative w-full h-[46vh] lg:h-[64vh] max-h-[640px] rounded-3xl border border-white/10 overflow-hidden bg-[#0a0806] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
                  <NbrDualRender progressRef={progressRef} productSlug={productSlug} />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1" />
          )}

          {/* BOTTOM - progress rail */}
          <footer className="pt-6">
            <div
              className="grid gap-3 mb-3"
              style={{ gridTemplateColumns: `repeat(${stepCount}, minmax(0, 1fr))` }}
            >
              {layers.map((layer, i) => {
                const isActive = i === activeStep;
                const isPast   = i < activeStep;
                return (
                  <div
                    key={layer.id}
                    className="flex flex-col gap-2"
                    style={{ opacity: isActive ? 1 : isPast ? 0.7 : 0.35, transition: "opacity 0.5s ease" }}
                  >
                    <div
                      style={{
                        height: 2,
                        background: "rgba(255,255,255,0.10)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `linear-gradient(90deg, ${layer.accent}, ${layer.accent}aa)`,
                          transform: `scaleX(${isPast || isActive ? 1 : 0})`,
                          transformOrigin: "left",
                          transition: "transform 0.7s cubic-bezier(0.65,0,0.35,1)",
                          boxShadow: isActive ? `0 0 12px ${layer.accent}` : "none",
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        style={{
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          letterSpacing: "0.22em",
                          color: isActive ? layer.accent : "rgba(255,255,255,0.5)",
                          textTransform: "uppercase",
                          transition: "color 0.5s ease",
                        }}
                      >
                        {layer.id === "pipe" ? "Uninsulated" :
                         layer.id === "insulation" ? "Insulation" :
                         layer.id === "vapor" ? "Vapor Barrier" : "Cladding"}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "rgba(255,255,255,0.5)",
                        }}
                      >
                        0{i + 1}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative" style={{ height: 1, background: "rgba(255,255,255,0.06)" }}>
              <div
                ref={progressBarRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: 0,
                  background: "linear-gradient(90deg, #f97316, #fdba74, #f97316)",
                  boxShadow: "0 0 14px rgba(249,115,22,0.7)",
                  transition: "width 0.05s linear",
                }}
              />
            </div>
          </footer>

          {/* Scroll hint */}
          <div
            className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            style={{
              opacity: scrolled ? 0 : 1,
              transition: "opacity 0.6s ease",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            <span
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
              }}
            >
              Scroll to assemble
            </span>
            <span
              style={{
                width: 1, height: 32,
                background: "linear-gradient(180deg, rgba(255,255,255,0.6), transparent)",
                animation: "scrollHintLine 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
