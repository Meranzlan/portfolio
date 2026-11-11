<!--
  StationHero.vue — the first screen, laid out like FitXP's Today page
  =====================================================================
  Left: the greeting (where, the name, what I do, the pitch, the Email button). Right: the big wavy ring that holds
  Today's number in the app holds the portrait here, with Koma beside it and two app screens leaning on it.
-->
<script setup lang="ts">
import { journey, profile, projects } from '../content'
import { waveArc } from '../lib/shapes'
import DeviceFrame from './DeviceFrame.vue'
import KomaCompanion from './KomaCompanion.vue'
import SignIcon from './SignIcon.vue'
import SoftShape from './SoftShape.vue'

// The hero shows the first two phone screens that have a real screenshot, flagships first. When JAKIM Touch and
// i-Kredikom get theirs, they take these places on their own.
const heroPhones = projects
  .filter((project) => project.size === 'feature')
  .flatMap((project) =>
    project.screens.filter((screen) => screen.src && screen.device === 'phone').map((screen) => ({ app: project.name, screen })),
  )
  .slice(0, 2)

const portrait = profile.portrait
const nowAt = journey.find((stop) => stop.current)?.place

// The ring is drawn once on a 400 x 400 grid: a full wavy track, and a pale-blue arc over three quarters of it.
const track = waveArc(200, 200, 176, 2 * Math.PI, 4, 16)
const fill = waveArc(200, 200, 176, 1.5 * Math.PI, 4, 16)

const links = [
  { icon: 'download', label: 'CV', href: profile.cv, download: true },
  { icon: 'chat', label: 'WhatsApp', href: profile.whatsapp },
  { icon: 'linkedin', label: 'LinkedIn', href: profile.linkedin },
  { icon: 'code', label: 'GitHub', href: profile.github },
]
</script>

<template>
  <div class="hero wrap">
    <div class="hero__words">
      <p class="eyebrow hero__where"><SignIcon name="pin" :size="16" />{{ profile.location }}</p>
      <h1 class="hero__name">{{ profile.name }}</h1>
      <p class="hero__full">{{ profile.fullName }}</p>

      <p class="hero__status">
        <span v-if="nowAt" class="hero__now"><SignIcon name="star" :size="16" />Now at {{ nowAt }}</span>
        <span class="hero__next">Next stop: your team<SignIcon name="arrow-right" :size="16" /></span>
      </p>

      <p class="hero__role">{{ profile.role }}</p>
      <p class="hero__pitch">{{ profile.pitch }}</p>

      <div class="hero__actions">
        <SoftShape tag="a" class="email" :seed="3" :href="`mailto:${profile.email}`">
          <SignIcon name="mail" :size="22" />
          <span>Email me</span>
        </SoftShape>
        <ul class="hero__links">
          <li v-for="(link, index) in links" :key="link.label">
            <SoftShape
              tag="a"
              class="chip"
              :seed="index + 5"
              :href="link.href"
              :download="link.download ? '' : undefined"
              :target="link.download ? undefined : '_blank'"
              :rel="link.download ? undefined : 'noopener'"
            >
              <SignIcon :name="link.icon" :size="18" />{{ link.label }}
            </SoftShape>
          </li>
        </ul>
      </div>
    </div>

    <div class="hero__stage">
      <div class="orbit">
        <svg class="orbit__ring" viewBox="0 0 400 400" aria-hidden="true">
          <path class="orbit__track" :d="track" />
          <path class="orbit__fill" :d="fill" pathLength="1" />
        </svg>
        <SoftShape class="portrait" shape="pebble" :seed="11" :wobble="0.1">
          <img v-if="portrait.src" :src="portrait.src" :alt="portrait.alt" fetchpriority="high" />
          <div v-else class="portrait__empty" role="img" aria-label="Portrait to come">
            <SignIcon name="camera" :size="28" />
            <span class="portrait__label">Portrait to come</span>
          </div>
        </SoftShape>
        <KomaCompanion class="orbit__koma" :size="78" />
      </div>

      <div v-if="heroPhones.length" class="hero__phones">
        <DeviceFrame
          v-for="(phone, index) in heroPhones"
          :key="phone.screen.src"
          class="hero__phone"
          :class="`hero__phone--${index + 1}`"
          :screen="phone.screen"
          :app="phone.app"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  display: grid;
  gap: var(--space-7);
  padding-block: var(--space-7) var(--space-8);
}

@media (min-width: 64rem) {
  .hero {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    align-items: center;
    gap: var(--space-6);
    min-height: min(100svh, 50rem);
    padding-block: var(--space-7);
  }
}

