// Missouri — boards.mo.gov vacancy list sits behind an ASP.NET postback
// (__doPostBack('ctl00$ContentHolder$lbShowVacancies','')). Replicate it:
// GET the page for VIEWSTATE tokens, then POST the postback, then parse the
// returned board/vacancy listing. VERIFY OUTPUT ON FIRST ACTIONS RUN.
import * as cheerio from "cheerio";
import { classifyDomain } from "../lib/domains.mjs";
import { browserFetch, cookieJar } from "../lib/http.mjs";

export async function scrape({ endpoint, applyUrl, authority }) {
  const jar = cookieJar();
  const get = await browserFetch(endpoint, {}, { jar });
  if (!get.ok) throw new Error(`MO page ${get.status}`);
  const $g = cheerio.load(await get.text());
  const token = n => $g(`input[name='${n}']`).val() || "";
  const form = new URLSearchParams({
    __EVENTTARGET: "ctl00$ContentHolder$lbShowVacancies",
    __EVENTARGUMENT: "",
    __VIEWSTATE: token("__VIEWSTATE"),
    __VIEWSTATEGENERATOR: token("__VIEWSTATEGENERATOR"),
    __EVENTVALIDATION: token("__EVENTVALIDATION"),
  });
  const post = await browserFetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  }, { jar });
  if (!post.ok) throw new Error(`MO postback ${post.status}`);
  const $ = cheerio.load(await post.text());

  const today = new Date().toISOString().slice(0, 10);
  const rows = []; const byName = new Map(); let id = 1;
  // Vacancy listing renders as links to Board.aspx detail pages (one per
  // affected board) and/or table rows; count occurrences per board.
  $("a[href*='Board.aspx']").each((_, a) => {
    const name = $(a).text().replace(/\s+/g, " ").trim();
    if (!name || name.length < 6) return;
    const detail = new URL($(a).attr("href"), "https://boards.mo.gov/userpages/").href;
    if (byName.has(name)) { byName.get(name).vacantSeats += 1; return; }
    const row = {
      id: id++, name, domain: classifyDomain(name),
      totalSeats: null, vacantSeats: 1, vacantSince: null,
      authority, constituent: null, applyUrl,
      sourceUrl: detail, lastVerified: today,
      criticalNote: "Current vacancy or expired term per boards.mo.gov",
    };
    byName.set(name, row); rows.push(row);
  });
  if (rows.length === 0) throw new Error("MO parser found no rows — postback/layout may have changed");
  return rows;
}
