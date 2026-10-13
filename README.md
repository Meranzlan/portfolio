# imran.ikko.space

My portfolio: a single page built with Vue 3, Vite and TypeScript, styled like Klang Valley rail signage.

## Run it

```bash
npm install
npm run dev
```

## Change what it says

Everything on the page comes from [`src/content.ts`](src/content.ts).

- **Your photo:** put it in `public/images/` and set `profile.portrait.src`, e.g. `'/images/portrait.webp'`.
  A cut-out (transparent background, just you) stands on the blue field; for a normal photo set `cutout: false`.
- **App screenshots:** set `src` on each entry in a project's `screens`. Phone captures are portrait (about 9:19.5),
  browser captures landscape (16:10).
- **Photos and achievements:** fill `src` and `alt` in `photos`, add entries to `achievements`.
- **A new project:** copy an entry in `projects`. `size: 'feature'` gets a full-width panel.

Anything without a `src` shows a labelled placeholder.

## Deploy

Pushing to `main` builds the site and uploads it to Hostinger (see `.github/workflows/deploy.yml`).
