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
    endpoint: "https://www.flgov.com/wp-content/uploads/appointments/remaining_vacancies.pdf",
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
    promote: false, // verify first scrape PR, then add enrichments/OH.mjs
  },
  TX: {
    profile: "tx",
    endpoint: "https://gov.texas.gov/organization/appointments/positions",
    applyUrl: "https://gov.texas.gov/organization/appointments/application",
    applyAuthority: "Governor's Appointments Office",
    dataSource: "gov.texas.gov/organization/appointments",
    totalBoardsNote: "Appointed-positions directory · applications accepted year-round (no central vacancy list)",
    promote: false, // INVENTORY MODE — enrich seat totals from statute links before promoting
  },
  // CT — apply path VERIFIED July 15, 2026; NO central vacancy list exists, so no
  // profile yet. Data-source options (pick one to build): (a) seed research like
  // the pilots from the SOTS State Register & Manual board listings, (b) monitor
  // the DAS recruitment posting, (c) records request for the appointments
  // tracking list. applyUrl below is the official application route.
  // CT: {
  //   profile: null,
  //   endpoint: null,
  //   applyUrl: "https://www.jobapscloud.com/CT/sup/bulpreview.asp?R1=190219&R2=1234BC&R3=BCM",
  //   applyAuthority: "Governor's Office via DAS Statewide HR (DAS.SHRM@ct.gov)",
  //   dataSource: "portal.ct.gov/government/departments-and-agencies/boards-councils-and-commissions",
  //   promote: false,
  // },

  // Researched July 8, 2026 — profiles not yet written (next tranche):
  //     · Governor's Appointments Office
  //     · Governor's Boards & Commissions Office
  //     · Governor's Appointments Office
  // CT: TODO verify — no central vacancy list; applications route via CT DAS recruitment portal
};
