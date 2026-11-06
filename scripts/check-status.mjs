// Writes public/status.json: a real, timestamped health check of the live projects.
// Run by the scheduled GitHub Action just before each build, so the site stays fully static.
// It only records what it actually saw. A failed request is recorded as a failure, never skipped.
import { mkdirSync, writeFileSync } from "node:fs";

const CHECKS = {
  "chama-cha-mimi-na-wewe": { url: "https://chamachamiminawewe.co.ke/api/health", expect: (body) => body?.status === "ok" },
};

async function check(url, expect) {
  const started = Date.now();
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(12000), headers: { "user-agent": "ipswitch-status-check" } });
    let body = null;
    try {
      body = await res.json();
    } catch {
      body = null;
    }
    return { ok: res.ok && expect(body), httpStatus: res.status, ms: Date.now() - started };
  } catch (err) {
    return { ok: false, httpStatus: null, ms: Date.now() - started, error: String(err?.name ?? "error") };
  }
}

const checks = {};
for (const [slug, { url, expect }] of Object.entries(CHECKS)) checks[slug] = await check(url, expect);

mkdirSync("public", { recursive: true });
writeFileSync("public/status.json", JSON.stringify({ checkedAt: new Date().toISOString(), checks }, null, 2) + "\n");
console.log("status.json written:", JSON.stringify(checks));
