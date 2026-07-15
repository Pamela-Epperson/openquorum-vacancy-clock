// ─── Texas enrichment overlay — HUMAN-VERIFIED facts (July 16, 2026) ───────────
// Sources: Texas statutes (statute links come scraped per board). Texas runs in
// INVENTORY MODE — no central vacancy list; applications accepted year-round.
export const ENRICHMENTS = {
  "Behavioral Health Executive Council, Texas": {
    totalSeats: 9, domain: "health",
    constituent: "Texans served by licensed behavioral health professionals",
    mandate: "Oversees licensing and enforcement for psychologists, counselors, social workers, and marriage & family therapists. Nine members — eight appointed by member boards, one governor-appointed public member (Occ. Code 507.051).",
    seatSource: "https://texas.public.law/statutes/tex._occ._code_section_507.051",
    criticalNote: "1 of 9 seats is governor-appointed",
  },
  "Higher Education Coordinating Board, Texas": {
    totalSeats: 9, domain: "education",
    constituent: "Texas college students & institutions",
    mandate: "Coordinates Texas public higher education strategy, funding formulas, and program approval. Nine members appointed by the Governor with Senate consent for six-year terms (Educ. Code 61.022).",
    seatSource: "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.61.htm",
  },
  "Diabetes Council, Texas": {
    totalSeats: 16, domain: "health",
    constituent: "Texans living with or at risk of diabetes",
    mandate: "Advises the legislature on diabetes policy and administers the state diabetes plan. Sixteen members — eleven governor-appointed citizens plus five agency representatives (Health & Safety Code 103.002).",
    seatSource: "https://statutes.capitol.texas.gov/Docs/HS/htm/HS.103.htm",
    criticalNote: "11 of 16 seats are governor-appointed",
  },
  "Alzheimer's Disease and Related Disorders, Texas Council on": {
    totalSeats: 15, domain: "health",
    constituent: "Texans affected by Alzheimer's & related disorders",
    mandate: "Guides the state plan on Alzheimer's disease. Fifteen members — four each appointed by the Governor, Lt. Governor, and Speaker, plus three agency representatives (Health & Safety Code ch. 101).",
    seatSource: "https://statutes.capitol.texas.gov/Docs/HS/htm/HS.101.htm",
    criticalNote: "4 of 15 seats are governor-appointed",
  },
};
