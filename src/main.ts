import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import router from './router'
import i18n from './i18n'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const pinia = createPinia()
  .use(piniaPluginPersistedState)

createApp(App)
  .use(pinia)
  .use(router)
  .use(i18n)
  .mount('#app')
