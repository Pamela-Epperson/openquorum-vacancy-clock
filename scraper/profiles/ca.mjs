// California — "Statutory Index of Positions" PDF (Governor's Appointments Unit),
// linked from the Government Appointments page as "index of positions (PDF)".
// The Governor's *Vacancy Report* went image-only (no text layer) in Aug 2026 and
// broke the old vacancy parser; this profile swaps CA to the text-based Statutory
// Index — the comprehensive roster of every CA appointive position (~150 boards +
// individual director roles). It is a 3-COLUMN landscape layout, so we reconstruct
// entries positionally (each cell = one row within a column) rather than from the
// flattened text (columns interleave and cannot be split by delimiter).
// INVENTORY MODE: no vacancy counts published here, so rows carry vacantSeats:0 and
// go live only after enrichments/CA.mjs adds statute-verified seat totals.
import * as cheerio from "cheerio";
import { classifyDomain } from "../lib/domains.mjs";
import { browserFetch } from "../lib/http.mjs";

const BASE = "https://www.gov.ca.gov";
// Year-versioned URL — updated annually (…/uploads/<yyyy>/<mm>/Statutory-Index-<yyyy>.pdf).
// scrape() prefers the live link discovered on the appointments page; this is the fallback.
const FALLBACK_INDEX = "https://www.gov.ca.gov/wp-content/uploads/2026/03/Statutory-Index-2026.pdf";

const KW = /\b(Board|Bd|Boards|Commission|Comm|Committee|Council|Panel|Authority|Conservancy|Fund|System|Bureau|Corps|Bank|Court|Trustees|Agency|Endowment|Task Force|District|Consortium|Compact|Roundtable|Working Group|Association|Assn|Assoc|Regents|Center|Governing|Oversight|Cabinet|Corporation|Corp|Body)\b/i;
const MEMBER = /,\s*Members?$/i;

// Strip leading salary/senate markers (*, **, ***, +) and trailing " SC" / commas.
export function normalizeName(s) {
  const mk = (s.match(/^[*+]+/) || [""])[0];
  const stars = (mk.match(/\*/g) || []).length;
  const name = s.slice(mk.length).trim().replace(/\s+SC$/, "").replace(/[,\s]+$/, "").trim();
  return { stars, name };
}

// Reconstruct entries from positioned text items. Each board/position is one cell;
// cells live in 3 columns. We detect the 3 column left-edges, bucket every item to a
// column and a row (shared y), join items in a row left→right, and read column-major.
export function reconstruct(items) {
  if (!items.length) return [];
  // column left-edges = the 3 dominant x-start buckets, well separated
  const hist = new Map();
  for (const it of items) { const b = Math.round(it.x / 5) * 5; hist.set(b, (hist.get(b) || 0) + 1); }
  const edges = [];
  for (const [x] of [...hist.entries()].sort((a, b) => b[1] - a[1])) {
    if (edges.every(e => Math.abs(e - x) > 60)) edges.push(x);
    if (edges.length >= 3) break;
  }
  edges.sort((a, b) => a - b);
  const colOf = (x) => { let c = 0; for (let i = 0; i < edges.length; i++) if (x >= edges[i] - 8) c = i; return c; };
  const rows = new Map();
  for (const it of items) {
    const key = it.p + "|" + colOf(it.x) + "|" + Math.round(it.y);
    if (!rows.has(key)) rows.set(key, { p: it.p, c: colOf(it.x), y: Math.round(it.y), parts: [] });
    rows.get(key).parts.push(it);
  }
  return [...rows.values()]
    .sort((a, b) => a.p - b.p || a.c - b.c || b.y - a.y)
    .map(r => r.parts.sort((a, b) => a.x - b.x).map(p => p.s).join(" ").replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

// Turn reconstructed entry strings into board rows (inventory shape).
export function parse(entries, { applyUrl, authority, sourceUrl, today }) {
  const rows = []; const seen = new Set(); let id = 1;
  for (const raw of entries) {
    const { stars, name } = normalizeName(raw);
    if (stars === 1) continue;                          // single * = salaried individual role, not a board
    if (name.length < 5 || name.length > 95) continue;
    if (!(KW.test(name) || MEMBER.test(name))) continue; // keep collegial bodies only
    if (seen.has(name)) continue; seen.add(name);
    rows.push({
      id: id++, name, domain: classifyDomain(name),
      totalSeats: null, vacantSeats: 0, vacantSince: null,
      authority, constituent: null, applyUrl,
      sourceUrl, lastVerified: today,
      criticalNote: "Listed in the Governor's Statutory Index of Positions (appointive board); apply any time",
    });
  }
  return rows;
}

async function findIndexPdf(endpoint) {
  try {
    const res = await browserFetch(endpoint);
    if (res.ok) {
      const $ = cheerio.load(await res.text());
      let url = null;
      $("a[href]").each((_, a) => {
        const href = $(a).attr("href") || ""; const t = $(a).text();
        if (!url && /statutory-index|index-of-positions/i.test(href) && /\.pdf/i.test(href)) url = new URL(href, BASE).href;
        if (!url && /index of positions/i.test(t) && /\.pdf/i.test(href)) url = new URL(href, BASE).href;
      });
      if (url) return url;
    }
  } catch { /* fall through */ }
  return FALLBACK_INDEX;
}

export async function scrape({ endpoint, applyUrl, authority }) {
  const pdfUrl = await findIndexPdf(endpoint);
  const { default: pdfParse } = await import("pdf-parse/lib/pdf-parse.js");
  const buf = Buffer.from(await (await browserFetch(pdfUrl)).arrayBuffer());
  const items = []; let pageNo = 0;
  const pagerender = (pageData) =>
    pageData.getTextContent({ normalizeWhitespace: false, disableCombineTextItems: true }).then(tc => {
      pageNo++;
      for (const it of tc.items) {
        if (it.str && it.str.trim()) items.push({ p: pageNo, x: it.transform[4], y: it.transform[5], s: it.str.trim() });
      }
      return "";
    });
  await pdfParse(buf, { pagerender });
  // drop running header/footer bands (title ~y>=555, legend/footer ~y<=62)
  const body = items.filter(i => i.y < 555 && i.y > 62 && !/^Page$|^\d+$|^of$/.test(i.s));
  const entries = reconstruct(body);
  const today = new Date().toISOString().slice(0, 10);
  const rows = parse(entries, { applyUrl, authority, sourceUrl: pdfUrl, today });
  if (rows.length < 120) throw new Error(`CA parser found only ${rows.length} boards — Statutory Index layout may have changed`);
  return rows;
}
