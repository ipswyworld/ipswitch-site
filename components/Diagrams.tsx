// Architecture diagrams, one per project. Every box is taken from that project's own docs:
// CPANEL.md (Chama Cha Mimi na Wewe), README.md and docs/OPERATIONS.md (RentPin), README.md (Ouroboros).

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines?: string[];
  tone?: "plain" | "violet" | "turq" | "yellow" | "dim";
};

function Box({ x, y, w, h, title, lines = [], tone = "plain" }: BoxProps) {
  return (
    <g className={`dg-box ${tone}`}>
      <rect x={x} y={y} width={w} height={h} rx={5} />
      <text x={x + 14} y={y + 26} className="dg-title">
        {title}
      </text>
      {lines.map((l, i) => (
        <text key={l} x={x + 14} y={y + 48 + i * 18} className="dg-line">
          {l}
        </text>
      ))}
    </g>
  );
}

function Arrow({ d, label, lx, ly }: { d: string; label?: string; lx?: number; ly?: number }) {
  return (
    <g>
      <path d={d} className="dg-arrow" markerEnd="url(#dg-head)" />
      {label && (
        <text x={lx} y={ly} className="dg-note">
          {label}
        </text>
      )}
    </g>
  );
}

function Defs() {
  return (
    <defs>
      <marker id="dg-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" className="dg-headfill" />
      </marker>
    </defs>
  );
}

export function CcmwDiagram() {
  return (
    <figure className="diagram">
      <svg
        viewBox="0 0 760 360"
        role="img"
        aria-label="Deployment of Chama Cha Mimi na Wewe. A browser reaches Passenger on one cPanel account. Passenger runs a Node app serving Next.js at the root and a Python app serving FastAPI at /api. Both live in their own folders. The database and uploads live in a third folder outside both."
      >
        <Defs />
        <Box x={20} y={120} w={130} h={80} title="Browser" lines={["a visitor or", "an admin"]} tone="dim" />
        <rect x={190} y={20} width={550} height={320} rx={8} className="dg-frame" />
        <text x={206} y={46} className="dg-frametitle">
          Safaricom Cloud cPanel · 1 GB RAM · 1 CPU · 500 MB disk
        </text>
        <Box x={210} y={66} w={510} h={54} title="Passenger" lines={["serves both apps; kept out of public_html"]} tone="dim" />
        <Box x={210} y={150} w={240} h={96} title="Node app, served at /" lines={["Next.js standalone", "about 37 MB (9 MB compressed)"]} tone="violet" />
        <Box x={480} y={150} w={240} h={96} title="Python app, served at /api" lines={["FastAPI (WSGI entry file)", "about 53 KB + 60 MB virtualenv"]} tone="turq" />
        <Box x={210} y={272} w={510} h={54} title="ccmw-data, outside both apps" lines={["SQLite database + uploads · about 380 MB left · a redeploy never touches it"]} tone="yellow" />
        <Arrow d="M150 160 L210 100" />
        <Arrow d="M330 120 L330 150" />
        <Arrow d="M600 120 L600 150" />
        <Arrow d="M450 198 L480 198" label="/api" lx={452} ly={188} />
        <Arrow d="M600 246 L600 272" />
      </svg>
      <figcaption>
        Both apps run under one Passenger. The database and uploads sit in a third folder so redeploying either app
        cannot overwrite them. From the project&rsquo;s deployment notes.
      </figcaption>
    </figure>
  );
}

export function RentpinDiagram() {
  return (
    <figure className="diagram">
      <svg
        viewBox="0 0 760 400"
        role="img"
        aria-label="Architecture of RentPin. A renter app and a caretaker app, built from one Expo codebase, and a web admin console all talk to one FastAPI service. It uses a SQLite or PostgreSQL database managed with Alembic migrations. It calls M-Pesa for viewing fees, payouts and refunds, and an SMS provider for alerts and sign-in codes. There is no Firebase."
      >
        <Defs />
        <Box x={20} y={20} w={220} h={78} title="Renter app" lines={["Expo / React Native", "variant: tenant"]} tone="violet" />
        <Box x={270} y={20} w={220} h={78} title="Caretaker app" lines={["same codebase", "variant: caretaker"]} tone="turq" />
        <Box x={520} y={20} w={220} h={78} title="Admin console" lines={["one web page", "served at /admin"]} tone="dim" />
        <Box x={20} y={160} w={470} h={90} title="FastAPI service" lines={["listings, live counts, viewings, payments, messaging, alerts, CRM"]} tone="yellow" />
        <Box x={20} y={300} w={470} h={78} title="Database" lines={["SQLite in development, PostgreSQL in production", "Alembic migrations on both"]} tone="plain" />
        <Box x={520} y={150} w={220} h={100} title="M-Pesa" lines={["viewing fee (STK push)", "payouts and refunds (B2C)"]} tone="dim" />
        <Box x={520} y={280} w={220} h={100} title="SMS provider" lines={["alerts to a closed app", "sign-in codes", "capped, 12 a day per number"]} tone="dim" />
        <Arrow d="M130 98 L130 160" />
        <Arrow d="M380 98 L380 160" />
        <Arrow d="M630 98 C630 130 500 130 450 160" />
        <Arrow d="M255 250 L255 300" />
        <Arrow d="M490 205 L520 205" />
        <Arrow d="M490 235 C510 270 510 310 520 320" />
      </svg>
      <figcaption>
        No Firebase: there is no push to a closed app. Reminders are scheduled on the phone, and the important alerts
        go out by capped SMS. RentPin is pre-launch. From the repository&rsquo;s README and operations notes.
      </figcaption>
    </figure>
  );
}

export function OuroborosDiagram() {
  return (
    <figure className="diagram">
      <svg
        viewBox="0 0 760 360"
        role="img"
        aria-label="The three node tiers of the Ouroboros Network. Heavy nodes, written in Rust, run consensus and global finality. Medium nodes, in Python, aggregate subchains and order batches. Light nodes, in Python, run app microchains, verify anchors and watch for fraud."
      >
        <Defs />
        <Box x={170} y={20} w={420} h={90} title="Heavy nodes · Rust" lines={["BFT consensus, global finality, fraud adjudication", "8+ cores · 16 GB RAM · 1 TB SSD"]} tone="yellow" />
        <Box x={110} y={140} w={540} h={90} title="Medium nodes · Python" lines={["subchain aggregation, batch ordering, shadow consensus", "4+ cores · 8 GB RAM · 500 GB SSD"]} tone="turq" />
        <Box x={50} y={260} w={660} h={84} title="Light nodes · Python" lines={["app microchains, anchor verification, fraud bounties", "any modern device"]} tone="violet" />
        <Arrow d="M380 140 L380 110" />
        <Arrow d="M380 260 L380 230" />
      </svg>
      <figcaption>
        Three tiers by hardware, so more people can take part. This is a testnet. The tier roles and hardware figures
        are from the repository&rsquo;s README.
      </figcaption>
    </figure>
  );
}

export const DIAGRAMS: Record<string, () => React.JSX.Element> = {
  "chama-cha-mimi-na-wewe": CcmwDiagram,
  rentpin: RentpinDiagram,
  "ouroboros-network": OuroborosDiagram,
};
