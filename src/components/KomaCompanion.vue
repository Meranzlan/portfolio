<!--
  KomaCompanion.vue — Koma, FitXP's tile companion, drawn in SVG
  ===============================================================
  The same build as the app's first stage: a block of soft tiles, one long tile with two square white eyes, and two
  paler feet. It bobs gently, and blinks now and then, unless the visitor asks for reduced motion.
-->
<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 96 })

// The body grid: 4 tiles across, 3 rows. Row two swaps its middle pair for the eye tile.
const tile = 40
const gap = 8
const step = tile + gap
const body = [0, 1, 2].flatMap((row) =>
  [0, 1, 2, 3]
    .filter((col) => !(row === 1 && (col === 1 || col === 2)))
    .map((col) => ({ x: col * step, y: row * step })),
)
</script>

<template>
  <svg class="koma" :width="size" :height="size * 1.06" viewBox="-4 -4 192 204" role="img" aria-label="Koma, the FitXP companion">
    <g class="koma__body">
      <rect v-for="cell in body" :key="`${cell.x}-${cell.y}`" :x="cell.x" :y="cell.y" :width="tile" :height="tile" rx="11" />
      <rect class="koma__eye-tile" :x="step" :y="step" :width="tile * 2 + gap" :height="tile" rx="11" />
      <g class="koma__eyes">
        <rect x="64" y="60" width="9" height="17" rx="1.5" />
        <rect x="111" y="60" width="9" height="17" rx="1.5" />
      </g>
    </g>
    <rect class="koma__foot" x="22" y="154" width="40" height="38" rx="11" />
    <rect class="koma__foot" x="122" y="154" width="40" height="38" rx="11" />
  </svg>
</template>

<style scoped>
.koma {
  display: block;
  overflow: visible;
}

.koma__body rect {
  fill: var(--accent);
}

.koma__body .koma__eyes rect {
  fill: #fff;
}

.koma__foot {
  fill: var(--accent-deep);
}

@media (prefers-reduced-motion: no-preference) {
  .koma__body {
    animation: koma-bob 2.8s var(--ease) infinite;
  }

  .koma__eyes {
    transform-box: fill-box;
    transform-origin: center;
    animation: koma-blink 5.5s infinite;
  }

  @keyframes koma-bob {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  @keyframes koma-blink {
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
