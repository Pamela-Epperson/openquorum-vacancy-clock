// ─── Arizona enrichment overlay — HUMAN-VERIFIED facts (July 16, 2026) ─────────
// Keys match the ALL-CAPS names in the Governor's vacancy report.
// Depth expansion July 25, 2026: +4 statute-cited boards (health, environment, equity).
export const ENRICHMENTS = {
  "ARIZONA MEDICAL BOARD": {
    totalSeats: 12, domain: "health",
    constituent: "Arizona patients & licensed physicians",
    mandate: "Licenses and disciplines Arizona's allopathic physicians. Twelve governor-appointed members — eight practicing physicians and four public members (A.R.S. § 32-1402).",
    seatSource: "https://www.azleg.gov/ars/32/01402.htm",
  },
  "ACUPUNCTURE BOARD OF EXAMINERS": {
    totalSeats: 7, domain: "health",
    constituent: "Arizona patients & licensed acupuncturists",
    mandate: "Licenses and regulates acupuncture practice. Seven governor-appointed members — four licensed practitioners, one physician, two public members (A.R.S. § 32-3902).",
    seatSource: "https://www.azleg.gov/ars/32/03902.htm",
  },
  "ADVISORY COUNCIL ON INDIAN HEALTH CARE": {
    totalSeats: 23, domain: "equity",
    constituent: "Members of Arizona's 22 federally recognized tribes",
    mandate: "Advises on health care policy affecting American Indians in Arizona. Twenty-three members — one governor-appointed representative per federally recognized tribe plus the Inter Tribal Council of Arizona (A.R.S. § 36-2902.01).",
    seatSource: "https://www.azleg.gov/ars/36/02902-01.htm",
  },
  "STATE BOARD OF DENTAL EXAMINERS": {
    totalSeats: 11, domain: "health",
    constituent: "Arizona dental patients & licensed dentists/hygienists",
    mandate: "Licenses and disciplines Arizona's dentists and dental hygienists. Eleven members appointed by the Governor — six dentists, two dental hygienists, two public members, and one business entity member (A.R.S. § 32-1203).",
    seatSource: "https://www.azleg.gov/ars/32/01203.htm",
  },
  "GAME AND FISH COMMISSION": {
    totalSeats: 5, domain: "environment",
    constituent: "Arizona's wildlife, hunters, anglers & outdoor public",
    mandate: "Sets policy for Arizona's wildlife conservation and the Game and Fish Department. Five members appointed by the Governor to five-year terms; no more than three from one party and no two from the same county (A.R.S. § 17-201).",
    seatSource: "https://www.azleg.gov/ars/17/00201.htm",
  },
  "ARIZONA STATE PARKS BOARD": {
    totalSeats: 7, domain: "environment",
    constituent: "Arizona's state parks, public lands & outdoor recreation",
    mandate: "Governs Arizona's state parks, historic sites, and outdoor recreation programs. Seven members — the State Land Commissioner plus six appointed by the Governor for six-year terms (A.R.S. § 41-511).",
    seatSource: "https://www.azleg.gov/ars/41/00511.htm",
    criticalNote: "6 of 7 seats are governor-appointed",
  },
  "ARIZONA STATE RETIREMENT SYSTEM BOARD": {
    totalSeats: 9, domain: "equity",
    constituent: "Arizona's public employees & retirees · statewide pension",
    mandate: "Oversees the Arizona State Retirement System, which serves state, university, and school employees. Nine trustees appointed by the Governor — five ASRS members and four public members (A.R.S. § 38-713).",
    seatSource: "https://www.azleg.gov/ars/38/00713.htm",
  },
};
