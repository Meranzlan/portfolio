<!--
  ContactSigns.vue — the end of the line: a blue concourse with one sign per way to reach you
  =============================================================================================
  The white Email sign leads; WhatsApp, LinkedIn, GitHub and the CV are navy direction signs beside it.
-->
<script setup lang="ts">
import { ref } from 'vue'
import { profile, stations } from '../content'
import SignIcon from './SignIcon.vue'
import StationCode from './StationCode.vue'

const station = stations.find((item) => item.id === 'contact')
const copied = ref(false)
let reset = 0

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    window.clearTimeout(reset)
    reset = window.setTimeout(() => (copied.value = false), 2400)
  } catch {
    // Clipboard blocked (old browser or no permission): the address stays visible to select by hand.
    copied.value = false
  }
}

const signs = [
  { icon: 'chat', label: 'WhatsApp', detail: profile.phoneDisplay, href: profile.whatsapp, external: true },
  { icon: 'linkedin', label: 'LinkedIn', detail: 'in/imranazlan', href: profile.linkedin, external: true },
  { icon: 'code', label: 'GitHub', detail: 'Meranzlan', href: profile.github, external: true },
  { icon: 'download', label: 'Download CV', detail: 'PDF', href: profile.cv, external: false },
]
</script>

<template>
  <section id="contact" class="concourse" aria-labelledby="contact-title">
    <div class="wrap">
      <h2 id="contact-title" class="concourse__title">
        <StationCode class="concourse__code" :code="station?.code ?? ''" />
        <span>Get in touch</span>
      </h2>
      <p class="concourse__intro">Email works best. Everything else is here too.</p>

      <div class="concourse__signs">
        <div class="mail">
          <a class="mail__sign" :href="`mailto:${profile.email}`">
            <SignIcon name="mail" :size="30" />
            <span class="mail__label">Email me</span>
            <span class="mail__arrow"><SignIcon name="arrow-right" :size="26" /></span>
          </a>
          <div class="mail__address">
            <span class="mail__text">{{ profile.email }}</span>
            <button type="button" class="mail__copy" @click="copyEmail">
              <SignIcon :name="copied ? 'check' : 'copy'" :size="18" />
              <span>{{ copied ? 'Copied' : 'Copy address' }}</span>
            </button>
            <span class="visually-hidden" aria-live="polite">{{ copied ? 'Email address copied' : '' }}</span>
          </div>
        </div>

        <ul class="directions">
          <li v-for="sign in signs" :key="sign.label">
            <a
              class="direction"
              :href="sign.href"
              :target="sign.external ? '_blank' : undefined"
              :rel="sign.external ? 'noopener' : undefined"
              :download="sign.external ? undefined : ''"
            >
              <SignIcon :name="sign.icon" :size="24" />
              <span class="direction__words">
                <span class="direction__label">{{ sign.label }}</span>
                <span class="direction__detail nums">{{ sign.detail }}</span>
              </span>
              <SignIcon :name="sign.external ? 'arrow-right' : 'download'" :size="22" class="direction__arrow" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.concourse {
  padding-block: var(--space-9);
  background: var(--line);
  color: var(--on-line);
}

@media (min-width: 64rem) {
  .concourse {
    padding-block: var(--space-10);
  }
}

.concourse ::selection {
  background: var(--panel);
  color: var(--ink);
}

.concourse__title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-4);
  font-size: var(--text-3xl);
}

/* On the blue concourse the code tag turns white so it stays a tag, not a hole. */
.concourse__code {
  background: var(--on-line);
  color: var(--line);
  font-size: 1.125rem;
}

.concourse__intro {
  margin-top: var(--space-4);
  color: var(--line-pale);
  font-size: var(--text-lg);
}

.concourse__signs {
  display: grid;
  gap: var(--space-6);
  margin-top: var(--space-7);
}

@media (min-width: 64rem) {
  .concourse__signs {
    grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
    align-items: start;
  }
}

.mail__sign {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  min-height: 6rem;
  padding: var(--space-3) var(--space-3) var(--space-3) var(--space-6);
  border-radius: var(--radius-sign);
  background: var(--panel);
  color: var(--ink);
  text-decoration: none;
  box-shadow: 0 2px 4px rgb(6 16 48 / 0.2), 0 24px 40px -22px rgb(6 16 48 / 0.7);
  transition: transform 0.25s var(--ease-out);
}

.mail__label {
  flex: 1;
  font-size: clamp(1.75rem, 1.2rem + 2vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.01em;
}

.mail__arrow {
  display: grid;
  place-items: center;
  align-self: stretch;
  width: 5rem;
  border-radius: var(--radius-tile);
  background: var(--line);
  color: var(--on-line);
  transition: transform 0.3s var(--ease-out);
}

.mail__sign:hover .mail__arrow {
  transform: translateX(0.25rem);
}

.mail__sign:active {
  transform: translateY(1px);
}

.mail__address {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-4);
  margin-top: var(--space-4);
}

.mail__text {
  font-size: var(--text-lg);
  font-weight: 600;
  overflow-wrap: anywhere;
}

.mail__copy {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  padding: 0 var(--space-4);
  border: 2px solid var(--line-pale);
  border-radius: var(--radius-tile);
  background: transparent;
  color: var(--on-line);
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s var(--ease-out);
}

.mail__copy:hover {
  background: rgb(255 255 255 / 0.12);
}

.directions {
  display: grid;
  gap: var(--space-3);
}

@media (min-width: 40rem) and (max-width: 63.99rem) {
  .directions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Navy direction signs: pictogram, words, arrow. */
.direction {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  min-height: 4.5rem;
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-sign);
  background: var(--sign-dark);
  color: var(--on-line);
  text-decoration: none;
  transition: background-color 0.2s var(--ease-out);
}

.direction:hover {
  background: var(--sign-dark-hover);
}

.direction__words {
  display: flex;
  flex: 1;
  flex-direction: column;
  line-height: 1.2;
}

.direction__label {
  font-size: var(--text-lg);
  font-weight: 700;
}

.direction__detail {
  color: var(--line-pale);
  font-family: var(--font-code);
  font-size: 1rem;
  font-weight: 600;
}

.direction__arrow {
  transition: transform 0.3s var(--ease-out);
}

.direction:hover .direction__arrow {
  transform: translateX(0.2rem);
}
</style>
