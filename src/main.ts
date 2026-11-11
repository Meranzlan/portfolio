import { createApp } from 'vue'

// FitXP's fonts are self-hosted from src/assets/fonts (declared in base.css), so the page makes no font requests elsewhere.
import './styles/tokens.css'
import './styles/base.css'
import App from './App.vue'

createApp(App).mount('#app')
