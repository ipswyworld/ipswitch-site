import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";

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
          <li>
            <Link href="/writing/cpanel-python-selector-blank-500/">
              <span className="post-title">The cPanel Python selector leaves your app broken in two silent ways</span>
              <span className="post-dek">
                Both produce the same blank 500, and neither is in the docs. Here is how to tell them apart and fix them.
              </span>
            </Link>
          </li>
        </ul>
      </main>
      <Footer />
    </>
  );
}
