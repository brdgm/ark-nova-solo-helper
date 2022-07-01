<template>
  <div>{{t('roundDisplay.round', {round:round})}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'RoundDisplay',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    round: {
      type: Number,
      required: true
    }
  }
})
</script>
