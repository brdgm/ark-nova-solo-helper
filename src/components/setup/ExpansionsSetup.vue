<template>
  <h3 class="mt-4 mb-3">{{t('setup.expansions.title')}}</h3>

  <div class="row" v-for="expansion of expansions" :key="expansion">
    <div class="col">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" :id="`expansion-${expansion}`" :checked="hasExpansion(expansion)" @input="toggleExpansion(expansion)">
        <label class="form-check-label" :for="`expansion-${expansion}`">
          {{t(`setup.expansions.${expansion}`)}}
        </label>
      </div>
    </div>
  </div>

  <div class="row mt-2" v-if="hasMarineWorldsExpansion">
    <div class="col">
      <span v-html="t('setup.expansions.marineWorldsNewActionCards')"></span>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'ExpansionsSetup',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    expansions() : Expansion[] {
      return Object.values(Expansion)
    },
    hasMarineWorldsExpansion() : boolean {
      return (this.state.setup.expansions ?? []).includes(Expansion.MARINE_WORLDS)
    },    
  },
  methods: {
    hasExpansion(expansion : Expansion) : boolean {
      return (this.state.setup.expansions ?? []).includes(expansion)
    },
    toggleExpansion(expansion : Expansion) : void {
      this.state.setupToggleExpansion(expansion)
    },
  }
})
</script>
