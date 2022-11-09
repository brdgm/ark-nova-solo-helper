<template>
  <AppHeader :title="t('gameTitle')" @set-locale="setLocale($event.language)"/>

  <div id="content-container" class="container-fluid mt-5 mb-5">
    <router-view :key="$route.fullPath"/>
  </div>

  <AppFooter :build-number="buildNumber" :credits-label="t('footer.credits')" credits-modal-id="creditsModal" zoom-enabled @zoomFontSize="zoomFontSize"/>

  <div class="modal" tabindex="-1" id="errorMessage">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" :aria-label="t('action.close')"></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger" role="alert">{{errorMessage}}</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="creditsModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{t('footer.credits')}}</h5>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h4><a href="https://boardgamegeek.com/boardgame/342942/ark-nova" target="_blank" rel="noopener">{{t('gameTitle')}}</a></h4>
          <dl>
            <dt>Game design</dt>
            <dd>Mathias Wigge</dd>
            <dt>Graphics design</dt>
            <dd>Christof Tisch, Steffen Bieker</dd>
            <dt>Illustrations</dt>
            <dd>Loїc Billiau, Dennis Lohausen</dd>
            <dt><a href="https://boardgamegeek.com/thread/2823056/rno-alternative-solo-mode" target="_blank" rel="noopener">A.R.N.O.</a> Solo Mode Design (unofficial)</dt>
            <dd>Andre K</dd>
            <dt>Publisher</dt>
            <dd><a href="https://www.feuerland-spiele.de/" target="_blank" rel="noopener">Feuerland Spiele</a>, <a href="https://capstone-games.com/" target="_blank" rel="noopener">Capstone Games</a></dd>
          </dl>
          <h4 class="border-top pt-3">{{appTitle}}</h4>
          <dl>
            <dt>Application Development</dt>
            <dd>Stefan Seifert</dd>
            <dt>Version</dt>
            <dd>{{buildNumber}}</dd>
            <dt>Source Code (Apache-2.0 License)</dt>
            <dd><a href="https://github.com/brdgm/ark-nova-solo-helper" target="_blank" rel="noopener">https://github.com/brdgm/ark-nova-solo-helper</a></dd>
          </dl>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import AppHeader from 'brdgm-commons/src/components/structure/AppHeader.vue'
import AppFooter from 'brdgm-commons/src/components/structure/AppFooter.vue'
import { Modal } from 'bootstrap'
import getErrorMessage from 'brdgm-commons/src/util/error/getErrorMessage'

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  setup() {
    const { t, locale } = useI18n({
      inheritLocale: true,
      useScope: 'global'
    })
    const store = useStore()

    store.commit('initialiseStore')
    locale.value = store.state.language
    
    const baseFontSize = ref(store.state.baseFontSize)

    return { t, locale, baseFontSize }
  },
  data() {
    return {
      buildNumber: process.env.VUE_APP_BUILD_NUMBER || '',
      appTitle: process.env.VUE_APP_TITLE,
      errorMessage: 'Error'
    }
  },
  methods: {
    setLocale(lang: string) {
      this.$store.commit('language', lang)
      this.locale = lang;
    },
    zoomFontSize(payload: { baseFontSize: number }) {
      this.baseFontSize = payload.baseFontSize
      this.$store.commit('zoomFontSize', this.baseFontSize)
    }
  },
  errorCaptured(err : unknown) {
    this.errorMessage = getErrorMessage(err, translErr => this.t(translErr.key, translErr.named, translErr.plural))
    const modal = new Modal(document.getElementById('errorMessage') as Element)
    modal.show()
  }
})
</script>

<style lang="scss">
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/utilities";
#content-container {
  font-size: calc(v-bind(baseFontSize) * $font-size-base);
  h1 { font-size: calc(v-bind(baseFontSize) * $h1-font-size); }
  h2 { font-size: calc(v-bind(baseFontSize) * $h2-font-size); }
  h3 { font-size: calc(v-bind(baseFontSize) * $h3-font-size); }
  h4 { font-size: calc(v-bind(baseFontSize) * $h4-font-size); }
  h5 { font-size: calc(v-bind(baseFontSize) * $h5-font-size); }
  h6 { font-size: calc(v-bind(baseFontSize) * $h6-font-size); }
}
</style>
