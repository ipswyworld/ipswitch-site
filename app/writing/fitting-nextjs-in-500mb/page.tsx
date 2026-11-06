import Link from "@/components/SiteLink";
import { ArticleShell } from "@/components/ArticleShell";
import { postMeta } from "@/lib/postMeta";

export const metadata = postMeta("fitting-nextjs-in-500mb");

export default function Page() {
  return (
    <ArticleShell
      slug="fitting-nextjs-in-500mb"
      title="Fitting a Next.js app into a 500 MB cPanel quota"
      dek="Build off the server, ship only what runs, and keep the data where a redeploy cannot touch it."
      foot={
        <>
          Written from the deployment notes of <Link href="/work/chama-cha-mimi-na-wewe/">Chama Cha Mimi na Wewe</Link>.
          The two Python-selector faults it mentions have their own write-up:{" "}
          <Link href="/writing/cpanel-python-selector-blank-500/">the cPanel Python selector leaves your app broken in two silent ways</Link>.
        </>
      }
    >
      <p>
        The hosting account is a Safaricom Cloud cPanel Bronze package: 1 GB of RAM, one CPU core, a <strong>500 MB</strong> disk
        and 20 entry processes. Node 24 and Python 3.11 are available through cPanel&rsquo;s app selectors. The database
        is SQLite, because the plan has no PostgreSQL and the filesystem is persistent.
      </p>
      <p>
        The 500 MB is the binding constraint, and it is shared by the app, the database and every uploaded image. A
        normal <code>npm install</code> on the server would not fit. This project&rsquo;s <code>node_modules</code> alone
        exceeds the quota.
      </p>

      <h2>Build somewhere else</h2>
      <p>
        So the frontend is built off the server, on my machine, into Next&rsquo;s standalone output, which bundles only
        the modules the app actually uses. One command produces both bundles:
      </p>
      <pre tabIndex={0} aria-label="The build command">
        <code>{`SITE_URL=https://chamachamiminawewe.co.ke ./scripts/build-cpanel.sh`}</code>
      </pre>
      <p>The script runs the Next build, then assembles what the server needs and nothing else:</p>
      <ul className="how">
        <li>The standalone server from <code>.next/standalone</code>.</li>
        <li><code>.next/static</code> and <code>public/</code>, copied in explicitly, because the standalone server does not include them.</li>
        <li>The backend: the FastAPI app, its WSGI entry file and a trimmed requirements file.</li>
        <li>Two tar archives, ready for cPanel&rsquo;s File Manager.</li>
      </ul>

      <h2>The numbers</h2>
      <p>
        The frontend bundle is about 37 MB (9 MB compressed). The backend is about 53 KB plus a roughly 60 MB Python
        virtualenv. That leaves around 380 MB for the database and uploads. Images, not data, are what will eat that
        space.
      </p>

      <h2>Why SITE_URL is set at build time</h2>
      <p>
        <code>robots.txt</code>, canonical URLs and the Open Graph tags on prerendered pages are generated during the
        build. Change the domain later and the pages are wrong until you rebuild.
      </p>

      <h2>Where things live on the server</h2>
      <ul className="how">
        <li>The frontend and backend each sit in their own folder in the home directory, <strong>not</strong> in <code>public_html</code>. Passenger serves them, and anything in <code>public_html</code> is directly downloadable.</li>
        <li>The database and uploads sit in a third folder, outside both apps, so a redeploy never touches them.</li>
        <li>Uploads are served same-origin under <code>/api</code>, which means no CORS and no internal hostname leaking into the page.</li>
      </ul>
      <p>
        Do not run <code>npm install</code> on the server. The bundle already contains everything it needs, and
        installing would blow the quota. To redeploy, extract the new archive over the frontend folder and restart the
        Node app.
      </p>

      <h2>What to watch on this plan</h2>
      <ul className="how">
        <li><strong>Disk.</strong> The real limit, and uploaded images are the growth risk.</li>
        <li><strong>Entry processes (20).</strong> A traffic spike can hit this ceiling and requests then queue or return 508. Worth monitoring during a campaign push.</li>
        <li><strong>SQLite write concurrency.</strong> Fine at this plan&rsquo;s traffic ceiling. If the site outgrows it, MySQL is available with its own separate quota of about 499 MB.</li>
      </ul>

      <h2>The point</h2>
      <p>
        A hard limit is a specification. Once the 500 MB is written down as a budget, with a line for each item, the
        design decisions mostly make themselves.
      </p>
    </ArticleShell>
  );
}
