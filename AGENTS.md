# Portfolio (imran.ikko.space) · Agent Index

Imran Azlan's personal portfolio: one static page, Vue 3 + Vite + TypeScript. Canonical entry point for every
agent. Product truth is in `PRODUCT.md`; the visual system is in `DESIGN.md`; the page's design contract is in
`.impeccable/surfaces/src-app-vue.md`. Read those, not this file, for design detail.

## Commands

```bash
npm run dev         # http://localhost:5173 (or the port Vite prints)
npm run build       # vue-tsc type-check + production build to dist/
npm run type-check  # vue-tsc only
```

## Rules

1. **Content lives in `src/content.ts`.** Adding a project, photo, screenshot or achievement means editing that file
   (images go in `public/images/`). Components only lay content out.
2. **Never invent claims.** No download counts, ratings, launch dates, awards or testimonials that the owner has not
   given. MyTax (LHDN) stays off the site until it launches. → `PRODUCT.md`
3. **FitXP dark world** (owner, 2026-11-11). The site wears FitXP's dark theme and design language: night-navy page
   with contour lines, soft outlines drawn by `SoftShape.vue` (no hard boxes, no stock-looking controls), pale blue
   only for the one call to action and progress, the app's place colours one per section, Koma as the companion,
   and the corner dial as navigation. Not a copy of Ikko's Fenrishion look. Dark only.
4. **Tokens only.** Colours, type, spacing and radii come from `src/styles/tokens.css`, which mirrors FitXP's
   `lib/shared/design/tokens.dart` (dark). If the app's dark colours change, change them here too.
5. **Learning project.** The owner is a Flutter developer learning Vue: conventional, readable code with a short
   *why* comment where a Vue concept first appears.
6. **No new dependencies** without flagging first.

## Deploy

Push to `main` runs `.github/workflows/deploy.yml`: build, then rsync `dist/` to
`~/domains/ikko.space/public_html/imran/` on the Hostinger account that also hosts Ikko. Secrets:
`HOSTINGER_HOST`, `HOSTINGER_SSH_PORT`, `HOSTINGER_USERNAME`, `HOSTINGER_SSH_PRIVATE_KEY`.

* **Pushing to `main` deploys.** Commit and push only when the owner asks.
* The folder sits inside Ikko's `public_html/`. Ikko's `deploy-vue.yml` rsyncs that folder with `--delete` and must
  keep `--exclude='/imran/'`, or the next Ikko deploy deletes this site.
* `public/.htaccess` turns mod_rewrite on for this folder, so Ikko's SPA fallback one level up does not apply here,
  and redirects `ikko.space/imran/` to the subdomain.

## Verify

`npm run build`, then check the page at desktop (1440) and phone (390) widths, with the corner dial open and shut.
