import type { Metadata } from "next";
import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import CountryInitiativeBanner from "@/components/home/CountryInitiativeBanner";
import UAENetZeroSection from "@/components/home/UAENetZeroSection";
import Products from "@/components/home/Products";
import Industries from "@/components/home/Industries";
import Awards from "@/components/home/Awards";
import Projects from "@/components/home/Projects";
import GlobalPresence from "@/components/home/GlobalPresence";
import Certifications from "@/components/home/Certifications";
import Contact from "@/components/home/Contact";

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
      <Suspense fallback={null}>
        <GlobalPresence />
      </Suspense>
      <Certifications />
      <Contact />
    </>
  );
}


