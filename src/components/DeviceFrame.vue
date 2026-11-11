<!--
  DeviceFrame.vue — a phone or browser window holding one screenshot
  ==================================================================
  With no `src` yet, the screen shows the app's name and "Screenshot to come" so the layout still reads finished.
  Screenshots: portrait phone captures (about 9 : 20, like FitXP's 412 x 915) and landscape browser captures (16 : 10) fit best.
-->
<script setup lang="ts">
import type { AppScreen } from '../content'
import SignIcon from './SignIcon.vue'

defineProps<{ screen: AppScreen; app: string; url?: string }>()

</script>

<template>
  <figure class="device" :class="`device--${screen.device}`">
    <div v-if="screen.device === 'browser'" class="device__bar" aria-hidden="true">
      <span class="device__lights"><i /><i /><i /></span>
      <span class="device__url">{{ url ?? app }}</span>
    </div>
    <div class="device__screen">
      <img v-if="screen.src" :src="screen.src" :alt="screen.alt" width="412" height="915" loading="lazy" decoding="async" />
      <div v-else class="device__placeholder" role="img" :aria-label="`${screen.alt}, screenshot to come`">
        <SignIcon :name="screen.device === 'phone' ? 'device' : 'code'" :size="22" />
        <span class="device__app">{{ app }}</span>
        <span class="device__note">Screenshot to come</span>
      </div>
    </div>
  </figure>
</template>

<style scoped>
.device {
  position: relative;
  background: var(--device);
  box-shadow: var(--shadow);
}

.device--phone {
  aspect-ratio: 412 / 915;
  /* A fixed bezel: a percentage here would be a share of the parent's width, not the phone's. */
  padding: clamp(0.3rem, 0.2rem + 0.4vw, 0.55rem);
  border-radius: 15% / 7%;
  outline: 1.5px solid var(--line);
  outline-offset: -1.5px;
}

.device--phone .device__screen {
  height: 100%;
  border-radius: 11% / 5%;
}

.device--browser {
  border-radius: var(--radius-tile);
  overflow: hidden;
  outline: 1.5px solid var(--line);
  outline-offset: -1.5px;
}

.device__bar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0.55rem var(--space-3);
}

.device__lights {
  display: flex;
  gap: 0.35rem;
}

.device__lights i {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--line);
}

.device__url {
  flex: 1;
  padding: 0.2rem var(--space-3);
  border-radius: 999px;
  background: var(--device-bar);
  color: var(--muted);
  font-size: var(--text-xs);
  text-align: center;
}

.device--browser .device__screen {
  aspect-ratio: 16 / 10;
}

.device__screen {
  position: relative;
  overflow: hidden;
  background: var(--bg);
  /* Lets the placeholder lettering size itself to the screen it sits in. */
  container-type: inline-size;
}

.device__screen img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.device__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  height: 100%;
  padding: var(--space-3);
  background: var(--surface);
  color: var(--muted);
  text-align: center;
}

.device__app {
  color: var(--ink);
  font-family: var(--font-serif);
  font-size: clamp(0.75rem, 10cqi, 1.15rem);
  line-height: 1.15;
  /* Keeps names like "i-Kredikom" whole when the placeholder lettering wraps. */
  white-space: nowrap;
}

.device__note {
  font-size: clamp(0.625rem, 8cqi, 0.8125rem);
  font-weight: 700;
}
</style>
