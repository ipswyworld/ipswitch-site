import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// Policy chosen by the owner: answer and search bots may read and cite the site; bots that collect
// data to train models are asked to stay out. This is a request, not enforcement, and the list is not
// exhaustive. Blocking "Google-Extended" does not affect normal Google Search.
const TRAINING_BOTS = [
  "GPTBot", // OpenAI model training
  "ClaudeBot", // Anthropic model training
  "anthropic-ai",
  "Google-Extended", // Gemini training control, separate from Search
  "CCBot", // Common Crawl, a common source of training data
  "Applebot-Extended", // Apple AI training control
  "Meta-ExternalAgent", // Meta model training
  "Bytespider", // ByteDance
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Everyone else, including Googlebot, Bingbot and answer/search bots such as
      // OAI-SearchBot, ChatGPT-User, PerplexityBot and Claude-SearchBot: welcome.
      { userAgent: "*", allow: "/" },
      { userAgent: TRAINING_BOTS, disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
