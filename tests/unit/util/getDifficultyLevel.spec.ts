import ActionCardDistributionSchema from '@/services/enum/ActionCardDistributionSchema'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import PlayerColor from '@/services/enum/PlayerColor'
import { Setup } from '@/store'
import getDifficultyLevel from '@/util/getDifficultyLevel'
import { expect } from 'chai'

describe('util/getDifficultyLevel', () => {
  it('levelInSetup', () => {
    const setup = mockSetup(DifficultyLevel.L5_HARD)

    expect(getDifficultyLevel(setup, 1)).to.eq(DifficultyLevel.L5_HARD)
    expect(getDifficultyLevel(setup, 2)).to.eq(DifficultyLevel.L5_HARD)
  })

  it('levelInPlayerSetup', () => {
    const setup = mockSetup(undefined, [DifficultyLevel.L2_VERY_EASY, DifficultyLevel.L3_EASY])

    expect(getDifficultyLevel(setup, 1)).to.eq(DifficultyLevel.L2_VERY_EASY)
    expect(getDifficultyLevel(setup, 2)).to.eq(DifficultyLevel.L3_EASY)
  })

  it('levelInSetupAndPlayerSetup', () => {
    const setup = mockSetup(DifficultyLevel.L5_HARD, [DifficultyLevel.L2_VERY_EASY, DifficultyLevel.L3_EASY])

    expect(getDifficultyLevel(setup, 1)).to.eq(DifficultyLevel.L2_VERY_EASY)
    expect(getDifficultyLevel(setup, 2)).to.eq(DifficultyLevel.L3_EASY)
  })

  it('noLevel', () => {
    const setup = mockSetup()

    expect(getDifficultyLevel(setup, 1)).to.eq(DifficultyLevel.L1_BEGINNER)
    expect(getDifficultyLevel(setup, 2)).to.eq(DifficultyLevel.L1_BEGINNER)
  })
})

function mockSetup(setupDifficultyLevel?: DifficultyLevel, playerSetupDifficultyLevels?: DifficultyLevel[]) : Setup {
  return {
    playerSetup: {
      playerCount: 3,
      botCount: 2,
      playerColors: [PlayerColor.BLACK, PlayerColor.BLUE, PlayerColor.RED],
      difficultyLevels: playerSetupDifficultyLevels
    },
    difficultyLevel: setupDifficultyLevel,
    actionCardDistribution: ActionCardDistributionSchema.P0_10_20_30_40      
  }
}
