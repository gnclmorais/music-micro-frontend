// 3rd party CSS
import '@/assets/css/tailwind.css'

// 3rd party JS
import { createApp } from 'vue'

// Project-specific code
import App from './App.vue'
import router from './router'

createApp(App).use(router).use(router).mount('#app')
