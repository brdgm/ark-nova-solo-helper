<template>

  <div v-for="(card, index) in cardSlots.slots" :key="index" class="slot">
    <div class="slotLabel">{{index+1}}</div>
    <div class="botCard" :class="{active:isActive(index+1),upgrade:isUpgraded(card)}">
      <CardTypeIcon :card-name="card.name" :upgrade="isUpgraded(card)" class="icon"/>
      <div class="cardLabel">{{t(`cardType.${card.name}`)}}</div>
    </div>
  </div>

  <hr/>

  <div class="actions">
    <div v-for="(action, index) in actionsWithAmounts" :key="index" class="action amount">
      <div class="value" :data-action="action.action">{{action.amount}}</div>
      <Icon :name="action.action" class="icon amount"/>
    </div>
  </div>
  <div class="actions">
    <div v-for="(action, index) in actionsWithoutAmounts" :key="index" class="action">
      <Icon :name="action.action" class="icon"/>
      <div class="label" v-html="t(`cardAction.${action.action}`,{card:rollD6()})"></div>
    </div>
  </div>
  <div class="actions" v-if="botActions.hasFallback">
    <p class="fallbackText">{{t('roundBot.fallbackText')}}</p>
    <div v-for="(action, index) in botActions.fallbackActions" :key="index" class="action amount fallback">
      <div class="value" :data-action="action.action">{{action.amount}}</div>
      <Icon :name="action.action" class="icon amount"/>
    </div>
  </div>

  <hr/>

</template>

<script lang="ts">
import rollDice from "brdgm-commons/src/util/random/rollDice"
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { BotRound, useStore } from '@/store'
import NavigationState from '@/util/NavigationState'
import CardSlots from '@/services/CardSlots'
import BotActions from '@/services/BotActions'
import Icon from '../structure/Icon.vue'
import CardTypeIcon from '../structure/CardTypeIcon.vue'
import Card from '@/services/Card'
import Action from '@/services/enum/Action'
import BotAction from '@/services/BotAction'

export default defineComponent({
  name: 'BotActions',
  components: {
    Icon,
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
      return BotActions.newWithSlot(this.cardSlots, this.navigationState.difficultyLevel, this.botRound.slotNumber)
    },
    actionsWithAmounts() : readonly BotAction[] {
      return this.botActions.actions.filter(item => this.hasAmount(item.action))
    },
    actionsWithoutAmounts() : BotAction[] {
      return this.botActions.actions.filter(item => !this.hasAmount(item.action))
    }
  },
  methods: {
    isActive(slot : number) : boolean {
      return this.botRound.slotNumber == slot
    },
    isUpgraded(card : Card) : boolean {
      return this.cardSlots.isUpgraded(card)
    },
    hasAmount(action : Action) : boolean {
      switch(action) {
        case Action.APPEAL:
        case Action.REPUTATION:
        case Action.CONSERVATION:
        case Action.BREAK:
          return true;
        default:
          return false;
      }
    },
    rollD6() : number {
      return rollDice(6)
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
.actions {
  .action {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    &.amount {
      display: inline-block;
      position: relative;
      width: 4rem;
      margin-right: 1rem;
    }
    .icon {
      width: 4rem;
    }
    .value {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      font-weight: bold;
      color: #fff;
      font-size: 2rem;
      &[data-action="break"] {
        padding-right: 0.75rem;
      }
      &[data-action="appeal"] {
        color: #000;
      }
      &[data-action="reputation"] {
        padding-bottom: 0.5rem;
        padding-right: 0.25rem;
      }
      &[data-action="conservation"] {
        color: #000;
        padding-bottom: 0.25rem;
      }
    }
    .label {
      display: inline-block;
      margin-left: 1rem;
    }
    &.fallback {
      margin-top: 0;
      &.amount {
        width: 2rem;
        margin-right: 0.5rem;
      }
      .icon {
        width: 2rem;
      }
      .value {
        font-size: 1.2rem;
        &[data-action="break"] {
          padding-right: 0.5rem;
        }
      }
    }
  }
  .fallbackText {
    font-style: italic;
  }
}

</style>