#!/usr/bin/env node
// OpenQuorum scraper orchestrator.
//   node scraper/scrape.mjs            → scrape every state in registry.mjs
//   node scraper/scrape.mjs CO WA      → scrape specific states
// Output: data/scraped/<ST>.json  (always — raw normalized rows + validation summary)
// Promotion into src/states.config.js is a SEPARATE, gated step: lib/write-config.mjs
import { REGISTRY } from "./registry.mjs";
import { summarize } from "./lib/contract.mjs";
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const args = process.argv.slice(2);
const states = args.length ? args : Object.keys(REGISTRY);
mkdirSync("data/scraped", { recursive: true });

const report = [];
for (const st of states) {
  const cfg = REGISTRY[st];
  if (!cfg) { report.push(`${st}: not in registry — skipped`); continue; }
  if (cfg.profile === "manual") { report.push(`${st}: manual state — staged data maintained by hand in data/scraped/${st}.json`); continue; }
  try {
    const { scrape } = await import(`./profiles/${cfg.profile}.mjs`);
    let rows = await scrape({ endpoint: cfg.endpoint, applyUrl: cfg.applyUrl, authority: cfg.applyAuthority });
    // Merge human-verified enrichment overlay (statute-sourced seat totals,
    // mandates, constituents) if one exists for this state.
    try {
      const { ENRICHMENTS } = await import(`./enrichments/${st}.mjs`);
      const scrapedNames = new Set(rows.map(r => r.name));
      // 1) Overlay statute-verified facts onto matching scraped vacancy rows.
      rows = rows.map(r => ENRICHMENTS[r.name] ? { ...r, ...ENRICHMENTS[r.name] } : r);
      const overlaid = rows.filter(r => ENRICHMENTS[r.name]).length;
      // 2) STABLE-SPINE guarantee. A human-verified statutory board must stay
      //    live even in a cycle where it has no current vacancy (and is therefore
      //    absent from the weekly vacancy source). Without this, boards silently
      //    drop in and out week to week — the AZ 12-to-6 regression. Emit any
      //    enrichment board not seen this cycle as a full row with vacantSeats:0
      //    (honest: no vacancy currently reported), sourced to its statute.
      const today = new Date().toISOString().slice(0, 10);
      let held = 0;
      for (const [name, e] of Object.entries(ENRICHMENTS)) {
        if (scrapedNames.has(name)) continue;
        rows.push({
          name,
          domain: e.domain,
          totalSeats: e.totalSeats,
          vacantSeats: 0,
          vacantSince: null,
          authority: cfg.applyAuthority,
          constituent: e.constituent,
          applyUrl: cfg.applyUrl,
          sourceUrl: e.seatSource,
          lastVerified: today,
          mandate: e.mandate,
          criticalNote: e.criticalNote || "Statutory board — no current vacancy reported this cycle",
        });
        held++;
      }
      if (overlaid || held) console.log(`${st}: overlay applied to ${overlaid} board(s); ${held} statutory board(s) held stable (no current vacancy)`);
    } catch { /* no overlay for this state — fine */ }
    const summary = summarize(st, rows);
    // ── Yield-floor guard ───────────────────────────────────────────────
    // Stop a drifted/broken source from silently overwriting good data. Trip
    // when a run yields under the greater of cfg.minRows and 50% of the
    // last-good committed count (only when last-good was itself substantial).
    // On a trip we KEEP the last-good file and flag it loudly instead.
    // NOTE: the stable-spine step above now guarantees every enriched state's
    // statutory boards are retained regardless of the weekly vacancy yield, so
    // the board-level collapse this guard used to miss can no longer happen for
    // enriched states; this remains a backstop for raw source drift.
    let lastGood = 0;
    try { lastGood = (JSON.parse(readFileSync(`data/scraped/${st}.json`, "utf8")).rows || []).length; } catch { /* first run — nothing to protect */ }
    const floor = Math.max(cfg.minRows || 0, lastGood >= 8 ? Math.ceil(lastGood * 0.5) : 0);
    if (floor && rows.length < floor) {
      report.push(`${st}: ⚠ YIELD GUARD TRIPPED — ${rows.length} rows (< floor ${floor}; last-good ${lastGood}). Source likely drifted — keeping last-good ${st}.json (NOT overwritten). Investigate profiles/${cfg.profile}.mjs.`);
      process.exitCode = 0;
      continue;
    }
    writeFileSync(`data/scraped/${st}.json`, JSON.stringify({ scrapedAt: new Date().toISOString(), registry: cfg, summary, rows }, null, 2));
    report.push(`${st}: ${summary.total} rows (${summary.full} full / ${summary.provisional} provisional)` +
      (summary.provisional ? ` — missing: ${Object.entries(summary.missingFields).map(([k,v])=>`${k}×${v}`).join(", ")}` : ""));
  } catch (err) {
    report.push(`${st}: FAILED — ${err.message}`);
    process.exitCode = 0; // one state failing must not block the others
  }
}
const out = report.join("\n");
console.log(out);
writeFileSync("data/scraped/_report.txt", out + "\n");
