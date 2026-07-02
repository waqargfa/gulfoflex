import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), payment=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "gulfoflex.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 86400,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "react-simple-maps", "d3-geo"],
  },
  async headers() {
    const isProd = process.env.NODE_ENV === "production";
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Prevent browsers/proxies from caching HTML pages so deploys are visible immediately.
      // Skip in development to avoid Next.js dev cache-control warnings/behavior issues.
      ...(isProd
        ? [
            {
              source: "/:path((?!_next/static|fonts|images|videos|.*\\.(?:js|css|png|jpg|jpeg|webp|avif|svg|ico|woff2?|ttf|mp4|webm)).*)",
              headers: [
                { key: "Cache-Control", value: "no-store, must-revalidate" },
              ],
            },
          ]
        : []),
      // Apply immutable caching for custom static assets in production.
      ...(isProd
        ? [
            {
              source: "/fonts/(.*)",
              headers: [
                { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
              ],
            },
          ]
        : []),
    ];
  },

};

export default nextConfig;

