# Kushagra Pandey — Portfolio

A dark, immersive, static-first portfolio built with Next.js, TypeScript, CSS and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Before deploying

1. Update `metadataBase` in `app/layout.tsx` from `https://example.com` to your actual custom domain.
2. Add your resume PDF as `public/resume.pdf` and add a download link in the hero or navigation.
3. Verify the HideTheBall deployment URL. The current link points to the existing KillTheKing deployment.
4. Add approved screenshots and architecture diagrams for DTPS, HerFlo and your AI Agent.
5. Review all project descriptions and metrics for accuracy and confirm which work can be publicly disclosed.
6. Add a `public/favicon.ico` or your own favicon assets.

## Deploy to Vercel

1. Create a new GitHub repository, for example `kushagra-portfolio`.
2. Push this project to the repository.
3. Import the repository into Vercel.
4. Keep the framework preset as Next.js and deploy.
5. Add your custom domain in Vercel → Project → Settings → Domains.
6. Configure the DNS records shown by Vercel at your domain registrar.
7. Update `metadataBase` to the final HTTPS domain and redeploy.

No environment variables or database are required for the initial version.

## Structure

- `app/page.tsx` — portfolio homepage
- `app/projects/[slug]/page.tsx` — project case studies
- `components/` — navigation, reveal animations and project cards
- `lib/data.ts` — editable project content
- `app/globals.css` — visual system and responsive styles

## Content notes

Project descriptions are intentionally conservative where full implementation details, screenshots or public URLs have not yet been supplied. Add only verifiable metrics and details you are allowed to disclose.
