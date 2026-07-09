import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import ProjectsExplorer, { type Project } from "@/components/projects/ProjectsExplorer";

export const metadata: Metadata = {
  title: "Project References | Gulf-O-Flex® Insulation Projects Worldwide",
  description:
    "Explore Gulf-O-Flex® project references across HVAC, Oil & Gas, Marine, District Cooling, and Construction sectors. 5,000+ successful projects across 90+ countries.",
  alternates: { canonical: "https://gulfoflex.com/projects" },
};

const featuredProjects: Project[] = [
  { id: 1,  name: "Sharjah Airport Expansion",              location: "Sharjah, UAE",          country: "UAE",       type: "Pipe & Duct Insulation", image: "/images/projects/project1.png"  },
  { id: 2,  name: "Palm Six Senses Project",                location: "Dubai, UAE",             country: "UAE",       type: "Pipe & Duct Insulation", image: "/images/projects/project2.png"  },
  { id: 3,  name: "Sustainable City Abu Dhabi",             location: "Yas Island, UAE",        country: "UAE",       type: "Pipe & Duct Insulation", image: "/images/projects/project9.png"  },
  { id: 4,  name: "Hillmont Residences",                    location: "Dubai, UAE",             country: "UAE",       type: "Pipe & Duct Insulation", image: "/images/projects/project10.png" },
  { id: 5,  name: "JCD Stadium",                           location: "Jeddah, Saudi Arabia",   country: "KSA",       type: "Pipe & Duct Insulation", image: "/images/projects/project8.png"  },
  { id: 6,  name: "Luxury Service Apartments & Marina Club", location: "Yiti, Oman",           country: "Oman",      type: "Pipe & Duct Insulation", image: "/images/projects/project3.png"  },
  { id: 7,  name: "Jinan Island Villas",                    location: "Al Mouj, Oman",          country: "Oman",      type: "Pipe & Duct Insulation", image: "/images/projects/project4.png"  },
  { id: 8,  name: "Tivoli & Avani Hotels & Residences",     location: "Zallaq, Bahrain",        country: "Bahrain",   type: "Pipe & Duct Insulation", image: "/images/projects/project5.png"  },
  { id: 9,  name: "Ahlia University",                       location: "Manama, Bahrain",        country: "Bahrain",   type: "Pipe & Duct Insulation", image: "/images/projects/project6.png"  },
  { id: 10, name: "Waterfront Promenade Mina District",     location: "Old Doha Port, Qatar",   country: "Qatar",     type: "Pipe & Duct Insulation", image: "/images/projects/project7.png"  },
  { id: 11, name: "Port City Mixed-Use Development",        location: "Colombo, Sri Lanka",     country: "Sri Lanka", type: "Pipe & Duct Insulation", image: "/images/projects/project9.png"  },
  { id: 12, name: "Katunayake Logistics Hub",               location: "Katunayake, Sri Lanka",  country: "Sri Lanka", type: "Pipe & Duct Insulation", image: "/images/projects/katunayake-logistics.jpg"  },
];

const stats = [
  { n: "5,000+", l: "Projects Completed" },
  { n: "90+", l: "Countries" },
  { n: "30+", l: "Years Experience" },
  { n: "500+", l: "Major References" },
];

export default function ProjectsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 md:pt-24 pb-8 md:pb-10" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="/heroimg/projects.jpg" focalY="40%" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                <span className="text-neutral-300">/</span>
                <span className="text-neutral-700">Projects</span>
              </nav>
              <div className="eyebrow mb-6"><span className="eyebrow-dot" />Case Studies · 5,000+ projects</div>
              <h1 className="text-neutral-900 leading-[0.95] mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
                5,000+ projects<span className="serif-italic text-orange-600">.</span><br />
                <span className="gradient-text">6 continents.</span>
              </h1>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                From super-tall towers in Dubai to offshore oil platforms in the North Sea, Gulf-O-Flex® insulation is trusted by the world&rsquo;s leading engineering firms, contractors, and project developers.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/15 to-transparent rounded-[2rem] blur-3xl pointer-events-none" />
              <div className="relative rounded-3xl border bg-white/90 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(234,88,12,0.20)]"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="px-7 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-orange-600" />
                    <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600">Track record</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(0,0,0,0.06)" }}>
                  {stats.map((s) => (
                    <div key={s.l} className="bg-white p-6">
                      <div className="text-neutral-900 font-black mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)", letterSpacing: "-0.025em" }}>{s.n}</div>
                      <div className="text-neutral-500 text-[10px] uppercase tracking-[0.18em] font-bold">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects (filterable by country) ── */}
      <ProjectsExplorer projects={featuredProjects} />
    </>
  );
}
