"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const PipeLayerSection = dynamic(() => import("@/components/home/PipeLayerSection"), { ssr: false });

export type PipeLayerVariant = "full" | "nbr";

/**
 * Lazy-mount wrapper: only renders the heavy R3F Canvas when the user
 * is within ~1 viewport of the section. This avoids the canvas being
 * created far above the fold and then having its WebGL context
 * suspended by Chromium while it sits offscreen — a state where the
 * canvas becomes a blank rectangle that never recovers.
 */
export default function PipeLayerSectionClient({ variant = "full" }: { variant?: PipeLayerVariant } = {}) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) return;
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldMount(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "120% 0px 120% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldMount]);

  // Match the real section height so the sentinel doesn't cause layout
  // jumps when the canvas mounts.
  const placeholderHeight = variant === "nbr" ? "320vh" : "420vh";

  if (shouldMount) return <PipeLayerSection variant={variant} />;

  return (
    <div
      ref={sentinelRef}
      aria-hidden
      style={{ height: placeholderHeight, width: "100%" }}
    />
  );
}
