<template>
  <h3 class="mt-4 mb-3">{{t('setup.actionCardDistribution.title')}}</h3>

  <div class="row mt-3">
    <div class="col-5 col-md-3">
      <label for="playerCount" class="form-label">{{t('setup.actionCardDistribution.schema')}}</label>
    </div>
    <div class="col-5 col-md-3">
      <select class="form-select" v-model="selectedSchema">
        <option v-for="(schema,index) in schemas" :key="index" :value="schema+''">{{schema}}</option>
      </select>
    </div>
  </div>
  <p class="mt-3">{{t('setup.actionCardDistribution.text')}}</p>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import ActionCardDistributionSchema from '@/services/enum/ActionCardDistributionSchema'

export default defineComponent({
  name: 'ActionCardDistribution',
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  data() {
    return {
      selectedSchema: this.$store.state.setup.actionCardDistribution || ActionCardDistributionSchema.P0_25_25_25_25
    }
  },
  computed: {
    schemas() : ActionCardDistributionSchema[] {
      return Object.values(ActionCardDistributionSchema)
    }
  },
  watch: {
    selectedSchema() : void {
      this.$store.commit('setupActionCardDistribution', this.selectedSchema)
    }
  }
})
</script>
