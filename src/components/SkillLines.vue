<!--
  SkillLines.vue — skills as a map legend: each group is a line, each skill a stop on it
-->
<script setup lang="ts">
import { skillLines, stations } from '../content'
import StationHeading from './StationHeading.vue'

const station = stations.find((item) => item.id === 'skills')
</script>

<template>
  <section id="skills" class="station" aria-labelledby="skills-title">
    <div class="wrap">
      <StationHeading heading-id="skills-title" :code="station?.code ?? ''" title="Skills" />

      <dl class="legend">
        <div v-for="group in skillLines" :key="group.name" class="legend__line">
          <dt class="legend__name">
            <span class="legend__swatch" aria-hidden="true" />
            {{ group.name }}
          </dt>
          <dd class="legend__stops">
            <ul>
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.legend {
  border-top: 2px solid var(--ink);
}

.legend__line {
  display: grid;
  gap: var(--space-2) var(--space-6);
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--rule);
}

.legend__name {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-lg);
  font-weight: 800;
}

/* A short length of line with a stop at each end: the legend swatch on a transit map. */
.legend__swatch {
  position: relative;
  flex: none;
  width: 2.25rem;
  height: 0.375rem;
  border-radius: 999px;
  background: var(--line);
}

.legend__swatch::before,
.legend__swatch::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: var(--panel);
  box-shadow: 0 0 0 2px var(--ink);
  transform: translateY(-50%);
}

.legend__swatch::before {
  left: -0.125rem;
}

.legend__swatch::after {
  right: -0.125rem;
}

.legend__stops ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1) var(--space-3);
  font-size: var(--text-lg);
}

/* The dot rides on the end of the item before it, so a wrapped line never starts with one. */
.legend__stops li:not(:last-child)::after {
  content: '';
  display: inline-block;
  width: 0.35rem;
  height: 0.35rem;
  margin-left: var(--space-3);
  border-radius: 50%;
  background: var(--ink-2);
  vertical-align: middle;
}

@media (min-width: 48rem) {
  .legend__line {
    grid-template-columns: 17rem minmax(0, 1fr);
    align-items: baseline;
    padding-block: var(--space-5);
  }

  .legend__name {
    align-self: center;
  }
}
</style>
