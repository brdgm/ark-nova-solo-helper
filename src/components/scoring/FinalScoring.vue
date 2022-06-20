<template>
  <hr/> 
  <h3 class="mt-3">{{t('scoring.humanPlayers')}}</h3>
  <p><span v-html="t('scoring.humanPlayersText')"></span> <img src="@/assets/end-of-game.png" class="icon" alt=""/></p>

  <template v-for="bot in botCount" :key="bot">
    <h3><PlayerColorDisplay :playerColor="playerColors[playerCount+bot-1]" :sizeRem="1.75"/>{{t('roundBot.title', {bot:bot}, botCount)}}</h3>
    <p v-html="t('scoring.botText', {conservationPoints:getBotConservationPoints(bot),tokenScoringCardCount:getTokenScoringCardCount(bot),tokenNotepadCount:getTokenNotepadCount(bot)})"></p>
  </template>
  <hr/>

  <h3>{{t('scoring.victoryPoints')}}</h3>
  <table>
    <tr>
      <th></th>
      <th>{{t('scoring.conservationPoints')}}</th>
      <th>{{t('scoring.appeal')}}</th>
      <th>{{t('scoring.victoryPoints')}}</th>
    </tr>
    <tr v-for="player in playerCount" :key="player">
      <th><PlayerColorDisplay :playerColor="playerColors[player-1]" :sizeRem="1.5"/>{{t('roundPlayer.title', {player:player}, playerCount)}}</th>
      <td><input type="number" min="0" max="41" step="1" v-model="conservationPoints[player-1]" @focus="inputSelectAll"/></td>
      <td><input type="number" min="0" max="113" step="1" v-model="appeal[player-1]" @focus="inputSelectAll"/></td>
      <td>{{victoryPoints[player-1]}}</td>
    </tr>
    <tr v-for="bot in botCount" :key="bot">
      <th><PlayerColorDisplay :playerColor="playerColors[playerCount+bot-1]" :sizeRem="1.5"/>{{t('roundBot.title', {bot:bot}, botCount)}}</th>
      <td><input type="number" min="0" max="41" step="1" v-model="conservationPoints[playerCount+bot-1]" @focus="inputSelectAll"/></td>
      <td><input type="number" min="0" max="113" step="1" v-model="appeal[playerCount+bot-1]" @focus="inputSelectAll"/></td>
      <td>{{victoryPoints[playerCount+bot-1]}}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import PlayerColorDisplay from '@/components/structure/PlayerColorDisplay.vue'

export default defineComponent({
  name: 'FinalScoring',
  components: {
    PlayerColorDisplay
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()
    
    const playerSetup = store.state.setup.playerSetup
    const playerCount = playerSetup.playerCount
    const botCount = playerSetup.botCount
    const playerColors = playerSetup.playerColors
    const lastBotRound = []
    for (let botIndex=0; botIndex<botCount; botIndex++) {
      lastBotRound[botIndex] = store.state.rounds
          .map(round => round.botRound[botIndex])
          .reverse()
          .find(botRound => botRound != undefined)
    }

    return { t, playerCount, botCount, playerColors, lastBotRound }
  },
  data() {
    return {
      conservationPoints: [] as number[],
      appeal: [] as number[]
    }
  },
  computed: {
    victoryPoints() : number[] {
      const result = []
      for (let i=0; i<this.conservationPoints.length && i<this.appeal.length; i++) {
        result[i] = (this.appeal[i] || 0) - this.getAppealForConservationPoints(this.conservationPoints[i] || 0)
      }
      return result
    }
  },
  methods: {
    inputSelectAll(event: Event) : void {
      const input = event.target as HTMLInputElement
      input.select()
    },
    getTokenScoringCardCount(bot : number) : number {
      return this.lastBotRound[bot - 1]?.tokenScoringCardCount || 0
    },
    getTokenNotepadCount(bot : number) : number {
      return this.lastBotRound[bot - 1]?.tokenNotepadCount || 0
    },
    getBotConservationPoints(bot : number) : number {
      let scoringCardPoints = this.getTokenScoringCardCount(bot) - 2
      if (scoringCardPoints < 0) {
        scoringCardPoints = 0
      }
      else if (scoringCardPoints > 4) {
        scoringCardPoints = 4
      }
      return scoringCardPoints + this.getTokenNotepadCount(bot)
    },
    getAppealForConservationPoints(cp : number ) : number {
      let result
      if (cp > 10) {
        result = 94 - (cp - 10) * 3
      }
      else {
        result = 114 - cp * 2
      }
      return result > 0 ? result : 0
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 1rem;
  margin-top: -0.25rem;
}
th, td {
  text-align: center;
  min-width: 8rem;
  padding: 0.5rem;
}
th:nth-child(1) {
  text-align: start;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
input {
  width: 5rem;
}
</style>
