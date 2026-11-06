import { ByteProvider } from "@/components/ByteProvider";
import { DiskBar } from "@/components/DiskBar";
import { LeverFrame } from "@/components/LeverFrame";
import { PlatePanel } from "@/components/PlatePanel";
import { Readout } from "@/components/Readout";
import { Footer, Header } from "@/components/SiteChrome";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <h1 className="sr">Ipswitch: software and DevOps engineer, Nairobi</h1>
        <ByteProvider>
          <LeverFrame />

          <section className="band">
            <div className="wrap lower">
              <div>
                <p className="headline">
                  One engineer. The <em>whole line.</em>
                </p>
                <p className="lede">
                  I build it, ship it, and keep it running, often inside limits that would stop a bigger team.
                  Software and DevOps, from Nairobi.
                </p>
                <a className="cta" href="#contact">
                  Open a line
                </a>
              </div>
              <Readout />
            </div>
          </section>

          <div className="wrap">
            <PlatePanel />
          </div>
        </ByteProvider>

        <div className="wrap">
          <section className="proof" id="proof">
            <h2>500 MB. One server. Live.</h2>
            <p className="proof-lede">
              A Kenyan party&rsquo;s public site, admin console and uploads, all inside a 500 MB cPanel quota. A
              normal <code>npm install</code> on the server would not fit, so the frontend is built off-server and
              only what it uses ships.
            </p>
            <DiskBar />
            <p className="proof-note">
              The part nobody writes down: the cPanel Python selector leaves the app broken in two silent ways. It
              omits <code>PassengerAppType wsgi</code> from <code>public_html/api/.htaccess</code>, so Apache
              inherits the frontend&rsquo;s Node settings, and it overwrites <code>passenger_wsgi.py</code> with a
              stub that loads itself forever. Both show up as the same blank 500. Both are now documented with the
              fix.
            </p>
          </section>

          <section className="method" id="story">
            <h2>Where it started</h2>
            <p className="note">Dates and roles as listed on my CV.</p>
            <dl>
              <div>
                <dt>2018 – 2020</dt>
                <dd>
                  Data analyst and IT officer at Nairobi City County Government. Network infrastructure, Hadoop-backed
                  datasets, and first-line support for county staff.
                </dd>
              </div>
              <div>
                <dt>2020 – 2022</dt>
                <dd>
                  Contract frontend and systems engineer. Dashboards and offline-tolerant apps for field teams on
                  unstable networks, with idempotent actions so state stays recoverable.
                </dd>
              </div>
              <div>
                <dt>2022 – now</dt>
                <dd>
                  Freelance senior engineer: payments, reliability, CI/CD and ops tooling for clients, and my own
                  platforms alongside: Chama Cha Mimi na Wewe (live), RentPin (pre-launch) and Ouroboros Network
                  (testnet).
                </dd>
              </div>
            </dl>
          </section>

          <section className="method" id="method">
            <h2>How it is built</h2>
            <p className="note">From client and contract engagements, 2022 to now, as described in my CV.</p>
            <dl>
              <div>
                <dt>Idempotent by default</dt>
                <dd>
                  Payout jobs that are safe to replay: no duplicate disbursements, with a full audit trail across
                  providers.
                </dd>
              </div>
              <div>
                <dt>Reconcile, don&rsquo;t trust</dt>
                <dd>
                  Workers that match provider callbacks against the internal ledger and hand operations an
                  audit-ready CSV.
                </dd>
              </div>
              <div>
                <dt>Readable when it breaks</dt>
                <dd>
                  Structured logs, per-batch metrics and runbooks, so an incident takes minutes to diagnose and not
                  hours.
                </dd>
              </div>
            </dl>
            <p className="position">A limit is a spec, not an apology.</p>
          </section>

          <section className="contact" id="contact">
            <h2>Open a line</h2>
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
                <a href="https://github.com/ipswyworld" rel="noopener">
                  GitHub · ipswyworld
                </a>
              </li>
              <li>
                <a href="https://github.com/ouroboros-network" rel="noopener">
                  GitHub · ouroboros-network
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/joseph-njoroge-kariuki-5027591ab/" rel="noopener">
                  LinkedIn · Joseph Njoroge Kariuki
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
