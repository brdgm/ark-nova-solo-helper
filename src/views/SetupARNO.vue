<template>
  <div class="float-end text-end">
    <AboutARNO/>
  </div>
  <h1>{{t('setupARNO.title')}}</h1>

  <SetupARNOInstructions/>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

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
  },
  methods:{
    startGame() : void {
      this.$store.commit('resetGame')
      this.$router.push('/round/1/player/1')
    }
  }
})
</script>
