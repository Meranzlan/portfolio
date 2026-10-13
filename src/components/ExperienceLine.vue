<!--
  ExperienceLine.vue — work and study as one line running down the page
  ======================================================================
  Newest first. The station you are at now wears the yellow "You are here" marker; the oldest stop ends the
  line with a buffer bar, the way a line map draws its terminus.
-->
<script setup lang="ts">
import { journey, stations } from '../content'
import StationHeading from './StationHeading.vue'

const station = stations.find((item) => item.id === 'experience')
</script>

<template>
  <section id="experience" class="station experience" aria-labelledby="experience-title">
    <div class="wrap">
      <StationHeading heading-id="experience-title" :code="station?.code ?? ''" title="Experience and education" />

      <ol class="line">
        <li v-for="stop in journey" :key="stop.place" class="line__stop" :class="{ 'line__stop--here': stop.current }">
          <p class="line__when nums">{{ stop.when }}</p>
          <span class="line__dot" aria-hidden="true" />
          <div class="line__body">
            <h3 class="line__place">
              {{ stop.place }}
              <span v-if="stop.current" class="line__here">You are here</span>
            </h3>
            <p class="line__title">{{ stop.title }}</p>
            <p class="line__where">{{ stop.where }}</p>
            <ul v-if="stop.notes.length" class="line__notes">
              <li v-for="note in stop.notes" :key="note">{{ note }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.experience {
  background: var(--panel);
  border-block: 1px solid var(--rule);
}

.line {
  --rail-x: 0.75rem;
  position: relative;
  display: grid;
  gap: var(--space-7);
  max-width: 62rem;
}

/* The rail, and the buffer bar that ends it under the oldest stop. */
.line::before,
.line::after {
  content: '';
  position: absolute;
  background: var(--line);
}

.line::before {
  top: 0.75rem;
  bottom: 0.25rem;
  left: calc(var(--rail-x) - 0.1875rem);
  width: 0.375rem;
  border-radius: 999px 999px 0 0;
}

.line::after {
  bottom: 0;
  left: calc(var(--rail-x) - 0.875rem);
  width: 1.75rem;
  height: 0.375rem;
  border-radius: 999px;
  background: var(--ink);
}

.line__stop {
  position: relative;
  display: grid;
  grid-template-columns: calc(var(--rail-x) * 2) minmax(0, 1fr);
  column-gap: var(--space-5);
  padding-bottom: var(--space-2);
}

.line__when {
  grid-column: 2;
  color: var(--ink-2);
  font-family: var(--font-code);
  font-size: 1.0625rem;
  font-weight: 600;
}

.line__dot {
  position: absolute;
  top: 0.25rem;
  left: calc(var(--rail-x) - 0.6875rem);
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 50%;
  background: var(--panel);
  box-shadow: inset 0 0 0 0.25rem var(--ink);
}

.line__stop--here .line__dot {
  background: var(--edge);
  box-shadow:
    inset 0 0 0 0.25rem var(--ink),
    0 0 0 0.375rem var(--panel);
}

.line__body {
  grid-column: 2;
}

.line__place {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-3);
  margin-top: var(--space-1);
  font-size: var(--text-2xl);
}

.line__here {
  padding: 0.3rem 0.6rem 0.25rem;
  border-radius: var(--radius-tile);
  background: var(--sign-dark);
  color: var(--edge);
  font-family: var(--font-code);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.line__title {
  margin-top: var(--space-2);
  font-size: var(--text-lg);
  font-weight: 600;
}

.line__where {
  color: var(--ink-2);
}

.line__notes {
  display: grid;
  gap: var(--space-2);
  max-width: 44rem;
  margin-top: var(--space-3);
  color: var(--ink-2);
}

/* Wide screens: dates get their own column to the left of the rail, like a timetable. */
@media (min-width: 48rem) {
  .line {
    --rail-x: 12.25rem;
  }

  .line__stop {
    grid-template-columns: 10.5rem minmax(0, 1fr);
    column-gap: calc(var(--space-7) + var(--space-2));
  }

  .line__when {
    grid-column: 1;
    grid-row: 1;
    padding-top: 0.6rem;
    text-align: right;
  }

  .line__dot {
    top: 0.65rem;
  }
}
</style>
