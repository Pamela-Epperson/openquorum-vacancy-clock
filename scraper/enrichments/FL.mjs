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
};
