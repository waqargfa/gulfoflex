import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import CountryInitiativeBanner from "@/components/home/CountryInitiativeBanner";

const UAENetZeroSection = dynamic(() => import("@/components/home/UAENetZeroSection"));
const Products = dynamic(() => import("@/components/home/Products"));
const Industries = dynamic(() => import("@/components/home/Industries"));
const Marquee = dynamic(() => import("@/components/home/Marquee"));
const Awards = dynamic(() => import("@/components/home/Awards"));
const ExperienceCTA = dynamic(() => import("@/components/home/ExperienceCTA"));
const Contact = dynamic(() => import("@/components/home/Contact"));

export const metadata: Metadata = {
  title: { absolute: "Gulf-O-Flex® | Engineering for the Extreme" },
  description:
    "Gulf-O-Flex® is the GCC's leading manufacturer of closed-cell NBR rubber insulation for HVAC. ISO 9001, FM Approved, UL Listed. Made in Ajman, UAE.",
  alternates: {
    canonical: "https://gulfoflex.com",
    languages: {
      en: "https://gulfoflex.com",
      "x-default": "https://gulfoflex.com",
    },
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CountryInitiativeBanner />
      <UAENetZeroSection />
      <Products />
      <Industries />
      <Marquee />
      <Awards />
      <ExperienceCTA />
      <Contact />
    </>
  );
}


