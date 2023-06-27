import BotActions from '@/services/BotActions'
import Cards from '@/services/Cards'
import CardSlots from '@/services/CardSlots'
import Action from '@/services/enum/Action'
import ActionCardDistributionSchema from '@/services/enum/ActionCardDistributionSchema'
import CardName from '@/services/enum/CardName'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { expect } from 'chai'

describe('services/BotActions', () => {
  it('randomPick', () => {
    const cardSlots = CardSlots.new()
    const botActions = BotActions.newRandomSlot(cardSlots, DifficultyLevel.L1_BEGINNER, ActionCardDistributionSchema.P0_25_25_25_25, 0)

    expect(botActions.activeCard).not.to.undefined
    expect(botActions.slotNumber).to.greaterThanOrEqual(2)
    expect(botActions.slotNumber).to.lessThanOrEqual(5)
    expect(botActions.actions.length, 'has actions').not.to.eq(0)
  })

  it('animals-standard-5-beginner', () => {
    const botActions = setup(CardName.ANIMALS, false, 5, DifficultyLevel.L1_BEGINNER)

    expect(botActions.activeCard.name).to.eq(CardName.ANIMALS)
    expect(botActions.actions).to.eql([{action: Action.APPEAL, amount: 5}])
    expect(botActions.hasFallback).to.false
  })

  it('animals-standard-2-easy', () => {
    const botActions = setup(CardName.ANIMALS, false, 2, DifficultyLevel.L3_EASY)

    expect(botActions.activeCard.name).to.eq(CardName.ANIMALS)
    expect(botActions.actions).to.eql([{action: Action.APPEAL, amount: 3}])
    expect(botActions.hasFallback).to.false
  })

  it('animals-upgrade-3-hard', () => {
    const botActions = setup(CardName.ANIMALS, true, 3, DifficultyLevel.L5_HARD)

    expect(botActions.activeCard.name).to.eq(CardName.ANIMALS)
    expect(botActions.actions).to.eql([{action: Action.APPEAL, amount: 6}])
    expect(botActions.hasFallback).to.false
  })

  it('association-standard-4-easy', () => {
    const botActions = setup(CardName.ASSOCIATION, false, 4, DifficultyLevel.L3_EASY)

    expect(botActions.activeCard.name).to.eq(CardName.ASSOCIATION)
    expect(botActions.actions).to.eql([{action: Action.GAIN_PARTNER_ZOO, amount: 0}])
    expect(botActions.hasFallback).to.true
    expect(botActions.fallbackActions).to.eql([
      {action: Action.CONSERVATION, amount: 2},
      {action: Action.BREAK, amount: 2},
      {action: Action.GAIN_PARTNER_ZOO_OR_UNIVERSITY, amount: 0}
    ])
  })

  it('association-upgraded-5-easy', () => {
    const botActions = setup(CardName.ASSOCIATION, true, 5, DifficultyLevel.L3_EASY)

    expect(botActions.activeCard.name).to.eq(CardName.ASSOCIATION)
    expect(botActions.actions).to.eql([
      {action: Action.CONSERVATION_PROJECT_WORK, amount: 0},
      {action: Action.DONATE, amount: 0}
    ])
    expect(botActions.hasFallback).to.true
    expect(botActions.fallbackActions).to.eql([
      {action: Action.CONSERVATION, amount: 2},
      {action: Action.BREAK, amount: 2},
      {action: Action.GAIN_PARTNER_ZOO_OR_UNIVERSITY, amount: 0}
    ])
  })

  it('sponsors-standard-2-easy', () => {
    const botActions = setup(CardName.SPONSORS, false, 2, DifficultyLevel.L3_EASY, 3)

    expect(botActions.activeCard.name).to.eq(CardName.SPONSORS)
    expect(botActions.actions).to.eql([
      {action: Action.REPUTATION, amount: 1},
      {action: Action.TOKEN_SCORING_CARD, amount: 1},
      {action: Action.BREAK, amount: 2}
    ])
    expect(botActions.hasFallback).to.false
    expect(botActions.getTokenScoringCardCount()).to.eq(1)
    expect(botActions.getTokenNotepadCount()).to.eq(0)
    expect(botActions.getAppealCount()).to.eq(0)
  })

  it('sponsors-standard-2-easy-tokencount-scoringcard-6', () => {
    const botActions = setup(CardName.SPONSORS, false, 2, DifficultyLevel.L3_EASY, 6)

    expect(botActions.activeCard.name).to.eq(CardName.SPONSORS)
    expect(botActions.actions).to.eql([
      {action: Action.REPUTATION, amount: 1},
      {action: Action.CONSERVATION, amount: 2},
      {action: Action.BREAK, amount: 2}
    ])
    expect(botActions.hasFallback).to.false
    expect(botActions.getTokenScoringCardCount()).to.eq(0)
    expect(botActions.getTokenNotepadCount()).to.eq(0)
    expect(botActions.getAppealCount()).to.eq(0)
  })

  it('sponsors-upgraded-3-easy', () => {
    const botActions = setup(CardName.SPONSORS, true, 3, DifficultyLevel.L3_EASY)

    expect(botActions.activeCard.name).to.eq(CardName.SPONSORS)
    expect(botActions.actions).to.eql([
      {action: Action.APPEAL, amount: 3},
      {action: Action.TOKEN_NOTEPAD, amount: 1},
      {action: Action.BREAK, amount: 3}
    ])
    expect(botActions.hasFallback).to.false
    expect(botActions.getTokenScoringCardCount()).to.eq(0)
    expect(botActions.getTokenNotepadCount()).to.eq(1)
    expect(botActions.getAppealCount()).to.eq(3)
  })

  it('build-standard-5-hard', () => {
    const botActions = setup(CardName.BUILD, false, 5, DifficultyLevel.L5_HARD)

    expect(botActions.activeCard.name).to.eq(CardName.BUILD)
    expect(botActions.actions).to.eql([{action: Action.CONSERVATION, amount: 4}])
    expect(botActions.hasFallback).to.false
  })

  it('build-upgraded-2-easy', () => {
    const botActions = setup(CardName.BUILD, true, 2, DifficultyLevel.L3_EASY)

    expect(botActions.activeCard.name).to.eq(CardName.BUILD)
    expect(botActions.actions).to.eql([{action: Action.REPUTATION, amount: 2}])
    expect(botActions.hasFallback).to.false
  })

  it('cards-standard-3-easy', () => {
    const botActions = setup(CardName.CARDS, false, 3, DifficultyLevel.L3_EASY)

    expect(botActions.activeCard.name).to.eq(CardName.CARDS)
    expect(botActions.actions).to.eql([
      {action: Action.CONSERVATION, amount: 1},
      {action: Action.TAKE_CARD_DISPLAY, amount: 0},
      {action: Action.BREAK, amount: 1},
      {action: Action.APPEAL, amount: 2}
    ])
    expect(botActions.hasFallback).to.false
  })

})

function setup(card : CardName, upgraded : boolean, slot : number, difficultyLevel : DifficultyLevel, tokenScoringCardCount = 0) : BotActions {
  const otherCards = Cards.getAll().filter(item => item.name != card).map(item => item.name)
  const cardSlots = CardSlots.fromPersistence({
    slots: [...otherCards.slice(0,slot-1), card, ...otherCards.slice(slot-1,4)],
    upgradedCards: upgraded ? [ card ] : []
  })
  return BotActions.newWithSlot(cardSlots, difficultyLevel, slot, tokenScoringCardCount)
}
