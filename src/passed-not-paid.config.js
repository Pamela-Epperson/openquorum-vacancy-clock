// @ts-nocheck
// ─── OpenQuorum · ImpactMap dimension: "Passed, Not Paid" ──────────────────────
// SINGLE SOURCE OF TRUTH. Lives in openquorum-vacancy-clock/src/. On every change
// to this file (push to main), the pnp-sync workflow validates it against the
// prove-it contract (passed-not-paid.tools.mjs), generates pnp-gaps.json, and
// pushes that to the site root (openquorum.us.com/pnp-gaps.json) where the gallery
// fetches it. Nothing ships unvalidated; adding a vetted case = edit this one file.
//
// Phase 1 = federal only. Two tiers:
//   tier:"crumbs"    → STRICT CORE: authorized/mandated but $0 or ≤~5% appropriated.
//   tier:"shortfall" → TARGET-SHORTFALL: funded, but far below the statutory promise.
// Prove-it: every case carries ≥1 labeled source + lastVerified. No invented
// figures — every amount traces to the statute or an authoritative source.
// Non-partisan by construction (laws signed by both parties).
// status: open | resolved | lapsed.
//
// ARRAY ORDER IS DISPLAY ORDER: the gallery renders crumbs then shortfall in the
// order below (resolved cases move to the "Closed" section). Keep voting +
// civil-rights first.
//
// Record shape:
//   { id, title, law, jurisdiction, domain, tier, status, barPct,
//     authorized, appropriated, fundedShare, gap,
//     authorizingCitation, appropriationSource, constituent, criticalNote,
//     sources:[[label,url],...], lastVerified,
//     closedLabel?, wasLabel? }   // closedLabel + wasLabel required when resolved
//
// Presentation fields consumed by the gallery:
//   barPct     → integer 0–100, the "delivered" fill of the Promised/Delivered bar
//                (curated; resolved cases always render 100).
//   fundedShare→ left legend under the bar.   gap → right legend.
//   criticalNote → the card's footnote.        sources → the card's source links.

