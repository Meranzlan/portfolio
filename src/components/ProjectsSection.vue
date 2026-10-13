<!-- ProjectsSection.vue — the shipped apps: the two flagships full width, then the rest sharing rows. -->
<script setup lang="ts">
import { projects, stations } from '../content'
import ProjectPanel from './ProjectPanel.vue'
import StationHeading from './StationHeading.vue'

const station = stations.find((item) => item.id === 'apps')
// Flagships and any project with two screens (Ikko: web and phone) get a full-width stop of their own;
// the remaining single-screen projects share the last stop, side by side.
const singles = projects.filter((project) => project.size === 'feature' || project.screens.length > 1)
const pairs = projects.filter((project) => project.size === 'compact' && project.screens.length <= 1)
</script>

<template>
  <section id="apps" class="station" aria-labelledby="apps-title">
    <div class="wrap">
      <StationHeading
        heading-id="apps-title"
        :code="station?.code ?? ''"
        title="Shipped apps"
        intro="Government apps I built at Zen, and the projects I build on my own time."
      />

      <!-- One line runs down the margin: a stop beside every full-width app, and one for the row of smaller apps. -->
      <div class="apps">
        <div v-for="(project, index) in singles" :key="project.id" class="apps__stop">
          <ProjectPanel :project="project" :flip="project.size === 'feature' && index % 2 === 1" />
        </div>

        <div v-if="pairs.length" class="apps__stop">
          <div class="apps__row">
            <ProjectPanel v-for="project in pairs" :key="project.id" :project="project" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.apps {
  display: grid;
  gap: var(--space-6);
}

.apps__row {
  display: grid;
  gap: var(--space-6);
}

/* Wide screens: the line in the left margin, a stop beside each panel, segments joining stop to stop. */
@media (min-width: 64rem) {
  .apps {
    --rail-x: 1.25rem;
    --stop-y: 4.25rem;
    padding-left: 3.75rem;
  }

  .apps__stop {
    position: relative;
  }

  .apps__stop::before,
  .apps__stop:not(:last-child)::after {
    content: '';
    position: absolute;
    left: calc(var(--rail-x) - 3.75rem);
  }

  .apps__stop::before {
    z-index: 1;
    top: var(--stop-y);
    width: 1.375rem;
    height: 1.375rem;
    border-radius: 50%;
    background: var(--panel);
    box-shadow: inset 0 0 0 0.25rem var(--ink);
    transform: translate(-50%, -50%);
  }

  .apps__stop:not(:last-child)::after {
    top: var(--stop-y);
    width: 0.375rem;
    /* Every stop sits at the same height in its block, so a segment is one block plus the gap. */
    height: calc(100% + var(--space-6));
    border-radius: 999px;
    background: var(--line);
    transform: translateX(-50%);
  }
}

@media (min-width: 56rem) {
  .apps__row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
