// California — Statutory Index of Positions PDF (Governor's Appointments Unit).
// PHASE-1 DIAGNOSTIC BUILD: the Vacancy Report went image-only (Aug 2026); we are
// swapping CA's source to the text-based "2026 Index of Positions" PDF, which is a
// 3-column layout that CANNOT be split from flattened text. This build dumps the
// real pdf-parse text-item coordinates to data/scraped/CA_debug.txt so the column
// geometry can be tuned, then THROWS so the curated CA.json (21 boards) is never
// overwritten during development.
import * as cheerio from "cheerio";
import { writeFileSync } from "node:fs";
import { browserFetch } from "../lib/http.mjs";

const BASE = "https://www.gov.ca.gov";
const FALLBACK_INDEX = "https://www.gov.ca.gov/wp-content/uploads/2026/03/Statutory-Index-2026.pdf";

async function findIndexPdf(endpoint) {
  try {
    const res = await browserFetch(endpoint);
    if (res.ok) {
      const $ = cheerio.load(await res.text());
      let url = null;
      $("a[href]").each((_, a) => {
        const href = $(a).attr("href") || "";
        const t = $(a).text();
        if (!url && /statutory-index|index-of-positions/i.test(href) && /\.pdf/i.test(href)) url = new URL(href, BASE).href;
        if (!url && /index of positions/i.test(t) && /\.pdf/i.test(href)) url = new URL(href, BASE).href;
      });
      if (url) return url;
    }
  } catch { /* fall through to fallback */ }
  return FALLBACK_INDEX;
}

function diagRender(diag) {
  return function (pageData) {
    return pageData.getTextContent({ normalizeWhitespace: false, disableCombineTextItems: true }).then(tc => {
      const items = tc.items.filter(it => it.str && it.str.trim());
      if (diag.page === 0) {
        for (const it of items) diag.first.push(`x=${Math.round(it.transform[4])} y=${Math.round(it.transform[5])} | ${it.str}`);
      }
      diag.page++;
      return items.map(i => i.str).join(" ");
    });
  };
}

export async function scrape({ endpoint }) {
  const pdfUrl = await findIndexPdf(endpoint);
  const { default: pdfParse } = await import("pdf-parse/lib/pdf-parse.js");
  const buf = Buffer.from(await (await browserFetch(pdfUrl)).arrayBuffer());
  const diag = { page: 0, first: [] };
  const custom = await pdfParse(buf, { pagerender: diagRender(diag) });
  const raw = (await pdfParse(buf)).text;
  writeFileSync("data/scraped/CA_debug.txt",
    `PDF: ${pdfUrl}\nPAGES: ${diag.page}\n` +
    `\n=== FIRST-PAGE TEXT ITEMS (x y | str) ===\n` + diag.first.join("\n") +
    `\n\n=== DEFAULT pdf-parse TEXT (first 3500 chars) ===\n` + raw.slice(0, 3500) +
    `\n\n=== NAIVE-JOIN TEXT (first 1500 chars) ===\n` + custom.text.slice(0, 1500));
  throw new Error("CA DEBUG DUMP written to data/scraped/CA_debug.txt — Phase-1 diagnostic, inspect then finalize");
}

export function parse() { return []; }
