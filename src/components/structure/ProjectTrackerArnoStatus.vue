<template>
  <p class="arnoStatusLink mt-3" v-if="hasProjectModuleExpansion">
    <a data-bs-toggle="modal" href="#arnoStatusModal">{{t('projectTrackerArnoStatus.title')}}</a>
  </p>

  <ModalDialog id="arnoStatusModal" :title="t('projectTrackerArnoStatus.title')">
    <template #body>
      <table>
        <tr>
          <th scope="col"></th>
          <th scope="col" v-for="bot of botCount" :key="bot">{{t('roundBot.title', {bot}, botCount)}}</th>
        </tr>
        <tr v-if="debugMode">
          <th scope="row">{{t('projectTrackerArnoStatus.trackerPosition')}}</th>
          <td v-for="bot of botCount" :key="bot">{{projectModuleTrackers[bot - 1].trackerPosition}}</td>
        </tr>
        <tr>
          <th scope="row">{{t('projectTrackerArnoStatus.preferredProjectSlot')}}</th>
          <td v-for="bot of botCount" :key="bot">{{t(`projectSlot.${projectModuleTrackers[bot - 1].projectSlot}`)}}</td>
        </tr>
        <tr>
          <th scope="row">{{t('projectTrackerArnoStatus.kioskCount')}}</th>
          <td v-for="bot of botCount" :key="bot">{{projectModuleTrackers[bot - 1].kioskCount}}</td>
        </tr>
      </table>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import getProjectModuleTrackersForRound from '@/util/getProjectModuleTrackersForRound'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'ProjectTrackerAllBotsInfo',
  components: {
    ModalDialog
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
    const projectModuleTrackers = getProjectModuleTrackersForRound(store.state, props.round)
    return { t, projectModuleTrackers }
  },
  computed: {
    hasProjectModuleExpansion() : boolean {
      return (this.$store.state.setup.expansions ?? []).includes(Expansion.ARNO_CONSERVATION_PROJECT_MODULE)
    },
    botCount() : number {
      return this.$store.state.setup.playerSetup.botCount
    },
    debugMode() : boolean {
      return this.$store.state.setup.debugMode ?? false
    }
  }
})
</script>

<style lang="scss" scoped>
.arnoStatusLink {
  a {
    text-decoration: underline;
    text-decoration-style: dotted;
    color: #000;
    text-align: right;
  }
}
table {
  tr:nth-child(odd) {
    background-color: #eee;
  }
  tr:nth-child(1) th {
    white-space: nowrap;
  }
  td, th {
    padding: 0.5rem;
  }
}
</style>
