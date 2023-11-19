<template>
  <div class="float-end text-end">
    <AboutARNO/>
  </div>
  <h1>{{t('setup.title')}}</h1>

  <PlayersSetup/>
  <DifficultyLevel/>
  <PickZooMap/>
  <ExpansionsSetup/>

  <router-link to="/setupARNO" class="btn btn-primary btn-lg mt-4">
    {{t('setupARNO.title')}}
  </router-link>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import PlayersSetup from '@/components/setup/PlayersSetup.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import AboutARNO from '@/components/structure/AboutARNO.vue'
import PickZooMap from '@/components/setup/PickZooMap.vue'
import ExpansionsSetup from '@/components/setup/ExpansionsSetup.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    PlayersSetup,
    DifficultyLevel,
    FooterButtons,
    AboutARNO,
    PickZooMap,
    ExpansionsSetup
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
