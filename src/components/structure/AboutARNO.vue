<template>
  <a data-bs-toggle="modal" href="#aboutARNOModal">{{t('aboutARNO.link')}}</a>

  <div class="modal text-start" id="aboutARNOModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{t('aboutARNO.title')}}</h5>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p v-html="t('aboutARNO.text1')"></p>
          <p v-html="t('aboutARNO.text2')"></p>
          <p v-html="t('aboutARNO.text3')"></p>
          <p v-html="t('aboutARNO.text4')"></p>
          <p v-html="t('aboutARNO.text5')"></p>
          <p v-html="t('aboutARNO.text6')"></p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AboutARNO',
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>

<style lang="scss" scoped>
a {
  text-decoration: underline dotted;
  color: #000;
}
</style>
