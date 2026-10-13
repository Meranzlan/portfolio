---
name: Imran Azlan · Portfolio
description: A Flutter developer's career drawn as one blue rail line, set in Klang Valley wayfinding signage.
colors:
  ground: "#eef2f6"
  ground-tile: "#e2e8ef"
  panel: "#ffffff"
  rule: "#d3dae3"
  ink: "#0d1b2e"
  ink-2: "#4a5970"
  line: "#1546d1"
  line-strong: "#0f37a8"
  line-text: "#1546d1"
  line-pale: "#dbe5ff"
  line-ahead: "#c4d0e6"
  on-line: "#ffffff"
  edge: "#ffd23f"
  sign-dark: "#0d1b2e"
  sign-dark-hover: "#182a45"
  lightbox: "#dbe5ff"
  alu: "#d6dce4"
  screen: "#e6ecf5"
  device: "#0d1b2e"
  device-chrome: "#1c2a40"
  device-light: "#34445c"
  device-text: "#b9c6d8"
typography:
  display:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 1.5rem + 6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.6rem + 2.4vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.4rem + 1.2vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  title-sm:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
  body-lg:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  code:
    fontFamily: "Barlow Condensed, Barlow, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.01em"
  code-tag:
    fontFamily: "Barlow Condensed, Barlow, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
rounded:
  tile: "4px"
  sign: "6px"
  pill: "999px"
  roundel: "50%"
spacing:
  space-1: "0.25rem"
  space-2: "0.5rem"
  space-3: "0.75rem"
  space-4: "1rem"
  space-5: "1.5rem"
  space-6: "2rem"
  space-7: "3rem"
  space-8: "4rem"
  space-9: "6rem"
  space-10: "8rem"
components:
  email-sign:
    backgroundColor: "{colors.line}"
    textColor: "{colors.on-line}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.sign}"
    height: "4rem"
  email-sign-hover:
    backgroundColor: "{colors.line-strong}"
  email-sign-arrow-tile:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.line-text}"
    rounded: "{rounded.tile}"
    width: "4rem"
  direction-sign:
    backgroundColor: "{colors.sign-dark}"
    textColor: "{colors.on-line}"
    rounded: "{rounded.sign}"
    padding: "0.75rem 1.5rem"
    height: "4.5rem"
  direction-sign-hover:
    backgroundColor: "{colors.sign-dark-hover}"
  station-code:
    backgroundColor: "{colors.line}"
    textColor: "{colors.on-line}"
    typography: "{typography.code-tag}"
    padding: "0.2em 0.45em 0.15em"
  stop-roundel:
    backgroundColor: "{colors.line}"
    textColor: "{colors.on-line}"
    typography: "{typography.code-tag}"
    rounded: "{rounded.pill}"
    height: "2.75rem"
  sign-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sign}"
  lightbox-frame:
    backgroundColor: "{colors.alu}"
    rounded: "{rounded.tile}"
    padding: "0.625rem"
  here-tag:
    backgroundColor: "{colors.sign-dark}"
    textColor: "{colors.edge}"
    typography: "{typography.code}"
    rounded: "{rounded.tile}"
    padding: "0.3rem 0.6rem 0.25rem"
---

# Design System: Imran Azlan · Portfolio

## Overview

**Creative North Star: "The Line Map"**

The page is a Klang Valley rail line. A career is one cobalt line, each shipped app is a station in service, and the visitor reads the page the way they read a platform: enamel sign panels standing on a pale tiled floor, condensed station codes in tags and roundels, strip maps with stops, drawn arrow pictograms, and backlit aluminium lightboxes that hold photos and phone screens. Nothing is ornament borrowed from elsewhere. Every device on the page, from the section headings to the bullet lists, is a piece of transit wayfinding doing a wayfinding job.

Density is calm and signage-sized: large bold Barlow lettering, generous station padding (6rem to 8rem between sections), information set in label grids and timetable columns rather than paragraphs. The palette is rationed. White signs carry navy lettering on the pale floor; cobalt appears only where the line itself appears; platform-edge yellow appears only where the visitor is.

Light mode is the reference design. Dark mode follows the visitor's system setting and is the same platform at night: the signs turn navy with pale lettering, the floor drops to near-black blue, and every role keeps its job.

