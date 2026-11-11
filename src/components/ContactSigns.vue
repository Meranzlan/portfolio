<!--
  ContactSigns.vue — the last section: Koma waves you over to the Email button
  ============================================================================
  One big soft card. Email is the pale-blue button (the one call to action on the page), with the address and a
  copy button under it; the other ways to reach me are tiles beside it.
-->
<script setup lang="ts">
import { ref } from 'vue'
import { profile, stations } from '../content'
import SignIcon from './SignIcon.vue'
import KomaCompanion from './KomaCompanion.vue'
import SoftShape from './SoftShape.vue'

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
  <section id="contact" class="section contact" aria-labelledby="contact-title" :style="{ '--tint': `var(--${station?.tint ?? 'water'})` }">
    <div class="wrap">
      <SoftShape class="card" :radius="32" :seed="7">
        <div class="card__hello">
          <KomaCompanion class="card__koma" :size="88" />
          <div>
            <h2 id="contact-title" class="card__title">
              <span class="card__code nums" aria-hidden="true">{{ station?.code }}</span>
              Get in touch
            </h2>
            <p class="card__intro">Email works best. Everything else is here too.</p>
          </div>
        </div>

        <div class="card__ways">
          <div class="mail">
            <SoftShape tag="a" class="mail__button" :seed="12" :href="`mailto:${profile.email}`">
              <SignIcon name="mail" :size="26" />
              <span>Email me</span>
              <SignIcon name="arrow-right" :size="22" class="mail__arrow" />
            </SoftShape>
            <div class="mail__address">
              <span class="mail__text">{{ profile.email }}</span>
              <SoftShape tag="button" type="button" class="mail__copy" :seed="4" @click="copyEmail">
                <SignIcon :name="copied ? 'check' : 'copy'" :size="18" />
                <span>{{ copied ? 'Copied' : 'Copy address' }}</span>
              </SoftShape>
              <span class="visually-hidden" aria-live="polite">{{ copied ? 'Email address copied' : '' }}</span>
            </div>
          </div>

          <ul class="ways">
            <li v-for="(sign, index) in signs" :key="sign.label">
              <SoftShape
                tag="a"
                class="way"
                :radius="20"
                :seed="index + 20"
                :href="sign.href"
                :target="sign.external ? '_blank' : undefined"
                :rel="sign.external ? 'noopener' : undefined"
                :download="sign.external ? undefined : ''"
              >
                <SignIcon :name="sign.icon" :size="22" class="way__icon" />
                <span class="way__words">
                  <span class="way__label">{{ sign.label }}</span>
                  <span class="way__detail nums">{{ sign.detail }}</span>
                </span>
                <SignIcon :name="sign.external ? 'arrow-right' : 'download'" :size="20" class="way__arrow" />
              </SoftShape>
            </li>
          </ul>
        </div>
      </SoftShape>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding-bottom: var(--space-9);
}

.card {
  --soft-fill: var(--surface);
  --soft-stroke: var(--line);
  display: grid;
  gap: var(--space-6);
  padding: var(--space-6) var(--space-5);
}

@media (min-width: 64rem) {
  .card {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    align-items: center;
    gap: var(--space-7);
    padding: var(--space-8) var(--space-7);
  }
}

.card__hello {
  display: grid;
  gap: var(--space-5);
}

.card__title {
  font-size: var(--text-3xl);
}

.card__code {
  display: block;
  color: var(--tint);
  font-family: var(--font-numeral);
  font-size: var(--text-2xl);
  font-weight: 400;
  line-height: 1;
}

.card__intro {
  margin-top: var(--space-3);
  color: var(--muted);
  font-size: var(--text-lg);
}

.card__ways {
  display: grid;
  gap: var(--space-5);
}

.mail {
  display: grid;
  gap: var(--space-3);
}

.mail__button {
  --soft-fill: var(--accent);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-height: 4.5rem;
  padding: 0 var(--space-6);
  color: var(--on-accent);
  font-size: var(--text-xl);
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.3s var(--spring);
}

.mail__arrow {
  margin-left: auto;
  transition: transform 0.3s var(--spring);
}

.mail__button:hover {
  --soft-fill: var(--accent-deep);
}

.mail__button:hover .mail__arrow {
  transform: translateX(0.3rem);
}

.mail__button:active {
  transform: scale(0.98);
}

.mail__address {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-4);
  padding-inline: var(--space-2);
}

.mail__text {
  font-weight: 700;
  overflow-wrap: anywhere;
}

.mail__copy {
  --soft-fill: transparent;
  --soft-stroke: var(--line);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.5rem;
  padding: 0 var(--space-4);
  color: var(--muted);
  font-size: var(--text-sm);
  font-weight: 700;
}

.mail__copy:hover {
  --soft-stroke: var(--accent);
  color: var(--ink);
}

.ways {
  display: grid;
  gap: var(--space-2);
}

@media (min-width: 36rem) {
  .ways {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.way {
  --soft-fill: var(--raised);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-height: 4rem;
  padding: var(--space-3) var(--space-4);
  text-decoration: none;
}

.way:hover {
  --soft-fill: var(--line);
}

.way__icon {
  color: var(--tint);
}

.way__words {
  display: grid;
  flex: 1;
  line-height: 1.3;
}

.way__label {
  font-weight: 700;
}

.way__detail {
  color: var(--muted);
  font-size: var(--text-sm);
}

.way__arrow {
  color: var(--muted);
}
</style>
