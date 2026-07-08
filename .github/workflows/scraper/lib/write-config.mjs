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
const bad = staged.rows.map(r => ({ r, v: validateRow(r) })).filter(x => !x.v.full);
if (bad.length) {
  console.error(`${st}: ${bad.length}/${staged.rows.length} rows are provisional — enrich before promotion. First issue: ${bad[0].r.name} → ${bad[0].v.problems.join(",")}`);
  process.exit(1);
}

const CONFIG = "src/states.config.js";
let cfg = readFileSync(CONFIG, "utf8");
const PALETTE = [["#0E6B5C","#E0F4F0"],["#7A3E8F","#F4EBF7"],["#8A5A0B","#FAF1DE"],["#2F6B9A","#E8F1F8"]];
const [color, bg] = PALETTE[st.charCodeAt(0) % PALETTE.length];
const label = { CO:"Colorado", WA:"Washington", OR:"Oregon", CA:"California", FL:"Florida", OH:"Ohio", TX:"Texas", CT:"Connecticut" }[st] || st;
const region = { CO:"West", WA:"West", OR:"West", CA:"West", FL:"South", OH:"Midwest", TX:"South", CT:"Northeast" }[st] || "West";

// id range: next free hundreds block
const maxId = Math.max(...[...cfg.matchAll(/id:\s*(\d{3,4})\b/g)].map(m => +m[1]));
const base = (Math.floor(maxId / 100) + 1) * 100;
const rowsJs = staged.rows.map((r, i) => "      " + JSON.stringify({ ...r, id: base + i + 1 })).join(",\n");

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
    totalBoardsNote:${JSON.stringify(reg.totalBoardsNote || null)},
    contextNote:null,
    auditNote:null,
    boards:[
${rowsJs}
    ]
  },
`;
const anchor = "\n  // ─── Scaffolded states (awaiting scraper)";
if (!cfg.includes(anchor)) { console.error("config anchor not found"); process.exit(1); }
cfg = cfg.replace(anchor, entry + anchor);
const listRe = new RegExp(`\\s*\\["${st}","[^"]+","[^"]+"\\],?`);
if (!listRe.test(cfg)) { console.error(`${st} not found in SCAFFOLDED_LIST`); process.exit(1); }
cfg = cfg.replace(listRe, "");
writeFileSync(CONFIG, cfg);
console.log(`${st}: promoted to live with ${staged.rows.length} rows (ids ${base + 1}+). Review the diff, then merge — the sync workflow updates the other repos automatically.`);
