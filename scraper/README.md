# OpenQuorum Scraper — bringing all 50 states + DC online

Drop this kit into the **openquorum-vacancy-clock** repo (it becomes the data
source of truth). The pipeline turns "Coming online" states into live states
with ONE human touch per state: reviewing a pull request.

## How a state goes live (the pipeline)
1. **Weekly scrape** (`scrape.yml`, Mondays + run-anytime button): every state in
   `scraper/registry.mjs` is fetched and parsed into SCRAPER_CONTRACT rows →
   `data/scraped/<ST>.json`, and a PR opens with a validation report.
2. **Provisional vs full:** rows missing anything a source doesn't publish
   (seat totals, vacancy dates) are *provisional* — they stay staged and are
   never written into the live config. The PR report says exactly what's missing.
3. **Promotion:** when a state's rows are full and you've reviewed a scrape PR,
   flip `promote: true` in `registry.mjs`. The next run writes the state into
   `src/states.config.js` as `status:"live"` — same shape as the 12 pilots.
4. **Auto-sync:** merging any config change triggers `sync-config.yml`, which
   pushes the identical file to OpenQuorum-SeatFinder and openquorum-impactmap.
   Vercel redeploys all three. The state appears everywhere, no re-uploads.

## One-time setup (~5 minutes)
1. Upload this kit's folders (`scraper/`, `data/`, `.github/workflows/`) to the
   openquorum-vacancy-clock repo root.
2. GitHub → Settings → Developer settings → Personal access tokens → create a
   token with `repo` scope (or fine-grained: contents read/write on
   OpenQuorum-SeatFinder + openquorum-impactmap).
3. In openquorum-vacancy-clock → Settings → Secrets and variables → Actions →
   New repository secret → name `OQ_SYNC_TOKEN`, paste the token.
4. Actions tab → "Scrape state board data" → Run workflow. Review the PR.

## Current profiles
| State | Source | Status |
|---|---|---|
| CO | Governor's openings page (HTML) | Parser written against live page structure (verified 7/8/26) |
| WA | Monthly opportunities PDF | Parser written; conservative line-extraction — **verify first run** |
| OR | Workday JSON API | Standard Workday CXS pattern — **verify first run** (untestable from build sandbox) |

Researched and ready for profiles next (apply authorities verified 7/8/26):
CA, FL, OH, TX — notes in `registry.mjs`. CT needs authority verification first.

## Integrity rules (non-negotiable)
- Every row carries `sourceUrl` + `lastVerified` from the actual fetch.
- Parsers never invent seat counts, dates, or names; unknown = `null`.
- Provisional rows cannot reach the live config (`write-config.mjs` refuses).
- Promotion requires an explicit human flag + PR review — that's the "Prove It" gate.

## Enriching provisional states to full
Openings pages (CO/WA/OR) prove *vacancies* but not *seat totals*. To finish a
state: add totalSeats/constituent/mandate per board from its statute or profile
page (CO: Blue Book PDF; WA: board profile pages) — either by extending the
state's profile parser or by a one-time research pass like the original pilots.
