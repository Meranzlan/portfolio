<!--
  CornerDial.vue — the page's navigation, borrowed from FitXP's corner dial
  =========================================================================
  A pebble in the bottom-right corner, ringed by a wavy line that fills as you scroll down the page. Press it and a
  pool spills out of the corner with one place per section, each in its own colour; the section you are in is lit.
  Every place is an ordinary jump link, so the page still works with the keyboard, a screen reader or no script.
-->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Station } from '../content'
import { pebble, waveArc } from '../lib/shapes'
import SignIcon from './SignIcon.vue'

const props = defineProps<{ stations: Station[] }>()

const open = ref(false)
const current = ref(0)
const progress = ref(0)
const firstLink = ref<HTMLAnchorElement[]>([])

// The places sit on two arcs round the corner, like the app: three close in, the rest further out.
// An angle of 0 points left from the corner, 90 points straight up.
const places = computed(() =>
  props.stations.map((station, index) => {
    const inner = index < 3
    const slot = inner ? index : index - 3
    const count = inner ? 3 : props.stations.length - 3
    const angle = 12 + (66 * slot) / Math.max(1, count - 1)
    const radius = inner ? 8.75 : 14.5
    const rad = (angle * Math.PI) / 180
    return { station, angle, x: -Math.cos(rad) * radius, y: -Math.sin(rad) * radius }
  }),
)

// Shapes for the button, the places and the pool. Each place keeps its own silhouette, as in the app.
const buttonShape = pebble(100, 100, 4, 0.1)
const placeShape = (index: number) => pebble(100, 100, 20 + index * 3, 0.1)
const poolShape = pebble(200, 200, 9, 0.05)
const ring = waveArc(50, 50, 46, 2 * Math.PI, 1.6, 12)

let frame = 0

function measure() {
  frame = 0
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
  // A section counts as reached once its top passes a line 40% down the window; the bottom of the page is the end.
  const probe = window.scrollY + window.innerHeight * 0.4
  let index = 0
  props.stations.forEach((station, i) => {
    const element = document.getElementById(station.id)
    if (element && element.getBoundingClientRect().top + window.scrollY <= probe) index = i
  })
  if (window.scrollY >= max - 4) index = props.stations.length - 1
  current.value = index
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(measure)
}

async function toggle() {
  open.value = !open.value
  if (open.value) {
    // nextTick waits for Vue to update the DOM, so the links exist before we move focus into them.
    await nextTick()
    firstLink.value[current.value]?.focus({ preventScroll: true })
  }
}

