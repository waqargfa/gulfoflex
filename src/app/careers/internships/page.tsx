import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Users, Lightbulb, Clock, MapPin, ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Internships | Gulf-O-Flex® – Launch Your Career in Insulation Manufacturing",
  description:
    "Apply for internship opportunities at Gulf-O-Flex®. Gain hands-on experience in engineering, manufacturing, quality control, and business operations at the UAE's leading insulation manufacturer.",
  alternates: { canonical: "https://gulfoflex.com/careers/internships" },
};

const departments = [
  {
    title: "Manufacturing & Production",
    icon: "🏭",
    desc: "Work alongside our production team to understand NBR, XLPE, and acoustic foam extrusion, lamination, and quality processes.",
    learn: ["Production line operations", "Raw material handling", "Process optimization", "Safety protocols"],
  },
  {
    title: "Quality Control & Lab",
    icon: "🔬",
    desc: "Assist in testing insulation properties - thermal conductivity, fire performance, water vapour transmission - using ASTM and BS EN methods.",
    learn: ["ASTM / BS EN testing standards", "Lab equipment operation", "Data recording & reporting", "Non-conformance procedures"],
  },
  {
    title: "Engineering & R&D",
    icon: "⚙️",
    desc: "Support product development, thermal calculations, and process improvement projects under the guidance of senior engineers.",
    learn: ["Thermal insulation design", "AutoCAD / SolidWorks", "Material science fundamentals", "Technical documentation"],
  },
  {
    title: "Sales & Marketing",
    icon: "📊",
    desc: "Gain exposure to B2B sales in the construction materials sector - from lead generation to technical proposals and trade exhibitions.",
    learn: ["B2B sales process", "CRM & pipeline management", "Market research", "Trade show coordination"],
  },
  {
    title: "Supply Chain & Logistics",
    icon: "🚛",
    desc: "Learn end-to-end supply chain management - procurement, inventory, warehousing, and distribution across 50+ countries.",
    learn: ["Procurement processes", "Inventory management", "Export documentation", "ERP systems"],
  },
  {
    title: "Finance & Administration",
    icon: "📋",
    desc: "Support accounting, budgeting, and administrative operations in a fast-paced manufacturing environment.",
    learn: ["Financial reporting basics", "Invoice processing", "Budget tracking", "Office administration"],
  },
];

const benefits = [
  { title: "Hands-On Experience", desc: "Real projects with measurable outcomes, not just observation." },
  { title: "Mentorship", desc: "Dedicated mentor from senior staff to guide your development." },
  { title: "Certificate of Completion", desc: "Official internship certificate upon successful completion." },
  { title: "Networking", desc: "Connect with professionals across engineering, sales, and operations." },
  { title: "Potential Full-Time Offer", desc: "Top-performing interns are considered for permanent roles." },
  { title: "Flexible Duration", desc: "8 to 12 week programmes aligned with university schedules." },
];

