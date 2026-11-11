<!--
  SkillLines.vue — what I work with, one soft card per group, each in a place colour
-->
<script setup lang="ts">
import { skillLines, stations, type Tint } from '../content'
import SoftShape from './SoftShape.vue'
import StationHeading from './StationHeading.vue'

const station = stations.find((item) => item.id === 'skills')
const tints: Tint[] = ['water', 'move', 'looks', 'food', 'star', 'you', 'weight']
</script>

<template>
  <section id="skills" class="section" aria-labelledby="skills-title">
    <div class="wrap">
      <StationHeading heading-id="skills-title" :station="station" title="Skills" />

      <dl class="groups">
        <SoftShape
          v-for="(group, index) in skillLines"
          :key="group.name"
          class="group"
          :radius="24"
          :seed="index + 60"
          :style="{ '--tint': `var(--${tints[index % tints.length]})` }"
        >
          <dt class="group__name">
            <SoftShape tag="span" class="group__dot" shape="pebble" :seed="index * 3" aria-hidden="true" />
            {{ group.name }}
          </dt>
          <dd>
            <ul class="group__items">
              <SoftShape v-for="(item, n) in group.items" :key="item" tag="li" class="group__item" :seed="n + index">
                {{ item }}
              </SoftShape>
            </ul>
          </dd>
        </SoftShape>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.groups {
  display: grid;
  gap: var(--space-4);
}

@media (min-width: 48rem) {
  .groups {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 72rem) {
  .groups {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.group {
  --soft-fill: var(--surface);
  --soft-stroke: var(--line);
  padding: var(--space-5);
}

.group__name {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 700;
}

.group__dot {
  --soft-fill: var(--tint);
  display: block;
  flex: none;
  width: 1.1rem;
  height: 1.1rem;
}

.group__items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.group__item {
  --soft-fill: var(--raised);
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-sm);
  font-weight: 500;
}
</style>
