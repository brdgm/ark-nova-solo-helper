<template>
  <a data-bs-toggle="modal" href="#aboutARNOModal">{{t('aboutARNO.link')}}</a>

  <ModalDialog id="aboutARNOModal" :title="t('aboutARNO.title')" class="text-start"
      :size-lg="true" :scrollable="true">
    <template #body>
      <p v-html="t('aboutARNO.noMoney')"></p>
      <p v-html="t('aboutARNO.rightArea')"></p>
      <p v-html="t('aboutARNO.bonuses')"></p>
      <p v-html="t('aboutARNO.referenceValues')"></p>
      <p v-html="t('aboutARNO.noEffectTarget')"></p>
      <p v-html="t('aboutARNO.receiveCards')"></p>
      <p v-if="hasProjectModuleExpansion" v-html="t('aboutARNO.projectModuleInfo')"></p>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'AboutARNO',
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    hasProjectModuleExpansion() : boolean {
      return (this.state.setup.expansions ?? []).includes(Expansion.ARNO_CONSERVATION_PROJECT_MODULE)
    }
  }
})
</script>

<style lang="scss" scoped>
a {
  text-decoration: underline;
  text-decoration-style: dotted;
  color: #000;
}
</style>
