// ─── South Carolina enrichment overlay — HUMAN-VERIFIED (July 16, 2026) ────────
// Multiple keys per board cover naming variants in the SOS vacancy PDF.
// Depth expansion July 25, 2026: +4 statute-cited boards (health, education, justice).
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
  "State Board of Medical Examiners": {
    totalSeats: 13, domain: "health",
    constituent: "South Carolina patients & licensed physicians",
    mandate: "Licenses and disciplines South Carolina's physicians. Thirteen members appointed by the Governor with Senate consent — seven physicians (one per congressional district), two at-large physicians, one osteopathic physician, and three lay members (S.C. Code 40-47-10).",
    seatSource: "https://www.scstatehouse.gov/code/t40c047.php",
  },
  "South Carolina Board of Dentistry": {
    totalSeats: 11, domain: "health",
    constituent: "South Carolina dental patients & licensed dentists/hygienists",
    mandate: "Licenses and regulates South Carolina's dentists and dental hygienists. Eleven members — seven district dentists, one at-large dentist, two dental hygienists, and one lay member; the Governor appoints and fills vacancies (S.C. Code 40-15-20).",
    seatSource: "https://www.scstatehouse.gov/code/t40c015.php",
  },
  "South Carolina Commission on Higher Education": {
    totalSeats: 15, domain: "education",
    constituent: "South Carolina college students & public/independent institutions",
    mandate: "Coordinates South Carolina's public higher education policy, funding, and program approval. Fifteen members appointed by the Governor — one per congressional district, three at-large, plus institutional representatives (S.C. Code 59-103-10).",
    seatSource: "https://www.scstatehouse.gov/code/t59c103.php",
  },
  "South Carolina Workers' Compensation Commission": {
    totalSeats: 7, domain: "justice",
    constituent: "South Carolina's injured workers & employers",
    mandate: "Adjudicates South Carolina workers' compensation claims — a quasi-judicial body. Seven commissioners appointed by the Governor with Senate consent for six-year terms (S.C. Code 42-3-20).",
    seatSource: "https://www.scstatehouse.gov/code/t42c003.php",
  },
  "South Carolina Board of Chiropractic Examiners": {
    totalSeats: 9, domain: "health",
    constituent: "South Carolina patients & licensed chiropractors",
    mandate: "Licenses and disciplines South Carolina's chiropractors. Nine members appointed by the Governor — one chiropractor per congressional district, one at-large chiropractor, and one lay member (S.C. Code 40-9-30).",
    seatSource: "https://law.justia.com/codes/south-carolina/title-40/chapter-9/section-40-9-30/",
  },
  "Board of Podiatry Examiners": {
    totalSeats: 5, domain: "health",
    constituent: "South Carolina patients & licensed podiatrists",
    mandate: "Licenses and regulates South Carolina's podiatrists. Five members appointed by the Governor with Senate consent — three district podiatrists, one at-large podiatrist (chairman), and one lay member (S.C. Code 40-51-30).",
    seatSource: "https://law.justia.com/codes/south-carolina/title-40/chapter-51/section-40-51-30/",
  },
  "State Board of Physical Therapy Examiners": {
    totalSeats: 11, domain: "health",
    constituent: "South Carolina patients & licensed physical therapists",
    mandate: "Licenses and regulates South Carolina's physical therapists. Eleven members appointed by the Governor — seven district PTs, two physical-therapist assistants, and two public members (S.C. Code 40-45-10).",
    seatSource: "https://law.justia.com/codes/south-carolina/title-40/chapter-45/section-40-45-10/",
  },
  "State Board of Veterinary Medical Examiners": {
    totalSeats: 10, domain: "health",
    constituent: "South Carolina pet owners, livestock producers & licensed veterinarians",
    mandate: "Licenses and disciplines South Carolina's veterinarians. Ten members appointed by the Governor with Senate consent — seven district veterinarians, one at-large veterinarian, one veterinary technician, and one consumer member (S.C. Code 40-69-10).",
    seatSource: "https://law.justia.com/codes/south-carolina/title-40/chapter-69/section-40-69-10/",
  },
  "South Carolina Board of Occupational Therapy": {
    totalSeats: 7, domain: "health",
    constituent: "South Carolina patients & licensed occupational therapists",
    mandate: "Licenses and regulates South Carolina's occupational therapists. Seven members appointed by the Governor with Senate consent — five occupational therapists, one occupational-therapy assistant, and one lay member (S.C. Code 40-36-10).",
    seatSource: "https://law.justia.com/codes/south-carolina/title-40/chapter-36/section-40-36-10/",
  },
  "South Carolina Real Estate Appraisers Board": {
    totalSeats: 8, domain: "housing",
    constituent: "South Carolina home buyers, lenders & licensed appraisers",
    mandate: "Licenses and regulates South Carolina's real estate appraisers. Eight members appointed by the Governor with Senate consent — four licensed/certified appraisers, a real estate broker, a mortgage lender, an appraisal-management-company member, and a public member (S.C. Code 40-60-10).",
    seatSource: "https://law.justia.com/codes/south-carolina/title-40/chapter-60/section-40-60-10/",
  },
  "State Board of Social Work Examiners": {
    totalSeats: 7, domain: "health",
    constituent: "South Carolina clients & licensed social workers",
    mandate: "Licenses and regulates South Carolina's social workers. Seven members appointed by the Governor with Senate consent — two baccalaureate, two master, and two independent social workers, plus one lay member (S.C. Code 40-63-10).",
    seatSource: "https://law.justia.com/codes/south-carolina/title-40/chapter-63/section-40-63-10/",
  },
  "State Board of Cosmetology": {
    totalSeats: 7, domain: "equity",
    constituent: "South Carolina salon consumers & licensed cosmetology workers",
    mandate: "Licenses and regulates South Carolina's cosmetologists, estheticians, and nail technicians. Seven members appointed by the Governor with Senate consent — four cosmetologists, one esthetician, one nail technician, and one public member (S.C. Code 40-13-10).",
    seatSource: "https://law.justia.com/codes/south-carolina/title-40/chapter-13/section-40-13-10/",
  },
  "South Carolina Board of Examiners in Opticianry": {
    totalSeats: 7, domain: "health",
    constituent: "South Carolina eyewear consumers & licensed opticians",
    mandate: "Licenses and regulates South Carolina's opticians. Seven members appointed by the Governor — five licensed opticians nominated by profession-wide election plus public members (S.C. Code 40-38-10).",
    seatSource: "https://law.justia.com/codes/south-carolina/title-40/chapter-38/section-40-38-10/",
  },
  "South Carolina Board of Long Term Health Care Administrators": {
    totalSeats: 9, domain: "health",
    constituent: "South Carolina nursing-home & residential-care residents and administrators",
    mandate: "Licenses and disciplines South Carolina's nursing-home and community-residential-care administrators. Nine voting members appointed by the Governor with Senate consent (S.C. Code 40-35-10).",
    seatSource: "https://law.justia.com/codes/south-carolina/title-40/chapter-35/section-40-35-10/",
    criticalNote: "Nine governor-appointed voting members; the DHEC Commissioner (or designee) serves ex officio, nonvoting",
  },
  "State Board of Architectural Examiners": {
    totalSeats: 6, domain: "housing",
    constituent: "South Carolina building owners & licensed architects",
    mandate: "Licenses and regulates South Carolina's architects. Six members appointed by the Governor — four practicing architects, one architecture professor, and one public member (S.C. Code 40-3-10).",
    seatSource: "https://law.justia.com/codes/south-carolina/title-40/chapter-3/section-40-3-10/",
  },
  "South Carolina Residential Builders Commission": {
    totalSeats: 8, domain: "housing",
    constituent: "South Carolina homeowners & licensed residential builders",
    mandate: "Licenses and regulates South Carolina's residential home builders and specialty contractors. Eight members appointed by the Governor with Senate consent — one per congressional district plus one at-large, including four builders, one specialty contractor, and two consumers (S.C. Code 40-59-10).",
    seatSource: "https://law.justia.com/codes/south-carolina/title-40/chapter-59/section-40-59-10/",
  },
};
