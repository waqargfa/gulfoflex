import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insulation Technologies | NBR, XLPE, Ultra, Sound, Cladding & AI Assist | Gulf-O-Flex®",
  description:
    "Explore Gulf-O-Flex® advanced insulation technologies - Closed-Cell NBR, NBR Ultra, NBR Ultra Line, XLPE, Acoustic Systems, Aluglass cladding, and the Gulf-O-Flex Assist AI platform for MEP engineers.",
  alternates: { canonical: "https://gulfoflex.com/technologies" },
};

export default function TechnologiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
