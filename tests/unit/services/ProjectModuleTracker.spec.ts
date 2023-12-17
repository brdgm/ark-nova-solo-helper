import ProjectModuleTracker from '@/services/ProjectModuleTracker'
import { expect } from 'chai'

describe('services/ProjectModuleTracker', () => {
  it('trackerPosition', () => {
    expect(new ProjectModuleTracker().trackerPosition).to.eq(0)
    expect(new ProjectModuleTracker(0).trackerPosition).to.eq(0)
    expect(new ProjectModuleTracker(1).trackerPosition).to.eq(1)
    expect(new ProjectModuleTracker(5).trackerPosition).to.eq(5)
    expect(new ProjectModuleTracker(14).trackerPosition).to.eq(14)
    expect(new ProjectModuleTracker(15).trackerPosition).to.eq(13)
    expect(new ProjectModuleTracker(25).trackerPosition).to.eq(3)
    expect(new ProjectModuleTracker(28).trackerPosition).to.eq(0)
    expect(new ProjectModuleTracker(30).trackerPosition).to.eq(2)
  })
})
