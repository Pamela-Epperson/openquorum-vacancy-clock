// Ohio — Governor's "Boards and Commissions Term Expirations" page (the
// state's public vacancy/expiration signal). The page may render the list as
// HTML or link a PDF; handle both. Conservative name filter (WA doctrine).
// VERIFY OUTPUT ON FIRST ACTIONS RUN — WebSphere portal layout is quirky.
import * as cheerio from "cheerio";
import { classifyDomain } from "../lib/domains.mjs";
import { browserFetch } from "../lib/http.mjs";

const NOISE_START = /^(The|A|An|This|It|In|As|Page|Expand|Web|Actions|Term|Boards and Commissions|Governor|Lt|First|Cabinet|Administration|Menu|Home|Skip|Close|Sign|Email|Submit|Message|Error|Flag|Full|Powered|Privacy|Accessibility|Ohio|Official|Secure|Trusted|Type)\b/i;

function extractNames(lines) {
  const out = [];
  for (const raw of lines) {
    const line = raw.replace(/\s+/g, " ").trim();
    if (line.length < 8 || line.length > 120) continue;
    if (!/^[A-Z]/.test(line) || NOISE_START.test(line)) continue;
    if (!/\b(Board|Commission|Council|Committee|Authority|Task Force)\b/i.test(line)) continue;
    out.push(line.replace(/\s*\d+\s*$/, "").trim());
  }
  return out;
}

export async function scrape({ endpoint, applyUrl, authority }) {
  const res = await browserFetch(endpoint);
  if (!res.ok) throw new Error(`OH page ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);
  const today = new Date().toISOString().slice(0, 10);

  let lines = [];
  // Prefer a linked PDF if the page provides one
  let pdfUrl = null;
  $("a[href$='.pdf']").each((_, a) => {
    const href = $(a).attr("href") || "";
    if (/expir|term|vacan/i.test(href + $(a).text()) && !pdfUrl)
      pdfUrl = new URL(href, "https://governor.ohio.gov").href;
  });
  if (pdfUrl) {
    const { default: pdfParse } = await import("pdf-parse/lib/pdf-parse.js");
    const buf = Buffer.from(await (await browserFetch(pdfUrl)).arrayBuffer());
    lines = (await pdfParse(buf)).text.split("\n");
  } else {
    lines = $("main, .odx-main, body").first().text().split("\n");
  }

  const rows = []; const seen = new Map(); let id = 1;
  for (const name of extractNames(lines)) {
    if (seen.has(name)) { seen.get(name).vacantSeats += 1; continue; }
    const row = {
      id: id++, name, domain: classifyDomain(name),
      totalSeats: null, vacantSeats: 1, vacantSince: null,
      authority, constituent: null, applyUrl,
      sourceUrl: pdfUrl || endpoint, lastVerified: today,
      criticalNote: "Term expiring per Governor's 2026 expirations list",
    };
    seen.set(name, row); rows.push(row);
  }
  if (rows.length === 0) throw new Error("OH parser found no rows — page/PDF layout may have changed");
  return rows;
}
