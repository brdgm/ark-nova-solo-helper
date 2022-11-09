<template>
  <div>
    <a id="breakInfo" data-bs-toggle="modal" href="#breakInfoModal">
      <AppIcon name="break" class="icon"/>{{t('breakInfo.link')}}
    </a>
  </div>

  <div class="modal text-start" id="breakInfoModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{t('breakInfo.link')}}</h5>
          <button class="btn-close" data-bs-dismiss="modal" :aria-label="t('action.close')"></button>
        </div>
        <div class="modal-body">
          <p v-html="t('breakInfo.text1')"></p>
          <p v-html="t('breakInfo.text2')"></p>
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
import AppIcon from './AppIcon.vue'

export default defineComponent({
  name: "AboutARNO",
  components: {
    AppIcon
  },
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
.icon {
  height: 0.9rem;
  margin-top: -0.1rem;
  margin-right: 0.25rem;
}
</style>
