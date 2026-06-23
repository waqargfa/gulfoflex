import type { Metadata } from "next";
import TestimonialsPage from "./TestimonialsPage";

export const metadata: Metadata = {
  title: "Customer Testimonials",
  description:
    "Hear from engineers, contractors, and facility managers worldwide who trust Gulf-O-Flex insulation products for their most critical projects. 90+ countries, 30+ years of excellence.",
  alternates: {
    canonical: "https://gulfoflex.com/testimonials",
  },
};

export default function Page() {
  return <TestimonialsPage />;
}
