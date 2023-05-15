<template>
  <div>{{t('roundDisplay.round', {round:round})}}</div>
  <div class="small text-muted">{{t(`difficultyLevel.${difficultyLevel}`)}}</div>
</template>

<script lang="ts">
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { useStore } from '@/store'
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
    round: {
      type: Number,
      required: true
    }
  },
  computed: {
    difficultyLevel() : DifficultyLevel {
      return this.$store.state.setup.difficultyLevel
    }
  }
})
</script>
