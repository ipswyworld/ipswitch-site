import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "The cPanel Python selector leaves your app broken in two silent ways",
  description:
    "Creating a Python app in cPanel leaves it returning a blank 500. The cause is two things the selector gets wrong. Both fixes, and how to see the real error.",
};

export default function Article() {
  return (
    <>
      <Header />
      <main className="wrap plate-page">
        <Link className="back" href="/writing/">
          ← All writing
        </Link>

        <article className="prose">
          <h1 className="page-h1">The cPanel Python selector leaves your app broken in two silent ways</h1>
          <p className="tagline">
            Both produce the same message: <code>500 — Web application could not be started</code>. Neither tells you why.
          </p>

          <p>
            I deploy a Next.js frontend and a FastAPI backend on a Safaricom Cloud cPanel account: 1 GB RAM, 1 CPU core
            and a 500 MB disk. The frontend runs under Passenger as a Node app. The backend runs under the same
            Passenger as a Python app, mounted at <code>/api</code> through cPanel&rsquo;s <em>Setup Python App</em>.
          </p>
          <p>
            Creating that Python app leaves it broken. The selector does two things wrong, and the error page you get
            is identical for both. Here is each one, and what fixes it.
          </p>

          <h2>1. The selector forgets to say what kind of app it is</h2>
          <p>
            Setting up the app writes <code>PassengerAppRoot</code>, <code>PassengerBaseURI</code> and{" "}
            <code>PassengerPython</code> into <code>public_html/api/.htaccess</code>. It does not write{" "}
            <code>PassengerAppType</code> or <code>PassengerStartupFile</code>.
          </p>
          <p>
            Apache therefore inherits those two settings from the <code>.htaccess</code> one level up, the
            frontend&rsquo;s, which says <code>PassengerAppType node</code> and <code>PassengerStartupFile server.js</code>.
            Passenger then tries to start your Python backend as a Node app.
          </p>
          <p>Append these two lines to the backend&rsquo;s <code>.htaccess</code>:</p>
          <pre>
            <code>{`PassengerAppType wsgi
PassengerStartupFile passenger_wsgi.py`}</code>
          </pre>
          <p>
            The value is <code>wsgi</code>, not <code>python</code>. <code>python</code> is not a valid Passenger app
            type. It is silently ignored, which leaves the inherited <code>node</code> in place and looks exactly like
            the fix did nothing.
          </p>

          <h2>2. The selector overwrites your entry file with a stub that loads itself</h2>
          <p>
            After you create the app, check <code>passenger_wsgi.py</code>. The selector replaces it with its own
            placeholder, which contains this line:
          </p>
          <pre>
            <code>{`wsgi = imp.load_source('wsgi', 'passenger_wsgi.py')   # loads itself, forever`}</code>
          </pre>
          <p>
            It imports the file it is already running. Restore your real <code>passenger_wsgi.py</code> over it, then
            touch <code>tmp/restart.txt</code> in the app root so Passenger reloads.
          </p>

          <h2>How to tell it is working</h2>
          <p>
            Put a health route on the backend and call it through the public URL. Mine is{" "}
            <code>/api/health</code>, which returns <code>{`{"status":"ok"}`}</code>. If that comes back, both fixes
            took.
          </p>

          <h2>How to see the real error</h2>
          <p>
            The 500 page itself tells you nothing. In the Python app&rsquo;s settings, set <strong>Passenger log file</strong>{" "}
            to a path in your home directory, such as <code>/home/&lt;user&gt;/logs/passenger.log</code>. The actual
            startup failure is written there.
          </p>

          <h2>One more trap</h2>
          <p>
            <em>Run Pip Install</em> is greyed out until a requirements file is registered. In{" "}
            <em>Detected configuration files</em>, type <code>requirements.txt</code> into the &ldquo;Add another file
            and press enter&rdquo; box first, then it enables.
          </p>

          <h2>Why this is worth writing down</h2>
          <p>
            Two unrelated faults with identical symptoms is the worst case for debugging: fixing one changes nothing
            you can see, so you assume it did not work and undo it. Treat a blank 500 on a fresh cPanel Python app as
            two suspects, check both, and read the Passenger log before touching anything else.
          </p>
          <p className="prose-foot">
            Written from the deployment notes of{" "}
            <Link href="/work/chama-cha-mimi-na-wewe/">Chama Cha Mimi na Wewe</Link>, which runs on exactly this setup.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
