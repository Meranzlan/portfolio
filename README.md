# imran.ikko.space

My portfolio: a single page built with Vue 3, Vite and TypeScript, dressed in the dark theme of FitXP, an app I'm building.

## Run it

```bash
npm install
npm run dev
```

## Change what it says

Everything on the page comes from [`src/content.ts`](src/content.ts).

- **Your photo:** put it in `public/images/` and set `profile.portrait.src`, e.g. `'/images/portrait.webp'`.
  It sits inside the big wavy ring at the top, cropped to a soft pebble.
- **App screenshots:** set `src` on each entry in a project's `screens`. Phone captures are portrait (about 9:20, like FitXP's 412 × 915),
  browser captures landscape (16:10).
- **Photos and achievements:** fill `src` and `alt` in `photos`, add entries to `achievements`.
- **A new project:** copy an entry in `projects`. `size: 'feature'` gets a full-width panel.

Anything without a `src` shows a labelled placeholder.

FitXP's screens in `public/images/fitxp/` are the app's dark golden test images (`test/goldens/` in the app repo),
saved as WebP. Re-export them when the app's look changes.

## Deploy

Pushing to `main` builds the site and uploads it to Hostinger (see `.github/workflows/deploy.yml`).
