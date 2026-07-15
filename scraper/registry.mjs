// ─── State scraper registry ──────────────────────────────────────────────────
// One entry per state being brought online. A state is only PROMOTED to
// status:"live" in states.config.js when:
//   1. its rows pass the full SCRAPER_CONTRACT validation, AND
//   2. promote:true here (flip it after you review the first scrape PR).
// applyUrl / applyAuthority below were human/web-verified July 8, 2026.
export const REGISTRY = {
  CO: {
    profile: "co",
    endpoint: "https://governorsoffice.colorado.gov/governor/appointments-and-openings",
    applyUrl: "https://governorsoffice.colorado.gov/governor/boards-commissions-application",
    applyAuthority: "Governor's Boards & Commissions Office",
    dataSource: "governorsoffice.colorado.gov/governor/appointments-and-openings",
    totalBoardsNote: "2026 opportunities published in the Governor's Blue Book",
    promote: true, // enrichments/CO.mjs: 5 statute-verified boards (Jul 15 2026) // flip after first PR review
  },
  WA: {
    profile: "wa",
    endpoint: "https://governor.wa.gov/boards-and-commissions/boards-commissions/current-and-upcoming-appointment-opportunities",
    applyUrl: "https://governor.wa.gov/boards-and-commissions/boards-commissions/apply-serve",
    applyAuthority: "Governor's Boards & Commissions Office",
    dataSource: "governor.wa.gov/boards-and-commissions",
    totalBoardsNote: "230+ boards · monthly opportunities report",
    promote: true, // enrichments/WA.mjs: 7 statute-verified boards ready (Jul 8 2026)
  },
  OR: {
    profile: "or",
    endpoint: "https://oregon.wd5.myworkdayjobs.com/wday/cxs/oregon/Boards/jobs",
    applyUrl: "https://oregon.wd5.myworkdayjobs.com/Boards",
    applyAuthority: "Governor's Executive Appointments Office",
    dataSource: "oregon.wd5.myworkdayjobs.com/Boards",
    totalBoardsNote: "Board openings posted via Workday",
    promote: true, // enrichments/OR.mjs: 11 statute-verified boards (Jul 15 2026) — refresh path
  },
  CA: {
    profile: "ca",
    endpoint: "https://www.gov.ca.gov/join-the-administration/government-appointments/",
    applyUrl: "https://govca.avature.net/GOVCACareers/Home",
    applyAuthority: "Governor's Appointments Office",
    dataSource: "gov.ca.gov/join-the-administration/government-appointments",
    totalBoardsNote: "Current Board Vacancies report (PDF), Governor's Appointments Unit",
    promote: false, // profile new — verify first scrape PR, then add enrichments/CA.mjs before promoting
  },
  FL: {
    profile: "fl",
    endpoint: "https://www.flgov.com/eog/leadership/appointments",
    applyUrl: "https://eogforms.eog.myflorida.com/pages/seatapplication.aspx",
    applyAuthority: "Governor's Appointments Office",
    dataSource: "flgov.com/eog/leadership/appointments",
    totalBoardsNote: "Remaining-vacancies report, Governor's Appointments Office",
    promote: false, // verify first scrape PR, then add enrichments/FL.mjs
  },
  OH: {
    profile: "oh",
    endpoint: "https://governor.ohio.gov/wps/portal/gov/governor/administration/boards-and-commissions/boards-and-commissions-term-expirations-term-expiration-for-2026",
    applyUrl: "https://governor.ohio.gov/wps/portal/gov/governor/administration/boards-and-commissions/boards-and-commissions-application2021",
    applyAuthority: "Governor's Boards & Commissions Office",
    dataSource: "governor.ohio.gov/administration/boards-and-commissions",
    totalBoardsNote: "2026 term-expirations list, Governor's office",
    promote: true, // enrichments/OH.mjs: 5 ORC-verified boards (Jul 15 2026) // verify first scrape PR, then add enrichments/OH.mjs
  },
  TX: {
    profile: "tx",
    endpoint: "https://gov.texas.gov/organization/appointments/positions",
    applyUrl: "https://gov.texas.gov/organization/appointments/application",
    applyAuthority: "Governor's Appointments Office",
    dataSource: "gov.texas.gov/organization/appointments",
    totalBoardsNote: "Appointed-positions directory · applications accepted year-round (no central vacancy list)",
    contextNote: "Texas publishes no central vacancy list — boards shown are appointment opportunities; terms are staggered six-year and applications are accepted year-round through the Governor's Appointments Office.",
    promote: true, // enrichments/TX.mjs: 4 statute-verified boards (Jul 16 2026) — INVENTORY MODE // INVENTORY MODE — enrich seat totals from statute links before promoting
  },
  AZ: {
    profile: "az",
    endpoint: "https://bc.azgovernor.gov/",
    applyUrl: "https://bc.azgovernor.gov/boards-and-commissions-application",
    applyAuthority: "Governor's Office of Boards & Commissions",
    dataSource: "bc.azgovernor.gov",
    totalBoardsNote: "220 active boards · Governor's vacancy report",
    promote: true, // enrichments/AZ.mjs: 3 ARS-verified boards (Jul 16 2026) // verify first scrape PR, then add enrichments/AZ.mjs
  },
  MO: {
    profile: "mo",
    endpoint: "https://boards.mo.gov/userpages/boardsearch.aspx",
    applyUrl: "https://apps1.mo.gov/boardsapp/UserPages/Login.aspx",
    applyAuthority: "Governor's Office — Boards & Commissions",
    dataSource: "boards.mo.gov",
    totalBoardsNote: "Current vacancies & expired terms list, boards.mo.gov",
    promote: false, // verify first scrape PR, then add enrichments/MO.mjs
  },
  // UT — VERIFIED July 15, 2026: boards.utah.gov (400+ boards; apply at
  // boards.utah.gov/s/how-to-apply, Governor's Office). Site is Salesforce
  // Experience Cloud (JS-rendered) — needs API inspection before a profile.
  // IA — VERIFIED July 15, 2026: new IAppoint system (iappoint.iowa.gov,
  // launched Nov 2025; 180+ boards, Governor's Office). JS app — inspect
  // boards-iappoint.iowa.gov/boards for a JSON endpoint before a profile.

  CT: {
    profile: "manual",   // no scrapeable vacancy source — data/scraped/CT.json is maintained by hand
    endpoint: null,
    applyUrl: "https://www.jobapscloud.com/CT/sup/bulpreview.asp?R1=190219&R2=1234BC&R3=BCM",
    applyAuthority: "Governor's Office via DAS Statewide HR",
    dataSource: "portal.ct.gov/government/departments-and-agencies/boards-councils-and-commissions",
    totalBoardsNote: "Hand-verified seed · CT publishes no central vacancy list",
    contextNote: "Connecticut publishes no central board-vacancy list. Boards shown are hand-verified appointment opportunities — apply any time through the DAS Boards, Councils and Commissions recruitment (DAS.SHRM@ct.gov).",
    promote: true, // data/scraped/CT.json: 3 CGS-verified boards (Jul 16 2026) — INVENTORY MODE
  },

  // Researched July 8, 2026 — profiles not yet written (next tranche):
  //     · Governor's Appointments Office
  //     · Governor's Boards & Commissions Office
  //     · Governor's Appointments Office
  // CT: TODO verify — no central vacancy list; applications route via CT DAS recruitment portal
};
