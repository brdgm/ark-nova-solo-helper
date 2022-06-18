import Action from "./enum/Action"
import CardName from "./enum/CardName"
import DifficultyLevel from "./enum/DifficultyLevel"

export default interface Card {
  name: CardName
  standardActions: CardAction[]
  upgradedActions: CardAction[]
}

export interface CardAction {
  action: Action
  slotAmount?: boolean
  amount?: number
  slotFilter?: number
  difficultyLevelFilter?: DifficultyLevel
  fallback?: boolean
}
