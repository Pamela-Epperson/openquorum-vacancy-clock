// SCRAPER_CONTRACT validation — mirrors the comment block in src/states.config.js.
// FULL rows are promotable to status:"live". PROVISIONAL rows (missing seat
// counts or dates the source doesn't publish) stay staged in data/scraped/
// until enriched — they are NEVER written into the live config.
export function validateRow(r) {
  const problems = [];
  if (!r.name || typeof r.name !== "string") problems.push("name");
  if (!r.sourceUrl || !/^https:\/\//.test(r.sourceUrl)) problems.push("sourceUrl");
  if (!r.lastVerified || !/^\d{4}-\d{2}-\d{2}$/.test(r.lastVerified)) problems.push("lastVerified");
  if (!r.applyUrl) problems.push("applyUrl");
  if (!r.authority) problems.push("authority");
  if (!Number.isInteger(r.totalSeats) || r.totalSeats <= 0) problems.push("totalSeats");
  if (!Number.isInteger(r.vacantSeats) || r.vacantSeats < 0) problems.push("vacantSeats");
  if (r.vacantSince !== null && !/^\d{4}-\d{2}-\d{2}$/.test(r.vacantSince || "")) problems.push("vacantSince");
  if (!r.domain) problems.push("domain");
  if (!r.constituent) problems.push("constituent");
  return { full: problems.length === 0, problems };
}
export function summarize(state, rows) {
  const results = rows.map(validateRow);
  const full = results.filter(v => v.full).length;
  const missing = {};
  results.forEach(v => v.problems.forEach(p => (missing[p] = (missing[p] || 0) + 1)));
  return { state, total: rows.length, full, provisional: rows.length - full, missingFields: missing };
}
