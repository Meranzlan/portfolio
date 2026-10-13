<!--
  StationHero.vue — the first viewport: a station name board, and a blue field with you and your apps
  ====================================================================================================
  Left: the white enamel board (name, role, pitch, the Email sign). Right: the line-blue field with the
  portrait and the two flagship apps' phones, which overlap the board's edge.
-->
<script setup lang="ts">
import { journey, profile, projects } from '../content'
import DeviceFrame from './DeviceFrame.vue'
import SignIcon from './SignIcon.vue'

// The two featured apps lead the hero; each contributes its first screenshot.
const heroPhones = projects
  .filter((project) => project.size === 'feature')
  .flatMap((project) => (project.screens[0] ? [{ app: project.name, screen: project.screens[0] }] : []))
  .slice(0, 2)

const portrait = profile.portrait
const nowAt = journey.find((stop) => stop.current)?.place
</script>

<template>
  <div class="hero">
    <div class="hero__grid wrap">
      <div class="board">
        <div class="board__top">
          <span class="board__bullet" aria-hidden="true">IA</span>
          <span class="board__where"><SignIcon name="pin" :size="18" />{{ profile.location }}</span>
        </div>

        <h1 class="board__name">{{ profile.name }}</h1>
        <p class="board__full">{{ profile.fullName }}</p>

        <!-- The board's line band, as on a platform name sign: where you are, and the next stop. -->
        <div class="board__band">
          <span v-if="nowAt" class="board__band-now">Now at {{ nowAt }}</span>
          <span class="board__band-next">Next stop: your team<SignIcon name="arrow-right" :size="18" /></span>
        </div>

        <p class="board__role">{{ profile.role }}</p>
        <p class="board__pitch">{{ profile.pitch }}</p>

        <div class="board__actions">
          <a class="email-sign" :href="`mailto:${profile.email}`">
            <span class="email-sign__label">Email me</span>
            <span class="email-sign__arrow"><SignIcon name="arrow-right" :size="26" /></span>
          </a>
          <ul class="board__links">
            <li>
              <a :href="profile.cv" download><SignIcon name="download" :size="18" />Download CV</a>
            </li>
            <li>
              <a :href="profile.whatsapp" target="_blank" rel="noopener"><SignIcon name="chat" :size="18" />WhatsApp</a>
            </li>
            <li>
              <a :href="profile.linkedin" target="_blank" rel="noopener"><SignIcon name="linkedin" :size="18" />LinkedIn</a>
            </li>
            <li>
              <a :href="profile.github" target="_blank" rel="noopener"><SignIcon name="code" :size="18" />GitHub</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="field">
        <figure class="portrait" :class="portrait.src && portrait.cutout ? 'portrait--cutout' : 'portrait--framed'">
          <img v-if="portrait.src" :src="portrait.src" :alt="portrait.alt" fetchpriority="high" />
          <!-- Until the photo arrives, the lightbox shows where it goes, at the size it will hang. -->
          <div v-else class="portrait__empty" role="img" aria-label="Portrait to come">
            <SignIcon name="camera" :size="30" />
            <span>Portrait to come</span>
          </div>
        </figure>

        <div class="field__phones">
          <DeviceFrame
            v-for="(phone, index) in heroPhones"
            :key="phone.app"
            class="field__phone"
            :class="`field__phone--${index + 1}`"
            :screen="phone.screen"
            :app="phone.app"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  padding-block: var(--space-5) var(--space-7);
}

.hero__grid {
  display: grid;
  gap: var(--space-5);
}

@media (min-width: 64rem) {
  .hero {
    padding-block: var(--space-6) var(--space-8);
  }

  .hero__grid {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    gap: 0;
    min-height: min(calc(100svh - var(--strip-h) - var(--space-6) - var(--space-8)), 50rem);
  }
}

/* ---------- The name board ---------- */

.board {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: var(--space-5) var(--space-5) var(--space-6);
  border-radius: var(--radius-sign);
  background: var(--panel);
  box-shadow: var(--shadow-sign);
}

@media (min-width: 64rem) {
  .board {
    justify-content: center;
    padding: var(--space-7) var(--space-8) var(--space-7) var(--space-7);
    border-radius: var(--radius-sign) 0 0 var(--radius-sign);
  }
}

.board__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

/* The line bullet: the roundel a line wears on every map */
.board__bullet {
  display: grid;
  place-items: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  background: var(--line);
  color: var(--on-line);
  font-family: var(--font-code);
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.board__where {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--ink-2);
  font-weight: 600;
}

.board__name {
  font-size: var(--text-display);
  line-height: 0.92;
  letter-spacing: -0.03em;
}

.board__full {
  margin-top: var(--space-3);
  color: var(--ink-2);
  font-size: var(--text-base);
}

/* The band bleeds to both edges of the board, like the line stripe on a station name sign. */
.board__band {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-1) var(--space-4);
  margin: var(--space-5) calc(-1 * var(--space-5));
  padding: var(--space-2) var(--space-5);
  background: var(--line);
  color: var(--on-line);
  font-family: var(--font-code);
  font-size: 1.0625rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}

