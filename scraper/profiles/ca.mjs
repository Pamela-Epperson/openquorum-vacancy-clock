// California — "Current Board Vacancies" PDF published by the Governor's
// Appointments Unit, linked from the Government Appointments page. The report is
// COMPREHENSIVE (≈150 boards); structure is a repeating 3-part block:
//     <Board name>
//     Vacancies
//     Vacancy (<category>)      ← one line per open seat (space optional!)
// Rewritten July 25, 2026: the prior parser only matched "Vacancy(" with no
// space and silently extracted 6 of ~150. This parser is structural — a board
// is recognised by the "Vacancies" marker that follows its name, and seat lines
// are matched with an optional space (/^Vacancy\s*\(/) so both "Vacancy (Public)"
// and "Vacancy(Public)" count. INVENTORY-grade coverage; enrich seats later.
import * as cheerio from "cheerio";
import { classifyDomain } from "../lib/domains.mjs";
import { browserFetch } from "../lib/http.mjs";

const BASE = "https://www.gov.ca.gov";
const HEADER = /^(Governor|Appointments Unit|Current Board Vacancies)/i;

// Pure, unit-testable parser over the flattened PDF text.
export function parse(text, { applyUrl, authority, sourceUrl, today }) {
  const rows = []; const byName = new Map(); let id = 1;
  let cur = null, pendingName = null;
  const getRow = (name) => {
    if (byName.has(name)) return byName.get(name);
    const row = {
      id: id++, name, domain: classifyDomain(name),
      totalSeats: null, vacantSeats: 0, vacantSince: null,
      authority, constituent: null, applyUrl,
      sourceUrl, lastVerified: today,
      criticalNote: "Listed in Governor's current board vacancies report",
    };
    rows.push(row); byName.set(name, row); return row;
  };
  for (const raw of text.split("\n")) {
    const line = raw.replace(/\s+/g, " ").trim();
    if (!line || HEADER.test(line)) { pendingName = null; continue; }
    // Seat line(s): "Vacancy (Cat)" or "Vacancy(Cat)" — space optional. pdf-parse
    // occasionally merges several onto one line, so count occurrences.
    if (/^Vacancy\s*\(/i.test(line)) {
      if (cur) cur.vacantSeats += (line.match(/Vacancy\s*\(/gi) || []).length;
      continue;
    }
    // Standalone marker → the pending line was a board name.
    if (line === "Vacancies") {
      if (pendingName) { cur = getRow(pendingName); pendingName = null; }
      continue;
    }
    // Safety net: pdf-parse merged "<name> Vacancies" onto one line.
    if (/\sVacancies$/.test(line)) {
      const nm = line.replace(/\s*Vacancies$/, "").trim();
      if (nm && !/^\d/.test(nm) && !/^Page\b/i.test(nm)) { cur = getRow(nm); pendingName = null; }
      continue;
    }
    // Otherwise a candidate board name (ignore page numbers / stray short tokens).
    if (/^\d/.test(line) || line.length < 4 || line.length > 110) { pendingName = null; continue; }
    pendingName = line;
  }
  return rows.filter(r => r.vacantSeats > 0);
}

export async function scrape({ endpoint, applyUrl, authority }) {
  const page = await browserFetch(endpoint);
  if (!page.ok) throw new Error(`CA page ${page.status}`);
  const $ = cheerio.load(await page.text());
  let pdfUrl = null;
  $("a[href$='.pdf']").each((_, a) => {
    const href = $(a).attr("href") || "";
    const t = $(a).text();
    if (/vacanc/i.test(href + t) && !pdfUrl) pdfUrl = new URL(href, BASE).href;
  });
  if (!pdfUrl) throw new Error("CA: vacancy report PDF link not found");

  const { default: pdfParse } = await import("pdf-parse/lib/pdf-parse.js");
  const buf = Buffer.from(await (await browserFetch(pdfUrl)).arrayBuffer());
  const text = (await pdfParse(buf)).text;
  const today = new Date().toISOString().slice(0, 10);
  const rows = parse(text, { applyUrl, authority, sourceUrl: pdfUrl, today });
  // Profile-level yield floor — the report reliably lists 100+ boards.
  if (rows.length < 30) throw new Error(`CA parser found only ${rows.length} rows — PDF layout may have changed`);
  return rows;
}
