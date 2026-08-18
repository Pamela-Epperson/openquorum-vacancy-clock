// ─── Washington enrichment overlay — HUMAN-VERIFIED facts ───────────────────────
// Verified July 8, 2026 against the Revised Code of Washington (RCW).
// The scraper merges these onto scraped vacancy rows by EXACT board name
// (keys below must match the name strings emitted by profiles/wa.mjs).
// seatSource = the RCW section proving totalSeats. Rows without an overlay
// entry stay provisional (tracked, not published).
//
// NOTE ON SCOPE: 7 flagship boards verified for the initial WA go-live.
// The remaining ~116 scraped WA boards stay staged until enriched. Boards
// whose seat counts derive from federal law rather than a citable RCW
// (e.g. the Developmental Disabilities Council, 27 members under the federal
// DD Act) are deliberately EXCLUDED — no invented statutory citation.
export const ENRICHMENTS = {
  "Human Rights Commission": {
    totalSeats: 5, domain: "equity",
    constituent: "All Washingtonians · protection from discrimination",
    mandate: "Enforces the Washington Law Against Discrimination and works to eliminate and prevent discrimination in employment, housing, public accommodation, credit, and insurance. Five members appointed by the Governor with the advice and consent of the Senate (RCW 49.60.050).",
    seatSource: "https://app.leg.wa.gov/RCW/default.aspx?cite=49.60.050",
  },
  "Health, State Board of": {
    totalSeats: 10, domain: "health",
    constituent: "All Washington residents · public health policy",
    mandate: "Sets statewide public health policy and adopts rules on communicable disease, drinking water, and environmental health. Composed of ten members — the Secretary of Health (or designee) and nine gubernatorial appointees including health professionals, local officials, and consumer representatives (RCW 43.20.030).",
    seatSource: "https://app.leg.wa.gov/RCW/default.aspx?cite=43.20.030",
  },
  "Charter School Commission": {
    totalSeats: 9, domain: "education",
    constituent: "Washington charter public school students & families",
    mandate: "Authorizes and oversees high-quality charter public schools, with a focus on expanding opportunity for at-risk students. Nine members appointed by the Governor, the President of the Senate, and the Speaker of the House (RCW 28A.710.070).",
    seatSource: "https://app.leg.wa.gov/RCW/default.aspx?cite=28A.710.070",
  },
  "Nursing, Washington State Board of": {
    totalSeats: 17, domain: "health",
    constituent: "Washington patients · nursing licensure & safety",
    mandate: "Licenses and regulates registered nurses, advanced practice nurses, practical nurses, and nursing assistants, and sets standards to protect patient safety. Seventeen members appointed by the Governor to four-year terms (RCW 18.79.070).",
    seatSource: "https://app.leg.wa.gov/RCW/default.aspx?cite=18.79.070",
  },
  "Student Achievement Council, Washington": {
    totalSeats: 10, domain: "education",
    constituent: "Washington college students & higher-ed learners",
    mandate: "Sets statewide higher-education goals and strategy and administers student financial aid programs. Ten voting members — six citizen members appointed by the Governor and confirmed by the Senate (two of them students) plus four education-sector representatives (RCW 28B.77.005).",
    seatSource: "https://app.leg.wa.gov/RCW/default.aspx?cite=28B.77.005",
  },
  "Universal Health Care Commission": {
    totalSeats: 15, domain: "health",
    constituent: "All Washingtonians · path to universal coverage",
    mandate: "Develops the framework and recommendations for a universal health care system in Washington, including financing and delivery design. Fifteen members — six appointed by the Governor plus legislative and state-agency members (RCW 41.05.840).",
    seatSource: "https://app.leg.wa.gov/RCW/default.aspx?cite=41.05.840",
  },
  "Women’s Commission, Washington State": {
    totalSeats: 9, domain: "equity",
    constituent: "Women & girls across Washington State",
    mandate: "Advises the Governor, Legislature, and state agencies on issues affecting women and works to improve the well-being of women and girls in Washington. Nine members appointed by the Governor with the advice and consent of the Senate (chapter 43.119 RCW).",
    seatSource: "https://app.leg.wa.gov/RCW/default.aspx?cite=43.119&full=true",
  },
  "Medical Commission, Washington": {
    totalSeats: 21, domain: "health",
    constituent: "Washington patients & licensed physicians",
    mandate: "Licenses and disciplines physicians and physician assistants. Twenty-one members — thirteen physicians, two physician assistants, six public members (RCW 18.71.015).",
    seatSource: "https://app.leg.wa.gov/rcw/default.aspx?cite=18.71.015",
  },
  "Workforce Training and Education Coordinating Board": {
    totalSeats: 9, domain: "education",
    constituent: "Washington job seekers, workers & employers",
    mandate: "Coordinates Washington's workforce development system. Nine voting members — three business, three labor, three agency ex officio (RCW 28C.18.020).",
    seatSource: "https://app.leg.wa.gov/rcw/default.aspx?cite=28C.18.020",
    criticalNote: "6 of 9 voting seats are governor-appointed",
  },
  "Affordable Housing Advisory Board": {
    totalSeats: 25, domain: "housing",
    constituent: "Washingtonians needing affordable housing",
    mandate: "Advises the Department of Commerce on housing and housing finance policy. Twenty-five members including three ex officio nonvoting (RCW 43.185B.020).",
    seatSource: "https://app.leg.wa.gov/rcw/default.aspx?cite=43.185B.020",
    criticalNote: "3 of 25 seats are ex officio nonvoting",
  },
  "Dental Quality Assurance Commission": {
    totalSeats: 21, domain: "health",
    constituent: "Washington dental patients & licensed dentists",
    mandate: "Licenses and disciplines Washington's dentists, dental therapists, and auxiliaries. Twenty-one members appointed by the Governor — twelve dentists, four dental therapists, two expanded-function auxiliaries, and three public members (RCW 18.32).",
    seatSource: "https://law.justia.com/codes/washington/title-18/chapter-18-32/",
  },
  "Pharmacy Quality Assurance Commission": {
    totalSeats: 16, domain: "health",
    constituent: "Washington patients & licensed pharmacists · drug safety",
    mandate: "Licenses pharmacists and regulates pharmacy practice in Washington. Sixteen members appointed by the Governor with Senate consent — nine pharmacists, two technicians, four public, and one pharmacy-owner member (RCW 18.64.001).",
    seatSource: "https://law.justia.com/codes/washington/title-18/chapter-18-64/",
  },
  "Chiropractic Quality Assurance Commission": {
    totalSeats: 14, domain: "health",
    constituent: "Washington chiropractic patients & licensees",
    mandate: "Licenses and disciplines Washington's chiropractors. Fourteen members appointed by the Governor — eleven practicing chiropractors and three public members (RCW 18.25).",
    seatSource: "https://law.justia.com/codes/washington/title-18/chapter-18-25/",
  },
  "Optometry Board": {
    totalSeats: 6, domain: "health",
    constituent: "Washington eye-care patients & licensed optometrists",
    mandate: "Licenses and regulates Washington's optometrists. Six members appointed by the Governor — five optometrists and one consumer member (RCW 18.54).",
    seatSource: "https://law.justia.com/codes/washington/title-18/chapter-18-54/",
  },
  "Osteopathic Medicine and Surgery, Board of": {
    totalSeats: 11, domain: "health",
    constituent: "Washington patients & licensed D.O. physicians",
    mandate: "Licenses and disciplines Washington's osteopathic physicians and surgeons. Eleven members appointed by the Governor — nine osteopathic physicians and two public members (RCW 18.57.003).",
    seatSource: "https://law.justia.com/codes/washington/title-18/chapter-18-57/",
  },
  "Physical Therapy, Board of": {
    totalSeats: 7, domain: "health",
    constituent: "Washington patients & licensed physical therapists",
    mandate: "Licenses and regulates Washington's physical therapists and assistants. Seven members appointed by the Governor — five PTs, one PT assistant, and one public member (RCW 18.74.020).",
    seatSource: "https://law.justia.com/codes/washington/title-18/chapter-18-74/",
  },
  "Psychology, Examining Board of": {
    totalSeats: 11, domain: "health",
    constituent: "Washingtonians seeking psychological care & licensed psychologists",
    mandate: "Licenses and regulates Washington's psychologists. Eleven members appointed by the Governor — nine psychologists and two public members (RCW 18.83.035).",
    seatSource: "https://law.justia.com/codes/washington/title-18/chapter-18-83/",
  },
  "Podiatric Medical Board": {
    totalSeats: 7, domain: "health",
    constituent: "Washington patients & licensed podiatrists",
    mandate: "Licenses and disciplines Washington's podiatric physicians and surgeons. Seven members appointed by the Governor — five podiatric physicians and two public members (RCW 18.22.013).",
    seatSource: "https://law.justia.com/codes/washington/title-18/chapter-18-22/",
  },
  "Veterinary Board of Governors": {
    totalSeats: 9, domain: "health",
    constituent: "Washington animal owners & licensed veterinarians",
    mandate: "Licenses and disciplines Washington's veterinarians and veterinary technicians. Nine members appointed by the Governor — veterinarians, a veterinary technician, and a public member (RCW 18.92.021).",
    seatSource: "https://law.justia.com/codes/washington/title-18/chapter-18-92/",
  },
  "Nursing Home Administrators, Board of": {
    totalSeats: 11, domain: "health",
    constituent: "Washington nursing-home residents & licensed administrators",
    mandate: "Licenses and regulates Washington's nursing home administrators. Eleven members appointed by the Governor (RCW 18.52).",
    seatSource: "https://law.justia.com/codes/washington/title-18/chapter-18-52/",
  },
  "Real Estate Commission": {
    totalSeats: 7, domain: "housing",
    constituent: "Washington home buyers & licensed real estate brokers",
    mandate: "Advises on and regulates Washington's real estate brokers and managing brokers. Six members appointed by the Governor to six-year terms, with the Director of Licensing serving ex officio as chair (RCW 18.85.021).",
    seatSource: "https://law.justia.com/codes/washington/title-18/chapter-18-85/",
    criticalNote: "6 of 7 seats are governor-appointed (Director ex officio chair)",
  },
  "Engineers and Land Surveyors, Board of Registration for Professional": {
    totalSeats: 7, domain: "justice",
    constituent: "Washingtonians & licensed engineers/surveyors · public safety",
    mandate: "Licenses and regulates Washington's professional engineers and land surveyors. Seven members appointed by the Governor — engineers and land surveyors (RCW 18.43.030).",
    seatSource: "https://law.justia.com/codes/washington/title-18/chapter-18-43/",
  },
  "Architects, Board of Registration for": {
    totalSeats: 7, domain: "justice",
    constituent: "Washingtonians & licensed architects · building safety",
    mandate: "Licenses and regulates Washington's architects. Seven members appointed by the Governor — six registered architects and one public member (RCW 18.08.330).",
    seatSource: "https://law.justia.com/codes/washington/title-18/chapter-18-08/",
  },
  "Parks and Recreation Commission": {
    totalSeats: 7, domain: "environment",
    constituent: "Washington state-park visitors & public lands",
    mandate: "Sets policy for Washington's state parks system — budget priorities, strategic plan, and park rules. Seven citizen members appointed by the Governor with Senate consent (RCW 79A.05.015).",
    seatSource: "https://law.justia.com/codes/washington/title-79a/chapter-79a-05/",
  },
};
