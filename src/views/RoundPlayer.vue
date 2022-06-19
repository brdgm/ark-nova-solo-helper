<template>
  <AboutARNO/>  
  <h1><PlayerColorDisplay :playerColor="playerColor"/>{{t('roundPlayer.title', {player:player})}}</h1>

  <p class="mt-4">{{t('roundPlayer.info')}}</p>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </router-link>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import PlayerColorDisplay from '@/components/structure/PlayerColorDisplay.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import AboutARNO from '@/components/structure/AboutARNO.vue'

export default defineComponent({
  name: 'RoundPlayer',
  components: {
    PlayerColorDisplay,
    FooterButtons,
    AboutARNO
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const store = useStore()

    const navigationState = new NavigationState(route, store)
    const round = navigationState.round
    const playerCount = navigationState.playerCount
    const botCount = navigationState.botCount
    const player = navigationState.player
    const playerColor = navigationState.playerColor

    return { t, round, playerCount, botCount, player, playerColor }
  },
  computed: {
    nextButtonRouteTo() : string {
      if (this.player < this.playerCount) {
        return `/round/${this.round}/player/${this.player+1}`
      }
      else {
        return `/round/${this.round}/bot/1`
      }
    },
    backButtonRouteTo() : string {
      if (this.round == 1 && this.player == 1) {
        return ''
      }
      else if (this.player > 1) {
        return `/round/${this.round}/player/${this.player-1}`
      }
      else {
        return `/round/${this.round-1}/bot/${this.botCount}`
      }
    }
  }
})
</script>
