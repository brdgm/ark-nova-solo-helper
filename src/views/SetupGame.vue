<template>
  <div class="float-end text-end">
    <AboutARNO/>
  </div>
  <h1>{{t('setup.title')}}</h1>

  <Players/>
  <DifficultyLevel/>
  <ActionCardDistribution/>

  <router-link to="/setupARNO" class="btn btn-primary btn-lg mt-4">
    {{t('setupARNO.title')}}
  </router-link>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Players from '@/components/setup/Players.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import ActionCardDistribution from '@/components/setup/ActionCardDistribution.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import AboutARNO from '@/components/structure/AboutARNO.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    Players,
    DifficultyLevel,
    ActionCardDistribution,
    FooterButtons,
    AboutARNO
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
