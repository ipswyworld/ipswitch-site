import { jsonLd } from "@/lib/seo";

/** Structured data for search engines. Rendered on the server, so it is in the static HTML. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />;
}
