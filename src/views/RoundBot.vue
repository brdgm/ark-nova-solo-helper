<template>
  <div class="float-end text-end">
    <AboutARNO/>
    <RoundDisplay :round="round"/>
  </div>
  <h1><PlayerColorDisplay :playerColor="playerColor" class="me-2"/>{{t('roundBot.title', {bot:bot}, botCount)}}</h1>

  <BotActions :navigationState="navigationState"/>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-2">
    {{t('action.next')}}
  </router-link>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="finishGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import PlayerColorDisplay from '@/components/structure/PlayerColorDisplay.vue'
import BotActions from '@/components/round/BotActions.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import NavigationState from '@/util/NavigationState'
import AboutARNO from '@/components/structure/AboutARNO.vue'
import RoundDisplay from '@/components/structure/RoundDisplay.vue'

export default defineComponent({
  name: 'RoundBot',
  components: {
    PlayerColorDisplay,
    BotActions,
    FooterButtons,
    AboutARNO,
    RoundDisplay
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const store = useStore()

    const navigationState = new NavigationState(route, store)
    const round = navigationState.round
    const playerCount = navigationState.playerCount
    const botCount = navigationState.botCount
    const bot = navigationState.bot
    const playerColor = navigationState.playerColor

    return { t, navigationState, round, playerCount, botCount, bot, playerColor }
  },
  computed: {
    nextButtonRouteTo() : string {
      if (this.bot < this.botCount) {
        return `/round/${this.round}/bot/${this.bot+1}`
      }
      else {
        return `/round/${this.round+1}/player/1`
      }
    },
    backButtonRouteTo() : string {
      if (this.bot > 1) {
        return `/round/${this.round}/bot/${this.bot-1}`
      }
      else {
        return `/round/${this.round}/player/${this.playerCount}`
      }
    }
  }
})
</script>
