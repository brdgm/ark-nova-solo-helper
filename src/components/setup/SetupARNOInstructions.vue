<template>
  <ol>
    <li v-html="t('setupARNO.setupPlayerCount')"></li>
    <li>
      <img :src="conservationSetupImageFileName" class="conservation-start-setup float-end ms-2 me-2 mt-2" alt=""/>
      <span v-html="t('setupARNO.startPoints', {count:conservationPointStartMinus})"></span>
      <ul>
        <li v-html="t('setupARNO.startPointsConservation', {count:conservationPointStartMinus})"></li>
        <li v-html="t('setupARNO.startPointsAppeal')"></li>
      </ul>
    </li>
    <li>
      <span v-html="t('setupARNO.startComponents')"></span>
      <ul>
        <li v-html="t('setupARNO.startComponentsKeepCards')"></li>
        <li v-if="isProjectModuleExpansion">
          <span v-html="t('setupARNO.discardedSponsorCards')"></span>
          <ul v-for="bot of botCount" :key="bot">
            <li>
              <span v-html="t('setupARNO.discardedSponsorCardsPerBot', {bot}, botCount)"></span>
              <input type="number" min="0" max="8" step="1" v-model="sponsorCardDiscardCount[bot-1]" @focus="inputSelectAll"/>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li v-html="t('setupARNO.playerTokens')"></li>
    <li v-html="t('setupARNO.associationWorker')"></li>
    <li v-html="t('setupARNO.finalScoringCard')"></li>
    <li v-html="t('setupARNO.noDiceActionCards')"></li>
  </ol>
  <p>
    <img src="@/assets/arno-zoo-mat.jpg" class="zoomat" alt=""/>
  </p>
</template>

<script lang="ts">
import Expansion from '@/services/enum/Expansion'
import { useStore } from '@/store'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'SetupARNOInstructions',
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  data() {
    return {
      sponsorCardDiscardCount: [0,0,0]
    }
  },
  computed: {
    hasMarineWorldsExpansion() : boolean {
      return (this.$store.state.setup.expansions ?? []).includes(Expansion.MARINE_WORLDS)
    },
    conservationPointStartMinus() : number {
      return this.hasMarineWorldsExpansion ? 3 : 5
    },
    conservationSetupImageFileName() : string {
      const components = this.hasMarineWorldsExpansion ? 'expansion' : 'base'
      return new URL(`/src/assets/arno-conservation-start-setup/start-setup-${components}-${this.conservationPointStartMinus}.webp`, import.meta.url).toString()
    },
    isProjectModuleExpansion() : boolean {
      return (this.$store.state.setup.expansions ?? []).includes(Expansion.ARNO_CONSERVATION_PROJECT_MODULE)
    },
    botCount() : number {
      return this.$store.state.setup.playerSetup.botCount
    }
  },
  methods: {
    inputSelectAll(event: Event) : void {
      const input = event.target as HTMLInputElement
      input.select()
    }
  },
  mounted() {
    this.$store.commit('setupBotInitialSponsorCardDiscardCount', this.sponsorCardDiscardCount)
  },
  watch: {
    sponsorCardDiscardCount: {
      handler() {
        this.$store.commit('setupBotInitialSponsorCardDiscardCount', this.sponsorCardDiscardCount)
      },
      deep: true
    }
  }
})
</script>

<style lang="scss" scoped>
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/grid";

img {
  border-radius: 0.25rem;
  filter: drop-shadow(2px 2px 3px #888);
}
.zoomat {
  width: 60%;
}
.conservation-start-setup {
  width: 20%;
}
@include media-breakpoint-down(lg) {
  .zoomat {
    width: 75%;
  }
}
@include media-breakpoint-down(sm) {
  .zoomat {
    width: 100%;
  }
}
li {
  margin-top: 0.5rem;
  &::marker {
    font-weight: bold;
  }
}
input {
  width: 5rem;
  margin-left: 0.5rem;
}
</style>
