<!--
  ProjectPanel.vue — one shipped app, set out like a platform information panel
  ==============================================================================
  Words on the left (name, summary, the label grid, the highlights drawn as a branch line with stops);
  the app's screens on a pale blue lightbox on the right. `flip` swaps the sides for rhythm down the page.
-->
<script setup lang="ts">
import type { Project } from '../content'
import DeviceFrame from './DeviceFrame.vue'
import SignIcon from './SignIcon.vue'

const props = defineProps<{ project: Project; flip?: boolean }>()

// The browser frame's address bar shows the link without its scheme, e.g. "ikko.space".
const address = props.project.link?.href.replace(/^https?:\/\//, '')
</script>

<template>
  <article
    class="panel"
    :class="[`panel--${project.size}`, { 'panel--flip': flip, 'panel--wide': project.size === 'compact' && project.screens.length > 1 }]"
    :aria-labelledby="`${project.id}-name`"
  >
    <div class="panel__words">
      <h3 :id="`${project.id}-name`" class="panel__name">
        <span class="panel__bullet" aria-hidden="true">{{ project.code }}</span>
        <span>{{ project.name }}</span>
      </h3>
      <p class="panel__summary">{{ project.summary }}</p>

      <dl class="panel__facts">
        <div v-for="fact in project.facts" :key="fact.label" class="panel__fact">
          <dt>{{ fact.label }}</dt>
          <dd>{{ fact.value }}</dd>
        </div>
      </dl>

      <ul class="panel__branch">
        <li v-for="line in project.highlights" :key="line">{{ line }}</li>
      </ul>

      <p class="panel__stack">
        <span class="visually-hidden">Built with: </span>
        <span v-for="tool in project.stack" :key="tool" class="panel__tool">{{ tool }}</span>
      </p>

      <a v-if="project.link" class="panel__link" :href="project.link.href" target="_blank" rel="noopener">
        {{ project.link.label }}<SignIcon name="external" :size="18" />
      </a>
    </div>

    <div class="panel__lightbox">
      <DeviceFrame
        v-for="shot in project.screens"
        :key="shot.alt"
        class="panel__device"
        :class="`panel__device--${shot.device}`"
        :screen="shot"
        :app="project.name"
        :url="address"
      />
    </div>
  </article>
</template>

<style scoped>
.panel {
  display: grid;
  border-radius: var(--radius-sign);
  background: var(--panel);
  box-shadow: var(--shadow-sign);
  overflow: hidden;
}

.panel__words {
  padding: var(--space-6) var(--space-5);
}

.panel__name {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-2xl);
}

/* The app's stop roundel on the Shipped apps line */
.panel__bullet {
  display: inline-grid;
  flex: none;
  place-items: center;
  min-width: 2.75rem;
  height: 2.75rem;
  padding-inline: 0.5rem;
  border-radius: 999px;
  background: var(--line);
  color: var(--on-line);
  font-family: var(--font-code);
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.panel--feature .panel__name {
  font-size: var(--text-3xl);
}

.panel__summary {
  max-width: 38rem;
  margin-top: var(--space-3);
  color: var(--ink-2);
  font-size: var(--text-lg);
  line-height: 1.45;
}

/* The label grid: every project answers the same questions in the same places. */
.panel__facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
  margin-top: var(--space-5);
  border-top: 2px solid var(--ink);
}

.panel__fact {
  padding: var(--space-2) var(--space-4) var(--space-3) 0;
  border-bottom: 1px solid var(--rule);
}

.panel__fact dt {
  color: var(--ink-2);
  font-family: var(--font-code);
  font-size: 0.9375rem;
  font-weight: 600;
}

.panel__fact dd {
  font-weight: 700;
  line-height: 1.3;
}

/* Highlights as a branch line: a thin rail with a stop at each point. */
.panel__branch {
  position: relative;
  display: grid;
  gap: var(--space-3);
  margin-top: var(--space-5);
  padding-left: var(--space-6);
}

.panel__branch::before {
  content: '';
  position: absolute;
  top: 0.5rem;
  bottom: 0.5rem;
  left: 0.4375rem;
  width: 2px;
  background: var(--line-ahead);
}

.panel__branch li {
  position: relative;
  max-width: 40rem;
}

.panel__branch li::before {
  content: '';
  position: absolute;
  top: 0.5em;
  left: calc(-1 * var(--space-6) + 0.125rem);
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  background: var(--panel);
  box-shadow: 0 0 0 2px var(--ink);
}

.panel__stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1) var(--space-3);
  margin-top: var(--space-5);
  color: var(--ink-2);
  font-family: var(--font-code);
  font-size: 1rem;
  font-weight: 600;
}

.panel__tool:not(:last-child)::after {
  content: '';
  display: inline-block;
  width: 0.3rem;
  height: 0.3rem;
  margin-left: var(--space-3);
  border-radius: 50%;
  background: currentColor;
  vertical-align: middle;
}

.panel__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  margin-top: var(--space-4);
  color: var(--line-text);
  font-weight: 700;
}

/* The lightbox: a backlit pale-blue panel the screens stand in. */
.panel__lightbox {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-5);
  padding: var(--space-6) var(--space-5);
  background: var(--lightbox);
}

.panel__device--phone {
  width: clamp(8.5rem, 6rem + 10vw, 12.5rem);
}

.panel__device--browser {
  width: min(100%, 26rem);
}

.panel--feature .panel__device--phone:nth-child(2) {
  margin-top: var(--space-8);
}

@media (min-width: 56rem) {
  .panel {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  }

  .panel--flip {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  }

  .panel--flip .panel__lightbox {
    order: -1;
  }

  .panel__words {
    padding: var(--space-7);
  }

  .panel--compact:not(.panel--wide) {
    grid-template-columns: 1fr;
  }

  .panel--compact:not(.panel--wide) .panel__words {
    padding: var(--space-6);
  }

  .panel--compact:not(.panel--wide) .panel__lightbox {
    order: -1;
    padding-block: var(--space-6) 0;
    align-items: flex-end;
    overflow: hidden;
  }

  /* Compact phones are cropped by the lightbox floor, like a phone standing in a display case. */
  .panel--compact:not(.panel--wide) .panel__device--phone {
    width: 11rem;
    margin-bottom: -6rem;
  }

  .panel--wide .panel__lightbox {
    position: relative;
  }

  .panel--wide .panel__device--phone {
    position: absolute;
    right: var(--space-5);
    bottom: var(--space-5);
    width: 7.5rem;
  }

  .panel--wide .panel__device--browser {
    width: 100%;
    margin-right: var(--space-8);
  }
}
</style>
