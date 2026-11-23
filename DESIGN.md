---
name: Imran Azlan · Portfolio
description: Editorial Tactile Minimalism. High-end stationery with digital utility.
colors:
  light: { canvas: "#FAF8F5", surface: "#F2EFE9", ink: "#1E1E1C", ink-2: "#7A756D", accent: "#C86D51", accent-tint: "#F4E6E1", hairline: "#E5E0D8" }
  dark:  { canvas: "#121212", surface: "#1C1C1A", ink: "#E8E4DC", ink-2: "#9A948B", accent: "#D97D62", accent-tint: "rgba(217,125,98,0.14)", hairline: "#2A2A27" }
typography:
  serif: "Newsreader (variable, 500, with italic), tracking -0.02em: name, headings, italic section dividers"
  sans: "Inter (variable), 16.5px / 1.6: body"
  mono: "JetBrains Mono (variable), 12–13px: dates, companies, stacks, tags"
---

# Design: Editorial Tactile Minimalism

The owner's spec (2026-11-23). It replaces the FitXP dark look from 2026-11-11. Warm paper surfaces, hairline ink
borders, a classic editorial serif and monospace technical metadata. No drop shadows, no neon gradients, no
corporate SaaS clutter.

## Rules

- **Tokens** live in `src/styles/tokens.css`. Light is primary. Dark applies under `prefers-color-scheme: dark`
  unless the visitor picked a theme with the header toggle (`data-theme` on `<html>`, saved in `localStorage`;
  `index.html` applies it before paint).
- **Elevation is a hairline.** 1px solid `--hairline` separates sections and frames cards. Never a box-shadow.
- **Radii:** 14px project cards and the portrait, 10px buttons. No pills: stacks and skills are plain text
  (owner, 2026-11-23: pills looked too generated).
- **Cards** are `--surface` (sand) on the `--canvas` page; hover deepens to `--surface-press` over 150ms. Text links
  are ink with a terracotta underline.
- **Metadata** (`.mono`) is uppercase JetBrains Mono with 0.06em tracking. A project's stack is one mono line.
- **Screenshots** sit in a drawn phone (`--device` body, thin bezel, side button), four to a row on wide screens.
- **Portrait** is the full photo, uncropped.
- **Koma** (FitXP's companion, first stage, in the app's own matcha) sits in the FitXP card's top-right corner.
  FitXP's screens are the app's light golden images (`test/goldens/screens/*_usual_light.png`).
- **Section titles** are italic Newsreader with a hairline running to the edge, like the notebook's month divider.
- Reference: Imran's Stitch mobile mock "Tactile Stationery Minimalist" (2026-11-23), adapted to a web page.
- **Accent** (`--accent`) is for link underlines, focus rings and the one status line.
- **Fonts** are self-hosted in `src/assets/fonts/` with their OFL licences.

## Layout

Centred 820px container, 24px gutters.

1. **Header:** mono site name, section links, theme toggle. Links hide under 640px; the toggle stays.
2. **Intro:** portrait (30% column) beside the serif name, mono role and place, the pitch and three text links.
3. **Selected work:** three full cards (JAKIM Touch, FitXP, i-Kredikom 2.0): mono meta, serif name, tagline,
   bullets, a mono stack line, then screenshots in phone frames. On wide screens screenshots sit in a six-slot grid so every project's
   phones share a size; on phones they scroll sideways. A project without screenshots ends after its stack line.
4. **Experience, Other work, Areas of expertise, Education:** the asymmetric row, 30% mono (dates, company, place)
   and 70% content (role, bullets, stack line). Rows stack under 640px.
5. **Get in touch:** email, LinkedIn and GitHub as text links. No phone number.
