import type { Metadata } from "next";
import { POSTS } from "./posts";
import { pageMeta } from "./seo";

/** Search and sharing metadata for one article, read from the single list of posts. */
export function postMeta(slug: string): Metadata {
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta({
    title: p.seoTitle ?? p.title,
    absoluteTitle: Boolean(p.seoTitle),
    description: p.dek,
    path: `/writing/${p.slug}/`,
    image: `/og/post-${p.slug}.png`,
    type: "article",
    publishedTime: p.date,
  });
}
