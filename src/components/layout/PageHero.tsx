import Image from "next/image";

type PageHeroProps = {
  /** Absolute /images/... path or remote URL whitelisted in next.config.ts */
  src: string;
  /** Decorative — kept empty by default since the image is purely background art */
  alt?: string;
  /** Vertical focal point of the image (e.g. "center", "30%", "top") */
  focalY?: string;
  /**
   * Image visibility behind the overlay. Default 0.45 reads well with dark
   * neutral-900 hero copy on top.
   */
  intensity?: number;
  /**
   * "light" (default) — warm white veil for dark text on white sections.
   * "dark" — black veil for white text on dark sections.
   */
  variant?: "light" | "dark";
};

/**
 * Decorative full-bleed background for inner-page heroes. Drop this in as
 * the first child of a `relative overflow-hidden` <section> and content
 * with `relative z-10` will sit above it.
 *
 * Effects: slow Ken-Burns zoom, warm white→tint gradient veil, soft grid,
 * dual orange glow orbs, radial vignette.
 */
export default function PageHero({
  src,
  alt = "",
  focalY = "center",
  intensity = 0.85,
  variant = "light",
}: PageHeroProps) {
  const isDark = variant === "dark";
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Real image — slow Ken-Burns zoom */}
      <div className="absolute inset-0 page-hero-kenburns">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: `center ${focalY}`, opacity: intensity }}
        />
      </div>

      {/* Veil — lighter at top so the photograph reads, heavier at bottom for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(180deg, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.78) 55%, rgba(8,8,8,0.92) 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,247,237,0.72) 55%, rgba(255,247,237,0.95) 100%)",
        }}
      />

      {/* Side fade so left-aligned hero copy remains crisp regardless of focal point */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(90deg, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.18) 45%, rgba(8,8,8,0) 75%)"
            : "linear-gradient(90deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0) 75%)",
        }}
      />

      {/* Subtle warm tint */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/[0.08] via-transparent to-orange-400/[0.05]" />

      {/* Fine grid overlay (matches original look) */}
      <div className={`absolute inset-0 grid-bg ${isDark ? "opacity-[0.06]" : "opacity-[0.14]"}`} />

      {/* Soft orange glow orbs */}
      <div className={`absolute -top-32 -right-20 w-[520px] h-[520px] rounded-full blur-[110px] ${isDark ? "bg-orange-500/12" : "bg-orange-500/18"}`} />
      <div className={`absolute -bottom-40 -left-20 w-[440px] h-[440px] rounded-full blur-[100px] ${isDark ? "bg-orange-400/10" : "bg-orange-400/14"}`} />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(120% 80% at 50% 30%, transparent 35%, rgba(0,0,0,0.55) 100%)"
            : "radial-gradient(120% 80% at 50% 30%, transparent 45%, rgba(0,0,0,0.12) 100%)",
        }}
      />
    </div>
  );
}
