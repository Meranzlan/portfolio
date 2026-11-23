<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '../content'
import KomaCompanion from './KomaCompanion.vue'

// defineProps declares what the parent passes in, like a Flutter widget's final fields.
const props = defineProps<{ project: Project; index: number }>()

// computed() is a derived value that updates when its inputs change, like a getter on a Flutter widget.
const number = computed(() => String(props.index + 1).padStart(2, '0'))
const pasted = computed(() => props.project.screens.slice(0, 3))
const more = computed(() => props.project.screens.slice(3))
const flip = computed(() => props.index % 2 === 1)
</script>

<template>
  <!-- A journal entry: a ticket stub in the app's colour, the words, and its screens taped in beside them. -->
  <article :id="project.id" class="entry" :class="[`brand-${project.brand}`, { flip }]">
    <header class="stub mono">
      <span>No. {{ number }} · {{ project.meta[0] }}</span>
      <span>{{ project.meta[project.meta.length - 1] }}</span>
    </header>

    <div class="body">
      <div class="words">
        <h3 class="name">{{ project.name }}</h3>
        <p class="tagline">{{ project.tagline }}</p>
        <p class="stamp mono">{{ project.stamp }}</p>
        <p v-if="project.summary" class="summary">{{ project.summary }}</p>
        <ul class="points">
          <li v-for="p in project.points" :key="p">{{ p }}</li>
        </ul>
        <p class="mono stack"><span class="label">Built with</span> {{ project.stack.join(' · ') }}</p>
      </div>

      <div v-if="pasted.length" class="collage" :class="`n${pasted.length}`">
        <span class="card-paper" aria-hidden="true"></span>
        <figure v-for="(s, i) in pasted" :key="s.src" class="phone" :class="`p${i + 1}`">
          <span v-if="i === 1 || pasted.length === 1" class="tape" aria-hidden="true"></span>
          <img :src="s.src" :alt="s.alt" width="540" height="1212" loading="lazy" decoding="async" />
        </figure>
        <p v-if="project.note" class="note">{{ project.note }}</p>
      </div>
    </div>

    <div v-if="more.length" class="more">
      <figure v-for="s in more" :key="s.src" class="phone small">
        <span class="tape" aria-hidden="true"></span>
        <img :src="s.src" :alt="s.alt" width="540" height="1212" loading="lazy" decoding="async" />
      </figure>
    </div>
    <KomaCompanion v-if="project.companion" class="companion" :size="72" />
  </article>
</template>

<style scoped>
.brand-jakim {
  --brand: var(--jakim);
  --brand-hi: var(--jakim-hi);
  --brand-stamp: var(--jakim-stamp);
}
.brand-fitxp {
  --brand: var(--fitxp);
  --brand-hi: var(--fitxp-hi);
  --brand-stamp: var(--fitxp-stamp);
  /* The app's dark screens vanish on navy card, so FitXP's card is Koma's light blue. */
  --brand-card: var(--fitxp-hi);
}
.brand-ikredikom {
  --brand: var(--ikredikom);
  --brand-hi: var(--ikredikom-hi);
  --brand-stamp: var(--ikredikom-stamp);
}

.entry {
  position: relative;
  /* A grid item grows to fit its widest child unless told otherwise. */
  min-width: 0;
  background: var(--paper);
  border: 1px solid var(--hairline);
  border-radius: 6px;
  overflow: hidden;
}

/* The ticket stub: the app's colour, with a perforated bottom edge punched out of the paper. */
.stub {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 12px 24px 14px;
  background: var(--brand);
  color: var(--on-brand);
}
.stub span:first-child {
  color: var(--brand-hi);
}
.stub::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -5px;
  height: 10px;
  background: radial-gradient(circle at 5px 5px, var(--paper) 3.5px, transparent 4px) 0 0 / 14px 10px repeat-x;
}

