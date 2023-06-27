<template>
  <div>{{t('roundDisplay.round', {round:navigationState.round})}}</div>
  <div v-if="navigationState.botRound" class="small text-muted">{{t(`difficultyLevel.${navigationState.difficultyLevel}`)}}</div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'RoundDisplay',
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  }
})
</script>
