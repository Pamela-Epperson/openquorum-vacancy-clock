// ─── Colorado enrichment overlay — HUMAN-VERIFIED facts ─────────────────────────
// Verified July 15, 2026 against Colorado Revised Statutes / Colorado
// Constitution / official agency pages. Keys match the exact board names the
// CO profile scrapes from the Governor's openings page.
export const ENRICHMENTS = {
  "Colorado Health Benefits Exchange Board": {
    totalSeats: 12, domain: "health",
    constituent: "Coloradans buying insurance through Connect for Health Colorado",
    mandate: "Governs Connect for Health Colorado, the state health insurance marketplace. Twelve members — nine voting (five governor-appointed, four legislative) plus three ex officio (C.R.S. 10-22-104).",
    seatSource: "https://leg.colorado.gov/bills/sb17-003",
    criticalNote: "9 voting + 3 ex officio members",
  },
  "Medical Services Board": {
    totalSeats: 11, domain: "health",
    constituent: "Health First Colorado (Medicaid) members",
    mandate: "Adopts rules governing Colorado's Medicaid and medical assistance programs. Eleven members appointed by the Governor with Senate consent, at least one per congressional district (C.R.S. 25.5-1-301).",
    seatSource: "https://law.justia.com/codes/colorado/2022/title-25-5/article-1/part-3/section-25-5-1-301/",
  },
  "Veterans Affairs, Colorado Board of": {
    totalSeats: 7, domain: "justice",
    constituent: "Colorado veterans & their families",
    mandate: "Advises on veterans policy and oversees the Veterans Trust Fund grant program. Seven members appointed by the Governor (C.R.S. 28-5-702).",
    seatSource: "https://vets.colorado.gov/cbva",
  },
  "Personnel Board, State": {
    totalSeats: 5, domain: "justice",
    constituent: "Colorado state personnel system employees",
    mandate: "Constitutional board hearing state employee appeals and adopting personnel rules. Five members — three governor-appointed with Senate consent, two elected by certified state employees (Colo. Const. art. XII, § 14).",
    seatSource: "https://law.justia.com/constitution/colorado/cnart12.html",
    criticalNote: "Only 3 of 5 seats are governor-appointed",
  },
  "Brain Injury Trust Fund Board": {
    totalSeats: 13, domain: "disability",
    constituent: "Coloradans living with brain injuries",
    mandate: "Oversees the Colorado Brain Injury Trust Fund supporting services and research. Three ex officio members plus up to ten governor-appointed members with Senate consent (C.R.S. 26-1-302).",
    seatSource: "https://law.justia.com/codes/colorado/2016/title-26/article-1/part-3/section-26-1-302/",
    criticalNote: "Statute caps appointed membership at 10 (+3 ex officio)",
  },
};
