<!--
  SoftShape.vue — any element, drawn with FitXP's soft outline instead of a CSS box
  ==================================================================================
  CSS can only round corners evenly, so the outline is an SVG path drawn behind the content at the element's
  real size. Style it from the outside with custom properties:
    --soft-fill (default: the surface colour), --soft-stroke (default: none), --soft-stroke-width (default 1.5px).
  `tag` picks the element (a link, a button, a list item…). Attributes like href or @click pass straight through,
  because Vue puts attributes a component doesn't declare as props onto its root element.
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { pebble, wavyPill } from '../lib/shapes'

const props = withDefaults(
  defineProps<{ tag?: string; shape?: 'pill' | 'pebble'; seed?: number; radius?: number; wobble?: number }>(),
  { tag: 'div', shape: 'pill', seed: 0, radius: Infinity, wobble: 0.08 },
)

// A template ref: Vue fills `root` with the real DOM element once it's mounted, so it can be measured.
const root = ref<HTMLElement | null>(null)
const size = ref({ width: 0, height: 0 })

// computed() re-runs only when something it reads changes: here, the measured size or a prop.
const d = computed(() => {
  const { width, height } = size.value
  if (!width || !height) return ''
  return props.shape === 'pebble' ? pebble(width, height, props.seed, props.wobble) : wavyPill(width, height, props.seed, props.radius)
})

let observer: ResizeObserver | undefined

onMounted(() => {
  // ResizeObserver tells us the element's size now and whenever it changes (a wrap, a font loading, a resize).
  observer = new ResizeObserver(([entry]) => {
    if (!entry) return
    const box = entry.borderBoxSize?.[0]
    size.value = box
      ? { width: box.inlineSize, height: box.blockSize }
      : { width: entry.contentRect.width, height: entry.contentRect.height }
  })
  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <component :is="tag" ref="root" class="soft">
    <svg
      class="soft__shape"
      aria-hidden="true"
      :viewBox="`0 0 ${size.width || 1} ${size.height || 1}`"
      preserveAspectRatio="none"
    >
      <path :d="d" />
    </svg>
    <slot />
  </component>
</template>

<style scoped>
.soft {
  position: relative;
  isolation: isolate;
}

.soft__shape {
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.soft__shape path {
  fill: var(--soft-fill, var(--surface));
  stroke: var(--soft-stroke, none);
  stroke-width: var(--soft-stroke-width, 1.5px);
  vector-effect: non-scaling-stroke;
  transition: fill 0.25s var(--ease), stroke 0.25s var(--ease);
}
</style>
