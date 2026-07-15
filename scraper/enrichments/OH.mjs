// ─── Ohio enrichment overlay — HUMAN-VERIFIED facts ─────────────────────────────
// Verified July 15, 2026 against the Ohio Revised Code / official agency pages.
// Keys match exact board names scraped from the Governor's 2026 term-expirations list.
export const ENRICHMENTS = {
  "State Medical Board": {
    totalSeats: 12, domain: "health",
    constituent: "Ohio patients & licensed physicians",
    mandate: "Licenses and disciplines Ohio's physicians. Twelve members appointed by the Governor with Senate consent — eight licensed physicians and surgeons (ORC 4731.01).",
    seatSource: "https://codes.ohio.gov/ohio-revised-code/section-4731.01",
  },
  "Board of Nursing": {
    totalSeats: 13, domain: "health",
    constituent: "Ohio patients & licensed nurses",
    mandate: "Regulates Ohio's nursing profession. Thirteen members — eight registered nurses, four licensed practical nurses, one consumer representative (ORC 4723.02).",
    seatSource: "https://codes.ohio.gov/ohio-revised-code/section-4723.02",
  },
  "Commission on Minority Health": {
    totalSeats: 21, domain: "equity",
    constituent: "Ohio's minority communities · health equity",
    mandate: "Addresses health disparities affecting minority Ohioans through grants, policy, and community programs. Twenty-one members; nine appointed by the Governor from health professions (ORC 3701.78).",
    seatSource: "https://codes.ohio.gov/orc/3701.78",
    criticalNote: "9 of 21 seats are governor-appointed",
  },
  "State Board of Education": {
    totalSeats: 19, domain: "education",
    constituent: "Ohio K-12 students & families",
    mandate: "Oversees educator licensure and school district territory; 19 members — 11 elected by district, 8 appointed by the Governor with Senate consent.",
    seatSource: "https://sboe.ohio.gov/about-the-state-board/board-members/02-board-members",
    criticalNote: "Only 8 of 19 seats are governor-appointed",
  },
  "Opportunities for Ohioans with Disabilities Council": {
    totalSeats: 15, domain: "disability",
    constituent: "Ohioans with disabilities seeking employment",
    mandate: "State rehabilitation council advising OOD on vocational rehabilitation policy and services. Fifteen governor-appointed members, majority individuals with disabilities (ORC 3304.12).",
    seatSource: "https://codes.ohio.gov/orc/3304.12",
  },
};
