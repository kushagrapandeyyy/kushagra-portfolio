# Kushagra Pandey — Engineering Portfolio

A single-page Next.js portfolio covering engineering outcomes, technical domains, system illustrations, and anonymous professional experience.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run build` to verify the production build.

For a custom deployment, set the optional `PORTFOLIO_URL` environment variable to the public site origin to set the canonical URL and social metadata base.

## Edit content

- `lib/data.ts` contains the verified outcomes, skills, experience, and engineering stages.
- `app/page.tsx` defines the one-page section order.
- `components/` contains navigation, the hero, systems illustrations, and scroll effects.
- `app/globals.css` defines the visual system and responsive layouts.

Keep experience descriptions anonymous and represent each metric with its original context.
