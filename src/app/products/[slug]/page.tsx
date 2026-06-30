import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight, Download, CheckCircle2, ArrowLeft, Thermometer, Zap, Volume2, Layers, Shield, Package,
  Sparkles, ChevronRight, Award, FileText, Building2, Gauge, Flame, Droplets, ShieldCheck, Factory,
  Clock, Globe2, BadgeCheck, Phone, FileCheck2,
} from "lucide-react";
import PipeLayerSectionClient from "@/components/home/PipeLayerSectionClient";
import ProductAnimation from "@/components/products/ProductAnimation";
import PageHero from "@/components/layout/PageHero";

const products = {
  nbr: {
    name: "Gulf-O-Flex® NBR",
    icon: Thermometer,
    heroImage: "/images/products/nbr/White NBR_C10009.png",
    heroVideo: "/videos/products/nbr.mp4",
    shortName: "Closed-Cell NBR Rubber Insulation",
    tagline: "The benchmark for thermal and acoustic pipe insulation in HVAC and MEP applications across the Middle East.",
    color: "orange",
    description: [
      "Gulf-O-Flex® NBR is a Flexible Elastomeric Foam made of Nitrile Butadiene Rubber (NBR), available in thicknesses from 6mm to 50mm in both sheet (with or without self-adhesive) and tube forms. Its closed-cell structure is a self-sustaining, passive solution to energy efficiency requiring no active maintenance to deliver consistent thermal and acoustic performance.",
      "With outstanding resistance to moisture vapor, mold, and mildew growth, Gulf-O-Flex® NBR ensures long service life, minimal downtime, and continuing efficiency across HVAC, district cooling, hot & cold water plumbing, refrigeration, and industrial applications. CFC and HCFC free with zero ODP FM Approved, UL Listed, and EPD Verified.",
    ],
    features: [
      "Closed-cell structure, water absorption only 0.16 vol% (ASTM C534)",
      "Zero water vapour transmission, 0.00 Perm in (ASTM E96/96M)",
      "Self-extinguishing, Class O fire rated (BS 476 & ASTM E84)",
      "FSI ≤ 25, SDI ≤ 50, verified per ASTM E84 / UL 723",
      "Zero ODP, CFC and HCFC free, helps reduce greenhouse gas emissions",
      "Anti-microbial: resists mold and mildew growth for long service life",
      "High flexibility, covers pipes, bends, ducts, tanks, vessels and flat surfaces",
      "Available with or without self-adhesive application",
    ],
    specs: [
      { label: "Thermal Conductivity (λ)", value: "0.0321 W/m·K at 35°C (ASTM C518-17)" },
      { label: "Operating Temperature", value: "-40°C to +105°C (ASTM C 534)" },
      { label: "Density", value: "50–70 kg/m³ (ASTM C 302-13)" },
      { label: "Fire Rating", value: "Class O - FSI ≤ 25, SDI ≤ 50" },
      { label: "Water Absorption", value: "0.16 vol% (ASTM C534 / C209-2015)" },
      { label: "Water Vapour Transmission", value: "0.00 Perm in (ASTM E96/96M)" },
      { label: "Vapour Diffusion Factor (μ)", value: "> 7,300 (ASTM E96/96M)" },
      { label: "NRC - 13mm / 19mm / 25mm", value: "0.30 / 0.40 / 0.45 (ASTM C423-01)" },
      { label: "Cell Structure", value: "Closed Cell" },
      { label: "Thickness Range", value: "6mm to 50mm" },
      { label: "Available Forms", value: "Tubes, Sheets" },
      { label: "Color", value: "Black (standard)" },
    ],
    certifications: ["ISO 9001", "FM Approved", "UL Listed", "EPD Verified", "BS 476 Part 6 & 7", "ASTM E84 / UL 723"],
    applications: [
      "Hot & Cold Water Plumbing",
      "Refrigeration Lines",
      "HVAC Ducts & Duct Liner",
      "District Cooling Networks",
      "Industrial Process Piping",
      "Plumbing Condensation Control",
    ],
    gallery: [
      { src: "/images/products/nbr/White NBR_C10009.png", alt: "Gulf-O-Flex NBR closed-cell rubber insulation" },
      { src: "/images/products/nbr/White NBR_C20009.png", alt: "Gulf-O-Flex NBR pipe insulation" },
      { src: "/images/products/nbr/White NBR_C30009.png", alt: "Gulf-O-Flex NBR sheet insulation" },
      { src: "/images/products/nbr/White NBR_C40009.png", alt: "Gulf-O-Flex NBR insulation application" },
    ],
    downloads: [
      { name: "NBR Product Datasheet", format: "PDF", size: "2.4 MB" },
      { name: "NBR Installation Guide", format: "PDF", size: "1.8 MB" },
      { name: "Compliance Certificates", format: "PDF", size: "3.2 MB" },
    ],
  },
  xlpe: {
    name: "Gulf-O-Flex® XLPE",
    icon: Zap,
    heroImage: "/images/products/xlpe/xlpe.png",
    heroVideo: "/videos/products/xlpe.mp4",
    shortName: "Chemically Crosslinked Polyethylene Foam",
    tagline: "Closed-cell elastomeric XLPE foam with alupet facing - a passive, self-sustaining solution for thermal and acoustic insulation in demanding environments.",
    color: "neutral",
    description: [
      "Gulf-O-Flex® XLPE is a chemically crosslinked polyethylene closed-cell foam, finished with a thin layer of alupet facing and engineered for difficult environments in the long term. Its thin-layer, lightweight construction allows it to withstand high-pressure environments while delivering reliable thermal and acoustic performance.",
      "As a passive solution to energy efficiency, XLPE requires no active maintenance to perform - making it an asset across HVAC, ductwork, automotive, marine, and industrial insulation applications. Self-extinguishing with Class O fire rating per BS 476.",
    ],
    features: [
      "Closed-cell chemically crosslinked polyethylene structure",
      "Factory-applied alupet facing for vapour and surface protection",
      "Self-extinguishing - Class O (BS 476 Part 6 & 7)",
      "FSI ≤ 25, SDI ≤ 50 (ASTM E84)",
      "Excellent water vapour barrier - μ ≥ 11,000 (foil side)",
      "Withstands high-pressure environments - thin & lightweight",
      "Superior thermal and acoustic insulation properties",
      "Low water absorption (≤ 2%) - long-term durability",
    ],
    specs: [
      { label: "Material", value: "Chemically Crosslinked Polyethylene Foam" },
      { label: "Cell Structure", value: "Closed Cell" },
      { label: "Density", value: "22–45 kg/m³ (ASTM D 3575)" },
      { label: "Thermal Conductivity (λ)", value: "0.045 W/m·K at 35°C (ASTM C518)" },
      { label: "Operating Temperature", value: "-183°C to +115°C (ASTM D 3575)" },
      { label: "Water Absorption", value: "≤ 2% (ASTM D 1056)" },
      { label: "Water Vapour Transmission (foil side)", value: "0.041 g/m²/24h over 7 days (ASTM E96)" },
      { label: "Vapour Diffusion Factor (μ) - Foam", value: "≥ 8,000 (BS EN 12086)" },
      { label: "Vapour Diffusion Factor (μ) - Foil", value: "≥ 11,000 (BS EN 12086)" },
      { label: "Fire Rating", value: "BS 476 Part 6 Class O / Part 7 Class O" },
      { label: "Surface Burning", value: "FSI ≤ 25, SDI ≤ 50 (ASTM E84)" },
      { label: "Flammability", value: "Self-Extinguishing" },
      { label: "Facing", value: "Alupet (thin layer)" },
    ],
    certifications: ["BS 476 Part 6 & 7", "ASTM E84", "ASTM C518", "ASTM D 3575", "ISO 9001"],
    applications: ["HVAC Ductwork", "Underfloor Heating Systems", "Marine Insulation", "Automotive Soundproofing", "Construction Insulation", "Industrial Process Piping"],
    gallery: [
      { src: "/images/products/xlpe/xlpe.png", alt: "Gulf-O-Flex XLPE closed-cell foam" },
      { src: "/images/products/xlpe/xlpe-2.png", alt: "XLPE foam with alupet facing" },
      { src: "/images/products/xlpe/xlpe-3.png", alt: "XLPE insulation roll" },
      { src: "/images/products/xlpe/xlpe-4.png", alt: "XLPE pipe insulation application" },
    ],
    downloads: [
      { name: "XLPE Product Datasheet", format: "PDF", size: "1.9 MB" },
      { name: "XLPE Technical Guide", format: "PDF", size: "1.5 MB" },
    ],
  },
  sound: {
    name: "Gulf O Sound",
    icon: Volume2,
    heroImage: "/images/products/sound-product.png",
    shortName: "Open-Cell Acoustic Elastomeric Foam",
    tagline: "Flexible open-cell elastomeric foam engineered to absorb sound and dampen vibration in HVAC/R, pipelines, plant rooms and industrial environments.",
    color: "neutral",
    description: [
      "Gulf O Sound is a flexible, open-cell elastomeric foam that is intended to absorb sound. It is ideal for acoustic insulation in pipelines, HVAC/R systems, buildings, and industrial applications due to its viscoelastic qualities, open-cell structure, and superior air flow resistance. It combines superior insulating qualities with acoustic performance.",
      "Its resistance to moisture vapor, mold and mildew growth ensures that its applications have a long lifespan, less downtime and continuing efficiency. Engineered with a higher density than other acoustic insulations, each thickness of Gulf O Sound delivers distinct Noise Reduction Coefficient (NRC) values across frequencies - making it a superior acoustic insulation. Made from 100% recycled materials.",
    ],
    features: [
      "High flexibility - easily covers tanks, large-diameter pipes, ducts, vessels and flat surfaces",
      "Absorbs most sounds and vibrations - ideal as duct liner and equipment noise insulation",
      "Excellent acoustic insulation for plant rooms and wall partitions",
      "Easy installation - cut, bend, apply and seal without additional steps",
      "Resistant to moisture vapor, mold and mildew growth",
      "Open-cell structure with superior air flow resistance",
      "Class O fire performance (BS 476 Part 7)",
      "Made from 100% recycled materials",
    ],
    specs: [
      { label: "Operating Temperature", value: "-20°C to +85°C (EN 14706)" },
      { label: "Density", value: "210 ± 30 kg/m³ (ASTM D1622)" },
      { label: "Thermal Conductivity", value: "0.058 W/m·K at 0°C (ASTM C518)" },
      { label: "Fire Performance", value: "Class O (BS 476 Part 7)" },
      { label: "NRC - 6 / 10 / 15 mm", value: "0.15 / 0.40 / 0.60" },
      { label: "NRC - 20 / 25 / 50 mm", value: "0.65 / 0.70 / 1.00" },
      { label: "Thickness Range", value: "6mm to 50mm (sheet form)" },
      { label: "Cell Structure", value: "Open Cell" },
      { label: "Material", value: "Elastomeric foam, 100% recycled" },
    ],
    certifications: ["BS 476 Part 7", "EN 14706", "ASTM D1622", "ASTM C518"],
    applications: ["HVAC Duct Liner", "Plant Room Acoustic Insulation", "Conference Rooms & Cabin Partitions", "OEM Equipment (Generators)", "Wall Partitions", "Oil & Gas / Automotive / Construction"],
    gallery: [
      { src: "/images/products/sound-product.png", alt: "Gulf O Sound open-cell acoustic foam" },
      { src: "/images/products/sound-1.webp", alt: "Gulf O Sound insulation sheet" },
      { src: "/images/products/sound-2.webp", alt: "Gulf O Sound acoustic application" },
    ],
    downloads: [
      { name: "Gulf O Sound Product Datasheet", format: "PDF", size: "2.1 MB" },
      { name: "Acoustic Design Guide", format: "PDF", size: "3.4 MB" },
    ],
  },
  aluglass: {
    name: "Gulf-O-Flex® Aluglass",
    icon: Layers,
    heroImage: "/images/products/aluglass/White Aluglass_C1.0010016.png",
    heroVideo: "/videos/products/aluglass.mp4",
    shortName: "NBR Elastomeric Foam with Aluglass Facing",
    tagline: "Best-selling rubber insulation finished with a factory-applied aluminum glass cloth facing - a passive, self-sustaining solution for energy efficiency.",
    color: "neutral",
    description: [
      "Gulf-O-Flex® Aluglass is a Flexible Elastomeric Foam made of Nitrile Butadiene Rubber (NBR), available in thicknesses from 6mm to 50mm in both sheet (with or without self-adhesive) and tube forms, finished with a factory-applied Aluglass facing. The closed-cell structure delivers consistent thermal insulation performance with no need for active maintenance - a passive solution to energy efficiency.",
      "Its resistance to moisture vapor, mold, and mildew growth ensures applications enjoy a long lifespan, less downtime, and continuing efficiency. Lightweight, highly flexible, and able to undergo heavy stress without breakage - ideal for pipes, bends, ducts, tanks, vessels, and flat surfaces. CFC and HCFC free with zero ODP. FM Approved, UL Listed, and EPD Verified.",
    ],
    features: [
      "Factory-applied Aluglass facing - 7 μm aluminum + 110 GSM glass fiber cloth",
      "High tensile strength - 250 N/25mm (ASTM D828)",
      "Closed-cell NBR foam - water absorption only 0.09 vol%",
      "Zero water vapour transmission - 0.00 Perm in (ASTM E96/96M)",
      "Water vapour diffusion resistance factor (μ) 76,366 (BS EN 12086:2013)",
      "Self-extinguishing - Class O fire rated (BS 476 Parts 6 & 7)",
      "FSI ≤ 25, SDI ≤ 50 - verified per ASTM E84 / UL 723",
      "Zero ODP - CFC and HCFC free, helps reduce greenhouse gas emissions",
      "High flexibility - covers pipes, bends, ducts, tanks, vessels and flat surfaces",
      "Available in sheet (with or without self-adhesive) and tube forms",
    ],
    specs: [
      { label: "Material", value: "Flexible Elastomeric Foam (NBR)" },
      { label: "Cell Structure", value: "Closed Cell" },
      { label: "Density", value: "50–70 kg/m³ (ASTM C 302-13 / BS EN 1602:2013)" },
      { label: "Thermal Conductivity (λ)", value: "0.0321 W/m·K at 35°C (ASTM C518-17)" },
      { label: "Operating Temperature", value: "-183°C to +105°C (ASTM C 534)" },
      { label: "Water Absorption", value: "0.09 vol% (ASTM C534 / C534M-20 / ASTM C 209-2015)" },
      { label: "Water Vapour Transmission", value: "0.00 Perm in (ASTM E96/96M)" },
      { label: "Vapour Diffusion Factor (μ)", value: "76,366 (BS EN 12086:2013)" },
      { label: "Aluminium Foil", value: "7 microns" },
      { label: "Glass Fiber Cloth", value: "110 GSM" },
      { label: "Tensile Strength", value: "250 N/25mm (ASTM D828)" },
      { label: "Flammability", value: "Self-Extinguishing" },
      { label: "Fire Rating", value: "BS 476 Part 6 & Part 7 Class O" },
      { label: "Surface Burning", value: "FSI ≤ 25, SDI ≤ 50 (ASTM E84 / UL 723)" },
      { label: "Thickness Range", value: "6mm to 50mm" },
      { label: "Available Forms", value: "Sheets, Tubes" },
    ],
    certifications: ["FM Approved", "UL Listed", "EPD Verified", "ISO 9001", "BS 476 Part 6 & 7", "ASTM E84 / UL 723"],
    applications: [
      "Hot & Cold Water Plumbing",
      "Refrigeration Lines",
      "HVAC Ducts",
      "Residential & Commercial Properties",
      "Construction",
      "Oil & Gas",
      "Automotive Industry",
    ],
    gallery: [
      { src: "/images/products/aluglass/White Aluglass_C1.0010016.png", alt: "Gulf-O-Flex Aluglass insulation" },
      { src: "/images/products/aluglass/White Aluglass_C2.0010016.png", alt: "Aluglass pipe insulation" },
      { src: "/images/products/aluglass/White Aluglass_C3.0010016.png", alt: "Aluglass sheet insulation" },
      { src: "/images/products/aluglass/White Aluglass_C4.0010016.png", alt: "Aluglass application" },
    ],
    downloads: [
      { name: "Aluglass Product Datasheet", format: "PDF", size: "1.6 MB" },
    ],
  },
  aluclad: {
    name: "Gulf-O-Flex® Aluclad",
    icon: Shield,
    heroImage: "/images/products/aluclad/White Aluclad_C1.0010048.png",
    heroVideo: "/videos/products/aluclad.mp4",
    shortName: "NBR Foam with Alu-Clad Facing",
    tagline: "Best-selling closed-cell NBR insulation with factory-applied Alu-Clad facing - a passive, self-sustaining solution for outdoor and mechanical systems.",
    color: "orange",
    description: [
      "Gulf-O-Flex® Aluclad is a Flexible Elastomeric Foam made of Nitrile Butadiene Rubber (NBR), available in thicknesses from 6mm to 50mm in both sheet (with or without self-adhesive) and tube forms. The insulation is finished with a factory-applied Alu-Clad facing, making it ready for external applications - the facing protects the foam from UV rays and minor mechanical damage.",
      "A passive solution to energy efficiency, Aluclad needs no active maintenance to deliver consistent thermal performance. Its lightweight, flexible structure resists heavy stress without breakage, while exceptional resistance to moisture vapor, mold, and mildew ensures long lifespan, reduced downtime, and continuing efficiency across mechanical and outdoor systems.",
    ],
    features: [
      "Factory-applied Alu-Clad facing - UV protected, no further cladding required",
      "Closed-cell NBR foam - water absorption only 0.16 vol% (ASTM C534)",
      "Zero water vapour transmission - 0.00 Perm in (ASTM E96/96M)",
      "Self-extinguishing - Class O (BS 476 Part 6 & 7)",
      "FSI ≤ 25, SDI ≤ 50 (ASTM E84 / UL 723)",
      "UV stability - over 10,000 hours with no surface cracking (8 years)",
      "Zero ODP - CFC and HCFC free, sustainable & energy efficient",
      "Available in sheet or tube form, with or without self-adhesive",
    ],
    specs: [
      { label: "Material", value: "Flexible Elastomeric Foam (NBR) with Alu-Clad facing" },
      { label: "Cell Structure", value: "Closed Cell" },
      { label: "Density", value: "50–70 kg/m³ (ASTM C 302-13 / BS EN 1602:2013)" },
      { label: "Thermal Conductivity (λ)", value: "0.0321 W/m·K at 35°C (ASTM C518-17)" },
      { label: "Operating Temperature", value: "-40°C to +105°C (ASTM C 534)" },
      { label: "Water Absorption", value: "0.16 vol% (ASTM C534 / C209-2015)" },
      { label: "Water Vapour Transmission", value: "0.00 Perm in (ASTM E96/96M)" },
      { label: "Vapour Diffusion Factor (μ)", value: "> 76,366 (BS EN 12086:2013)" },
      { label: "Fire Rating", value: "BS 476 Part 6 & Part 7 Class O" },
      { label: "Surface Burning", value: "FSI ≤ 25, SDI ≤ 50 (ASTM E84 / UL 723)" },
      { label: "Foil Thickness", value: "0.230 ± 0.05 mm (340 g/m²)" },
      { label: "Foil Tensile Strength", value: "200 N/15 mm (EN ISO 527-3)" },
      { label: "Foil Elongation at Break", value: "48% (EN ISO 527-3)" },
      { label: "Foil Tear Strength", value: "70 N (EN ISO 527-3)" },
      { label: "UV Stability", value: "8 Years (internal weatherometer test)" },
      { label: "Emissivity", value: "0.065" },
      { label: "Thickness Range", value: "6mm to 50mm" },
      { label: "Available Forms", value: "Tubes, Sheets" },
    ],
    certifications: ["FM Approved", "UL Listed", "EPD Verified", "BS 476 Part 6 & 7", "ASTM E84 / UL 723", "ISO 9001"],
    applications: [
      "Hot & Cold Water Plumbing",
      "Refrigeration Lines",
      "HVAC Ducts",
      "Outdoor / External Pipework",
      "Residential & Commercial Properties",
      "Construction, Oil & Gas, Automotive",
    ],
    gallery: [
      { src: "/images/products/aluclad/White Aluclad_C1.0010048.png", alt: "Gulf-O-Flex Aluclad insulation" },
      { src: "/images/products/aluclad/White Aluclad_C2.0010048.png", alt: "Aluclad pipe jacketing" },
      { src: "/images/products/aluclad/White Aluclad_C3.0010048.png", alt: "Aluclad sheet insulation" },
      { src: "/images/products/aluclad/White Aluclad_C4.0010048.png", alt: "Aluclad outdoor application" },
    ],
    downloads: [
      { name: "Aluclad Product Datasheet", format: "PDF", size: "1.8 MB" },
      { name: "Aluclad Brochure", format: "PDF", size: "2.4 MB" },
      { name: "Compliance Certificates", format: "PDF", size: "3.0 MB" },
    ],
  },
  ultra: {
    name: "Gulf-O-Flex® Ultra",
    icon: Sparkles,
    heroImage: "/images/products/ultra/ultra.png",
    shortName: "Ultra-Low Conductivity Premium Elastomeric Foam",
    tagline: "Next-generation closed-cell NBR/EPDM hybrid insulation with ultra-low thermal conductivity for the most demanding HVAC, refrigeration, and chilled-water applications.",
    color: "orange",
    description: [
      "Gulf-O-Flex® Ultra is a premium closed-cell elastomeric foam engineered with an advanced NBR/EPDM polymer blend to deliver an industry-leading thermal conductivity of just 0.030 W/m·K at 0°C. Available in sheet (with or without self-adhesive) and tube forms from 6mm to 50mm, it brings measurable energy savings and longer service life to chilled water, district cooling, refrigeration, and low-temperature process lines.",
      "Ultra extends the proven Gulf-O-Flex® platform with enhanced UV resistance, an extended operating window from -50°C to +115°C, and an ultra-high water vapour diffusion resistance factor (μ > 7,300). FM Approved, UL Listed and EPD Verified - Zero ODP, CFC and HCFC free, and certified Class O for fire safety.",
    ],
    features: [
      "Ultra-low thermal conductivity - λ 0.030 W/m·K at 0°C (ASTM C518)",
      "Extended operating temperature - -50°C to +115°C",
      "Advanced NBR/EPDM polymer blend - improved UV & ozone resistance",
      "Water vapour diffusion resistance factor μ > 10,000 (BS EN 12086)",
      "Water absorption ≤ 0.10 vol% (ASTM C534)",
      "Self-extinguishing - Class O (BS 476 Part 6 & 7)",
      "FSI ≤ 25, SDI ≤ 50 (ASTM E84 / UL 723)",
      "Zero ODP, CFC & HCFC free - EPD Verified low embodied carbon",
      "Anti-microbial - resists mould and mildew growth",
      "Available in sheet and tube forms, 6–50mm",
    ],
    specs: [
      { label: "Material", value: "Closed-Cell NBR/EPDM Elastomeric Foam" },
      { label: "Thermal Conductivity (λ)", value: "0.030 W/m·K at 0°C (ASTM C518)" },
      { label: "Operating Temperature", value: "-50°C to +115°C (ASTM C534)" },
      { label: "Density", value: "55–80 kg/m³ (ASTM C302-13)" },
      { label: "Water Absorption", value: "≤ 0.10 vol% (ASTM C534)" },
      { label: "Water Vapour Transmission", value: "0.00 Perm in (ASTM E96/96M)" },
      { label: "Vapour Diffusion Factor (μ)", value: "> 10,000 (BS EN 12086)" },
      { label: "Fire Rating", value: "BS 476 Part 6 & Part 7 Class O" },
      { label: "Surface Burning", value: "FSI ≤ 25, SDI ≤ 50 (ASTM E84 / UL 723)" },
      { label: "Cell Structure", value: "Closed Cell" },
      { label: "Thickness Range", value: "6mm to 50mm" },
      { label: "Available Forms", value: "Sheets, Tubes" },
    ],
    certifications: ["ISO 9001", "FM Approved", "UL Listed", "EPD Verified", "BS 476 Part 6 & 7", "ASTM E84 / UL 723"],
    applications: [
      "Chilled Water & District Cooling",
      "Low-Temperature Refrigeration",
      "Cryogenic & Process Piping",
      "Premium HVAC Systems",
      "Pharmaceutical & Data Centre Cooling",
      "Cold Storage Facilities",
    ],
    gallery: [
      { src: "/images/products/ultra/ultra.png", alt: "Gulf-O-Flex Ultra premium elastomeric foam" },
      { src: "/images/products/ultra/ultra-1.png", alt: "Ultra NBR/EPDM insulation close-up" },
    ],
    downloads: [
      { name: "Ultra Product Datasheet", format: "PDF", size: "2.6 MB" },
      { name: "Ultra Installation Guide", format: "PDF", size: "1.9 MB" },
      { name: "Compliance Certificates", format: "PDF", size: "3.2 MB" },
    ],
  },
  ultraline: {
    name: "Gulf-O-Flex® UltraLine",
    icon: Layers,
    heroImage: "/images/products/ultraline/ultraline.png",
    shortName: "Pre-Jacketed UV-Resistant Line-Set Insulation",
    tagline: "Next-generation pre-jacketed, UV-resistant flexible elastomeric line-set insulation - combining a closed-cell NBR/PVC foam core with a co-extruded polymeric jacket for superior outdoor protection.",
    color: "neutral",
    description: [
      "Gulf-O-Flex® UltraLine is a next-generation line-set insulation combining a closed-cell NBR/PVC elastomeric foam core with a co-extruded UV-resistant polymeric jacket. It delivers superior protection against thermal loss, condensation, UV radiation, and mechanical damage, eliminating the need for field-applied coating or additional jacketing.",
      "Designed for outdoor refrigerant and condensate lines, roof-mounted piping, and exposed installations in tropical and coastal conditions, UltraLine provides an operating temperature range of -70°C to +105°C with peaks up to 121°C. Available in ID sizes from 1/4\" to 2-5/8\" with wall thicknesses of 1/2\", 3/4\", and 1\".",
    ],
    features: [
      "Co-extruded UV-resistant polymeric jacket - no field coating required",
      "Closed-cell NBR/PVC elastomeric foam core - excellent thermal performance",
      "Thermal conductivity 0.036 W/m·K (0.230 Btu·in/hr·ft²·°F) at 24°C mean",
      "UV resistance - no deterioration after 5,000 hours (ASTM G154)",
      "Water vapor permeability < 0.00 perm-in (ASTM E96)",
      "25/50 FSI/SDI rated (ASTM E84, UL 723, CAN/ULC S102.2)",
      "Operating temperature range -70°C to +105°C (peaks to 121°C)",
      "Tensile strength 1,200 psi minimum (ASTM D412)",
      "pH neutral - zero corrosion risk (DIN 1988)",
      "Dimensional stability < 7% linear shrinkage (ASTM C534)",
    ],
    specs: [
      { label: "Main Composition", value: "Flame-retardant NBR/PVC elastomeric foam with proprietary copolymer blend jacket" },
      { label: "Thermal Conductivity", value: "0.036 W/m·K (0.230 Btu·in/hr·ft²·°F) at 24°C mean (ASTM C177)" },
      { label: "Density", value: "3–6 lb/ft³ (ASTM D1667)" },
      { label: "Operating Temperature", value: "-57°C to +104°C / -70°F to +220°F (ASTM C534)" },
      { label: "Water Vapor Permeability", value: "< 0.00 perm-in (ASTM E96)" },
      { label: "Dimensional Stability", value: "< 7% Linear Shrinkage (ASTM C534)" },
      { label: "Corrosion Risk", value: "pH neutral (DIN 1988)" },
      { label: "UV Resistance", value: "Excellent - No Deterioration, 5,000 hours (ASTM G154)" },
      { label: "Flammability", value: "25/50 FSI/SDI Rated (ASTM E84, UL 723, CAN/ULC S102.2)" },
      { label: "Tensile Strength", value: "1,200 psi min. (ASTM D412)" },
      { label: "Hot Surface Performance", value: "Pass at 250°F / 121°C (ASTM C411, NFPA 90A)" },
      { label: "ID Range", value: '1/4" to 2-5/8" (6 mm to 67 mm)' },
      { label: "Wall Thickness", value: '1/2" (13 mm) / 3/4" (19 mm) / 1" (25 mm)' },
      { label: "Pipe R-Values (1/2\" wall)", value: "3.5 – 4.9" },
      { label: "Pipe R-Values (3/4\" wall)", value: "5.6 – 6.1" },
      { label: "Pipe R-Values (1\" wall)", value: "6 – 10.2" },
    ],
    certifications: ["ASTM E84 / UL 723", "CAN/ULC S102.2", "ASTM C534", "ASTM G154", "NFPA 90A", "FM Approved"],
    applications: [
      "Outdoor Refrigerant & Condensate Lines (VRF/VRV & Ducted Split Systems)",
      "Roof-Mounted Piping & Exposed Outdoor Runs",
      "Tropical & Coastal Climate Installations",
      "High UV Exposure Environments",
      "Line-Sets Requiring No Additional Jacketing or Coating",
      "Commercial & Residential HVAC Systems",
    ],
    gallery: [
      { src: "/images/products/ultraline/ultraline.png", alt: "Gulf-O-Flex UltraLine pre-jacketed line-set insulation" },
      { src: "/images/products/ultraline/ultraline-1.png", alt: "UltraLine UV-resistant insulation coil" },
    ],
    downloads: [
      { name: "UltraLine Product Catalogue", format: "PDF", size: "2.8 MB" },
      { name: "UltraLine Technical Data Sheet", format: "PDF", size: "1.5 MB" },
      { name: "UltraLine Installation Guide", format: "PDF", size: "2.1 MB" },
    ],
  },
  accessories: {
    name: "Accessories & Adhesives",
    icon: Package,
    heroImage: "/images/products/accessories-glue1.webp",
    shortName: "Complete Installation System",
    tagline: "A complete range of adhesives, sealants, tapes, and anti-vibration accessories engineered for full system compatibility with Gulf-O-Flex® insulation.",
    color: "orange",
    description: [
      "Gulf-O-Flex® Accessories provide all the ancillary products required for a complete and code-compliant NBR, XLPE, and faced insulation installation. The range includes polychloroprene and synthetic-rubber contact adhesives (Gulf O Glue, Gulf-O-Seal 81-10), fire-resistive duct vapor-barrier sealants (Gulf-O-Seal 32-17), and a complete family of foil, glass-cloth, PVC, alupet, and NBR foam tapes.",
      "The accessories range also covers anti-vibration cork and metal-sandwich pads for mechanical equipment isolation. Each accessory is formulated and tested for full compatibility with Gulf-O-Flex® insulation products, ensuring system integrity, vapor-barrier continuity, and long-term performance - indoors and outdoors.",
    ],
    features: [
      "Gulf O Glue - polychloroprene contact adhesive, low VOC (8 g/L, US EPA 24), 4–6 m²/L",
      "Gulf-O-Seal 81-10 - synthetic natural rubber duct adhesive, service 20°C to +96°C",
      "Gulf-O-Seal 32-17 - fire-resistive vapor-barrier duct sealant, Shore A 55",
      "Aluglass Tape - 100 μm backing, ≥ 25,000 g/in tensile, -30°C to +120°C",
      "Aluminium Foil Tape - 45 μm total, 1800 g/in adhesion (ASTM D3330)",
      "Alupet Tape - PET 12μ + Foil 7μ for XLPE joints, service -30°C to +100°C",
      "PVC Pipe Wrapping Tape - 130 μm total, anti-corrosive & moisture resistant",
      "NBR Foam Tape - closed-cell 3mm, density 75–95 kg/m³, λ < 0.039 W/m·K",
      "Anti-Vibration Cork Pad - Cork/Rubber, max 60 lbs/in², IRHD 75",
      "Anti-Vibration Metal Sandwich Pad - steel-bonded ribbed rubber, high load",
    ],
    specs: [
      { label: "Gulf O Glue - Base", value: "Polychloroprene (solvent-based), 20 ± 3% solids" },
      { label: "Gulf O Glue - VOC", value: "Low VOC, 8 g/L (US EPA 24)" },
      { label: "Gulf O Glue - Flash Point", value: "65°C; coverage 4–6 m²/L" },
      { label: "Gulf-O-Seal 81-10 - Base", value: "Synthetic Natural Rubber, 18% solids" },
      { label: "Gulf-O-Seal 81-10 - Service Temp.", value: "20°C to +96°C (Flash Point 22°C)" },
      { label: "Gulf-O-Seal 32-17 - Type", value: "Fire-resistive duct vapor-barrier sealant" },
      { label: "Gulf-O-Seal 32-17 - Hardness", value: "Shore A 55 (ASTM D2240), SG 1.70" },
      { label: "Gulf-O-Seal 32-17 - Service Temp.", value: "-20°C to +85°C" },
      { label: "Aluglass Tape", value: "Tensile > 25,000 g/in; -30°C to +120°C" },
      { label: "Aluminium Foil Tape", value: "Total 45 μm; adhesion 1800 g/in; -5°C to +65°C" },
      { label: "Alupet Tape", value: "PET 12μ + Foil 7μ; service -30°C to +100°C" },
      { label: "PVC Tape", value: "Total 130 μm; tensile 3650 g/in; -5°C to +80°C" },
      { label: "NBR Foam Tape", value: "3mm closed cell, 75–95 kg/m³, λ < 0.039 W/m·K" },
      { label: "Anti-Vibration Cork Pad", value: "Cork/Rubber, IRHD 75, max 60 lbs/in²" },
      { label: "Metal Sandwich Pad", value: "Steel-bonded ribbed rubber, up to 32,400 lbs/pad" },
    ],
    certifications: ["ASTM D2240 / D1475 / C679", "ASTM D3330 / D3759 / D3652", "US EPA 24 (Low VOC)", "ISO 9001"],
    applications: [
      "Sheet & Tube Joint Sealing (NBR / XLPE)",
      "Duct Board Joints, Seams & Lamination",
      "Vapor-Barrier Sealing & Moisture Proofing",
      "Pipe Wrapping & Anti-Corrosion Protection",
      "HVAC Duct Adhesion (GI / Aluminium / Asbestos sheet)",
      "Anti-Vibration Pads - Pumps, Motors, AHUs, Generators",
      "Indoor & Outdoor / High-Humidity Applications",
    ],
    downloads: [
      { name: "Accessories Catalogue", format: "PDF", size: "2.7 MB" },
      { name: "Gulf O Glue TDS", format: "PDF", size: "0.6 MB" },
      { name: "Gulf-O-Seal 81-10 TDS", format: "PDF", size: "0.6 MB" },
      { name: "Gulf-O-Seal 32-17 TDS", format: "PDF", size: "0.6 MB" },
      { name: "Tapes TDS Bundle (Aluglass / Foil / PVC / Alupet / NBR)", format: "PDF", size: "1.4 MB" },
      { name: "Anti-Vibration Pads TDS", format: "PDF", size: "0.7 MB" },
    ],
  },
};

