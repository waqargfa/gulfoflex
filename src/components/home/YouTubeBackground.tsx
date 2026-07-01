"use client";

/**
 * VideoBackground
 *
 * Full-bleed, muted, looping HTML5 video for the hero section.
 * Place your video at  public/hero-bg.webm
 *
 * The video covers the container like background-size:cover
 * (object-fit: cover on an absolutely-positioned element).
 * pointer-events: none - never steals clicks.
 */

import { useRef, useEffect } from "react";

interface Props {
  /** Path relative to /public, e.g. "/hero-bg.webm" */
  src?: string;
}

export default function VideoBackground({
  src = "/hero-bg.webm",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Ensure the video plays even if the browser paused it */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;   // must be set in JS for Safari autoplay
    const p = v.play();
    if (p !== undefined) p.catch(() => {}); // ignore autoplay-blocked errors
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position:      "absolute",
        inset:         0,
        overflow:      "hidden",
        pointerEvents: "none",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position:   "absolute",
          inset:      0,
          width:      "100%",
          height:     "100%",
          objectFit:  "cover",
          objectPosition: "center center",
        }}
      >
        <source src={src} type="video/webm" />
      </video>

      {/* Warm-dark overlay - keeps text readable over bright video frames */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: "rgba(6, 5, 3, 0.32)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

