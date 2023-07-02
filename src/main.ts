import { createApp } from 'vue'
import { store, key } from './store'
import router from './router'
import i18n from './i18n'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

createApp(App)
  .use(store, key)
  .use(router)
  .use(i18n)
  .mount('#app');
