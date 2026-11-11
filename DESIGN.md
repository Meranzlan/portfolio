---
name: Imran Azlan · Portfolio
description: A Flutter developer's portfolio dressed in the dark theme and design language of FitXP, the app he is building.
colors:
  bg: "#18203a"
  surface: "#212b4a"
  board: "#1c2542"
  board-dot: "#2e3a5e"
  raised: "#2a365d"
  line: "#34416a"
  contour: "#2a355a"
  track: "#2e3a5e"
  ink: "#f2f0ea"
  muted: "#a6b3c8"
  accent: "#a9c6e0"
  accent-deep: "#c4d8eb"
  on-accent: "#18203a"
  water: "#7dd3d3"
  move: "#e99a7c"
  star: "#f0c25e"
  food: "#f28b82"
  looks: "#c2a8ec"
  you: "#f0a6c8"
  weight: "#d8c49a"
typography:
  sans: "Zen Maru Gothic (400, 500, 700): everything you read"
  serif: "Zen Old Mincho (700): names and titles"
  numeral: "Instrument Serif (400): section numbers"
---

# Design: FitXP dark

The portfolio borrows the look of FitXP (`Meranzlan/fitxp`), so the site itself shows the design work. Since
2026-11-11 (owner's call) it is dark only and replaces the earlier light "Line Map" rail-signage design.

## Sources in the app

| Here | In FitXP |
|---|---|
| `src/styles/tokens.css` | `lib/shared/design/tokens.dart`, `FitColors.dark` |
| `src/lib/shapes.ts` (`wavyPill`, `pebble`, `waveArc`) | `lib/shared/design/shapes.dart` |
| `public/images/topo.svg` | `TopoLines` (contour backdrop), drawn once by a script |
| `KomaCompanion.vue` | Koma, first stage (`CompanionPainter`) |
| `CornerDial.vue` | `corner_dial.dart` |
| `public/images/fitxp/*.webp` | the dark golden images in `test/goldens/` |
| `src/assets/fonts/` | `assets/fonts/` (SIL OFL, licences alongside) |

## Rules

- **Soft, never boxy.** Pills, chips, cards and tiles are drawn by `SoftShape.vue` with the app's wavy edge;
  badges, stones and the dial are pebbles. Style them with `--soft-fill`, `--soft-stroke`, `--soft-stroke-width`.
- **One call to action.** Pale blue (`--accent`) with navy words is the Email button, the hero's ring and the dial's
  progress. Nothing else is filled pale blue.
- **Place colours.** Each section wears one of the app's place colours (`stations[].tint` in `content.ts`): its
  number, its squiggle and its stone on the dial. Projects wear one on their badge and highlight stars.
- **Type.** Zen Old Mincho for names and titles, Instrument Serif for the big section numbers, Zen Maru Gothic for the
  rest. Small capitals with wide tracking for labels (`.eyebrow`, fact labels, dial labels).
- **Screens stand on the board.** App screens sit on the dotted navy tray, like Today's plates on the app's board.
- **Koma** appears in the hero and the contact card. The copy calls it a companion, never a mascot.
- **Motion** uses the app's curves (`--ease`, `--glide`, `--spring`). The ring fills on arrival, the dial spills
  open, Koma bobs and blinks. All of it stops under `prefers-reduced-motion`.

## Layout

1. **Hero**, laid out like Today: where (small capitals), the name, the status line, role and pitch, Email and the
   link chips. On the right, the big wavy ring holds the portrait, Koma stands on it, and two app screens lean on it
   (the first feature screens that have a real screenshot).
2. **Apps**: one soft card per project. Two screens or fewer sit beside the words; more get a full-width tray that
   scrolls sideways on phones. FitXP adds its card sheet under the screens.
3. **Experience**: a trail of stones; the current job is the lit stone with a "You are here" pill.
4. **Skills**: one card per group, chips inside. **Highlights**: photos in soft frames, achievements as trophies.
5. **Contact**: one big card with Koma, the Email button, the address with a copy button, and tiles for the rest.
6. **Corner dial**: fixed bottom-right on every screen size. Its ring shows how far down the page you are; open, it
   lists the six sections on two arcs, the current one lit in its colour. Escape or a click outside closes it.
