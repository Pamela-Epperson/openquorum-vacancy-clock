// Browser-grade fetch helper — some state portals (WAFs) reject bare bot
// requests. We identify honestly via Referer-less browser headers and retry
// politely. Includes a minimal cookie jar for portals needing a session
// handshake (e.g. Workday).
const BROWSER_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 OpenQuorumScraper/1.1",
  "Accept": "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

export function cookieJar() {
  const jar = new Map();
  return {
    absorb(res) {
      const set = res.headers.getSetCookie?.() ?? [];
      for (const c of set) {
        const [pair] = c.split(";");
        const eq = pair.indexOf("=");
        if (eq > 0) jar.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
      }
    },
    header() {
      return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
    },
    get(name) { return jar.get(name); },
  };
}

export async function browserFetch(url, opts = {}, { retries = 2, jar = null } = {}) {
  const headers = { ...BROWSER_HEADERS, ...(opts.headers || {}) };
  if (jar && jar.header()) headers["Cookie"] = jar.header();
  let lastErr;
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, { ...opts, headers });
      if (jar) jar.absorb(res);
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (err) {
      lastErr = err;
      await new Promise(r => setTimeout(r, 1500 * (i + 1)));
    }
  }
  throw lastErr;
}
