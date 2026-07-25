// Florida — the Governor's Board Seat Application form (SeatApplication.aspx)
// server-renders the FULL list of appointive boards as the options of the
// "Board Name" <select> (#MainContent_ddlBoards, ~295 boards). Florida publishes
// no central vacancy list, so this profile runs in INVENTORY MODE (vacantSeats:0).
// Rewritten July 25, 2026: replaces the old remaining-vacancies PDF parser that
// under-yielded (2 rows). The State Board of Education isn't in the form list, so
// it's carried in SUPPLEMENT; both live boards are enriched via enrichments/FL.mjs.
import * as cheerio from "cheerio";
import { classifyDomain } from "../lib/domains.mjs";
import { browserFetch } from "../lib/http.mjs";

const BOARD_RE = /\b(Board|Commission|Council|Authority|District|Trust|Corporation|Committee|Coalition)\b/i;
const SUPPLEMENT = ["Florida State Board of Education"];

// Pure, unit-testable parser.
export function parse(html, { applyUrl, authority, endpoint, today }) {
  const $ = cheerio.load(html);
  let sel = $("#MainContent_ddlBoards");
  if (!sel.length) {
    // fallback: the <select> carrying the most board-like options
    let best = null, bestScore = -1;
    $("select").each((_, s) => {
      const score = $(s).find("option").map((_, o) => $(o).text()).get()
        .filter(o => BOARD_RE.test(o)).length;
      if (score > bestScore) { bestScore = score; best = s; }
    });
    sel = $(best);
  }
  const rows = []; const seen = new Set(); let id = 1;
  const push = (raw) => {
    const name = (raw || "").replace(/\s+/g, " ").trim();
    if (!name || /^select one/i.test(name) || name.length < 4 || seen.has(name)) return;
    seen.add(name);
    rows.push({
      id: id++, name, domain: classifyDomain(name),
      totalSeats: null, vacantSeats: 0, vacantSince: null,
      authority, constituent: null, applyUrl,
      sourceUrl: endpoint, lastVerified: today,
      criticalNote: "Listed in the Governor's Board Seat Application (inventory); FL publishes no central vacancy list",
    });
  };
  sel.find("option").each((_, o) => push($(o).text()));
  for (const n of SUPPLEMENT) push(n);
  return rows;
}

export async function scrape({ endpoint, applyUrl, authority }) {
  const res = await browserFetch(endpoint);
  if (!res.ok) throw new Error(`FL page ${res.status}`);
  const today = new Date().toISOString().slice(0, 10);
  const rows = parse(await res.text(), { applyUrl, authority, endpoint, today });
  // Profile-level yield floor — the form reliably lists 250+ boards.
  if (rows.length < 50) throw new Error(`FL parser found only ${rows.length} rows — form layout may have changed`);
  return rows;
}
