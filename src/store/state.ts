import CardName from '@/services/enum/CardName'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import PlayerColor from '@/services/enum/PlayerColor'
import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import Expansion from '@/services/enum/Expansion'
import toggleArrayItem from '@brdgm/brdgm-commons/src/util/array/toggleArrayItem'

export const useStateStore = defineStore(`${name}.store`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1,
      setup: {
        playerSetup: {
          playerCount: 1,
          botCount: 1,
          playerColors: [PlayerColor.BLUE,PlayerColor.RED,PlayerColor.YELLOW,PlayerColor.BLACK]
        }
      },
      rounds: []
    } as State
  },
  actions: {
    setupToggleExpansion(expansion: Expansion) {
      if (!this.setup.expansions) {
        this.setup.expansions = []
      }
      toggleArrayItem(this.setup.expansions, expansion)
    },
    setupZooMaps(zooMaps: string[]) {
      this.setup.zooMaps = zooMaps
    },
    setupBotInitialSponsorCardDiscardCount(sponsorCardDiscardCount : number[]) {
      this.setup.botInitialSponsorCardDiscardCount = sponsorCardDiscardCount
    },
    round(botRound : BotRound) {
      let round = this.rounds[botRound.round - 1]
      if (!round) {
        round = {
          round : botRound.round,
          botRound: []
        }
      }
      round.botRound[botRound.bot - 1] = botRound
      this.rounds[botRound.round - 1] = round
      // remove persistance of all "future" rounds to ensure they are newly calculated
      this.rounds = this.rounds.filter(item => item.round <= botRound.round)
    },
    revertUpgradeCard(payload : BotRevertUpgradeCard) {
      // revert upgraded card for this bot in all rounds
      for (const round of this.rounds) {
        for (const botRound of round.botRound.filter(botRound => botRound.bot==payload.bot)) {
          botRound.cardSlots.upgradedCards = botRound.cardSlots.upgradedCards.filter(cardName => cardName != payload.cardName)
        }
      }
    },
    roundBreakSponsorCardDiscardCount(data: { round: number, botBreakSponsorCardDiscardCount : number[] }) {
      let round = this.rounds[data.round - 1]
      if (!round) {
        round = {
          round : data.round,
          botRound: []
        }
        this.rounds[data.round - 1] = round
      }
      round.botBreakSponsorCardDiscardCount = data.botBreakSponsorCardDiscardCount
    },
    roundBotSponsorCardDiscardCount(data: { round: number, bot: number, sponsorCardDiscardCount : number }) {
      const round = this.rounds[data.round - 1]
      if (round) {
        const botRound = round.botRound[data.bot - 1]
        if (botRound) {
          botRound.sponsorCardDiscardCount = data.sponsorCardDiscardCount
        }
      }
    },
    resetGame() {
      this.rounds = []
      this.setup.zooMaps = undefined
    }
  },
  persist: true
})

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  rounds: Round[]
}
export interface Setup {
  playerSetup: PlayerSetup
  difficultyLevel?: DifficultyLevel  // for backward-compatibility
  difficultyLevels?: DifficultyLevel[]  // difficulty level per bot
  zooMaps?: string[]
  expansions?: Expansion[]
  debugMode?: boolean
  botInitialSponsorCardDiscardCount?: number[]
}
export interface PlayerSetup {
  playerCount: number
  botCount: number
  playerColors: PlayerColor[]
}
export interface Round {
  round: number
  botRound: BotRound[]
  botBreakSponsorCardDiscardCount?: number[]
}
export interface BotRound {
  round: number
  bot: number
  cardSlots: CardSlotsPersistence
  slotNumber: number
  tokenScoringCardCount: number
  tokenNotepadCount: number
  appealCount?: number
  sponsorCardDiscardCount?: number
}
export interface CardSlotsPersistence {
  slots: CardName[]
  upgradedCards: CardName[]
}
export interface BotRevertUpgradeCard {
  bot: number
  cardName: CardName
}
