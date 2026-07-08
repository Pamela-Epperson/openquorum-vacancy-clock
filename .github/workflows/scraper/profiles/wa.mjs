// Washington — monthly "Current and Upcoming Gubernatorial Appointment
// Opportunities" PDF linked from the opportunities page.
// Two-step: find the newest PDF link on the page, then extract text rows.
// PDF layout varies month to month — rows are PROVISIONAL and the parser is
// deliberately conservative: it emits one row per detected board line and
// never invents counts or dates. VERIFY OUTPUT ON FIRST ACTIONS RUN.
import * as cheerio from "cheerio";
import { classifyDomain } from "../lib/domains.mjs";

export async function scrape({ endpoint, applyUrl, authority }) {
  const ua = { headers: { "User-Agent": "OpenQuorumScraper/1.0 (+openquorum.org)" } };
  const page = await fetch(endpoint, ua);
  if (!page.ok) throw new Error(`WA page ${page.status}`);
  const $ = cheerio.load(await page.text());
  let pdfUrl = null;
  $("a[href$='.pdf']").each((_, a) => {
    const href = $(a).attr("href") || "";
    if (/outreach|opportunit|monthly/i.test(href + $(a).text()) && !pdfUrl)
      pdfUrl = new URL(href, "https://governor.wa.gov").href;
  });
  if (!pdfUrl) throw new Error("WA: opportunities PDF link not found");

  const { default: pdfParse } = await import("pdf-parse/lib/pdf-parse.js");
  const buf = Buffer.from(await (await fetch(pdfUrl, ua)).arrayBuffer());
  const text = (await pdfParse(buf)).text;

  const today = new Date().toISOString().slice(0, 10);
  const rows = [];
  let id = 1;
  const seen = new Set();
  for (const raw of text.split("\n")) {
    const line = raw.replace(/\s+/g, " ").trim();
    // Board lines in the report contain Board/Commission/Council/Committee/Authority naming
    if (!/\b(Board|Commission|Council|Committee|Authority|Task Force)\b/i.test(line)) continue;
    if (line.length < 10 || line.length > 140) continue;
    if (/^(page|report|governor|issue area)/i.test(line)) continue;
    const name = line.replace(/\s*\d+\s*$/, "").trim();
    if (seen.has(name)) { const r = rows.find(r => r.name === name); if (r) r.vacantSeats += 1; continue; }
    seen.add(name);
    rows.push({
      id: id++,
      name,
      domain: classifyDomain(name),
      totalSeats: null,
      vacantSeats: 1,
      vacantSince: null,
      authority,
      constituent: null,
      applyUrl,
      sourceUrl: pdfUrl,
      lastVerified: today,
      criticalNote: "Listed in monthly opportunities report",
    });
  }
  if (rows.length === 0) throw new Error("WA parser found no rows — PDF layout may have changed");
  return rows;
}
