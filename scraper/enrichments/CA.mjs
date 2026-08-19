// ─── California enrichment overlay — HUMAN-VERIFIED (statute-cited) ─────────────
// Keys RE-KEYED Aug 2026 to the exact board names emitted by the Statutory-Index
// profile (profiles/ca.mjs) — these differ from the retired Vacancy-Report spellings
// (e.g. "Voc Nursing & Psych Tech Bd", "Transportation Commission, California").
// 21 flagship governor-appointed boards; seat totals cited to the CA Codes. All
// other Statutory-Index boards stay provisional inventory until enriched.
export const ENRICHMENTS = {
  "Accountancy, California Board of": {
    totalSeats: 15, domain: "justice",
    constituent: "Californians & licensed CPAs · audit integrity",
    mandate: "Licenses and disciplines California's CPAs and public accounting firms. Fifteen members — seven licensees and eight public; the Governor appoints eleven (Bus. & Prof. Code § 5000/5015).",
    seatSource: "https://www.cba.ca.gov/about/",
    criticalNote: "11 of 15 seats are governor-appointed",
  },
  "Acupuncture Board": {
    totalSeats: 7, domain: "health",
    constituent: "California acupuncture patients & licensed acupuncturists",
    mandate: "Licenses and regulates California's acupuncturists. Seven members — three acupuncturists and four public; the Governor appoints five (Bus. & Prof. Code § 4934).",
    seatSource: "https://www.acupuncture.ca.gov/about_us/",
    criticalNote: "5 of 7 seats are governor-appointed",
  },
  "Agricultural Labor Relations Board": {
    totalSeats: 5, domain: "equity",
    constituent: "California farmworkers & agricultural employers",
    mandate: "Enforces the rights of California's farmworkers to organize and bargain. Five members appointed by the Governor with Senate confirmation (Labor Code § 1141).",
    seatSource: "https://www.alrb.ca.gov/about-us/",
  },
  "Behavioral Sciences, Bd": {
    totalSeats: 11, domain: "health",
    constituent: "Californians in therapy & licensed clinicians (LMFT, LCSW, LPCC)",
    mandate: "Licenses California's marriage & family therapists, clinical social workers, professional clinical counselors, and educational psychologists. Eleven members; the Governor appoints nine (Bus. & Prof. Code § 4990).",
    seatSource: "https://www.bbs.ca.gov/about/",
    criticalNote: "9 of 11 seats are governor-appointed",
  },
  "Chiropractic Examiners, State Bd of": {
    totalSeats: 7, domain: "health",
    constituent: "California chiropractic patients & licensees",
    mandate: "Licenses and disciplines California's doctors of chiropractic. Seven members appointed by the Governor — five chiropractors and two public (Chiropractic Initiative Act; Bus. & Prof. Code § 1000).",
    seatSource: "https://www.chiro.ca.gov/about_us/",
  },
  "Compensation Insurance Fund, State Board of Directors": {
    totalSeats: 11, domain: "justice",
    constituent: "California workers & employers in the workers'-comp system",
    mandate: "Governs State Fund, California's provider of last-resort workers' compensation insurance. Eleven members — nine governor-appointed plus two legislative appointees (Ins. Code § 11770).",
    seatSource: "https://codes.findlaw.com/ca/insurance-code/ins-sect-11770/",
    criticalNote: "9 of 11 seats are governor-appointed",
  },
  "Dental Board of CA": {
    totalSeats: 15, domain: "health",
    constituent: "California dental patients & licensed dentists",
    mandate: "Licenses and disciplines California's dentists and dental assistants. Fifteen members — eight practicing dentists, two registered dental assistants, and five public members (Bus. & Prof. Code § 1601.1).",
    seatSource: "https://california.public.law/codes/ca_bus_and_prof_code_section_1601.1",
  },
  "Gambling Control Commission": {
    totalSeats: 5, domain: "justice",
    constituent: "Californians affected by regulated gambling",
    mandate: "Regulates California's gambling industry and acts as trustee of Indian Gaming funds. Five members appointed by the Governor, Senate-confirmed (Bus. & Prof. Code § 19811).",
    seatSource: "https://www.cgcc.ca.gov/",
  },
  "Medical Board of California": {
    totalSeats: 15, domain: "health",
    constituent: "California patients & licensed physicians",
    mandate: "Licenses and disciplines California's physicians. Fifteen members — seven licensed physicians and eight public members; the Governor appoints thirteen, with the Senate and Assembly each appointing one public member (Bus. & Prof. Code § 2001).",
    seatSource: "https://california.public.law/codes/ca_bus_and_prof_code_section_2001",
    criticalNote: "13 of 15 seats are governor-appointed",
  },
  "Native American Heritage Commission": {
    totalSeats: 9, domain: "equity",
    constituent: "California Native American tribes & sacred sites",
    mandate: "Protects California Native American sacred sites, burial grounds, and cultural resources. Nine members appointed by the Governor, a majority Native American (Public Resources Code § 5097.91).",
    seatSource: "https://nahc.ca.gov/",
  },
  "Nursing, Board of Registered": {
    totalSeats: 9, domain: "health",
    constituent: "California patients & registered nurses",
    mandate: "Licenses and regulates California's registered nurses. Nine members — five registered nurses and four public members; the Governor appoints seven, with the Senate and Assembly each appointing one public member (Bus. & Prof. Code § 2701).",
    seatSource: "https://california.public.law/codes/ca_bus_and_prof_code_section_2701",
  },
  "Optometry, State Board of": {
    totalSeats: 11, domain: "health",
    constituent: "California eye-care patients & licensed optometrists",
    mandate: "Licenses and regulates California's optometrists. Eleven members — six professionals and five public; the Governor appoints nine (Bus. & Prof. Code § 3010).",
    seatSource: "https://www.optometry.ca.gov/about_us/",
    criticalNote: "9 of 11 seats are governor-appointed",
  },
  "Osteopathic Medical Board of CA": {
    totalSeats: 9, domain: "health",
    constituent: "California patients & licensed D.O. physicians",
    mandate: "Licenses and disciplines California's osteopathic physicians. Nine members — five D.O.s and four public; the Governor appoints seven (Bus. & Prof. Code § 2450 et seq.).",
    seatSource: "https://ombc.ca.gov/",
    criticalNote: "7 of 9 seats are governor-appointed",
  },
  "Pharmacy, California State Board of": {
    totalSeats: 13, domain: "health",
    constituent: "California patients & licensed pharmacists · drug safety",
    mandate: "Licenses pharmacists and regulates the distribution of drugs in California. Thirteen members — seven pharmacists and four public appointed by the Governor, with the Senate and Assembly each appointing one public member (Bus. & Prof. Code § 4001).",
    seatSource: "https://california.public.law/codes/ca_bus_and_prof_code_section_4001",
    criticalNote: "11 of 13 seats are governor-appointed",
  },
  "Physical Therapy Examining Committee": {
    totalSeats: 7, domain: "health",
    constituent: "California patients & licensed physical therapists",
    mandate: "Licenses and regulates California's physical therapists and PT assistants. Seven members — four PTs and three public; the Governor appoints five (Bus. & Prof. Code § 2602).",
    seatSource: "https://www.ptbc.ca.gov/about_us/",
    criticalNote: "5 of 7 seats are governor-appointed",
  },
  "Physician Assistant Board": {
    totalSeats: 9, domain: "health",
    constituent: "California patients & licensed physician assistants",
    mandate: "Licenses and regulates California's physician assistants. Nine voting members — five PAs and four public; the Governor appoints seven voting members (Bus. & Prof. Code § 3504).",
    seatSource: "https://www.pab.ca.gov/about_us/about.shtml",
    criticalNote: "7 of 9 voting seats are governor-appointed",
  },
  "Podiatric Medicine, Board of": {
    totalSeats: 7, domain: "health",
    constituent: "California patients & licensed podiatrists",
    mandate: "Licenses and disciplines California's doctors of podiatric medicine. Seven members — four DPMs and three public; the Governor appoints five (Bus. & Prof. Code § 2461).",
    seatSource: "https://www.pmbc.ca.gov/about_us/",
    criticalNote: "5 of 7 seats are governor-appointed",
  },
  "Psychology, Board of": {
    totalSeats: 9, domain: "health",
    constituent: "Californians seeking psychological care & licensed psychologists",
    mandate: "Licenses and regulates California's psychologists. Nine members — five licensed psychologists and four public members (Bus. & Prof. Code § 2920).",
    seatSource: "https://california.public.law/codes/ca_bus_and_prof_code_section_2920",
  },
  "Respiratory Care Examining Comm": {
    totalSeats: 9, domain: "health",
    constituent: "California patients & licensed respiratory therapists",
    mandate: "Licenses and regulates California's respiratory care practitioners. Nine members; the Governor, Senate Rules, and Assembly Speaker each appoint three (Bus. & Prof. Code § 3710).",
    seatSource: "https://www.rcb.ca.gov/",
    criticalNote: "3 of 9 seats are governor-appointed",
  },
  "Transportation Commission, California": {
    totalSeats: 11, domain: "environment",
    constituent: "California travelers & statewide transportation infrastructure",
    mandate: "Programs and allocates state transportation funding — highways, transit, and active transportation. Eleven voting members; the Governor appoints nine (Gov. Code § 14500).",
    seatSource: "https://catc.ca.gov/about/mission-responsibilities",
    criticalNote: "9 of 11 voting seats are governor-appointed",
  },
  "Voc Nursing & Psych Tech Bd": {
    totalSeats: 11, domain: "health",
    constituent: "California patients & licensed LVNs and psychiatric technicians",
    mandate: "Licenses and regulates California's vocational nurses and psychiatric technicians. Eleven members; the Governor appoints nine (Bus. & Prof. Code § 2841).",
    seatSource: "https://www.bvnpt.ca.gov/about_us/",
    criticalNote: "9 of 11 seats are governor-appointed",
  },
};
