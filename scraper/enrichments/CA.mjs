// ─── California enrichment overlay — HUMAN-VERIFIED (July 16 / expanded July 25, 2026) ──
// Keys match the exact board names in the Governor's Current Board Vacancies PDF.
// Depth expansion July 25 2026: +5 statute-cited marquee health boards surfaced
// by the rewritten profiles/ca.mjs (6 → ~150 rows).
export const ENRICHMENTS = {
  "Gambling Control Commission": {
    totalSeats: 5, domain: "justice",
    constituent: "Californians affected by regulated gambling",
    mandate: "Regulates California's gambling industry and acts as trustee of Indian Gaming funds. Five members appointed by the Governor, Senate-confirmed (Bus. & Prof. Code § 19811).",
    seatSource: "https://www.cgcc.ca.gov/",
  },
  "State Compensation Insurance Fund, Board of Directors": {
    totalSeats: 11, domain: "justice",
    constituent: "California workers & employers in the workers'-comp system",
    mandate: "Governs State Fund, California's provider of last-resort workers' compensation insurance. Eleven members — nine governor-appointed plus two legislative appointees (Ins. Code § 11770).",
    seatSource: "https://codes.findlaw.com/ca/insurance-code/ins-sect-11770/",
    criticalNote: "9 of 11 seats are governor-appointed",
  },
  "Medical Board of California": {
    totalSeats: 15, domain: "health",
    constituent: "California patients & licensed physicians",
    mandate: "Licenses and disciplines California's physicians. Fifteen members — seven licensed physicians and eight public members; the Governor appoints thirteen, with the Senate and Assembly each appointing one public member (Bus. & Prof. Code § 2001).",
    seatSource: "https://california.public.law/codes/ca_bus_and_prof_code_section_2001",
    criticalNote: "13 of 15 seats are governor-appointed",
  },
  "Nursing, Board of Registered": {
    totalSeats: 9, domain: "health",
    constituent: "California patients & registered nurses",
    mandate: "Licenses and regulates California's registered nurses. Nine members appointed by the Governor (with two of the public seats appointed by the Legislature) — five registered nurses and four public members (Bus. & Prof. Code § 2701).",
    seatSource: "https://california.public.law/codes/ca_bus_and_prof_code_section_2701",
  },
  "Pharmacy, CA State Board of": {
    totalSeats: 13, domain: "health",
    constituent: "California patients & licensed pharmacists · drug safety",
    mandate: "Licenses pharmacists and regulates the distribution of drugs in California. Thirteen members — the Governor appoints seven pharmacists and four public members, with the Senate and Assembly each appointing one public member (Bus. & Prof. Code § 4001).",
    seatSource: "https://california.public.law/codes/ca_bus_and_prof_code_section_4001",
    criticalNote: "11 of 13 seats are governor-appointed",
  },
  "Dental Board of CA": {
    totalSeats: 15, domain: "health",
    constituent: "California dental patients & licensed dentists",
    mandate: "Licenses and disciplines California's dentists and dental assistants. Fifteen members — eight practicing dentists, two registered dental assistants, and five public members (Bus. & Prof. Code § 1601.1).",
    seatSource: "https://california.public.law/codes/ca_bus_and_prof_code_section_1601.1",
  },
  "Psychology, Board of": {
    totalSeats: 9, domain: "health",
    constituent: "Californians seeking psychological care & licensed psychologists",
    mandate: "Licenses and regulates California's psychologists. Nine members — five licensed psychologists and four public members (Bus. & Prof. Code § 2920).",
    seatSource: "https://california.public.law/codes/ca_bus_and_prof_code_section_2920",
  },
};
