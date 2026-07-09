"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
}

export default function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  }, [images.length]);

  const next = useCallback(() => {
    setSelectedIndex((i) => (i !== null ? (i + 1) % images.length : null));
  }, [images.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className="group relative aspect-square rounded-2xl border bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_-25px_rgba(234,88,12,0.25)] cursor-pointer"
            style={{ borderColor: "rgba(0,0,0,0.08)" }}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={close}>
          <div className="relative max-w-4xl w-[90vw] max-h-[85vh] aspect-square" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