**Key Characteristics:**
- Enamel sign panels (white by day, navy by night) on a 4rem tiled platform floor.
- One cobalt line blue, rationed to the line, current position, station codes and the Email sign.
- Platform-edge yellow means "you are here" and keyboard focus, nothing else.
- Barlow for all lettering; Barlow Condensed for codes, dates, labels and fact keys.
- Rails, stops and branch lines replace bullets, chips and dividers.
- A sticky route strip whose yellow marker travels the line as you scroll.

## Colors

A cool, tiled-platform neutral field with one saturated cobalt and one signal yellow, each with a single job.

### Primary
- **Line Cobalt** (`line`): the rail line in every form: the route strip's travelled stretch, the experience rail, the apps rail, skill legend swatches, station code tags, stop roundels, the hero's line band and blue field, the Email sign and the contact concourse. Also text selection.
- **Deep Line** (`line-strong`): the Email sign's hover state only.
- **Line Lettering** (`line-text`): cobalt used as text or icon color on a panel (text links, arrow tiles, plaque icons). Identical to Line Cobalt by day; lifts to a lighter blue at night so it stays legible on navy panels.
- **Line Pale** (`line-pale`): secondary lettering on the blue field (band "Now at", concourse intro, direction sign details, the copy button's border).
- **Line Ahead** (`line-ahead`): the stretch of line not yet travelled: unvisited strip rail, unvisited stop rings, branch-line rails inside project panels.
- **On Line** (`on-line`): lettering on cobalt and on navy direction signs.

### Tertiary
- **Platform Edge** (`edge`): the travelling marker on the route strip, the current stop on the experience line, the "You are here" tag, and the focus band. Never a fill for decoration, never a button.

### Neutral
- **Platform Floor** (`ground`): the page background, also the sticky route strip's fill.
- **Tile Joint** (`ground-tile`): the 1px joints of the 4rem floor grid.
- **Enamel** (`panel`): sign panels: the hero name board, project panels, the plaque, the experience band, the Email sign's arrow tile, stop dot centers.
- **Rule** (`rule`): 1px hairlines: route strip borders, fact cell bottoms, legend rows, link underlines at rest.
- **Navy Ink** (`ink`): all primary lettering; also the 2px top rule of label grids, stop rings and the focus rim.
- **Slate Ink** (`ink-2`): secondary lettering: intros, summaries, dates, fact keys, unvisited strip labels.
- **Night Sign** (`sign-dark`, hover `sign-dark-hover`): navy direction signs on the blue concourse and the "You are here" tag.
- **Lightbox** (`lightbox`): the backlit pale-blue panel project screens stand in.
- **Aluminium** (`alu`): lightbox and framed-portrait frames.
- **Screen** (`screen`): empty screen and photo placeholders.
- **Hardware** (`device`, `device-chrome`, `device-light`, `device-text`; `device-rim` equals `device` by day): phone bezels and the browser frame.

### Night platform (dark mode)
Same roles, re-lit under `prefers-color-scheme: dark`: ground #0b1220, ground-tile #111a2a, panel #121c2e, rule #26344c, ink #e8edf5, ink-2 #9fb0c6, line #2453e0, line-strong #3a68f0, line-text #7ea2ff, line-ahead #2a3953, device #060b14, device-rim #2c3a52, alu #2a3850, screen #1a2639, lightbox #16244a, sign-dark #0b1324, sign-dark-hover #16223a. Edge yellow, line-pale and on-line do not change.

### Named Rules
**The Rationed Blue Rule.** Cobalt is the line. It may fill the line, its stops, codes and roundels, the hero field, the concourse and the one primary action (Email). It never decorates a card, a border or a hover on an unrelated element.

**The Platform Edge Rule.** Yellow says "you are here": the strip marker, the current stop, the here tag, and focus. If an element is not the visitor's position or focus, it is not yellow.

## Typography

**Display Font:** Barlow (with system-ui, sans-serif), self-hosted, weights 400 to 800
**Label/Code Font:** Barlow Condensed (with Barlow, system-ui), weights 600 and 700

**Character:** Barlow descends from road and transit signage: plain, sturdy, legible at a distance. Its condensed cut sets station codes, dates and labels the way a platform sets "KG16".

### Hierarchy
- **Display** (800, clamp 52px to 96px, line-height 0.92, -0.03em): the name on the hero board only.
- **Headline** (800, clamp 36px to 52px, 1.05, -0.015em): station headings beside their code tag; feature project names; the concourse title.
- **Title** (800, clamp 28px to 36px, 1.05): project names, experience places, plaque names; the Email sign label on the concourse runs a step larger.
- **Title Small** (700, 24px, 1.2): the hero role line and the hero Email sign.
- **Body Large** (400, 20px, 1.45 to 1.5): intros, summaries, the pitch; capped at 34rem to 40rem.
- **Body** (400, 17px, 1.55): running text and lists; notes capped at 44rem.
- **Body Small** (400, 15px): the footer.
- **Code** (Barlow Condensed 600, 15px to 17px): dates, fact keys, the tech stack line, placeholder notes, direction sign details, the hero band.
- **Code Tag** (Barlow Condensed 700, 14px to 22px, +0.02em): station codes, roundels, strip stop codes.

Headings use `text-wrap: balance`; paragraphs and list items use `text-wrap: pretty`. Codes and dates use tabular numerals.

### Named Rules
**The Sign Case Rule.** Lettering is sentence case, as on the signs. No uppercase tracking, no small-caps labels.

**The Condensed Means Code Rule.** Barlow Condensed is for codes, dates, keys and short labels. Sentences and headings stay in Barlow.

## Layout

A single column of stations inside a 78rem container with a 1rem gutter on phones and 2rem from 48rem up. Each station section pads 6rem top and 4rem bottom, growing to 8rem and 6rem from 64rem. Station headings sit 3rem above their content. Spacing comes only from the ten-step scale (4px to 128px).

The tiled floor (1px joints every 4rem, anchored center top) shows behind every pale section; panels, the white experience band and the blue concourse cover it.

The hero is a two-part sign from 64rem: a white name board (7fr) and a blue field (5fr) that share one sign edge, with two tilted phones stepping over the seam. Below 64rem the board stacks above the field. The route strip sits under the hero and becomes sticky at the top (3.75rem tall, 4.75rem from 48rem); from 48rem it shows codes and names under each stop, below that it shows the current station by name and the stops as tappable dots. Jump links land below the strip via `scroll-padding-top`.

Project panels split words 7fr / lightbox 5fr from 56rem, alternating sides; compact projects pair two to a row. From 64rem a rail runs in the left margin with a stop at the same height beside each panel. Experience reads as a timetable from 48rem: dates right-aligned in their own column left of the rail. Skills are a legend: line name in a 17rem column, stops in a wrapping row. The photo board is three columns of 15rem rows from 48rem.

Breakpoints in use: 30rem, 40rem, 48rem, 56rem, 64rem.

## Elevation & Depth

Depth is physical and low: signs stand slightly off the floor, hardware and lightboxes stand a little further. Two shadow tokens carry it; both are navy-tinted by day and pure black at night. Flat cobalt surfaces (the field, the concourse) have no shadow.

### Shadow Vocabulary
- **Sign** (`--shadow-sign`, `0 1px 2px rgb(13 27 46 / 0.08), 0 10px 28px -12px rgb(13 27 46 / 0.22)`): every enamel panel, plaque and lightbox frame.
- **Lift** (`--shadow-lift`, `0 2px 4px rgb(13 27 46 / 0.12), 0 22px 40px -18px rgb(13 27 46 / 0.45)`): phones, browser frames and the framed portrait, which stand proud of the sign they sit on.

### Named Rules
**The Standing Sign Rule.** Shadows are soft, negative-spread and fall downward. No hard offset shadows, no glows, no hover lifts on panels.

## Shapes

Corners are slight and manufactured: signs 6px, tiles and inner tiles 4px, photo insets 2px. Circles belong to stops and roundels; full pills belong to rails (0.375rem thick) and multi-character roundels. Lines are drawn, not bordered: rails are filled bars with rounded ends, stops are white dots with a 3px ring (navy for a station, cobalt once passed, pale ahead), and the experience line ends in a navy buffer bar. Label grids open with a 2px navy rule and divide with 1px hairlines.

Icons are one drawn pictogram family on a 24 by 24 grid, 2px round stroke, `currentColor`, inlined once as SVG symbols. They are decorative; the link or button carries the words.

## Components

### Buttons
- **Email sign (primary):** a cobalt wayfinding panel, 4rem tall, 6px corners, 24px bold label, with a white 4px-cornered arrow tile inset 6px on its right carrying a cobalt arrow. Hover deepens to Deep Line and nudges the arrow 0.25rem right; active presses 1px down. One per view.
- **Concourse Email sign:** the inverse on blue: a white panel at least 6rem tall with a large 800 label and a cobalt arrow tile 5rem wide.
- **Copy button:** a 2.75rem-tall outline in Line Pale (2px, 4px corners) on the concourse, with a 12% white wash on hover.
- **Text links:** Navy Ink with a Rule-colored underline (0.08em thick, 0.22em offset) and a pictogram; hover turns them Line Lettering with a matching underline. Minimum 2.75rem tap height.

### Direction signs
Navy panels on the blue concourse, at least 4.5rem tall, 6px corners: pictogram, a 20px bold label over a condensed pale detail line, and an arrow that nudges 0.2rem on hover while the panel lightens to its hover navy.

### Station heading
A cobalt station code tag (condensed 700, 0.35em corners, minimum 3.4em wide) inline before the headline, matching the code of its stop on the route strip. On the blue concourse the tag inverts to white with cobalt lettering. The tag is part of the heading line, never a label stacked above it.

### Route strip (signature)
The sticky strip map: a 6px pale rail between first and last stop centers, a cobalt stretch covering the distance travelled, white stop dots ringed pale ahead and cobalt passed, and a 22px yellow marker with a navy rim that glides along the rail (0.25s exponential ease-out; follows scroll directly under reduced motion). The current stop carries `aria-current` and an 800-weight name. When stuck it gains a soft downward shadow and drops its top border.

### Project panel
An enamel sign split into words and a lightbox. Words: a cobalt stop roundel and the project name, a summary, a label grid of facts (condensed keys over bold values), highlights as a branch line (2px pale rail, white stops ringed navy), the stack as a condensed dot-separated line, and an optional cobalt text link. Lightbox: the pale backlit field with phones or a browser frame standing in it; compact panels crop phones at the lightbox floor.

### Experience line
A timetable: a cobalt rail ending in a navy buffer bar, stops as white rings with a navy 4px inset ring, the current stop filled yellow, and a navy "You are here" tag lettered in yellow.

### Skill legend
Rows opened by a 2px navy rule and divided by hairlines; each line name wears a legend swatch (a short cobalt rail with a ringed stop at each end) and its skills follow as a wrapping row separated by small slate dots.

### Lightboxes and devices
Photos sit in an aluminium frame (0.625rem padding, 4px corners, Sign shadow); phones are navy bezels with a drawn camera pill and Lift shadow; browsers have a chrome bar with three dim lights and a pill URL field. Empty slots show a pictogram and a condensed "to come" note on Screen.

### Focus
Every focusable element: a 3px yellow outline at 3px offset over a 3px navy ring, readable on white, tile and blue alike.

## Do's and Don'ts

### Do:
- **Do** draw lists, sequences and timelines as lines with stops: rails 0.375rem thick, stops ringed 3px.
- **Do** give every section a station code that matches its stop on the route strip.
- **Do** set codes, dates and keys in Barlow Condensed and everything else in Barlow, in sentence case.
- **Do** keep panels on the two shadow tokens, Sign and Lift.
- **Do** use exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`) for every transition, 0.2s for color, 0.25s for the marker, 0.3s for arrow nudges, and drop entrance motion under reduced motion.
- **Do** keep dark mode a re-lighting of the same roles: navy signs, pale lettering, same yellow.
- **Do** draw new icons on the 24px grid with the 2px round stroke.

### Don't:
- **Don't** use cobalt for anything that is not the line, a code, a roundel, the hero field, the concourse or the Email action.
- **Don't** use yellow for anything but position and focus.
- **Don't** build a skill-chip cloud or a grid of same-size project cards; skills are a legend, projects are stops on the line.
- **Don't** stack an uppercase label or kicker above a heading; the station code sits inline in the heading.
- **Don't** use emoji or Unicode glyphs as icons.
- **Don't** add hard offset shadows, glows or gradients to signs.
