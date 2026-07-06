import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gulfoflex.com";
  const now = new Date();

  const staticPages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/products", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/products/nbr", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/products/xlpe", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/products/sound", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/products/aluglass", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/products/aluclad", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/products/ultra", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/products/ultraline", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/products/accessories", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/industries", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/industries/hvac", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/industries/oil-gas", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/industries/marine", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/industries/district-cooling", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/industries/industrial", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/industries/oem", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/industries/data-center", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/industries/healthcare-hospitality", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/solutions", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/technologies", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/certifications", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/projects", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/case-studies", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/downloads", priority: 0.75, changeFrequency: "weekly" as const },
    { url: "/training", priority: 0.75, changeFrequency: "monthly" as const },
    { url: "/experience-centre", priority: 0.75, changeFrequency: "monthly" as const },
    { url: "/news", priority: 0.75, changeFrequency: "weekly" as const },
    { url: "/testimonials", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/careers", priority: 0.65, changeFrequency: "weekly" as const },
    { url: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/distributors", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/sustainability", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/faq", priority: 0.75, changeFrequency: "monthly" as const },
    { url: "/gulf-o-flex-assist", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/sitemap", priority: 0.3, changeFrequency: "monthly" as const },
    { url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