export const GAPS = [

  // ───────────────────── TIER 1 · "CRUMBS" (strict ≤5% / $0) ─────────────────────
  {
    id: "us-hava-requirements-2002",
    title: "Fix the voting machines — then the money was cut to zero",
    law: "Help America Vote Act of 2002 (Pub. L. 107-252)",
    jurisdiction: "US",
    domain: "justice",
    tier: "crumbs",
    status: "open",
    barPct: 0,
    authorized: "~$3.86B total; incl. 'requirements payments' to help states meet federal voting-system standards",
    appropriated: "Requirements payments eliminated to $0 in FY2005–FY2007; ~$672–727M of authorized requirements funds left unappropriated",
    fundedShare: "$0 requirements funding in FY05–07",
    gap: "~$672–727M of the requirements-payment promise unappropriated (mid-2000s)",
    authorizingCitation: "Pub. L. 107-252, Title II (requirements payments)",
    appropriationSource: "League of Women Voters; Rep. Holt floor statement (2006); Senate Rules Committee",
    constituent: "County election offices modernizing registration & accessible voting systems",
    criticalNote: "HAVA ultimately disbursed billions over time; the documented gap is the FY05–07 window when requirements funding was zeroed. Advocate/legislator figures ($672M vs $727M) vary by date.",
    sources: [
      ["League of Women Voters", "https://www.lwv.org/node/934698"],
      ["Senate Rules Cmte", "https://www.rules.senate.gov/news/minority-news/schumer-pushes-for-full-funding-for-voting-rights-legislation"]
    ],
    lastVerified: "2026-10-27"
  },
  {
    id: "us-emmett-till-coldcase-2007",
    title: "Civil-rights cold cases: the funding never came",
    law: "Emmett Till Unsolved Civil Rights Crime Act of 2007",
    jurisdiction: "US",
    domain: "justice",
    tier: "crumbs",
    status: "open",
    barPct: 0,
    authorized: "~$13.5M/yr (FY2008–2017; reauthorized 2016): $10M to DOJ/FBI for federal cold-case work, $2M for state/local grants, $1.5M to the Community Relations Service",
    appropriated: "$0 — per the Attorney General's First Annual Report (2009): 'funds authorized by this Act have not been appropriated'; DOJ met its duties by diverting existing resources",
    fundedShare: "$0 appropriated (authoritative, early years)",
    gap: "The full ~$13.5M/yr authorization, unfunded",
    authorizingCitation: "Pub. L. 110-344 (2008); reauthorized Pub. L. 114-325 (2016)",
    appropriationSource: "DOJ Attorney General's First Annual Report to Congress (Apr. 7, 2009), fn. 3 & 6",
    constituent: "Families seeking justice in unsolved civil-rights-era killings",
    criticalNote: "Authoritative DOJ primary source. A SEPARATE OJP/BJA grant program (created by the 2016 reauthorization) later provided ~$2–3M/yr to state/local agencies — still a fraction of the authorization, and the $10M DOJ/FBI stream was never appropriated as a dedicated line. (Earlier draft wrongly measured the $10M authorization against those later grants.)",
    sources: [
      ["DOJ AG 1st Annual Report", "https://www.justice.gov/sites/default/files/crt/legacy/2015/06/18/tillreport_01.pdf"],
      ["Act (congress.gov)", "https://www.congress.gov/bill/110th-congress/senate-bill/535"]
    ],
    lastVerified: "2026-10-27"
  },
  {
    id: "us-real-id-2005",
    title: "A national ID standard, funded at two cents on the dollar",
    law: "REAL ID Act of 2005 (Pub. L. 109-13, Div. B)",
    jurisdiction: "US",
    domain: "justice",
    tier: "crumbs",
    status: "open",
    barPct: 2,
    authorized: "National driver's-license/ID standards; DHS estimated ~$3.9B cost to states (~$9.9B total nationwide)",
    appropriated: "≈ $90M in federal grants (e.g., $40M in 2005 + $50M FY2008 omnibus)",
    fundedShare: "~2% of DHS's state-cost estimate",
    gap: "~$3.8B of the estimated state burden left to the states",
    authorizingCitation: "Pub. L. 109-13, Div. B (REAL ID Act of 2005)",
    appropriationSource: "DHS final rule cost estimate; NGA testimony; ACLU analysis of enacted grants",
    constituent: "State DMVs and the residents who fund them",
    criticalNote: "Deliverable-based: the dollar figure is DHS's own cost estimate (final rule), not an authorized $ amount. Grants cited are early cumulative; critics put federal support at <1% of estimated cost.",
    sources: [
      ["ACLU — Fuzzy Math", "https://www.aclu.org/documents/fuzzy-math-and-real-cost-real-id"],
      ["NGA testimony", "https://www.nga.org/testimony/testimony-real-id-western-hemisphere-travel-initiative"],
      ["Computerworld", "https://www.computerworld.com/article/1582788/real-id-funding-called-inadequate.html"]
    ],
    lastVerified: "2026-10-27"
  },
  {
    id: "us-first-step-act-2018",
    title: "The signature prison-reform law, zeroed out in year one",
    law: "First Step Act of 2018 (Pub. L. 115-391)",
    jurisdiction: "US",
    domain: "justice",
    tier: "crumbs",
    status: "open",
    barPct: 0,
    authorized: "$75,000,000 per year, FY2019–FY2023, for recidivism-reduction programs (80% to the Bureau of Prisons)",
    appropriated: "$0 formally appropriated in FY2019 (DOJ redirected ~$75M of existing funds as a stopgap); FY2020 request only ~$14M",
    fundedShare: "0% appropriated in FY2019",
    gap: "The full $75M authorization went unappropriated in the first year",
    authorizingCitation: "Pub. L. 115-391, § 102 et seq. (18 U.S.C. ch. 229A)",
    appropriationSource: "House Judiciary Committee submission (2019); Brennan Center; CRS R45558",
    constituent: "Incarcerated people eligible for earned-time programming, and the BOP",
    criticalNote: "FY2019 requirements funding was $0; DOJ covered it by shifting internal money, and later appropriations provided partial funding. The year-one $0 is the documented gap.",
    sources: [
      ["CRS R45558", "https://www.congress.gov/crs-product/R45558"],
      ["Brennan Center", "https://www.brennancenter.org/our-work/research-reports/what-first-step-act-and-whats-happening-it"],
      ["House Judiciary (2019)", "https://docs.house.gov/meetings/JU/JU08/20191017/110089/HHRG-116-JU08-20191017-SD002.pdf"]
    ],
    lastVerified: "2026-10-27"
  },
  {
    id: "us-interstate-1944",
    title: "An interstate system — on paper for twelve years",
    law: "Federal-Aid Highway Act of 1944",
    jurisdiction: "US",
    domain: "environment",
    tier: "crumbs",
    status: "resolved",
    barPct: 0,
    authorized: "Designation of the 'National System of Interstate Highways'",
    appropriated: "$0 for construction (1944–1952); a token $25M/yr arrived in 1952",
    fundedShare: "$0 construction, 1944–52",
    gap: "The entire interstate network sat unfunded until the 1956 Highway Trust Fund",
    closedLabel: "Funded 1956 (Highway Trust Fund)",
    wasLabel: "was $0 for ~8 years",
    authorizingCitation: "Federal-Aid Highway Act of 1944 (58 Stat. 838)",
    appropriationSource: "FHWA Highway History; Federal-Aid Highway Act of 1956 (Highway Trust Fund)",
    constituent: "The traveling public — a nation with the plan but not the pavement",
    criticalNote: "Resolved by the 1956 act. Included as the classic teaching anchor and proof that these gaps can be closed.",
    sources: [
      ["FHWA Highway History", "https://www.fhwa.dot.gov/highwayhistory/data/page01.cfm"],
      ["Federal-Aid Highway Act of 1956", "https://en.wikipedia.org/wiki/Federal-Aid_Highway_Act_of_1956"]
    ],
    lastVerified: "2026-10-27"
  },

  // ─────────────── TIER 2 · "PENNIES ON THE DOLLAR" (target-shortfall) ───────────────
  {
    id: "us-idea-40pct-1975",
    title: "Special education's 'forty percent' promise",
    law: "Individuals with Disabilities Education Act (1975)",
    jurisdiction: "US",
    domain: "education",
    tier: "shortfall",
    status: "open",
    barPct: 33,
    authorized: "Federal commitment to fund 40% of the excess cost of special education",
    appropriated: "~13% of excess cost (FY2020) — the federal share has never reached half the commitment",
    fundedShare: "~13% delivered of a 40% promise",
    gap: "27-pt gap, ~50 yrs",
    authorizingCitation: "Education for All Handicapped Children Act of 1975 (Pub. L. 94-142); IDEA",
    appropriationSource: "U.S. House Ed. & Workforce 'IDEA Funding Gap'; New America analysis",
    constituent: "Local school districts and property taxpayers",
    criticalNote: "Target-shortfall (not ≤5%): the 40% is a commitment, not a hard appropriation cap. Peaked near ~33% once (2009 stimulus).",
    sources: [
      ["House Ed & Workforce — IDEA Funding Gap", "https://edworkforce.house.gov/UploadedFiles/IDEA_Funding_Gap.pdf"],
      ["New America", "https://newamerica.org/education-policy/edcentral/fully-funding-idea"]
    ],
    lastVerified: "2026-10-27"
  },
  {
    id: "us-lwcf-1965",
    title: "The conservation fund that collected, then sat",
    law: "Land and Water Conservation Fund Act of 1965",
    jurisdiction: "US",
    domain: "environment",
    tier: "shortfall",
    status: "resolved",
    barPct: 55,
    authorized: "$900M per year (from offshore-drilling royalties)",
    appropriated: "Far less in most years (e.g., ~$495M FY2020); fully funded only ~twice in the program's history",
    fundedShare: "~55% in a typical year",
    gap: "~$400M/yr diverted",
    closedLabel: "Full $900M mandatory since 2020",
    wasLabel: "was ~half for decades",
    authorizingCitation: "LWCF Act of 1965 (Pub. L. 88-578); $900M set by Pub. L. 95-42",
    appropriationSource: "CRS RL33531 / IF12256; Great American Outdoors Act (2020)",
    constituent: "State parks, trails, and public-lands projects",
    criticalNote: "Resolved: the Great American Outdoors Act (2020) made the full $900M mandatory. Proof these gaps can close.",
    sources: [
      ["CRS RL33531", "https://www.everycrsreport.com/reports/RL33531.html"],
      ["CRS IF12256", "https://www.congress.gov/crs_external_products/IF/PDF/IF12256/IF12256.2.pdf"]
    ],
    lastVerified: "2026-10-27"
  },
  {
    id: "us-secure-rural-schools-2000",
    title: "Rural counties, cut off from the promise",
    law: "Secure Rural Schools and Community Self-Determination Act of 2000",
    jurisdiction: "US",
    domain: "education",
    tier: "shortfall",
    status: "lapsed",
    barPct: 20,
    authorized: "Revenue-sharing payments to timber counties (in lieu of lost federal-land logging receipts)",
    appropriated: "Reauthorization lapsed in 2023; fallback leaves counties with an average ~80% reduction",
    fundedShare: "~20% fallback after the lapse",
    gap: "~80% cut across 41 states",
    authorizingCitation: "Pub. L. 106-393 (2000), as reauthorized",
    appropriationSource: "National Association of Counties (NACo); reporting (KUOW); Senate reauthorization letters",
    constituent: "Rural schools and county roads in 41 states",
    criticalNote: "Lifecycle: lapsed 2023. Status flips if/when Congress reauthorizes and backfills FY2024–25.",
    sources: [
      ["NACo", "https://www.naco.org/news/usfs-begins-disbursement-revenue-sharing-payments-amid-lapse-srs-funding"],
      ["KUOW", "https://www.kuow.org/politics/2025-08-07/parts-of-rural-wa-pinched-by-lapse-in-federal-payments-to-offset-lost-logging-revenue"]
    ],
    lastVerified: "2026-10-27"
  }

];

// Derived (consumed by the gallery + validator)
export const CRUMBS    = GAPS.filter(g => g.tier === "crumbs");
export const SHORTFALL = GAPS.filter(g => g.tier === "shortfall");
export default GAPS;
