<!--
  StationCode.vue — a station code tag, like "KG16" on a Klang Valley platform
  The same codes label the stops on the route strip, so a heading and its stop read as one place.
-->
<script setup lang="ts">
defineProps<{ code: string }>()
</script>

<template>
  <span class="station-code nums">{{ code }}</span>
</template>

<style scoped>
.station-code {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3.4em;
  padding: 0.2em 0.45em 0.15em;
  border-radius: 0.35em;
  background: var(--line);
  color: var(--on-line);
  font-family: var(--font-code);
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1;
}
</style>