.body {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 32px;
  padding: 28px 28px 32px;
}
.flip .body {
  grid-template-columns: 300px 1fr;
}
.flip .words {
  order: 2;
}
.words {
  min-width: 0;
}
.name {
  font-size: 34px;
}
.tagline {
  color: var(--ink-2);
  margin-top: 4px;
}
.stamp {
  display: inline-block;
  margin-top: 14px;
  padding: 6px 10px;
  border: 2px solid var(--brand-stamp);
  border-radius: 6px;
  color: var(--brand-stamp);
  transform: rotate(-3deg);
  font-weight: 600;
}
.summary {
  margin-top: 16px;
}
.points {
  margin: 14px 0 18px;
  padding-left: 18px;
}
.points li + li {
  margin-top: 6px;
}
.points li::marker {
  color: var(--ink-2);
}
.stack .label {
  color: var(--ink);
}

/* The collage: a cut piece of card in the app's colour, phones taped on at angles. */
.collage {
  position: relative;
  align-self: start;
  height: 440px;
}
.card-paper {
  position: absolute;
  inset: 34px 8px 64px 16px;
  background: var(--brand-card, var(--brand));
  border-radius: 4px;
  transform: rotate(2.5deg);
}
.flip .card-paper {
  transform: rotate(-2.5deg);
}
.phone {
  position: absolute;
  margin: 0;
  width: 132px;
  padding: 4px;
  background: var(--device);
  border-radius: 22px;
  transition: transform var(--hover);
}
.phone img {
  width: 100%;
  height: auto;
  border-radius: 18px;
}
.p1 {
  left: 0;
  top: 40px;
  transform: rotate(-6deg);
}
.p2 {
  left: 84px;
  top: 0;
  transform: rotate(3deg);
  z-index: 2;
}
.p3 {
  left: 168px;
  top: 56px;
  transform: rotate(8deg);
  z-index: 1;
}
.n1 .p1 {
  left: 84px;
  transform: rotate(-3deg);
}
.n2 .p2 {
  left: 136px;
}
.collage .phone:hover {
  transform: rotate(0) translateY(-6px);
  z-index: 3;
}
.tape {
  position: absolute;
  top: -10px;
  left: 50%;
  width: 70px;
  height: 20px;
  background: var(--tape);
  transform: translateX(-50%) rotate(-4deg);
  z-index: 1;
}
/* Koma stands at the bottom-left corner of the entry, beside the row of small phones. */
.companion {
  position: absolute;
  left: 32px;
  bottom: 28px;
}
.note {
  position: absolute;
  left: 8px;
  right: 8px;
  top: 392px;
  font-family: var(--serif);
  font-style: italic;
  font-size: 15px;
  line-height: 1.35;
  color: var(--note);
}

/* Screens past the third: smaller phones taped in a row under the entry. */
.more {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  padding: 8px 28px 32px;
  border-top: 1px dashed var(--hairline);
  padding-top: 32px;
}
.phone.small {
  position: relative;
  width: 112px;
}
.phone.small:nth-child(odd) {
  transform: rotate(-3deg);
}
.phone.small:nth-child(even) {
  transform: rotate(3deg);
}

@media (max-width: 700px) {
  .body,
  .flip .body {
    grid-template-columns: 1fr;
    padding: 22px 20px 26px;
  }
  .flip .words {
    order: 0;
  }
  .name {
    font-size: 30px;
  }
  .collage {
    max-width: 270px;
    margin: 0 auto;
    width: 100%;
    height: 400px;
  }
  .phone {
    width: 112px;
  }
  .p2,
  .n1 .p1 {
    left: 72px;
  }
  .p3 {
    left: 150px;
  }
  .n2 .p2 {
    left: 118px;
  }
  .note {
    top: 352px;
  }
  .more {
    padding: 24px 16px 26px;
    gap: 16px;
  }
  .phone.small {
    width: 92px;
  }
  .companion {
    left: 12px;
    bottom: 20px;
    width: 48px;
    height: auto;
  }
}
@media (prefers-reduced-motion: reduce) {
  .collage .phone:hover {
    transform: none;
  }
}
</style>
