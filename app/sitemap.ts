import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";

export const dynamic = "force-static";

const SITE_URL = process.env.SITE_URL ?? "https://ipswitch.co.ke";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/` },
    ...PROJECTS.map((p) => ({ url: `${SITE_URL}/work/${p.slug}/` })),
  ];
}