export default function InternshipsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 md:pt-24 pb-8 md:pb-10" style={{ background: "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" }}>
        <PageHero src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=80" focalY="center" />

        <div className="container-wide relative z-10">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span className="text-neutral-300">/</span>
            <Link href="/careers" className="hover:text-orange-600 transition-colors">Careers</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">Internships</span>
          </nav>

          <div className="max-w-4xl">
            <h1 className="text-neutral-900 leading-[0.95] mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
              <span className="block">
                <span className="word-fade-up" style={{ animationDelay: "80ms" }}>Launch your</span>
              </span>
              <span className="block">
                <span className="word-fade-up gradient-text serif-italic" style={{ animationDelay: "200ms" }}>career here.</span>
              </span>
            </h1>
            <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-3xl mb-8">
              Join Gulf-O-Flex® as an intern and gain real-world experience in insulation manufacturing, engineering, quality control, and business operations at one of the GCC&rsquo;s leading manufacturers.
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
              <span className="inline-flex items-center gap-2"><Clock size={15} className="text-orange-500" /> 8–12 weeks</span>
              <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-orange-500" /> Ajman, UAE</span>
              <span className="inline-flex items-center gap-2"><GraduationCap size={15} className="text-orange-500" /> University students & fresh graduates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <div className="eyebrow mb-4 mx-auto w-fit"><span className="eyebrow-dot" />Internship Departments</div>
            <h2 className="text-neutral-900 leading-[1.05] mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.8vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Where you can <span className="serif-italic text-orange-600">make an impact.</span>
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Choose the department that aligns with your studies and career goals. Each programme is structured to deliver practical skills and industry knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {departments.map((dept) => (
              <div key={dept.title} className="group relative rounded-3xl border bg-white p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-30px_rgba(234,88,12,0.30)] hover:border-orange-300/60"
                style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="text-3xl mb-4">{dept.icon}</div>
                <h3 className="text-neutral-900 font-bold text-lg mb-2" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>
                  {dept.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-5">{dept.desc}</p>

                <div className="text-[10px] uppercase font-bold tracking-[0.15em] text-neutral-400 mb-2">What you&apos;ll learn</div>
                <ul className="space-y-1.5">
                  {dept.learn.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12.5px] text-neutral-700">
                      <CheckCircle2 size={13} className="text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-24 bg-neutral-50/70 border-y" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <div className="container-wide">
          <div className="text-center mb-14">
            <div className="eyebrow mb-4 mx-auto w-fit"><span className="eyebrow-dot" />Why Intern With Us</div>
            <h2 className="text-neutral-900 leading-[1.05] mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.8vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              More than just <span className="serif-italic text-orange-600">an internship.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border bg-white p-6" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-orange-500" />
                  <h3 className="text-neutral-900 font-bold text-sm">{b.title}</h3>
                </div>
                <p className="text-neutral-500 text-[13px] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 md:py-24 bg-white border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <div className="container-wide">
          <div className="text-center mb-12">
            <div className="eyebrow mb-4 mx-auto w-fit"><span className="eyebrow-dot" />Life at Gulf-O-Flex®</div>
            <h2 className="text-neutral-900 leading-[1.05] mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.8vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Our <span className="serif-italic text-orange-600">facilities.</span>
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Get a glimpse of where you&apos;ll be working - our manufacturing plants, labs, and offices across the region.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { src: "/images/factory/UAE-1.png", alt: "Gulf-O-Flex® manufacturing facility - UAE", span: "md:col-span-2 md:row-span-2" },
              { src: "/images/factory/KSA-1.jpg", alt: "Gulf-O-Flex® facility - KSA", span: "" },
              { src: "/images/factory/ultra.jpeg", alt: "Gulf-O-Flex® production line", span: "" },
              { src: "/images/factory/Srilanka-1.png", alt: "Gulf-O-Flex® facility - Sri Lanka", span: "md:col-span-2" },
            ].map((img) => (
              <div key={img.src} className={`relative overflow-hidden rounded-2xl group ${img.span}`}>
                <div className="relative w-full h-full min-h-[200px] md:min-h-[240px]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-white text-xs font-semibold drop-shadow-lg">{img.alt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <div className="eyebrow mb-4 mx-auto w-fit"><span className="eyebrow-dot" />How to Apply</div>
            <h2 className="text-neutral-900 leading-[1.05] mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.8vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Ready to <span className="serif-italic text-orange-600">get started?</span>
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed mb-10">
              Send your CV and a short cover letter specifying your preferred department and available dates. We accept applications year-round and align start dates with university calendars.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-12 text-left">
              {[
                { step: "01", title: "Apply", desc: "Email your CV and cover letter to our HR team." },
                { step: "02", title: "Interview", desc: "Short interview with the department supervisor." },
                { step: "03", title: "Start", desc: "Onboarding, safety induction, and your first project." },
              ].map((s) => (
                <div key={s.step} className="relative">
                  <div className="text-orange-500 font-black text-3xl mb-2" style={{ fontFamily: "var(--font-display)" }}>{s.step}</div>
                  <h3 className="text-neutral-900 font-bold text-base mb-1">{s.title}</h3>
                  <p className="text-neutral-500 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>

            <Link href="/contact" className="btn-primary">
              Apply now <ArrowUpRight size={16} />
            </Link>
            <p className="text-neutral-400 text-xs mt-4">
              Or email directly: <a href="mailto:hr@gulfoflex.com" className="text-orange-600 hover:underline">hr@gulfoflex.com</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
