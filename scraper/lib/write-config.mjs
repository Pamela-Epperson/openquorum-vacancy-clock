#!/usr/bin/env node
// Promotes a scraped state into src/states.config.js — the gated final step.
//   node scraper/lib/write-config.mjs CO
// Refuses unless: registry.promote === true AND every row passes the full
// SCRAPER_CONTRACT ("Prove It": provisional rows never reach the live config).
// On success: inserts a live entry, removes the state from SCAFFOLDED_LIST,
// stamps the scraper block. Commit + PR happen in the workflow, not here.
import { REGISTRY } from "../registry.mjs";
import { validateRow } from "./contract.mjs";
import { readFileSync, writeFileSync } from "node:fs";

const st = process.argv[2];
if (!st || !REGISTRY[st]) { console.error("usage: write-config.mjs <STATE-IN-REGISTRY>"); process.exit(1); }
const reg = REGISTRY[st];
if (!reg.promote) { console.error(`${st}: promote:false in registry — review the scrape PR first, then flip it.`); process.exit(1); }

const staged = JSON.parse(readFileSync(`data/scraped/${st}.json`, "utf8"));
// Publish the verified subset (like the pilot states seeded a researched subset):
// full-contract rows go live; provisional rows stay staged in data/scraped/.
const fullRows = staged.rows.filter(r => validateRow(r).full);
const held = staged.rows.length - fullRows.length;
if (fullRows.length === 0) {
  console.error(`${st}: 0 of ${staged.rows.length} rows pass the full contract — nothing to promote yet.`);
  process.exit(1);
}
staged.rows = fullRows;
console.log(`${st}: promoting ${fullRows.length} verified boards; ${held} provisional rows remain staged (tracked, not published).`);

const CONFIG = "src/states.config.js";
let cfg = readFileSync(CONFIG, "utf8");

// ── Refresh path: state is ALREADY LIVE and scraper-managed ───────────────────
// Matches only entries created by this writer (marker "status: live (scraper: X)").
// Hand-curated pilot states carry "(researched seed data)" and are NEVER touched.
const liveMarkerRe = new RegExp(`\n  // ─── .+ ─── status: live \\(scraper: [\\w-]+\\) ───[^\n]*\n  ${st}: \\{`);
const isScraperLive = liveMarkerRe.test(cfg);
const PALETTE = [["#0E6B5C","#E0F4F0"],["#7A3E8F","#F4EBF7"],["#8A5A0B","#FAF1DE"],["#2F6B9A","#E8F1F8"]];
const [color, bg] = PALETTE[st.charCodeAt(0) % PALETTE.length];
const label = { CO:"Colorado", WA:"Washington", OR:"Oregon", CA:"California", FL:"Florida", OH:"Ohio", TX:"Texas", CT:"Connecticut" }[st] || st;
const region = { CO:"West", WA:"West", OR:"West", CA:"West", FL:"South", OH:"Midwest", TX:"South", CT:"Northeast" }[st] || "West";

// Generic skill tags by domain — lets scraped boards participate in
// SeatFinder matching until board-specific requirements are researched.
const DOMAIN_REQUIRES = {
  health:      ["Health Policy","Program & Project Management","Research & Analysis"],
  education:   ["Education Policy","Workforce Development","Research & Analysis"],
  equity:      ["Equity Policy","Community Outreach","Advocacy"],
  environment: ["Environmental Policy","Research & Analysis","Policy"],
  housing:     ["Housing Policy","Program & Project Management","Policy"],
  disability:  ["Disability Policy","Advocacy","Federal compliance"],
  justice:     ["Justice Reform","Public Sector Leadership","Research & Analysis"],
};

// id range: next free hundreds block
// match both hand-written `id:301` and JSON `"id":1301` forms
const maxId = Math.max(...[...cfg.matchAll(/"?id"?:\s*(\d{3,5})\b/g)].map(m => +m[1]));
const base = (Math.floor(maxId / 100) + 1) * 100;
const rowsJs = staged.rows.map((r, i) => "      " + JSON.stringify({
  ...r,
  id: base + i + 1,
  mandate: r.mandate || "",
  requires: (r.requires && r.requires.length) ? r.requires : (DOMAIN_REQUIRES[r.domain] || []),
  confirmation: r.confirmation ?? false,
})).join(",\n");

