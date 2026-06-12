import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Gulf-O-Flex® Real-World Insulation Success Stories",
  description:
    "Explore Gulf-O-Flex® case studies - Sobha Hartland, Six Senses Palm Jumeirah and Qiddiya Water Theme Park. See how we solved real insulation challenges across the UAE and KSA.",
  alternates: { canonical: "https://gulfoflex.com/case-studies" },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
