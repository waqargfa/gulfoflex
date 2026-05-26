import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Products from "@/components/home/Products";
import Industries from "@/components/home/Industries";
import Certifications from "@/components/home/Certifications";
import Contact from "@/components/home/Contact";
import CountryInitiativeBanner from "@/components/home/CountryInitiativeBanner";
import UAENetZeroSection from "@/components/home/UAENetZeroSection";
import Projects from "@/components/home/Projects";
import Awards from "@/components/home/Awards";
import GlobalPresence from "@/components/home/GlobalPresence";

export const metadata: Metadata = {
  title: "Gulf-O-Flex® | Premium NBR Rubber Insulation Manufacturer | UAE Since 1993",
  description:
    "Gulf-O-Flex® is the GCC's leading manufacturer of closed-cell NBR rubber insulation. Trusted by engineers and contractors across 90+ countries. ISO 9001, FM Approved, UL Listed. Ajman, UAE.",
  alternates: {
    canonical: "https://gulfoflex.com",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CountryInitiativeBanner />
      <UAENetZeroSection />
      <Marquee />
      <Products />
      <Industries />
      <Awards />
      <Projects />
      <GlobalPresence />
      <Certifications />
      <Contact />
    </>
  );
}


