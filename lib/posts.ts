// Newest first. The writing index, the sitemap, the RSS feed and the Ink plate all read from this list.
// `date` is the day the piece was first published (all four went up together).
export type Post = { slug: string; title: string; dek: string; date: string; seoTitle?: string };

export const POSTS: Post[] = [
  {
    slug: "how-this-site-is-built",
    title: "How this site is built",
    dek: "A byte of levers in a static export, a splash gate in the page head, and three things that broke on the way.",
    date: "2026-11-06",
  },
  {
    slug: "fitting-nextjs-in-500mb",
    title: "Fitting a Next.js app into a 500 MB cPanel quota",
    dek: "Build off the server, ship only what runs, and keep the data where a redeploy cannot touch it.",
    date: "2026-11-06",
  },
  {
    slug: "alerts-by-sms-no-firebase",
    title: "Alerts without Firebase: SMS with a budget",
    dek: "How RentPin reaches a closed app with capped text messages instead of push notifications.",
    date: "2026-11-06",
  },
  {
    slug: "cpanel-python-selector-blank-500",
    title: "The cPanel Python selector leaves your app broken in two silent ways",
    dek: "Both produce the same blank 500, and neither is in the docs. Here is how to tell them apart and fix them.",
    date: "2026-11-06",
    // The page title for search results, kept under about 60 characters.
    seoTitle: "cPanel Python selector: two silent causes of a blank 500",
  },
];
