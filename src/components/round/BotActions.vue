<template>

  <div v-for="(card, index) in cardSlots.slots" :key="index" class="slot">
    <div class="slotLabel">{{index+1}}</div>
    <div class="botCard" :class="{active:isActive(index+1),upgrade:isUpgraded(card)}">
      <CardTypeIcon :card-name="card.name" :upgrade="isUpgraded(card)" class="icon"/>
      <div class="cardLabel">{{t(`cardType.${card.name}`)}}</div>
    </div>
  </div>

  <hr/>

  <div v-for="(action, index) in botActions.actions" :key="index">
    {{action.action}} x {{action.amount}}
  </div>


</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { BotRound, useStore } from '@/store'
import NavigationState from '@/util/NavigationState'
import CardSlots from '@/services/CardSlots'
import BotActions from '@/services/BotActions'
import CardTypeIcon from '../structure/CardTypeIcon.vue'
import Card from '@/services/Card'

export default defineComponent({
  name: 'BotActions',
  components: {
    CardTypeIcon
  },
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    botRound() : BotRound {
      return this.navigationState.botRound as BotRound
    },
    cardSlots() : CardSlots {
      return CardSlots.fromPersistence(this.botRound.cardSlots)
    },
    botActions() : BotActions {
      return BotActions.newWithSlot(this.cardSlots, this.botRound.slotNumber, this.navigationState.difficultyLevel)
    }
  },
  methods: {
    isActive(slot : number) : boolean {
      return this.botRound.slotNumber == slot
    },
    isUpgraded(card : Card) : boolean {
      return this.cardSlots.isUpgraded(card)
    }
  }
})
</script>

<style lang="scss" scoped>
.slot {
  display: inline-block;
  width: 8rem;
  margin-right: 0.5rem;
  .slotLabel {
    background-image: url('@/assets/slot.png');
    background-repeat: no-repeat;
    background-size: contain;
    display: flex;
    justify-content: center;
    width: 1.6rem;
    height: 1.6rem;
    margin: 0.25rem auto;
    padding-left: 0.1rem;
    color: white;
    font-weight: bold;
  }
  .botCard {
    border: 4px solid white;
    border-radius: 0.5rem;
    width: 8rem;
    height: 7rem;
    background: #e0e5ee;
    background: linear-gradient(90deg, #a8ccda 0%, #e0e5ee 35%, #e0e5ee 65%, #a8ccda 100%);
    .icon {
      display: block;
      width: 3rem;
      border-top-left-radius: 0.25rem;
    }
    .cardLabel {
      width: 100%;
      text-align: center;
      margin-top: 0.5rem;
      text-transform: uppercase;
      font-weight: bold;
    }
    &.active {
      border-color: #00aeef;
    }
    &.upgrade {
      background: #f1e9e9;
      background: linear-gradient(90deg, #e9c9c9 0%, #f1e9e9 35%, #f1e9e9 65%, #e9c9c9 100%);
    }
    &.upgrade.active {
      border-color: #a5247b;
    }
  }
}

</style>