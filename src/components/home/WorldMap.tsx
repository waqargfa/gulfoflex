"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Line,
  Marker,
  Sphere,
} from "react-simple-maps";

/* ── world-atlas 110m topojson (countries) ─────────────────── */
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/* ── ISO-3166-1 numeric codes for color tiers ──────────────── */
// Tier 1 — GCC (orange)
const GCC_IDS = new Set([784, 682, 634, 512, 48, 414]);
// Tier 2 — Key distributor countries (amber)
const DIST_IDS = new Set([
  356, 144, 566, 818, 504, 586, 50, 702, 458, 360, 826, 276, 250, 792, 380,
  724, 528, 616, 300, 76, 484, 36, 710, 288, 12, 788, 231, 404, 440, 116, 704,
]);

export type HubDef = {
  city: string;
  country: string;
  label: string;
  role: "HQ" | "Plant" | "Sales Office";
  /** [longitude, latitude] in decimal degrees */
  coordinates: [number, number];
  established: string;
};

interface Props {
  hubs: HubDef[];
  activeHub: number | null;
  onHubClick: (i: number) => void;
}

export default function WorldMap({ hubs, activeHub, onHubClick }: Props) {
  const [hoveredHub, setHoveredHub] = useState<number | null>(null);
  const hq = hubs[0];
  const displayHub = hoveredHub !== null ? hoveredHub : activeHub;

  return (
    <div className="relative w-full h-full select-none">
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 148, center: [28, 14] }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        {/* ── SVG defs: arc gradient + glow filter ──────────────── */}
        <defs>
          <linearGradient id="wm-arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="1" />
            <stop offset="45%" stopColor="#fb923c" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#a3a3a3" stopOpacity="0.95" />
          </linearGradient>
          <filter id="wm-pin-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="wm-arc-glow" x="-30%" y="-200%" width="160%" height="500%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="wm-hq-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(249,115,22,0.55)" />
            <stop offset="55%" stopColor="rgba(249,115,22,0.12)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0)" />
          </radialGradient>
        </defs>

        {/* ── Ocean sphere ─────────────────────────────────────── */}
        <Sphere
          id="wm-sphere"
          fill="transparent"
          stroke="rgba(249,115,22,0.12)"
          strokeWidth={0.6}
        />

        {/* ── Lat/lon graticule ────────────────────────── */}
        <Graticule stroke="rgba(115,115,115,0.055)" strokeWidth={0.4} />

        {/* ── Country fills with hover effect ─────────────────── */}
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const numId = parseInt((geo.id as string) ?? "0", 10);
              const isGCC = GCC_IDS.has(numId);
              const isDist = DIST_IDS.has(numId);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: isGCC
                        ? "rgba(249,115,22,0.48)"
                        : isDist
                        ? "rgba(249,115,22,0.22)"
                        : "rgba(212,212,212,0.55)",
                      stroke: "rgba(255,255,255,0.55)",
                      strokeWidth: 0.45,
                      outline: "none",
                      transition: "fill 180ms ease",
                    },
                    hover: {
                      fill: isGCC
                        ? "rgba(249,115,22,0.92)"
                        : isDist
                        ? "rgba(249,115,22,0.72)"
                        : "rgba(115,115,115,0.52)",
                      stroke: isGCC
                        ? "rgba(249,115,22,0.6)"
                        : isDist
                        ? "rgba(249,115,22,0.4)"
                        : "rgba(163,163,163,0.35)",
                      strokeWidth: 0.6,
                      outline: "none",
                      cursor: "default",
                    },
                    pressed: {
                      fill: isGCC
                        ? "rgba(249,115,22,0.70)"
                        : isDist
                        ? "rgba(249,115,22,0.50)"
                        : "rgba(180,180,180,0.65)",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* ── Arc lines from HQ → every hub ───────────────────── */}
        <g filter="url(#wm-arc-glow)">
          {hubs.slice(1).map((hub, i) => (
            <Line
              key={`arc-${i}`}
              from={hq.coordinates}
              to={hub.coordinates}
              stroke="url(#wm-arc-grad)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeDasharray="5 3.5"
              style={{ opacity: 0.72 }}
            />
          ))}
        </g>

        {/* ── HQ halo (radial spotlight on Ajman) ─────────────── */}
        <Marker coordinates={hq.coordinates}>
          <ellipse
            rx={28}
            ry={22}
            fill="url(#wm-hq-halo)"
            style={{ pointerEvents: "none" }}
          />
        </Marker>

        {/* ── Hub pin markers ─────────────────────────────────── */}
        {hubs.map((hub, i) => {
          const isHQ = hub.role === "HQ";
          const isPlant = hub.role === "Plant";
          const isHighlit = activeHub === i || hoveredHub === i;

          const r = isHQ ? 8.5 : isPlant ? 7 : 5.5;
          const color = isHQ
            ? "#f97316"
            : isPlant
            ? "#fb923c"
            : "#a3a3a3";
          const pulseDur = isHQ ? "1.8s" : isPlant ? "2.2s" : "2.6s";

          return (
            <Marker
              key={`hub-${i}`}
              coordinates={hub.coordinates}
              onClick={() => onHubClick(i)}
              onMouseEnter={() => setHoveredHub(i)}
              onMouseLeave={() => setHoveredHub(null)}
            >
              {/* Outer slow pulse */}
              <circle fill={color} opacity={0.15}>
                <animate
                  attributeName="r"
                  values={`${r * 2.2};${r * 4.0};${r * 2.2}`}
                  dur={pulseDur}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.20;0.03;0.20"
                  dur={pulseDur}
                  repeatCount="indefinite"
                />
              </circle>
              {/* Mid ring */}
              <circle
                r={isHighlit ? r * 2.0 : r * 1.5}
                fill={color}
                opacity={isHighlit ? 0.45 : 0.22}
                style={{ transition: "r 0.25s, opacity 0.25s" }}
              />
              {/* Core dot */}
              <circle
                r={isHighlit ? r * 1.2 : r}
                fill={color}
                stroke="white"
                strokeWidth={isHighlit ? 2.5 : 1.8}
                filter={isHighlit ? "url(#wm-pin-glow)" : undefined}
                style={{
                  cursor: "pointer",
                  transition: "r 0.2s",
                }}
              />
              {/* HQ badge */}
              {isHQ && (
                <text
                  textAnchor="middle"
                  y={-(r + 9)}
                  fill="white"
                  fontSize="8.5"
                  fontWeight="800"
                  letterSpacing="0.8"
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    textShadow: "0 1px 4px rgba(0,0,0,1)",
                    pointerEvents: "none",
                  }}
                >
                  HQ
                </text>
              )}
            </Marker>
          );
        })}
      </ComposableMap>

      {/* ── Floating hub tooltip card ────────────────────────── */}
      <AnimatePresence>
        {displayHub !== null && (
          <motion.div
            key={`tt-${displayHub}`}
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.94 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white text-neutral-900 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] border border-neutral-100 min-w-max">
              <div>
                <div className="text-sm font-bold leading-snug">
                  {hubs[displayHub].city},{" "}
                  <span className="text-neutral-500 font-medium">
                    {hubs[displayHub].country}
                  </span>
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  {hubs[displayHub].label} · Est.{" "}
                  {hubs[displayHub].established}
                </div>
              </div>
              <span
                className={`ml-1 text-[9px] font-black tracking-[0.14em] uppercase px-2.5 py-1 rounded-full ${
                  hubs[displayHub].role === "HQ"
                    ? "bg-orange-500 text-white"
                    : hubs[displayHub].role === "Plant"
                    ? "bg-orange-400 text-neutral-900"
                    : "bg-neutral-400 text-neutral-900"
                }`}
              >
                {hubs[displayHub].role}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Map legend ───────────────────────────────────────── */}
      <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center gap-x-4 gap-y-1 pointer-events-none">
        <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.14em] uppercase text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)]" />
          HQ
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.14em] uppercase text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_7px_rgba(249,115,22,0.8)]" />
          Plant
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.14em] uppercase text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-neutral-400 shadow-[0_0_7px_rgba(115,115,115,0.7)]" />
          Sales Office
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.14em] uppercase text-neutral-500">
            <span className="w-3 h-1.5 rounded-sm bg-orange-500/55" />
            GCC
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.14em] uppercase text-neutral-500">
            <span className="w-3 h-1.5 rounded-sm bg-orange-400/38" />
            Distribution
          </div>
        </div>
      </div>
    </div>
  );
}
