// Keyword → OpenQuorum domain classifier. Classification only — never invents facts.
const MAP = [
  ["health", /health|medical|nursing|behavioral|psycholog|psychiatr|hospital|opioid|drug|alcohol|aging|elder|emergency medical|trauma|stroke|medicaid|dental|pharma/i],
  ["education", /education|school|college|university|teacher|student|early childhood|workforce|library|curriculum|charter/i],
  ["equity", /women|equity|civil rights|human rights|african|hispanic|latino|asian|indian|tribal|indigenous|lgbtq|minority|immigrant|refugee/i],
  ["environment", /environment|water|forest|wildlife|parks|natural|conservation|air quality|energy|climate|coastal|land/i],
  ["housing", /housing|homeless|rent|tenant|building|construction assistance/i],
  ["disability", /disabilit|blind|deaf|independent living|brain injury|developmental/i],
  ["justice", /justice|police|correction|parole|crime|court|judicial|legal|veteran|fire|safety|law enforcement/i],
];
export function classifyDomain(name) {
  for (const [domain, re] of MAP) if (re.test(name)) return domain;
  return "justice"; // neutral catch-all used by existing tools' fallback styling
}
