"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   LAYER DATA
───────────────────────────────────────────────────────── */
const LAYERS = [
  {
    id: "pipe",
    sublabel: "Step 01  ·  Service Pipe",
    label: "Steel / Copper Service Pipe",
    description:
      "The base service pipe — carbon steel, stainless steel, or copper — carrying chilled water, HVAC refrigerant, domestic cold water, or industrial process fluids across the GCC's most demanding MEP networks.",
    specs: [
      "DN15 – DN400",
      "−40°C to +105°C service",
      "Carbon steel / Copper / SS304",
      "HVAC, district cooling & plumbing",
    ],
    accent: "#8DA0B6",
  },
  {
    id: "insulation",
    sublabel: "Step 02  ·  Gulf-O-Flex® NBR",
    label: "Gulf-O-Flex® NBR Insulation",
    description:
      "Premium closed-cell Nitrile Butadiene Rubber (NBR) elastomeric insulation — the regional benchmark for HVAC, district cooling, and plumbing. Zero water absorption, Class 1 fire rated, and built-in vapor barrier performance, manufactured in the UAE since 1993.",
    specs: [
      "λ ≤ 0.036 W/mK at 0°C",
      "−40°C to +105°C",
      "Water vapor resistance μ ≥ 7,300",
      "Class 1 / Class 0 (ASTM E84, BS 476)",
      "6 – 100 mm thickness · Tubes, Sheets, Rolls",
    ],
    accent: "#f97316",
  },
  {
    id: "vapor",
    sublabel: "Step 03  ·  Gulf-O-Flex® Aluglass",
    label: "Gulf-O-Flex® Aluglass Facing",
    description:
      "High-performance aluminum + glass-cloth + PE-film composite facing seals the insulation surface with a continuous vapor barrier and mechanical reinforcement — engineered for the heat and humidity of the Gulf climate.",
    specs: [
      "Alu + Glass Cloth + PE Film",
      "50 – 90 μm total thickness",
      "Perm rating < 0.02 perms",
      "Tensile (MD) ≥ 120 N/50 mm",
      "−20°C to +120°C service",
    ],
    accent: "#60A5FA",
  },
  {
    id: "cladding",
    sublabel: "Step 04  ·  Gulf-O-Flex® Aluclad",
    label: "Gulf-O-Flex® Aluclad Jacketing",
    description:
      "Industrial-grade aluminum jacketing in smooth or stucco-embossed profiles — delivering UV, weather, chemical, and mechanical protection for outdoor pipelines, offshore platforms, petrochemical plants, and rooftop plant rooms.",
    specs: [
      "Aluminium Alloy 1050 / 3003",
      "0.4 / 0.6 / 0.8 / 1.0 mm gauge",
      "Mill, Embossed or Painted finish",
      "−200°C to +500°C (clad)",
      "ISO 9001 · IMO FTP · NORSOK M-501",
    ],
    accent: "#E5E7EB",
  },
] as const;

/* NBR-focused walkthrough (used on the /products/nbr page).
   Only the bare service pipe and the NBR sleeve are shown in 3D —
   the third “sealed” step keeps the NBR fully installed and
   highlights the closed-cell vapor seal performance. */
const NBR_LAYERS = [
  {
    id: "pipe",
    sublabel: "Step 01  ·  Service Pipe",
    label: "Bare Service Pipe",
    description:
      "A chilled-water service pipe operating at +6°C in a +48°C ambient. Without insulation, the cold steel surface condenses humidity, drips on ceilings, corrodes the line, and bleeds cooling capacity into the air.",
    specs: [
      "DN15 – DN400",
      "+6°C chilled media",
      "+48°C ambient (GCC)",
      "Carbon steel / Copper / SS304",
      "Condensation risk: HIGH",
    ],
    accent: "#8DA0B6",
  },
  {
    id: "insulation",
    sublabel: "Step 02  ·  Gulf-O-Flex® NBR",
    label: "Closed-Cell NBR Insulation",
    description:
      "Pre-slit Gulf-O-Flex® NBR tube slides over the pipe. The flexible Nitrile Butadiene Rubber sleeve hugs the surface, sealing along the factory-cut seam with Gulf-O-Flex® adhesive — no mechanical fixings, no thermal bridges.",
    specs: [
      "λ ≤ 0.036 W/mK at 0°C",
      "−40°C to +105°C",
      "6 – 100 mm thickness",
      "Tubes · Sheets · Rolls",
      "Pre-slit · Self-adhesive option",
    ],
    accent: "#f97316",
  },
  {
    id: "sealed",
    sublabel: "Step 03  ·  Sealed System",
    label: "Vapor-Sealed & Fire-Safe",
    description:
      "The closed-cell structure is its own integral vapor barrier — no foil, no tape, no failure points. The system delivers Class 1 / Class 0 fire safety, zero condensation, and 30+ year service life across HVAC, district cooling and plumbing.",
    specs: [
      "Water vapor resistance μ ≥ 7,300",
      "Class 1 / Class 0 (ASTM E84, BS 476)",
      "Zero ODP · Low GWP",
      "FM Approved · UL Listed",
      "Service life 30+ years",
    ],
    accent: "#22d3a5",
  },
] as const;

