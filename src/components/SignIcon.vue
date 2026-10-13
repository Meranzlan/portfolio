<!-- SignIcon.vue — one pictogram from SignIcons.vue. Decorative: the link or button around it carries the words. -->
<script setup lang="ts">
withDefaults(defineProps<{ name: string; size?: number }>(), { size: 20 })
</script>

<template>
  <svg class="sign-icon" aria-hidden="true" :width="size" :height="size" viewBox="0 0 24 24">
    <use :href="`#i-${name}`" />
  </svg>
</template>

<style scoped>
.sign-icon {
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
