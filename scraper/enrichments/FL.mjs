// ─── Florida enrichment overlay — HUMAN-VERIFIED ──────────────────────────────
// Keeps FL's two previously-live boards live through the switch to the
// SeatApplication.aspx inventory profile (profiles/fl.mjs, ~296 boards).
// "Board of Medicine" matches the form's option text; State Board of Education
// is carried by the profile's SUPPLEMENT.
export const ENRICHMENTS = {
  "Board of Medicine": {
    totalSeats: 15, domain: "health",
    constituent: "Florida patients & licensed physicians",
    mandate: "Licenses and disciplines Florida physicians. Fifteen members appointed by the Governor with Senate confirmation — twelve physicians, three consumer members (Fla. Stat. § 458.307).",
    seatSource: "https://www.flsenate.gov/Laws/Statutes/2024/458.307",
  },
  "Florida State Board of Education": {
    totalSeats: 7, domain: "education",
    constituent: "Florida K-12 students & families",
    mandate: "Chief policy body for Florida public education. Seven members appointed by the Governor to staggered four-year terms, Senate-confirmed (Fla. Const. art. IX).",
    seatSource: "https://www.flsenate.gov/Laws/Constitution#A9S02",
  },
  "Board of Nursing": {
    totalSeats: 13, domain: "health",
    constituent: "Florida patients & licensed nurses",
    mandate: "Licenses and disciplines Florida's nurses. Thirteen members appointed by the Governor and confirmed by the Senate — registered and practical nurses plus consumer members (F.S. 464.004).",
    seatSource: "https://law.justia.com/codes/florida/title-xxxii/chapter-464/section-464-004/",
  },
  "Board of Pharmacy": {
    totalSeats: 9, domain: "health",
    constituent: "Florida patients & licensed pharmacists · drug safety",
    mandate: "Licenses pharmacists and regulates pharmacy practice in Florida. Nine members appointed by the Governor with Senate confirmation — seven pharmacists and two consumer members (F.S. 465.004).",
    seatSource: "https://law.justia.com/codes/florida/title-xxxii/chapter-465/section-465-004/",
  },
  "Board of Osteopathic Medicine": {
    totalSeats: 7, domain: "health",
    constituent: "Florida patients & licensed D.O. physicians",
    mandate: "Licenses and disciplines Florida's osteopathic physicians. Seven members appointed by the Governor with Senate confirmation — five D.O.s and two consumer members (F.S. 459.004).",
    seatSource: "https://law.justia.com/codes/florida/title-xxxii/chapter-459/section-459-004/",
  },
  "Board of Optometry": {
    totalSeats: 7, domain: "health",
    constituent: "Florida eye-care patients & licensed optometrists",
    mandate: "Licenses and regulates Florida's optometrists. Seven members appointed by the Governor with Senate confirmation — five optometrists and two consumer members (F.S. 463.003).",
    seatSource: "https://law.justia.com/codes/florida/title-xxxii/chapter-463/section-463-003/",
  },
  "Board of Chiropractic Medicine": {
    totalSeats: 7, domain: "health",
    constituent: "Florida chiropractic patients & licensees",
    mandate: "Licenses and disciplines Florida's chiropractic physicians. Seven members appointed by the Governor with Senate confirmation (F.S. 460.404).",
    seatSource: "https://law.justia.com/codes/florida/title-xxxii/chapter-460/section-460-404/",
  },
  "Board of Podiatric Medicine": {
    totalSeats: 7, domain: "health",
    constituent: "Florida patients & licensed podiatrists",
    mandate: "Licenses and disciplines Florida's podiatric physicians. Seven members appointed by the Governor with Senate confirmation — five podiatrists and two consumer members (F.S. 461.005).",
    seatSource: "https://law.justia.com/codes/florida/title-xxxii/chapter-461/",
  },
  "Board of Psychology": {
    totalSeats: 7, domain: "health",
    constituent: "Floridians seeking psychological care & licensed psychologists",
    mandate: "Licenses and regulates Florida's psychologists. Seven members appointed by the Governor with Senate confirmation — five psychologists and two consumer members (F.S. 490.004).",
    seatSource: "https://law.justia.com/codes/florida/title-xxxii/chapter-490/section-490-004/",
  },
  "Board of Physical Therapy Practice": {
    totalSeats: 7, domain: "health",
    constituent: "Florida patients & licensed physical therapists",
    mandate: "Licenses and regulates Florida's physical therapists and PT assistants. Seven members appointed by the Governor with Senate confirmation (F.S. 486.023).",
    seatSource: "https://law.justia.com/codes/florida/title-xxxii/chapter-486/section-486-023/",
  },
  "Board of Accountancy": {
    totalSeats: 9, domain: "justice",
    constituent: "Florida businesses & licensed CPAs · audit integrity",
    mandate: "Licenses and disciplines Florida's certified public accountants. Nine members appointed by the Governor with Senate confirmation — seven CPAs and two lay members (F.S. 473.303).",
    seatSource: "https://law.justia.com/codes/florida/title-xxxii/chapter-473/section-473-303/",
  },
  "Board of Professional Engineers": {
    totalSeats: 11, domain: "justice",
    constituent: "Floridians & licensed professional engineers · public safety",
    mandate: "Licenses and regulates Florida's professional engineers. Eleven members appointed by the Governor — nine licensed engineers and two lay members (F.S. 471.007).",
    seatSource: "https://law.justia.com/codes/florida/title-xxxii/chapter-471/section-471-007/",
  },
  "Florida Real Estate Commission": {
    totalSeats: 7, domain: "housing",
    constituent: "Florida home buyers & licensed real estate brokers",
    mandate: "Licenses and regulates Florida's real estate brokers and sales associates. Seven members appointed by the Governor with Senate confirmation — five licensees and two consumer members (F.S. 475.02).",
    seatSource: "https://law.justia.com/codes/florida/title-xxxii/chapter-475/section-475-02/",
  },
  "Florida Fish and Wildlife Conservation Commission": {
    totalSeats: 7, domain: "environment",
    constituent: "Florida's fish, wildlife & outdoors",
    mandate: "Manages Florida's fish and wildlife resources — a constitutional commission. Seven members appointed by the Governor with Senate confirmation, staggered five-year terms (Fla. Const. Art. IV, Sec. 9).",
    seatSource: "https://codes.findlaw.com/fl/florida-constitution1968-revision/fl-const-art-4-sect-9/",
  },
  "Florida Public Service Commission": {
    totalSeats: 5, domain: "justice",
    constituent: "Every Florida utility ratepayer · electric, gas, water, telecom",
    mandate: "Regulates Florida's investor-owned electric, natural-gas, water, and telecom utilities and their rates. Five commissioners appointed by the Governor from a nominating council's slate, Senate-confirmed (F.S. 350.031).",
    seatSource: "https://law.justia.com/codes/florida/title-xxvii/chapter-350/section-350-031/",
  },
  "Florida Transportation Commission": {
    totalSeats: 9, domain: "environment",
    constituent: "Florida travelers & the statewide transportation system",
    mandate: "Citizen oversight board for the Florida Department of Transportation — policy, accountability, and major-project review. Nine members appointed by the Governor with Senate confirmation (F.S. 20.23).",
    seatSource: "https://law.justia.com/codes/florida/title-iv/chapter-20/section-20-23/",
  },

  // ── Depth expansion 2026-10-01 (governor-appointed voting seats only) ──
  "Board of Governors of the State University System": {
    totalSeats: 14, domain: "education",
    constituent: "Florida's 12 state universities, students & faculty",
    mandate: "Constitutional governing body of Florida's State University System. Seventeen members; fourteen appointed by the Governor and Senate-confirmed, plus three ex-officio members (Commissioner of Education, faculty-senates council chair, student association chair) (Fla. Const. Art. IX, Sec. 7).",
    seatSource: "https://codes.findlaw.com/fl/florida-constitution1968-revision/fl-const-art-9-sect-7/",
    criticalNote: "14 of 17 seats are governor-appointed (3 ex officio)",
  },
  "Board of Dentistry": {
    totalSeats: 11, domain: "health",
    constituent: "Florida dental patients & licensed dentists/hygienists",
    mandate: "Licenses and disciplines Florida's dentists and dental hygienists. Eleven members appointed by the Governor with Senate confirmation — seven dentists, two dental hygienists, two laypersons (F.S. 466.004).",
    seatSource: "https://www.flsenate.gov/laws/statutes/2024/466.004",
  },
  "Board of Clinical Social Work, Marriage and Family Therapy, and Mental Health Counseling": {
    totalSeats: 9, domain: "health",
    constituent: "Floridians seeking mental-health care & licensed therapists",
    mandate: "Licenses Florida's clinical social workers, marriage & family therapists, and mental health counselors. Nine members appointed by the Governor with Senate confirmation — two of each profession plus three lay members (F.S. 491.004).",
    seatSource: "https://law.justia.com/codes/florida/title-xxxii/chapter-491/section-491-004/",
  },
  "Construction Industry Licensing Board": {
    totalSeats: 18, domain: "housing",
    constituent: "Florida building owners & licensed contractors · construction safety",
    mandate: "Licenses and disciplines Florida's construction contractors. Eighteen members appointed by the Governor with Senate confirmation — sixteen contractor/building-official members and two consumer members (F.S. 489.107).",
    seatSource: "https://www.flsenate.gov/laws/statutes/2025/489.107",
  },
  "Board of Veterinary Medicine": {
    totalSeats: 7, domain: "health",
    constituent: "Florida pet owners, livestock & licensed veterinarians",
    mandate: "Licenses and disciplines Florida's veterinarians. Seven members appointed by the Governor with Senate confirmation — five veterinarians and two laypersons (F.S. 474.204).",
    seatSource: "https://www.flsenate.gov/laws/statutes/2025/474.204",
  },
  "Board of Cosmetology": {
    totalSeats: 7, domain: "justice",
    constituent: "Florida salon clients & licensed cosmetologists",
    mandate: "Licenses and regulates Florida's cosmetology practice and salons. Seven members appointed by the Governor with Senate confirmation — five cosmetologists and two laypersons (F.S. 477.019).",
    seatSource: "https://www.flsenate.gov/laws/statutes/2024/477.019",
  },
  "Board of Architecture and Interior Design": {
    totalSeats: 11, domain: "housing",
    constituent: "Floridians & licensed architects/interior designers · building safety",
    mandate: "Licenses and regulates Florida's architects and interior designers. Eleven members appointed by the Governor with Senate confirmation — five architects, three interior designers, three laypersons (F.S. 481.205).",
    seatSource: "https://www.flsenate.gov/laws/statutes/2024/481.205",
  },
  "Florida Building Commission": {
    totalSeats: 19, domain: "housing",
    constituent: "Every Floridian in a built structure · statewide building code",
    mandate: "Develops and maintains the Florida Building Code. Nineteen members appointed by the Governor with Senate confirmation, representing design, construction, building-official, fire-safety and related sectors (F.S. 553.74).",
    seatSource: "https://www.flsenate.gov/laws/statutes/2025/553.74",
  },
  "Florida Citrus Commission": {
    totalSeats: 11, domain: "environment",
    constituent: "Florida's citrus growers, processors & the industry",
    mandate: "Governs the Florida Department of Citrus and the state's citrus marketing and research. Eleven members appointed by the Governor, each an experienced Florida citrus grower, shipper or processor (F.S. 601.04).",
    seatSource: "https://www.flsenate.gov/laws/statutes/2024/601.04",
  },
  "Board of Massage Therapy": {
    totalSeats: 7, domain: "health",
    constituent: "Florida massage clients & licensed massage therapists",
    mandate: "Licenses and regulates Florida's massage therapists and establishments. Seven members appointed by the Governor with Senate confirmation — five massage therapists and two laypersons (F.S. 480.035).",
    seatSource: "https://flsenate.gov/laws/statutes/2023/480.035",
  },
  "Board of Nursing Home Administrators": {
    totalSeats: 7, domain: "health",
    constituent: "Florida nursing-home residents & licensed administrators",
    mandate: "Licenses and disciplines Florida's nursing home administrators. Seven members appointed by the Governor with Senate confirmation — three administrators, two health-care practitioners, two laypersons (F.S. 468.1665).",
    seatSource: "https://law.justia.com/codes/florida/2018/title-xxxii/chapter-468/part-ii/section-468.1665/",
  },
  "Environmental Regulation Commission": {
    totalSeats: 7, domain: "environment",
    constituent: "Floridians affected by state environmental standards",
    mandate: "Sets Florida's environmental standards and rules for the Department of Environmental Protection. Seven members appointed by the Governor with Senate confirmation, representing agriculture, development, local government, the environmental community, the public and science (F.S. 403.804).",
    seatSource: "https://www.flsenate.gov/laws/statutes/2025/403.804",
  },
  "Board of Opticianry": {
    totalSeats: 7, domain: "health",
    constituent: "Florida eyewear consumers & licensed opticians",
    mandate: "Licenses and regulates Florida's opticians. Seven members appointed by the Governor with Senate confirmation — five opticians and two laypersons (F.S. 484.003).",
    seatSource: "https://flsenate.gov/Laws/Statutes/2023/0484.003",
  },
  "Board of Landscape Architecture": {
    totalSeats: 7, domain: "housing",
    constituent: "Floridians & licensed landscape architects · public spaces",
    mandate: "Licenses and regulates Florida's landscape architects. Seven members appointed by the Governor with Senate confirmation — five landscape architects and two laypersons (F.S. 481.305).",
    seatSource: "https://www.flsenate.gov/laws/statutes/2024/481.305",
  },
};
