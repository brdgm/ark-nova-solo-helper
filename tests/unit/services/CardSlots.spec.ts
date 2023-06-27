import CardSlots from '@/services/CardSlots'
import CardName from '@/services/enum/CardName'
import { expect } from 'chai'

describe('services/CardSlots', () => {
  it('newShuffled', () => {
    const cardSlots = CardSlots.new()

    expect(cardSlots.slots.length).to.eq(5)
    expect(cardSlots.slots[0].name).to.eq(CardName.ANIMALS)
    cardSlots.slots.forEach(card => {
      expect(cardSlots.isUpgraded(card), `card '${card.name}' upgraded`).to.false
    })
  })

  it('upgradeAndMove', () => {
    const cardSlots = CardSlots.fromPersistence({
      slots: [CardName.ASSOCIATION, CardName.ANIMALS, CardName.BUILD, CardName.SPONSORS, CardName.CARDS],
      upgradedCards: [CardName.BUILD]
    })

    expect(cardSlots.isUpgraded(cardSlots.get(3)), `card 'build' upgraded`).to.true
    expect(cardSlots.isUpgraded(cardSlots.get(1)), `card 'association' upgraded`).to.false
    expect(cardSlots.canUpgradeCard(), `can upgrade card`).to.true

    // upgrade first card
    cardSlots.upgradeCard(cardSlots.get(1))
    expect(cardSlots.isUpgraded(cardSlots.get(1)), `card 'association' upgraded`).to.true

    // use sponsors card
    cardSlots.moveFirst(cardSlots.get(4))

    const persistence = cardSlots.toPersistence()
    expect(persistence.slots).to.eql([CardName.SPONSORS, CardName.ASSOCIATION, CardName.ANIMALS, CardName.BUILD, CardName.CARDS])
    expect(persistence.upgradedCards).to.eql([CardName.BUILD, CardName.ASSOCIATION])
  })

  it('revertUpgradedCard', () => {
    const cardSlots = CardSlots.fromPersistence({
      slots: [CardName.ASSOCIATION, CardName.ANIMALS, CardName.BUILD, CardName.SPONSORS, CardName.CARDS],
      upgradedCards: [CardName.BUILD,CardName.ASSOCIATION]
    })
    expect(cardSlots.canRevertUpgradeCard(), `can revert upgrade card`).to.true

    expect(cardSlots.isUpgraded(cardSlots.get(1)), `card 'association' upgraded`).to.true
    expect(cardSlots.isUpgraded(cardSlots.get(3)), `card 'build' upgraded`).to.true

    // revert upgrade
    cardSlots.revertUpgradeCard(cardSlots.get(3))
    expect(cardSlots.isUpgraded(cardSlots.get(1)), `card 'association' upgraded`).to.true
    expect(cardSlots.isUpgraded(cardSlots.get(3)), `card 'build' not upgraded`).to.false
  })
})
