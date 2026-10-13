import { createApp } from 'vue'

// Barlow, self-hosted through the build (no request to Google Fonts): the signage sans and its condensed cut.
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import '@fontsource/barlow/600.css'
import '@fontsource/barlow/700.css'
import '@fontsource/barlow/800.css'
import '@fontsource/barlow-condensed/600.css'
import '@fontsource/barlow-condensed/700.css'

import './styles/tokens.css'
import './styles/base.css'
import App from './App.vue'

createApp(App).mount('#app')
