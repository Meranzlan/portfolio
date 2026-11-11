/*
 * shapes.ts — FitXP's soft outlines, ported from the app's lib/shared/design/shapes.dart
 * =======================================================================================
 * Nothing on the page is a hard box. Every outline comes from a seed, so the same thing always gets the same
 * silhouette and no two things match:
 *   - wavyPill: the soft edge of every button, pill, chip and card (a rounded box whose edge swells a little)
 *   - pebble:   a round, uneven stone for badges, icons and the corner dial
 *   - waveArc:  a hand-drawn wavy ring, for progress
 * Each function returns an SVG path string in pixels, for an <svg> sized to the element (see SoftShape.vue).
 */

/** A small deterministic random generator, so a seed always draws the same shape (like Dart's Random(seed)). */
function seeded(seed: number) {
  let state = (seed * 9301 + 49297) % 233280 || 1
  return () => {
    state = (state * 9301 + 49297) % 233280
    return state / 233280
  }
}

const fmt = (n: number) => Math.round(n * 10) / 10

function toPath(points: Array<[number, number]>, close = true) {
  return points.map(([x, y], i) => `${i ? 'L' : 'M'}${fmt(x)} ${fmt(y)}`).join('') + (close ? 'Z' : '')
}

/** A pebble filling the box: a soft, irregular round shape. */
export function pebble(width: number, height: number, seed = 0, wobble = 0.08): string {
  const random = seeded(seed + 7)
  const bumps = [2, 3, 4, 5].map((k) => ({
    k,
    size: (wobble * (0.35 + random() * 0.65)) / Math.sqrt(k - 1),
    phase: random() * 2 * Math.PI,
  }))
  const samples = 96
  const radii = Array.from({ length: samples }, (_, i) => {
    const t = (2 * Math.PI * i) / samples
    return 1 + bumps.reduce((sum, b) => sum + b.size * Math.cos(b.k * t + b.phase), 0)
  })
  const top = Math.max(...radii)
  const cx = width / 2
  const cy = height / 2
  const points = radii.map((r, i): [number, number] => {
    const t = (2 * Math.PI * i) / samples
    const k = (r / top) * (1 - (wobble * 0.25 * (1 - Math.cos(3 * t))) / 2)
    return [cx + (width / 2) * k * Math.cos(t), cy + (height / 2) * k * Math.sin(t)]
  })
  return toPath(points)
}

/** A point and its outward normal at distance `s` along a rounded rectangle's outline, clockwise from top-left. */
function roundedRectAt(w: number, h: number, r: number, s: number): { x: number; y: number; nx: number; ny: number } {
  const straightX = w - 2 * r
  const straightY = h - 2 * r
  const arc = (Math.PI / 2) * r
  const pieces: Array<[number, (u: number) => { x: number; y: number; nx: number; ny: number }]> = [
    [straightX, (u) => ({ x: r + u, y: 0, nx: 0, ny: -1 })],
    [arc, (u) => corner(w - r, r, -Math.PI / 2 + u / r)],
    [straightY, (u) => ({ x: w, y: r + u, nx: 1, ny: 0 })],
    [arc, (u) => corner(w - r, h - r, u / r)],
    [straightX, (u) => ({ x: w - r - u, y: h, nx: 0, ny: 1 })],
    [arc, (u) => corner(r, h - r, Math.PI / 2 + u / r)],
    [straightY, (u) => ({ x: 0, y: h - r - u, nx: -1, ny: 0 })],
    [arc, (u) => corner(r, r, Math.PI + u / r)],
  ]
  function corner(cx: number, cy: number, angle: number) {
    const nx = Math.cos(angle)
    const ny = Math.sin(angle)
    return { x: cx + r * nx, y: cy + r * ny, nx, ny }
  }
  let rest = s
  for (const [length, at] of pieces) {
    if (rest <= length) return at(rest)
    rest -= length
  }
  return { x: r, y: 0, nx: 0, ny: -1 }
}

/**
 * A pill or rounded box whose whole edge swells and dips a little: the soft material of the app's trackers.
 * The swells run once round the outline, so a small pill and a wide card get the same few gentle bulges.
 * The shape is inset by `pad` so the bulges stay inside the element's box.
 */
export function wavyPill(width: number, height: number, seed = 0, radius = Infinity, pad = 2): string {
  const w = Math.max(1, width - 2 * pad)
  const h = Math.max(1, height - 2 * pad)
  const r = Math.min(radius, Math.min(w, h) / 2)
  const perimeter = 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r
  const n = Math.max(48, Math.round(perimeter / 6))
  const amp = 1.6 * Math.min(1, Math.max(0.5, Math.min(w, h) / 48))
  const points = Array.from({ length: n }, (_, i): [number, number] => {
    const p = roundedRectAt(w, h, r, (perimeter * i) / n)
    const u = (2 * Math.PI * i) / n
    const swell =
      0.5 * Math.sin(3 * u + seed * 1.7) + 0.3 * Math.sin(5 * u + seed * 2.3) + 0.2 * Math.sin(2 * u + seed)
    return [pad + p.x + p.nx * amp * swell, pad + p.y + p.ny * amp * swell]
  })
  return toPath(points)
}

/** The height of an uneven wave at t (radians along it): crests that vary in height and spacing, like a hand-drawn line. */
function wave(t: number, waves: number) {
  const swell = 0.55 + 0.45 * Math.sin(2.3 * t + 1.1)
  return swell * Math.sin(waves * t + 0.9 * Math.sin(2 * t + 0.4))
}

/** An open wavy arc around (cx, cy), from twelve o'clock clockwise for `sweep` radians. */
export function waveArc(cx: number, cy: number, radius: number, sweep = 2 * Math.PI, amplitude = 2, waves = 14): string {
  const steps = Math.max(2, Math.ceil((Math.abs(sweep) / (2 * Math.PI)) * 240))
  const points = Array.from({ length: steps + 1 }, (_, i): [number, number] => {
    const t = (sweep * i) / steps
    const r = radius + amplitude * wave(t, waves)
    return [cx + Math.sin(t) * r, cy - Math.cos(t) * r]
  })
  return toPath(points, false)
}
