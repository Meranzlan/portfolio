<!-- SiteFooter.vue — the small print under the concourse. -->
<script setup lang="ts">
import { profile } from '../content'
import SignIcon from './SignIcon.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="wrap footer__inner">
      <p class="nums">© {{ year }} {{ profile.name }}</p>
      <p>
        Also on this domain:
        <a href="https://ikko.space" target="_blank" rel="noopener">Ikko, a trip planner<SignIcon name="external" :size="16" /></a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: var(--space-6);
  color: var(--ink-2);
  font-size: var(--text-sm);
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2) var(--space-6);
}

.footer a {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--ink);
  font-weight: 600;
}
</style>
