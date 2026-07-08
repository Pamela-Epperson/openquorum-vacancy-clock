// Oregon — Workday CXS JSON API behind oregon.wd5.myworkdayjobs.com/Boards.
// Two passes:
//   1. List: session handshake → paged jobs query.
//   2. Enrich: fetch each posting's detail JSON and extract, FROM OREGON'S OWN
//      TEXT, the board's member count (totalSeats) and mandate. If the state
//      doesn't state a number, the row stays provisional — never guessed.
import { classifyDomain } from "../lib/domains.mjs";
import { browserFetch, cookieJar } from "../lib/http.mjs";
import { extractTotalSeats, extractMandate, stripHtml } from "../lib/enrich.mjs";

const SITE = "https://oregon.wd5.myworkdayjobs.com";

export async function scrape({ endpoint, applyUrl, authority }) {
  const jar = cookieJar();
  await browserFetch(`${SITE}/en-US/Boards`, {}, { jar });     // handshake — cookies + CSRF
  const csrf = jar.get("CALYPSO_CSRF_TOKEN");
  const jsonHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(csrf ? { "X-CALYPSO-CSRF-TOKEN": csrf } : {}),
  };

  // ── Pass 1: list all postings ──
  const postings = [];
  let offset = 0, total = Infinity;
  while (offset < total && offset < 500) {
    const res = await browserFetch(endpoint, {
      method: "POST", headers: jsonHeaders,
      body: JSON.stringify({ appliedFacets: {}, limit: 20, offset, searchText: "" }),
    }, { jar });
    if (!res.ok) throw new Error(`OR Workday ${res.status}`);
    const data = await res.json();
    total = data.total ?? 0;
    postings.push(...(data.jobPostings ?? []));
    offset += 20;
    if ((data.jobPostings ?? []).length === 0) break;
  }
  if (postings.length === 0) throw new Error("OR parser found no postings");

  // ── Pass 2: detail-fetch each posting for seat counts + mandate ──
  const today = new Date().toISOString().slice(0, 10);
  const byBoard = new Map();
  for (const p of postings) {
    const rawTitle = (p.title || "").replace(/\s+/g, " ").trim();
    const name = rawTitle.split("|")[0].trim() || rawTitle;   // "X Board | Board Member" → "X Board"
    if (!name) continue;

    let totalSeats = null, mandate = null, detailUrl = null;
    if (p.externalPath) {
      detailUrl = `${SITE}/en-US/Boards${p.externalPath}`;
      try {
        const dres = await browserFetch(`${SITE}/wday/cxs/oregon/Boards${p.externalPath}`, { headers: jsonHeaders }, { jar, retries: 1 });
        if (dres.ok) {
          const detail = await dres.json();
          const desc = stripHtml(detail?.jobPostingInfo?.jobDescription);
          totalSeats = extractTotalSeats(desc);
          mandate = extractMandate(desc);
        }
      } catch { /* detail fetch failed — row stays provisional */ }
      await new Promise(r => setTimeout(r, 300));             // polite pacing
    }

    if (byBoard.has(name)) {
      const row = byBoard.get(name);
      row.vacantSeats += 1;
      row.totalSeats = row.totalSeats ?? totalSeats;
      row.mandate = row.mandate || mandate;
    } else {
      byBoard.set(name, {
        id: byBoard.size + 1,
        name,
        domain: classifyDomain(name),
        totalSeats,                                            // only if Oregon's text states it
        vacantSeats: 1,
        vacantSince: null,                                     // Workday shows relative dates only
        authority,
        constituent: `Oregonians served by the ${name}`,       // descriptive framing, not a data claim
        mandate: mandate || "",
        requires: [],                                          // filled generically at promotion
        applyUrl: detailUrl || applyUrl,
        sourceUrl: detailUrl || `${SITE}/Boards`,
        lastVerified: today,
        criticalNote: "Open posting on Workday",
      });
    }
  }
  return [...byBoard.values()];
}
