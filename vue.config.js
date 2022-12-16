const packageJson = require('./package.json')
process.env.VUE_APP_TITLE = packageJson.description
process.env.VUE_APP_BUILD_NUMBER= packageJson.version
process.env.VUE_APP_LOCALSTORAGE_KEY_PREFIX= packageJson.name + "."

module.exports = {
  publicPath: '',

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  },

  pages: {
    index: {
      entry: 'src/main.ts',
      title: process.env.VUE_APP_TITLE
    }
  },

  pwa: {
    name: process.env.VUE_APP_TITLE,
    themeColor: '#333',
    workboxOptions: {
      skipWaiting: true
    }
  }
}