<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Theme = 'light' | 'dark'

// ref() makes a value reactive: when it changes, the template re-renders, like setState in Flutter.
const theme = ref<Theme>('light')

function current(): Theme {
  const set = document.documentElement.dataset.theme
  if (set === 'light' || set === 'dark') return set
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// onMounted runs once the component is on the page, so `document` is safe to read (like initState).
onMounted(() => {
  theme.value = current()
})

function toggle() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  try {
    localStorage.setItem('theme', theme.value)
  } catch {
    // Private windows can refuse storage; the choice then lasts for this visit only.
  }
}
</script>

<template>
  <button class="toggle mono" type="button" :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`" @click="toggle">
    {{ theme === 'dark' ? 'Light' : 'Dark' }}
  </button>
</template>

<style scoped>
.toggle {
  border: 1px solid var(--hairline);
  border-radius: var(--radius-control);
  background: transparent;
  color: var(--ink);
  padding: 7px 12px;
  cursor: pointer;
  transition: background var(--hover);
}
.toggle:hover {
  background: var(--surface);
}
</style>
