"use client";

/**
 * Hero background — realistic pipe insulation installation scene
 *
 * Scene (back → front):
 *   1. Dark industrial wall + structural pillars
 *   2. Concrete floor
 *   3. Background finished pipes (show the end-result product)
 *   4. Pipe hanger supports
 *   5. Three animated insulated pipes (steel → NBR foam → aluminium jacket)
 *
 * Animation per pipe:
 *   Phase 1: bare steel pipe extends left → right
 *   Phase 2: black NBR foam sleeve slides right → left over pipe
 *   Phase 3: aluminium stucco jacket slides right → left over foam
 *   Phase 4: hold briefly → loop
 *
 * Pure PBR materials (no fake canvas building textures).
 * "warehouse" environment map gives sharp metallic reflections.
 */

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/* ─── helpers ────────────────────────────────────────────── */
const ss   = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const clmp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/* ═══════════════════════════════════════════════════════════
   CANVAS TEXTURE FACTORIES  (created once inside useMemo)
═══════════════════════════════════════════════════════════ */

/** Black closed-cell NBR rubber foam — dense micro-pore surface */
function makeNBRTex() {
  const W = 1024, H = 256;
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#060607"; ctx.fillRect(0, 0, W, H);
  // fine closed-cell pores
  for (let i = 0; i < 32000; i++) {
    const v = 4 + Math.floor(Math.random() * 38);
    ctx.globalAlpha = Math.random() * 0.50 + 0.10;
    ctx.fillStyle = `rgb(${v},${v},${Math.min(v + 3, 44)})`;
    ctx.beginPath();
    ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 1.6 + 0.15, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  // factory slit seam line
  ctx.strokeStyle = "rgba(0,0,0,0.94)"; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();
  // cylindrical shading gradient
  const sh = ctx.createLinearGradient(0, 0, 0, H);
  sh.addColorStop(0,    "rgba(0,0,0,0.58)");
  sh.addColorStop(0.36, "rgba(12,12,14,0.08)");
  sh.addColorStop(0.50, "rgba(50,50,52,0.16)");
  sh.addColorStop(0.64, "rgba(12,12,14,0.08)");
  sh.addColorStop(1,    "rgba(0,0,0,0.58)");
  ctx.fillStyle = sh; ctx.fillRect(0, 0, W, H);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(9, 1);
  return t;
}

/** Stucco-embossed aluminium jacketing */
function makeAlumTex() {
  const W = 512, H = 256, STEP = 13;
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#c9ced6"; ctx.fillRect(0, 0, W, H);
  for (let row = 0; row <= H / STEP + 1; row++) {
    for (let col = 0; col <= W / STEP + 1; col++) {
      const cx = col * STEP + (row % 2 === 0 ? 0 : STEP / 2);
      const cy = row * STEP;
      ctx.globalAlpha = 0.86; ctx.fillStyle = "#ecf0f6";
      ctx.beginPath(); ctx.ellipse(cx - 1.4, cy - 1.4, STEP * 0.37, STEP * 0.28, 0, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 0.52; ctx.fillStyle = "#8d97a3";
      ctx.beginPath(); ctx.ellipse(cx + 1.7, cy + 1.7, STEP * 0.37, STEP * 0.28, 0, 0, Math.PI * 2); ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
  const sh = ctx.createLinearGradient(0, 0, 0, H);
  sh.addColorStop(0,   "rgba(0,0,0,0.46)");
  sh.addColorStop(0.5, "rgba(255,255,255,0.21)");
  sh.addColorStop(1,   "rgba(0,0,0,0.46)");
  ctx.fillStyle = sh; ctx.fillRect(0, 0, W, H);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(11, 1);
  return t;
}

/** Realistic concrete — aggregate grain + form-board joints + moisture staining */
function makeConcreteTexture() {
  const W = 1024, H = 1024;
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  // Base mid-grey concrete
  ctx.fillStyle = "#4a4e56"; ctx.fillRect(0, 0, W, H);
  // Aggregate grain (thousands of micro particles)
  for (let i = 0; i < 70000; i++) {
    const v = 68 + Math.floor(Math.random() * 44 - 22);
    ctx.globalAlpha = Math.random() * 0.13;
    ctx.fillStyle = `rgb(${v},${v - 1},${v - 3})`;
    ctx.beginPath();
    ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 2.2 + 0.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  // Horizontal form-board joints (every panel row)
  for (let r = 0; r <= 8; r++) {
    const y = (r / 8) * H;
    ctx.fillStyle = "rgba(0,0,0,0.35)"; ctx.fillRect(0, y - 2, W, 4);
    ctx.fillStyle = "rgba(255,255,255,0.07)"; ctx.fillRect(0, y + 2, W, 2);
  }
  // Vertical panel joints
  for (let col = 0; col <= 4; col++) {
    const x = (col / 4) * W;
    ctx.fillStyle = "rgba(0,0,0,0.26)"; ctx.fillRect(x - 2, 0, 4, H);
    ctx.fillStyle = "rgba(255,255,255,0.06)"; ctx.fillRect(x + 2, 0, 2, H);
  }
  // Moisture / efflorescence staining at base
  const stain = ctx.createLinearGradient(0, H * 0.55, 0, H);
  stain.addColorStop(0, "rgba(0,0,0,0)");
  stain.addColorStop(1, "rgba(0,0,0,0.32)");
  ctx.fillStyle = stain; ctx.fillRect(0, 0, W, H);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(4, 2);
  return t;
}

/* ════════════════════════════════════════════════════════════
   PIPE FLANGE — flanged joint disc with bolt ring
   The single most recognisable feature of industrial pipework.
════════════════════════════════════════════════════════════ */
function PipeFlange({ pR, mat }: { pR: number; mat: THREE.Material }) {
  const boltCount = Math.max(4, Math.round(6 + pR * 20));
  return (
    <group>
      {/* Main flange disc */}
      <mesh material={mat} castShadow>
        <cylinderGeometry args={[pR * 2.1, pR * 2.1, 0.10, 32]} />
      </mesh>
      {/* Weld-neck collar */}
      <mesh material={mat} castShadow>
        <cylinderGeometry args={[pR * 1.35, pR * 1.35, 0.20, 32]} />
      </mesh>
      {/* Stud bolts */}
      {Array.from({ length: boltCount }).map((_, i) => {
        const a = (i / boltCount) * Math.PI * 2;
        return (
          <mesh key={i} material={mat} castShadow
            position={[Math.cos(a) * pR * 1.76, 0, Math.sin(a) * pR * 1.76]}>
            <cylinderGeometry args={[0.015, 0.015, 0.24, 8]} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   1. INDUSTRIAL BUILDING
   Concrete-textured wall + I-beam columns + warm glowing windows
   + LED high-bay fixtures. Fog makes it recede naturally.
═══════════════════════════════════════════════════════════ */
function IndustrialBuilding() {
  const concTex = useMemo(() => makeConcreteTexture(), []);
  const concMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: concTex, roughness: 0.93, metalness: 0.02,
  }), [concTex]);
  const steelMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#28303e", metalness: 0.88, roughness: 0.55,
  }), []);
  // Warm amber glass — lit from inside (emissive glow)
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#ffdd88", emissive: "#ff9900", emissiveIntensity: 0.55,
    roughness: 0.06, metalness: 0.0,
    opacity: 0.65, transparent: true,
  }), []);
  const ledMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#e8e8e8", emissive: "#fffae0", emissiveIntensity: 0.70,
  }), []);

  const windowX = [-6.5, 0, 6.5];
  const pillars  = [-9.5, -4.8, 0, 4.8, 9.5];

  return (
    <group>
      {/* ── Main concrete back wall ── */}
      <mesh position={[0, 0.8, -13.5]} material={concMat} receiveShadow>
        <planeGeometry args={[34, 16]} />
      </mesh>

      {/* ── High-bay industrial windows (warm amber glow) ── */}
      {windowX.map((x, i) => (
        <group key={i} position={[x, 2.0, -13.2]}>
          {/* Steel frame */}
          <mesh material={steelMat} castShadow>
            <boxGeometry args={[3.0, 3.4, 0.18]} />
          </mesh>
          {/* Amber glass pane */}
          <mesh material={glassMat} position={[0, 0, 0.10]}>
            <planeGeometry args={[2.6, 3.0]} />
          </mesh>
          {/* Horizontal mullion */}
          <mesh material={steelMat} position={[0, 0, 0.12]}>
            <boxGeometry args={[3.0, 0.07, 0.05]} />
          </mesh>
          {/* Vertical mullion */}
          <mesh material={steelMat} position={[0, 0, 0.12]}>
            <boxGeometry args={[0.07, 3.4, 0.05]} />
          </mesh>
        </group>
      ))}

      {/* ── H-beam structural columns ── */}
      {pillars.map((x, i) => (
        <group key={i} position={[x, 0.8, -13.0]}>
          <mesh material={steelMat} castShadow><boxGeometry args={[0.08, 13, 0.44]} /></mesh>
          <mesh material={steelMat} castShadow position={[0, 0,  0.22]}><boxGeometry args={[0.30, 13, 0.08]} /></mesh>
          <mesh material={steelMat} castShadow position={[0, 0, -0.22]}><boxGeometry args={[0.30, 13, 0.08]} /></mesh>
        </group>
      ))}

      {/* ── Top girder ── */}
      <mesh position={[0, 5.8, -12.8]} material={steelMat} castShadow>
        <boxGeometry args={[22, 0.42, 0.58]} />
      </mesh>

      {/* ── Ceiling soffit (same concrete) ── */}
      <mesh position={[0, 6.0, -7.5]} rotation={[Math.PI / 2, 0, 0]} material={concMat} receiveShadow>
        <planeGeometry args={[28, 14]} />
      </mesh>

      {/* ── Overhead LED high-bay strip fixtures ── */}
      {[-6, 0, 6].map((x, i) => (
        <mesh key={i} position={[x, 5.65, -5.5]} material={ledMat} castShadow>
          <boxGeometry args={[0.24, 0.10, 2.0]} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. CONCRETE FLOOR
═══════════════════════════════════════════════════════════ */
function Floor() {
  const concTex = useMemo(() => makeConcreteTexture(), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    map: concTex, roughness: 0.88, metalness: 0.05, color: "#36393f",
  }), [concTex]);
  return (
    <mesh position={[0, -2.22, -5.5]} rotation={[-Math.PI / 2, 0, 0]} material={mat} receiveShadow>
      <planeGeometry args={[30, 20]} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. DENSE BACKGROUND PIPE SYSTEM
   Multi-level pipe rack — the visual core of a real facility.
   Three depth layers with varying pipe sizes, materials,
   flanged joints, and H-beam rack structure.
   Fog fades deeper layers naturally into the background.
═══════════════════════════════════════════════════════════ */
function BackgroundPipeSystem() {
  const nbrTex  = useMemo(() => makeNBRTex(),  []);
  const alumTex = useMemo(() => makeAlumTex(), []);

  const steelMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#96a8ba", metalness: 0.96, roughness: 0.16,
    clearcoat: 0.92, clearcoatRoughness: 0.05, envMapIntensity: 3.0,
  }), []);
  const flangeMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#78889a", metalness: 0.90, roughness: 0.28, clearcoat: 0.75,
  }), []);
  const nbrMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: nbrTex, color: "#0b0b0d", roughness: 0.97, metalness: 0.0, envMapIntensity: 0.07,
  }), [nbrTex]);
  const alumMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: alumTex, color: "#c8cdd6", metalness: 0.92, roughness: 0.28,
    clearcoat: 0.85, clearcoatRoughness: 0.08, envMapIntensity: 2.2,
  }), [alumTex]);
  const rackMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#38455a", metalness: 0.88, roughness: 0.52, clearcoat: 0.18,
  }), []);

  // type: 0 = bare steel · 1 = NBR foam only · 2 = NBR + aluminium jacket
  const bgPipes: Array<{ y: number; z: number; pR: number; type: 0 | 1 | 2 }> = [
    // Deepest layer  (z ≈ -10)
    { y:  3.4, z: -10.5, pR: 0.10,  type: 2 },
    { y:  2.6, z: -10.0, pR: 0.065, type: 1 },
    { y:  1.8, z: -10.5, pR: 0.14,  type: 2 },
    { y:  0.9, z: -10.0, pR: 0.055, type: 0 },
    { y:  0.0, z: -10.5, pR: 0.090, type: 1 },
    // Mid layer (z ≈ -7.5)
    { y:  3.0, z:  -7.5, pR: 0.075, type: 2 },
    { y:  2.1, z:  -7.5, pR: 0.120, type: 1 },
    { y:  1.1, z:  -7.5, pR: 0.055, type: 0 },
    { y:  0.1, z:  -7.5, pR: 0.095, type: 2 },
    { y: -0.6, z:  -7.5, pR: 0.060, type: 0 },
    // Near layer  (z ≈ -5)
    { y:  2.8, z:  -5.5, pR: 0.085, type: 2 },
    { y:  1.7, z:  -5.0, pR: 0.110, type: 1 },
    { y:  0.4, z:  -5.5, pR: 0.070, type: 0 },
    { y: -0.4, z:  -5.0, pR: 0.080, type: 2 },
  ];

  const pipeLen    = 14.5;
  const rackX      = [-5, 0, 5];
  // Three flange positions per pipe: both ends + centre
  const flangeT    = [-0.46, 0, 0.46];

  // Unique Z depths for column placement
  const zLevels = [...new Set(bgPipes.map(p => p.z))];

  return (
    <group>
      {/* ── Rack structure ── */}
      {zLevels.map((rz) =>
        rackX.map((rx, xi) => (
          <mesh key={`col-${rz}-${xi}`} material={rackMat}
            position={[rx, 1.0, rz - 0.28]} castShadow>
            <boxGeometry args={[0.09, 9, 0.38]} />
          </mesh>
        ))
      )}
      {/* Horizontal rack beams at each pipe level */}
      {bgPipes.map((p, i) => (
        <mesh key={`beam-${i}`} material={rackMat}
          position={[0, p.y, p.z - 0.24]} castShadow>
          <boxGeometry args={[11.5, 0.09, 0.22]} />
        </mesh>
      ))}

      {/* ── Pipes ── */}
      {bgPipes.map((p, i) => {
        const iR = p.pR + 0.058;
        const aR = p.pR + 0.080;
        return (
          <group key={`pipe-${i}`} position={[0, p.y, p.z]} rotation={[0, 0, Math.PI / 2]}>
            {/* Steel core */}
            <mesh material={steelMat} castShadow>
              <cylinderGeometry args={[p.pR, p.pR, pipeLen, 40, 1, p.type > 0]} />
            </mesh>
            {/* NBR foam */}
            {p.type >= 1 && (
              <mesh material={nbrMat} castShadow>
                <cylinderGeometry args={[iR, iR, pipeLen, 40, 1, p.type >= 2]} />
              </mesh>
            )}
            {/* Aluminium jacket */}
            {p.type >= 2 && (
              <mesh material={alumMat} castShadow>
                <cylinderGeometry args={[aR, aR, pipeLen, 40, 1, true]} />
              </mesh>
            )}
            {/* Flanged joints — flat disc rings (cheap, fog-friendly) */}
            {flangeT.map((ft, fi) => (
              <group key={fi} position={[0, ft * pipeLen, 0]}>
                <PipeFlange pR={p.pR} mat={flangeMat} />
              </group>
            ))}
          </group>
        );
      })}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. PIPE HANGER SUPPORTS
   U-bolt saddle clamps hanging from a top carry-beam.
═══════════════════════════════════════════════════════════ */
function PipeHangers() {
  const steelMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#4a5464", metalness: 0.88, roughness: 0.48, clearcoat: 0.32,
  }), []);

  const hangerX  = [-5, 0, 5];
  // [y, z, outerRadius] — matches PIPES config below
  const lanes: [number, number, number][] = [
    [-0.60, -0.30, 0.276],
    [ 0.55, -1.50, 0.210],
    [ 1.60, -0.80, 0.245],
  ];

  return (
    <group>
      {/* Top carry beam */}
      <mesh material={steelMat} position={[0, 3.62, -1.5]} castShadow>
        <boxGeometry args={[13, 0.18, 0.36]} />
      </mesh>

      {hangerX.map((hx, hi) => (
        <group key={hi} position={[hx, 0, 0]}>
          {lanes.map(([py, pz, oR], pi) => {
            const topY  = 3.62;
            const rodLen = topY - py - oR - 0.10;
            const midY   = py + oR + 0.10 + rodLen / 2;
            return (
              <group key={pi} position={[0, py, pz]}>
                {/* Saddle plate */}
                <mesh material={steelMat} position={[0, -(oR + 0.07), 0]} castShadow>
                  <boxGeometry args={[0.22, 0.10, 0.34]} />
                </mesh>
                {/* Left hanger rod */}
                <mesh material={steelMat} position={[-0.09, oR + 0.07 + rodLen / 2, 0]} castShadow>
                  <cylinderGeometry args={[0.022, 0.022, rodLen, 8]} />
                </mesh>
                {/* Right hanger rod */}
                <mesh material={steelMat} position={[ 0.09, oR + 0.07 + rodLen / 2, 0]} castShadow>
                  <cylinderGeometry args={[0.022, 0.022, rodLen, 8]} />
                </mesh>
              </group>
            );
          })}
        </group>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. ANIMATED INSULATED PIPE
   Phase 1: steel pipe extends L→R
   Phase 2: NBR foam sleeve slides R→L over pipe
   Phase 3: aluminium jacket slides R→L over foam
═══════════════════════════════════════════════════════════ */
interface PipeCfg {
  y:     number;
  z:     number;
  len:   number;
  pR:    number;
  iR:    number;
  aR:    number;
  delay: number;
  cycle: number;
}

function InsulatedPipe({ y, z, len, pR, iR, aR, delay, cycle }: PipeCfg) {
  const pipeRef    = useRef<THREE.Mesh>(null);
  const nbrRef     = useRef<THREE.Mesh>(null);
  const alumRef    = useRef<THREE.Mesh>(null);
  const nbrCapRef  = useRef<THREE.Mesh>(null);
  const alumCapRef = useRef<THREE.Mesh>(null);

  const nbrTex  = useMemo(() => makeNBRTex(),  []);
  const alumTex = useMemo(() => makeAlumTex(), []);

  // Pure PBR steel — metalness + clearcoat gives photorealistic polished pipe
  const pipeMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color:              "#9eb0c2",
    metalness:          0.97,
    roughness:          0.12,
    clearcoat:          1.0,
    clearcoatRoughness: 0.04,
    envMapIntensity:    4.0,
  }), []);

  const nbrMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    map:             nbrTex,
    color:           "#0a0a0c",
    roughness:       0.97,
    metalness:       0.0,
    envMapIntensity: 0.06,
    side:            THREE.DoubleSide,
  }), [nbrTex]);

  const alumMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    map:                alumTex,
    color:              "#cdd2da",
    metalness:          0.94,
    roughness:          0.24,
    clearcoat:          0.92,
    clearcoatRoughness: 0.06,
    envMapIntensity:    2.8,
    side:               THREE.DoubleSide,
  }), [alumTex]);

  const initPipeGeom = useMemo(() => new THREE.CylinderGeometry(pR, pR, 0.01, 72, 1, false), [pR]);
  const initNBRGeom  = useMemo(() => new THREE.CylinderGeometry(iR, iR, 0.01, 72, 1, true),  [iR]);
  const initAlumGeom = useMemo(() => new THREE.CylinderGeometry(aR, aR, 0.01, 72, 1, true),  [aR]);

  useFrame(({ clock }) => {
    const elapsed = Math.max(0, clock.elapsedTime - delay);
    const t = elapsed % cycle;

    const pPipe = ss(clmp(t / (cycle * 0.30), 0, 1));
    const pNBR  = ss(clmp((t - cycle * 0.38) / (cycle * 0.32), 0, 1));
    const pAlum = ss(clmp((t - cycle * 0.75) / (cycle * 0.20), 0, 1));

    /* Steel pipe — left end fixed, tip extends right */
    if (pipeRef.current) {
      const pLen = Math.max(pPipe * len, 0.01);
      const g = pipeRef.current.geometry as THREE.CylinderGeometry;
      if (Math.abs(g.parameters.height - pLen) > 0.012) {
        g.dispose();
        pipeRef.current.geometry = new THREE.CylinderGeometry(pR, pR, pLen, 72, 1, false);
      }
      pipeRef.current.position.y = -len / 2 + pLen / 2;
    }

    /* NBR foam — right end fixed, sleeve slides left */
    if (nbrRef.current) {
      const iLen = Math.max(pNBR * len, 0.01);
      const g = nbrRef.current.geometry as THREE.CylinderGeometry;
      if (Math.abs(g.parameters.height - iLen) > 0.012) {
        g.dispose();
        nbrRef.current.geometry = new THREE.CylinderGeometry(iR, iR, iLen, 72, 1, true);
      }
      nbrRef.current.position.y = len / 2 - iLen / 2;
      nbrRef.current.visible    = pNBR > 0.006;
    }

    /* Aluminium jacket — right end fixed, slides left */
    if (alumRef.current) {
      const aLen = Math.max(pAlum * len, 0.01);
      const g = alumRef.current.geometry as THREE.CylinderGeometry;
      if (Math.abs(g.parameters.height - aLen) > 0.012) {
        g.dispose();
        alumRef.current.geometry = new THREE.CylinderGeometry(aR, aR, aLen, 72, 1, true);
      }
      alumRef.current.position.y = len / 2 - aLen / 2;
      alumRef.current.visible    = pAlum > 0.006;
    }

    /* Leading-edge annular cap (cross-section slice) */
    if (nbrCapRef.current) {
      nbrCapRef.current.position.y = len / 2 - pNBR * len;
      nbrCapRef.current.visible    = pNBR > 0.006 && pNBR < 0.994;
    }
    if (alumCapRef.current) {
      alumCapRef.current.position.y = len / 2 - pAlum * len;
      alumCapRef.current.visible    = pAlum > 0.006 && pAlum < 0.994;
    }
  });

  return (
    <group position={[0, y, z]} rotation={[0, 0, Math.PI / 2]}>
      <mesh ref={pipeRef}  castShadow receiveShadow material={pipeMat}  geometry={initPipeGeom} />
      <mesh ref={nbrRef}   castShadow             material={nbrMat}   geometry={initNBRGeom}  />
      <mesh ref={alumRef}  castShadow             material={alumMat}  geometry={initAlumGeom} />
      {/* NBR leading-edge cross-section ring */}
      <mesh ref={nbrCapRef}  material={nbrMat}  rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[pR * 1.03, iR, 56]} />
      </mesh>
      {/* Alum leading-edge cross-section ring */}
      <mesh ref={alumCapRef} material={alumMat} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[iR * 1.02, aR, 56]} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCENE — three staggered foreground pipes
   Delays 0 / 3.2 / 6.5 s ensure perpetual cascading motion.
