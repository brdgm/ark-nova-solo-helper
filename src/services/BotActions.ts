import rollDice from "brdgm-commons/src/util/random/rollDice"
import BotAction from "./BotAction"
import Card, { CardAction } from "./Card"
import CardSlots from "./CardSlots"
import Action from "./enum/Action"
import DifficultyLevel from "./enum/DifficultyLevel"

/**
 * Gets next actions for ARNO bot to play.
 */
export default class BotActions {

  private _slotNumber : number
  private _activeCard : Card
  private _cardUpgraded : boolean
  private _actions : BotAction[]
  private _fallbackActions : BotAction[]

  private constructor(cardSlots : CardSlots, difficultyLevel : DifficultyLevel, slotNumber : number) {
    this._slotNumber = slotNumber
    this._activeCard = cardSlots.get(this._slotNumber)
    this._cardUpgraded = cardSlots.isUpgraded(this._activeCard)
    // determine actions
    this._actions = this.getActions(difficultyLevel)
    this._fallbackActions = this.getActions(difficultyLevel, true)
  }

  public get activeCard() : Card {
    return this._activeCard
  }

  public get slotNumber() : number {
    return this._slotNumber
  }

  public get actions() : readonly BotAction[] {
    return this._actions
  }

  public get fallbackActions() : readonly BotAction[] {
    return this._fallbackActions
  }

  public get hasFallback() : boolean {
    return this._fallbackActions.length > 0
  }

  private getActions(difficultyLevel : DifficultyLevel, fallback? : boolean) : BotAction[] {
    const cardActions = this._cardUpgraded ? this._activeCard.upgradedActions : this._activeCard.standardActions
    return cardActions
        .filter(action => !action.slotFilter || action.slotFilter == this._slotNumber)
        .filter(action => !action.difficultyLevelFilter || action.difficultyLevelFilter == difficultyLevel)
        .filter(action => action.fallback == fallback)
        .map(action => BotActions.toBotAction(action, this._slotNumber))
  }

  private static toBotAction(action : CardAction, slotNumber : number) : BotAction {
    let amount = 0
    if (action.amount) {
      amount += action.amount
    }
    if (action.slotAmount) {
      amount += slotNumber
    }
    return {
      action: action.action,
      amount: amount
    }
  }

  public getTokenScoringCardCount() : number {
    return this.getAmountSum(Action.TOKEN_SCORING_CARD)
  }

  public getTokenNotepadCount() : number {
    return this.getAmountSum(Action.TOKEN_NOTEPAD)
  }

  private getAmountSum(action : Action) : number {
    return this._actions
        .filter(item => item.action == action)
        .map(item => item.amount)
        .reduce((previous, current) => previous + current, 0);
  }

  public static newRandomSlot(cardSlots : CardSlots, difficultyLevel : DifficultyLevel) : BotActions {
    // randomly determine next slot 2..5 to play by rolling a D4
    const slotNumber = rollDice(4) + 1
    return new BotActions(cardSlots, difficultyLevel, slotNumber)
  }

  public static newWithSlot(cardSlots : CardSlots, difficultyLevel : DifficultyLevel, slotNumber : number) : BotActions {
    return new BotActions(cardSlots, difficultyLevel, slotNumber)
  }

}
