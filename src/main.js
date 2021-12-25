import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { firebase } from './services/Firebase'

import 'virtual:windi.css'
import 'virtual:windi-devtools'

import './assets/styles/base.css'

// Firebase
if (import.meta.env.VITE_APP_STAGE === 'dev') {
  console.log(`⚑ Firebase -> ${firebase.name} ✓`)
}

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
