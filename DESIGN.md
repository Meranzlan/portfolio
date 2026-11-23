---
name: Imran Azlan · Portfolio
description: Editorial Tactile Minimalism. High-end stationery with digital utility.
colors:
  light: { canvas: "#FAF8F5", surface: "#F2EFE9", ink: "#1E1E1C", ink-2: "#7A756D", accent: "#C86D51", accent-tint: "#F4E6E1", hairline: "#E5E0D8" }
  dark:  { canvas: "#121212", surface: "#1C1C1A", ink: "#E8E4DC", ink-2: "#9A948B", accent: "#D97D62", accent-tint: "rgba(217,125,98,0.14)", hairline: "#2A2A27" }
typography:
  serif: "Instrument Serif 400, tracking -0.02em: name and headings"
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
- **Radii:** 14px project cards and the portrait, 10px buttons and screenshots, 999px pills.
- **Hover:** cards shift from `--canvas` to `--surface` over 150ms; text links are ink with a terracotta underline.
- **Accent** (`--accent`) is for link underlines, focus rings and the one status tag (`--accent-tint` fill).
- **Fonts** are self-hosted in `src/assets/fonts/` with their OFL licences.

## Layout

Centred 820px container, 24px gutters.

1. **Header:** mono site name, section links, theme toggle. Links hide under 640px; the toggle stays.
2. **Intro:** portrait (30% column) beside the serif name, mono role and place, the pitch and three text links.
3. **Selected work:** three full cards (JAKIM Touch, FitXP, i-Kredikom 2.0): mono meta, serif name, tagline,
   bullets, stack pills, then screenshots. On wide screens screenshots sit in a six-slot grid so every project's
   phones share a size; on phones they scroll sideways. A project without screenshots ends after its pills.
4. **Experience, Other work, Areas of expertise, Education:** the asymmetric row, 30% mono (dates, company, place)
   and 70% content (role, bullets, pills). Rows stack under 640px.
5. **Get in touch:** email, LinkedIn and GitHub as text links. No phone number.
