#!/usr/bin/env node
// Prove-it validator + stats for the "Passed, Not Paid" dataset.
//   node passed-not-paid.tools.mjs            → validate + print stats (exit 1 if invalid)
//   node passed-not-paid.tools.mjs --json     → machine-readable {ok,errors,stats}
// Also exports { validate, stats } so the generator can run the SAME gate before
// it emits pnp-gaps.json. Mirrors the OQ scraper discipline: a case ships only if
// it passes the full contract; anything short stays staged (reported, not shipped).
import { pathToFileURL } from "node:url";
import { GAPS } from "./passed-not-paid.config.js";

export const REQUIRED = [
  "id", "title", "law", "jurisdiction", "domain", "tier", "status", "barPct",
  "authorized", "appropriated", "fundedShare", "gap", "authorizingCitation",
  "appropriationSource", "constituent", "criticalNote", "lastVerified"
];
export const TIERS  = new Set(["crumbs", "shortfall"]);
export const STATUS = new Set(["open", "resolved", "lapsed"]);

export function validate(gaps) {
  const errors = [];
  const ids = new Set();
  for (const g of gaps) {
    const where = g.id || g.title || "(unknown)";
    for (const f of REQUIRED) {
      if (g[f] === undefined || g[f] === null || g[f] === "") errors.push(`${where}: missing ${f}`);
    }
    if (ids.has(g.id)) errors.push(`${where}: duplicate id`);
    ids.add(g.id);
    if (!TIERS.has(g.tier))    errors.push(`${where}: bad tier "${g.tier}"`);
    if (!STATUS.has(g.status)) errors.push(`${where}: bad status "${g.status}"`);
    // barPct must be an integer 0–100 (the delivered-fill of the bar)
    if (!Number.isInteger(g.barPct) || g.barPct < 0 || g.barPct > 100)
      errors.push(`${where}: barPct must be an integer 0–100 (got ${g.barPct})`);
    // resolved cases must carry the closed/was labels the gallery renders
    if (g.status === "resolved") {
      if (!g.closedLabel) errors.push(`${where}: resolved case needs closedLabel`);
      if (!g.wasLabel)    errors.push(`${where}: resolved case needs wasLabel`);
    }
    // prove-it: ≥1 labeled source, each a [label, http-url] pair
    if (!Array.isArray(g.sources) || g.sources.length < 1) {
      errors.push(`${where}: prove-it — needs ≥1 source [label, url]`);
    } else {
      g.sources.forEach((s, i) => {
        if (!Array.isArray(s) || s.length < 2 || !s[0] || !/^https?:\/\//.test(s[1] || ""))
          errors.push(`${where}: source[${i}] must be [label, http(s) url]`);
      });
    }
  }
  return errors;
}

export function stats(gaps) {
  const by = (k) => gaps.reduce((m, g) => ((m[g[k]] = (m[g[k]] || 0) + 1), m), {});
  return {
    total: gaps.length,
    crumbs: gaps.filter(g => g.tier === "crumbs").length,
    shortfall: gaps.filter(g => g.tier === "shortfall").length,
    byStatus: by("status"),
    byDomain: by("domain"),
    jurisdictions: [...new Set(gaps.map(g => g.jurisdiction))],
    multiSourced: gaps.filter(g => (g.sources || []).length >= 2).length
  };
}

// CLI block — only runs when invoked directly, so the generator can import cleanly.
if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  const errors = validate(GAPS);
  const s = stats(GAPS);
  if (process.argv.includes("--json")) {
    console.log(JSON.stringify({ ok: errors.length === 0, errors, stats: s }, null, 2));
  } else {
    console.log(errors.length ? `✗ ${errors.length} contract error(s):\n  - ${errors.join("\n  - ")}`
                              : "✓ all cases pass the prove-it contract");
    console.log(`\n${s.total} documented federal gaps · ${s.crumbs} crumbs (≤5%/$0) · ${s.shortfall} pennies-on-the-dollar`);
    console.log(`status: ${JSON.stringify(s.byStatus)} · domains: ${JSON.stringify(s.byDomain)}`);
    console.log(`${s.multiSourced}/${s.total} cases carry ≥2 independent sources`);
  }
  process.exitCode = errors.length ? 1 : 0;
}
