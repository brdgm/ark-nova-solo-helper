<template>
  <AboutARNO/>
  <h1>{{t('setupARNO.title')}}</h1>

  <SetupARNOInstructions/>

  <router-link to="/round/1/player/1" class="btn btn-primary btn-lg mt-4">
    {{t('action.startGame')}}
  </router-link>

  <FooterButtons backButtonRouteTo="/setupGame"  endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import SetupARNOInstructions from '@/components/setup/SetupARNOInstructions.vue'
import AboutARNO from '@/components/structure/AboutARNO.vue'

export default defineComponent({
  name: 'SetupARNO',
  components: {
    SetupARNOInstructions,
    FooterButtons,
    AboutARNO
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
