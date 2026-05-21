"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const max = (h.scrollHeight || 1) - h.clientHeight;
      setP(max > 0 ? (scrolled / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed left-0 right-0 z-[60] pointer-events-none"
      style={{ top: "var(--navbar-height, 64px)" }}
    >
      <div
        className="h-[2px] origin-left transition-[width] duration-150 ease-out"
        style={{
          width: `${p}%`,
          background:
            "linear-gradient(90deg, transparent, #f97316 40%, #ea580c 70%, transparent)",
          boxShadow: "0 0 12px rgba(249,115,22,0.6)",
        }}
      />
    </div>
  );
}
