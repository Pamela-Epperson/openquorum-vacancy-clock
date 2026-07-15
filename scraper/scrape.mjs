#!/usr/bin/env node
// OpenQuorum scraper orchestrator.
//   node scraper/scrape.mjs            → scrape every state in registry.mjs
//   node scraper/scrape.mjs CO WA      → scrape specific states
// Output: data/scraped/<ST>.json  (always — raw normalized rows + validation summary)
// Promotion into src/states.config.js is a SEPARATE, gated step: lib/write-config.mjs
import { REGISTRY } from "./registry.mjs";
import { summarize } from "./lib/contract.mjs";
import { writeFileSync, mkdirSync } from "node:fs";

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
      rows = rows.map(r => ENRICHMENTS[r.name] ? { ...r, ...ENRICHMENTS[r.name] } : r);
      const enriched = rows.filter(r => ENRICHMENTS[r.name]).length;
      if (enriched) console.log(`${st}: overlay applied to ${enriched} boards`);
    } catch { /* no overlay for this state — fine */ }
    const summary = summarize(st, rows);
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
