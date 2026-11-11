<!-- ProjectsSection.vue — the apps: the flagships full width, then the rest sharing rows. -->
<script setup lang="ts">
import { projects, stations } from '../content'
import ProjectPanel from './ProjectPanel.vue'
import StationHeading from './StationHeading.vue'

const station = stations.find((item) => item.id === 'apps')

// Flagships and any project with two screens (Ikko: web and phone) get a full-width card of their own;
// the remaining single-screen projects share a row, side by side.
const singles = projects.filter((project) => project.size === 'feature' || project.screens.length > 1)
const pairs = projects.filter((project) => project.size === 'compact' && project.screens.length <= 1)
</script>

<template>
  <section id="apps" class="section" aria-labelledby="apps-title">
    <div class="wrap">
      <StationHeading
        heading-id="apps-title"
        :station="station"
        title="Apps"
        intro="Government apps I built at Zen, and the projects I build on my own time."
      />

      <div class="apps">
        <ProjectPanel
          v-for="(project, index) in singles"
          :key="project.id"
          :project="project"
          :seed="index"
          :flip="index % 2 === 1"
        />
        <div v-if="pairs.length" class="apps__row">
          <ProjectPanel v-for="(project, index) in pairs" :key="project.id" :project="project" :seed="10 + index" />
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

@media (min-width: 56rem) {
  .apps__row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
