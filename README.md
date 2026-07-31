# plurall landing page

Single-route static Next.js marketing site for **plurall**.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS
- PostHog analytics
- Formspree email capture
- Static export (`output: 'export'`)

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

The static site is exported to `dist/`. You can preview it with:

```bash
npx serve dist
```

## Deploy to Vercel

1. Push this repo to GitHub/GitLab.
2. Import the project in Vercel.
3. Set the environment variables from `.env.example` in the Vercel dashboard.
4. Deploy.

Or deploy the `dist/` folder manually from the Vercel CLI:

```bash
vercel --prod dist/
```

## Required environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Email capture endpoint |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host (default `https://us.i.posthog.com`) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for sitemap/OG |

## Analytics events

- `pageview` — fired on every route change, includes referrer and UTM params.
- `scroll_to_demo` — fired once when the demo slot is 50% visible.
- `demo_played` — fired when the demo lightbox opens.
- `demo_completed` — fired when the lightbox closes after 5+ seconds.
- `email_submitted` — fired on form submit, includes `location` (hero/closing) and success boolean.

## Notes

- Copy is verbatim from the build brief. Replace `[NAME]` with `plurall`.
- The hero H1 has an A/B variant at `/?v=2`.
- The demo slot is a screenshot-style mockup, not a video. A real screen recording can replace the mockup later.
- `robots.txt` allows all crawlers. Update the sitemap URL before deploying.
