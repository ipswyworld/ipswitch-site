import Link from "next/link";
import { Footer, Header } from "./SiteChrome";

export function ArticleShell({
  title,
  dek,
  children,
  foot,
}: {
  title: string;
  dek: string;
  children: React.ReactNode;
  foot?: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="wrap plate-page">
        <Link className="back" href="/writing/">
          ← All writing
        </Link>
        <article className="prose">
          <h1 className="page-h1">{title}</h1>
          <p className="tagline">{dek}</p>
          {children}
          {foot && <p className="prose-foot">{foot}</p>}
        </article>
      </main>
      <Footer />
    </>
  );
}
