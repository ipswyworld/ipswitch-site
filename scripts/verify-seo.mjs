// Checks the built site (out/) for search and sharing basics. Run after `npm run build`.
// Exits non-zero if anything fails, so the deploy workflow can refuse to publish a broken page.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = "out";
const problems = [];
const notes = [];

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}
const attr = (html, re) => (html.match(re) || [])[1];
const pages = walk(OUT).filter((f) => f.endsWith(".html"));
const urlPaths = [];

for (const file of pages) {
  const rel = relative(OUT, file).replace(/\\/g, "/");
  const is404 = rel === "404.html" || rel === "_not-found.html" || rel.startsWith("_not-found");
  if (rel.startsWith("_next/")) continue;
  // Google Search Console's ownership file is a one-line text file, not a page.
  if (/^google[0-9a-f]+\.html$/.test(rel)) continue;
  const html = readFileSync(file, "utf8");
  const fail = (msg) => problems.push(`${rel}: ${msg}`);

  const title = attr(html, /<title>([^<]*)<\/title>/);
  const desc = attr(html, /<meta name="description" content="([^"]*)"/);
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const ogImage = attr(html, /<meta property="og:image" content="([^"]*)"/);
  const twitter = attr(html, /<meta name="twitter:card" content="([^"]*)"/);

  if (!/<html[^>]*\slang="en"/.test(html)) fail("missing <html lang>");
  if (!title) fail("missing <title>");
  else if (title.length > 65) fail(`title is ${title.length} characters (max 65): "${title}"`);
  if (!desc) fail("missing meta description");
  else if (desc.length < 50 || desc.length > 165) fail(`description is ${desc.length} characters (want 50 to 165)`);
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(`has ${h1s} <h1> elements (want exactly 1)`);
  if (!/id="main"/.test(html)) fail('no id="main" landmark for the skip link');

  if (!is404) {
    if (!canonical) fail("missing canonical URL");
    else urlPaths.push(new URL(canonical).pathname);
    if (!ogImage) fail("missing og:image");
    else {
      const local = new URL(ogImage).pathname;
      if (!existsSync(join(OUT, local))) fail(`og:image file not found: ${local}`);
    }
    if (twitter !== "summary_large_image") fail("missing twitter:card summary_large_image");
  } else if (!/noindex/.test(html)) {
    fail("404 page should be noindex");
  }

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      if (data["@context"] !== "https://schema.org") fail("JSON-LD missing @context");
    } catch {
      fail("JSON-LD is not valid JSON");
    }
  }
}

// feed and sitemap
const feed = existsSync(join(OUT, "feed.xml")) ? readFileSync(join(OUT, "feed.xml"), "utf8") : "";
if (!feed) problems.push("feed.xml is missing");
else {
  const items = (feed.match(/<item>/g) || []).length;
  if (items < 1) problems.push("feed.xml has no items");
  if (!/<rss version="2.0"/.test(feed)) problems.push("feed.xml is not RSS 2.0");
  for (const m of feed.matchAll(/<link>([^<]+)<\/link>/g)) {
    const p = new URL(m[1]).pathname;
    if (p !== "/writing/" && !existsSync(join(OUT, p, "index.html"))) problems.push(`feed links to a missing page: ${p}`);
  }
  notes.push(`feed.xml: ${items} items`);
}
const sitemap = existsSync(join(OUT, "sitemap.xml")) ? readFileSync(join(OUT, "sitemap.xml"), "utf8") : "";
if (!sitemap) problems.push("sitemap.xml is missing");
else {
  for (const p of urlPaths) if (!sitemap.includes(`${p}</loc>`)) problems.push(`sitemap.xml is missing ${p}`);
  notes.push(`sitemap.xml lists ${(sitemap.match(/<url>/g) || []).length} URLs`);
}
// robots.txt: the owner's policy is that answer bots are welcome and training bots are not.
const robots = existsSync(join(OUT, "robots.txt")) ? readFileSync(join(OUT, "robots.txt"), "utf8") : "";
if (!robots) problems.push("robots.txt is missing");
else {
  if (!/User-Agent: \*\s*\nAllow: \//i.test(robots)) problems.push("robots.txt no longer allows everyone by default");
  for (const bot of ["GPTBot", "ClaudeBot", "CCBot", "Google-Extended"]) {
    if (!new RegExp(`User-Agent: ${bot}`, "i").test(robots)) problems.push(`robots.txt does not block the training bot ${bot}`);
  }
  for (const bot of ["OAI-SearchBot", "PerplexityBot", "ChatGPT-User", "Googlebot", "Bingbot"]) {
    if (new RegExp(`User-Agent: ${bot}[\\s\\S]*?Disallow: /`, "i").test(robots)) problems.push(`robots.txt must not block ${bot}`);
  }
  if (!/Sitemap: https:\/\/ipswitch\.co\.ke\/sitemap\.xml/.test(robots)) problems.push("robots.txt does not point to the sitemap");
}
// llms.txt and the IndexNow key file
const llms = existsSync(join(OUT, "llms.txt")) ? readFileSync(join(OUT, "llms.txt"), "utf8") : "";
if (!llms.startsWith("# ")) problems.push("llms.txt is missing or does not start with a title");
else notes.push(`llms.txt: ${(llms.match(/\]\(https:/g) || []).length} links`);
const indexNowKey = (readFileSync("scripts/indexnow.mjs", "utf8").match(/const KEY = "([0-9a-f]{32})"/) || [])[1];
if (!indexNowKey || !existsSync(join(OUT, `${indexNowKey}.txt`)) || readFileSync(join(OUT, `${indexNowKey}.txt`), "utf8").trim() !== indexNowKey)
  problems.push("IndexNow key file is missing or does not match scripts/indexnow.mjs");
// Every article must carry its short answer, and the About page its FAQ.
for (const f of pages) {
  const r = relative(OUT, f).replace(/\\/g, "/");
  const h = readFileSync(f, "utf8");
  if (/^writing\/[^/]+\/index\.html$/.test(r) && !h.includes("Short answer")) problems.push(`${r}: no short-answer block`);
  if (r === "about/index.html" && !/"@type":"FAQPage"/.test(h)) problems.push("about/index.html: no FAQPage structured data");
}

notes.unshift(`${pages.filter((f) => !relative(OUT, f).startsWith("_next")).length} pages checked`);
console.log(notes.join(" · "));
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n- ` + problems.join("\n- "));
  process.exit(1);
}
console.log("SEO checks passed.");
