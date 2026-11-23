# imran.ikko.space

My portfolio: a single page built with Vue 3, Vite and TypeScript, in an editorial, paper-and-ink style.

## Run it

```bash
npm install
npm run dev
```

## Change what it says

Everything on the page comes from [`src/content.ts`](src/content.ts).

- **Photo:** `public/images/portrait.webp`, a square crop.
- **App screenshots:** add `{ src, alt }` entries to a project's `screens`. Phone captures, portrait, saved as WebP
  at 540 px wide (the JAKIM Touch ones are 540 × 1212). A project with no screens shows a text-only card.
- **Other work:** plain entries in `otherWork`, no pictures.

## Deploy

Pushing to `main` builds the site and uploads it to Hostinger (see `.github/workflows/deploy.yml`).
