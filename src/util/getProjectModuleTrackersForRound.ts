import ProjectModuleTracker from '@/services/ProjectModuleTracker'
import { State } from '@/store/state'
import getProjectModuleTrackerForRound from './getProjectModuleTrackerForRound'

/**
 * Get project module tracker for given round and all bots.
 * @param state State
 * @param round Round
 * @returns Project module trackers
 */
export default function getProjectModuleTrackersForRound(state : State, round: number) : ProjectModuleTracker[] {
  const botCount = state.setup.playerSetup.botCount
  const projectModuleTrackers : ProjectModuleTracker[] = []
  for (let bot = 1; bot <= botCount; bot++) {
    projectModuleTrackers[bot - 1] = getProjectModuleTrackerForRound(state, round, bot)
  }
  return projectModuleTrackers
}
