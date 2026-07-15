// Florida — Governor's Appointments Office publishes a "remaining vacancies"
// PDF at flgov.com. Conservative line parser (same doctrine as WA/CA):
// emit only lines that look like board names; never invent counts.
// VERIFY OUTPUT ON FIRST ACTIONS RUN — PDF layout unseen at build time.
import { classifyDomain } from "../lib/domains.mjs";
import { browserFetch } from "../lib/http.mjs";

const NOISE_START = /^(The|A|An|This|It|In|As|Page|Report|Updated|Governor|Executive|Office|Appointments|Total|Seat|Member|Members|Term|Vacant|Vacancy|County|District)\b/i;

export async function scrape({ endpoint, applyUrl, authority }) {
  const { default: pdfParse } = await import("pdf-parse/lib/pdf-parse.js");
  // Endpoint is the Appointments Office PAGE — discover the current vacancies
  // PDF link there (the direct PDF URL rots between report editions).
  let pdfUrl = endpoint.endsWith(".pdf") ? endpoint : null;
  // Known published location — try it directly first (the appointments page
  // doesn't always link it in server-rendered HTML).
  if (!pdfUrl) {
    try {
      const probe = await browserFetch("https://www.flgov.com/wp-content/uploads/appointments/remaining_vacancies.pdf", {}, { retries: 0 });
      if (probe.ok && (probe.headers.get("content-type") || "").includes("pdf")) {
        const buf0 = Buffer.from(await probe.arrayBuffer());
        if (buf0.length > 1000) { pdfUrl = "https://www.flgov.com/wp-content/uploads/appointments/remaining_vacancies.pdf"; }
      }
    } catch { /* fall through to page discovery */ }
  }
  if (!pdfUrl) {
    const cheerio = await import("cheerio");
    const page = await browserFetch(endpoint);
    if (!page.ok) throw new Error(`FL page ${page.status}`);
    const $ = cheerio.load(await page.text());
    $("a[href*='.pdf']").each((_, a) => {
      const href = $(a).attr("href") || "";
      if (/vacanc/i.test(href + $(a).text()) && !pdfUrl)
        pdfUrl = new URL(href, "https://www.flgov.com").href;
    });
    if (!pdfUrl) throw new Error("FL: vacancies PDF link not found on appointments page");
  }
  const res = await browserFetch(pdfUrl);
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
      sourceUrl: pdfUrl, lastVerified: today,
      criticalNote: "Listed in Governor's remaining-vacancies report",
    };
    seen.set(name, row); rows.push(row);
  }
  if (rows.length === 0) throw new Error("FL parser found no rows — PDF layout may have changed");
  return rows;
}
