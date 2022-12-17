<template>
  <a data-bs-toggle="modal" href="#aboutARNOModal">{{t('aboutARNO.link')}}</a>

  <ModalDialog id="aboutARNOModal" :title="t('aboutARNO.title')" class="text-start"
      :size-lg="true" :scrollable="true">
    <template #body>
      <p v-html="t('aboutARNO.text1')"></p>
      <p v-html="t('aboutARNO.text2')"></p>
      <p v-html="t('aboutARNO.text3')"></p>
      <p v-html="t('aboutARNO.text4')"></p>
      <p v-html="t('aboutARNO.text5')"></p>
      <p v-html="t('aboutARNO.text6')"></p>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'AboutARNO',
  components: {
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
</style>
