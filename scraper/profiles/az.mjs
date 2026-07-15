// Arizona — Governor's Office of Boards & Commissions publishes a dated
// "Vacancy Report" PDF at bc.azgovernor.gov. Discover the newest PDF link on
// the office homepage, then conservative line-parse (WA/CA doctrine).
// VERIFY OUTPUT ON FIRST ACTIONS RUN.
import * as cheerio from "cheerio";
import { classifyDomain } from "../lib/domains.mjs";
import { browserFetch } from "../lib/http.mjs";

const NOISE_START = /^(The|A|An|This|It|In|As|Page|Report|Updated|Governor|Office|Vacancy|Vacancies|Total|Seat|Member|Members|Term|Expir|Arizona Revised|ARS|A\.R\.S)\b/i;

export async function scrape({ endpoint, applyUrl, authority }) {
  const page = await browserFetch(endpoint);
  if (!page.ok) throw new Error(`AZ page ${page.status}`);
  const $ = cheerio.load(await page.text());
  let pdfUrl = null;
  $("a[href*='.pdf']").each((_, a) => {
    const href = $(a).attr("href") || "";
    if (/vacancy/i.test(href + $(a).text()) && !pdfUrl)
      pdfUrl = new URL(href, "https://bc.azgovernor.gov").href;
  });
  if (!pdfUrl) throw new Error("AZ: vacancy report PDF link not found");

  const { default: pdfParse } = await import("pdf-parse/lib/pdf-parse.js");
  const buf = Buffer.from(await (await browserFetch(pdfUrl)).arrayBuffer());
  const text = (await pdfParse(buf)).text;

  const today = new Date().toISOString().slice(0, 10);
  const rows = []; const seen = new Map(); let id = 1;
  for (const raw of text.split("\n")) {
    const line = raw.replace(/\s+/g, " ").trim();
    if (line.length < 8 || line.length > 120) continue;
    if (!/^[A-Z]/.test(line) || NOISE_START.test(line)) continue;
    if (!/\b(Board|Commission|Council|Committee|Authority|Task Force)\b/i.test(line)) continue;
    const name = line.replace(/\s*\d+\s*$/, "").trim();
    if (/\d{4}/.test(name)) continue;
    if (seen.has(name)) { seen.get(name).vacantSeats += 1; continue; }
    const row = {
      id: id++, name, domain: classifyDomain(name),
      totalSeats: null, vacantSeats: 1, vacantSince: null,
      authority, constituent: null, applyUrl,
      sourceUrl: pdfUrl, lastVerified: today,
      criticalNote: "Listed in Governor's vacancy report",
    };
    seen.set(name, row); rows.push(row);
  }
  if (rows.length === 0) throw new Error("AZ parser found no rows — PDF layout may have changed");
  return rows;
}
