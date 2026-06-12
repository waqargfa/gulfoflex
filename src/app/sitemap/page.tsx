import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import {
  Home,
  Package,
  Factory,
  FlaskConical,
  FolderOpen,
  Phone,
  Shield,
  ArrowUpRight,
  Map,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Site Map | Gulf-O-Flex® — gulfoflex.com",
  description:
    "Complete site map for gulfoflex.com — browse all pages of the Gulf-O-Flex® website including products, industries, certifications, and more.",
  alternates: { canonical: "https://gulfoflex.com/sitemap" },
};

const categories = [
  {
    label: "Company",
    icon: Home,
    color: "from-orange-500 to-orange-600",
    pages: [
      { title: "Home",         href: "/",             desc: "Gulf-O-Flex® homepage" },
      { title: "About Us",     href: "/about",        desc: "Our story, team & facilities" },
      { title: "Sustainability", href: "/sustainability", desc: "Our environmental commitment" },
    ],
  },
  {
    label: "Products",
    icon: Package,
    color: "from-orange-500 to-orange-600",
    pages: [
      { title: "All Products",      href: "/products",               desc: "Full product range overview" },
      { title: "NBR Rubber",        href: "/products/nbr",           desc: "Elastomeric NBR insulation" },
      { title: "XLPE Foam",         href: "/products/xlpe",          desc: "Cross-linked polyethylene foam" },
      { title: "Sound Insulation",  href: "/products/sound",         desc: "Acoustic insulation solutions" },
      { title: "Aluglass Facing",   href: "/products/aluglass",      desc: "Reinforced aluminium-glass facing" },
      { title: "Aluclad Facing",    href: "/products/aluclad",       desc: "Aluminium clad insulation" },
      { title: "Accessories",       href: "/products/accessories",   desc: "Adhesives, tapes, and fittings" },
    ],
  },
  {
    label: "Industries",
    icon: Factory,
    color: "from-neutral-700 to-neutral-900",
    pages: [
      { title: "All Industries",      href: "/industries",                    desc: "Overview of served markets" },
      { title: "HVAC",                href: "/industries/hvac",               desc: "Heating, ventilation & cooling" },
      { title: "Oil & Gas",           href: "/industries/oil-gas",            desc: "Upstream & downstream solutions" },
      { title: "Marine",              href: "/industries/marine",             desc: "IMO SOLAS compliant insulation" },
      { title: "Construction",        href: "/industries/construction",       desc: "Building & infrastructure" },
      { title: "District Cooling",    href: "/industries/district-cooling",   desc: "District cooling networks" },
      { title: "Industrial",          href: "/industries/industrial",         desc: "Process & industrial piping" },
    ],
  },
  {
    label: "Technical",
    icon: FlaskConical,
    color: "from-neutral-600 to-neutral-700",
    pages: [
      { title: "Technologies",     href: "/technologies",   desc: "Innovation & material science" },
      { title: "Certifications",   href: "/certifications", desc: "Standards, approvals & listings" },
      { title: "Downloads",        href: "/downloads",      desc: "Datasheets, catalogs & certificates" },
      { title: "GOF Assist AI",    href: "/gulf-o-flex-assist", desc: "AI-powered insulation calculator" },
    ],
  },
  {
    label: "Resources",
    icon: FolderOpen,
    color: "from-orange-600 to-orange-700",
    pages: [
      { title: "Projects",   href: "/projects",  desc: "Featured project references" },
      { title: "News",       href: "/news",       desc: "Latest news & announcements" },
      { title: "FAQ",        href: "/faq",        desc: "Frequently asked questions" },
    ],
  },
  {
    label: "Connect",
    icon: Phone,
    color: "from-neutral-600 to-neutral-700",
    pages: [
      { title: "Contact Us",    href: "/contact",      desc: "Get in touch with our team" },
      { title: "Distributors",  href: "/distributors", desc: "Find a local distributor" },
      { title: "Careers",       href: "/careers",      desc: "Join Rubber World Industry" },
    ],
  },
  {
    label: "Legal",
    icon: Shield,
    color: "from-neutral-500 to-neutral-700",
    pages: [
      { title: "Privacy Policy", href: "/privacy-policy", desc: "How we handle your data" },
      { title: "Terms of Use",   href: "/terms",          desc: "Site usage terms & conditions" },
    ],
  },
];

export default function SitemapPageRoute() {
  const totalPages = categories.reduce((s, c) => s + c.pages.length, 0);

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-32 md:pt-40 pb-20"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}
      >
        <PageHero
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=80"
          focalY="center"
          intensity={0.5}
        />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-700">Site Map</span>
            </nav>
            <div className="eyebrow mb-6">
              <span className="eyebrow-dot" />
              Navigation · {totalPages} pages
            </div>
            <h1
              className="text-neutral-900 leading-[0.95] mb-5"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}
            >
              Site <span className="gradient-text">Map</span><span className="serif-italic text-orange-600">.</span>
            </h1>
            <p className="text-neutral-600 text-lg max-w-xl leading-relaxed">
              A complete directory of every page on gulfoflex.com — organized by section for easy navigation.
            </p>

            {/* Stats row */}
            <div className="mt-10 flex flex-wrap gap-4">
              {[
                { n: categories.length, label: "categories" },
                { n: totalPages,        label: "total pages" },
              ].map(({ n, label }) => (
                <div key={label} className="glass-card px-5 py-3 flex items-center gap-3">
                  <span className="text-2xl font-black text-orange-600" style={{ fontFamily: "var(--font-display)" }}>{n}</span>
                  <span className="text-neutral-500 text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {categories.map(({ label, icon: Icon, color, pages }) => (
              <div
                key={label}
                className="rounded-2xl border bg-white overflow-hidden transition-all duration-300 hover:shadow-[0_12px_48px_-16px_rgba(0,0,0,0.12)] group"
                style={{ borderColor: "rgba(0,0,0,0.07)" }}
              >
                {/* Category header */}
                <div className={`bg-gradient-to-br ${color} px-6 py-5 flex items-center gap-3`}>
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2
                      className="text-white font-bold text-base leading-tight"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {label}
                    </h2>
                    <p className="text-white/60 text-xs">{pages.length} page{pages.length !== 1 ? "s" : ""}</p>
                  </div>
                </div>

                {/* Page links */}
                <ul className="divide-y" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
                  {pages.map(({ title, href, desc }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="flex items-start gap-3 px-6 py-4 hover:bg-orange-50/60 transition-colors group/link"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0 mt-2" />
                        <div className="flex-1 min-w-0">
                          <p className="text-neutral-900 font-semibold text-sm group-hover/link:text-orange-600 transition-colors leading-tight mb-0.5">
                            {title}
                          </p>
                          <p className="text-neutral-400 text-xs leading-relaxed">{desc}</p>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-300 group-hover/link:text-orange-500 transition-colors flex-shrink-0 mt-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* XML sitemap note */}
          <div className="mt-12 rounded-2xl border p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between" style={{ borderColor: "rgba(0,0,0,0.07)", background: "linear-gradient(135deg, #fafaf9 0%, #fff7ed 100%)" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Map className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-neutral-900 font-semibold text-sm">XML Sitemap</p>
                <p className="text-neutral-500 text-xs">For search engines and crawlers</p>
              </div>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-xs"
            >
              View sitemap.xml
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
