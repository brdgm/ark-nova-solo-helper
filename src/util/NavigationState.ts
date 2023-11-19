import CardSlots from '@/services/CardSlots'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { BotRound, State } from '@/store'
import { RouteLocation } from 'vue-router'
import { Store } from 'vuex'
import BotActions from '@/services/BotActions'
import PlayerColor from '@/services/enum/PlayerColor'
import getDifficultyLevel from './getDifficultyLevel'

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly playerCount : number
  readonly botCount : number
  readonly round : number
  readonly player : number
  readonly bot : number
  readonly botRound? : BotRound
  readonly playerColor : PlayerColor
  readonly previousBotRound? : BotRound

  constructor(route : RouteLocation, store : Store<State>) {    
    const setup = store.state.setup
    this.playerCount = setup.playerSetup.playerCount
    this.botCount = setup.playerSetup.botCount

    this.round = parseInt(route.params['round'] as string)
    this.player = (route.name == 'RoundPlayer') ? parseInt(route.params['player'] as string) : 0
    this.bot = (route.name == 'RoundBot') ? parseInt(route.params['bot'] as string) : 0
    this.difficultyLevel = getDifficultyLevel(setup, this.bot)
    this.previousBotRound = this.getBotRound(store, this.round - 1, this.bot)
    this.botRound = this.getBotRound(store, this.round, this.bot)
    this.playerColor = this.getPlayerColor(setup.playerSetup.playerColors)
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
      let appealCount = 0
      if (roundNumber == 1) {
        // start new game
        cardSlots = CardSlots.new()
        botActions = BotActions.newRandomSlot(cardSlots, this.difficultyLevel, tokenScoringCardCount)
        // start appeal depending on player order
        appealCount = botNumber + this.playerCount - 1
      }
      else {
        // continue with cards from previous round
        if (!this.previousBotRound) {
          throw new Error('No previous round.')
        }
        cardSlots = CardSlots.fromPersistence(this.previousBotRound.cardSlots)
        tokenScoringCardCount = this.previousBotRound.tokenScoringCardCount
        tokenNotepadCount = this.previousBotRound.tokenNotepadCount
        appealCount = this.previousBotRound.appealCount ?? 0
        // move previous card to first position
        cardSlots.moveFirst(cardSlots.get(this.previousBotRound.slotNumber))
        botActions = BotActions.newRandomSlot(cardSlots, this.difficultyLevel, tokenScoringCardCount)
      }
      botRound = {
        round: roundNumber,
        bot: botNumber,
        cardSlots: cardSlots.toPersistence(),
        slotNumber: botActions.slotNumber,
        tokenScoringCardCount: tokenScoringCardCount + botActions.getTokenScoringCardCount(),
        tokenNotepadCount: tokenNotepadCount + botActions.getTokenNotepadCount(),
        appealCount: appealCount + botActions.getAppealCount()
      }
      store.commit('round', botRound)
    }
    return botRound
  }

  private getPlayerColor(playerColors : PlayerColor[]) : PlayerColor {
    let playerColor
    if (this.player > 0) {
      playerColor = playerColors[this.player - 1]
    }
    if (this.bot > 0) {
      playerColor = playerColors[this.playerCount + this.bot - 1]
    }
    return playerColor ?? PlayerColor.BLUE
  }

}
