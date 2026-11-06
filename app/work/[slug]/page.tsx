import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/SiteLink";
import { notFound } from "next/navigation";
import { DIAGRAMS } from "@/components/Diagrams";
import { JsonLd } from "@/components/JsonLd";
import { LiveStatus } from "@/components/LiveStatus";
import { Footer, Header } from "@/components/SiteChrome";
import { BY_SLUG, PROJECTS } from "@/lib/projects";
import { PERSON_ALT, PERSON_NAME, SITE_URL, clip, pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = BY_SLUG[slug];
  if (!p) return {};
  return pageMeta({
    title: p.name,
    description: clip(`${p.tagline} ${p.summary}`),
    path: `/work/${p.slug}/`,
    image: `/og/project-${p.slug}.png`,
  });
}

const CAP_VAR: Record<string, string> = { P: "--violet", W: "--turquoise", C: "--yellow" };

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const p = BY_SLUG[slug];
  if (!p) notFound();
  const Diagram = DIAGRAMS[p.slug];

  const url = `${SITE_URL}/work/${p.slug}/`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CreativeWork",
              name: p.name,
              description: p.summary,
              url,
              image: `${SITE_URL}/og/project-${p.slug}.png`,
              creator: { "@type": "Person", name: PERSON_NAME, alternateName: PERSON_ALT, url: `${SITE_URL}/` },
              inLanguage: "en",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Ipswitch", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: p.name, item: url },
              ],
            },
          ],
        }}
      />
      <Header />
      <main id="main" className="wrap plate-page">
        <Link className="back" href="/#work">
          ← Back to the frame
        </Link>

        <div className="plate-head">
          <span className="plate-cap" style={{ background: `var(${CAP_VAR[p.letter]})` }} aria-hidden="true">
            {p.letter}
          </span>
          <div>
            <h1>{p.name}</h1>
            <p className="tagline">{p.tagline}</p>
          </div>
        </div>

        <p className="plate-summary">{p.summary}</p>

        <table className="facts">
          <tbody>
            <tr>
              <th>Status</th>
              <td>{p.status}</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>{p.role}</td>
            </tr>
            <tr>
              <th>Stack</th>
              <td>{p.stack}</td>
            </tr>
            <tr>
              <th>Host</th>
              <td>{p.host}</td>
            </tr>
            <tr>
              <th>Limit</th>
              <td>{p.limit}</td>
            </tr>
          </tbody>
        </table>

        {p.shots && p.shots.length > 0 && (
          <>
            <h2 className="plate-h2">The live product</h2>
            <div className="shots">
              {p.shots.map((s) => (
                <figure key={s.src}>
                  <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="(max-width: 700px) 100vw, 60vw" />
                  <figcaption>{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </>
        )}

        <LiveStatus slug={p.slug} />

        {Diagram && (
          <>
            <h2 className="plate-h2">The shape of it</h2>
            <Diagram />
          </>
        )}

        <h2 className="plate-h2">How it works</h2>
        <ul className="how">
          {p.how.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <h2 className="plate-h2">What is not claimed</h2>
        <ul className="how">
          {p.honest.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        {p.links.length > 0 && (
          <ul className="links">
            {p.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} rel="noopener">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
