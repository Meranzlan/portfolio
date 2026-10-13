<!--
  RouteStrip.vue — the route strip above the train doors, used as the page's navigation
  ======================================================================================
  One stop per section. It sits under the hero, then sticks to the top of the window. As you scroll, the
  yellow "you are here" marker travels along the line between stops, and the stretch already travelled
  turns blue. Each stop is an ordinary jump link, and the stop you are at carries aria-current.
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Station } from '../content'
import StationCode from './StationCode.vue'

const props = defineProps<{ stations: Station[] }>()

const strip = ref<HTMLElement | null>(null)
// `progress` is a position on the line: 0 is the first stop, 1.5 is halfway between the second and third.
const progress = ref(0)
const current = ref(0)
const stuck = ref(false)

const count = computed(() => props.stations.length)
const currentStation = computed(() => props.stations[current.value])

let frame = 0

function measure() {
  frame = 0
  // A section counts as "reached" once its top passes a line 35% down the window.
  const probe = window.scrollY + window.innerHeight * 0.35
  const tops = props.stations.map((station) => {
    const element = document.getElementById(station.id)
    return element ? element.getBoundingClientRect().top + window.scrollY : Number.POSITIVE_INFINITY
  })

  let index = 0
  while (index < tops.length - 1 && probe >= (tops[index + 1] ?? Number.POSITIVE_INFINITY)) index++

  const start = tops[index] ?? 0
  const next = tops[index + 1]
  let position = index
  if (next !== undefined && next > start) position += Math.min(1, Math.max(0, (probe - start) / (next - start)))

  // The last section may be too short to reach the probe line, so the bottom of the page is the terminus.
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
  if (atBottom) {
    index = tops.length - 1
    position = index
  }

  progress.value = position
  current.value = index
  stuck.value = (strip.value?.getBoundingClientRect().top ?? 1) <= 0
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(measure)
}

// onMounted runs after the component is in the DOM, so the sections can be measured.
onMounted(() => {
  measure()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <nav
    ref="strip"
    class="strip"
    :class="{ 'strip--stuck': stuck }"
    aria-label="Sections"
    :style="{ '--n': count, '--p': progress }"
  >
    <div class="strip__inner wrap">
      <p class="strip__now" aria-hidden="true">
        <StationCode v-if="currentStation" :code="currentStation.code" />
        <span>{{ currentStation?.label }}</span>
      </p>

      <div class="strip__map">
        <div class="strip__track" aria-hidden="true">
          <span class="strip__rail" />
          <span class="strip__done" />
          <span class="strip__marker" />
        </div>

        <ol class="strip__stops">
          <li
            v-for="(station, index) in stations"
            :key="station.id"
            :class="{ 'is-passed': index < current, 'is-current': index === current }"
          >
            <a :href="`#${station.id}`" :aria-current="index === current ? 'location' : undefined">
              <span class="strip__dot" aria-hidden="true" />
              <span class="strip__label">
                <span class="strip__code nums">{{ station.code }}</span>
                <span class="strip__name">{{ station.label }}</span>
              </span>
            </a>
          </li>
        </ol>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.strip {
  --dot: 0.875rem;
  --rail-y: 1.375rem;
  position: sticky;
  top: 0;
  z-index: 20;
  height: var(--strip-h);
  background: var(--ground);
  border-block: 1px solid var(--rule);
  transition: box-shadow 0.3s var(--ease-out);
}

.strip--stuck {
  border-top-color: transparent;
  box-shadow: 0 10px 24px -18px rgb(13 27 46 / 0.5);
}

.strip__inner {
  display: flex;
  align-items: stretch;
  gap: var(--space-4);
  height: 100%;
}

/* Phones show the station you are at as words; the stops become tappable dots. */
.strip__now {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 8.5rem;
  font-weight: 700;
}

.strip__map {
  position: relative;
  flex: 1;
}

.strip__track {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Stop centres sit at (i + 0.5) / n of the width, so the rail runs from the first centre to the last. */
.strip__rail,
.strip__done {
  position: absolute;
  top: calc(50% - 0.1875rem);
  left: calc(50% / var(--n));
  height: 0.375rem;
  border-radius: 999px;
}

.strip__rail {
  right: calc(50% / var(--n));
  background: var(--line-ahead);
}

.strip__done {
  width: calc(var(--p) / var(--n) * 100%);
  background: var(--line);
}

.strip__marker {
  /* Above the stop dots, so it stays visible while it sits exactly on a stop. */
  position: absolute;
  z-index: 2;
  top: 50%;
  left: calc((var(--p) + 0.5) / var(--n) * 100%);
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 50%;
  background: var(--edge);
  box-shadow:
    0 0 0 0.1875rem var(--ink),
    0 4px 10px rgb(13 27 46 / 0.35);
  transform: translate(-50%, -50%);
}

/* The marker glides between frames; with reduced motion it simply follows the scroll. */
@media (prefers-reduced-motion: no-preference) {
  .strip__done,
  .strip__marker {
    transition:
      width 0.25s var(--ease-out),
      left 0.25s var(--ease-out);
  }
}

.strip__stops {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--n), minmax(0, 1fr));
  height: 100%;
}

.strip__stops a {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 2.75rem;
  color: var(--ink-2);
  text-decoration: none;
}

.strip__dot {
  width: var(--dot);
  height: var(--dot);
  border-radius: 50%;
  background: var(--panel);
  box-shadow: 0 0 0 0.1875rem var(--line-ahead);
  transition: box-shadow 0.25s var(--ease-out);
}

.is-passed .strip__dot {
  box-shadow: 0 0 0 0.1875rem var(--line);
}

.strip__stops a:hover .strip__dot {
  box-shadow: 0 0 0 0.1875rem var(--ink);
}

.strip__label {
  display: none;
}

@media (max-width: 47.99rem) {
  .strip__map {
    padding-inline: var(--space-1);
  }
}

/* Tablets and up: the full strip map, with codes and names under each stop. */
@media (min-width: 48rem) {
  .strip__now {
    display: none;
  }

  .strip__rail,
  .strip__done {
    top: calc(var(--rail-y) - 0.1875rem);
  }

  .strip__marker {
    top: var(--rail-y);
  }

  .strip__stops a {
    justify-content: flex-start;
    padding-top: calc(var(--rail-y) - var(--dot) / 2);
    gap: var(--space-2);
  }

  .strip__label {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    line-height: 1;
  }

  .strip__code {
    font-family: var(--font-code);
    font-size: 0.875rem;
    font-weight: 700;
  }

  .strip__name {
    font-weight: 600;
  }

  .strip__stops a:hover {
    color: var(--ink);
  }

  .is-current a {
    color: var(--ink);
  }

  .is-current .strip__name {
    font-weight: 800;
  }
}
</style>
