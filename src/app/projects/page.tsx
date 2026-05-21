import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, TrendingUp } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Project References | Gulf-O-Flex® Insulation Projects Worldwide",
  description:
    "Explore Gulf-O-Flex® project references across HVAC, Oil & Gas, Marine, District Cooling, and Construction sectors. 10,000+ successful projects across 90+ countries.",
  alternates: { canonical: "https://gulfoflex.com/projects" },
};

type Project = {
  id: number;
  name: string;
  location: string;
  country: string;
  type: string;
  image: string;
};

const featuredProjects: Project[] = [
  { id: 1, name: "Sharjah Airport Expansion", location: "Sharjah, UAE", country: "UAE", type: "Pipe & Duct Insulation", image: "/projects/project1.png" },
  { id: 2, name: "Palm Six Senses Project", location: "Dubai, UAE", country: "UAE", type: "Pipe & Duct Insulation", image: "/projects/project2.png" },
  { id: 3, name: "Luxury Service Apartments & Marina Club", location: "Yiti, Oman", country: "Oman", type: "Pipe & Duct Insulation", image: "/projects/project3.png" },
  { id: 4, name: "Jinan Island Villas", location: "Al Mouj, Oman", country: "Oman", type: "Pipe & Duct Insulation", image: "/projects/project4.png" },
  { id: 5, name: "Tivoli & Avani Hotels & Residences", location: "Zallaq, Bahrain", country: "Bahrain", type: "Pipe & Duct Insulation", image: "/projects/project5.png" },
  { id: 6, name: "Ahlia University", location: "Manama, Bahrain", country: "Bahrain", type: "Pipe & Duct Insulation", image: "/projects/project6.png" },
  { id: 7, name: "Waterfront Promenade Mina District", location: "Old Doha Port, Qatar", country: "Qatar", type: "Pipe & Duct Insulation", image: "/projects/project7.png" },
  { id: 8, name: "JCD Stadium", location: "Jeddah, Saudi Arabia", country: "KSA", type: "Pipe & Duct Insulation", image: "/projects/project8.png" },
  { id: 9, name: "Sustainable City Abu Dhabi", location: "Yas Island, UAE", country: "UAE", type: "Pipe & Duct Insulation", image: "/projects/project9.png" },
  { id: 10, name: "Hillmont Residences", location: "Dubai, UAE", country: "UAE", type: "Pipe & Duct Insulation", image: "/projects/project10.png" },
  { id: 11, name: "Bandaranaike International Airport", location: "Katunayake, Sri Lanka", country: "Sri Lanka", type: "Pipe & Duct Insulation", image: "/project-srilanka/bandaranaike 1.jpg" },
  { id: 12, name: "Bandaranaike Memorial Complex", location: "Colombo, Sri Lanka", country: "Sri Lanka", type: "Pipe & Duct Insulation", image: "/project-srilanka/Bandaranaike.jpg" },
  { id: 13, name: "Defence Headquarters Sri Lanka", location: "Colombo, Sri Lanka", country: "Sri Lanka", type: "Pipe & Duct Insulation", image: "/project-srilanka/DEFENCE HEAD QUARTERS SRILANKA.jpg" },
  { id: 14, name: "Taj Samudra Hotel", location: "Colombo, Sri Lanka", country: "Sri Lanka", type: "Pipe & Duct Insulation", image: "/project-srilanka/taj-samudra-colombo.jpg" },
  { id: 15, name: "Diriyah Cultural District", location: "Riyadh, Saudi Arabia", country: "KSA", type: "Pipe & Duct Insulation", image: "/project-srilanka/Diriyah_Header_4.jpg" },
  { id: 16, name: "King Abdullah Financial District", location: "Riyadh, Saudi Arabia", country: "KSA", type: "Pipe & Duct Insulation", image: "/project-srilanka/KING ABDULLAH FINANCIAL DISTRICT.jpg" },
  { id: 17, name: "Qiddiya Water Theme Park", location: "Riyadh, Saudi Arabia", country: "KSA", type: "Pipe & Duct Insulation", image: "/project-srilanka/Qiddiya Water theme park.jpg" },
];

const stats = [
  { n: "10,000+", l: "Projects Completed" },
  { n: "90+", l: "Countries" },
  { n: "30+", l: "Years Experience" },
  { n: "500+", l: "Major References" },
];

export default function ProjectsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-24" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?auto=format&fit=crop&w=2400&q=80" focalY="40%" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                <span className="text-neutral-300">/</span>
                <span className="text-neutral-700">Projects</span>
              </nav>
              <div className="eyebrow mb-6"><span className="eyebrow-dot" />Case Studies · 10,000+ projects</div>
              <h1 className="text-neutral-900 leading-[0.95] mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
                10,000+ projects<span className="serif-italic text-orange-600">.</span><br />
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
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
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

      {/* ── Featured Projects ── */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <div className="eyebrow mb-4"><span className="eyebrow-dot" />Featured References · {featuredProjects.length}</div>
            <h2 className="text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Landmark <span className="serif-italic text-orange-600">projects</span> worldwide.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project, i) => (
              <div key={project.id}
                className="group relative rounded-3xl border bg-white overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-30px_rgba(234,88,12,0.30)] hover:border-orange-300/60 flex flex-col"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase border px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-orange-600 border-orange-500/25">
                      {project.country}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 text-[10px] font-bold tracking-[0.18em] uppercase text-white/90 bg-black/40 backdrop-blur px-2 py-1 rounded-full">
                    0{i + 1} / {featuredProjects.length}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-neutral-900 leading-[1.15] mb-2"
                    style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-4">
                    <MapPin size={12} className="text-orange-600" />
                    {project.location}
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    <span className="text-[10px] font-semibold text-neutral-600 border border-neutral-200 bg-neutral-50 px-2.5 py-1 rounded-full">
                      {project.type}
                    </span>
                    <div className="w-9 h-9 rounded-full border bg-white flex items-center justify-center transition-all duration-300 group-hover:bg-orange-500 group-hover:border-orange-500"
                      style={{ borderColor: "rgba(0,0,0,0.10)" }}>
                      <ArrowUpRight size={15} className="text-neutral-500 transition-colors group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
