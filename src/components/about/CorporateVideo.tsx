"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function CorporateVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="container-wide">
      <div className="relative rounded-3xl overflow-hidden group">
        {!playing ? (
          <>
            {/* Thumbnail */}
            <Image
              src="/images/factory/UAE-1.png"
              alt="Gulf-O-Flex corporate video thumbnail"
              width={1920}
              height={820}
              className="w-full aspect-[21/9] object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
            {/* Play button */}
            <button
              onClick={() => setPlaying(true)}
              aria-label="Play corporate video"
              className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-orange-500/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-[5] bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 py-12 md:py-16 pointer-events-none">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-orange-400 mb-3">
                  <Sparkles size={12} /> Our Story
                </span>
                <h2
                  className="text-white leading-[1.05]"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.035em" }}
                >
                  Engineering excellence <span className="serif-italic text-orange-400">since 1993.</span>
                </h2>
                <p className="mt-3 text-white/70 text-base max-w-xl leading-relaxed">
                  From raw NBR compounds to finished insulation covering the world&rsquo;s most critical infrastructure.
                </p>
              </div>
            </div>
          </>
        ) : (
          <video
            className="w-full aspect-[21/9] object-cover"
            controls
            autoPlay
            playsInline
          >
            <source src="/CORPORATE VIDEO-HD.mp4" type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}
