import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/SiteChrome";
import { BY_SLUG, PROJECTS } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = BY_SLUG[slug];
  if (!p) return {};
  return { title: p.name, description: `${p.name}: ${p.tagline}` };
}

const CAP_VAR: Record<string, string> = { P: "--violet", W: "--turquoise", C: "--yellow" };

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const p = BY_SLUG[slug];
  if (!p) notFound();

  return (
    <>
      <Header />
      <main className="wrap plate-page">
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
