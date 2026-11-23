<script setup lang="ts">
import type { Project } from '../content'

// defineProps declares what the parent passes in, like a Flutter widget's final fields.
defineProps<{ project: Project }>()
</script>

<template>
  <article :id="project.id" class="card">
    <p class="mono meta">
      <span v-for="(m, i) in project.meta" :key="m">{{ m }}<span v-if="i < project.meta.length - 1" aria-hidden="true"> · </span></span>
    </p>
    <h3 class="name">{{ project.name }}</h3>
    <p class="tagline">{{ project.tagline }}</p>
    <p v-if="project.status" class="status mono">{{ project.status }}</p>

    <p v-if="project.summary" class="summary">{{ project.summary }}</p>
    <ul class="points">
      <li v-for="p in project.points" :key="p">{{ p }}</li>
    </ul>
    <ul class="pills" aria-label="Built with">
      <li v-for="s in project.stack" :key="s" class="pill">{{ s }}</li>
    </ul>

    <!-- Screens scroll sideways when they do not fit; a project without screens simply ends here. -->
    <div v-if="project.screens.length" class="screens" tabindex="0" :aria-label="`${project.name} screenshots`">
      <img
        v-for="s in project.screens"
        :key="s.src"
        :src="s.src"
        :alt="s.alt"
        width="540"
        height="1212"
        loading="lazy"
        decoding="async"
      />
    </div>
  </article>
</template>

<style scoped>
.card {
  /* A grid item grows to fit its widest child unless told otherwise; the screen strip must scroll instead. */
  min-width: 0;
  border: 1px solid var(--hairline);
  border-radius: var(--radius-card);
  padding: 28px;
  background: var(--canvas);
  transition: background var(--hover);
}
.card:hover {
  background: var(--surface);
}
.meta {
  margin-bottom: 10px;
}
.meta > span {
  white-space: nowrap;
}
.name {
  font-size: 34px;
}
.tagline {
  color: var(--ink-2);
  margin-top: 4px;
}
.status {
  display: inline-block;
  margin-top: 12px;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  background: var(--accent-tint);
  color: var(--accent);
}
.summary {
  margin-top: 18px;
}
.points {
  margin: 16px 0 20px;
  padding-left: 18px;
}
.points li + li {
  margin-top: 6px;
}
.points li::marker {
  color: var(--ink-2);
}
.screens {
  display: flex;
  gap: 12px;
  margin: 24px -28px -28px;
  padding: 0 28px 28px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
}
.screens img {
  flex: 0 0 auto;
  width: 148px;
  height: auto;
  border: 1px solid var(--hairline);
  border-radius: var(--radius-control);
  scroll-snap-align: start;
}

/* Wide screens: all six slots in one row, so every project's screens share a size. */
@media (min-width: 700px) {
  .screens {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    overflow: visible;
    margin: 24px 0 0;
    padding: 0;
  }
  .screens img {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .card {
    padding: 20px;
  }
  .name {
    font-size: 30px;
  }
  .screens {
    margin: 20px -20px -20px;
    padding: 0 20px 20px;
  }
  .screens img {
    width: 136px;
  }
}
</style>
