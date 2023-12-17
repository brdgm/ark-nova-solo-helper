/**
 * Tracks ARNO progress for the optional project module, depending on number of discarded sponsor cards.
 */
export default class BotActions {

  private _trackerPosition: number

  constructor(sponsorCardDiscardCount?: number) {
    this._trackerPosition = getTrackerPosition(sponsorCardDiscardCount ?? 0)
  }

  public get trackerPosition() : number {
    return this._trackerPosition
  }

}

const MAX_TRACKER_POS : number = 14

/**
 * Token step forward for each discarded sponsor card.
 * Once it reached the last position on the track, step backward for each further step.
 */
function getTrackerPosition(sponsorCardDiscardCount: number) : number {
  const steps = sponsorCardDiscardCount % (MAX_TRACKER_POS * 2)
  if (steps > MAX_TRACKER_POS) {
    return MAX_TRACKER_POS - (steps - MAX_TRACKER_POS)
  }
  else {
    return steps
  }
}