type ProductParams = { slug: string };
type ProductSlug = keyof typeof products;

function normalizeProductSlug(input: unknown): ProductSlug | null {
  if (typeof input !== "string") return null;
  const normalized = decodeURIComponent(input).trim().toLowerCase();
  if (!normalized) return null;
  return normalized in products ? (normalized as ProductSlug) : null;
}

export async function generateMetadata(
  { params }: { params: Promise<ProductParams> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = normalizeProductSlug(rawSlug);
  const product = slug ? products[slug] : null;
  if (!product) return {};
  return {
    title: `${product.name} | Gulf-O-Flex® ${product.shortName}`,
    description: product.description[0].slice(0, 160),
    alternates: { canonical: `https://gulfoflex.com/products/${slug}` },
  };
}

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: { params: Promise<ProductParams> }) {
  const { slug: rawSlug } = await params;
  const slug = normalizeProductSlug(rawSlug);
  const product = slug ? products[slug] : null;
  if (!product || !slug) notFound();

  const productSlug: ProductSlug = slug;

  const Icon = product.icon;

  const pillars = [
    { icon: Thermometer, label: "Thermal", value: product.specs.find(s => /thermal|conduct/i.test(s.label))?.value ?? product.specs[0]?.value, sub: "Conductivity" },
    { icon: Flame, label: "Fire Safety", value: product.specs.find(s => /fire/i.test(s.label))?.value ?? "Class O", sub: "Reaction to fire" },
    { icon: Droplets, label: "Moisture", value: product.specs.find(s => /vapor|water|moist|perm/i.test(s.label))?.value ?? "Closed-cell", sub: "Vapour barrier" },
    { icon: Gauge, label: "Temperature", value: product.specs.find(s => /temperature/i.test(s.label))?.value ?? "Wide range", sub: "Service window" },
  ];

  return (
    <>
      {/* HERO - Editorial dark premium */}
      <section className="relative overflow-hidden pt-20 md:pt-24 pb-8 md:pb-10 bg-[#080808] text-white">
        <PageHero src={product.heroImage ?? "https://images.unsplash.com/photo-1543674892-7d64d45df18b?auto=format&fit=crop&w=2400&q=80"} focalY="40%" variant="dark" intensity={0.85} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container-wide relative z-10">
          <nav className="flex items-center gap-2 text-[11px] text-white/40 mb-10" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange-300 transition-colors">Home</Link>
            <ChevronRight size={11} className="text-white/20" />
            <Link href="/products" className="hover:text-orange-300 transition-colors">Products</Link>
            <ChevronRight size={11} className="text-white/20" />
            <span className="text-white/75">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-7 text-[10px] font-bold tracking-[0.22em] uppercase text-orange-300 bg-orange-500/10 border border-orange-500/30 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                <Sparkles size={11} /> {product.shortName}
              </div>
              <h1
                className="leading-[0.92] mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.045em" }}
              >
                <span className="block text-white/90">{product.name}</span>
                <span className="block serif-italic text-orange-400 mt-1" style={{ fontSize: "0.55em", fontWeight: 500 }}>
                  Engineered insulation, Middle East proven.
                </span>
              </h1>
              <p className="text-orange-300/90 font-medium text-base md:text-lg mb-6 leading-relaxed max-w-xl">
                {product.tagline}
              </p>
              <p className="text-white/55 leading-relaxed mb-9 max-w-2xl">{product.description[0]}</p>

              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Request Sample <ArrowRight size={16} />
                </Link>
                <Link href="#specs" className="btn-ghost flex items-center gap-1.5"
                  style={{ color: "rgba(255,255,255,0.9)", borderColor: "rgba(255,255,255,0.18)" }}>
                  View Specifications <FileText size={15} />
                </Link>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <div className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>30<span className="text-orange-400">+</span></div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mt-1">Years</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>{product.certifications.length}<span className="text-orange-400">/{product.certifications.length}</span></div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mt-1">Certifications</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>{product.applications.length}<span className="text-orange-400">+</span></div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mt-1">Applications</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-10 bg-gradient-to-br from-orange-500/25 via-orange-500/5 to-transparent rounded-[3rem] blur-3xl pointer-events-none" />
              <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.015] backdrop-blur-2xl overflow-hidden shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)]">
                <ProductAnimation
                  slug={productSlug}
                  shortName={product.shortName}
                  specValue={product.specs.find((s) => /thermal|conduct/i.test(s.label))?.value}
                  productCount={Object.keys(products).length}
                  index={Object.keys(products).indexOf(productSlug) + 1}
                />

                <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
                  {product.specs.slice(0, 4).map((s) => (
                    <div key={s.label} className="bg-[#0c0c0c] px-5 py-5">
                      <div className="text-orange-400/80 text-[9px] uppercase tracking-[0.2em] font-bold mb-1.5 leading-tight">{s.label}</div>
                      <div className="text-white font-bold text-[14px] leading-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between px-6 py-3 border-t border-white/10 bg-black/30">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/50">
                    <BadgeCheck size={12} className="text-orange-300" /> Compliant batch
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">Lot · GOF-{slug.toUpperCase()}-26</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/40">Certified to</span>
              {product.certifications.map((c) => (
                <span key={c} className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 hover:text-orange-300 transition-colors">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PERFORMANCE PILLARS */}
      <section className="relative py-20 md:py-24 bg-white overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/[0.04] to-transparent pointer-events-none" />
        <div className="container-wide relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="eyebrow mb-4"><span className="eyebrow-dot" />Performance</div>
              <h2 className="text-neutral-900 leading-[1.05]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.85rem, 3.4vw, 2.85rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
                Engineered for <span className="serif-italic text-orange-600">extreme climates.</span>
              </h2>
            </div>
            <p className="text-neutral-500 max-w-md leading-relaxed text-sm md:text-base">
              Four pillars define every Gulf-O-Flex® roll, sheet and tube - measured, certified and serialised.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((p, i) => {
              const PIcon = p.icon;
              return (
                <div key={p.label} className="group relative rounded-2xl border bg-white p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-orange-300/70 hover:shadow-[0_25px_60px_-25px_rgba(234,88,12,0.35)]"
                  style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-orange-500/0 via-orange-500 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start justify-between mb-7">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.04))", border: "1px solid rgba(249,115,22,0.18)" }}>
                      <PIcon size={20} className="text-orange-600" strokeWidth={1.8} />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-300">0{i + 1}</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-orange-600 mb-1.5">{p.label}</div>
                  <div className="text-neutral-900 font-bold text-lg leading-tight mb-1" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}>
                    {p.value}
                  </div>
                  <div className="text-neutral-500 text-xs">{p.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OVERVIEW + FEATURES */}
      <section className="relative py-20 md:py-24 bg-neutral-50/70 border-y" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16">
            <div>
              <div className="eyebrow mb-4"><span className="eyebrow-dot" />Overview</div>
              <h2 className="text-neutral-900 leading-[1.05] mb-7" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.85rem, 3.4vw, 2.85rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
                Built around <span className="serif-italic text-orange-600">three decades</span> of regional know-how.
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                {product.description.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <Factory size={16} className="text-orange-600 mb-2.5" />
                  <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-neutral-400 mb-1">Manufactured</div>
                  <div className="text-neutral-900 font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>UAE, Saudi Arabia, Srilanka</div>
                </div>
                <div className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <Globe2 size={16} className="text-orange-600 mb-2.5" />
                  <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-neutral-400 mb-1">Distributed</div>
                  <div className="text-neutral-900 font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>90+ countries</div>
                </div>
                <div className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <Clock size={16} className="text-orange-600 mb-2.5" />
                  <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-neutral-400 mb-1">Lead time</div>
                  <div className="text-neutral-900 font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>2–4 weeks</div>
                </div>
              </div>
            </div>

            <div>
              <div className="eyebrow mb-4"><span className="eyebrow-dot" />Highlights</div>
              <h2 className="text-neutral-900 leading-[1.05] mb-7" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.85rem, 3.4vw, 2.85rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
                Why specifiers choose <span className="serif-italic text-orange-600">this grade.</span>
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.features.map((f, i) => (
                  <li key={f}
                    className="group flex items-start gap-3 text-neutral-700 text-sm rounded-xl px-4 py-3.5 border bg-white hover:border-orange-300/60 hover:shadow-[0_15px_35px_-20px_rgba(234,88,12,0.3)] transition-all"
                    style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-[10px] font-bold text-orange-600 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-snug pt-0.5">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT GALLERY */}
      {"gallery" in product && Array.isArray((product as Record<string, unknown>).gallery) && (
        <section className="relative py-20 md:py-24 bg-neutral-50 overflow-hidden">
          <div className="container-wide relative z-10">
            <div className="eyebrow mb-4"><span className="eyebrow-dot" />Gallery</div>
            <h2 className="text-neutral-900 leading-[1.05] mb-10" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.85rem, 3.4vw, 2.85rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Product <span className="serif-italic text-orange-600">close-up.</span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {((product as Record<string, unknown>).gallery as { src: string; alt: string }[]).map((img) => (
                <div key={img.src} className="group relative aspect-square rounded-2xl border bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_-25px_rgba(234,88,12,0.25)]" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                  <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FULL SPECIFICATIONS - dark band */}
      <section id="specs" className="relative py-24 md:py-28 bg-[#0a0a0a] text-white overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.06]" />
        <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

        <div className="container-wide relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="eyebrow mb-4" style={{ background: "rgba(249,115,22,0.12)", borderColor: "rgba(249,115,22,0.30)", color: "#fb923c" }}>
                <span className="eyebrow-dot" />Technical Data
              </div>
              <h2 className="text-white leading-[1.05]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.85rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
                Full <span className="serif-italic text-orange-400">specifications.</span>
              </h2>
            </div>
            <Link href="/downloads" className="btn-ghost flex items-center gap-1.5 w-fit"
              style={{ color: "rgba(255,255,255,0.9)", borderColor: "rgba(255,255,255,0.18)" }}>
              <FileCheck2 size={15} /> Download TDS
            </Link>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl overflow-hidden">
            <div className="grid grid-cols-[1fr_1.4fr_auto] px-6 py-4 border-b border-white/10 text-[10px] uppercase tracking-[0.22em] font-bold text-white/45">
              <span>Parameter</span>
              <span>Value</span>
              <span className="hidden sm:inline">Method</span>
            </div>
            {product.specs.map((s, i) => (
              <div
                key={s.label}
                className="grid grid-cols-[1fr_1.4fr_auto] items-center gap-4 px-6 py-5 border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.025] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[10px] font-bold text-orange-400/70 tracking-wider w-6">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-white/65 text-sm">{s.label}</span>
                </div>
                <div className="text-white font-bold text-[15px]" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
                  {s.value}
                </div>
                <span className="hidden sm:inline text-[10px] uppercase tracking-[0.18em] font-bold text-white/30">ASTM / EN</span>
              </div>
            ))}
            <div className="px-6 py-4 bg-black/40 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] text-white/45">Values are typical. Full tolerances available in datasheet.</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-orange-300">DOC · GOF-{slug.toUpperCase()}-TDS-26</span>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATIONS + CERTIFICATIONS */}
      <section className="relative py-20 md:py-24 bg-white overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-14 lg:gap-16">
            <div>
              <div className="eyebrow mb-4"><span className="eyebrow-dot" />Use Cases</div>
              <h2 className="text-neutral-900 leading-[1.05] mb-9" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.85rem, 3.4vw, 2.85rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
                Specified across <span className="serif-italic text-orange-600">critical projects.</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {product.applications.map((a, i) => (
                  <div key={a} className="group relative rounded-2xl border bg-white p-5 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-300/60 hover:shadow-[0_20px_45px_-25px_rgba(234,88,12,0.3)]"
                    style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(249,115,22,0.03))", border: "1px solid rgba(249,115,22,0.18)" }}>
                        <Building2 size={16} className="text-orange-600" strokeWidth={1.8} />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-300">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="text-neutral-900 font-bold text-sm leading-snug" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>{a}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="eyebrow mb-4"><span className="eyebrow-dot" />Compliance</div>
              <h2 className="text-neutral-900 leading-[1.05] mb-9" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.85rem, 3.4vw, 2.85rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
                Independently <span className="serif-italic text-orange-600">certified.</span>
              </h2>
              <div className="rounded-3xl border bg-gradient-to-br from-neutral-50 to-white p-6 md:p-7" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                <div className="grid grid-cols-2 gap-3">
                  {product.certifications.map((c) => (
                    <div key={c} className="flex items-center gap-2.5 rounded-xl bg-white border px-3.5 py-3 transition-colors hover:border-orange-300/70 hover:bg-orange-50/40"
                      style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                      <Award size={14} className="text-orange-600 flex-shrink-0" />
                      <span className="text-neutral-800 text-[12px] font-bold uppercase tracking-wider truncate">{c}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-orange-600" />
                    <span className="text-[11px] text-neutral-500">Verified · current revision</span>
                  </div>
                  <Link href="/certifications" className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600 hover:text-orange-700 inline-flex items-center gap-1">
                    All certs <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live 3D Installation Walkthrough */}
      {slug !== "accessories" && (
        <PipeLayerSectionClient variant="nbr" productSlug={productSlug} />
      )}

      {/* CTA - light premium */}
      <section className="relative overflow-hidden py-24 md:py-28 bg-white">
        {/* Soft ambient accents */}
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-orange-500/[0.07] blur-[120px] pointer-events-none" />
        <div className="absolute -right-32 -bottom-20 w-[440px] h-[440px] rounded-full bg-orange-400/[0.08] blur-[110px] pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-[0.035] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="eyebrow mb-5">
                <span className="eyebrow-dot" />Talk to an engineer
              </div>
              <h2
                className="text-neutral-900 leading-[1.02] mb-5"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.04em" }}
              >
                Ready to specify <span className="serif-italic text-orange-600">{product.name}?</span>
              </h2>
              <p className="text-neutral-600 mb-9 max-w-xl leading-relaxed text-base md:text-lg">
                Our technical team supports sizing, BoQs, submittals and compliance documentation for projects across the GCC and beyond.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/contact" className="btn-primary">
                  Request Quote <ArrowRight size={16} />
                </Link>
                <Link
                  href="/products"
                  className="btn-ghost flex items-center gap-1.5"
                  style={{ color: "#0a0a0a", borderColor: "rgba(0,0,0,0.14)" }}
                >
                  <ArrowLeft size={15} /> All Products
                </Link>
              </div>

              {/* Trust micro-row */}
              <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.18em] font-bold text-neutral-400">
                <span className="flex items-center gap-2"><BadgeCheck size={13} className="text-orange-500" /> ISO 9001</span>
                <span className="flex items-center gap-2"><ShieldCheck size={13} className="text-orange-500" /> Class O</span>
                <span className="flex items-center gap-2"><Globe2 size={13} className="text-orange-500" /> 50+ Countries</span>
              </div>
            </div>

            {/* Contact card - light glass */}
            <div className="relative rounded-3xl border border-neutral-200 bg-white p-7 md:p-8 shadow-[0_30px_80px_-30px_rgba(234,88,12,0.18)]">
              <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-3xl bg-gradient-to-r from-orange-500 via-orange-400 to-orange-400" />
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.16), rgba(249,115,22,0.04))", border: "1px solid rgba(249,115,22,0.22)" }}
                >
                  <Phone size={18} className="text-orange-600" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">Technical desk</div>
                  <div className="text-neutral-900 font-bold text-sm">Mon – Sat · 09:00–18:00 GST</div>
                </div>
              </div>

              <ul className="space-y-3.5 text-sm text-neutral-700">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} className="text-orange-600" />
                  </span>
                  Project-specific sizing &amp; BoQ
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} className="text-orange-600" />
                  </span>
                  Submittals &amp; compliance dossiers
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} className="text-orange-600" />
                  </span>
                  Site visits &amp; installer training
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} className="text-orange-600" />
                  </span>
                  Sample dispatch within 48 hours
                </li>
              </ul>

              <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center justify-between">
                <Link href="/contact" className="text-[11px] uppercase tracking-[0.2em] font-bold text-orange-600 hover:text-orange-700 transition-colors inline-flex items-center gap-1.5">
                  Reach the team <ArrowRight size={12} />
                </Link>
                <span className="text-[10px] tracking-[0.18em] uppercase font-bold text-neutral-300">Avg reply · 4h</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
