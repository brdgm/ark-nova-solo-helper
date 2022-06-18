import rollDice from "brdgm-commons/src/util/random/rollDice"
import BotAction from "./BotAction"
import Card, { CardAction } from "./Card"
import CardSlots from "./CardSlots"
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

  /**
   * @param cardSlots Card slots
   * @param difficultyLevel Difficulty level
   * @param slotNumber Slot number - only used for testing. If omitted, number is determined randomly.
   */
  public constructor(cardSlots : CardSlots, difficultyLevel : DifficultyLevel, slotNumber? : number) {
    this._slotNumber = slotNumber ? slotNumber : this.determineSlotNumber()
    this._activeCard = cardSlots.get(this._slotNumber)
    this._cardUpgraded = cardSlots.isUpgraded(this._activeCard)

    // determine actions
    this._actions = this.getActions(difficultyLevel)
    this._fallbackActions = this.getActions(difficultyLevel, true)

    // move card to first position for next turn
    cardSlots.moveFirst(this._activeCard)
  }

  public get activeCard() : Card {
    return this._activeCard
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

  /**
   * Randomly determine next slot to play by rolling a D4
   * @returns Slot 2..5
   */
  private determineSlotNumber() : number {
    return rollDice(4) + 1
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

}
