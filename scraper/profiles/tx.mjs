// Texas — gov.texas.gov "Appointed Positions" directory. Structure verified
// July 15, 2026: H2 category sections, each followed by a UL of boards where
// every LI carries the board's STATUTE link (gold for later seat-count
// enrichment). Texas publishes NO central vacancy list — appointments roll on
// staggered 6-year terms and applications are accepted year-round — so this
// profile runs in INVENTORY MODE: vacantSeats:0, honestly labeled. Rows go
// live only after enrichment adds statute-verified seat totals.
import * as cheerio from "cheerio";
import { classifyDomain } from "../lib/domains.mjs";
import { browserFetch } from "../lib/http.mjs";

const CATEGORY_DOMAIN = {
  "healthcare": "health", "health": "health",
  "higher education": "education", "education": "education",
  "financial": "housing", "economic development": "justice",
};

export async function scrape({ endpoint, applyUrl, authority }) {
  const res = await browserFetch(endpoint);
  if (!res.ok) throw new Error(`TX page ${res.status}`);
  const $ = cheerio.load(await res.text());
  const today = new Date().toISOString().slice(0, 10);
  const rows = []; const seen = new Set(); let id = 1;

  $("h2").each((_, h) => {
    const category = $(h).text().trim();
    const list = $(h).nextUntil("h2", "ul").first();
    list.children("li").each((_, li) => {
      const $li = $(li);
      const statuteHref = $li.find("a").first().attr("href") || null;
      const name = $li.clone().children().remove().end().text()
        .replace(/\s*\(\s*\)?\s*$/, "").replace(/\s+/g, " ").trim()
        .replace(/\s*\($/, "").trim();
      if (!name || name.length < 6 || seen.has(name)) return;
      seen.add(name);
      rows.push({
        id: id++, name,
        domain: CATEGORY_DOMAIN[category.toLowerCase()] || classifyDomain(name),
        totalSeats: null,
        vacantSeats: 0,                        // INVENTORY MODE — TX publishes no vacancy list
        vacantSince: null,
        authority, constituent: null, applyUrl,
        sourceUrl: statuteHref || endpoint,    // statute link = enrichment pointer
        lastVerified: today,
        criticalNote: "Texas accepts applications year-round; staggered 6-year terms",
      });
    });
  });
  if (rows.length === 0) throw new Error("TX parser found no rows — page structure may have changed");
  return rows;
}
