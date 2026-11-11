<!--
  ProjectPanel.vue — one app, on a soft card like the app's own
  ==============================================================
  Words (a pebble badge, the name, a summary, facts as small tracker tiles, highlights, the stack as chips) and the
  app's screens standing on a dotted tray, the way Today's plates stand on the app's board.
  Layouts: two screens or fewer sit beside the words (`flip` swaps the sides); more screens get a tray across the
  whole card that scrolls sideways on a phone.
-->
<script setup lang="ts">
import type { Project } from '../content'
import DeviceFrame from './DeviceFrame.vue'
import SignIcon from './SignIcon.vue'
import SoftShape from './SoftShape.vue'

const props = withDefaults(defineProps<{ project: Project; flip?: boolean; seed?: number }>(), { flip: false, seed: 0 })

// The browser frame's address bar shows the link without its scheme, e.g. "ikko.space".
const address = props.project.link?.href.replace(/^https?:\/\//, '')
const gallery = props.project.screens.length > 2
const compact = props.project.size === 'compact' && props.project.screens.length <= 1
</script>

<template>
  <SoftShape
    tag="article"
    class="panel"
    :radius="28"
    :seed="seed"
    :class="{ 'panel--flip': flip && !gallery, 'panel--gallery': gallery, 'panel--compact': compact, 'panel--side': !gallery && !compact }"
    :style="{ '--tint': `var(--${project.tint})` }"
    :aria-labelledby="`${project.id}-name`"
  >
    <div class="panel__words">
      <div class="panel__head">
        <SoftShape class="panel__badge" shape="pebble" :seed="seed + 30" aria-hidden="true">{{ project.code }}</SoftShape>
        <h3 :id="`${project.id}-name`" class="panel__name">{{ project.name }}</h3>
      </div>
      <p class="panel__summary">{{ project.summary }}</p>

      <dl class="panel__facts">
        <SoftShape v-for="(fact, index) in project.facts" :key="fact.label" class="panel__fact" :radius="18" :seed="seed + index">
          <dt>{{ fact.label }}</dt>
          <dd>{{ fact.value }}</dd>
        </SoftShape>
      </dl>

      <ul class="panel__highlights">
        <li v-for="line in project.highlights" :key="line">
          <SignIcon name="star" :size="15" class="panel__star" />
          <span>{{ line }}</span>
        </li>
      </ul>

      <ul class="panel__stack">
        <li class="visually-hidden">Built with:</li>
        <SoftShape v-for="(tool, index) in project.stack" :key="tool" tag="li" class="panel__tool" :seed="seed + index * 2">
          {{ tool }}
        </SoftShape>
      </ul>

      <a v-if="project.link" class="panel__link" :href="project.link.href" target="_blank" rel="noopener">
        {{ project.link.label }}<SignIcon name="external" :size="18" />
      </a>
    </div>

    <div class="panel__tray">
      <div class="panel__screens">
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
      <img
        v-if="project.banner"
        class="panel__banner"
        :src="project.banner.src"
        :alt="project.banner.alt"
        loading="lazy"
        decoding="async"
      />
    </div>
  </SoftShape>
</template>

<style scoped>
.panel {
  --soft-fill: var(--surface);
  --soft-stroke: var(--line);
  display: grid;
  padding: var(--space-3);
}

.panel__words {
  padding: var(--space-5) var(--space-4) var(--space-6);
}

.panel__head {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

/* The project's pebble, in its own colour, like a place on the app's dial */
.panel__badge {
  --soft-fill: var(--tint);
  display: grid;
  flex: none;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  color: var(--on-accent);
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.04em;
}

.panel__name {
  font-size: var(--text-2xl);
}

.panel--gallery .panel__name,
.panel--side .panel__name {
  font-size: var(--text-3xl);
}

.panel__summary {
  max-width: 40rem;
  margin-top: var(--space-4);
  color: var(--muted);
  font-size: var(--text-lg);
  line-height: 1.55;
}

/* Facts as small tiles, like the water, weight and steps trackers on Today */
.panel__facts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
  gap: var(--space-2);
  margin-top: var(--space-5);
}

.panel__fact {
  --soft-fill: var(--raised);
  padding: var(--space-3) var(--space-4);
}

.panel__fact dt {
  color: var(--muted);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.panel__fact dd {
  font-weight: 700;
  line-height: 1.35;
}

.panel__highlights {
  display: grid;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

.panel__highlights li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-3);
  max-width: 42rem;
}

.panel__star {
  margin-top: 0.3rem;
  color: var(--tint);
  fill: currentColor;
}

/* The stack as chips, like the app's category pills */
.panel__stack {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: start;
  gap: var(--space-2);
  margin-top: var(--space-5);
}

.panel__tool {
  --soft-fill: transparent;
  --soft-stroke: var(--line);
  padding: var(--space-1) var(--space-4);
  color: var(--muted);
  font-size: var(--text-sm);
  font-weight: 700;
}

.panel__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  margin-top: var(--space-4);
  color: var(--accent);
  font-weight: 700;
}

