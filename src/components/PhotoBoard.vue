<!--
  PhotoBoard.vue — highlights: launch photos, and achievements as trophy cards
  =============================================================================
  Photos sit in soft frames. Achievements are drawn like the app's trophies: a gold pebble with the award mark.
-->
<script setup lang="ts">
import { achievements, photos, stations } from '../content'
import SignIcon from './SignIcon.vue'
import SoftShape from './SoftShape.vue'
import StationHeading from './StationHeading.vue'

const station = stations.find((item) => item.id === 'highlights')

// On the live site a photo without a file stays hidden; `npm run dev` shows its placeholder so you can see the slot.
const shown = photos.filter((photo) => photo.src || import.meta.env.DEV)
</script>

<template>
  <section id="highlights" class="section" aria-labelledby="highlights-title">
    <div class="wrap">
      <StationHeading
        heading-id="highlights-title"
        :station="station"
        title="Highlights"
        :intro="shown.length ? 'Launch days, awards and the people behind the apps.' : undefined"
      />

      <div class="board" :class="{ 'board--plain': !shown.length }">
        <SoftShape
          v-for="(photo, index) in shown"
          :key="photo.caption"
          tag="figure"
          class="photo"
          :radius="24"
          :seed="index + 80"
          :class="`photo--${photo.shape}`"
        >
          <div class="photo__frame">
            <img v-if="photo.src" :src="photo.src" :alt="photo.alt" loading="lazy" decoding="async" />
            <div v-else class="photo__empty">
              <SignIcon name="camera" :size="28" />
              <span>Photo to come</span>
            </div>
          </div>
          <figcaption class="photo__caption">{{ photo.caption }}</figcaption>
        </SoftShape>

        <ul class="trophies">
          <SoftShape v-for="(item, index) in achievements" :key="item.title" tag="li" class="trophy" :radius="24" :seed="index + 90">
            <SoftShape class="trophy__medal" shape="pebble" :seed="index + 3" :wobble="0.12" aria-hidden="true">
              <SignIcon name="award" :size="30" />
            </SoftShape>
            <div>
              <h3 class="trophy__name">{{ item.title }}</h3>
              <p class="trophy__from">{{ item.from }}</p>
            </div>
          </SoftShape>
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

/* Wide screens: fixed-height rows, so every frame lines up whatever photo it holds. */
@media (min-width: 48rem) {
  .board {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-auto-rows: 16rem;
    grid-auto-flow: dense;
  }

  .photo--landscape {
    grid-column: span 2;
  }

  .photo--portrait {
    grid-row: span 2;
  }

  .trophies {
    grid-column: 1 / -1;
  }

  .board--plain {
    grid-template-columns: minmax(0, 40rem);
    grid-auto-rows: auto;
  }
}

.photo {
  --soft-fill: var(--surface);
  --soft-stroke: var(--line);
  display: flex;
  flex-direction: column;
  padding: var(--space-3);
}

.photo__frame {
  flex: 1;
  min-height: 12rem;
  overflow: hidden;
  border-radius: var(--radius-tile);
  background: var(--board);
}

.photo__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo__empty {
  display: grid;
  place-content: center;
  justify-items: center;
  gap: var(--space-2);
  height: 100%;
  color: var(--muted);
  font-size: var(--text-sm);
  font-weight: 700;
}

.photo__caption {
  padding: var(--space-3) var(--space-2) var(--space-1);
  font-weight: 700;
}

.trophies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: var(--space-4);
}

.trophy {
  --soft-fill: var(--surface);
  --soft-stroke: var(--line);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
}

.trophy__medal {
  --soft-fill: var(--star);
  display: grid;
  flex: none;
  place-items: center;
  width: 4rem;
  height: 4rem;
  color: var(--on-accent);
}

.trophy__name {
  font-size: var(--text-lg);
}

.trophy__from {
  color: var(--muted);
}
</style>
