// Newest first. The writing index, the sitemap, the RSS feed and the Ink plate all read from this list.
// `date` is the day the piece was first published (all four went up together).
// `summary` is the short answer shown at the top of the article and in its structured data: the
// conclusion in two sentences, so a reader or an answer engine does not have to dig for it.
export type Post = { slug: string; title: string; dek: string; date: string; summary: string; seoTitle?: string };

export const POSTS: Post[] = [
  {
    slug: "how-this-site-is-built",
    title: "How this site is built",
    dek: "A byte of levers in a static export, a splash gate in the page head, and three things that broke on the way.",
    date: "2026-11-06",
    summary:
      "It is a Next.js static export of about 2.6 MB in which eight levers are the eight bits of one byte, and 44 is the number the name adds up to. A scheduled GitHub Action stamps a real health check into the build, so the site stays static and never claims an uptime it cannot prove.",
  },
  {
    slug: "fitting-nextjs-in-500mb",
    title: "Fitting a Next.js app into a 500 MB cPanel quota",
    dek: "Build off the server, ship only what runs, and keep the data where a redeploy cannot touch it.",
    date: "2026-11-06",
    summary:
      "Build the frontend off the server into Next's standalone output (about 37 MB), upload only that, and keep the database and uploads in a folder outside both apps. That leaves roughly 380 MB of a 500 MB quota free.",
  },
  {
    slug: "alerts-by-sms-no-firebase",
    title: "Alerts without Firebase: SMS with a budget",
    dek: "How RentPin reaches a closed app with capped text messages instead of push notifications.",
    date: "2026-11-06",
    summary:
      "RentPin does not use Firebase push. It schedules reminders on the phone, checks for replies every 30 seconds while the app is open, and sends capped SMS for important alerts when the app is closed: a cooldown per alert and at most 12 texts a day per number.",
  },
  {
    slug: "cpanel-python-selector-blank-500",
    title: "The cPanel Python selector leaves your app broken in two silent ways",
    dek: "Both produce the same blank 500, and neither is in the docs. Here is how to tell them apart and fix them.",
    date: "2026-11-06",
    summary:
      "cPanel's Python app creator leaves two faults behind: it omits PassengerAppType wsgi from the app's .htaccess, so Apache inherits the frontend's Node settings, and it overwrites passenger_wsgi.py with a stub that loads itself. Add the two lines, restore your own file, restart, and read the Passenger log for the real error.",
    // The page title for search results, kept under about 60 characters.
    seoTitle: "cPanel Python selector: two silent causes of a blank 500",
  },
];
