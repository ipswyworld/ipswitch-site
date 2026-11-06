import Link from "@/components/SiteLink";
import { POSTS } from "@/lib/posts";
import { PERSON_ALT, PERSON_NAME, SITE_URL } from "@/lib/seo";
import { JsonLd } from "./JsonLd";
import { Footer, Header } from "./SiteChrome";

export function ArticleShell({
  slug,
  title,
  dek,
  children,
  foot,
}: {
  slug: string;
  title: string;
  dek: string;
  children: React.ReactNode;
  foot?: React.ReactNode;
}) {
  const post = POSTS.find((p) => p.slug === slug);
  const url = `${SITE_URL}/writing/${slug}/`;
  const author = { "@type": "Person", name: PERSON_NAME, alternateName: PERSON_ALT, url: `${SITE_URL}/` };
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline: title,
              description: dek,
              url,
              mainEntityOfPage: url,
              image: `${SITE_URL}/og/post-${slug}.png`,
              inLanguage: "en",
              ...(post ? { datePublished: post.date } : {}),
              author,
              publisher: author,
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Ipswitch", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Writing", item: `${SITE_URL}/writing/` },
                { "@type": "ListItem", position: 3, name: title, item: url },
              ],
            },
          ],
        }}
      />
      <Header />
      <main id="main" className="wrap plate-page">
        <Link className="back" href="/writing/">
          ← All writing
        </Link>
        <article className="prose">
          <h1 className="page-h1">{title}</h1>
          <p className="tagline">{dek}</p>
          {post && (
            <p className="byline">
              <time dateTime={post.date}>
                {new Date(`${post.date}T00:00:00Z`).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </time>{" "}
              · Ipswitch
            </p>
          )}
          {children}
          {foot && <p className="prose-foot">{foot}</p>}
        </article>
      </main>
      <Footer />
    </>
  );
}
