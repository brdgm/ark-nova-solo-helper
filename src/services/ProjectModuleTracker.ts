import ProjectSlot from "./enum/ProjectSlot"

/**
 * Tracks ARNO progress for the optional project module, depending on number of discarded sponsor cards.
 */
export default class ProjectModuleTracker {

  private _trackerPosition: number

  constructor(sponsorCardDiscardCount?: number) {
    this._trackerPosition = getTrackerPosition(sponsorCardDiscardCount ?? 0)
  }

  public get trackerPosition() : number {
    return this._trackerPosition
  }

  public get projectSlot() : ProjectSlot {
    switch (this._trackerPosition) {
      case 2:
      case 5:
      case 7:
      case 11:
      case 13:
        return ProjectSlot.MIDDLE
      case 4:
      case 8:
      case 10:
      case 12:
      case 14:
        return ProjectSlot.LEFT
      default:
        return ProjectSlot.RIGHT
    }
  }

  public get kioskCount() : number {
    if (this._trackerPosition >= 14) {
      return 5
    }
    else if (this._trackerPosition >= 12) {
      return 4
    }
    else if (this._trackerPosition >= 9) {
      return 3
    }
    else if (this._trackerPosition >= 6) {
      return 2
    }
    else if (this._trackerPosition >= 3) {
      return 1
    }
    else {
      return 0
    }
  }

}

const MAX_TRACKER_POS : number = 14

/**
 * Token step forward for each discarded sponsor card.
 * Once it reached the last position on the track, step backward for each further step.
 */
function getTrackerPosition(sponsorCardDiscardCount: number) : number {
  const steps = (sponsorCardDiscardCount + 1) % (MAX_TRACKER_POS * 2)
  if (steps > MAX_TRACKER_POS) {
    return MAX_TRACKER_POS - (steps - MAX_TRACKER_POS)
  }
  else {
    return steps
  }
}