export type PipeLayerVariant = "full" | "nbr";

/* Geometry constants — smaller, better framed */
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
   VAPOR BARRIER TAPE — arc-sweep wrap
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
   BORE FLOW — pressurised chilled air / fluid streaming through
   the hollow pipe bore. Three layered particle systems:
     coreRef  — 160 tiny fast white streaks (laminar core flow)
     mistRef  — 60 larger cool-blue mist puffs (condensation haze)
     plumeRef — 50 particles that EXIT from the open pipe end
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
    /* Mist haze — slower, wider spread */
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
    /* Exit plume — particles that leave the positive-Y pipe end */
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
      {/* Fast laminar core — bright white streaks */}
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
      {/* Mist haze — larger cool-blue puffs */}
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
      {/* Exit plume — visible cloud emerging from pipe end */}
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

/* Brushed steel — 1024 px, high-contrast anisotropic scratches, barrel highlight, edge falloff */
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
    /* Barrel highlight — strong centre specular band */
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

  /* Roughness map: horizontal smear noise — scratch peaks reflect (dark=smooth), base is medium */
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

/* Closed-cell NBR foam — matte jet-black rubber with cell pores + slit seam */
function nbrFoamMaps() {
  const map = makeCanvasTexture(512, (ctx, s) => {
    ctx.fillStyle = "#0b0b0b"; ctx.fillRect(0, 0, s, s);
    /* Closed cells — slight radial shading */
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

/* Stucco-embossed aluminium — 1024 px, deeper emboss, roughnessMap, barrel highlight, groove darkening */
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
    /* Stucco bumps — offset diamond grid */
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
    /* Groove network — thin dark lines between bumps */
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

  /* Normal map — strong emboss vectors for deep stucco relief */
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

  /* Roughness map — bump peaks = low roughness (shiny), grooves = high roughness (matte) */
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
    // NBR variant: only the NBR sleeve animates — slide it across the
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

        {/* ── NBR insulation — slides on from left ── */}
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
export default function PipeLayerSection({ variant = "full" }: { variant?: PipeLayerVariant } = {}) {
  const layers      = variant === "nbr" ? NBR_LAYERS : LAYERS;
  const stepCount   = layers.length;
  // 3-step NBR walkthrough needs less scroll runway than the 4-step
  // full walkthrough.
  const sectionHeightVh = variant === "nbr" ? 320 : 420;

  const sectionRef     = useRef<HTMLDivElement>(null);
  const stickyRef      = useRef<HTMLDivElement>(null);
  const textRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const progressRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const texts = textRefs.current;
    texts.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 60 });
    });

    // Compute step thresholds inside the effect so its dependency list
    // only contains primitive `stepCount` — otherwise the array literal
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

  useEffect(() => {
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: i === activeStep ? 1 : 0,
        y:       i === activeStep ? 0 : (i < activeStep ? -60 : 60),
        duration: 0.7,
        ease:    "power3.out",
      });
    });
  }, [activeStep]);

  return (
    <section
      ref={sectionRef}
      style={{ height: `${sectionHeightVh}vh` }}
      aria-label="Insulation layer system — 3D visualisation"
    >
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden bg-black">
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

        {/* 3D Canvas */}
        <div
          className="absolute inset-0 pl-canvas-wrap"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 55%, #111114 0%, #0a0a0c 55%, #050507 100%)",
          }}
        >
          <Canvas
            shadows="soft"
            dpr={[1, 2]}
            camera={{ position: [2.4, 0.35, 5.0], fov: 28 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: false }}
            style={{ background: "#070708" }}
            onCreated={({ gl }) => {
              const canvas = gl.domElement;
              const handleLost = (e: Event) => {
                e.preventDefault();
              };
              const handleRestored = () => {
                gl.setClearColor("#070708", 0);
              };
              canvas.addEventListener("webglcontextlost", handleLost, false);
              canvas.addEventListener("webglcontextrestored", handleRestored, false);
              gl.setClearColor("#070708", 0);
            }}
          >
            <color attach="background" args={["#070708"]} />
            <fog attach="fog" args={["#070708", 7, 16]} />

            <ambientLight intensity={0.22} />
            <directionalLight
              position={[7, 8, 6]}
              intensity={2.2}
              color="#fff2e0"
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
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
            <pointLight position={[-3, -1, -2]} intensity={1.0} color="#3B82F6" distance={12} />
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

        {/* Right vignette */}
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-[60%] pointer-events-none"
          style={{
            background:
              "linear-gradient(270deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.78) 35%, rgba(0,0,0,0.30) 70%, rgba(0,0,0,0) 100%)",
            zIndex: 2,
          }}
        />

        {/* Foreground UI */}
        <div className="relative h-full container-wide flex flex-col py-6 md:py-8" style={{ zIndex: 5 }}>
          {/* TOP */}
          <header className="flex items-start justify-between gap-6">
            <div>
              <div className="eyebrow mb-4">
                <span className="eyebrow-dot" />
                How It Works · Live 3D
              </div>
              <h2
                className="text-white"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.4rem, 2.4vw, 2.25rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  maxWidth: 560,
                }}
              >
                Layer by layer —{" "}
                <span className="orange-text">engineered protection.</span>
              </h2>
            </div>

            <div className="hidden md:flex flex-col items-end gap-2 pt-2">
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.34em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Step {String(activeStep + 1).padStart(2, "0")} / {String(stepCount).padStart(2, "0")}
              </span>
              <div
                className="font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.95rem",
                  color: layers[activeStep].accent,
                  letterSpacing: "-0.01em",
                  textShadow: `0 0 18px ${layers[activeStep].accent}55`,
                  transition: "color 0.5s ease",
                }}
              >
                {layers[activeStep].label.replace(/Gulf-O-Flex® /, "")}
              </div>
            </div>
          </header>

          {/* MIDDLE — text panels */}
          <div className="flex-1 grid lg:grid-cols-[1fr_minmax(0,500px)] items-center mt-4">
            <div />
            <div className="relative" style={{ minHeight: 280 }}>
              {layers.map((layer, i) => (
                <div
                  key={layer.id}
                  ref={(el) => { textRefs.current[i] = el; }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.45rem 0.85rem",
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${layer.accent}33`,
                        backdropFilter: "blur(10px)",
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      <span
                        style={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: layer.accent,
                          boxShadow: `0 0 10px ${layer.accent}`,
                        }}
                      />
                      {layer.sublabel}
                    </span>
                  </div>

                  <h3
                    className="text-white mb-4"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.02,
                    }}
                  >
                    {layer.label}
                  </h3>

                  <p
                    className="mb-6"
                    style={{
                      fontSize: "clamp(0.85rem, 1.05vw, 0.98rem)",
                      lineHeight: 1.6,
                      color: "rgba(255,255,255,0.62)",
                      maxWidth: 480,
                    }}
                  >
                    {layer.description}
                  </p>

                  <div
                    className="grid gap-2"
                    style={{ gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", maxWidth: 480 }}
                  >
                    {layer.specs.map((spec) => (
                      <div
                        key={spec}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-md"
                        style={{
                          background: "rgba(255,255,255,0.025)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        <span
                          style={{
                            width: 3, height: 12, borderRadius: 2,
                            background: layer.accent,
                            boxShadow: `0 0 8px ${layer.accent}aa`,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: "0.66rem",
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.82)",
                            letterSpacing: "0.01em",
                          }}
                        >
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM — progress rail */}
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
                        {layer.id === "pipe" ? "Pipe" :
                         layer.id === "insulation" ? "NBR Insulation" :
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
                  background: "linear-gradient(90deg, #f97316, #fbbf24, #f97316)",
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
