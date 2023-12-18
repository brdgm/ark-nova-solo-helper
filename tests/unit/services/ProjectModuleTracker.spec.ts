import ProjectModuleTracker from '@/services/ProjectModuleTracker'
import ProjectSlot from '@/services/enum/ProjectSlot'
import { expect } from 'chai'

describe('services/ProjectModuleTracker', () => {
  it('trackerPosition', () => {
    expect(new ProjectModuleTracker().trackerPosition).to.eq(1)
    expect(new ProjectModuleTracker(0).trackerPosition).to.eq(1)
    expect(new ProjectModuleTracker(1).trackerPosition).to.eq(2)
    expect(new ProjectModuleTracker(5).trackerPosition).to.eq(6)
    expect(new ProjectModuleTracker(13).trackerPosition).to.eq(14)
    expect(new ProjectModuleTracker(14).trackerPosition).to.eq(13)
    expect(new ProjectModuleTracker(24).trackerPosition).to.eq(3)
    expect(new ProjectModuleTracker(27).trackerPosition).to.eq(0)
    expect(new ProjectModuleTracker(30).trackerPosition).to.eq(3)
  })

  it('projectSlot-kioskCount', () => {
    const projectSlots = [
      ProjectSlot.RIGHT,
      ProjectSlot.MIDDLE,
      ProjectSlot.RIGHT,
      ProjectSlot.LEFT,
      ProjectSlot.MIDDLE,
      ProjectSlot.RIGHT,
      ProjectSlot.MIDDLE,
      ProjectSlot.LEFT,
      ProjectSlot.RIGHT,
      ProjectSlot.LEFT,
      ProjectSlot.MIDDLE,
      ProjectSlot.LEFT,
      ProjectSlot.MIDDLE,
      ProjectSlot.LEFT
    ]
    const kioskCount = [
      0,
      0,
      1,
      1,
      1,
      2,
      2,
      2,
      3,
      3,
      3,
      4,
      4,
      5
    ]
    for (let i=0; i<projectSlots.length && i<kioskCount.length; i++) {
      const tracker = new ProjectModuleTracker(i)
      expect(tracker.projectSlot).to.eq(projectSlots[i], `discardCount: ${i}, projectSlot`)
      expect(tracker.kioskCount).to.eq(kioskCount[i], `discardCount: ${i}, kioskCount`)
    }
  })

  it('getPreferredProjectSlots', () => {
    expect(new ProjectModuleTracker(0).getPreferredProjectSlots()).to.eql([ProjectSlot.RIGHT,ProjectSlot.MIDDLE,ProjectSlot.LEFT])
    expect(new ProjectModuleTracker(1).getPreferredProjectSlots()).to.eql([ProjectSlot.MIDDLE,ProjectSlot.RIGHT,ProjectSlot.LEFT])
    expect(new ProjectModuleTracker(2).getPreferredProjectSlots()).to.eql([ProjectSlot.RIGHT,ProjectSlot.MIDDLE,ProjectSlot.LEFT])
    expect(new ProjectModuleTracker(3).getPreferredProjectSlots()).to.eql([ProjectSlot.LEFT,ProjectSlot.RIGHT,ProjectSlot.MIDDLE])
    expect(new ProjectModuleTracker(4).getPreferredProjectSlots()).to.eql([ProjectSlot.MIDDLE,ProjectSlot.LEFT,ProjectSlot.RIGHT])
  })
})
