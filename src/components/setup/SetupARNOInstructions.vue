<template>
  <ol>
    <li v-html="t('setupARNO.text1')"></li>
    <li>
      <img :src="conservationSetupImageFileName" class="conservation-start-setup float-end ms-2 me-2 mt-2" alt=""/>
      <span v-html="t('setupARNO.text2', {count:conservationPointStartMinus})"></span>
      <ul>
        <li v-html="t('setupARNO.text2-conservation', {count:conservationPointStartMinus})"></li>
        <li v-html="t('setupARNO.text2-appeal')"></li>
      </ul>
    </li>
    <li v-html="t('setupARNO.text3')"></li>
    <li v-html="t('setupARNO.text4')"></li>
    <li v-html="t('setupARNO.text5')"></li>
    <li v-html="t('setupARNO.text6')"></li>
    <li>
      <span v-html="t('setupARNO.text7')"></span>
      <ul>
        <li v-html="t('setupARNO.text7-1')"></li>
        <li v-html="t('setupARNO.text7-2')"></li>
        <li v-html="t('setupARNO.text7-3')"></li>
      </ul>
    </li>
    <li v-html="t('setupARNO.text8')"></li>
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
</style>
