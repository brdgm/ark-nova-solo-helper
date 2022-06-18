import findMandatory from "brdgm-commons/src/util/map/findMandatory";
import Card from "./Card";
import Action from "./enum/Action";
import CardName from "./enum/CardName";
import DifficultyLevel from "./enum/DifficultyLevel";

const cards = [
  {
    name: CardName.ANIMALS,
    standardActions: [
      {
        action: Action.APPEAL,
        slotAmount: true,
        difficultyLevelFilter: DifficultyLevel.EASY
      },
      {
        action: Action.APPEAL,
        slotAmount: true,
        amount: 1,
        difficultyLevelFilter: DifficultyLevel.MEDIUM
      },
      {
        action: Action.APPEAL,
        slotAmount: true,
        amount: 2,
        difficultyLevelFilter: DifficultyLevel.HARD
      },
    ],
    upgradedActions: [
      {
        action: Action.APPEAL,
        slotAmount: true,
        amount: 1,
        difficultyLevelFilter: DifficultyLevel.EASY
      },
      {
        action: Action.APPEAL,
        slotAmount: true,
        amount: 2,
        difficultyLevelFilter: DifficultyLevel.MEDIUM
      },
      {
        action: Action.APPEAL,
        slotAmount: true,
        amount: 3,
        difficultyLevelFilter: DifficultyLevel.HARD
      },
    ]
  },
  {
    name: CardName.ASSOCIATION,
    standardActions: [
      {
        action: Action.REPUTATION,
        amount: 2,
        slotFilter: 2
      },
      {
        action: Action.GAIN_PARTNER_ZOO,
        slotFilter: 3
      },
      {
        action: Action.GAIN_PARTNER_UNIVERSITY,
        slotFilter: 4
      },
      {
        action: Action.CONSERVATION_PROJECT_WORK,
        slotFilter: 5
      },
      {
        action: Action.CONSERVATION,
        amount: 2,
        fallback: true
      },
      {
        action: Action.BREAK,
        amount: 2,
        fallback: true
      },
    ],
    upgradedActions: [
      {
        action: Action.REPUTATION,
        amount: 2,
        slotFilter: 2
      },
      {
        action: Action.GAIN_PARTNER_ZOO,
        slotFilter: 3
      },
      {
        action: Action.GAIN_PARTNER_UNIVERSITY,
        slotFilter: 4
      },
      {
        action: Action.CONSERVATION_PROJECT_WORK,
        slotFilter: 5
      },
      {
        action: Action.DONATE
      },
      {
        action: Action.CONSERVATION,
        amount: 2,
        fallback: true
      },
      {
        action: Action.BREAK,
        amount: 2,
        fallback: true
      },
    ]
  },
  {
    name: CardName.SPONSORS,
    standardActions: [
      {
        action: Action.BREAK,
        slotAmount: true
      },
      {
        action: Action.TOKEN_SCORING_CARD,
        amount: 1
      },
    ],
    upgradedActions: [
      {
        action: Action.BREAK,
        slotAmount: true
      },
      {
        action: Action.APPEAL,
        slotAmount: true
      },
      {
        action: Action.TOKEN_NOTEPAD,
        amount: 1
      },
    ]
  },
  {
    name: CardName.BUILD,
    standardActions: [
      {
        action: Action.REPUTATION,
        amount: 1,
        slotFilter: 2
      },
      {
        action: Action.APPEAL,
        amount: 2,
        slotFilter: 3,
        difficultyLevelFilter: DifficultyLevel.EASY
      },
      {
        action: Action.APPEAL,
        amount: 3,
        slotFilter: 3,
        difficultyLevelFilter: DifficultyLevel.MEDIUM
      },
      {
        action: Action.APPEAL,
        amount: 4,
        slotFilter: 3,
        difficultyLevelFilter: DifficultyLevel.HARD
      },
      {
        action: Action.TAKE_CARD_DISPLAY,
        slotFilter: 4
      },
      {
        action: Action.CONSERVATION,
        amount: 2,
        slotFilter: 5,
        difficultyLevelFilter: DifficultyLevel.EASY
      },
      {
        action: Action.CONSERVATION,
        amount: 3,
        slotFilter: 5,
        difficultyLevelFilter: DifficultyLevel.MEDIUM
      },
      {
        action: Action.CONSERVATION,
        amount: 4,
        slotFilter: 5,
        difficultyLevelFilter: DifficultyLevel.HARD
      },
    ],
    upgradedActions: [
      {
        action: Action.REPUTATION,
        amount: 2,
        slotFilter: 2
      },
      {
        action: Action.APPEAL,
        amount: 3,
        slotFilter: 3,
        difficultyLevelFilter: DifficultyLevel.EASY
      },
      {
        action: Action.APPEAL,
        amount: 4,
        slotFilter: 3,
        difficultyLevelFilter: DifficultyLevel.MEDIUM
      },
      {
        action: Action.APPEAL,
        amount: 5,
        slotFilter: 3,
        difficultyLevelFilter: DifficultyLevel.HARD
      },
      {
        action: Action.TOKEN_NOTEPAD,
        amount: 1,
        slotFilter: 4,
        difficultyLevelFilter: DifficultyLevel.EASY
      },
      {
        action: Action.TOKEN_NOTEPAD,
        amount: 2,
        slotFilter: 4,
        difficultyLevelFilter: DifficultyLevel.MEDIUM
      },
      {
        action: Action.TOKEN_NOTEPAD,
        amount: 3,
        slotFilter: 4,
        difficultyLevelFilter: DifficultyLevel.HARD
      },
      {
        action: Action.CONSERVATION,
        amount: 3,
        slotFilter: 5,
        difficultyLevelFilter: DifficultyLevel.EASY
      },
      {
        action: Action.CONSERVATION,
        amount: 4,
        slotFilter: 5,
        difficultyLevelFilter: DifficultyLevel.MEDIUM
      },
      {
        action: Action.CONSERVATION,
        amount: 5,
        slotFilter: 5,
        difficultyLevelFilter: DifficultyLevel.HARD
      },
    ]
  },
  {
    name: CardName.CARDS,
    standardActions: [
      {
        action: Action.BREAK,
        amount: 1
      },
      {
        action: Action.TAKE_CARD_DISPLAY
      },
      {
        action: Action.APPEAL,
        amount: 2
      },
    ],
    upgradedActions: [
      {
        action: Action.BREAK,
        amount: 1
      },
      {
        action: Action.TAKE_CARD_DISPLAY
      },
      {
        action: Action.CONSERVATION,
        amount: 2
      },
    ]
  },
]

const cardsMap = new Map<CardName,Card>()
cards.forEach(card => cardsMap.set(card.name, card))

export default {

  /**
   * Get card by name
   * @param name name
   * @returns Card
   */
  get(name: CardName) : Card {
    return findMandatory(cardsMap, name)
  },

  /**
   * Get all cards
   * @returns cards
   */
  getAll() : Card[] {
    return cards
  },

}
