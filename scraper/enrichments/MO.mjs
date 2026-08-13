// ─── Missouri enrichment overlay — HUMAN-VERIFIED facts ─────────────────────────
// Verified August 13, 2026 against the Revised Statutes of Missouri (RSMo).
// Keys match exact board names scraped from boards.mo.gov. Governor-appointed
// professional & regulatory boards only; seats are statutory totals (each cited).
export const ENRICHMENTS = {
  "Missouri State Board of Nursing": {
    totalSeats: 9, domain: "health",
    constituent: "Missouri patients & licensed nurses",
    mandate: "Licenses and disciplines Missouri's nurses and enforces the Nursing Practice Act. Nine members appointed by the Governor with the advice and consent of the Senate (RSMo 335.021).",
    seatSource: "https://revisor.mo.gov/main/OneSection.aspx?section=335.021",
  },
  "State Board of Pharmacy": {
    totalSeats: 7, domain: "health",
    constituent: "Missouri patients & licensed pharmacists · drug safety",
    mandate: "Licenses pharmacists and regulates the practice of pharmacy across Missouri. Seven members appointed by the Governor with Senate consent — six pharmacists and one voting public member (RSMo 338.110).",
    seatSource: "https://revisor.mo.gov/main/OneSection.aspx?section=338.110",
  },
  "State Board of Registration for the Healing Arts": {
    totalSeats: 9, domain: "health",
    constituent: "Missouri patients & licensed physicians",
    mandate: "Licenses and disciplines Missouri's physicians and surgeons. Nine members appointed by the Governor with Senate consent — eight physicians and one voting public member (RSMo Chapter 334).",
    seatSource: "https://pr.mo.gov/healingarts-about-the-board.asp",
  },
  "Missouri Real Estate Commission": {
    totalSeats: 7, domain: "justice",
    constituent: "Missouri home buyers & licensed real estate brokers",
    mandate: "Licenses and regulates Missouri's real estate brokers and salespersons. Seven members appointed by the Governor with Senate consent — six experienced brokers and one voting public member (RSMo 339.120).",
    seatSource: "https://revisor.mo.gov/main/OneSection.aspx?section=339.120",
  },
  "Missouri State Board of Accountancy": {
    totalSeats: 7, domain: "justice",
    constituent: "Missouri businesses & licensed CPAs · audit integrity",
    mandate: "Licenses and disciplines Missouri's certified public accountants. Seven members appointed by the Governor with Senate consent — six licensees and one voting public member (RSMo 326.259).",
    seatSource: "https://revisor.mo.gov/main/OneSection.aspx?section=326.259",
  },
};
