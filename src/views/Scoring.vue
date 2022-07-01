<template>
  <h1>{{t('scoring.title')}}</h1>

  <FinalScoring/>

  <FooterButtons endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FinalScoring from '@/components/scoring/FinalScoring.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'RoundPlayer',
  components: {
    FinalScoring,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
