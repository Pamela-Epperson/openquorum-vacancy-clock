// ─── Oregon enrichment overlay — HUMAN-VERIFIED facts ───────────────────────────
// Verified July 8, 2026 against Oregon Revised Statutes / official agency pages.
// The scraper merges these onto scraped vacancy rows by exact board name.
// seatSource = the statute/page proving totalSeats. Rows without an overlay
// entry stay provisional (tracked, not published).
export const ENRICHMENTS = {
  "Oregon Health Policy Board": {
    totalSeats: 9, domain: "health",
    constituent: "All Oregonians · health system policy",
    mandate: "Serves as the policy-making and oversight body for the Oregon Health Authority. Nine members appointed by the Governor, confirmed by the Senate (ORS 413.006).",
    seatSource: "https://oregon.public.law/statutes/ors_413.006",
  },
  "Health Evidence Review Commission": {
    totalSeats: 13, domain: "health",
    constituent: "Oregon Health Plan members · evidence-based coverage",
    mandate: "Prioritizes health services and reviews clinical evidence for the Oregon Health Plan. Thirteen governor-appointed, Senate-confirmed members (ORS 414.688).",
    seatSource: "https://oregon.public.law/statutes/ors_414.688",
  },
  "Home Care Commission": {
    totalSeats: 9, domain: "health",
    constituent: "Seniors & people with disabilities using home care",
    mandate: "Ensures the quality of home care services for elderly Oregonians and people with disabilities; created by constitutional amendment (Ballot Measure 99, 2000). Nine members, five of whom are current or former home care consumers (ORS 410.602).",
    seatSource: "https://oregon.public.law/statutes/ors_410.602",
  },
  "Oregon Disabilities Commission": {
    totalSeats: 15, domain: "disability",
    constituent: "Oregonians with disabilities",
    mandate: "Advises state government on disability policy; a majority of its 15 governor-appointed members must be individuals with disabilities (ORS 185.110–185.130).",
    seatSource: "https://oregon.public.law/statutes/ors_185.130",
  },
  "Teacher Standards and Practices Commission": {
    totalSeats: 17, domain: "education",
    constituent: "Oregon K-12 students, families & educators",
    mandate: "Licenses Oregon educators and sets professional standards and discipline for the teaching profession. Seventeen members appointed by the Governor, confirmed by the Senate (ORS 342.350).",
    seatSource: "https://oregon.public.law/statutes/ors_342.350",
  },
  "Oregon Public Defense Commission": {
    totalSeats: 13, domain: "justice",
    constituent: "Oregonians entitled to court-appointed counsel",
    mandate: "Governs Oregon's public defense system — nine voting and four nonvoting members appointed by the Governor (ORS 151.213).",
    seatSource: "https://oregon.public.law/statutes/ors_151.213",
    criticalNote: "9 voting + 4 nonvoting members",
  },
  "Medicaid Advisory Committee": {
    totalSeats: 15, domain: "health",
    constituent: "Oregon Health Plan (Medicaid) members",
    mandate: "Advises the Oregon Health Authority and Department of Human Services on medical assistance programs. Up to 15 members appointed by the Governor (ORS 414.211).",
    seatSource: "https://oregon.public.law/statutes/ors_414.211",
    criticalNote: "Statute caps membership at 15",
  },
  "Governor's Commission on Senior Services": {
    totalSeats: 21, domain: "health",
    constituent: "Older Oregonians & aging services",
    mandate: "Advises the Governor and Department of Human Services on programs and policy for older Oregonians. At least 21 members appointed by the Governor for three-year terms (ORS 410.320).",
    seatSource: "https://oregon.public.law/statutes/ors_410.320",
    criticalNote: "Statute sets a minimum of 21 members",
  },
};
