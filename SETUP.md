# Setup notes

The site is a static Next.js export. Two features stay switched off until you give them a value,
so nothing is ever shown that does not work.

## Contact form (Web3Forms)

1. Go to https://web3forms.com, enter the email address that should receive messages, and copy the access key.
   The key is designed to be public.
2. In the GitHub repo: Settings > Secrets and variables > Actions > **Variables** > New repository variable.
   Name: `WEB3FORMS_KEY`. Value: the key.
3. Re-run the "Deploy to GitHub Pages" workflow. The form appears under the contact tiles.

Locally: `NEXT_PUBLIC_WEB3FORMS_KEY=your-key npm run build`.

## Analytics (GoatCounter: no cookies, no consent banner)

1. Create a free account at https://www.goatcounter.com. The "code" is the part before `.goatcounter.com`.
2. Add a repository variable named `GOATCOUNTER_CODE` with that code, then re-run the workflow.

Visitors with Do Not Track switched on are not counted.

## Live status

`scripts/check-status.mjs` requests each live project's health endpoint and writes `public/status.json`.
The scheduled workflow runs it every three hours before building. To add a project, add it to `CHECKS` in that
script. The page only ever shows the last result and its age, never an uptime figure.

## Deploying

`npm run build` writes the finished site to `out/`. Pushing to `main` deploys it to GitHub Pages.

## Search and RSS

- Every page's title, description, canonical URL and share image come from `lib/seo.ts` (`pageMeta`).
  Article details live in `lib/posts.ts`, which also drives the writing index, the sitemap and the RSS feed.
- Share images are in `public/og/`. They are generated from the brand type; regenerate them when a title changes.
- `/feed.xml` is the RSS feed. Add a post by adding an entry to `lib/posts.ts` and a page under `app/writing/`.
- `npm run verify` (run after `npm run build`) checks every built page for a title, description, canonical URL,
  share image, one heading and valid structured data, plus the feed and sitemap. The deploy workflow runs it
  and refuses to publish if it fails.
- Structured data names the site owner by full name, with "Ipswitch" and "1PSW1TCH" as alternate names.
  Change `PERSON_NAME` and `PERSON_ALT` in `lib/seo.ts` to alter it everywhere at once.
