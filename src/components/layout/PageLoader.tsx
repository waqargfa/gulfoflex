"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ─── timing ─────────────────────────────────────
   0.14 s  central orange line draws in
   0.54 s  wordmark slides down + wipes open
   0.60 s  emblem / company details rise up
   1.40 s  technical spec tags fade in
   3.10 s  exit — both panels slide away (curtain)
   3.90 s  component unmounts
──────────────────────────────────────────────── */
const SPECS = ["λ ≤ 0.036 W/mK", "WVR μ ≥ 10,000", "ISO 9001", "FM Approved"];

export default function PageLoader() {
  const [exit, setExit] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("gof_loaded")) {
      setGone(true);
      return;
    }
    const t1 = setTimeout(() => setExit(true), 3100);
    const t2 = setTimeout(() => {
      setGone(true);
      sessionStorage.setItem("gof_loaded", "1");
    }, 3900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  const bg = "#07070E";

  return (
    <>
      <style>{`
        @keyframes _gv_line_in {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes _gv_line_out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes _gv_wm_drop {
          from { transform: translateY(-52px); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        @keyframes _gv_wm_wipe {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0   0% 0 0); }
        }
        @keyframes _gv_underline {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes _gv_rise {
          from { transform: translateY(48px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes _gv_exit_top {
          from { transform: translateY(0); }
          to   { transform: translateY(-100%); }
        }
        @keyframes _gv_exit_bot {
          from { transform: translateY(0); }
          to   { transform: translateY(100%); }
        }
        @keyframes _gv_fade_in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes _gv_bar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes _gv_corner {
          from { width: 0; height: 0; opacity: 0; }
          to   { width: 20px; height: 20px; opacity: 1; }
        }
        @keyframes _gv_tag_in {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── root container ── */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, zIndex: 99999, background: bg, overflow: "hidden" }}
      >

        {/* corner crop marks */}
        {(
          [
            { top: 18, left: 18,     borderTop:    "1px solid rgba(249,115,22,0.5)", borderLeft:   "1px solid rgba(249,115,22,0.5)" },
            { top: 18, right: 18,    borderTop:    "1px solid rgba(249,115,22,0.5)", borderRight:  "1px solid rgba(249,115,22,0.5)" },
            { bottom: 18, left: 18,  borderBottom: "1px solid rgba(249,115,22,0.5)", borderLeft:   "1px solid rgba(249,115,22,0.5)" },
            { bottom: 18, right: 18, borderBottom: "1px solid rgba(249,115,22,0.5)", borderRight:  "1px solid rgba(249,115,22,0.5)" },
          ] as React.CSSProperties[]
        ).map((s, i) => (
          <div key={i} style={{ position: "absolute", animation: `_gv_corner 0.3s ease ${0.06 + i * 0.04}s both`, ...s }} />
        ))}

        {/* progress bar — 1 px at very bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.05)", zIndex: 10 }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(90deg,#f97316,#fbbf24 55%,#f97316)",
            boxShadow: "0 0 8px 1px rgba(249,115,22,0.65)",
            transformOrigin: "left center",
            animation: "_gv_bar 3.0s cubic-bezier(0.4,0,0.2,1) 0.2s both",
          }} />
        </div>

        {/* micro labels */}
        <div style={{ position:"absolute", bottom:11, left:20, fontFamily:"'Courier New',monospace", fontSize:"0.46rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.16)", animation:"_gv_fade_in 0.5s ease 1.7s both" }}>
          Est. 1993 · Ajman, UAE
        </div>
        <div style={{ position:"absolute", bottom:11, right:20, fontFamily:"'Courier New',monospace", fontSize:"0.46rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.16)", animation:"_gv_fade_in 0.5s ease 1.7s both" }}>
          gulfoflex.com
        </div>

        {/* ══════════════════════════════════
            TOP PANEL — wordmark
        ══════════════════════════════════ */}
        <div
          style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: "50%",
            background: bg,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end",
            paddingBottom: "clamp(30px, 5vh, 56px)",
            zIndex: 2,
            animation: exit ? "_gv_exit_top 0.72s cubic-bezier(0.65,0,0.35,1) forwards" : undefined,
          }}
        >
          {/* outer wrapper — drops down */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, animation:"_gv_wm_drop 0.65s cubic-bezier(0.22,1,0.36,1) 0.54s both" }}>

            {/* eyebrow */}
            <div style={{ fontFamily:"'Courier New',monospace", fontSize:"0.5rem", fontWeight:700, letterSpacing:"0.38em", textTransform:"uppercase", color:"#f97316", animation:"_gv_fade_in 0.5s ease 0.95s both" }}>
              NBR Thermal Insulation
            </div>

            {/* wordmark clip-path wipe */}
            <div style={{ animation:"_gv_wm_wipe 0.88s cubic-bezier(0.4,0,0.2,1) 0.6s both" }}>
              <h1 style={{
                margin: 0,
                fontFamily: "var(--font-display), system-ui, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.8rem, 7.5vw, 5.6rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.045em",
                color: "#ffffff",
                whiteSpace: "nowrap",
              }}>
                GULF&#8209;O&#8209;FLEX
                <sup style={{ fontSize:"0.34em", color:"#f97316", letterSpacing:0, verticalAlign:"super", marginLeft:"0.08em" }}>®</sup>
              </h1>
            </div>

            {/* underline — draws right */}
            <div style={{
              width: "100%", height: 1,
              background: "linear-gradient(90deg,#f97316 0%,#fbbf24 50%,rgba(249,115,22,0.25) 100%)",
              transformOrigin: "left center",
              animation: "_gv_underline 0.5s cubic-bezier(0.4,0,0.2,1) 1.48s both",
            }} />
          </div>
        </div>

        {/* ══════════════════════════════════
            CENTER DIVIDING LINE
        ══════════════════════════════════ */}
        <div style={{
          position: "absolute", top: "50%", left: 0, right: 0,
          height: 1, marginTop: "-0.5px",
          background: "linear-gradient(90deg,transparent 0%,#f97316 15%,#fbbf24 50%,#f97316 85%,transparent 100%)",
          boxShadow: "0 0 20px 4px rgba(249,115,22,0.45)",
          transformOrigin: "center", zIndex: 3,
          animation: exit
            ? "_gv_line_out 0.22s ease-in 0.36s forwards"
            : "_gv_line_in 0.40s cubic-bezier(0.22,1,0.36,1) 0.14s both",
        }} />

        {/* ══════════════════════════════════
            BOTTOM PANEL — emblem + details
        ══════════════════════════════════ */}
        <div
          style={{
            position: "absolute", top: "50%", left: 0, right: 0, bottom: 0,
            background: bg,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
            paddingTop: "clamp(30px, 5vh, 56px)",
            zIndex: 2,
            animation: exit ? "_gv_exit_bot 0.72s cubic-bezier(0.65,0,0.35,1) forwards" : undefined,
          }}
        >
          {/* emblem row */}
          <div style={{ display:"flex", alignItems:"center", gap:18, animation:"_gv_rise 0.65s cubic-bezier(0.22,1,0.36,1) 0.60s both" }}>
            <Image src="/images/logos/gof-emblem.png" alt="Gulf-O-Flex" width={52} height={52} priority />

            <div style={{ width:1, height:42, background:"linear-gradient(to bottom,transparent,rgba(249,115,22,0.4),transparent)" }} />

            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              <span style={{ fontFamily:"var(--font-display),system-ui,sans-serif", fontWeight:700, fontSize:"0.82rem", letterSpacing:"0.01em", color:"rgba(255,255,255,0.85)" }}>
                Rubber World Industry LLC
              </span>
              <span style={{ fontFamily:"'Courier New',monospace", fontSize:"0.5rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)" }}>
                Ajman · United Arab Emirates
              </span>
            </div>
          </div>

          {/* spec tags */}
          <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", justifyContent:"center", gap:"6px 20px", marginTop:22 }}>
            {SPECS.map((s, i) => (
              <span key={i} style={{
                fontFamily: "'Courier New',monospace",
                fontSize: "0.48rem", fontWeight:700,
                letterSpacing: "0.18em", textTransform:"uppercase",
                color: i === 0 ? "rgba(249,115,22,0.6)" : "rgba(255,255,255,0.25)",
                animation: `_gv_tag_in 0.4s ease ${1.42 + i * 0.09}s both`,
              }}>
                {i > 0 && <span style={{ marginRight:20, color:"rgba(255,255,255,0.1)" }}>·</span>}
                {s}
              </span>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

