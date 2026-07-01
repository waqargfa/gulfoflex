/**
 * ProductAnimation - autoplay looping video for each Gulf-O-Flex® product.
 *
 * Renders a muted, looping, inline video so it behaves like a seamless
 * animation (no controls, no audio, no user interaction required).
 *
 * Expected source files (add to /public/videos/products/):
 *   {slug}.webm (preferred, VP9) and {slug}.mp4 (fallback)
 *
 * A poster image at /images/products/{slug}.jpg is used as a fallback while
 * the video loads or if the file is missing.
 */

type Props = {
  slug: string;
  shortName: string;
  specValue?: string;
  productCount?: number;
  index?: number;
};

export default function ProductAnimation({ slug, shortName }: Props) {
  const webmSrc = `/videos/products/${slug}.webm`;
  const mp4Src = `/videos/products/${slug}.mp4`;
  const poster = `/images/products/${slug}.jpg`;

  return (
    <div className="relative h-80 w-full overflow-hidden bg-black">
      <video
        key={slug}
        className="absolute inset-0 h-full w-full object-cover"
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={`${shortName} product animation`}
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
      </video>
      {/* subtle cinematic vignette to blend with the surrounding dark panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
