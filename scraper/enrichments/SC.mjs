// ─── South Carolina enrichment overlay — HUMAN-VERIFIED (July 16, 2026) ────────
// Multiple keys per board cover naming variants in the SOS vacancy PDF.
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
};
