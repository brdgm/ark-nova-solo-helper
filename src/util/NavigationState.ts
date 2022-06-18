import CardSlots from "@/services/CardSlots"
import DifficultyLevel from "@/services/enum/DifficultyLevel"
import { BotRound, State } from "@/store"
import { RouteLocation } from "vue-router"
import { Store } from "vuex"
import BotActions from "@/services/BotActions"

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly playerCount : number
  readonly botCount : number
  readonly round : number
  readonly player : number
  readonly bot : number
  readonly botRound? : BotRound  

  constructor(route : RouteLocation, store : Store<State>) {    
    const setup = store.state.setup
    this.difficultyLevel = setup.difficultyLevel
    this.playerCount = setup.playerCount
    this.botCount = setup.botCount

    this.round = parseInt(route.params['round'] as string)
    this.player = (route.name == 'RoundPlayer') ? parseInt(route.params['player'] as string) : 0
    this.bot = (route.name == 'RoundBot') ? parseInt(route.params['bot'] as string) : 0
    this.botRound = this.getBotRound(store, this.round, this.bot)
  }

  private getBotRound(store : Store<State>, roundNumber : number, botNumber : number) : BotRound | undefined {
    if (roundNumber <= 0 || botNumber <= 0) {
      return undefined
    }
    let botRound
    const round = store.state.rounds[roundNumber - 1]
    if (round) {
      botRound = round.botRound[botNumber - 1]      
    }
    if (!botRound) {
      let cardSlots, botActions
      let tokenScoringCardCount = 0
      let tokenNotepadCount = 0
      if (roundNumber == 1) {
        // start new game
        cardSlots = CardSlots.new()
        botActions = BotActions.newRandomSlot(cardSlots, this.difficultyLevel)
      }
      else {
        // continue with cards from previous round
        const previousRound = this.getBotRound(store, roundNumber - 1, botNumber)
        if (!previousRound) {
          throw new Error('No previous round.')
        }
        cardSlots = CardSlots.fromPersistence(previousRound.cardSlots)
        tokenScoringCardCount = previousRound.tokenScoringCardCount
        tokenNotepadCount = previousRound.tokenNotepadCount
        // move previous card to first position
        cardSlots.moveFirst(cardSlots.get(previousRound.slotNumber))
        botActions = BotActions.newRandomSlot(cardSlots, this.difficultyLevel)
      }
      botRound = {
        round: roundNumber,
        bot: botNumber,
        cardSlots: cardSlots.toPersistence(),
        slotNumber: botActions.slotNumber,
        tokenScoringCardCount: tokenScoringCardCount + botActions.getTokenScoringCardCount(),
        tokenNotepadCount: tokenNotepadCount + botActions.getTokenNotepadCount() 
      }
      store.commit('round', botRound)
    }
    return botRound
  }

}
