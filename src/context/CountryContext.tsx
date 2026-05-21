"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface CountryData {
  code: string;
  name: string;
  flag: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  address: string;
  heroSubtitle: string;
  tagline: string;
}

export const COUNTRIES: CountryData[] = [
  {
    code: "ae",
    name: "UAE",
    flag: "🇦🇪",
    phone: "+971 6 743 4176",
    phoneHref: "tel:+97167434176",
    whatsapp: "+971 6 743 4176",
    whatsappHref: "https://wa.me/97167434176",
    email: "info@gulfoflex.com",
    address: "Ajman Industrial Area 2, Ajman, UAE",
    heroSubtitle:
      "Premium NBR & XLPE insulation for HVAC, oil & gas, marine and industrial systems — manufactured in Ajman, UAE.",
    tagline: "Supplying 56% of GCC Rubber Insulation Demand",
  },
  {
    code: "sa",
    name: "KSA",
    flag: "🇸🇦",
    phone: "+966 11 000 0000",
    phoneHref: "tel:+966110000000",
    whatsapp: "+966 11 000 0000",
    whatsappHref: "https://wa.me/966110000000",
    email: "ksa@gulfoflex.com",
    address: "Riyadh, Kingdom of Saudi Arabia",
    heroSubtitle:
      "Trusted partner for HVAC & industrial insulation across Saudi Arabia's Vision 2030 mega-projects.",
    tagline: "Your Trusted Insulation Partner in the Kingdom",
  },
  {
    code: "lk",
    name: "Sri Lanka",
    flag: "🇱🇰",
    phone: "+94 11 000 0000",
    phoneHref: "tel:+94110000000",
    whatsapp: "+94 11 000 0000",
    whatsappHref: "https://wa.me/94110000000",
    email: "srilanka@gulfoflex.com",
    address: "Colombo, Sri Lanka",
    heroSubtitle:
      "High-performance NBR rubber insulation solutions available across Sri Lanka for MEP and construction projects.",
    tagline: "Premium Insulation Solutions for Sri Lanka",
  },
  {
    code: "eg",
    name: "Egypt",
    flag: "🇪🇬",
    phone: "+20 2 0000 0000",
    phoneHref: "tel:+20200000000",
    whatsapp: "+20 2 0000 0000",
    whatsappHref: "https://wa.me/20200000000",
    email: "egypt@gulfoflex.com",
    address: "Cairo, Egypt",
    heroSubtitle:
      "Engineered insulation solutions for Egypt's rapidly expanding construction and industrial sectors.",
    tagline: "Leading Insulation Solutions Across Egypt",
  },
  {
    code: "pk",
    name: "Pakistan",
    flag: "🇵🇰",
    phone: "+92 21 0000 0000",
    phoneHref: "tel:+922100000000",
    whatsapp: "+92 21 0000 0000",
    whatsappHref: "https://wa.me/922100000000",
    email: "pakistan@gulfoflex.com",
    address: "Karachi, Pakistan",
    heroSubtitle:
      "Reliable NBR & XLPE insulation for Pakistan's HVAC, industrial and construction projects.",
    tagline: "Quality Insulation Products Across Pakistan",
  },
  {
    code: "za",
    name: "Africa",
    flag: "🌍",
    phone: "+27 11 000 0000",
    phoneHref: "tel:+27110000000",
    whatsapp: "+27 11 000 0000",
    whatsappHref: "https://wa.me/27110000000",
    email: "africa@gulfoflex.com",
    address: "Johannesburg, South Africa",
    heroSubtitle:
      "Expanding Gulf-O-Flex's footprint across Africa with world-class thermal and acoustic insulation.",
    tagline: "Powering Africa's Insulation Needs",
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
