<script setup lang="ts">
import type { Project } from '../content'
import KomaCompanion from './KomaCompanion.vue'

// defineProps declares what the parent passes in, like a Flutter widget's final fields.
defineProps<{ project: Project }>()
</script>

<template>
  <article :id="project.id" class="card" :class="{ 'has-companion': project.companion }">
    <KomaCompanion v-if="project.companion" class="companion" />
    <p class="mono meta">
      <span v-for="(m, i) in project.meta" :key="m"><span v-if="i > 0" aria-hidden="true">· </span>{{ m }}</span>
    </p>
    <h3 class="name">{{ project.name }}</h3>
    <p class="tagline">{{ project.tagline }}</p>
    <p v-if="project.status" class="status mono">{{ project.status }}</p>

    <p v-if="project.summary" class="summary">{{ project.summary }}</p>
    <ul class="points">
      <li v-for="p in project.points" :key="p">{{ p }}</li>
    </ul>
    <p class="mono stack"><span class="label">Built with</span> {{ project.stack.join(' · ') }}</p>

    <!-- Screens scroll sideways when they do not fit; a project without screens simply ends here. -->
    <div
      v-if="project.screens.length"
      class="screens"
      tabindex="0"
      :aria-label="`${project.name} screenshots`"
      :style="{ '--per-row': project.screens.length <= 5 ? project.screens.length : Math.ceil(project.screens.length / 2) }"
    >
      <!-- Each screenshot sits in a simple drawn phone: a dark body, a thin bezel and a side button. -->
      <figure v-for="s in project.screens" :key="s.src" class="phone">
        <img :src="s.src" :alt="s.alt" width="540" height="1212" loading="lazy" decoding="async" />
      </figure>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  /* A grid item grows to fit its widest child unless told otherwise; the screen strip must scroll instead. */
  min-width: 0;
  border: 1px solid var(--hairline);
  border-radius: var(--radius-card);
  padding: 28px;
  background: var(--surface);
  transition: background var(--hover);
}
.card:hover {
  background: var(--surface-press);
}
.companion {
  position: absolute;
  top: 24px;
  right: 28px;
}
.has-companion .meta,
.has-companion .tagline {
  padding-right: 96px;
}
.meta {
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.6em;
  margin-bottom: 10px;
}
.meta > span {
  white-space: nowrap;
}
.name {
  font-size: 32px;
}
.tagline {
  color: var(--ink-2);
  margin-top: 4px;
}
.status {
  margin-top: 10px;
  color: var(--accent);
}
.status::before {
  content: '● ';
  font-size: 9px;
  vertical-align: 2px;
}
.summary {
  margin-top: 18px;
}
.points {
  margin: 16px 0 18px;
  padding-left: 18px;
}
.points li + li {
  margin-top: 6px;
}
.points li::marker {
  color: var(--ink-2);
}
.stack .label {
  color: var(--ink);
}
.screens {
  display: flex;
  gap: 16px;
  margin: 28px -28px -28px;
  padding: 4px 28px 32px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
}
.phone {
  flex: 0 0 auto;
  width: 168px;
  margin: 0;
  padding: 5px;
  background: var(--device);
  border-radius: 26px;
  position: relative;
  scroll-snap-align: start;
}
/* The side button, drawn as a thin bar on the phone's right edge. */
.phone::after {
  content: '';
  position: absolute;
  right: -2px;
  top: 22%;
  width: 2px;
  height: 11%;
  border-radius: 0 2px 2px 0;
  background: var(--device);
}
.phone img {
  width: 100%;
  height: auto;
  border-radius: 21px;
}

/* Wide screens: one row of up to five phones; six or more split into two even rows. */
@media (min-width: 700px) {
  .screens {
    flex-wrap: wrap;
    justify-content: center;
    overflow: visible;
    margin: 28px 0 0;
    padding: 0;
    gap: 24px 20px;
  }
  .phone {
    width: calc((100% - (var(--per-row) - 1) * 20px) / var(--per-row));
    max-width: 200px;
  }
}

@media (max-width: 600px) {
  .card {
    padding: 20px;
  }
  .name {
    font-size: 30px;
  }
  .has-companion .meta,
  .has-companion .tagline {
    padding-right: 64px;
  }
  .companion {
    top: 18px;
    right: 18px;
    width: 52px;
    height: auto;
  }
  .screens {
    margin: 24px -20px -20px;
    padding: 4px 20px 28px;
  }
  .phone {
    width: 150px;
    border-radius: 23px;
  }
  .phone img {
    border-radius: 18px;
  }
}
</style>
