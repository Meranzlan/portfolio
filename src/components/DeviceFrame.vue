<!--
  DeviceFrame.vue — a phone or browser window holding one screenshot
  ==================================================================
  With no `src` yet, the screen shows the app's name and "Screenshot to come" so the layout still reads finished.
  Screenshots: portrait phone captures (about 9 : 19.5) and landscape browser captures (16 : 10) fit best.
-->
<script setup lang="ts">
import type { AppScreen } from '../content'
import SignIcon from './SignIcon.vue'

const props = defineProps<{ screen: AppScreen; app: string; url?: string }>()

// A non-breaking hyphen keeps names like "i-Kredikom" whole when the placeholder lettering wraps.
const appName = props.app.replace(/-/g, '\u2011')
</script>

<template>
  <figure class="device" :class="`device--${screen.device}`">
    <div v-if="screen.device === 'browser'" class="device__bar" aria-hidden="true">
      <span class="device__lights"><i /><i /><i /></span>
      <span class="device__url">{{ url ?? app }}</span>
    </div>
    <div class="device__screen">
      <img v-if="screen.src" :src="screen.src" :alt="screen.alt" loading="lazy" decoding="async" />
      <div v-else class="device__placeholder" role="img" :aria-label="`${screen.alt}, screenshot to come`">
        <SignIcon :name="screen.device === 'phone' ? 'device' : 'code'" :size="22" />
        <span class="device__app">{{ appName }}</span>
        <span class="device__note">Screenshot to come</span>
      </div>
    </div>
  </figure>
</template>

<style scoped>
.device {
  position: relative;
  background: var(--device);
  box-shadow: var(--shadow-lift);
}

.device--phone {
  aspect-ratio: 9 / 19.5;
  padding: 7%;
  padding-block: 6%;
  border-radius: 14% / 6.5%;
  outline: 1px solid var(--device-rim);
}

/* The camera pill, drawn on the bezel above the screen */
.device--phone::before {
  content: '';
  position: absolute;
  z-index: 1;
  top: 4.2%;
  left: 50%;
  width: 28%;
  height: 2.4%;
  border-radius: 999px;
  background: var(--device);
  transform: translateX(-50%);
}

.device--phone .device__screen {
  height: 100%;
  border-radius: 9% / 4.2%;
}

.device--browser {
  border-radius: var(--radius-sign);
  overflow: hidden;
  outline: 1px solid var(--device-rim);
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
  background: var(--device-light);
}

.device__url {
  flex: 1;
  padding: 0.2rem var(--space-3);
  border-radius: 999px;
  background: var(--device-chrome);
  color: var(--device-text);
  font-size: 0.8125rem;
  text-align: center;
}

.device--browser .device__screen {
  aspect-ratio: 16 / 10;
}

.device__screen {
  overflow: hidden;
  background: var(--screen);
  /* Lets the placeholder lettering size itself to the screen it sits in. */
  container-type: inline-size;
}

.device__screen img {
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
  color: var(--ink-2);
  text-align: center;
}

.device__app {
  color: var(--ink);
  font-size: clamp(0.75rem, 10cqi, 1.15rem);
  font-weight: 800;
  line-height: 1.1;
}

.device__note {
  font-family: var(--font-code);
  font-size: clamp(0.625rem, 8cqi, 0.875rem);
  font-weight: 600;
}
</style>