═══════════════════════════════════════════════════════════ */
const PIPES: PipeCfg[] = [
  { y: -0.60, z: -0.30, len: 11.5, pR: 0.155, iR: 0.258, aR: 0.276, delay: 0.0, cycle: 11.5 },
  { y:  0.55, z: -1.50, len: 11.0, pR: 0.115, iR: 0.194, aR: 0.210, delay: 3.2, cycle: 11.5 },
  { y:  1.60, z: -0.80, len: 10.5, pR: 0.135, iR: 0.228, aR: 0.245, delay: 6.5, cycle: 11.5 },
];

function HeroBgScene() {
  const root   = useRef<THREE.Group>(null);
  const damped = useRef({ x: 0, y: 0 });

  useFrame(({ clock, pointer }) => {
    if (!root.current) return;
    damped.current.x += (pointer.x - damped.current.x) * 0.022;
    damped.current.y += (pointer.y - damped.current.y) * 0.022;
    root.current.rotation.y =  0.06 + damped.current.x * 0.08;
    root.current.rotation.x = -0.03 + damped.current.y * 0.04;
    root.current.position.y = Math.sin(clock.elapsedTime * 0.36) * 0.04;
  });

  return (
    <group ref={root}>
      <IndustrialBuilding />
      <Floor />
      <BackgroundPipeSystem />
      <PipeHangers />
      {PIPES.map((cfg, i) => (
        <InsulatedPipe key={i} {...cfg} />
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   CANVAS EXPORT
═══════════════════════════════════════════════════════════ */
export default function PipeInsulationBackground() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      gl={{
        alpha:               true,
        antialias:           true,
        powerPreference:     "high-performance",
        toneMapping:         THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      camera={{ position: [0, 0.5, 9.0], fov: 50 }}
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      {/*
        Fog colour matches the hero cream background.
        Distant objects fade naturally into the page — no hard edge.
        near=8 keeps foreground pipes crisp; far=22 fades the deep background.
      */}
      <fog attach="fog" args={["#f2ede6", 8, 22]} />

      <Suspense fallback={null}>
        <ambientLight intensity={0.30} />

        {/* Key light — warm sun upper-right */}
        <directionalLight
          position={[10, 13, 8]}
          intensity={3.4}
          color="#fff6e0"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={30}
          shadow-camera-left={-14}
          shadow-camera-right={14}
          shadow-camera-top={8}
          shadow-camera-bottom={-6}
        />

        {/* Cool blue fill from left */}
        <directionalLight position={[-10, 4, 6]} intensity={0.70} color="#7ba4e8" />

        {/* LED high-bay overhead lights (match the fixture positions) */}
        {([-6, 0, 6] as number[]).map((x, i) => (
          <pointLight key={i} position={[x, 5.4, -5.5]}
            intensity={2.2} color="#fffde0" distance={20} />
        ))}

        {/* Window warm-amber glow from behind the building glass */}
        {([-6.5, 0, 6.5] as number[]).map((x, i) => (
          <pointLight key={i} position={[x, 2.0, -12.5]}
            intensity={1.4} color="#ff9900" distance={12} />
        ))}

        {/* Industrial sodium-orange wall sconces */}
        <pointLight position={[ 5.5, 1.8, -3]} intensity={0.95} color="#ff8218" distance={14} />
        <pointLight position={[-5.5, 1.8, -3]} intensity={0.75} color="#ff9a30" distance={14} />

        {/* Under-pipe warm fill */}
        <pointLight position={[0, -1.8, 3.5]} intensity={0.40} color="#ffb870" distance={9} />

        {/* Rim light from behind */}
        <pointLight position={[0, 2, -9]} intensity={0.50} color="#4466aa" distance={16} />

        <HeroBgScene />

        <ContactShadows
          position={[0, -2.18, 0]}
          opacity={0.44}
          scale={22}
          blur={5}
          far={8}
          color="#0a0d14"
        />

        {/* warehouse env → crisp metallic reflections on steel & aluminium */}
        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  );
}