/* ---------- The tray the screens stand on: the app's board, a navy tray with a dot grid ---------- */
.panel__tray {
  display: grid;
  gap: var(--space-5);
  padding: var(--space-6) var(--space-4);
  border-radius: calc(var(--radius-card) - var(--space-2));
  background:
    radial-gradient(circle, var(--board-dot) 1.5px, transparent 1.6px) 0 0 / 1.25rem 1.25rem,
    var(--board);
}

.panel__screens {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-5);
}

.panel__device--phone {
  flex: none;
  width: clamp(8.5rem, 6rem + 10vw, 12rem);
}

.panel__device--browser {
  width: min(100%, 28rem);
}

/* A web app's phone is the smaller, second screen beside its browser window. */
.panel__screens:has(.panel__device--browser) .panel__device--phone {
  width: 6.5rem;
}

.panel__device--browser {
  flex: 1;
}

.panel--side .panel__device--phone:nth-child(2) {
  margin-top: var(--space-8);
}

.panel__banner {
  justify-self: center;
  width: min(100%, 44rem);
  height: auto;
  border-radius: var(--radius-tile);
}

/* A gallery tray scrolls sideways on narrow screens, snapping phone by phone, like Today's pages. */
.panel--gallery .panel__screens {
  justify-content: flex-start;
  margin-inline: calc(-1 * var(--space-4));
  padding: var(--space-2) var(--space-4) var(--space-4);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
}

.panel--gallery .panel__device--phone {
  width: clamp(9.5rem, 7rem + 9vw, 13rem);
  scroll-snap-align: center;
}

.panel--gallery .panel__device--phone:nth-child(even) {
  margin-top: var(--space-7);
}

@media (min-width: 64rem) {
  .panel--gallery .panel__screens {
    justify-content: center;
    overflow: visible;
  }

  .panel--gallery .panel__words {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    column-gap: var(--space-7);
  }

  .panel--gallery .panel__head,
  .panel--gallery .panel__summary,
  .panel--gallery .panel__facts {
    grid-column: 1;
  }

  .panel--gallery .panel__highlights {
    grid-column: 2;
    grid-row: 1 / span 4;
    align-self: start;
    margin-top: 0;
  }

  .panel--gallery .panel__stack {
    grid-column: 1;
  }
}

@media (min-width: 56rem) {
  .panel__words {
    padding: var(--space-6);
  }

  .panel--side {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    gap: var(--space-3);
  }

  .panel--side.panel--flip {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  }

  .panel--flip .panel__tray {
    order: -1;
  }

  .panel--side .panel__tray {
    align-content: center;
  }

  /* Ikko: the browser fills the tray and its phone leans on the corner. */
  .panel--side .panel__screens:has(.panel__device--browser) {
    position: relative;
    padding-right: var(--space-7);
  }

  .panel--side .panel__screens:has(.panel__device--browser) .panel__device--phone {
    position: absolute;
    right: 0;
    bottom: calc(-1 * var(--space-4));
    width: 7rem;
    margin: 0;
  }

  .panel--side .panel__device--browser {
    width: 100%;
  }
}

/* Compact cards: the single phone rises out of the tray at the top, cropped by its floor. */
.panel--compact .panel__tray {
  order: -1;
  padding-bottom: 0;
  overflow: hidden;
  max-height: 16rem;
}

.panel--compact .panel__device--phone {
  width: 10.5rem;
}
</style>
