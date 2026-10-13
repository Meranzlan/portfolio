<!-- StationHeading.vue — a section title set like a station sign: code tag, then the station name. -->
<script setup lang="ts">
import StationCode from './StationCode.vue'

defineProps<{ code: string; title: string; headingId: string; intro?: string }>()
</script>

<template>
  <div class="station-heading">
    <h2 :id="headingId" class="station-heading__title">
      <StationCode class="station-heading__code" :code="code" />
      <span>{{ title }}</span>
    </h2>
    <p v-if="intro" class="station__intro">{{ intro }}</p>
  </div>
</template>

<style scoped>
.station-heading {
  margin-bottom: var(--space-7);
}

.station-heading__title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-4);
  font-size: var(--text-3xl);
}

.station-heading__code {
  font-size: 1.125rem;
}
</style>