function close() {
  open.value = false
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) close()
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  window.removeEventListener('keydown', onKey)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <div class="dial" :class="{ 'dial--open': open }">
    <!-- A click on the dimmed page closes the pool, like a tap outside it in the app. -->
    <div class="dial__scrim" aria-hidden="true" @click="close" />

    <nav id="dial-pool" class="dial__pool" aria-label="Sections" :inert="!open">
      <svg class="dial__water" viewBox="0 0 200 200" aria-hidden="true"><path :d="poolShape" /></svg>
      <ul>
        <li
          v-for="(place, index) in places"
          :key="place.station.id"
          class="dial__place"
          :class="{ 'is-here': index === current }"
          :style="{
            '--tint': `var(--${place.station.tint})`,
            '--x': `${place.x}rem`,
            '--y': `${place.y}rem`,
            '--turn': `${place.angle - 90}deg`,
            '--i': index,
          }"
        >
          <a
            ref="firstLink"
            :href="`#${place.station.id}`"
            :aria-current="index === current ? 'location' : undefined"
            @click="close"
          >
            <svg class="dial__stone" viewBox="0 0 100 100" aria-hidden="true"><path :d="placeShape(index)" /></svg>
            <SignIcon :name="place.station.icon" :size="22" />
            <span class="dial__label">{{ place.station.label }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <button
      type="button"
      class="dial__button"
      :aria-expanded="open"
      aria-controls="dial-pool"
      :aria-label="open ? 'Close sections' : 'Open sections'"
      @click="toggle"
    >
      <svg class="dial__progress" viewBox="0 0 100 100" aria-hidden="true">
        <path class="dial__track" :d="ring" />
        <path class="dial__done" :d="ring" pathLength="1" :style="{ strokeDashoffset: 1 - progress }" />
      </svg>
      <svg class="dial__pebble" viewBox="0 0 100 100" aria-hidden="true">
        <path :d="buttonShape" />
        <!-- Closed: seven dots round a star, the app's dial mark. Open: a cross. -->
        <g v-if="!open" class="dial__mark">
          <circle v-for="dot in 7" :key="dot" r="4.2" :cx="50 + 25 * Math.cos((dot * 2 * Math.PI) / 7 + 0.4)" :cy="52 + 25 * Math.sin((dot * 2 * Math.PI) / 7 + 0.4)" />
          <path class="dial__star" d="m50 37 3.4 7 7.6 1-5.5 5.4 1.3 7.6-6.8-3.6-6.8 3.6 1.3-7.6-5.5-5.4 7.6-1Z" />
        </g>
        <path v-else class="dial__cross" d="M37 37 63 63M63 37 37 63" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.dial {
  --size: 4.25rem;
  --corner: 1rem;
  position: fixed;
  right: var(--corner);
  bottom: var(--corner);
  z-index: 40;
  width: var(--size);
  height: var(--size);
}

@media (min-width: 48rem) {
  .dial {
    --size: 4.75rem;
    --corner: 1.75rem;
  }
}

.dial__scrim {
  position: fixed;
  inset: 0;
  background: rgb(10 14 28 / 0.55);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.42s var(--ease);
}

.dial--open .dial__scrim {
  opacity: 1;
  pointer-events: auto;
}

/* ---------- The button ---------- */
.dial__button {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
}

.dial__button:focus-visible {
  border-radius: 50%;
}

.dial__progress,
.dial__pebble {
  position: absolute;
  overflow: visible;
}

.dial__progress {
  inset: -0.55rem;
}

.dial__progress path {
  fill: none;
  stroke-width: 4;
  stroke-linecap: round;
}

.dial__track {
  stroke: var(--track);
}

.dial__done {
  stroke: var(--accent);
  stroke-dasharray: 1;
}

.dial__pebble {
  inset: 0;
  filter: drop-shadow(0 6px 10px rgb(0 0 0 / 0.45));
  transition: transform 0.42s var(--spring);
}

.dial__pebble > path {
  fill: var(--accent);
}

.dial__button:hover .dial__pebble {
  transform: scale(1.05) rotate(-6deg);
}

.dial--open .dial__pebble {
  transform: rotate(90deg);
}

.dial__mark circle {
  fill: var(--on-accent);
}

.dial__star {
  fill: var(--star);
  stroke: var(--on-accent);
  stroke-width: 2.5;
  stroke-linejoin: round;
}

.dial__cross {
  fill: none;
  stroke: var(--on-accent);
  stroke-width: 7;
  stroke-linecap: round;
}

/* ---------- The pool ---------- */
.dial__pool {
  position: absolute;
  right: calc(var(--size) / 2);
  bottom: calc(var(--size) / 2);
  width: 0;
  height: 0;
}

/* The pool is a big pebble whose centre is the button, so only its top-left quarter shows on screen. */
.dial__water {
  position: absolute;
  left: -19.5rem;
  top: -19.5rem;
  width: 39rem;
  height: 39rem;
  transform: scale(0.1);
  transform-origin: center;
  opacity: 0;
  transition:
    transform 0.22s var(--ease),
    opacity 0.22s var(--ease);
}

.dial__water path {
  fill: var(--device);
  stroke: var(--line);
  stroke-width: 0.4;
}

.dial--open .dial__water {
  transform: scale(1);
  opacity: 1;
  transition:
    transform 0.42s var(--glide),
    opacity 0.2s var(--ease);
}

.dial__place {
  position: absolute;
  left: var(--x);
  top: var(--y);
  transform: translate(-50%, -50%) scale(0.3);
  opacity: 0;
  transition:
    transform 0.2s var(--ease),
    opacity 0.15s var(--ease);
}

.dial--open .dial__place {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  transition:
    transform 0.42s var(--spring) calc(0.06s + var(--i) * 0.035s),
    opacity 0.2s var(--ease) calc(0.06s + var(--i) * 0.035s);
}

.dial__place a {
  position: relative;
  display: grid;
  place-items: center;
  width: 3.25rem;
  height: 3.25rem;
  color: var(--tint);
  text-decoration: none;
}

.dial__stone {
  position: absolute;
  inset: 0;
  overflow: visible;
}

.dial__stone path {
  fill: var(--surface);
  stroke: var(--line);
  stroke-width: 1.5;
  transition: fill 0.25s var(--ease);
}

.dial__place .sign-icon {
  position: relative;
}

.dial__place a:hover .dial__stone path {
  fill: var(--raised);
}

/* The section you are in is lit with its own colour, like the place you came from in the app. */
.is-here a {
  color: var(--on-accent);
}

.is-here .dial__stone path,
.is-here a:hover .dial__stone path {
  fill: var(--tint);
  stroke: none;
}

/* Labels run along the arc, set in small capitals, turned to follow the curve. */
.dial__label {
  position: absolute;
  left: 50%;
  top: 50%;
  color: var(--ink);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
  transform: translate(-50%, -50%) rotate(var(--turn)) translateY(-2.5rem);
}

@media (prefers-reduced-motion: reduce) {
  .dial *,
  .dial__scrim {
    transition: none !important;
  }
}
</style>
