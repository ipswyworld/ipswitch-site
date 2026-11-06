import { POSTS } from "@/lib/posts";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const rfc822 = (isoDate: string) => new Date(`${isoDate}T09:00:00Z`).toUTCString();

export function GET() {
  const items = POSTS.map((p) => {
    const url = `${SITE_URL}/writing/${p.slug}/`;
    return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${esc(p.dek)}</description>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ipswitch: field notes</title>
    <link>${SITE_URL}/writing/</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Field notes from live deployments: what broke, why, and the fix. By Ipswitch, software and DevOps, Nairobi.</description>
    <language>en</language>
    <lastBuildDate>${rfc822(POSTS[0].date)}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
