import Link from "@/components/SiteLink";
import { Footer, Header } from "@/components/SiteChrome";
import { POSTS } from "@/lib/posts";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Writing",
  description: "Field notes from live deployments: what broke, why, and the fix. Subscribe by RSS.",
  path: "/writing/",
  image: "/og/writing.png",
});

export default function WritingIndex() {
  return (
    <>
      <Header />
      <main id="main" className="wrap plate-page">
        <Link className="back" href="/#work">
          ← Back to the frame
        </Link>
        <h1 className="page-h1">Ink</h1>
        <p className="tagline">Field notes from live deployments: what broke, why, and the fix.</p>
        <p className="note-block">
          <a href="/feed.xml">Subscribe by RSS</a>
        </p>
        <ul className="post-list">
          {POSTS.map((p) => (
            <li key={p.slug}>
              <Link href={`/writing/${p.slug}/`}>
                <span className="post-title">{p.title}</span>
                <span className="post-dek">{p.dek}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
