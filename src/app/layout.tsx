import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PageLoader from "@/components/layout/PageLoader";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";
import { CountryProvider } from "@/context/CountryContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gulfoflex.com"),
  title: {
    default: "Gulf-O-Flex® | Premium NBR Rubber Insulation | UAE Manufacturing Since 1993",
    template: "%s | Gulf-O-Flex®",
  },
  description:
    "Gulf-O-Flex® is a leading manufacturer of closed-cell NBR rubber insulation products for HVAC, Oil & Gas, Marine, and industrial applications. ISO certified. Made in UAE since 1993.",
  keywords: [
    "NBR rubber insulation",
    "closed cell elastomeric insulation",
    "HVAC insulation UAE",
    "rubber insulation manufacturer",
    "Gulf-O-Flex",
    "thermal insulation",
    "acoustic insulation",
    "pipe insulation",
    "duct insulation",
    "industrial insulation Middle East",
  ],
  authors: [{ name: "Gulf-O-Flex / Rubber World Industry" }],
  creator: "Rubber World Industry LLC",
  publisher: "Gulf-O-Flex",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gulfoflex.com",
    siteName: "Gulf-O-Flex",
    title: "Gulf-O-Flex® | Premium NBR Rubber Insulation Manufacturer",
    description:
      "Premium closed-cell NBR rubber insulation solutions engineered for HVAC, Oil & Gas, Marine, and industrial applications. ISO certified manufacturer in UAE since 1993.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gulf-O-Flex Premium Insulation Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Gulfoflex",
    creator: "@Gulfoflex",
    title: "Gulf-O-Flex® | Premium NBR Rubber Insulation",
    description: "Premium closed-cell NBR rubber insulation solutions for HVAC, Oil & Gas, Marine and industrial applications.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://gulfoflex.com",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* Preload hero video for LCP improvement */}
        <link rel="preload" href="/slidervideo.webm" as="video" type="video/webm" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F97316" />
        <meta name="geo.region" content="AE-AJ" />
        <meta name="geo.placename" content="Ajman" />
        <meta name="geo.position" content="25.4052;55.5136" />
        <meta name="ICBM" content="25.4052, 55.5136" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Gulf-O-Flex",
              legalName: "Rubber World Industry LLC",
              url: "https://gulfoflex.com",
              logo: "https://gulfoflex.com/logo.png",
              foundingDate: "1993",
              description:
                "Leading manufacturer of closed-cell NBR rubber insulation products for HVAC, Oil & Gas, Marine and industrial applications in the UAE and GCC region.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "New Industrial Area",
                addressLocality: "Ajman",
                addressCountry: "AE",
                postalCode: "2435",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+971-6-743-4176",
                contactType: "customer service",
                email: "info@gulfoflex.com",
                availableLanguage: ["English", "Arabic"],
              },
              sameAs: [
                "https://www.facebook.com/gulfoflex/",
                "https://www.linkedin.com/company/rubber-world-industries-l-l-c-",
                "https://twitter.com/Gulfoflex",
                "https://www.instagram.com/rubberworldindustry/",
              ],
              numberOfEmployees: { "@type": "QuantitativeValue", value: 500 },
              areaServed: ["AE", "SA", "KW", "QA", "BH", "OM", "Global"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Gulf-O-Flex Insulation Products",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Product", name: "Gulf-O-Flex NBR" } },
                  { "@type": "Offer", itemOffered: { "@type": "Product", name: "Gulf-O-Flex XLPE" } },
                  { "@type": "Offer", itemOffered: { "@type": "Product", name: "Gulf-O-Flex Sound" } },
                  { "@type": "Offer", itemOffered: { "@type": "Product", name: "Gulf-O-Flex Aluglass" } },
                ],
              },
            }),
          }}
        />
        {/* WebSite schema with SearchAction for sitelinks search box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Gulf-O-Flex",
              url: "https://gulfoflex.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://gulfoflex.com/gulf-o-flex-assist?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* LocalBusiness/Manufacturer schema for local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Manufacturer",
              name: "Gulf-O-Flex® by Rubber World Industry",
              image: "https://gulfoflex.com/logo.png",
              url: "https://gulfoflex.com",
              telephone: "+971-6-743-4176",
              email: "info@gulfoflex.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "New Industrial Area",
                addressLocality: "Ajman",
                addressRegion: "Ajman",
                postalCode: "2435",
                addressCountry: "AE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 25.4052,
                longitude: 55.5136,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
                opens: "08:00",
                closes: "17:00",
              },
              priceRange: "$$",
            }),
          }}
        />
        <GoogleAnalytics />
      </head>
      <body className="bg-neutral-50 text-neutral-100 font-sans antialiased" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        <PageLoader />
        <CountryProvider>
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </SmoothScroll>
        </CountryProvider>
      </body>
    </html>
  );
}
