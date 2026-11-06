import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Work with me",
  description: "What I take on, and the quickest way to start: tell me the problem and the constraint.",
};

const WORK = [
  {
    t: "Payments and payout reliability",
    d: "Idempotent job execution so a replay never pays twice, reconciliation workers that match provider callbacks to your ledger, and an audit trail operations can read.",
  },
  {
    t: "Pipelines and deployment hardening",
    d: "CI/CD with automated tests, linting and vulnerability scanning, and staged deploys (canary or blue-green) so a bad release is small and reversible.",
  },
  {
    t: "Ops tooling for non-engineers",
    d: "Admin screens, CSV-based workflows and runbooks so an operations team can run safe manual interventions without calling engineering.",
  },
  {
    t: "Backend and full-stack builds",
    d: "Python and TypeScript services and web apps, built to be easy to understand when they break, not just when they work.",
  },
];

export default function WorkWithMe() {
  return (
    <>
      <Header />
      <main className="wrap plate-page">
        <Link className="back" href="/#work">
          ← Back to the frame
        </Link>
        <h1 className="page-h1">Terms</h1>
        <p className="tagline">What I take on, and how to start.</p>

        <h2 className="plate-h2">What I take on</h2>
        <dl className="terms">
          {WORK.map((w) => (
            <div key={w.t}>
              <dt>{w.t}</dt>
              <dd>{w.d}</dd>
            </div>
          ))}
        </dl>
        <p className="note-block">
          This comes from my client and contract engagements since 2022, as described on my CV. It is a description of
          the work, not a guarantee of results.
        </p>

        <h2 className="plate-h2">How to start</h2>
        <p className="prose-p">
          Tell me the problem and the constraint: the budget, the host, the deadline, the team that will run it
          afterwards. Hard limits are a feature, not a deal-breaker. I have shipped a live platform inside a 500 MB
          disk quota.
        </p>
        <p className="prose-p">I do not publish rates. Ask, and I will answer plainly.</p>

        <ul className="links">
          <li>
            <a href="mailto:njorojoe19@gmail.com">Email · njorojoe19@gmail.com</a>
          </li>
          <li>
            <a href="https://wa.me/254727617217" rel="noopener">
              WhatsApp · +254 727 617 217
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/joseph-njoroge-kariuki-5027591ab/" rel="noopener">
              LinkedIn · Joseph Njoroge Kariuki
            </a>
          </li>
        </ul>
      </main>
      <Footer />
    </>
  );
}
