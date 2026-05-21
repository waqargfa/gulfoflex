"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Dubai Metro Red Line Extension",
    location: "Dubai, UAE",
    industry: "Infrastructure",
    desc: "Comprehensive NBR insulation for all HVAC and plumbing systems across 15 new metro stations, meeting DEWA and Dubai Municipality standards.",
    specs: "45,000 m² · Gulf-O-Flex NBR",
    year: "2023",
    gradient: "from-orange-600/20 to-orange-500/5",
    border: "border-orange-500/15",
  },
  {
    title: "Aramco Offshore Platform",
    location: "Eastern Province, KSA",
    industry: "Oil & Gas",
    desc: "Marine-grade insulation for cryogenic and process piping systems on offshore production platform, meeting IMO FTP Code and NFPA requirements.",
    specs: "18,000 LM · Gulf-O-Flex NBR + Aluclad",
    year: "2023",
    gradient: "from-blue-600/15 to-blue-500/5",
    border: "border-blue-500/15",
  },
  {
    title: "Qatar FIFA World Cup Stadiums",
    location: "Doha, Qatar",
    industry: "Construction",
    desc: "District cooling and HVAC insulation for multiple FIFA World Cup 2022 stadium facilities — engineered for Qatar's extreme climate conditions.",
    specs: "120,000 m² · Multiple Products",
    year: "2022",
    gradient: "from-purple-600/15 to-purple-500/5",
    border: "border-purple-500/15",
  },
  {
    title: "Singapore Container Terminal",
    location: "Singapore",
    industry: "Marine",
    desc: "Acoustic and thermal insulation for the HVAC systems in Asia's largest automated container terminal, meeting MAS and NEA standards.",
    specs: "32,000 m² · Gulf-O-Flex Sound",
    year: "2022",
    gradient: "from-cyan-600/15 to-cyan-500/5",
    border: "border-cyan-500/15",
  },
];

const testimonials = [
  {
    quote: "Gulf-O-Flex consistently delivers product quality and technical support that is unmatched in the region. Our go-to insulation partner for 15 years.",
    author: "Senior MEP Engineer",
    company: "Leading UAE Consultancy",
  },
  {
    quote: "The technical data sheets, compliance certifications, and technical team support from Gulf-O-Flex makes specification and project execution seamless.",
    author: "Procurement Director",
    company: "Major GCC Contractor",
  },
  {
    quote: "GOF Assist has transformed how our team calculates insulation specifications. Instant, accurate, and fully code-compliant recommendations.",
    author: "M&E Consultant",
    company: "International Engineering Firm",
  },
];

export default function Projects() {
  return (
    <section className="section-padding bg-neutral-50 relative overflow-hidden" aria-labelledby="projects-heading">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-px tech-divider" />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16 reveal">
          <div>
            <div className="eyebrow mb-5">
              <span className="eyebrow-dot" />
              Case Studies &amp; Projects
            </div>
            <h2
              id="projects-heading"
              className="text-neutral-900 leading-[1.02]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 4.5vw, 4.25rem)", fontWeight: 700, letterSpacing: "-0.035em" }}
            >
              Trusted on the world&rsquo;s<br />
              <span className="serif-italic text-orange-600">most critical projects.</span>
            </h2>
          </div>
          <Link href="/projects" className="btn-ghost flex-shrink-0">
            All Projects <ArrowRight size={16} />
          </Link>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20 stagger-reveal">
          {projects.map((p) => (
            <div
              key={p.title}
              className={`group relative rounded-3xl bg-gradient-to-br ${p.gradient} border ${p.border} p-8 hover-lift overflow-hidden`}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 128 128" fill="none">
                  <circle cx="128" cy="0" r="80" stroke="rgba(249,115,22,0.5)" strokeWidth="1" fill="none" />
                  <circle cx="128" cy="0" r="50" stroke="rgba(249,115,22,0.3)" strokeWidth="1" fill="none" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="tag text-[9px]">{p.industry}</span>
                  <span className="text-neutral-500 text-xs">{p.location}</span>
                  <span className="ml-auto text-neutral-500 text-xs">{p.year}</span>
                </div>

                <h3 className="text-neutral-900 font-black text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                  {p.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-5">{p.desc}</p>

                <div className="flex items-center justify-between">
                  <div className="text-orange-600 text-xs font-bold">{p.specs}</div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    View Case Study <ExternalLink size={11} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="reveal">
          <div className="text-center mb-12">
            <div className="eyebrow justify-center mb-4">
              <span className="eyebrow-dot" />
              What Industry Experts Say
            </div>
            <h3
              className="text-neutral-900 font-bold"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.03em" }}
            >
              Trusted by engineers<br />
              <span className="serif-italic text-orange-600">worldwide.</span>
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-5 stagger-reveal">
            {testimonials.map((t, i) => (
              <div key={i} className="relative rounded-2xl border border-neutral-200 bg-white p-8 overflow-hidden group hover:border-orange-500/30 transition-colors duration-300">
                {/* Large quote mark watermark */}
                <div
                  className="absolute -top-2 -left-2 font-black leading-none select-none pointer-events-none"
                  style={{ fontFamily: "Georgia, serif", fontSize: "8rem", color: "rgba(249,115,22,0.06)", lineHeight: 1 }}
                >
                  &ldquo;
                </div>
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, si) => (
                    <svg key={si} width="12" height="12" viewBox="0 0 24 24" fill="rgba(249,115,22,0.9)">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-700 text-sm leading-relaxed mb-7 relative z-10">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-black text-sm">
                    {t.author[0]}
                  </div>
                  <div>
                    <div className="text-neutral-900 text-sm font-bold" style={{ fontFamily: "var(--font-display)" }}>{t.author}</div>
                    <div className="text-neutral-400 text-xs">{t.company}</div>
                  </div>
                </div>
                {/* Bottom orange line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
