"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface CountryInitiative {
  /** Short badge label, e.g. "Net Zero 2050 Partner" */
  badge: string;
  /** Display title of the national initiative */
  title: string;
  /** One-sentence description of Gulf-O-Flex's role in the initiative */
  tagline: string;
  /** Section headline colour (hex) */
  themeColor: string;
  /** Accent / highlight colour (hex) */
  accentColor: string;
  /** 4 stat cards shown in the banner and hero strip */
  metrics: { value: string; label: string }[];
  /** Chips listing key projects / programmes the initiative covers */
  keyProjects: { name: string; type: string }[];
}

export interface CountryData {
  code: string;
  name: string;
  flag: string;
  siteUrl: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  address: string;
  heroSubtitle: string;
  tagline: string;
  initiative?: CountryInitiative;
}

export const COUNTRIES: CountryData[] = [
  /* â”€â”€â”€ UAE â”€â”€â”€ */
  {
    code: "ae",
    name: "UAE",
    flag: "ðŸ‡¦ðŸ‡ª",
    siteUrl: "https://gfa.rwims.com/uae",
    phone: "+971 6 743 4176",
    phoneHref: "tel:+97167434176",
    whatsapp: "+971 6 743 4176",
    whatsappHref: "https://wa.me/97167434176",
    email: "info@gulfoflex.com",
    address: "Ajman Industrial Area 2, Ajman, UAE",
    heroSubtitle:
      "Driving the UAE's Net Zero 2050 ambition â€” certified low-carbon NBR & XLPE insulation for green buildings, clean energy, and sustainable infrastructure.",
    tagline: "UAE Net Zero 2050 â€” Insulation That Counts",
    initiative: {
      badge: "UAE Net Zero 2050 Aligned",
      title: "UAE Net Zero 2050",
      tagline:
        "Gulf-O-FlexÂ® insulation directly reduces building energy consumption and carbon emissions â€” supporting the UAE's landmark Net Zero by 2050 Strategic Initiative and the COP28 legacy agenda.",
      themeColor: "#0C4A6E",
      accentColor: "#10B981",
      metrics: [
        { value: "30%+", label: "Energy Saving per Project" },
        { value: "COP28", label: "Dubai Legacy Partner" },
        { value: "EPD", label: "Environmental Product Declaration" },
        { value: "56%", label: "GCC Market Share" },
      ],
      keyProjects: [
        { name: "Masdar City", type: "Clean Energy" },
        { name: "MBRS Solar Park", type: "Solar" },
        { name: "Barakah Nuclear", type: "Clean Power" },
        { name: "EXPO City Dubai", type: "Sustainable Urban" },
        { name: "Dubai Green Buildings", type: "Regulation" },
        { name: "Abu Dhabi 2030 Plan", type: "Urban Strategy" },
        { name: "Etihad Rail", type: "Green Transit" },
        { name: "UAE Hydrogen Roadmap", type: "Energy" },
        { name: "Al Maktoum Airport", type: "Mega Infrastructure" },
        { name: "Zayed Sustainability Prize", type: "ESG" },
        { name: "Dubai Metro Blue Line", type: "Transit" },
        { name: "Yas Bay Waterfront", type: "Development" },
      ],
    },
  },

  /* â”€â”€â”€ KSA â”€â”€â”€ */
  {
    code: "sa",
    name: "KSA",
    flag: "ðŸ‡¸ðŸ‡¦",
    siteUrl: "https://gfa.rwims.com/ksa",
    phone: "+966 11 000 0000",
    phoneHref: "tel:+966110000000",
    whatsapp: "+966 11 000 0000",
    whatsappHref: "https://wa.me/966110000000",
    email: "ksa@gulfoflex.com",
    address: "Riyadh, Kingdom of Saudi Arabia",
    heroSubtitle:
      "Engineering the Kingdom's future â€” certified NBR & XLPE insulation for NEOM, Red Sea, Qiddiya and every Vision 2030 mega-project.",
    tagline: "Saudi Vision 2030 Aligned Insulation Partner",
    initiative: {
      badge: "Saudi Vision 2030 Aligned Partner",
      title: "Saudi Vision 2030",
      tagline:
        "Gulf-O-FlexÂ® is actively supplying insulation solutions across Saudi Arabia's most ambitious Vision 2030 infrastructure and development projects.",
      themeColor: "#006C35",
      accentColor: "#C8A84B",
      metrics: [
        { value: "100+", label: "KSA Projects Delivered" },
        { value: "15+", label: "Vision 2030 Mega-Projects" },
        { value: "SASO", label: "Saudi Standards Compliant" },
        { value: "30+", label: "Years Serving the Kingdom" },
      ],
      keyProjects: [
        { name: "NEOM", type: "Smart City" },
        { name: "THE LINE", type: "Linear City" },
        { name: "Red Sea Project", type: "Tourism" },
        { name: "Qiddiya", type: "Entertainment" },
        { name: "Diriyah Gate", type: "Heritage" },
        { name: "King Salman Park", type: "Urban" },
        { name: "Saudi Aramco", type: "Oil & Gas" },
        { name: "SABIC", type: "Petrochemical" },
        { name: "SPARK", type: "Energy Park" },
        { name: "Riyadh Metro", type: "Transit" },
        { name: "Jafurah Gas Field", type: "Energy" },
        { name: "MODON Cities", type: "Industrial" },
      ],
    },
  },

  /* â”€â”€â”€ Sri Lanka â”€â”€â”€ */
  {
    code: "lk",
    name: "Sri Lanka",
    flag: "ðŸ‡±ðŸ‡°",
    siteUrl: "https://gfa.rwims.com/lk",
    phone: "+94 11 000 0000",
    phoneHref: "tel:+94110000000",
    whatsapp: "+94 11 000 0000",
    whatsappHref: "https://wa.me/94110000000",
    email: "srilanka@gulfoflex.com",
    address: "Colombo, Sri Lanka",
    heroSubtitle:
      "Supporting Sri Lanka's green recovery and Port City ambitions â€” NBR & XLPE insulation engineered for sustainable MEP, hospitality, and industrial projects.",
    tagline: "Green Economy Partner Â· Sri Lanka",
    initiative: {
      badge: "Sri Lanka Green Economy Partner",
      title: "Sri Lanka Green Economy",
      tagline:
        "Gulf-O-FlexÂ® supports Sri Lanka's sustainable development agenda â€” delivering energy-efficient insulation for Port City Colombo, hospitality, and renewable energy infrastructure.",
      themeColor: "#166534",
      accentColor: "#F59E0B",
      metrics: [
        { value: "50+", label: "Sri Lanka Projects" },
        { value: "Green", label: "Building Certified" },
        { value: "HVAC", label: "MEP Specialist" },
        { value: "ISO", label: "9001 Certified" },
      ],
      keyProjects: [
        { name: "Port City Colombo", type: "Smart City" },
        { name: "Central Expressway", type: "Infrastructure" },
        { name: "Colombo Port Expansion", type: "Maritime" },
        { name: "Renewable Energy 2030", type: "Clean Power" },
        { name: "Green Building Initiative", type: "Sustainability" },
        { name: "Tourism Resorts", type: "Hospitality" },
        { name: "Hambantota Port", type: "Logistics" },
        { name: "Western Province Dev.", type: "Urban" },
        { name: "LEED Buildings", type: "Green Certification" },
        { name: "CEB Power Plants", type: "Energy" },
      ],
    },
  },

  /* â”€â”€â”€ Egypt â”€â”€â”€ */
  {
    code: "eg",
    name: "Egypt",
    flag: "ðŸ‡ªðŸ‡¬",
    siteUrl: "https://gfa.rwims.com/eg",
    phone: "+20 2 0000 0000",
    phoneHref: "tel:+20200000000",
    whatsapp: "+20 2 0000 0000",
    whatsappHref: "https://wa.me/20200000000",
    email: "egypt@gulfoflex.com",
    address: "Cairo, Egypt",
    heroSubtitle:
      "Insulating Egypt's New Republic â€” certified NBR & XLPE solutions for the New Administrative Capital, Benban Solar, and Egypt Vision 2030 mega-projects.",
    tagline: "Egypt Vision 2030 Infrastructure Partner",
    initiative: {
      badge: "Egypt Vision 2030 Partner",
      title: "Egypt Vision 2030",
      tagline:
        "Gulf-O-FlexÂ® delivers certified thermal and acoustic insulation across Egypt's transformative Vision 2030 projects â€” from the New Administrative Capital to the world's largest solar park at Benban.",
      themeColor: "#7C2D12",
      accentColor: "#D4AF37",
      metrics: [
        { value: "75+", label: "Egypt Projects" },
        { value: "NAC", label: "New Capital Approved" },
        { value: "HVAC", label: "District Cooling" },
        { value: "ISO", label: "9001 Certified" },
      ],
      keyProjects: [
        { name: "New Administrative Capital", type: "Smart City" },
        { name: "Benban Solar Park", type: "Solar" },
        { name: "El Dabaa Nuclear", type: "Clean Power" },
        { name: "Suez Canal Zone", type: "Industrial" },
        { name: "Cairo Metro Expansion", type: "Transit" },
        { name: "Alexandria Smart City", type: "Urban" },
        { name: "National Axes Network", type: "Infrastructure" },
        { name: "Egypt Green Energy", type: "Renewables" },
        { name: "New Alamein City", type: "Development" },
        { name: "Grand Egyptian Museum", type: "Heritage" },
        { name: "Egypt Space Agency", type: "Technology" },
        { name: "Ain Sokhna Port", type: "Logistics" },
      ],
    },
  },

  /* â”€â”€â”€ Pakistan â”€â”€â”€ */
  {
    code: "pk",
    name: "Pakistan",
    flag: "ðŸ‡µðŸ‡°",
    siteUrl: "https://gfa.rwims.com/pk",
    phone: "+92 21 0000 0000",
    phoneHref: "tel:+922100000000",
    whatsapp: "+92 21 0000 0000",
    whatsappHref: "https://wa.me/922100000000",
    email: "pakistan@gulfoflex.com",
    address: "Karachi, Pakistan",
    heroSubtitle:
      "Powering Pakistan's CPEC corridor and energy agenda â€” premium NBR & XLPE insulation for power plants, industrial cities, and landmark construction projects.",
    tagline: "CPEC & Pakistan Development Insulation Partner",
    initiative: {
      badge: "CPEC & Pakistan Vision Partner",
      title: "CPEC & Pakistan Vision 2025",
      tagline:
        "Gulf-O-FlexÂ® is a trusted insulation supplier across Pakistan's CPEC energy corridor and major infrastructure programmes â€” delivering certified performance in power, industrial, and residential projects.",
      themeColor: "#14532D",
      accentColor: "#F0A500",
      metrics: [
        { value: "60+", label: "Pakistan Projects" },
        { value: "CPEC", label: "Corridor Active" },
        { value: "Power", label: "Plants Insulated" },
        { value: "ISO", label: "9001 Certified" },
      ],
      keyProjects: [
        { name: "CPEC Corridor", type: "Infrastructure" },
        { name: "Gwadar Port", type: "Logistics" },
        { name: "Lahore Orange Line", type: "Transit" },
        { name: "Thar Coal Complex", type: "Energy" },
        { name: "Ravi Riverfront City", type: "Urban" },
        { name: "Diamer-Bhasha Dam", type: "Hydro Power" },
        { name: "KARACHI Nuclear", type: "Clean Power" },
        { name: "Sahiwal Power Plant", type: "Energy" },
        { name: "Industrial Zones", type: "Industrial" },
        { name: "DHA Developments", type: "Real Estate" },
      ],
    },
  },

  /* â”€â”€â”€ Africa â”€â”€â”€ */
  {
    code: "za",
    name: "Africa",
    flag: "ðŸŒ",
    siteUrl: "https://gfa.rwims.com/africa",
    phone: "+27 11 000 0000",
    phoneHref: "tel:+27110000000",
    whatsapp: "+27 11 000 0000",
    whatsappHref: "https://wa.me/27110000000",
    email: "africa@gulfoflex.com",
    address: "Johannesburg, South Africa",
    heroSubtitle:
      "Insulating Africa's rise â€” NBR & XLPE solutions for the continent's energy, industrial, and smart-city projects under African Union Agenda 2063.",
    tagline: "African Union Agenda 2063 Infrastructure Partner",
    initiative: {
      badge: "AU Agenda 2063 Infrastructure Partner",
      title: "African Union Agenda 2063",
      tagline:
        "Gulf-O-FlexÂ® supports Africa's continental transformation agenda â€” delivering high-performance insulation for energy, industrial, and urban infrastructure projects across the continent.",
      themeColor: "#92400E",
      accentColor: "#FBBF24",
      metrics: [
        { value: "20+", label: "African Countries" },
        { value: "LNG", label: "Gas Projects Active" },
        { value: "Green", label: "Building Compliant" },
        { value: "ISO", label: "9001 Certified" },
      ],
      keyProjects: [
        { name: "Grand Inga Dam", type: "Hydro Power" },
        { name: "AfCFTA", type: "Trade Corridor" },
        { name: "Nigeria LNG", type: "Energy" },
        { name: "SA Renewable Energy", type: "Clean Power" },
        { name: "East Africa Oil Pipeline", type: "Oil & Gas" },
        { name: "Pan-African Rail", type: "Transit" },
        { name: "Nairobi Smart City", type: "Urban" },
        { name: "African Free Trade Zones", type: "Industrial" },
        { name: "Cape Town Green Precinct", type: "Sustainability" },
        { name: "Mozambique LNG", type: "Energy" },
        { name: "CÃ´te d'Ivoire Refinery", type: "Petrochemical" },
        { name: "Africa 2063 Corridors", type: "Infrastructure" },
      ],
    },
  },
];

interface CountryContextValue {
  country: CountryData;
  setCountry: (c: CountryData) => void;
  countries: CountryData[];
}

const CountryContext = createContext<CountryContextValue>({
  country: COUNTRIES[0],
  setCountry: () => {},
  countries: COUNTRIES,
});

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState<CountryData>(COUNTRIES[0]);
  return (
    <CountryContext.Provider value={{ country, setCountry, countries: COUNTRIES }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  return useContext(CountryContext);
}
