// ─── Texas enrichment overlay — HUMAN-VERIFIED facts (July 16, 2026) ───────────
// Sources: Texas statutes (statute links come scraped per board). Texas runs in
// INVENTORY MODE — no central vacancy list; applications accepted year-round.
// Depth expansion July 20, 2026: +8 statute-cited boards (health, housing,
// education, environment, finance oversight).
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
  "Cancer Prevention and Research Institute of Texas Oversight Committee": {
    totalSeats: 9, domain: "health",
    constituent: "Texans affected by cancer · multibillion-dollar research & prevention program",
    mandate: "Governs the Cancer Prevention and Research Institute of Texas, awarding grants for cancer research and prevention statewide. Nine members — three each appointed by the Governor, Lt. Governor, and Speaker (Health & Safety Code ch. 102).",
    seatSource: "https://statutes.capitol.texas.gov/Docs/HS/htm/HS.102.htm",
    criticalNote: "3 of 9 seats are governor-appointed",
  },
  "Opioid Abatement Fund Council, Texas": {
    totalSeats: 13, domain: "health",
    constituent: "Texans affected by the opioid crisis · settlement-fund allocation",
    mandate: "Directs the allocation of Texas's opioid settlement funds toward abatement across the state. Thirteen appointed members representing affected regions and professions, with the Comptroller as nonvoting presiding officer (Gov. Code 403.503).",
    seatSource: "https://statutes.capitol.texas.gov/Docs/GV/htm/GV.403.htm",
    criticalNote: "Comptroller serves as nonvoting presiding officer",
  },
  "Housing and Community Affairs, Texas Department of": {
    totalSeats: 7, domain: "housing",
    constituent: "Low-income Texans · state housing & community programs",
    mandate: "Governs Texas's housing finance and community affairs programs, including the low-income housing tax credit. Seven members appointed by the Governor with the advice and consent of the Senate (Gov. Code 2306.024).",
    seatSource: "https://statutes.capitol.texas.gov/Docs/GV/htm/GV.2306.htm",
  },
  "Affordable Housing Corporation Board of Directors, Texas State": {
    totalSeats: 5, domain: "housing",
    constituent: "Low- and moderate-income Texans seeking affordable housing",
    mandate: "Sets policy for the Texas State Affordable Housing Corporation's homeownership, lending, and development programs. Five members appointed by the Governor with the advice and consent of the Senate (Gov. Code 2306.554).",
    seatSource: "https://statutes.capitol.texas.gov/Docs/GV/htm/GV.2306.htm",
  },
  "School Land Board": {
    totalSeats: 5, domain: "environment",
    constituent: "Texas public schools · Permanent School Fund real-asset value",
    mandate: "Manages the real-asset investments and state lands that help fund the Permanent School Fund for Texas public education. Five members — the Land Commissioner as chair plus four citizens appointed by the Governor (Nat. Resources Code 32.012).",
    seatSource: "https://statutes.capitol.texas.gov/Docs/NR/htm/NR.32.htm",
    criticalNote: "4 of 5 seats are governor-appointed",
  },
  "Pension Review Board, State": {
    totalSeats: 9, domain: "justice",
    constituent: "Texas public employees & retirees · pension-fund solvency",
    mandate: "Oversees the actuarial soundness and transparency of all Texas public retirement systems. Nine members appointed by the Governor with the advice and consent of the Senate (Gov. Code 801.102).",
    seatSource: "https://statutes.capitol.texas.gov/Docs/GV/htm/GV.801.htm",
  },
  "Permanent School Fund Corporation Board of Directors, Texas": {
    totalSeats: 9, domain: "education",
    constituent: "Texas public school students · multibillion-dollar education endowment",
    mandate: "Manages the Permanent School Fund endowment that supports Texas public schools. Nine members — five appointed by the State Board of Education, the Land Commissioner, one General Land Office appointee, and two governor-appointed investment experts (Educ. Code 43.053).",
    seatSource: "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.43.htm",
    criticalNote: "2 of 9 seats are governor-appointed",
  },
  "Employees Retirement System of Texas Board of Trustees": {
    totalSeats: 6, domain: "equity",
    constituent: "Texas state employees & retirees · retirement and benefits",
    mandate: "Administers retirement, insurance, and benefit programs for Texas state employees and retirees. Six trustees — three appointed (by the Governor, Speaker, and Chief Justice) and three elected by members (Gov. Code 815.002).",
    seatSource: "https://statutes.capitol.texas.gov/Docs/GV/htm/GV.815.htm",
    criticalNote: "1 of 6 seats is governor-appointed",
  },
};
