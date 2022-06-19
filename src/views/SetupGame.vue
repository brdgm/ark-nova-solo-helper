<template>
  <AboutARNO/>
  <h1>{{t('setup.title')}}</h1>

  <Players/>
  <DifficultyLevel/>

  <router-link to="/round/1/player/1" class="btn btn-primary btn-lg mt-4">
    {{t('action.startGame')}}
  </router-link>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import Players from '@/components/setup/Players.vue'
import AboutARNO from '@/components/structure/AboutARNO.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    Players,
    DifficultyLevel,
    FooterButtons,
    AboutARNO
},
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
