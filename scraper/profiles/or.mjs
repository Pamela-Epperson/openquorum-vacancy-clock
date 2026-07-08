// Oregon — Workday CXS JSON API behind oregon.wd5.myworkdayjobs.com/Boards.
// Workday requires a session handshake: GET the site page first (collect
// cookies + CSRF token), then POST the jobs query with them.
// Emits PROVISIONAL rows (Workday posts openings, not board seat totals).
import { classifyDomain } from "../lib/domains.mjs";
import { browserFetch, cookieJar } from "../lib/http.mjs";

export async function scrape({ endpoint, applyUrl, authority }) {
  const jar = cookieJar();
  // Handshake — sets PLAY_SESSION / CALYPSO_CSRF_TOKEN cookies
  await browserFetch("https://oregon.wd5.myworkdayjobs.com/en-US/Boards", {}, { jar });
  const csrf = jar.get("CALYPSO_CSRF_TOKEN");

  const today = new Date().toISOString().slice(0, 10);
  const rows = [];
  let offset = 0, total = Infinity, id = 1;
  while (offset < total && offset < 500) {
    const res = await browserFetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(csrf ? { "X-CALYPSO-CSRF-TOKEN": csrf } : {}),
      },
      body: JSON.stringify({ appliedFacets: {}, limit: 20, offset, searchText: "" }),
    }, { jar });
    if (!res.ok) throw new Error(`OR Workday ${res.status}`);
    const data = await res.json();
    total = data.total ?? 0;
    for (const p of data.jobPostings ?? []) {
      const name = (p.title || "").replace(/\s+/g, " ").trim();
      if (!name) continue;
      rows.push({
        id: id++,
        name,
        domain: classifyDomain(name),
        totalSeats: null,
        vacantSeats: 1,
        vacantSince: null,
        authority,
        constituent: null,
        applyUrl: p.externalPath ? `https://oregon.wd5.myworkdayjobs.com/en-US/Boards${p.externalPath}` : applyUrl,
        sourceUrl: "https://oregon.wd5.myworkdayjobs.com/Boards",
        lastVerified: today,
        criticalNote: "Open posting on Workday",
      });
    }
    offset += 20;
    if ((data.jobPostings ?? []).length === 0) break;
  }
  if (rows.length === 0) throw new Error("OR parser found no rows — verify Workday endpoint");
  return rows;
}
