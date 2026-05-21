import type { Metadata } from "next";
import NewsExperience, { type Article } from "@/components/news/NewsExperience";

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

export default function NewsPage() {
  return <NewsExperience articles={articles} categories={categories} />;
}
