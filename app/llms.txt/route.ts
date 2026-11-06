import { POSTS } from "@/lib/posts";
import { PROJECTS } from "@/lib/projects";
import { PERSON_NAME, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// A plain-text guide to the site for AI tools, following the llms.txt convention (https://llmstxt.org).
// It is a proposed convention, not a confirmed standard, so this is a cheap bet and nothing depends on it.
export function GET() {
  const lines = [
    "# Ipswitch (1PSW1TCH)",
    "",
    `> The portfolio of ${PERSON_NAME}, a software and DevOps engineer in Nairobi, Kenya. He builds, ships and runs whole systems, often inside hard limits: payments reliability, CI/CD, operations tooling and full-stack builds. Everything here is drawn from the projects' own documentation and his CV. Where something is not live or not confirmed, the page says so.`,
    "",
    "## About",
    `- [About Ipswitch](${SITE_URL}/about/): who he is, key facts, and answers to common questions`,
    `- [CV](${SITE_URL}/cv/): experience, skills and education (PDF: ${SITE_URL}/Joseph-Kariuki-CV.pdf)`,
    `- [Work with me](${SITE_URL}/work-with-me/): what he takes on and how to start`,
    "",
    "## Projects (he is the sole builder of each)",
    ...PROJECTS.map((p) => `- [${p.name}](${SITE_URL}/work/${p.slug}/): ${p.tagline} Status: ${p.status}`),
    "",
    "## Writing",
    ...POSTS.map((p) => `- [${p.title}](${SITE_URL}/writing/${p.slug}/): ${p.dek}`),
    "",
    "## Optional",
    `- [RSS feed](${SITE_URL}/feed.xml)`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
