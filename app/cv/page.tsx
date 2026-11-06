import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "CV",
  description: "Joseph Njoroge Kariuki: software and DevOps engineer, Nairobi. Experience, skills, education.",
};

// Content comes from the owner's CV. The phone number and referees are deliberately left out.
const SKILLS: [string, string][] = [
  ["Languages", "Python, JavaScript, TypeScript, Node.js, Ruby on Rails, Rust (blockchain), PHP, Go (familiar), .NET"],
  ["Backend", "REST APIs, GraphQL, microservices, serverless (AWS Lambda), background workers, RabbitMQ"],
  ["Datastores", "PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch, Apache Hadoop"],
  ["Cloud & infra", "AWS (EC2, Lambda, RDS, S3, CloudFront), Docker, CI/CD (GitHub Actions / GitLab CI), IaC basics"],
  ["Testing", "Unit and integration testing, TDD, automated E2E (Cypress), testable architecture"],
  ["Reliability", "Prometheus / Grafana, structured logging, alerting, SLOs, incident postmortems"],
  ["Security", "OWASP-aware design, secrets management, credential storage, input validation and hardening"],
];

const JOBS = [
  {
    role: "Senior Engineer, Freelance & Contractor",
    where: "Remote",
    when: "2022 – Present",
    lead:
      "Lead engineer across fintech, payments orchestration and blockchain tooling engagements, working directly with product managers and operations teams to build systems around field constraints.",
    points: [
      "Designed payout orchestration with idempotent job execution: safe replays, no duplicate disbursements, a full audit trail across provider integrations.",
      "Implemented reconciliation workers that compare provider callbacks against internal ledger entries and produce audit-ready CSV reports.",
      "Built and hardened CI/CD pipelines with automated testing, linting, vulnerability scanning and staged deployments (canary / blue-green).",
      "Set up structured logging and monitoring dashboards so engineers could diagnose incidents in minutes rather than hours.",
      "Built lightweight admin tools and CSV workflows so non-technical teams could manage payment batches and run safe manual interventions.",
    ],
  },
  {
    role: "Frontend & Systems Engineer, Contract Engagements",
    where: "Nairobi / Remote",
    when: "2020 – 2022",
    lead:
      "Production-grade frontends and backend services focused on accessibility, resilience under unstable network conditions, and operational tooling for distributed field teams.",
    points: [
      "Built SPAs and admin dashboards integrating securely with backend microservices and role-based access control.",
      "Implemented offline/queuing strategies and idempotent action patterns for unstable networks, keeping state transitions recoverable.",
      "Delivered automated test suites in PR workflows that reduced regression rates and improved deployment confidence.",
    ],
  },
  {
    role: "Data Analyst / IT Officer",
    where: "Nairobi City County Government, IT Department",
    when: "2018 – 2020",
    lead: "Government data systems, network infrastructure and digital operations across county departments.",
    points: [
      "Managed network infrastructure: troubleshooting, software updates and health monitoring across county offices.",
      "Supported database operations using Apache Hadoop to handle large datasets on city government servers.",
      "Handled data entry, validation and reporting for county administrative and planning functions.",
    ],
  },
];

export default function CV() {
  return (
    <>
      <Header />
      <main className="wrap plate-page cv">
        <div className="cv-actions">
          <Link className="back" href="/#work">
            ← Back to the frame
          </Link>
          <a className="plate-link" href="/Joseph-Kariuki-CV.pdf" download>
            Download PDF
          </a>
        </div>

        <h1 className="page-h1">Joseph Njoroge Kariuki</h1>
        <p className="tagline">Software and DevOps engineer · Nairobi, Kenya</p>
        <p className="cv-contact">
          njorojoe19@gmail.com · github.com/ipswyworld · linkedin.com/in/joseph-njoroge-kariuki-5027591ab
        </p>

        <h2 className="plate-h2">Summary</h2>
        <p className="prose-p">
          Backend and full-stack engineer focused on fintech and payments, specifically the reliability-critical parts:
          payout orchestration, reconciliation, idempotency, and the tooling that lets operations teams manage their own
          workflows without engineering support. I care about systems that are easy to understand when they break, not
          just when they are working.
        </p>

        <h2 className="plate-h2" id="skills">
          Skills
        </h2>
        <dl className="skills">
          {SKILLS.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <h2 className="plate-h2">Experience</h2>
        {JOBS.map((j) => (
          <section className="job" key={j.role}>
            <div className="job-head">
              <h3>{j.role}</h3>
              <span className="job-when">{j.when}</span>
            </div>
            <p className="job-where">{j.where}</p>
            <p className="prose-p">{j.lead}</p>
            <ul className="how">
              {j.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>
        ))}

        <h2 className="plate-h2">Own platforms</h2>
        <ul className="how">
          <li>
            <Link href="/work/chama-cha-mimi-na-wewe/">Chama Cha Mimi na Wewe</Link>: a Kenyan party&rsquo;s live civic platform, Next.js
            and FastAPI inside a 500 MB cPanel quota.
          </li>
          <li>
            <Link href="/work/rentpin/">RentPin</Link>: caretaker-verified Nairobi rentals, FastAPI and Expo, pre-launch.
          </li>
          <li>
            <Link href="/work/ouroboros-network/">Ouroboros Network</Link>: a tiered blockchain, Rust and Python, on testnet.
          </li>
        </ul>

        <h2 className="plate-h2">Education and training</h2>
        <ul className="how">
          <li>BSc Computer Science, St. Paul&rsquo;s University, Nairobi Campus</li>
          <li>Diploma in Computer Science (Credit), St. Paul&rsquo;s University, Nairobi Campus</li>
          <li>Certificate in Computer Science, St. Paul&rsquo;s University, Nairobi Campus</li>
          <li>IBM Introduction to Artificial Intelligence; IBM AI Fundamentals (IBM SkillsBuild)</li>
          <li>AWS Fundamentals / Cloud Practitioner: in progress</li>
        </ul>
        <p className="note-block">References available on request.</p>
      </main>
      <Footer />
    </>
  );
}
