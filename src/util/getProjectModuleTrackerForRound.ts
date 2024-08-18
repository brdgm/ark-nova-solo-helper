import ProjectModuleTracker from '@/services/ProjectModuleTracker'
import { State } from '@/store/state'

/**
 * Get project module tracker for given round and bot.
 * @param state State
 * @param round Round
 * @param bot Bot
 * @returns Project module tracker
 */
export default function(state : State, round: number, bot: number) : ProjectModuleTracker {
  const initial = botArrayValue(state.setup.botInitialSponsorCardDiscardCount, bot)
  const fromBreaks = state.rounds
      .filter(item => item.round <= round)
      .reduce((sum, roundData) => sum + botArrayValue(roundData.botBreakSponsorCardDiscardCount, bot), 0)
  const fromRounds = state.rounds
      .filter(item => item.round <= round)
      .map(item => item.botRound[bot - 1])
      .reduce((sum, botRoundData) => sum + (botRoundData?.sponsorCardDiscardCount ?? 0), 0)
  const totalDiscarded = initial + fromBreaks + fromRounds
  return new ProjectModuleTracker(totalDiscarded)
}

function botArrayValue(values? : number[], bot? : number) {
  if (!values || !bot) {
    return 0
  }
  return values[bot - 1] ?? 0
}