const entry = `
  // ─── ${label} ─── status: live (scraper: ${reg.profile}) ───
  ${st}: {
    code:"${st}", label:${JSON.stringify(label)}, region:${JSON.stringify(region)},
    status:"live",
    color:"${color}", bg:"${bg}",
    applyUrl:${JSON.stringify(reg.applyUrl)},
    applyAuthority:${JSON.stringify(reg.applyAuthority)},
    applyLabel:${JSON.stringify(reg.applyAuthority)},
    applyVerified:${JSON.stringify(new Date().toISOString().slice(0,10))},
    dataSource:${JSON.stringify(reg.dataSource)},
    scraper:{ endpoint:${JSON.stringify(reg.endpoint)}, lastPulled:${JSON.stringify(staged.scrapedAt)}, selectorProfile:${JSON.stringify(reg.profile)} },
    totalBoardsNote:${JSON.stringify((reg.totalBoardsNote || "") + " · " + staged.rows.length + " verified of " + (staged.rows.length + held) + " openings tracked")},
    contextNote:${JSON.stringify(reg.contextNote || null)},
    auditNote:null,
    boards:[
${rowsJs}
    ]
  },
`;
if (isScraperLive) {
  // ── REFRESH an existing scraper-managed live entry in place ──
  const markerMatch = cfg.match(liveMarkerRe);
  const blockStart = cfg.indexOf(markerMatch[0]);
  const braceStart = cfg.indexOf(`${st}: {`, blockStart) + `${st}: `.length;
  let depth = 0, i = braceStart;
  while (true) {
    const c = cfg[i];
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) break; }
    i++;
  }
  let blockEnd = i + 1;
  if (cfg[blockEnd] === ",") blockEnd++;
  const existing = cfg.slice(blockStart, blockEnd);
  // preserve the entry's existing palette + id block for stable diffs
  const keep = (re, fallback) => (existing.match(re) || [null, fallback])[1];
  const exColor = keep(/color:"(#[0-9A-Fa-f]{6})"/, color);
  const exBg    = keep(/bg:"(#[0-9A-Fa-f]{6})"/, bg);
  // Renumber from the current global max — guarantees cross-state uniqueness
  // (fixes historical collisions where several scraped states shared 1301+).
  const cfgWithoutThis = cfg.slice(0, blockStart) + cfg.slice(blockEnd);
  const exMax = Math.max(...[...cfgWithoutThis.matchAll(/"?id"?:\s*(\d{3,5})\b/g)].map(m => +m[1]), 1200);
  const exBase = (Math.floor(exMax / 100) + 1) * 100;
  const rowsJs2 = staged.rows.map((r, i2) => "      " + JSON.stringify({
    ...r, id: exBase + i2 + 1,
    mandate: r.mandate || "",
    requires: (r.requires && r.requires.length) ? r.requires : (DOMAIN_REQUIRES[r.domain] || []),
    confirmation: r.confirmation ?? false,
  })).join(",\n");
  const refreshed = entry
    .replace(/color:"#[0-9A-Fa-f]{6}", bg:"#[0-9A-Fa-f]{6}"/, `color:"${exColor}", bg:"${exBg}"`)
    .replace(/boards:\[\n[\s\S]*\n    \]/, `boards:[\n${rowsJs2}\n    ]`);
  cfg = cfg.slice(0, blockStart) + refreshed.replace(/^\n/, "\n") + cfg.slice(blockEnd);
  writeFileSync(CONFIG, cfg);
  console.log(`${st}: LIVE entry refreshed — ${staged.rows.length} verified boards (ids ${exBase + 1}+), scraper.lastPulled updated. Review diff, merge, sync handles the rest.`);
} else {
  // ── PROMOTE a scaffolded state to live (original path) ──
  const anchor = "\n  // ─── Scaffolded states (awaiting scraper)";
  if (!cfg.includes(anchor)) { console.error("config anchor not found"); process.exit(1); }
  cfg = cfg.replace(anchor, entry + anchor);
  const listRe = new RegExp(`\\s*\\["${st}","[^"]+","[^"]+"\\],?`);
  if (!listRe.test(cfg)) { console.error(`${st} not found in SCAFFOLDED_LIST`); process.exit(1); }
  cfg = cfg.replace(listRe, "");
  writeFileSync(CONFIG, cfg);
  console.log(`${st}: promoted to live with ${staged.rows.length} rows (ids ${base + 1}+). Review the diff, then merge — the sync workflow updates the other repos automatically.`);
}
