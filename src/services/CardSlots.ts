import { CardSlotsPersistence } from "@/store"
import * as _ from "lodash"
import Card from "./Card"
import Cards from "./Cards"
import CardName from "./enum/CardName"

export default class CardSlots {

  private _slots : Card[]
  private _upgradedCards : CardName[]

  public constructor(slots : Card[], upgradedCards : CardName[]) {
    this._slots = slots
    this._upgradedCards = upgradedCards
  }

  public get slots() : readonly Card[] {
    return this._slots
  }

  /**
   * Get card at slot position.
   * @param slot Slot number (1-based)
   */
  public get(slot : number) : Card {
    if (slot < 1 || slot > this._slots.length) {
      throw new Error(`Invalid slot number: ${slot}`)
    }
    return this._slots[slot - 1]
  }

  /**
   * Check if card is upgraded.
   */
  public isUpgraded(card : Card) : boolean {
    return this._upgradedCards.includes(card.name)
  }

  /**
   * Mark card as upgraded.
   */
  public upgradeCard(card : Card) : void {
    if (this.isUpgraded(card)) {      
      throw new Error(`Card is already upgraded: ${card.name}`)
    }
    this._upgradedCards.push(card.name)
  }

  /**
   * ARNO can upgrade max. 3 cards.
   * @return true if less then 3 cards are upgraded.
   */
  public canUpgradeCard() : boolean {
    return this._upgradedCards.length < 3;
  }

  /**
   * Move card to first position after usage.
   */
  public moveFirst(card : Card) : void {
    this._slots = [
      card,
      ...this._slots.filter(item => item.name != card.name)
    ]
  }

  /**
   * Gets persistence view of card slots.
   */
  public toPersistence() : CardSlotsPersistence {
    return {
      slots: this._slots.map(card => card.name),
      upgradedCards: _.cloneDeep(this._upgradedCards)
    }
  }

  /**
   * Creates a shuffled new card slots instance with random card order (but ANIMALS on first position).
   */
  public static new() : CardSlots {
    const cards = [
      Cards.get(CardName.ANIMALS),
      ..._.shuffle(Cards.getAll().filter(card => card.name != CardName.ANIMALS))
    ]
    return new CardSlots(cards, [])
  }

  /**
   * Re-creates card slots from persistence.
   */
  public static fromPersistence(persistence : CardSlotsPersistence) : CardSlots {
    return new CardSlots(
      persistence.slots.map(Cards.get),
      _.cloneDeep(persistence.upgradedCards)
    )
  }

}
