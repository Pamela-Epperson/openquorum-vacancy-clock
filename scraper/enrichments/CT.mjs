// ─── Connecticut enrichment overlay — HUMAN-VERIFIED (CGS) ─────────────────────
// Ported July 25, 2026 when CT moved from a 3-row manual seed to the portal.ct.gov
// inventory profile (profiles/ct.mjs, ~37 boards). These three keep CT's
// previously-live boards live; keys match the profile's emitted names (the
// Developmental Disabilities entry uses the portal directory's spelling).
export const ENRICHMENTS = {
  "Connecticut Medical Examining Board": {
    totalSeats: 21, domain: "health",
    constituent: "Connecticut patients & licensed physicians",
    mandate: "Licenses and disciplines Connecticut physicians. Twenty-one governor-appointed members — thirteen physicians, one physician assistant, seven public members (CGS § 20-8a).",
    seatSource: "https://law.justia.com/codes/connecticut/title-20/chapter-370/section-20-8a/",
  },
  "Connecticut State Board of Education": {
    totalSeats: 14, domain: "education",
    constituent: "Connecticut K-12 students & families",
    mandate: "Oversees Connecticut's public elementary and secondary education. Fourteen members — nine governor-appointed voting members, three ex officio, two student members (CGS § 10-1).",
    seatSource: "https://law.justia.com/codes/connecticut/title-10/chapter-163/section-10-1/",
    criticalNote: "9 of 14 seats are governor-appointed",
  },
  "Developmental Disabilities, Connecticut Council of": {
    totalSeats: 24, domain: "disability",
    constituent: "Connecticut residents with developmental disabilities",
    mandate: "Federally mandated DD Council advocating for Connecticut residents with developmental disabilities. Twenty-four governor-appointed members.",
    seatSource: "https://portal.ct.gov/CTCDD/About/About-Us/Who-We-Are-and-What-We-Do",
  },
};
