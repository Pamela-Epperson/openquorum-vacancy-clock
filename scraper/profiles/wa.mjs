// Washington — monthly "Current and Upcoming Gubernatorial Appointment
// Opportunities" PDF linked from the opportunities page.
// Filter tuned against the July 2026 report: board names are Title Case lines
// ("Arts Commission", "Pipeline Safety, Citizens' Committee on"); noise is
// description sentences (start lowercase or with a verb/article) and seat
// detail lines (start with digits). Conservative by design — a missed board
// beats an invented one.
import * as cheerio from "cheerio";
import { classifyDomain } from "../lib/domains.mjs";
import { browserFetch } from "../lib/http.mjs";

const NOISE_START = /^(The|A|An|This|It|In|As|Advises|Assists|Establishes|Promotes|Provides|Oversees|Reviews|Supports|Serves|Sets|Administers|Coordinates|Develops|Manages|Ensures|Encourages|Makes|Member|Members|Open|Term|Position)\b/;
const ALLOWED_LAST = /(^[A-Z][\w''&().-]*|on|of|for|to|the)$/;

export function isBoardNameLine(line) {
  if (line.length < 8 || line.length > 110) return false;
  if (!/^[A-Z]/.test(line)) return false;                        // descriptions/continuations start lowercase or with digits
  if (NOISE_START.test(line)) return false;                      // sentence starts
  if (/profile link/i.test(line)) return false;                  // hyperlink caption
  if (!/\b(Board|Commission|Council|Committee|Authority|Task Force)\b/.test(line)) return false;
  const last = line.split(" ").pop();
  if (!ALLOWED_LAST.test(last)) return false;                    // drop lines wrapped mid-name
  if (/\d{2,}/.test(line)) return false;                         // seat-count/date detail lines
  return true;
}

export async function scrape({ endpoint, applyUrl, authority }) {
  const page = await browserFetch(endpoint);
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
  const buf = Buffer.from(await (await browserFetch(pdfUrl)).arrayBuffer());
  const text = (await pdfParse(buf)).text;

  const today = new Date().toISOString().slice(0, 10);
  const rows = [];
  let id = 1;
  const seen = new Set();
  for (const raw of text.split("\n")) {
    const line = raw.replace(/\s+/g, " ").trim();
    if (!isBoardNameLine(line)) continue;
    if (seen.has(line)) { const r = rows.find(r => r.name === line); if (r) r.vacantSeats += 1; continue; }
    seen.add(line);
    rows.push({
      id: id++,
      name: line,
      domain: classifyDomain(line),
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
