<!--
  PhotoBoard.vue — photos in station lightboxes, beside the achievements plaque
  ==============================================================================
  Add photos in content.ts. `shape` decides the lightbox: landscape spans two columns, portrait two rows.
  Until a photo has a `src`, its lightbox shows the caption and "Photo to come".
-->
<script setup lang="ts">
import { achievements, photos, stations } from '../content'
import SignIcon from './SignIcon.vue'
import StationHeading from './StationHeading.vue'

const station = stations.find((item) => item.id === 'highlights')

// On the live site a photo without a file stays hidden; `npm run dev` shows its placeholder so you can see the slot.
const shown = photos.filter((photo) => photo.src || import.meta.env.DEV)
</script>

<template>
  <section id="highlights" class="station" aria-labelledby="highlights-title">
    <div class="wrap">
      <StationHeading
        heading-id="highlights-title"
        :code="station?.code ?? ''"
        title="Highlights"
        :intro="shown.length ? 'Launch days, awards and the people behind the apps.' : undefined"
      />

      <div class="board" :class="{ 'board--plain': !shown.length }">
        <figure v-for="photo in shown" :key="photo.caption" class="lightbox" :class="`lightbox--${photo.shape}`">
          <div class="lightbox__frame">
            <img v-if="photo.src" :src="photo.src" :alt="photo.alt" loading="lazy" decoding="async" />
            <div v-else class="lightbox__empty">
              <SignIcon name="camera" :size="28" />
              <span>Photo to come</span>
            </div>
          </div>
          <figcaption class="lightbox__caption">{{ photo.caption }}</figcaption>
        </figure>

        <ul class="plaque">
          <li v-for="item in achievements" :key="item.title" class="plaque__item">
            <SignIcon name="award" :size="32" class="plaque__icon" />
            <h3 class="plaque__name">{{ item.title }}</h3>
            <p class="plaque__from">{{ item.from }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.board {
  display: grid;
  gap: var(--space-5);
}

/* Wide screens: fixed-height rows, so every lightbox lines up whatever photo it holds. */
@media (min-width: 48rem) {
  .board {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-auto-rows: 15rem;
    grid-auto-flow: dense;
  }

  .lightbox--landscape .lightbox__frame > *,
  .lightbox--portrait .lightbox__frame > *,
  .lightbox--square .lightbox__frame > * {
    aspect-ratio: auto;
  }

  .lightbox__frame {
    min-height: 0;
  }

  .lightbox--landscape {
    grid-column: span 2;
  }

  .lightbox--portrait {
    grid-row: span 2;
  }

  .plaque {
    grid-column: 1 / -1;
  }

  .board--plain {
    grid-template-columns: minmax(0, 40rem);
    grid-auto-rows: auto;
  }
}

.lightbox {
  display: flex;
  flex-direction: column;
}

/* The aluminium frame of a backlit platform lightbox */
.lightbox__frame {
  flex: 1;
  padding: 0.625rem;
  border-radius: var(--radius-tile);
  background: var(--alu);
  box-shadow: var(--shadow-sign);
}

.lightbox__frame > * {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}

.lightbox--landscape .lightbox__frame > * {
  aspect-ratio: 16 / 10;
}

.lightbox--portrait .lightbox__frame > * {
  aspect-ratio: 4 / 5;
}

.lightbox--square .lightbox__frame > * {
  aspect-ratio: 1;
}

.lightbox__frame img {
  object-fit: cover;
}

.lightbox__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  background: var(--screen);
  color: var(--ink-2);
  font-family: var(--font-code);
  font-size: 1rem;
  font-weight: 600;
}

.lightbox__caption {
  margin-top: var(--space-3);
  font-weight: 700;
}

.plaque {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: var(--space-5);
  align-self: start;
  padding: var(--space-5) var(--space-6);
  border-radius: var(--radius-sign);
  background: var(--panel);
  box-shadow: var(--shadow-sign);
}

.plaque__item {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: var(--space-4);
  align-items: center;
}

.plaque__icon {
  grid-row: span 2;
  color: var(--line-text);
}

.plaque__name {
  font-size: var(--text-2xl);
}

.plaque__from {
  color: var(--ink-2);
  font-size: var(--text-lg);
}
</style>
