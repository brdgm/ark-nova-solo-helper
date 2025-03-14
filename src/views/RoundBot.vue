<template>
  <div class="float-end text-end">
    <AboutARNO/>
    <BreakInfo :round="round"/>
    <RoundDisplay :navigation-state="navigationState"/>
    <BonusTile/>
    <ProjectTrackerArnoStatus :round="round"/>
  </div>
  <h1><PlayerColorDisplay :playerColor="playerColor" class="me-2"/>{{t('roundBot.title', {bot:bot}, botCount)}}</h1>

  <BotActions :navigationState="navigationState"/>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-2">
    {{t('action.next')}}
  </router-link>

  <BotDebugInfo :navigation-state="navigationState" v-if="state.setup.debugMode"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="finishGame"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PlayerColorDisplay from '@/components/structure/PlayerColorDisplay.vue'
import BotActions from '@/components/round/BotActions.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import AboutARNO from '@/components/structure/AboutARNO.vue'
import RoundDisplay from '@/components/structure/RoundDisplay.vue'
import BreakInfo from '@/components/structure/BreakInfo.vue'
import BotDebugInfo from '@/components/round/BotDebugInfo.vue'
import ProjectTrackerArnoStatus from '@/components/structure/ProjectTrackerArnoStatus.vue'
import BonusTile from '@/components/round/BonusTile.vue'

export default defineComponent({
  name: 'RoundBot',
  components: {
    PlayerColorDisplay,
    BotActions,
    FooterButtons,
    AboutARNO,
    RoundDisplay,
    BreakInfo,
    BotDebugInfo,
    ProjectTrackerArnoStatus,
    BonusTile
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route)
    const round = navigationState.round
    const playerCount = navigationState.playerCount
    const botCount = navigationState.botCount
    const bot = navigationState.bot
    const playerColor = navigationState.playerColor
    const keyDownHandler = ref((_event:KeyboardEvent) => {})  // eslint-disable-line @typescript-eslint/no-unused-vars

    return { t, state, navigationState, round, playerCount, botCount, bot, playerColor, keyDownHandler }
  },
  mounted() {
    this.keyDownHandler = (event:KeyboardEvent) => {
      if (event.key == 'PageDown') {
        this.$router.push(this.nextButtonRouteTo)
      }
      if (event.key == 'PageUp') {
        this.$router.push(this.backButtonRouteTo)
      }
    }
    window.addEventListener('keydown', this.keyDownHandler)
  },
  unmounted() {
    window.removeEventListener('keydown', this.keyDownHandler)
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
