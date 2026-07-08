// Colorado — Governor's "Upcoming Appointments and Immediate Openings" page.
// Verified structure July 8, 2026: H2 month headings ("May 2026", "June 2026",
// "Due to Resignation") each followed by a UL of board names.
// The page publishes board names + timing only — no seat counts — so rows are
// emitted PROVISIONAL (totalSeats:null) and stay staged until enriched from
// the Blue Book PDF or the board's statute page.
import * as cheerio from "cheerio";
import { classifyDomain } from "../lib/domains.mjs";
import { browserFetch } from "../lib/http.mjs";

export async function scrape({ endpoint, applyUrl, authority }) {
  const res = await browserFetch(endpoint);
  if (!res.ok) throw new Error(`CO fetch ${res.status}`);
  const $ = cheerio.load(await res.text());
  const today = new Date().toISOString().slice(0, 10);
  const rows = [];
  let id = 1;
  $("h2").each((_, h) => {
    const heading = $(h).text().trim();
    const isMonth = /^(January|February|March|April|May|June|July|August|September|October|November|December)/i.test(heading);
    const isResign = /resignation/i.test(heading);
    if (!isMonth && !isResign) return;
    const list = $(h).nextUntil("h2", "ul").first();
    list.children("li").each((_, li) => {
      const name = $(li).clone().children("ul").remove().end().text().trim().replace(/\s+/g, " ");
      if (!name) return;
      rows.push({
        id: id++,
        name,
        domain: classifyDomain(name),
        totalSeats: null,                     // not published on this page — enrich before promotion
        vacantSeats: 1,                       // each listing = at least one opening
        vacantSince: null,                    // not published
        authority,
        constituent: null,                    // enrich from board profile
        applyUrl,
        sourceUrl: endpoint,
        lastVerified: today,
        criticalNote: isResign ? "Immediate opening — resignation" : `Opening: ${heading}`,
      });
    });
  });
  if (rows.length === 0) throw new Error("CO parser found no rows — page structure may have changed");
  return rows;
}
