import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Field notes from live deployments: what broke, why, and the fix.",
};

export default function WritingIndex() {
  return (
    <>
      <Header />
      <main className="wrap plate-page">
        <Link className="back" href="/#work">
          ← Back to the frame
        </Link>
        <h1 className="page-h1">Ink</h1>
        <p className="tagline">Field notes from live deployments: what broke, why, and the fix.</p>
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
