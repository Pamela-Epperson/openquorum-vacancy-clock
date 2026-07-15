// Florida — Governor's Appointments Office publishes a "remaining vacancies"
// PDF at flgov.com. Conservative line parser (same doctrine as WA/CA):
// emit only lines that look like board names; never invent counts.
// VERIFY OUTPUT ON FIRST ACTIONS RUN — PDF layout unseen at build time.
import { classifyDomain } from "../lib/domains.mjs";
import { browserFetch } from "../lib/http.mjs";

const NOISE_START = /^(The|A|An|This|It|In|As|Page|Report|Updated|Governor|Executive|Office|Appointments|Total|Seat|Member|Members|Term|Vacant|Vacancy|County|District)\b/i;

export async function scrape({ endpoint, applyUrl, authority }) {
  const { default: pdfParse } = await import("pdf-parse/lib/pdf-parse.js");
  const res = await browserFetch(endpoint);
  if (!res.ok) throw new Error(`FL PDF ${res.status}`);
  const text = (await pdfParse(Buffer.from(await res.arrayBuffer()))).text;

  const today = new Date().toISOString().slice(0, 10);
  const rows = []; const seen = new Map(); let id = 1;
  for (const raw of text.split("\n")) {
    const line = raw.replace(/\s+/g, " ").trim();
    if (line.length < 8 || line.length > 120) continue;
    if (!/^[A-Z]/.test(line) || NOISE_START.test(line)) continue;
    if (!/\b(Board|Commission|Council|Committee|Authority|Task Force|Trust|District)\b/i.test(line)) continue;
    const name = line.replace(/\s*\d+\s*$/, "").trim();  // strip trailing counts/page nums
    if (/\d{4}/.test(name)) continue;                     // date-bearing lines
    if (seen.has(name)) { seen.get(name).vacantSeats += 1; continue; }
    const row = {
      id: id++, name, domain: classifyDomain(name),
      totalSeats: null, vacantSeats: 1, vacantSince: null,
      authority, constituent: null, applyUrl,
      sourceUrl: endpoint, lastVerified: today,
      criticalNote: "Listed in Governor's remaining-vacancies report",
    };
    seen.set(name, row); rows.push(row);
  }
  if (rows.length === 0) throw new Error("FL parser found no rows — PDF layout may have changed");
  return rows;
}
