import type { Metadata } from "next";

export const SITE_URL = process.env.SITE_URL ?? "https://ipswitch.co.ke";
export const DEFAULT_OG = "/og/default.png";

/** The site owner in structured data: the full name, with the brand as alternate names. */
export const PERSON_NAME = "Joseph Njoroge Kariuki";
export const PERSON_ALT = ["Ipswitch", "1PSW1TCH"];

/** Links that identify the same person elsewhere, used in structured data. */
export const SAME_AS = [
  "https://github.com/ipswyworld",
  "https://github.com/ouroboros-network",
  "https://www.linkedin.com/in/joseph-njoroge-kariuki-5027591ab/",
];

type Args = {
  title: string; // shown in the tab and search results (the site name is appended)
  description: string; // keep to about 150 characters
  path: string; // canonical path, with trailing slash, e.g. "/cv/"
  image?: string; // path under /og/
  type?: "website" | "article";
  absoluteTitle?: boolean; // do not append the site name
  publishedTime?: string;
};

/** One place that builds every page's search and sharing metadata, so no page forgets a field. */
export function pageMeta({ title, description, path, image = DEFAULT_OG, type = "website", absoluteTitle, publishedTime }: Args): Metadata {
  const shown = absoluteTitle ? title : `${title} · Ipswitch`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path, types: { "application/rss+xml": "/feed.xml" } },
    openGraph: {
      type,
      title: shown,
      description,
      url: path,
      siteName: "Ipswitch",
      images: [{ url: image, width: 1200, height: 630, alt: `${title}: Ipswitch, software and DevOps, Nairobi` }],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: shown, description, images: [image] },
  };
}

/** Shortens text to at most n characters at a word boundary, for meta descriptions. */
export function clip(s: string, n = 155): string {
  const one = s.replace(/\s+/g, " ").trim();
  if (one.length <= n) return one;
  const cut = one.slice(0, n - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[.,;:]+$/, "") + "…";
}

/** Escapes "<" so structured data can never close the script tag it sits in. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
