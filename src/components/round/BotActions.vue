<template>
  <BonusTile/>
  <ActionCards :navigation-state="navigationState"/>

  <hr/>

  <p v-if="isAssociation(botActions.activeCard)" class="actionHelp" v-html="t('roundBot.associationWorker')" data-bs-toggle="modal" data-bs-target="#actionHelpAssociationWorkerModal"></p>
  <div class="actions">
    <div v-for="(action, index) in actionsIconOnly" :key="index" class="action amount">
      <div class="value" :data-action="action.action">{{action.amount}}</div>
      <Icon :name="action.action" class="icon amount"/>
    </div>
  </div>
  <div class="actions">
    <div v-for="(action, index) in actionsWithDescription" :key="index" class="action">
      <Icon :name="action.action" class="icon float-start me-3 mb-3"/>
      <span v-if="isConservationProjectWork(action.action)" class="actionHelp" v-html="t(`cardAction.${action.action}`)" data-bs-toggle="modal" data-bs-target="#actionHelpProjectConservationWorkModal"></span>
      <span v-else v-html="t(`cardAction.${action.action}`,{number:getRandomNumber(action.action),amount:action.amount},action.amount)"></span>
      <button v-if="allowReroll(action.action)" type="button" class="upgrade btn btn-outline-secondary btn-sm ms-2" @click="$forceUpdate()">
        {{t('roundBot.reroll')}}
      </button>
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

  <div class="modal" id="actionHelpAssociationWorkerModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{t('roundBot.actionHelpAssociationWorker.title')}}</h5>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p v-html="t('roundBot.actionHelpAssociationWorker.text')"></p>
          <p v-html="t('roundBot.actionHelpAssociationWorker.chooseDifferent')"></p>
          <div class="actions overwriteAssociation">
            <div v-for="(action, index) in getUnusedAssociationActions()" :key="index" class="action amount">
              <Icon :name="action" class="icon amount" @click="overwriteAssociationAction(action)" data-bs-dismiss="modal"/>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="actionHelpProjectConservationWorkModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{t('roundBot.actionHelpProjectConservationWork.title')}}</h5>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <PickConservationProject ref="pickConservationProject"/>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary" @click="pickConservationProject.reset()">{{t('action.reset')}}</button>
          <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import rollDice from "brdgm-commons/src/util/random/rollDice"
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { BotRound, useStore } from '@/store'
import NavigationState from '@/util/NavigationState'
import BotActions from '@/services/BotActions'
import Icon from '../structure/Icon.vue'
import ActionCards from './ActionCards.vue'
import CardSlots from "@/services/CardSlots"
import PickConservationProject from './PickConservationProject.vue'
import BonusTile from "./BonusTile.vue"
import Card from '@/services/Card'
import Action from '@/services/enum/Action'
import BotAction from '@/services/BotAction'
import CardName from "@/services/enum/CardName"

export default defineComponent({
  name: 'BotActions',
  components: {
    Icon,
    ActionCards,
    PickConservationProject,
    BonusTile
  },
  setup() {
    const { t } = useI18n()
    useStore()
    const pickConservationProject = ref()
    return { t, pickConservationProject }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  data() {
    return {
      overwriteBotActions: [] as BotAction[]
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
    actionsAll() : BotAction[] {
      return this.overwriteBotActions.length > 0 ? this.overwriteBotActions : this.botActions.actions as BotAction[]
    },
    actionsIconOnly() : readonly BotAction[] {
      return this.actionsAll.filter(item => this.isIconOnly(item.action))
    },
    actionsWithDescription() : BotAction[] {
      return this.actionsAll.filter(item => !this.isIconOnly(item.action))
    }
  },
  methods: {
    isIconOnly(action : Action) : boolean {
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
    isAssociation(card : Card) {
      return card.name == CardName.ASSOCIATION
    },
    isAssociationAction(action : Action) : boolean {
      switch(action) {
        case Action.REPUTATION:
        case Action.GAIN_PARTNER_ZOO:
        case Action.GAIN_PARTNER_UNIVERSITY:
        case Action.CONSERVATION_PROJECT_WORK:
          return true;
        default:
          return false;
      }
    },
    getUnusedAssociationActions() : Action[] {
      const currentAssociationActions = this.actionsAll
          .map(item => item.action)
          .filter(action => this.isAssociationAction(action))
      return Object.values(Action)
        .filter(action => this.isAssociationAction(action))
        .filter(action => !currentAssociationActions.includes(action))
    },
    isConservationProjectWork(action : Action) : boolean {
      return action == Action.CONSERVATION_PROJECT_WORK
    },
    getRandomNumber(action : Action) : number {
      switch(action) {
        case Action.GAIN_PARTNER_UNIVERSITY:
          return rollDice(3)
        case Action.GAIN_PARTNER_ZOO:
          return rollDice(5)
        case Action.TAKE_CARD_DISPLAY:
          return rollDice(6)
        default:
          return 0;
      }
    },
    allowReroll(action : Action) : boolean {
      switch(action) {
        case Action.GAIN_PARTNER_UNIVERSITY:
        case Action.GAIN_PARTNER_ZOO:
          return true
        default:
          return false;
      }
    },
    overwriteAssociationAction(action : Action) : void {
      this.overwriteBotActions = this.botActions.actions
          .map(botAction => {
            if (this.isAssociationAction(botAction.action)) {
              return {
                action: action,
                amount: action==Action.REPUTATION ? 2 : 0
              }
            }
            return botAction;
          })
    }
  }
})
</script>

<style lang="scss" scoped>
.actions {
  .action {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    clear: both;
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
    clear: both;
  }
}
.actionHelp {
  cursor: help;
  :deep(b) {
    text-decoration: underline dotted;
  }
}
.overwriteAssociation.actions {
  .icon {
    cursor: pointer;
  }
}
hr {
  clear: both;
}
</style>