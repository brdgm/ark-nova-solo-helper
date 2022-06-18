import Cards from '@/services/Cards'
import CardName from '@/services/enum/CardName'
import { expect } from 'chai'

describe('Cards', () => {
  it('get', () => {
    const card = Cards.get(CardName.ASSOCIATION)

    expect(card).not.undefined
    expect(card?.name).to.eq(CardName.ASSOCIATION)
  })

  it('getAll', () => {
    const cards = Cards.getAll()

    expect(cards.length).eq(5)
  })
})
