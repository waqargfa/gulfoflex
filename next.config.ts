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
  // 301 redirects for legacy WordPress / old-site URLs that Google has indexed.
  // These old paths would otherwise 404 on the new Next.js site. Mapping each to the
  // closest equivalent page preserves SEO equity and stops "404 from Google" landings.
  async redirects() {
    return [
      // ---- Core company pages ----
      { source: "/home", destination: "/", statusCode: 301 },
      { source: "/about-us", destination: "/about", statusCode: 301 },
      { source: "/about_gulf_o_flex.html", destination: "/about", statusCode: 301 },
      { source: "/about_rubber_world.html", destination: "/about", statusCode: 301 },
      { source: "/companybreif.aspx", destination: "/about", statusCode: 301 },
      { source: "/chairman.asp", destination: "/about", statusCode: 301 },
      { source: "/chairmanmessage.aspx", destination: "/about", statusCode: 301 },
      { source: "/chairmans_message.html", destination: "/about", statusCode: 301 },
      { source: "/vision-mission.asp", destination: "/about", statusCode: 301 },
      { source: "/gulf-o-flex-sri-lanka", destination: "/about", statusCode: 301 },
      { source: "/rubberworld.asp", destination: "/about", statusCode: 301 },
      { source: "/world-flex-insulation.asp", destination: "/about", statusCode: 301 },
      { source: "/gulfoflex.asp", destination: "/", statusCode: 301 },
      { source: "/default.aspx", destination: "/", statusCode: 301 },
      { source: "/index.asp", destination: "/", statusCode: 301 },
      { source: "/no-access", destination: "/", statusCode: 301 },
      { source: "/wp-login.php", destination: "/", statusCode: 301 },
      { source: "/brand-new-page", destination: "/", statusCode: 301 },
      { source: "/slide-anything-popup-preview", destination: "/", statusCode: 301 },

      // ---- Industries (legacy / merged pages) ----
      // "Construction" is covered by the HVAC, MEP & Construction page.
      { source: "/industries/construction", destination: "/industries/hvac", statusCode: 301 },

      // ---- Contact ----
      { source: "/contact-us", destination: "/contact", statusCode: 301 },
      { source: "/contact.asp", destination: "/contact", statusCode: 301 },
      { source: "/contact2.asp", destination: "/contact", statusCode: 301 },
      { source: "/contacts.html", destination: "/contact", statusCode: 301 },
      { source: "/contact.aspx", destination: "/contact", statusCode: 301 },
      { source: "/feedback.asp", destination: "/contact", statusCode: 301 },

      // ---- News / media ----
      { source: "/news-media", destination: "/news", statusCode: 301 },
      { source: "/news-media-2", destination: "/news", statusCode: 301 },
      { source: "/our-media", destination: "/news", statusCode: 301 },
      { source: "/media", destination: "/news", statusCode: 301 },
      { source: "/media.asp", destination: "/news", statusCode: 301 },
      { source: "/blog.html", destination: "/news", statusCode: 301 },
      { source: "/category/:slug*", destination: "/news", statusCode: 301 },
      { source: "/tag/:slug*", destination: "/news", statusCode: 301 },
      { source: "/author/:slug*", destination: "/news", statusCode: 301 },
      // Date-based WordPress posts, e.g. /2025/06/30/ahr-orlando
      { source: "/:year(\\d{4})/:rest*", destination: "/news", statusCode: 301 },

      // ---- Legacy blog / article posts ----
      { source: "/2017-mep-magazine-supplier-highlight", destination: "/news", statusCode: 301 },
      { source: "/changing-the-world-through-green-thinking", destination: "/news", statusCode: 301 },
      { source: "/climate-control-2017-may-issue", destination: "/news", statusCode: 301 },
      { source: "/entrepreneurship-skills-to-support-covid-19-response-efforts", destination: "/news", statusCode: 301 },
      { source: "/gulf-o-gate-partners-with-schools-to-offer-360-disinfection-in-10-seconds", destination: "/news", statusCode: 301 },
      { source: "/history-of-insulation-innovation", destination: "/news", statusCode: 301 },
      { source: "/how-to-protect-yourself-against-the-coronavirus", destination: "/news", statusCode: 301 },
      { source: "/hvacr-exhibition-philippines", destination: "/news", statusCode: 301 },
      { source: "/inspect-the-insulation-of-outdoor-ac-units", destination: "/news", statusCode: 301 },
      { source: "/made-in-u-a-e-hvac-products", destination: "/news", statusCode: 301 },
      { source: "/rubber-world-hosts-iftar-for-business-communities", destination: "/news", statusCode: 301 },
      { source: "/rubber-world-industries-participate-at-the-big-5-dubai-2014", destination: "/news", statusCode: 301 },
      { source: "/rubber-world-industries-talks-new-products", destination: "/news", statusCode: 301 },
      { source: "/rubber-world-industry-exhibitted-in-big-5-2022", destination: "/news", statusCode: 301 },
      { source: "/rubber-world-industry-hosts-annual-iftar-gathering", destination: "/news", statusCode: 301 },
      { source: "/rwi-eyes-for-international-growth-in-2021", destination: "/news", statusCode: 301 },
      { source: "/the-importance-nbr-rubber-insulation-hvac-industries", destination: "/news", statusCode: 301 },
      { source: "/the-journey-towards-an-energy-efficient-and-sustainable-industry", destination: "/news", statusCode: 301 },
      { source: "/tips-to-keep-office-virus-free", destination: "/news", statusCode: 301 },
      { source: "/uniteduae", destination: "/news", statusCode: 301 },

      // ---- COVID / disinfection (discontinued line) ----
      { source: "/covid-19-solutions", destination: "/", statusCode: 301 },
      { source: "/disinfection-gate", destination: "/", statusCode: 301 },

      // ---- Products ----
      { source: "/products.asp", destination: "/products", statusCode: 301 },
      { source: "/trading-products", destination: "/products", statusCode: 301 },
      { source: "/trading-products.asp", destination: "/products", statusCode: 301 },
      { source: "/gi-sheets", destination: "/products", statusCode: 301 },
      { source: "/calculator", destination: "/products", statusCode: 301 },
      { source: "/cart", destination: "/products", statusCode: 301 },
      { source: "/shop", destination: "/products", statusCode: 301 },

      // Product family pages
      { source: "/gulf-o-flex-nbr", destination: "/products/nbr", statusCode: 301 },
      { source: "/gulf-o-flex-rubber-insulation-nbr", destination: "/products/nbr", statusCode: 301 },
      { source: "/gulf-o-flex-rubber-insulation-nbr-now-is-ul-certified", destination: "/products/nbr", statusCode: 301 },
      { source: "/gulfoflex-ulcertified", destination: "/products/nbr", statusCode: 301 },
      { source: "/rubbber-nbr-insulation", destination: "/products/nbr", statusCode: 301 },
      { source: "/rubber-nbr-insulation", destination: "/products/nbr", statusCode: 301 },
      { source: "/rubber-insulation-nbr-2", destination: "/products/nbr", statusCode: 301 },
      { source: "/rubber-insulation-tube", destination: "/products/nbr", statusCode: 301 },
      { source: "/rubbber-nbr-insulation", destination: "/products/nbr", statusCode: 301 },
      { source: "/rubber-insulations", destination: "/products", statusCode: 301 },
      { source: "/rubber-insulation-tubes-xlpe-sheet-roll", destination: "/products/xlpe", statusCode: 301 },
      { source: "/insulation-tube-coil", destination: "/products", statusCode: 301 },
      { source: "/insulation-tube-coil.asp", destination: "/products", statusCode: 301 },
      { source: "/insulation-sheet-rolls-slabs", destination: "/products", statusCode: 301 },
      { source: "/insulation-sheet-rolls.asp", destination: "/products", statusCode: 301 },
      { source: "/insulation-sheets.asp", destination: "/products", statusCode: 301 },
      { source: "/gulf-o-flex-xlpe", destination: "/products/xlpe", statusCode: 301 },
      { source: "/gulf-o-flex-sound", destination: "/products/sound", statusCode: 301 },
      { source: "/gulf-o-flex-aluglass", destination: "/products/aluglass", statusCode: 301 },
      { source: "/gulf-o-flex-aluclad", destination: "/products/aluclad", statusCode: 301 },
      { source: "/gulf-o-flex-clad", destination: "/products/aluclad", statusCode: 301 },
      { source: "/gulf-o-flex-accessories", destination: "/products", statusCode: 301 },
      { source: "/anti-vibration-pad.asp", destination: "/products", statusCode: 301 },

      // Duct / ductwork pages
      { source: "/flexible-insulated-duct", destination: "/products", statusCode: 301 },
      { source: "/flexible-uninsulated-duct", destination: "/products", statusCode: 301 },
      { source: "/semi-rigid-duct", destination: "/products", statusCode: 301 },
      { source: "/insulated-duct.asp", destination: "/products", statusCode: 301 },
      { source: "/know-your-ducts", destination: "/products", statusCode: 301 },
      { source: "/what-is-the-types-of-air-conditioning-ducts", destination: "/products", statusCode: 301 },
      { source: "/difference-between-insulated-duct-and-non-insulated-gulf-o-duct", destination: "/products", statusCode: 301 },

      // ---- Applications / industries ----
      { source: "/applications", destination: "/industries", statusCode: 301 },
      { source: "/application.html", destination: "/industries", statusCode: 301 },

      // ---- Certifications ----
      { source: "/certifications.asp", destination: "/certifications", statusCode: 301 },
      { source: "/certifications.html", destination: "/certifications", statusCode: 301 },
      { source: "/certificates.aspx", destination: "/certifications", statusCode: 301 },

      // ---- Careers ----
      { source: "/career.aspx", destination: "/careers", statusCode: 301 },
      { source: "/opportunities.asp", destination: "/careers", statusCode: 301 },

      // ---- Downloads / brochures (PDFs) ----
      { source: "/wp-content/uploads/2019/07/brochure.pdf", destination: "/downloads", statusCode: 301 },
      { source: "/downloads/brochure.pdf", destination: "/downloads", statusCode: 301 },
      { source: "/downloads/pre_qualification_manual.pdf", destination: "/downloads", statusCode: 301 },
      { source: "/downloads/pre_qualification_manual_2017.pdf", destination: "/downloads", statusCode: 301 },
    ];
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

