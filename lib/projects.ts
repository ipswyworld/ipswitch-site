// Every fact here comes from the project's own repo docs or the owner's CV.
// Nothing is estimated. Where something is unconfirmed, it says so.

export type Project = {
  slug: string;
  letter: "P" | "W" | "C";
  name: string;
  tagline: string;
  status: string;
  role: string;
  stack: string;
  host: string;
  limit: string;
  summary: string;
  how: string[];
  honest: string[];
  links: { label: string; href: string }[];
  shots?: { src: string; alt: string; w: number; h: number; caption: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "rentpin",
    letter: "P",
    name: "RentPin",
    tagline: "Nairobi rentals where the vacancy count is true today.",
    status: "Pre-launch. Runs locally and is covered by tests; not yet deployed.",
    role: "Sole builder",
    stack:
      "FastAPI · Expo / React Native (renter and caretaker apps from one codebase) · Alembic · pytest",
    host: "Not deployed yet",
    limit:
      "No Firebase: alerts reach a closed app by SMS, with per-number cooldowns and a daily cap",
    summary:
      "A caretaker-verified housing marketplace. Caretakers keep live vacancy counts for the buildings they look after, so a renter sees what is actually free today, books a viewing in a few taps, pays a small viewing fee, and shows a QR pass at the gate.",
    how: [
      "Live counts: a caretaker taps a count up or down as homes are taken or freed. It works offline and syncs later.",
      "Trust is computed, not typed: a caretaker's status (active now, updated today, quiet for a while) comes from what they actually did.",
      "A viewing end to end: book, confirm, pay the viewing fee by M-Pesa prompt, get a QR pass, check in at the gate, pay out the caretaker's share.",
      "The fee reaches the caretaker only after check-in. Cancelling, or nobody checking in before the pass expires, refunds the renter in full.",
      "Address and phone number stay hidden until the caretaker confirms and the fee is settled. Renters and caretakers message without ever seeing each other's number.",
      "English and Kiswahili throughout, enforced by a test that fails when an English string has no Kiswahili one.",
    ],
    honest: [
      "Pre-launch. Production settings, scheduled payouts, data-protection compliance and a deploy story are still on the list of known gaps.",
      "The Kiswahili is a first draft for a native speaker to check.",
    ],
    links: [],
  },
  {
    slug: "ouroboros-network",
    letter: "W",
    name: "Ouroboros Network",
    tagline: "A tiered blockchain: heavy nodes in Rust, light nodes on anything.",
    status: "Testnet.",
    role: "Sole builder",
    stack: "Rust heavy nodes · Python medium and light nodes · BFT consensus",
    host: "Release binaries for Linux, macOS and Windows",
    limit: "Three tiers by hardware: light nodes run on any modern device",
    summary:
      "A blockchain split into three node tiers so that more people can take part. Heavy nodes run consensus and settle finality. Medium nodes aggregate subchains. Light nodes run apps and watch for fraud.",
    how: [
      "Heavy nodes (Rust): BFT consensus and global finality, on 8+ cores, 16 GB RAM and a 1 TB SSD.",
      "Medium nodes (Python): subchain aggregation and batch ordering, on 4+ cores, 8 GB RAM and a 500 GB SSD.",
      "Light nodes (Python): app microchains and anchor verification, on any modern device.",
      "One start command per role, with release binaries for Linux, macOS (Intel and Apple Silicon) and Windows.",
    ],
    honest: [
      "This is a testnet, not a live mainnet.",
      "The repository's own README makes broader claims about the network. They are not repeated here until they are confirmed as built and working.",
    ],
    links: [{ label: "Ouroboros on GitHub", href: "https://github.com/ouroboros-network" }],
  },
  {
    slug: "chama-cha-mimi-na-wewe",
    letter: "C",
    name: "Chama Cha Mimi na Wewe",
    tagline: "A party's whole public platform, inside 500 MB.",
    status: "Live.",
    role: "Sole builder",
    stack: "Next.js (App Router, TypeScript) · FastAPI · SQLite",
    host: "Safaricom Cloud cPanel · chamachamiminawewe.co.ke",
    limit: "500 MB disk, 1 GB RAM, 1 CPU core",
    summary:
      "The public website and admin content platform for a Kenyan political party. Part civic newsroom (policy documents, governance reporting), part public participation forum (idea submission, issue reporting, manifesto crowdsourcing, polls, membership).",
    how: [
      "A normal npm install on the server would not fit in 500 MB, so the frontend is built off-server into Next's standalone output: about 37 MB (9 MB compressed).",
      "The backend is about 53 KB plus a roughly 60 MB Python virtualenv, which leaves around 380 MB for the database and every uploaded image.",
      "The database and uploads live outside the app directory, so redeploying the app never touches them.",
      "SITE_URL is set at build time, because robots.txt, canonical URLs and Open Graph tags on prerendered pages are baked in during the build.",
      "Two silent cPanel Python-selector bugs are documented with their fixes: a missing PassengerAppType wsgi in public_html/api/.htaccess, and passenger_wsgi.py overwritten with a stub that loads itself forever. Both surface as the same blank 500.",
    ],
    honest: [
      "SQLite is the right choice on this plan because there is no PostgreSQL and the filesystem is persistent. It is a constraint-driven decision, not a general recommendation.",
    ],
    links: [{ label: "chamachamiminawewe.co.ke", href: "https://chamachamiminawewe.co.ke" }],
    shots: [
      {
        src: "/work/ccmw-desktop.png",
        alt: "The Chama Cha Mimi na Wewe home page on desktop: a deep blue hero with four pillars and a membership call to action.",
        w: 1440,
        h: 900,
        caption: "Home page, desktop. Captured from the live site.",
      },
      {
        src: "/work/ccmw-mobile.jpg",
        alt: "The same home page on a phone.",
        w: 750,
        h: 1624,
        caption: "Home page, phone. Captured from the live site.",
      },
    ],
  },
];

export const BY_SLUG = Object.fromEntries(PROJECTS.map((p) => [p.slug, p])) as Record<string, Project>;
