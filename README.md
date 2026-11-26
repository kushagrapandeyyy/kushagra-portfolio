# Kushagra Pandey — Engineering Portfolio

A single-page Next.js portfolio covering engineering outcomes, technical domains, system illustrations, and anonymous professional experience.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run build` to verify the production build.

Set `PORTFOLIO_URL` at build time to the primary public origin (for example, `https://example.com`). On Vercel, the build falls back to `VERCEL_PROJECT_PRODUCTION_URL` when no explicit origin is set. The canonical URL, social metadata, structured data and sitemap use the same origin. Local builds without a configured origin omit the canonical URL and sitemap.

## Edit content

- `lib/data.ts` contains the verified outcomes, skills, experience, and engineering stages.
- `app/page.tsx` defines the one-page section order.
- `components/` contains navigation, the hero, systems illustrations, and scroll effects.
- `app/globals.css` defines the visual system and responsive layouts.

Keep experience descriptions anonymous and represent each metric with its original context.
