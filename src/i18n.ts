import { createI18n } from 'vue-i18n'
import loadLocaleMessages from 'brdgm-commons/src/util/i18n/loadLocaleMessages'

export default createI18n({
  legacy: false,
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
