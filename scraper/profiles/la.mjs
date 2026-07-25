// Louisiana — the Governor's Boards & Commissions office directs applicants to
// the Louisiana State Senate's official directory, a server-rendered table of
// ~490 boards (each an <a href="BoardMembers.aspx?boardId=…">). LA publishes no
// central vacancy list, so this profile runs in INVENTORY MODE (vacantSeats:0).
// Written July 25, 2026, replacing a 2-row manual seed. Two boards kept live via
// enrichments/LA.mjs (their names match the directory exactly).
import * as cheerio from "cheerio";
import { classifyDomain } from "../lib/domains.mjs";
import { browserFetch } from "../lib/http.mjs";

// Pure, unit-testable parser.
export function parse(html, { applyUrl, authority, endpoint, today }) {
  const $ = cheerio.load(html);
  const rows = []; const seen = new Set(); let id = 1;
  $('a[href^="BoardMembers.aspx"]').each((_, a) => {
    const name = $(a).text().replace(/\s+/g, " ").trim();
    if (!name || name.length < 5 || name.length > 110 || seen.has(name)) return;
    seen.add(name);
    rows.push({
      id: id++, name, domain: classifyDomain(name),
      totalSeats: null, vacantSeats: 0, vacantSince: null,
      authority, constituent: null, applyUrl,
      sourceUrl: endpoint, lastVerified: today,
      criticalNote: "Listed in Louisiana's official Boards & Commissions directory (inventory); LA publishes no central vacancy list",
    });
  });
  return rows;
}

export async function scrape({ endpoint, applyUrl, authority }) {
  const res = await browserFetch(endpoint);
  if (!res.ok) throw new Error(`LA page ${res.status}`);
  const today = new Date().toISOString().slice(0, 10);
  const rows = parse(await res.text(), { applyUrl, authority, endpoint, today });
  // Profile-level yield floor — the directory reliably lists 400+ boards.
  if (rows.length < 100) throw new Error(`LA parser found only ${rows.length} rows — directory layout may have changed`);
  return rows;
}
