// Tells Bing (and other IndexNow search engines) which URLs exist or changed, so they are crawled quickly.
// Bing's index also feeds ChatGPT search and Copilot. The key is not a secret: it must be public,
// and the search engine checks it by fetching the matching file from the site root.
// Run after a deploy (the workflow does). A failure here never fails the deploy.
const HOST = "ipswitch.co.ke";
const KEY = "3fcbd1535838d2ceb085aba26c193148"; // matches public/3fcbd1535838d2ceb085aba26c193148.txt
const BASE = `https://${HOST}`;

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) {
  console.error("No URLs found in the sitemap; nothing to submit.");
  process.exit(1);
}

// The key file has to be live, or the submission will be rejected.
const keyCheck = await fetch(`${BASE}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error(`Key file ${BASE}/${KEY}.txt is not live yet.`);
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs, response ${res.status} ${res.statusText}`);
// 200 = accepted, 202 = accepted and key validation pending. Anything else is worth a look.
if (![200, 202].includes(res.status)) process.exit(1);
