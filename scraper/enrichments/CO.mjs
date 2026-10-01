// ─── Colorado enrichment overlay — HUMAN-VERIFIED facts ─────────────────────────
// Verified July 15, 2026 and 2026-10-01 against Colorado Revised Statutes /
// Colorado Constitution / official agency pages. Keys match the exact board names
// the CO profile scrapes from the Governor's openings page.
// totalSeats = GOVERNOR-APPOINTED VOTING SEATS ONLY (per Pamela's 2026-10-01
// standard); criticalNote discloses the surrounding board where mixed.
// Depth expansion 2026-10-01: +14 statute-cited boards (8 state university/college
// governing boards + State Fair Authority, Stock Inspection, Juvenile Parole,
// Unlicensed Psychotherapists, Aeronautical Board, Prescription Drug Affordability
// Review Board). Reconciled 3 existing mixed entries to governor-only
// (Health Benefits Exchange 12→5, Personnel Board 5→3, Brain Injury Trust Fund 13→10).
export const ENRICHMENTS = {
  "Colorado Health Benefits Exchange Board": {
    totalSeats: 5, domain: "health",
    constituent: "Coloradans buying insurance through Connect for Health Colorado",
    mandate: "Governs Connect for Health Colorado, the state health insurance marketplace. Twelve-member board; five voting members appointed by the Governor, four by legislative leaders, plus three ex-officio members (C.R.S. 10-22-104).",
    seatSource: "https://leg.colorado.gov/bills/sb17-003",
    criticalNote: "5 of 9 voting seats are governor-appointed (4 legislative, plus 3 ex officio)",
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
    totalSeats: 3, domain: "justice",
    constituent: "Colorado state personnel system employees",
    mandate: "Constitutional board hearing state employee appeals and adopting personnel rules. Five-member board; three members appointed by the Governor with Senate consent, two elected by certified state employees (Colo. Const. art. XII, § 14).",
    seatSource: "https://law.justia.com/constitution/colorado/cnart12.html",
    criticalNote: "3 of 5 seats are governor-appointed (2 elected by state employees)",
  },
  "Brain Injury Trust Fund Board": {
    totalSeats: 10, domain: "disability",
    constituent: "Coloradans living with brain injuries",
    mandate: "Oversees the Colorado Brain Injury Trust Fund supporting services and research. Up to ten members appointed by the Governor with Senate consent, plus three ex-officio members (C.R.S. 26-1-302).",
    seatSource: "https://law.justia.com/codes/colorado/2016/title-26/article-1/part-3/section-26-1-302/",
    criticalNote: "Up to 10 governor-appointed members (plus 3 ex officio)",
  },
  "State Board of Psychologist Examiners": {
    totalSeats: 7, domain: "health",
    constituent: "Coloradans receiving psychological care & licensed psychologists",
    mandate: "Licenses and disciplines Colorado's psychologists. Seven governor-appointed members — four licensed psychologists and three public members (C.R.S. 12-245-302).",
    seatSource: "https://law.justia.com/codes/colorado/title-12/health-care-professions-and-occupations/article-245/part-3/section-12-245-302/",
  },
  "Plumbers, State Board": {
    totalSeats: 7, domain: "housing",
    constituent: "Colorado building occupants & licensed plumbers",
    mandate: "Licenses Colorado's plumbers and adopts the state plumbing code. Seven governor-appointed voting members with Senate consent — plumbers, contractors, an inspector, and a public member (C.R.S. 12-155-104).",
    seatSource: "https://law.justia.com/codes/colorado/title-12/business-professions-and-occupations/article-155/section-12-155-104/",
    criticalNote: "Seven governor-appointed voting members; a public-health department representative serves ex officio, nonvoting",
  },
  "Civil Rights Commission, Colorado": {
    totalSeats: 7, domain: "equity",
    constituent: "Coloradans protected under state anti-discrimination law",
    mandate: "Adjudicates discrimination complaints and sets civil-rights policy in Colorado. Seven members appointed by the Governor with Senate consent (C.R.S. 24-34-303).",
    seatSource: "https://law.justia.com/codes/colorado/title-24/principal-departments/article-34/part-3/section-24-34-303/",
  },
  "Marriage and Family Therapist Examiners, State Board of": {
    totalSeats: 7, domain: "health",
    constituent: "Colorado therapy clients & licensed marriage and family therapists",
    mandate: "Licenses and regulates Colorado's marriage and family therapists. Seven governor-appointed members — four therapists and three public members (C.R.S. 12-245-502).",
    seatSource: "https://law.justia.com/codes/colorado/title-12/health-care-professions-and-occupations/article-245/part-5/section-12-245-502/",
  },
  "Marriage and Family Therapists Board of Examiners": {
    totalSeats: 7, domain: "health",
    constituent: "Colorado therapy clients & licensed marriage and family therapists",
    mandate: "Licenses and regulates Colorado's marriage and family therapists. Seven governor-appointed members — four therapists and three public members (C.R.S. 12-245-502).",
    seatSource: "https://law.justia.com/codes/colorado/title-12/health-care-professions-and-occupations/article-245/part-5/section-12-245-502/",
  },
  "Counselor Examiners, State Board of Licensed Professionals": {
    totalSeats: 7, domain: "health",
    constituent: "Colorado counseling clients & licensed professional counselors",
    mandate: "Licenses and regulates Colorado's licensed professional counselors. Seven governor-appointed members — four counselors and three public members (C.R.S. 12-245-602).",
    seatSource: "https://law.justia.com/codes/colorado/title-12/health-care-professions-and-occupations/article-245/part-6/section-12-245-602/",
  },

  // ── Depth expansion 2026-10-01 (governor-appointed voting seats only) ──
  "Colorado State University System, Board of Governor's": {
    totalSeats: 9, domain: "education",
    constituent: "Colorado State University System students, faculty & communities",
    mandate: "Governs the Colorado State University System (Fort Collins, Pueblo, Global). Fifteen-member board; nine voting members appointed by the Governor with Senate consent, plus nonvoting student and faculty representatives (C.R.S. 23-30-101).",
    seatSource: "https://law.justia.com/codes/colorado/2022/title-23/article-30/section-23-30-101/",
    criticalNote: "9 voting members appointed by the Governor; remaining members are nonvoting student/faculty reps",
  },
  "Colorado School of Mines, Board of Trustees": {
    totalSeats: 7, domain: "education",
    constituent: "Colorado School of Mines students, faculty & Colorado's STEM workforce",
    mandate: "Governs the Colorado School of Mines. Seven voting members appointed by the Governor with Senate consent, plus two nonvoting faculty and student representatives (C.R.S. 23-41-104).",
    seatSource: "https://colorado.public.law/statutes/crs_title_23_article_41",
    criticalNote: "7 governor-appointed voting members (2 nonvoting faculty/student reps excluded)",
  },
  "University of Northern Colorado, Board of Trustees": {
    totalSeats: 7, domain: "education",
    constituent: "University of Northern Colorado students, faculty & communities",
    mandate: "Governs the University of Northern Colorado. Seven voting members appointed by the Governor with Senate consent, plus nonvoting faculty and student representatives (C.R.S. 23-40-104).",
    seatSource: "https://olls.info/crs/crs2025-title-23.htm",
    criticalNote: "7 governor-appointed voting members (nonvoting faculty/student reps excluded)",
  },
  "Community Colleges and Occupational Education, State Board for": {
    totalSeats: 10, domain: "education",
    constituent: "Colorado community-college students & the state workforce",
    mandate: "Governs Colorado's community-college and occupational-education system. Twelve-member board; ten members appointed by the Governor with Senate consent (one per congressional district plus two at-large), plus elected nonvoting faculty and student representatives (C.R.S. 23-60-103).",
    seatSource: "https://olls.info/crs/crs2025-title-23.htm",
    criticalNote: "10 governor-appointed members (nonvoting faculty/student reps excluded)",
  },
  "Adams State University, Board of Trustees": {
    totalSeats: 9, domain: "education",
    constituent: "Adams State University students, faculty & San Luis Valley communities",
    mandate: "Governs Adams State University. Nine voting members appointed by the Governor with Senate consent, plus two nonvoting faculty and student representatives (C.R.S. 23-51-102).",
    seatSource: "https://olls.info/crs/crs2025-title-23.htm",
    criticalNote: "9 governor-appointed voting members (2 nonvoting faculty/student reps excluded)",
  },
  "Colorado Mesa University, Board of Trustees": {
    totalSeats: 11, domain: "education",
    constituent: "Colorado Mesa University students, faculty & Western Slope communities",
    mandate: "Governs Colorado Mesa University. Eleven voting members appointed by the Governor with Senate consent, plus two nonvoting faculty and student representatives (C.R.S. 23-53-102).",
    seatSource: "https://law.justia.com/codes/colorado/title-23/article-53/section-23-53-102/",
    criticalNote: "11 governor-appointed voting members (2 nonvoting faculty/student reps excluded)",
  },
  "Metropolitan State University, Board of Trustees": {
    totalSeats: 9, domain: "education",
    constituent: "Metropolitan State University of Denver students, faculty & community",
    mandate: "Governs Metropolitan State University of Denver. Nine voting members appointed by the Governor with Senate consent, plus nonvoting faculty and student representatives (C.R.S. 23-54-102).",
    seatSource: "https://law.justia.com/codes/colorado/2022/title-23/article-54/section-23-54-102/",
    criticalNote: "9 governor-appointed voting members (nonvoting faculty/student reps excluded)",
  },
  "Fort Lewis College, Board of Trustees": {
    totalSeats: 9, domain: "education",
    constituent: "Fort Lewis College students, faculty & Native American scholars",
    mandate: "Governs Fort Lewis College. Nine voting members appointed by the Governor with Senate consent (one an enrolled member of a federally recognized tribe), plus two nonvoting faculty and student representatives (C.R.S. 23-52-101).",
    seatSource: "https://olls.info/crs/crs2025-title-23.htm",
    criticalNote: "9 governor-appointed voting members (2 nonvoting faculty/student reps excluded)",
  },
  "State Fair Authority, Board of Directors": {
    totalSeats: 12, domain: "environment",
    constituent: "Colorado's agricultural community & state fair participants",
    mandate: "Governs the Colorado State Fair and Industrial Exposition. Thirteen-member board; twelve members appointed by the Governor with Senate consent, plus the Commissioner of Agriculture ex officio (C.R.S. 35-65-401).",
    seatSource: "https://codes.findlaw.com/co/title-35-agriculture/co-rev-st-sect-35-65-401/",
    criticalNote: "12 governor-appointed members (plus the Commissioner of Agriculture ex officio)",
  },
  "State Board of Stock Inspection Commissioners": {
    totalSeats: 5, domain: "environment",
    constituent: "Colorado's livestock producers & the brand-inspection system",
    mandate: "Oversees Colorado's livestock brand inspection and theft prevention. Five commissioners appointed by the Governor with Senate consent, all actively engaged in cattle, horse or sheep production (C.R.S. 35-41-101).",
    seatSource: "https://law.justia.com/codes/colorado/title-35/livestock/article-41/section-35-41-101/",
  },
  "Juvenile Parole Board": {
    totalSeats: 9, domain: "justice",
    constituent: "Colorado's paroled youth & public safety",
    mandate: "Sets parole and release decisions for Colorado's committed youth. Nine members appointed by the Governor with Senate consent — four drawn from named state departments and five from the public at large (C.R.S. 19-2.5-1201).",
    seatSource: "https://law.justia.com/codes/colorado/title-19/article-2-5/part-12/section-19-2-5-1201/",
  },
  "Unlicensed Psychotherapists, State Board of": {
    totalSeats: 7, domain: "health",
    constituent: "Colorado psychotherapy clients & registered unlicensed psychotherapists",
    mandate: "Regulates Colorado's registered unlicensed psychotherapists. Seven members appointed by the Governor — four unlicensed psychotherapists, one regulated psychotherapist, and two public members (C.R.S. 12-245-702).",
    seatSource: "https://law.justia.com/codes/colorado/2023/title-12/health-care-professions-and-occupations/article-245/part-7/section-12-245-702/",
  },
  "Aeronautical Board, Colorado": {
    totalSeats: 9, domain: "environment",
    constituent: "Colorado airports, pilots & the state aviation system",
    mandate: "Directs Colorado's aviation grants and the Division of Aeronautics. Nine voting members appointed by the Governor, plus the executive director of the Department of Public Health and Environment (or designee) ex officio, nonvoting (C.R.S. 43-10-105).",
    seatSource: "https://www.codot.gov/programs/aeronautics/colorado-aeronautical-board",
    criticalNote: "9 governor-appointed voting members (1 ex-officio nonvoting member excluded)",
  },
  "Prescription Drug Affordability Review Board": {
    totalSeats: 5, domain: "health",
    constituent: "Coloradans facing high prescription-drug costs",
    mandate: "Reviews and may cap the cost of high-priced prescription drugs for Coloradans. Five members appointed by the Governor with Senate consent, each with expertise in clinical medicine or health-care economics (C.R.S. 10-16-1403).",
    seatSource: "https://doi.colorado.gov/insurance-products/health-insurance/prescription-drug-affordability-review-board",
  },
};
