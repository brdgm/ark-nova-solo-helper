<template>
  <div class="mt-1 mb-1">
    <a id="breakInfo" data-bs-toggle="modal" href="#breakInfoModal">
      <AppIcon name="break" class="icon"/>{{t('breakInfo.link')}}
    </a>
  </div>

  <ModalDialog id="breakInfoModal" :title="t('breakInfo.link')" class="text-start">
    <template #body>
      <p v-html="t('breakInfo.drawThreeCards')"></p>
      <p v-html="t('breakInfo.triggerBonus')"></p>
      <template v-if="hasProjectModuleExpansion">
        <span v-html="t('breakInfo.discardedSponsorCards')"></span>
        <SponsorCardDiscard v-model="sponsorCardDiscardCount" :max-count="3"/>
      </template>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import Expansion from '@/services/enum/Expansion'
import { useStore } from '@/store'
import SponsorCardDiscard from './SponsorCardDiscard.vue'

export default defineComponent({
  name: 'BreakInfo',
  components: {
    AppIcon,
    ModalDialog,
    SponsorCardDiscard
  },
  props: {
    round: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n()
    const store = useStore()

    const sponsorCardDiscardCount = ref([0,0,0])
    const roundData = store.state.rounds.find(item => item.round == props.round)
    if (roundData?.botBreakSponsorCardDiscardCount) {
      sponsorCardDiscardCount.value = roundData.botBreakSponsorCardDiscardCount
    }

    return { t, sponsorCardDiscardCount }
  },
  computed: {
    hasProjectModuleExpansion() : boolean {
      return (this.$store.state.setup.expansions ?? []).includes(Expansion.ARNO_CONSERVATION_PROJECT_MODULE)
    }
  },
  watch: {
    sponsorCardDiscardCount: {
      handler() {
        this.$store.commit('roundBreakSponsorCardDiscardCount',
          { round: this.round, botBreakSponsorCardDiscardCount: this.sponsorCardDiscardCount })
      },
      deep: true
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
.icon {
  height: 0.9rem;
  margin-top: -0.1rem;
  margin-right: 0.25rem;
}
</style>
