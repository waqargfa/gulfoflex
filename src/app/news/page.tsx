import type { Metadata } from "next";
import NewsExperience, { type Article, type GofEvent, type GalleryItem } from "@/components/news/NewsExperience";

export const metadata: Metadata = {
  title: "News & Media | Gulf-O-Flex® Press Releases & Industry News",
  description:
    "Latest news, press releases, and industry updates from Gulf-O-Flex® — the GCC's leading rubber insulation manufacturer. Stay current with product launches, certifications, and market insights.",
  alternates: { canonical: "https://gulfoflex.com/news" },
};

const articles: Article[] = [
  {
    title: "Gulf-O-Flex® Launches New Low-GWP Blowing Agent Formulation",
    date: "April 2026",
    iso: "2026-04-14",
    category: "Product Launch",
    color: "orange",
    summary:
      "Gulf-O-Flex® announces the commercial launch of its next-generation NBR rubber insulation using a zero-ODP, low-GWP blowing agent, reducing the product's environmental footprint by 40% without compromising thermal performance.",
    featured: true,
    readTime: 5,
    author: "GOF Newsroom",
    tags: ["NBR", "Sustainability", "Innovation"],
    trending: true,
    image: "/images/products/nbr-roll.webp",
  },
  {
    title: "Gulf-O-Flex® Achieves FM Approval for XLPE Range",
    date: "February 2026",
    iso: "2026-02-18",
    category: "Certification",
    color: "blue",
    summary:
      "After rigorous independent testing by Factory Mutual Global, Gulf-O-Flex® XLPE has received full FM Approval — one of the most demanding international fire and safety certifications in the insulation industry.",
    featured: true,
    readTime: 4,
    author: "Quality & Compliance",
    tags: ["XLPE", "FM Approved", "Fire Safety"],
    trending: true,
    image: "/images/products/xlpe-banner.jpg",
  },
  {
    title: "New Distribution Partnership Agreement Signed for South Korea",
    date: "December 2025",
    iso: "2025-12-09",
    category: "Distribution",
    color: "green",
    summary:
      "Gulf-O-Flex® has signed a strategic distribution agreement with Seoul-based HVAC materials specialist KoreaTech, extending our market reach to South Korea's fast-growing commercial construction and shipbuilding sectors.",
    readTime: 3,
    author: "Commercial Desk",
    tags: ["Partnership", "APAC", "HVAC"],
    trending: true,
    image: "/images/products/aluclad-2.webp",
  },
  {
    title: "Gulf-O-Flex® Sponsors Big 5 Global 2025",
    date: "November 2025",
    iso: "2025-11-26",
    category: "Events",
    color: "purple",
    summary:
      "Gulf-O-Flex® returns to Big 5 Global as a premium sponsor, showcasing our full product range at Stand C3-220. The four-day event at Dubai World Trade Centre attracted 85,000 construction industry professionals.",
    readTime: 3,
    author: "Marketing",
    tags: ["Big 5", "Dubai", "Trade Show"],
    image: "/images/products/aluclad-install.webp",
  },
  {
    title: "Saudi Arabia Manufacturing Facility Reaches Full Capacity",
    date: "September 2025",
    iso: "2025-09-17",
    category: "Operations",
    color: "cyan",
    summary:
      "Gulf-O-Flex® Saudi Arabia has reached full production capacity, enabling faster delivery times and enhanced support for the Kingdom's construction boom under Vision 2030. The facility produces 2.4 million metres of pipe insulation per month.",
    readTime: 4,
    author: "Operations",
    tags: ["KSA", "Vision 2030", "Manufacturing"],
    trending: true,
    image: "/images/products/nbr-banner.jpeg",
  },
  {
    title: "Gulf-O-Flex® Sound Insulation Specified for Riyadh Metro Phase 2",
    date: "August 2025",
    iso: "2025-08-12",
    category: "Projects",
    color: "orange",
    summary:
      "Gulf-O-Flex® Sound acoustic insulation has been officially specified by the Riyadh Metro Phase 2 design consultant, marking one of the largest acoustic insulation projects in the Middle East to date.",
    readTime: 5,
    author: "Projects Team",
    tags: ["Acoustics", "Metro", "Riyadh"],
    trending: true,
    image: "/images/products/sound-1.webp",
  },
  {
    title: "Gulf-O-Flex® Releases Updated Technical Specification Library",
    date: "June 2025",
    iso: "2025-06-05",
    category: "Technical",
    color: "blue",
    summary:
      "A comprehensive update to the Gulf-O-Flex® technical specification library is now available for download. The updated library includes revised thermal calculation guides, updated fire test reports, and new product datasheets.",
    readTime: 4,
    author: "Technical Services",
    tags: ["Datasheets", "Specifications", "Library"],
    image: "/images/products/aluglass-sheet.webp",
  },
  {
    title: "New Gulf Mark Certification Renewal Completed Ahead of Schedule",
    date: "April 2025",
    iso: "2025-04-21",
    category: "Certification",
    color: "green",
    summary:
      "Gulf-O-Flex® has successfully renewed its Gulf Mark certification for the NBR and XLPE product ranges, with the renewal completed three months ahead of expiry through our continuous quality monitoring programme.",
    readTime: 3,
    author: "Quality & Compliance",
    tags: ["Gulf Mark", "NBR", "XLPE"],
    image: "/images/products/aluglass-install.webp",
  },
];

