// Connecticut — portal.ct.gov publishes an official A–Z "Boards, Councils, and
// Commissions" directory as server-rendered static HTML (each entry is an <li>
// with an <a> to the board's page). CT has NO central vacancy list, so this
// profile runs in INVENTORY MODE: emit every board in the directory
// (vacantSeats:0), enrich seat totals from CGS statute later.
//
// Two major governor-appointed boards (Medical Examining Board, State Board of
// Education) live under their agencies and are NOT in the portal directory —
// carried in SUPPLEMENT so switching to this profile never drops them.
import * as cheerio from "cheerio";
import { classifyDomain } from "../lib/domains.mjs";
import { browserFetch } from "../lib/http.mjs";

const BOARD_RE = /\b(Board|Commission|Council|Committee|Authority|Bureau|Fund|Review|Office of)\b/i;
const NAV_HREF = /(\/policies|\/about|\/directories|\/social_media|\/for_state_employees|twitter\.com|\/rss|mailto:)/i;

// Gov-appointed CT boards absent from the portal directory — keep them present.
const SUPPLEMENT = [
  "Connecticut Medical Examining Board",
  "Connecticut State Board of Education",
];

export function parse(html, { applyUrl, authority, endpoint, today }) {
  const $ = cheerio.load(html);
  const scope = $("#mainContent").length ? $("#mainContent") : ($("main").length ? $("main") : $.root());
  const rows = []; const seen = new Set(); let id = 1;
  const push = (name, sourceUrl) => {
    if (!name || name.length < 6 || name.length > 95 || seen.has(name)) return;
    seen.add(name);
    rows.push({
      id: id++, name, domain: classifyDomain(name),
      totalSeats: null, vacantSeats: 0, vacantSince: null,
      authority, constituent: null, applyUrl,
      sourceUrl, lastVerified: today,
      criticalNote: "Listed in CT's official Boards, Councils & Commissions directory; CT publishes no central vacancy list (inventory mode)",
    });
  };
  scope.find("a").each((_, a) => {
    const name = $(a).text().replace(/\.st0\{[^}]*\}/g, "").replace(/\{[^}]*\}/g, "").replace(/\s+/g, " ").trim();
    const href = $(a).attr("href") || "";
    if (!BOARD_RE.test(name) || NAV_HREF.test(href)) return;
    push(name, endpoint);
  });
  for (const name of SUPPLEMENT) push(name, endpoint);
  return rows;
}

export async function scrape({ endpoint, applyUrl, authority }) {
  const res = await browserFetch(endpoint);
  if (!res.ok) throw new Error(`CT page ${res.status}`);
  const today = new Date().toISOString().slice(0, 10);
  const rows = parse(await res.text(), { applyUrl, authority, endpoint, today });
  // Profile-level yield floor — the directory reliably lists 30+ boards.
  if (rows.length < 20) throw new Error(`CT parser found only ${rows.length} rows — directory layout may have changed`);
  return rows;
}
