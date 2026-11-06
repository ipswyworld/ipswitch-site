import { BY_SLUG } from "./projects";

// Eight levers, eight plates, in lever order: I P S W I T C H.
// Coloured levers (P, W, C) are the flagship projects; silver levers are the rest of the site.
// Every fact comes from the repo docs or the owner's CV.

export type Plate = {
  label: string; // short name shown on the lever's plate heading
  title: string;
  note: string;
  rows: { label: string; value: string }[];
  href: string;
  cta: string;
};

function project(slug: string, index: number): Plate {
  const p = BY_SLUG[slug];
  return {
    label: p.name,
    title: p.name,
    note: `Lever ${index + 1} · ${p.letter} · back of the plate`,
    rows: [
      { label: "Status", value: p.status },
      { label: "Role", value: p.role },
      { label: "Stack", value: p.stack },
      { label: "Host", value: p.host },
      { label: "Limit", value: p.limit },
    ],
    href: `/work/${p.slug}/`,
    cta: "Open the full plate",
  };
}

export const PLATES: Plate[] = [
  {
    label: "Identity",
    title: "Identity",
    note: "Lever 1 · I · back of the plate",
    rows: [
      { label: "Based", value: "Nairobi, Kenya" },
      { label: "Focus", value: "Payments reliability · DevOps · full-stack builds" },
      { label: "Path", value: "County IT, then contract engineering, then freelance senior engineer" },
      { label: "Education", value: "BSc Computer Science, St. Paul's University" },
    ],
    href: "/#story",
    cta: "Read the story",
  },
  project("rentpin", 1),
  {
    label: "Stack",
    title: "Stack",
    note: "Lever 3 · S · back of the plate",
    rows: [
      { label: "Languages", value: "Python · TypeScript · JavaScript · Node.js · Rust (blockchain)" },
      { label: "Backend", value: "REST · GraphQL · background workers · RabbitMQ · AWS Lambda" },
      { label: "Data", value: "PostgreSQL · MySQL · Redis · SQLite · MongoDB" },
      { label: "Infra", value: "AWS · Docker · GitHub Actions / GitLab CI · Prometheus / Grafana" },
    ],
    href: "/cv/#skills",
    cta: "See the full skills list",
  },
  project("ouroboros-network", 3),
  {
    label: "Ink",
    title: "Ink",
    note: "Lever 5 · I · back of the plate",
    rows: [
      { label: "Latest", value: "The two cPanel bugs that return a blank 500" },
      { label: "Format", value: "Field notes from live deployments" },
      { label: "Next", value: "More as they are earned" },
    ],
    href: "/writing/",
    cta: "Read the writing",
  },
  {
    label: "Terms",
    title: "Terms",
    note: "Lever 6 · T · back of the plate",
    rows: [
      { label: "Takes on", value: "Payout reliability · CI/CD hardening · ops tooling · backend builds" },
      { label: "Start with", value: "The problem and the constraint" },
      { label: "Rates", value: "Not published. Ask." },
    ],
    href: "/work-with-me/",
    cta: "See how to work together",
  },
  project("chama-cha-mimi-na-wewe", 6),
  {
    label: "Hard copy",
    title: "Hard copy",
    note: "Lever 8 · H · back of the plate",
    rows: [
      { label: "Format", value: "PDF, updated November 2026" },
      { label: "Contains", value: "Experience, skills, education, selected projects" },
      { label: "Leaves out", value: "Phone number and referees" },
    ],
    href: "/cv/",
    cta: "Open the CV",
  },
];