/* ---------- The greeting ---------- */
.hero__where {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.hero__name {
  margin-top: var(--space-3);
  font-size: var(--text-display);
  line-height: 1;
  letter-spacing: -0.01em;
}

.hero__full {
  margin-top: var(--space-3);
  color: var(--muted);
}

/* Like the stars and streak line under the app's greeting */
.hero__status {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-5);
  margin-top: var(--space-4);
  font-size: var(--text-sm);
  font-weight: 700;
}

.hero__now,
.hero__next {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.hero__now {
  color: var(--star);
}

.hero__next {
  color: var(--accent);
}

.hero__role {
  margin-top: var(--space-6);
  font-size: var(--text-xl);
  font-weight: 700;
  line-height: 1.25;
}

.hero__pitch {
  max-width: 34rem;
  margin-top: var(--space-3);
  color: var(--muted);
  font-size: var(--text-lg);
  line-height: 1.6;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4) var(--space-5);
  margin-top: var(--space-6);
}

/* The one call to action, like the app's FitButton: a pale-blue soft pill with navy words. */
.email {
  --soft-fill: var(--accent);
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  min-height: 3.75rem;
  padding: 0 var(--space-6);
  color: var(--on-accent);
  font-size: var(--text-lg);
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.3s var(--spring);
}

.email:hover {
  --soft-fill: var(--accent-deep);
  transform: translateY(-2px);
}

.email:active {
  transform: scale(0.97);
}

.hero__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

/* Small outlined pills, like the app's category chips */
.chip {
  --soft-fill: var(--surface);
  --soft-stroke: var(--line);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  padding: 0 var(--space-4);
  font-size: var(--text-sm);
  font-weight: 700;
  text-decoration: none;
}

.chip:hover {
  --soft-fill: var(--raised);
  --soft-stroke: var(--accent);
}

@media (max-width: 30rem) {
  .email {
    justify-content: center;
    width: 100%;
  }
}

/* ---------- The ring ---------- */
.hero__stage {
  position: relative;
  padding-bottom: var(--space-6);
}

.orbit {
  position: relative;
  width: min(88%, 28rem);
  aspect-ratio: 1;
  margin-left: auto;
}

.orbit__ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.orbit__ring path {
  fill: none;
  stroke-linecap: round;
  stroke-width: 14;
}

.orbit__track {
  stroke: var(--track);
}

.orbit__fill {
  stroke: var(--accent);
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
}

/* The ring fills on arrival, at the app's fill speed. */
@media (prefers-reduced-motion: no-preference) {
  .orbit__fill {
    animation: ring-fill 1.4s 0.2s var(--ease) both;
  }

  @keyframes ring-fill {
    from {
      stroke-dashoffset: 1;
    }
  }
}

.portrait {
  --soft-fill: var(--surface);
  position: absolute;
  inset: 16%;
  display: grid;
  place-items: center;
}

/* With no photo yet, the label sits in the top right, clear of the phones that lean on the ring's lower left. */
.portrait:has(.portrait__empty) {
  place-items: start end;
  padding: 16% 12% 0 0;
}

.portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  clip-path: inset(0 round 46%);
}

.portrait__empty {
  display: grid;
  justify-items: center;
  gap: var(--space-2);
  color: var(--muted);
  font-size: var(--text-sm);
  font-weight: 700;
}

/* Koma stands on the ring's lower right, as it stands on the app's pages. */
.portrait__label {
  max-width: 5.5rem;
  text-align: center;
  line-height: 1.3;
}

.orbit__koma {
  position: absolute;
  right: 4%;
  bottom: -2%;
}

.hero__phones {
  position: absolute;
  left: var(--space-2);
  bottom: calc(-1 * var(--space-5));
  display: flex;
  align-items: flex-end;
}

.hero__phone {
  width: clamp(6rem, 3rem + 8vw, 9.5rem);
}

.hero__phone--1 {
  z-index: 2;
  transform: rotate(-6deg);
}

.hero__phone--2 {
  margin-left: -2rem;
  margin-bottom: 2.5rem;
  transform: rotate(5deg);
}

@media (min-width: 64rem) {
  .hero__phones {
    left: -4.5rem;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .hero__phone {
    animation: phone-in 0.9s var(--glide) both;
  }

  .hero__phone--2 {
    animation-delay: 0.12s;
  }

  @keyframes phone-in {
    from {
      translate: 0 1.5rem;
      opacity: 0;
    }
  }
}
</style>
