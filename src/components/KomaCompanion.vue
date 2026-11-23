<!--
  KomaCompanion.vue — Koma, FitXP's first companion, at its first stage
  =====================================================================
  Built like the app's painter (lib/shared/components/companion.dart, _koma): a 4 × 3 block of matcha tiles, the
  middle pair of row two merged into one eye tile with two white eyes, and two deeper-matcha feet. It bobs and blinks
  now and then, unless the visitor asks for reduced motion. Colours are the app's own, not the site's tokens.
-->
<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 72 })

const tile = 40
const gap = 7
const step = tile + gap
const body = [0, 1, 2].flatMap((row) =>
  [0, 1, 2, 3]
    .filter((col) => !(row === 1 && (col === 1 || col === 2)))
    .map((col) => ({ x: col * step, y: row * step })),
)
</script>

<template>
  <svg class="koma" :width="size" :height="size * 1.01" viewBox="-2 -2 185 187" role="img" aria-label="Koma, the FitXP companion">
    <g class="body">
      <rect v-for="cell in body" :key="`${cell.x}-${cell.y}`" :x="cell.x" :y="cell.y" :width="tile" :height="tile" rx="12" />
      <rect :x="step" :y="step" :width="tile * 2 + gap" :height="tile" rx="12" />
      <g class="eyes">
        <rect x="68" y="58" width="8" height="18" rx="2" />
        <rect x="105" y="58" width="8" height="18" rx="2" />
      </g>
    </g>
    <rect class="foot" x="23.5" y="141" width="40" height="40" rx="12" />
    <rect class="foot" x="117.5" y="141" width="40" height="40" rx="12" />
  </svg>
</template>

<style scoped>
.koma {
  display: block;
  overflow: visible;
}
.body rect {
  fill: #8dc24b;
}
.body .eyes rect {
  fill: #fff;
}
.foot {
  fill: #4a7a1f;
}

@media (prefers-reduced-motion: no-preference) {
  .body {
    animation: bob 2.8s ease-in-out infinite;
  }
  .eyes {
    transform-box: fill-box;
    transform-origin: center;
    animation: blink 5.5s infinite;
  }
  @keyframes bob {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
  @keyframes blink {
    0%,
    94%,
    100% {
      transform: scaleY(1);
    }
    97% {
      transform: scaleY(0.1);
    }
  }
}
</style>
