// ─── South Carolina enrichment overlay — HUMAN-VERIFIED (July 16, 2026) ────────
// Multiple keys per board cover naming variants in the SOS vacancy PDF.
// Depth expansion July 25, 2026: +4 statute-cited boards (health, education, justice).
const BLIND = {
  totalSeats: 7, domain: "disability",
  constituent: "South Carolinians who are blind or have low vision",
  mandate: "Governs the SC Commission for the Blind's vocational rehabilitation and independent-living services. Seven members — one per congressional district, three legally blind — appointed by the Governor with Senate consent (S.C. Code § 43-25-10).",
  seatSource: "https://law.justia.com/codes/south-carolina/title-43/chapter-25/section-43-25-10/",
};
const HOUSING = {
  totalSeats: 9, domain: "housing",
  constituent: "South Carolinians needing affordable housing",
  mandate: "Oversees SC Housing's affordable-housing finance programs. Nine commissioners — seven governor-appointed with Senate consent plus two ex officio (S.C. Code Title 31, Ch. 13).",
  seatSource: "https://www.scstatehouse.gov/code/t31c013.php",
  criticalNote: "7 of 9 seats are governor-appointed",
};
export const ENRICHMENTS = {
  "Commission for the Blind": BLIND,
  "South Carolina Commission for the Blind": BLIND,
  "SC Commission for the Blind": BLIND,
  "State Housing Finance and Development Authority": HOUSING,
  "South Carolina State Housing, Finance and Development Authority": HOUSING,   // exact SOS-PDF spelling (with comma)
  "State Housing, Finance and Development Authority": HOUSING,
  "South Carolina State Housing Finance and Development Authority": HOUSING,
  "SC State Housing Finance and Development Authority": HOUSING,
  "Housing Finance and Development Authority": HOUSING,
  "State Board of Medical Examiners": {
    totalSeats: 13, domain: "health",
    constituent: "South Carolina patients & licensed physicians",
    mandate: "Licenses and disciplines South Carolina's physicians. Thirteen members appointed by the Governor with Senate consent — seven physicians (one per congressional district), two at-large physicians, one osteopathic physician, and three lay members (S.C. Code 40-47-10).",
    seatSource: "https://www.scstatehouse.gov/code/t40c047.php",
  },
  "South Carolina Board of Dentistry": {
    totalSeats: 11, domain: "health",
    constituent: "South Carolina dental patients & licensed dentists/hygienists",
    mandate: "Licenses and regulates South Carolina's dentists and dental hygienists. Eleven members — seven district dentists, one at-large dentist, two dental hygienists, and one lay member; the Governor appoints and fills vacancies (S.C. Code 40-15-20).",
    seatSource: "https://www.scstatehouse.gov/code/t40c015.php",
  },
  "South Carolina Commission on Higher Education": {
    totalSeats: 15, domain: "education",
    constituent: "South Carolina college students & public/independent institutions",
    mandate: "Coordinates South Carolina's public higher education policy, funding, and program approval. Fifteen members appointed by the Governor — one per congressional district, three at-large, plus institutional representatives (S.C. Code 59-103-10).",
    seatSource: "https://www.scstatehouse.gov/code/t59c103.php",
  },
  "South Carolina Workers' Compensation Commission": {
    totalSeats: 7, domain: "justice",
    constituent: "South Carolina's injured workers & employers",
    mandate: "Adjudicates South Carolina workers' compensation claims — a quasi-judicial body. Seven commissioners appointed by the Governor with Senate consent for six-year terms (S.C. Code 42-3-20).",
    seatSource: "https://www.scstatehouse.gov/code/t42c003.php",
  },
};
