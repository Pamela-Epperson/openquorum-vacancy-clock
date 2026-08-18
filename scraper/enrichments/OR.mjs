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
  "Alcohol and Drug Policy Commission": {
    totalSeats: 17, domain: "health",
    constituent: "Oregonians affected by substance use disorders",
    mandate: "Advises on Oregon's substance use disorder policy and system strategy. Up to 17 voting members appointed by the Governor, Senate-confirmed (ORS 430.221).",
    seatSource: "https://oregon.public.law/statutes/ors_430.221",
    criticalNote: "Statute caps voting membership at 17",
  },
  "Board of Agriculture": {
    totalSeats: 10, domain: "environment",
    constituent: "Oregon agricultural producers & consumers",
    mandate: "Advises the Oregon Department of Agriculture on policy; 10 members — seven active producers, two consumer representatives, plus the Soil and Water Conservation Commission chair (ORS 561.372).",
    seatSource: "https://oregon.public.law/statutes/ors_561.372",
  },
  "Board of Medical Imaging": {
    totalSeats: 12, domain: "health",
    constituent: "Patients & licensed medical imaging professionals",
    mandate: "Licenses and regulates Oregon's medical imaging professionals. Twelve members: four physicians, three public members, five modality licensees (ORS 688.545).",
    seatSource: "https://oregon.public.law/statutes/ors_688.545",
  },
  "Board of Trustees of Oregon State University": {
    totalSeats: 15, domain: "education",
    constituent: "Oregon State University students & Oregon higher education",
    mandate: "Governs Oregon State University — budget, tuition, and university policy. Up to fifteen members appointed by the Governor with Senate confirmation; the university president serves ex officio (ORS 352.054).",
    seatSource: "https://oregon.public.law/statutes/ors_352.054",
    criticalNote: "Governor-appointed; university president serves ex officio (nonvoting)",
  },
  "Board of Trustees of University Of Oregon": {
    totalSeats: 15, domain: "education",
    constituent: "University of Oregon students & Oregon higher education",
    mandate: "Governs the University of Oregon — budget, tuition, and university policy. Up to fifteen members appointed by the Governor with Senate confirmation; the university president serves ex officio (ORS 352.054).",
    seatSource: "https://oregon.public.law/statutes/ors_352.054",
    criticalNote: "Governor-appointed; university president serves ex officio (nonvoting)",
  },
  "Board of Trustees of Portland State University": {
    totalSeats: 15, domain: "education",
    constituent: "Portland State University students & Oregon higher education",
    mandate: "Governs Portland State University — budget, tuition, and university policy. Up to fifteen members appointed by the Governor with Senate confirmation; the university president serves ex officio (ORS 352.054).",
    seatSource: "https://oregon.public.law/statutes/ors_352.054",
    criticalNote: "Governor-appointed; university president serves ex officio (nonvoting)",
  },
  "Behavior Analysis Regulatory Board": {
    totalSeats: 9, domain: "health",
    constituent: "Oregonians receiving behavior analysis & licensed analysts",
    mandate: "Licenses and regulates Oregon's applied behavior analysts. Nine members appointed by the Governor with Senate confirmation (ORS 676.806).",
    seatSource: "https://oregon.public.law/statutes/ors_676.806",
  },
  "Board of Licensed Dietitians": {
    totalSeats: 7, domain: "health",
    constituent: "Oregon patients & licensed dietitians",
    mandate: "Licenses and regulates Oregon's dietitians. Seven members appointed by the Governor — four dietitians, a physician, and two public members (ORS 691.485).",
    seatSource: "https://oregon.public.law/statutes/ors_691.485",
  },
  "Board of Athletic Trainers": {
    totalSeats: 5, domain: "health",
    constituent: "Oregon athletes & licensed athletic trainers",
    mandate: "Licenses and regulates Oregon's athletic trainers. Five members appointed by the Governor — three athletic trainers, a physician, and a public member (ORS 688.705).",
    seatSource: "https://oregon.public.law/statutes/ors_688.705",
  },
  "Appraiser Certification and Licensure Board": {
    totalSeats: 8, domain: "housing",
    constituent: "Oregon property owners & licensed appraisers",
    mandate: "Certifies and licenses Oregon's real estate appraisers. Eight members appointed by the Governor (ORS 674.305).",
    seatSource: "https://oregon.public.law/statutes/ors_674.305",
  },
  "Board of Cosmetology": {
    totalSeats: 7, domain: "justice",
    constituent: "Oregon salon clients & licensed cosmetologists",
    mandate: "Licenses and regulates Oregon's cosmetology practitioners and facilities. Seven members appointed by the Governor (ORS 690.155).",
    seatSource: "https://oregon.public.law/statutes/ors_690.155",
  },
  "Board of Boiler Rules": {
    totalSeats: 11, domain: "justice",
    constituent: "Oregonians & boiler/pressure-vessel safety",
    mandate: "Sets Oregon's boiler and pressure-vessel safety code. Eleven members appointed by the Governor with Senate confirmation (ORS 480.535).",
    seatSource: "https://oregon.public.law/statutes/ors_480.535",
  },
  "Board of Commissioners of the Port of Portland": {
    totalSeats: 9, domain: "environment",
    constituent: "Oregon travelers, shippers & the Portland port district",
    mandate: "Governs the Port of Portland — PDX airport, marine terminals, and industrial development. Nine commissioners appointed by the Governor with Senate ratification, four-year terms (ORS 778.215).",
    seatSource: "https://oregon.public.law/statutes/ors_778.215",
  },
  "Board of Directors of the State Accident Insurance Fund Corporation": {
    totalSeats: 5, domain: "equity",
    constituent: "Oregon's injured workers & employers · workers' comp",
    mandate: "Governs SAIF, Oregon's not-for-profit workers' compensation insurer. Five directors appointed by the Governor with Senate confirmation — three industry-connected and two public members (ORS 656.751).",
    seatSource: "https://oregon.public.law/statutes/ors_656.751",
  },
};
