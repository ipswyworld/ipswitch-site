import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/posts";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const PAGES = ["/", "/about/", "/writing/", "/work-with-me/", "/cv/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = POSTS[0].date;
  return [
    ...PAGES.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: latest })),
    ...PROJECTS.map((p) => ({ url: `${SITE_URL}/work/${p.slug}/`, lastModified: latest })),
    ...POSTS.map((p) => ({ url: `${SITE_URL}/writing/${p.slug}/`, lastModified: p.date })),
  ];
}
