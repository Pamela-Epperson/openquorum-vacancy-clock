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
    promote: false, // flip after first PR review
  },
  WA: {
    profile: "wa",
    endpoint: "https://governor.wa.gov/boards-and-commissions/boards-commissions/current-and-upcoming-appointment-opportunities",
    applyUrl: "https://governor.wa.gov/boards-and-commissions/boards-commissions/apply-serve",
    applyAuthority: "Governor's Boards & Commissions Office",
    dataSource: "governor.wa.gov/boards-and-commissions",
    totalBoardsNote: "230+ boards · monthly opportunities report",
    promote: false,
  },
  OR: {
    profile: "or",
    endpoint: "https://oregon.wd5.myworkdayjobs.com/wday/cxs/oregon/Boards/jobs",
    applyUrl: "https://oregon.wd5.myworkdayjobs.com/Boards",
    applyAuthority: "Governor's Executive Appointments Office",
    dataSource: "oregon.wd5.myworkdayjobs.com/Boards",
    totalBoardsNote: "Board openings posted via Workday",
    promote: true,
  },
  // Researched July 8, 2026 — profiles not yet written (next tranche):
  // CA: gov.ca.gov/join-the-administration/government-appointments/current-opportunities/
  //     apply: https://www.gov.ca.gov/appointments-application/ · Governor's Appointments Office
  // FL: flgov.com remaining_vacancies.pdf · apply: eogforms.eog.myflorida.com/pages/seatapplication.aspx
  //     · Governor's Appointments Office
  // OH: governor.ohio.gov/administration/boards-and-commissions (term expirations)
  //     · Governor's Boards & Commissions Office
  // TX: gov.texas.gov/organization/appointments/positions · apply: /organization/appointments/application
  //     · Governor's Appointments Office
  // CT: TODO verify — no central vacancy list; applications route via CT DAS recruitment portal
};
