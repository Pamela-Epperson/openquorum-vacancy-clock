// Text-enrichment helpers — extract facts a source states in prose.
// Extraction only: if the source doesn't state it, we return null.

const NUMBER_WORDS = { one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,
  eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,
  nineteen:19,twenty:20,"twenty-one":21,"twenty-two":22,"twenty-three":23,"twenty-four":24,"twenty-five":25 };

// "The board consists of nine members", "comprised of 15 voting members",
// "a 12-member commission", "seven-member board"
export function extractTotalSeats(text) {
  if (!text) return null;
  const t = text.replace(/\s+/g, " ");
  let m = t.match(/\b(?:consists? of|composed of|comprised of|made up of)\s+(?:up to\s+)?([a-z-]+|\d+)\s+(?:voting\s+|public\s+|appointed\s+)?members\b/i);
  if (!m) m = t.match(/\b(?:an?\s+)?(\d+|[a-z-]+)[-\s]member\s+(?:board|commission|council|committee|task force|panel)\b/i);
  if (!m) return null;
  const raw = m[1].toLowerCase();
  const n = /^\d+$/.test(raw) ? parseInt(raw, 10) : NUMBER_WORDS[raw] ?? null;
  return n && n > 0 && n < 100 ? n : null;
}

// First 1–2 sentences of the source's own description → mandate (verbatim-ish)
export function extractMandate(text) {
  if (!text) return null;
  const clean = text.replace(/\s+/g, " ").trim();
  const sentences = clean.split(/(?<=[.!?])\s+/).filter(s => s.length > 25);
  if (!sentences.length) return null;
  const mandate = sentences.slice(0, 2).join(" ").slice(0, 320);
  return mandate.length > 40 ? mandate : null;
}

// Strip HTML from Workday jobDescription
export function stripHtml(html) {
  return (html || "")
    .replace(/<br\s*\/?>(?=.)/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ").trim();
}