const categories = [
  "All",
  "Product Launch",
  "Certification",
  "Distribution",
  "Events",
  "Operations",
  "Projects",
  "Technical",
];

const events: GofEvent[] = [
  {
    title: "Big 5 Global 2026",
    tagline: "Premium Sponsor · Stand C3-220",
    type: "Trade Show",
    color: "orange",
    startISO: "2026-11-23",
    endISO: "2026-11-26",
    dateLabel: "23 – 26 November 2026",
    location: "Dubai World Trade Centre, UAE",
    summary:
      "Experience the full Gulf-O-Flex® range at the largest construction event in the Middle East. Live demos, technical clinics, and exclusive previews of our 2027 product roadmap.",
    image: "/images/products/aluclad-install.webp",
    cta: { label: "Book a meeting", href: "/contact" },
    featured: true,
    status: "upcoming",
  },
  {
    title: "Saudi Build Riyadh 2026",
    tagline: "Vision 2030 Construction Summit",
    type: "Exhibition",
    color: "cyan",
    startISO: "2026-10-12",
    endISO: "2026-10-15",
    dateLabel: "12 – 15 October 2026",
    location: "Riyadh Front Expo Centre, KSA",
    summary:
      "Meet the Gulf-O-Flex® KSA team and discover how our locally manufactured rubber insulation is fuelling the Kingdom's mega-projects under Vision 2030.",
    image: "/images/products/nbr-banner.jpeg",
    cta: { label: "Add to calendar", href: "#" },
    status: "upcoming",
  },
  {
    title: "Acoustic Insulation Webinar",
    tagline: "Live technical session with our R&D team",
    type: "Webinar",
    color: "purple",
    startISO: "2026-07-09",
    endISO: "2026-07-09",
    dateLabel: "9 July 2026 · 14:00 GST",
    location: "Online · Microsoft Teams",
    summary:
      "Deep-dive into Gulf-O-Flex® Sound — STC ratings, installation best practices, and case studies from Riyadh Metro Phase 2.",
    image: "/images/products/sound-1.webp",
    cta: { label: "Register free", href: "#" },
    status: "upcoming",
  },
  {
    title: "MEP Expo Mumbai 2026",
    tagline: "Distributor & specifier meet",
    type: "Exhibition",
    color: "green",
    startISO: "2026-09-03",
    endISO: "2026-09-05",
    dateLabel: "3 – 5 September 2026",
    location: "Bombay Exhibition Centre, India",
    summary:
      "Gulf-O-Flex® returns to MEP Expo with our APAC distribution partners — featuring the new low-GWP NBR range and Aluclad jacketing systems.",
    image: "/images/products/aluclad-2.webp",
    cta: { label: "View details", href: "#" },
    status: "upcoming",
  },
  {
    title: "ISH Frankfurt 2025 — Recap",
    tagline: "Three days. 190+ qualified leads.",
    type: "Trade Show",
    color: "blue",
    startISO: "2025-03-17",
    endISO: "2025-03-21",
    dateLabel: "17 – 21 March 2025",
    location: "Messe Frankfurt, Germany",
    summary:
      "Our European debut at ISH Frankfurt set new benchmarks for engagement. Watch the highlight reel and download the post-show report.",
    image: "/images/products/xlpe-banner.jpg",
    cta: { label: "Watch recap", href: "#" },
    status: "past",
  },
  {
    title: "Gulf-O-Flex® Factory Open Day",
    tagline: "30 years of manufacturing excellence",
    type: "Open House",
    color: "orange",
    startISO: "2025-12-08",
    endISO: "2025-12-08",
    dateLabel: "8 December 2025",
    location: "RAK Industrial Park, UAE",
    summary:
      "Customers, partners and media joined us for guided tours of the production line, R&D lab and quality control facilities.",
    image: "/images/products/nbr-roll.webp",
    cta: { label: "View photos", href: "#" },
    status: "past",
  },
];

const gallery: GalleryItem[] = [
  { src: "/images/products/aluclad-install.webp", caption: "Aluclad jacketing — on-site, Dubai", tag: "Project" },
  { src: "/images/products/sound-2.webp", caption: "Sound insulation — Metro Phase 2", tag: "Acoustics" },
  { src: "/images/products/nbr-banner.jpeg", caption: "NBR production — KSA facility", tag: "Manufacturing" },
  { src: "/images/products/xlpe-banner.jpg", caption: "XLPE — FM Approved range", tag: "Certification" },
  { src: "/images/products/aluglass-install.webp", caption: "Aluglass install — Riyadh tower", tag: "Project" },
  { src: "/images/products/aluclad-2.webp", caption: "Aluclad — long-run delivery", tag: "Logistics" },
  { src: "/images/products/sound-1.webp", caption: "Acoustic test chamber", tag: "R&D" },
  { src: "/images/products/nbr-pipe.jpeg", caption: "Pipe section — pre-cut to spec", tag: "Product" },
];

export default function NewsPage() {
  return <NewsExperience articles={articles} categories={categories} events={events} gallery={gallery} />;
}
