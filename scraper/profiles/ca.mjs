// California — "Current Board Vacancies" PDF published by the Governor's
// Appointments Unit, linked from the Government Appointments page.
// PDF layout (verified 07/08/2026) is a strict 3-line-per-block structure:
//     <Board name>
//     Vacancies
//     Vacancy(<category>)      ← one line per open seat
// so we count "Vacancy(" lines per board rather than guessing names
// heuristically. Conservative: a board only counts once it is immediately
// followed by the literal "Vacancies" marker.
import * as cheerio from "cheerio";
import { classifyDomain } from "../lib/domains.mjs";
import { browserFetch } from "../lib/http.mjs";

const BASE = "https://www.gov.ca.gov";
const HEADER = /^(Governor|Appointments Unit|Current Board Vacancies)/i;

export async function scrape({ endpoint, applyUrl, authority }) {
  const page = await browserFetch(endpoint);
  if (!page.ok) throw new Error(`CA page ${page.status}`);
  const $ = cheerio.load(await page.text());

  let pdfUrl = null;
  $("a[href$='.pdf']").each((_, a) => {
    const href = $(a).attr("href") || "";
    const text = $(a).text();
    if (/vacanc/i.test(href + text) && !pdfUrl)
      pdfUrl = new URL(href, BASE).href;
  });
  if (!pdfUrl) throw new Error("CA: vacancy report PDF link not found");

  const { default: pdfParse } = await import("pdf-parse/lib/pdf-parse.js");
  const buf = Buffer.from(await (await browserFetch(pdfUrl)).arrayBuffer());
  const text = (await pdfParse(buf)).text;

  const today = new Date().toISOString().slice(0, 10);
  const rows = [];
  const byName = new Map();
  let id = 1;
  let pending = null;   // last candidate board-name line seen
  let cur = null;       // row currently accumulating vacancy lines

  for (const raw of text.split("\n")) {
    const line = raw.replace(/\s+/g, " ").trim();
    if (!line || HEADER.test(line)) { pending = null; continue; }

    if (/^Vacancy\(/i.test(line)) {          // an open-seat line
      if (cur) cur.vacantSeats += 1;
      continue;
    }
    if (line === "Vacancies") {               // marker: `pending` was a board name
      if (!pending) continue;
      if (byName.has(pending)) { cur = byName.get(pending); }
      else {
        cur = {
          id: id++,
          name: pending,
          domain: classifyDomain(pending),
          totalSeats: null,
          vacantSeats: 0,
          vacantSince: null,
          authority,
          constituent: null,
          applyUrl,
          sourceUrl: pdfUrl,
          lastVerified: today,
          criticalNote: "Listed in Governor's current board vacancies report",
        };
        rows.push(cur);
        byName.set(pending, cur);
      }
      pending = null;
      continue;
    }
    pending = line;                           // candidate board name
  }

  // Drop any board that somehow logged zero vacancy lines.
  const out = rows.filter(r => r.vacantSeats > 0);
  if (out.length === 0) throw new Error("CA parser found no rows — PDF layout may have changed");
  return out;
}
