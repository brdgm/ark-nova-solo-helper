<template>
  <hr/> 
  <h3 class="mt-3">{{t('scoring.humanPlayers')}}</h3>
  <p><span v-html="t('scoring.humanPlayersText')"></span> <img src="@/assets/end-of-game.png" class="icon" alt=""/></p>

  <template v-for="bot in botCount" :key="bot">
    <h3><PlayerColorDisplay :playerColor="playerColors[playerCount+bot-1]" :sizeRem="1.75"/>{{t('roundBot.title', {bot:bot}, botCount)}}</h3>
    <p v-html="t('scoring.botText', {conservationPoints:getBotConservationPoints(bot),tokenScoringCardCount:getTokenScoringCardCount(bot),tokenNotepadCount:getTokenNotepadCount(bot)})"></p>
  </template>
  <hr/>

  <h3 v-html="t('scoring.victoryPoints')"></h3>
  <table>
    <tr>
      <th></th>
      <th v-html="t('scoring.conservationPoints')"></th>
      <th v-html="t('scoring.appeal')"></th>
      <th v-html="t('scoring.victoryPoints')"></th>
    </tr>
    <tr v-for="player in playerCount" :key="player">
      <th class="player"><PlayerColorDisplay :playerColor="playerColors[player-1]" :sizeRem="1.5"/>{{t('roundPlayer.title', {player:player}, playerCount)}}</th>
      <td><input type="number" min="0" max="41" step="1" v-model="conservationPoints[player-1]" @focus="inputSelectAll"/></td>
      <td><input type="number" min="0" max="113" step="1" v-model="appeal[player-1]" @focus="inputSelectAll"/></td>
      <td>{{victoryPoints[player-1]}}</td>
    </tr>
    <tr v-for="bot in botCount" :key="bot">
      <th class="player"><PlayerColorDisplay :playerColor="playerColors[playerCount+bot-1]" :sizeRem="1.5"/>{{t('roundBot.title', {bot:bot}, botCount)}}</th>
      <td><input type="number" min="0" max="41" step="1" v-model="conservationPoints[playerCount+bot-1]" @focus="inputSelectAll"/></td>
      <td><input type="number" min="0" max="113" step="1" v-model="appeal[playerCount+bot-1]" @focus="inputSelectAll"/></td>
      <td>{{victoryPoints[playerCount+bot-1]}}</td>
    </tr>
  </table>

  <p class="fst-italic small mt-3" v-html="t('scoring.appealReputationTrack')"></p>
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
      appeal: this.getInitialAppealArray()
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
    getAppealCount(bot : number) : number {
      return this.lastBotRound[bot - 1]?.appealCount || 0
    },
    getInitialAppealArray() : number[] {
      const result = [] as number[]
      for (let bot=1; bot<=this.botCount; bot++) {
        result[this.playerCount + bot - 1] = this.getAppealCount(bot)
      }
      return result
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
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/grid";

.icon {
  height: 1rem;
  margin-top: -0.25rem;
}
table {
  width: 100%;
  max-width: 40rem;
}
th, td {
  text-align: center;
  padding: 0.5rem;
}
th:nth-child(1) {
  text-align: start;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
th.player {
  white-space: nowrap;
}
input {
  width: 5rem;
}

@include media-breakpoint-down(sm) {
  input {
    width: 3rem;
  }
}
</style>
