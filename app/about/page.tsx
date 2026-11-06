import Link from "@/components/SiteLink";
import { JsonLd } from "@/components/JsonLd";
import { Footer, Header } from "@/components/SiteChrome";
import { FAQ } from "@/lib/faq";
import { PERSON_NAME, SAME_AS, SITE_URL, pageMeta, personNode } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Ipswitch",
  description:
    "Ipswitch (1PSW1TCH) is Joseph Njoroge Kariuki, a software and DevOps engineer in Nairobi. Who he is, what he has built, and answers to common questions.",
  path: "/about/",
  image: "/og/about.png",
});

const FACTS: [string, string][] = [
  ["Name", PERSON_NAME],
  ["Known as", "Ipswitch, written 1PSW1TCH"],
  ["Role", "Software and DevOps engineer"],
  ["Based in", "Nairobi, Kenya"],
  ["Focus", "Payments reliability, CI/CD, operations tooling, full-stack builds"],
  ["Builds", "Chama Cha Mimi na Wewe (live), RentPin (pre-launch), Ouroboros Network (testnet)"],
  ["Writes", "Field notes from live deployments"],
];

export default function About() {
  const url = `${SITE_URL}/about/`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfilePage",
              "@id": `${url}#profile`,
              url,
              name: `About ${PERSON_NAME} (Ipswitch)`,
              inLanguage: "en",
              mainEntity: personNode(),
            },
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Ipswitch", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "About", item: url },
              ],
            },
          ],
        }}
      />
      <Header />
      <main id="main" className="wrap plate-page">
        <Link className="back" href="/">
          ← Back to the frame
        </Link>
        <h1 className="page-h1">About Ipswitch</h1>
        <p className="tagline">
          Ipswitch (1PSW1TCH) is {PERSON_NAME}, a software and DevOps engineer in Nairobi, Kenya, who builds, ships and
          runs whole systems, often inside hard limits.
        </p>

        <table className="facts">
          <tbody>
            {FACTS.map(([k, v]) => (
              <tr key={k}>
                <th>{k}</th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="links-inline">
          Elsewhere:{" "}
          {SAME_AS.map((href, i) => (
            <span key={href}>
              {i > 0 && " · "}
              <a href={href} rel="noopener me">
                {href.replace("https://", "").replace("www.", "").replace(/\/$/, "")}
              </a>
            </span>
          ))}
        </p>

        <h2 className="plate-h2">Questions people ask</h2>
        <dl className="faq">
          {FAQ.map((f) => (
            <div key={f.q}>
              <dt>{f.q}</dt>
              <dd>
                {f.a}
                {f.link && (
                  <>
                    {" "}
                    <Link href={f.link.href}>{f.link.label}</Link>.
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="note-block">
          Everything here is drawn from the projects&rsquo; own documentation and the CV. Where something is not live or not
          confirmed, it says so.
        </p>
      </main>
      <Footer />
    </>
  );
}
