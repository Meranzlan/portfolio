<!--
  ExperienceLine.vue — where I've worked and studied, as a trail of stones
  =========================================================================
  Like the trail to the day's box in the app's quests: a dotted path down the margin, one stone per stop. The stop
  I'm at now is the lit stone, with a "You are here" pill.
-->
<script setup lang="ts">
import { journey, stations } from '../content'
import SoftShape from './SoftShape.vue'
import StationHeading from './StationHeading.vue'

const station = stations.find((item) => item.id === 'experience')
</script>

<template>
  <section id="experience" class="section" aria-labelledby="experience-title">
    <div class="wrap">
      <StationHeading heading-id="experience-title" :station="station" title="Experience and education" />

      <ol class="trail">
        <li v-for="(stop, index) in journey" :key="stop.place" class="trail__stop" :class="{ 'trail__stop--here': stop.current }">
          <SoftShape class="trail__stone" shape="pebble" :seed="index * 5 + 2" :wobble="0.14" aria-hidden="true" />
          <SoftShape class="trail__card" :radius="24" :seed="index + 40">
            <p class="trail__when nums">{{ stop.when }}</p>
            <h3 class="trail__place">
              {{ stop.place }}
              <SoftShape v-if="stop.current" tag="span" class="trail__here" :seed="9">You are here</SoftShape>
            </h3>
            <p class="trail__title">{{ stop.title }}</p>
            <p class="trail__where">{{ stop.where }}</p>
            <ul v-if="stop.notes.length" class="trail__notes">
              <li v-for="note in stop.notes" :key="note">{{ note }}</li>
            </ul>
          </SoftShape>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.trail {
  --stone: 1.75rem;
  display: grid;
  gap: var(--space-5);
  max-width: 52rem;
}

.trail__stop {
  position: relative;
  display: grid;
  grid-template-columns: var(--stone) minmax(0, 1fr);
  gap: var(--space-4);
}

@media (min-width: 48rem) {
  .trail__stop {
    gap: var(--space-5);
  }
}

/* The dotted path between stones */
.trail__stop:not(:last-child)::after {
  content: '';
  position: absolute;
  top: calc(var(--space-5) + var(--stone));
  bottom: calc(-1 * var(--space-5) + 0.25rem);
  left: calc(var(--stone) / 2 - 2px);
  width: 4px;
  background: radial-gradient(circle, var(--track) 2px, transparent 2.2px) center top / 4px 0.75rem repeat-y;
}

.trail__stone {
  --soft-fill: var(--track);
  width: var(--stone);
  height: var(--stone);
  margin-top: var(--space-5);
}

.trail__stop--here .trail__stone {
  --soft-fill: var(--move);
  box-shadow: 0 0 0 0.4rem rgb(233 154 124 / 0.18);
  border-radius: 50%;
}

.trail__card {
  --soft-fill: var(--surface);
  --soft-stroke: var(--line);
  padding: var(--space-5);
}

.trail__stop--here .trail__card {
  --soft-stroke: var(--move);
}

.trail__when {
  color: var(--muted);
  font-size: var(--text-sm);
  font-weight: 700;
}

.trail__place {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-3);
  margin-top: var(--space-1);
  font-size: var(--text-xl);
}

.trail__here {
  --soft-fill: var(--move);
  padding: 0.1rem var(--space-3);
  color: var(--on-accent);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.trail__title {
  margin-top: var(--space-2);
  font-weight: 700;
}

.trail__where {
  color: var(--muted);
}

.trail__notes {
  display: grid;
  gap: var(--space-2);
  margin-top: var(--space-3);
  color: var(--muted);
}

.trail__notes li {
  padding-left: var(--space-4);
  border-left: 2px solid var(--line);
}
</style>
