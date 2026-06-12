"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface CountryInitiative {
  badge?: string;
  title: string;
  tagline: string;
  themeColor: string;
  accentColor: string;
  metrics: { value: string; label: string }[];
  keyProjects: { name: string; type: string }[];
}

export interface CountryData {
  code: string;
  name: string;
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
  /* --- UAE --- */
  {
    code: "ae",
    name: "UAE",
    siteUrl: "https://gfa.rwims.com/uae",
    phone: "+971 6 743 4176",
    phoneHref: "tel:+97167434176",
    whatsapp: "+971 6 743 4176",
    whatsappHref: "https://wa.me/97167434176",
    email: "info@gulfoflex.com",
    address: "Ajman Industrial Area 2, Ajman, UAE",
    heroSubtitle:
      "Driving the UAE's Net Zero 2050 ambition certified low-carbon NBR & XLPE insulation for green buildings, clean energy, and sustainable infrastructure.",
    tagline: "UAE Net Zero 2050 — Insulation That Counts",
    initiative: {
      title: "UAE Net Zero 2050",
      tagline:
        "Gulf-O-Flex® insulation directly reduces building energy consumption and carbon emissions supporting the UAE's landmark Net Zero by 2050 Strategic Initiative.",
      themeColor: "#9a3f10",
      accentColor: "#f97316",
      metrics: [
        { value: "30%+", label: "Energy Saving per Project" },
        { value: "EPD", label: "Environmental Product Declaration" },
        { value: "56%", label: "GCC Market Share" },
      ],
      keyProjects: [
        { name: "SHARJAH AIRPORT NEW PASSENGER TERMINAL BUILDING", type: "UAE" },
        { name: "PALM SIX SENSES, DUBAI", type: "UAE" },
        { name: "DAMAC VOLTA TOWER, DUBAI", type: "UAE" },
        { name: "TILAL AL GHAF - RETAIL HUB PHASE 1", type: "UAE" },
        { name: "Mixed Use Development at Bousher", type: "Oman" },
        { name: "Barq Project at RAFO Airbase - Khassab", type: "Oman" },
        { name: "Luxury Service Apartments & Marina Club at Yiti", type: "Oman" },
      ],
    },
  },

  /* --- KSA --- */
  {
    code: "sa",
    name: "KSA",
    siteUrl: "https://gfa.rwims.com/ksa",
    phone: "+966 11 000 0000",
    phoneHref: "tel:+966110000000",
    whatsapp: "+966 11 000 0000",
    whatsappHref: "https://wa.me/966110000000",
    email: "ksa@gulfoflex.com",
    address: "Riyadh, Kingdom of Saudi Arabia",
    heroSubtitle:
      "Engineering the Kingdom's future — certified NBR & XLPE insulation for NEOM, Red Sea, Qiddiya and every Vision 2030 mega-project.",
    tagline: "Saudi Vision 2030 Aligned Insulation Partner",
    initiative: {
      badge: "Saudi Vision 2030 Aligned Partner",
      title: "Saudi Vision 2030",
      tagline:
        "Gulf-O-Flex® is actively supplying insulation solutions across Saudi Arabia's most ambitious Vision 2030 infrastructure and development projects.",
      themeColor: "#c2410c",
      accentColor: "#fb923c",
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

  /* --- Sri Lanka --- */
  {
    code: "lk",
    name: "Sri Lanka",
    siteUrl: "https://gfa.rwims.com/lk",
    phone: "+94 11 000 0000",
    phoneHref: "tel:+94110000000",
    whatsapp: "+94 11 000 0000",
    whatsappHref: "https://wa.me/94110000000",
    email: "srilanka@gulfoflex.com",
    address: "Colombo, Sri Lanka",
    heroSubtitle:
      "Supporting Sri Lanka's green recovery and Port City ambitions — NBR & XLPE insulation engineered for sustainable MEP, hospitality, and industrial projects.",
    tagline: "Green Economy Partner · Sri Lanka",
    initiative: {
      badge: "Sri Lanka Green Economy Partner",
      title: "Sri Lanka Green Economy",
      tagline:
        "Gulf-O-Flex® supports Sri Lanka's sustainable development agenda — delivering energy-efficient insulation for Port City Colombo, hospitality, and renewable energy infrastructure.",
      themeColor: "#7c3410",
      accentColor: "#f97316",
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

  /* --- Egypt --- */
  {
    code: "eg",
    name: "Egypt",
    siteUrl: "https://gfa.rwims.com/eg",
    phone: "+20 2 0000 0000",
    phoneHref: "tel:+20200000000",
    whatsapp: "+20 2 0000 0000",
    whatsappHref: "https://wa.me/20200000000",
    email: "egypt@gulfoflex.com",
    address: "Cairo, Egypt",
    heroSubtitle:
      "Insulating Egypt's New Republic — certified NBR & XLPE solutions for the New Administrative Capital, Benban Solar, and Egypt Vision 2030 mega-projects.",
    tagline: "Egypt Vision 2030 Infrastructure Partner",
    initiative: {
      badge: "Egypt Vision 2030 Partner",
      title: "Egypt Vision 2030",
      tagline:
        "Gulf-O-Flex® delivers certified thermal and acoustic insulation across Egypt's transformative Vision 2030 projects — from the New Administrative Capital to the world's largest solar park at Benban.",
      themeColor: "#7c2d12",
      accentColor: "#fb923c",
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

  /* --- Pakistan --- */
  {
    code: "pk",
    name: "Pakistan",
    siteUrl: "https://gfa.rwims.com/pk",
    phone: "+92 21 0000 0000",
    phoneHref: "tel:+922100000000",
    whatsapp: "+92 21 0000 0000",
    whatsappHref: "https://wa.me/922100000000",
    email: "pakistan@gulfoflex.com",
    address: "Karachi, Pakistan",
    heroSubtitle:
      "Powering Pakistan's CPEC corridor and energy agenda — premium NBR & XLPE insulation for power plants, industrial cities, and landmark construction projects.",
    tagline: "CPEC & Pakistan Development Insulation Partner",
    initiative: {
      badge: "CPEC & Pakistan Vision Partner",
      title: "CPEC & Pakistan Vision 2025",
      tagline:
        "Gulf-O-Flex® is a trusted insulation supplier across Pakistan's CPEC energy corridor and major infrastructure programmes — delivering certified performance in power, industrial, and residential projects.",
      themeColor: "#9a3f10",
      accentColor: "#f97316",
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

  /* --- Africa --- */
  {
    code: "za",
    name: "Africa",
    siteUrl: "https://gfa.rwims.com/africa",
    phone: "+27 11 000 0000",
    phoneHref: "tel:+27110000000",
    whatsapp: "+27 11 000 0000",
    whatsappHref: "https://wa.me/27110000000",
    email: "africa@gulfoflex.com",
    address: "Johannesburg, South Africa",
    heroSubtitle:
      "Insulating Africa's rise — NBR & XLPE solutions for the continent's energy, industrial, and smart-city projects under African Union Agenda 2063.",
    tagline: "African Union Agenda 2063 Infrastructure Partner",
    initiative: {
      badge: "AU Agenda 2063 Infrastructure Partner",
      title: "African Union Agenda 2063",
      tagline:
        "Gulf-O-Flex® supports Africa's continental transformation agenda — delivering high-performance insulation for energy, industrial, and urban infrastructure projects across the continent.",
      themeColor: "#92400e",
      accentColor: "#fb923c",
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
        { name: "Cote d'Ivoire Refinery", type: "Petrochemical" },
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
