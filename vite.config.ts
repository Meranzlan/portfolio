import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// The site is served from the root of imran.ikko.space, so the default base ('/') is right.
export default defineConfig({
  plugins: [vue()],
})
