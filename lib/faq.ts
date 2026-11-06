// Questions people (and answer engines) actually ask, answered from facts already verified on this site.
// The same list renders the visible Q&A on the About page and its FAQPage structured data.
// `a` is plain text, so it can be used in both places unchanged.

export type Faq = { q: string; a: string; link?: { href: string; label: string } };

export const FAQ: Faq[] = [
  {
    q: "Who is Ipswitch?",
    a: "Ipswitch, written 1PSW1TCH, is the working name of Joseph Njoroge Kariuki, a software and DevOps engineer in Nairobi, Kenya. He builds, ships and runs whole systems, often inside hard limits.",
  },
  {
    q: "What does he work on?",
    a: "According to his CV, his client and contract work since 2022 covers payments and payout reliability (idempotent payouts and reconciliation), CI/CD pipeline hardening, operations tooling for non-engineers, and backend and full-stack builds in Python and TypeScript.",
    link: { href: "/cv/", label: "Read the CV" },
  },
  {
    q: "What has he built himself?",
    a: "Three platforms, all as the sole builder: Chama Cha Mimi na Wewe, a Kenyan party's civic platform that is live; RentPin, a caretaker-verified rentals marketplace for Nairobi that is pre-launch; and the Ouroboros Network, a tiered blockchain that runs on a testnet.",
    link: { href: "/#work", label: "See the three projects" },
  },
  {
    q: "Is RentPin live?",
    a: "No. RentPin is pre-launch. It runs locally and is covered by tests, but production settings, scheduled payouts, data-protection compliance and a deploy story are still on its list of known gaps.",
    link: { href: "/work/rentpin/", label: "RentPin in detail" },
  },
  {
    q: "How did Chama Cha Mimi na Wewe fit on a 500 MB host?",
    a: "The Next.js frontend is built off the server into Next's standalone output, about 37 MB, and only that is uploaded. The backend is about 53 KB plus a roughly 60 MB Python virtualenv, and the database and uploads live in a separate folder, which leaves around 380 MB of the 500 MB quota free.",
    link: { href: "/writing/fitting-nextjs-in-500mb/", label: "Read how it was done" },
  },
  {
    q: "What does 1PSW1TCH mean?",
    a: "It has eight letters, so eight levers make one byte. The name adds up to 44 on the Pythagorean letter table (I9 P7 S1 W5 I9 T2 C3 H8), and 44 in binary is 00101100. The two 1s stand for the letter I and also mean on.",
    link: { href: "/", label: "Flip the levers" },
  },
  {
    q: "Where is he based?",
    a: "Nairobi, Kenya.",
  },
  {
    q: "How can I work with him?",
    a: "Tell him the problem and the constraint (the budget, the host, the deadline, the team that will run it afterwards). Rates are not published; ask. You can reach him by email at njorojoe19@gmail.com, on WhatsApp or through LinkedIn (links in the contact section of the home page).",
    link: { href: "/work-with-me/", label: "What he takes on" },
  },
];
