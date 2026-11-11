<!--
  StationHeading.vue — a section's title, with its number in the app's numeral face and a wavy underline
-->
<script setup lang="ts">
import type { Station } from '../content'

defineProps<{ station?: Station; title: string; headingId: string; intro?: string }>()
</script>

<template>
  <div class="heading" :style="station ? { '--tint': `var(--${station.tint})` } : undefined">
    <h2 :id="headingId" class="heading__title">
      <span v-if="station" class="heading__code nums" aria-hidden="true">{{ station.code }}</span>
      <span>{{ title }}</span>
    </h2>
    <svg class="heading__wave" viewBox="0 0 120 10" aria-hidden="true" preserveAspectRatio="none">
      <path d="M2 5C10 1 16 1 24 5S38 9 46 5 60 1 68 5 82 9 90 5 104 1 118 5" />
    </svg>
    <p v-if="intro" class="heading__intro">{{ intro }}</p>
  </div>
</template>

<style scoped>
.heading {
  --tint: var(--accent);
  margin-bottom: var(--space-7);
}

.heading__title {
  display: flex;
  align-items: baseline;
  gap: var(--space-4);
  font-size: var(--text-3xl);
}

.heading__code {
  color: var(--tint);
  font-family: var(--font-numeral);
  font-size: 1.15em;
  font-weight: 400;
  line-height: 1;
}

/* The squiggle under a title, like the wavy HP line under a boss's name in the app */
.heading__wave {
  display: block;
  width: 7.5rem;
  height: 0.75rem;
  margin-top: var(--space-3);
  overflow: visible;
}

.heading__wave path {
  fill: none;
  stroke: var(--tint);
  stroke-width: 2.5;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}

.heading__intro {
  max-width: 40rem;
  margin-top: var(--space-4);
  color: var(--muted);
  font-size: var(--text-lg);
  line-height: 1.55;
}
</style>
