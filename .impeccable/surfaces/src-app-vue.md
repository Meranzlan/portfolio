---
version: 1
slug: "src-app-vue"
primary_target: "src/App.vue"
related_targets: []
---

# Surface brief: portfolio home (imran.ikko.space)

Scope: the single page at `src/App.vue` and its components. Mode: Persuade. The visitor (recruiter first, client
second) decides whether Imran is worth contacting and does it: primary action Email, secondary CV download,
WhatsApp, LinkedIn, GitHub. Proof: shipped apps (JAKIM Touch, i-Kredikom 2.0, Ikko, FitXP, Recipease) with
screens, concrete technical details from the resume, photos the owner adds later. Content lives in one data file.

Memorable moment: the route strip at the foot of the first viewport becomes the sticky nav; its marker travels
the blue line as you scroll and lights the station you are at.

Unresolved: portrait (cut-out PNG or plain photo), app screenshots, launch and achievement photos, any
achievements beyond the Dean's List. All slots ship as labelled placeholders until the owner supplies them.

## Direction contract

THESIS: Imran's career is one blue rail line and every app he shipped is a station in service. Refuses the
category default: photo hero over a grid of same-size project cards and a skill-chip cloud.

OWN-WORLD: Klang Valley rail wayfinding. Enamel sign panels on a pale platform-tile ground: white with navy
lettering in light mode, navy with white lettering in dark mode (the owner asked for light mode first, 2026-10-13, so
the light page keeps its signs white); one cobalt line blue reserved for the line, the current station, the travelling marker and the Email sign;
platform-edge yellow only for "you are here" and focus. Condensed station codes in roundels, drawn arrow
pictograms, strip maps with stops, backlit lightbox panels for photos and phone screens.

STORY: The visitor understands "Flutter developer who ships government-scale apps down to the native edges",
believes it from real screens and specific engineering per project, and emails him.

FIRST VIEWPORT: Desktop: left 55% the station name sign: roundel, "Imran Azlan" at display scale, legal name, the
line band ("Now at Zen Computer Systems" / "Next stop: your team"), role line, one-line pitch, a blue arrow sign
"Email me" as the primary action, CV / WhatsApp / LinkedIn / GitHub as small links. Right 45%:
a blue field with the portrait lifted over it and two phone lightboxes overlapping its edge. Along the bottom:
the route strip (Start, Apps, Experience, Skills, Highlights, Contact) with its marker. Shipped apps run as stops
on one line, each app wearing its own stop roundel. Phone: sign first, portrait and
phones below, strip as a compact sticky line naming the current station.

FORM: Transit wayfinding "Line Map", position 4 of 7 on the ordered list, seed key d38a3352. Signature
interaction: the scroll-linked marker on the sticky route strip (jump links, aria-current); motion glides with
exponential ease-out and jumps under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
