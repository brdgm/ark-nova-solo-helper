import DifficultyLevel from '@/services/enum/DifficultyLevel';
import { Setup } from '@/store';

/**
 * Get difficulty level assigned to bot.
 * @param setup Setup config
 * @param bot Bot number
 * @returns Difficulty level
 */
export default function getDifficultyLevel(setup: Setup, bot: number) : DifficultyLevel {
  const botDifficultyLevel = (setup.playerSetup.difficultyLevels ?? [])[bot - 1]
  if (botDifficultyLevel) {
    return botDifficultyLevel
  }
  return setup.difficultyLevel ?? DifficultyLevel.L1_BEGINNER
}
