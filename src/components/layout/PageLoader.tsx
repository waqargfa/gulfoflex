"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ─── timing ─────────────────────────────────────
   0.00 s  background appears
   0.30 s  logo fades + scales in
   0.80 s  underline draws in
   2.40 s  exit — curtain slides up
   3.00 s  component unmounts
──────────────────────────────────────────────── */

export default function PageLoader() {
  const [exit, setExit] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("gof_loaded")) {
      setGone(true);
      return;
    }
    const t1 = setTimeout(() => setExit(true), 2400);
    const t2 = setTimeout(() => {
      setGone(true);
      sessionStorage.setItem("gof_loaded", "1");
    }, 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <>
      <style>{`
        @keyframes _gl_fade_scale {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes _gl_underline {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes _gl_bar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes _gl_exit {
          from { transform: translateY(0); }
          to   { transform: translateY(-100%); }
        }
        @keyframes _gl_glow_pulse {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 0.85; }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          background: "#07070E",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          animation: exit ? "_gl_exit 0.55s cubic-bezier(0.65,0,0.35,1) forwards" : undefined,
        }}
      >
        {/* ambient radial glow behind logo */}
        <div style={{
          position: "absolute",
          width: "clamp(320px, 60vw, 700px)",
          height: "clamp(160px, 20vw, 300px)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)",
          animation: "_gl_glow_pulse 2s ease-in-out 0.5s infinite",
          pointerEvents: "none",
        }} />

        {/* logo */}
        <div style={{
          position: "relative",
          animation: "_gl_fade_scale 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both",
        }}>
          <Image
            src="/images/logos/gulfoflex-logo-white.png"
            alt="Gulf-O-Flex"
            width={340}
            height={75}
            priority
            style={{ width: "clamp(200px, 40vw, 340px)", height: "auto" }}
          />
        </div>

        {/* underline */}
        <div style={{
          width: "clamp(200px, 40vw, 340px)",
          height: 1,
          marginTop: 16,
          background: "linear-gradient(90deg, transparent, #f97316 30%, #fbbf24 50%, #f97316 70%, transparent)",
          transformOrigin: "center",
          animation: "_gl_underline 0.6s cubic-bezier(0.4,0,0.2,1) 0.8s both",
        }} />

        {/* progress bar */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 2,
          background: "rgba(255,255,255,0.04)",
        }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(90deg, #f97316, #fbbf24 55%, #f97316)",
            boxShadow: "0 0 8px 1px rgba(249,115,22,0.6)",
            transformOrigin: "left center",
            animation: "_gl_bar 2.2s cubic-bezier(0.4,0,0.2,1) 0.2s both",
          }} />
        </div>
      </div>
    </>
  );
}

