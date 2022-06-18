<template>
  <h1>{{t('roundBot.title', {bot:bot})}}</h1>

  <BotActions :navigationState="navigationState"/>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-2">
    {{t('action.next')}}
  </router-link>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import BotActions from '@/components/round/BotActions.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'RoundBot',
  components: {
    BotActions,
    FooterButtons
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

    return { t, navigationState, round, playerCount, botCount, bot }
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