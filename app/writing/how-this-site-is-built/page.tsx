import Link from "@/components/SiteLink";
import { ArticleShell } from "@/components/ArticleShell";
import { postMeta } from "@/lib/postMeta";

export const metadata = postMeta("how-this-site-is-built");

export default function Page() {
  return (
    <ArticleShell
      slug="how-this-site-is-built"
      title="How this site is built"
      dek="A byte of levers in a static export, a splash gate in the page head, and three things that broke on the way."
      foot={
        <>
          The numbers above were measured on the build at the time of writing. The same constraint-first thinking
          is behind <Link href="/writing/fitting-nextjs-in-500mb/">the 500 MB cPanel deployment</Link>.
        </>
      }
    >
      <h2>A static export, on purpose</h2>
      <p>
        The site is Next.js 16 with <code>output: &quot;export&quot;</code>: plain files, no server at runtime. That one decision
        means the same folder deploys unchanged to GitHub Pages, a cPanel account or Cloudflare Pages, which matters
        when the host is not settled. The build is about 2.6 MB across 126 files, including a CV PDF, screenshots and a
        share image for every page.
      </p>

      <h2>The frame is a byte</h2>
      <p>
        1PSW1TCH has eight letters, so eight levers make one byte. The state is eight bits in one React context. The
        value is the sum of the place values (128, 64 … 1) of the bits that are set, and 44 is <code>00101100</code>:
        the same number the name adds up to on the Pythagorean letter table. The &ldquo;set the byte&rdquo; box uses that
        same letter table for names, in one function, so the site and the logo cannot disagree.
      </p>
      <p>
        The levers are real <code>&lt;button&gt;</code> elements with <code>aria-pressed</code>, so they work from the
        keyboard and announce their state. Each arm pivots with a CSS transition on an exponential ease-out. For visitors
        who ask for reduced motion, the byte simply starts at 44 and nothing animates.
      </p>

      <h2>Shareable by design</h2>
      <p>
        Once someone touches a lever, the address bar updates to <code>?byte=00101100</code>. Open that link and the
        frame starts at that number, skipping the intro. It is a link to a state, not just a page.
      </p>

      <h2>The splash, decided before the page paints</h2>
      <p>
        The splash is two 1s that open up into 1PSW1TCH, about two seconds, pure CSS. Whether it plays is decided by a
        few lines of script in the page head, before first paint: home page only, once per session, never for a shared
        <code> ?byte=</code> link, never with reduced motion. Doing it in the head means there is no flash of the page
        before the splash covers it, and no JavaScript is needed for it to end.
      </p>

      <h2>Still static, still honest about the live parts</h2>
      <p>
        Live status is the one feature that could easily lie. So it is a scheduled GitHub Action that requests
        Chama Cha Mimi na Wewe&rsquo;s health endpoint, writes the result and its timestamp into a file, and rebuilds the
        site. The page shows &ldquo;checked 2 hours ago&rdquo;, never an uptime percentage, because a single check cannot
        prove one.
      </p>

      <h2>Three things that broke</h2>
      <ul className="how">
        <li>
          <strong>Logo outlines.</strong> I converted the typeface to vector outlines with opentype.js. Generating the
          outlines at certain sizes produced silently broken shapes twice: half of a letter C, then a whole line of
          text that never drew. Generating once at a fixed size and scaling the result fixed both. Every logo asset now
          follows that rule.
        </li>
        <li>
          <strong>A headless-browser screenshot.</strong> The first phone screenshot of a project was cropped on the
          right because the headless browser has a minimum window width. I captured it from real device emulation
          instead and discarded the bad one.
        </li>
        <li>
          <strong>Root-relative paths.</strong> Assets are referenced from the root of the domain, so the site works at
          <code> ipswitch.co.ke</code> but would not work in a sub-folder like <code>github.io/ipswitch-site/</code>.
          That was a deliberate trade, and it is why the custom domain has to be live before the site can be seen.
        </li>
      </ul>

      <h2>The point</h2>
      <p>
        The site is built to demonstrate the thing it claims: small, checkable, and honest about what is live, what is
        pre-launch and what is only a testnet.
      </p>
    </ArticleShell>
  );
}
