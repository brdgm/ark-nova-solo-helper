<template>

  <div v-for="(card, index) in cardSlots.slots" :key="index">
    {{card.name}} <span v-if="isActive(index+1)">(active)</span> <span v-if="isUpgraded(card)">(upgraded)</span>
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
import Card from '@/services/Card'

export default defineComponent({
  name: 'BotActions',
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
