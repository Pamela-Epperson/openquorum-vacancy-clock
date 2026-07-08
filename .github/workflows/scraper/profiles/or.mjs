// Oregon — Workday CXS JSON API behind oregon.wd5.myworkdayjobs.com/Boards.
// Standard Workday pattern (POST /wday/cxs/<tenant>/<site>/jobs). Could not be
// network-tested from the build sandbox — VERIFY ON FIRST ACTIONS RUN.
// Emits PROVISIONAL rows (Workday posts openings, not board seat totals).
import { classifyDomain } from "../lib/domains.mjs";

export async function scrape({ endpoint, applyUrl, authority }) {
  const today = new Date().toISOString().slice(0, 10);
  const rows = [];
  let offset = 0, total = Infinity, id = 1;
  while (offset < total && offset < 500) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "OpenQuorumScraper/1.0 (+openquorum.org)" },
      body: JSON.stringify({ appliedFacets: {}, limit: 20, offset, searchText: "" }),
    });
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
        vacantSince: null,                    // postedOn is relative text; leave null rather than guess
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
