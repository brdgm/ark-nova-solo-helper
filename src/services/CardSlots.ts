import { CardSlotsPersistence } from '@/store/state'
import { shuffle, cloneDeep } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import CardName from './enum/CardName'
import { ref } from 'vue'

export default class CardSlots {

  private _slots
  private _upgradedCards

  public constructor(slots : Card[], upgradedCards : CardName[]) {
    this._slots = ref(slots)
    this._upgradedCards = ref(upgradedCards)
  }

  public get slots() : readonly Card[] {
    return this._slots.value
  }

  public get upgradedCardNames() : readonly CardName[] {
    return this._upgradedCards.value
  }

  /**
   * Get card at slot position.
   * @param slot Slot number (1-based)
   */
  public get(slot : number) : Card {
    if (slot < 1 || slot > this._slots.value.length) {
      throw new Error(`Invalid slot number: ${slot}`)
    }
    return this._slots.value[slot - 1]
  }

  /**
   * Check if card is upgraded.
   */
  public isUpgraded(card : Card) : boolean {
    return this._upgradedCards.value.includes(card.name)
  }

  /**
   * Mark card as upgraded.
   */
  public upgradeCard(card : Card) : void {
    if (this.isUpgraded(card)) {      
      throw new Error(`Card is already upgraded: ${card.name}`)
    }
    this._upgradedCards.value.push(card.name)
  }

  /**
   * Revert upgraded card.
   */
   public revertUpgradeCard(card : Card) : void {
    if (!this.isUpgraded(card)) {      
      throw new Error(`Card is not upgraded: ${card.name}`)
    }
    this._upgradedCards.value = this._upgradedCards.value.filter(item => item != card.name)
  }

  /**
   * ARNO can upgrade max. 3 cards.
   * @return true if less then 3 cards are upgraded.
   */
  public canUpgradeCard() : boolean {
    return this._upgradedCards.value.length < 3
  }

  /**
   * @returns Whether upgrade cards can be reverted (at least one is upgraded).
   */
  public canRevertUpgradeCard() : boolean {
    return this._upgradedCards.value.length > 0
  }

  /**
   * Move card to first position after usage.
   */
  public moveFirst(card : Card) : void {
    this._slots.value = [
      card,
      ...this._slots.value.filter(item => item.name != card.name)
    ]
  }

  /**
   * Gets persistence view of card slots.
   */
  public toPersistence() : CardSlotsPersistence {
    return {
      slots: this._slots.value.map(card => card.name),
      upgradedCards: cloneDeep(this._upgradedCards.value)
    }
  }

  /**
   * Creates a shuffled new card slots instance with random card order (but ANIMALS on first position).
   */
  public static new() : CardSlots {
    const cards = [
      Cards.get(CardName.ANIMALS),
      ...shuffle(Cards.getAll().filter(card => card.name != CardName.ANIMALS))
    ]
    return new CardSlots(cards, [])
  }

  /**
   * Re-creates card slots from persistence.
   */
  public static fromPersistence(persistence : CardSlotsPersistence) : CardSlots {
    return new CardSlots(
      persistence.slots.map(Cards.get),
      cloneDeep(persistence.upgradedCards)
    )
  }

}
