import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import CountryInitiativeBanner from "@/components/home/CountryInitiativeBanner";

const UAENetZeroSection = dynamic(() => import("@/components/home/UAENetZeroSection"));
const Products = dynamic(() => import("@/components/home/Products"));
const Industries = dynamic(() => import("@/components/home/Industries"));
const Marquee = dynamic(() => import("@/components/home/Marquee"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const Awards = dynamic(() => import("@/components/home/Awards"));
const Certifications = dynamic(() => import("@/components/home/Certifications"));
const Contact = dynamic(() => import("@/components/home/Contact"));

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
      <Products />
      <Industries />
      <Marquee />
      <Testimonials />
      <Awards />
      <Certifications />
      <Contact />
    </>
  );
}


