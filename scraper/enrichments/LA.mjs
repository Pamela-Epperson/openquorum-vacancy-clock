// ─── Louisiana enrichment overlay — HUMAN-VERIFIED ────────────────────────────
// Keeps LA's two previously-live boards live through the switch to the Senate
// directory inventory profile (profiles/la.mjs, ~490 boards). Keys match the
// directory's exact board names.
export const ENRICHMENTS = {
  "Louisiana State Board of Medical Examiners": {
    totalSeats: 10, domain: "health",
    constituent: "Louisiana patients & licensed physicians",
    mandate: "Licenses and disciplines Louisiana physicians. Ten voting members appointed by the Governor with Senate confirmation from nominated slates plus one consumer member (La. R.S. 37:1263).",
    seatSource: "https://www.lsbme.la.gov/",
  },
  "Louisiana Developmental Disabilities Council": {
    totalSeats: 28, domain: "disability",
    constituent: "Louisianans with developmental disabilities",
    mandate: "Louisiana's federally mandated DD council. Twenty-eight governor-appointed members including people with disabilities, family members, and agency representatives.",
    seatSource: "https://laddc.org/",
  },
};
