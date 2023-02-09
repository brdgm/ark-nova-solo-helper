<template>
  <div>
    <a id="breakInfo" data-bs-toggle="modal" href="#breakInfoModal">
      <AppIcon name="break" class="icon"/>{{t('breakInfo.link')}}
    </a>
  </div>

  <ModalDialog id="breakInfoModal" :title="t('breakInfo.link')" class="text-start">
    <template #body>
      <p v-html="t('breakInfo.text1')"></p>
      <p v-html="t('breakInfo.text2')"></p>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: "AboutARNO",
  components: {
    AppIcon,
    ModalDialog
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
