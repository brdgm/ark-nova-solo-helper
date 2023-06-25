import ActionCardDistributionSchema from '@/services/enum/ActionCardDistributionSchema'
import CardName from '@/services/enum/CardName'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import PlayerColor from '@/services/enum/PlayerColor'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

const LOCALSTORAGE_KEY = process.env.VUE_APP_LOCALSTORAGE_KEY_PREFIX + 'store'

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  rounds: Round[]
}
export interface Setup {
  playerSetup: PlayerSetup
  difficultyLevel: DifficultyLevel
  zooMaps?: string[]
  actionCardDistribution: ActionCardDistributionSchema
  debugMode?: boolean
}
export interface PlayerSetup {
  playerCount: number
  botCount: number
  playerColors: PlayerColor[]
}
export interface Round {
  round: number
  botRound: BotRound[]
}
export interface BotRound {
  round: number
  bot: number
  cardSlots: CardSlotsPersistence
  slotNumber: number
  tokenScoringCardCount: number
  tokenNotepadCount: number
  appealCount?: number
}
export interface CardSlotsPersistence {
  slots: CardName[]
  upgradedCards: CardName[]
}
export interface BotRevertUpgradeCard {
  bot: number
  cardName: CardName
}

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    language: 'en',
    baseFontSize: 1.0,
    setup: {
      playerSetup: {
        playerCount: 1,
        botCount: 1,
        playerColors: [PlayerColor.BLUE,PlayerColor.RED,PlayerColor.YELLOW,PlayerColor.BLACK]
      },
      difficultyLevel: DifficultyLevel.L1_BEGINNER,
      actionCardDistribution: ActionCardDistributionSchema.P0_25_25_25_25
    },
    rounds: []
  },
  mutations: {
    // reload state from local storage
    initialiseStore(state) {
      const localStorageCache = localStorage.getItem(LOCALSTORAGE_KEY)
      if (localStorageCache) {
        this.replaceState(Object.assign(state, JSON.parse(localStorageCache)));
      }
    },
    debugMode(state : State, enabled: boolean) {
      state.setup.debugMode = enabled
    },
    language(state : State, language: string) {
      state.language = language
    },
    setupPlayer(state : State, playerSetup: PlayerSetup) {
      state.setup.playerSetup = playerSetup
    },
    setupDifficultyLevel(state : State, level: number) {
      state.setup.difficultyLevel = level
    },
    setupActionCardDistribution(state : State, schema: ActionCardDistributionSchema) {
      state.setup.actionCardDistribution = schema
    },
    setupZooMaps(state : State, zooMaps: string[]) {
      state.setup.zooMaps = zooMaps
    },
    round(state : State, botRound : BotRound) {
      let round = state.rounds[botRound.round - 1]
      if (!round) {
        round = {
          round : botRound.round,
          botRound: []
        }
      }
      round.botRound[botRound.bot - 1] = botRound
      state.rounds[botRound.round - 1] = round
      // remove persistance of all "future" rounds to ensure they are newly calculated
      state.rounds = state.rounds.filter(item => item.round <= botRound.round)
    },
    revertUpgradeCard(state : State, payload : BotRevertUpgradeCard) {
      // revert upgraded card for this bot in all rounds
      for (const round of state.rounds) {
        round.botRound
            .filter(botRound => botRound.bot==payload.bot)
            .forEach(botRound => {
              botRound.cardSlots.upgradedCards = botRound.cardSlots.upgradedCards.filter(cardName => cardName != payload.cardName)
            })
      }
    },
    resetGame(state : State) {
      state.rounds = []
      state.setup.zooMaps = undefined;
    },
    zoomFontSize(state : State, baseFontSize: number) {
      state.baseFontSize = baseFontSize
    }
  }
})

store.subscribe((_mutation, state) => {
	// store state asJSON string in local storage
	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
})

// define your own `useStore` composition function
export function useStore() : Store<State> {
  return baseUseStore(key)
}