@media (min-width: 64rem) {
  /* The right padding keeps "Next stop" clear of the phones that step over the seam. */
  .board__band {
    margin-inline: calc(-1 * var(--space-7)) calc(-1 * var(--space-8));
    padding-inline: var(--space-7) calc(var(--space-8) + clamp(3rem, 6vw, 6rem));
  }
}

.board__band-now {
  color: var(--line-pale);
}

.board__band-next {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.board__role {
  font-size: var(--text-xl);
  font-weight: 700;
  line-height: 1.2;
}

.board__pitch {
  max-width: 34rem;
  margin-top: var(--space-3);
  color: var(--ink-2);
  font-size: var(--text-lg);
  line-height: 1.5;
}

.board__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-5) var(--space-6);
  margin-top: var(--space-6);
}

/* The Email sign: a blue wayfinding panel with its arrow tile, the one primary action. */
.email-sign {
  display: inline-flex;
  align-items: stretch;
  min-height: 4rem;
  border-radius: var(--radius-sign);
  background: var(--line);
  color: var(--on-line);
  font-size: var(--text-xl);
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 1px 2px rgb(13 27 46 / 0.2), 0 12px 24px -12px var(--line);
  transition:
    background-color 0.2s var(--ease-out),
    transform 0.2s var(--ease-out);
}

.email-sign__label {
  display: flex;
  align-items: center;
  padding: 0 var(--space-6);
}

.email-sign__arrow {
  display: grid;
  place-items: center;
  width: 4rem;
  margin: 0.375rem;
  border-radius: var(--radius-tile);
  background: var(--panel);
  color: var(--line-text);
  transition: transform 0.3s var(--ease-out);
}

.email-sign:hover {
  background: var(--line-strong);
}

.email-sign:hover .email-sign__arrow {
  transform: translateX(0.25rem);
}

.email-sign:active {
  transform: translateY(1px);
}

.board__links {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: var(--space-2) var(--space-5);
  font-weight: 600;
}

.board__links a {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  color: var(--ink);
  text-decoration-color: var(--rule);
}

.board__links a:hover {
  color: var(--line-text);
  text-decoration-color: currentColor;
}

@media (max-width: 30rem) {
  .board__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .email-sign {
    justify-content: space-between;
  }

  .board__links {
    gap: 0 var(--space-4);
  }
}

/* ---------- The blue field ---------- */

.field {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  min-height: 30rem;
  padding: var(--space-5);
  border-radius: var(--radius-sign);
  background: var(--line);
  overflow: hidden;
}

@media (min-width: 64rem) {
  .field {
    min-height: 0;
    border-radius: 0 var(--radius-sign) var(--radius-sign) 0;
    overflow: visible;
  }
}

/* Portrait: a cut-out stands on the field and breaks out of its top; a normal photo hangs in a lightbox. */
.portrait {
  position: absolute;
  inset: auto var(--space-5) 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 92%;
  width: 62%;
}

.portrait--cutout img {
  height: 108%;
  width: auto;
  max-width: none;
  object-fit: contain;
  object-position: bottom;
  filter: drop-shadow(0 18px 30px rgb(6 16 48 / 0.45));
}

.portrait--framed {
  inset: var(--space-6) var(--space-6) auto auto;
  height: auto;
  width: min(62%, 22rem);
  padding: 0.6rem;
  border-radius: var(--radius-tile);
  background: var(--alu);
  box-shadow: var(--shadow-lift);
}

.portrait--framed img {
  object-fit: cover;
}

.portrait--framed > * {
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 2px;
}

/* The label sits high in the frame, clear of the phones that overlap its lower half. */
.portrait__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 22%;
  gap: var(--space-2);
  background: var(--screen);
  color: var(--ink-2);
  font-family: var(--font-code);
  font-size: 1rem;
  font-weight: 600;
}

.field__phones {
  position: absolute;
  left: var(--space-5);
  bottom: var(--space-6);
  display: flex;
  align-items: flex-end;
}

@media (min-width: 64rem) {
  /* On wide screens the phones step over the seam between board and field. */
  .field__phones {
    left: calc(-1 * clamp(3rem, 6vw, 6rem));
    bottom: var(--space-7);
  }
}

.field__phone {
  width: clamp(7.5rem, 5rem + 8vw, 11rem);
}

.field__phone--1 {
  z-index: 2;
  transform: rotate(-5deg);
}

.field__phone--2 {
  margin-left: -1.75rem;
  margin-bottom: 2.5rem;
  transform: rotate(4deg);
}

@media (prefers-reduced-motion: no-preference) {
  .field__phone {
    animation: phone-in 0.9s var(--ease-out) both;
  }

  .field__phone--2 {
    animation-delay: 0.12s;
  }

  @keyframes phone-in {
    from {
      translate: 0 1.5rem;
    }
    to {
      translate: 0 0;
    }
  }
}
</style>
