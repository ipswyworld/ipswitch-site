import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";

export const dynamic = "force-static";

const SITE_URL = process.env.SITE_URL ?? "https://ipswitch.co.ke";

const PAGES = ["/", "/writing/", "/writing/cpanel-python-selector-blank-500/", "/work-with-me/", "/cv/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((p) => ({ url: `${SITE_URL}${p}` })),
    ...PROJECTS.map((p) => ({ url: `${SITE_URL}/work/${p.slug}/` })),
  ];
}
