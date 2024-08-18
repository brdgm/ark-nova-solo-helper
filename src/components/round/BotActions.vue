<template>
  <ActionCards :navigation-state="navigationState"/>

  <hr/>

  <p v-if="isAssociation(botActions.activeCard)" class="actionHelp" v-html="t('roundBot.associationWorker')" data-bs-toggle="modal" data-bs-target="#actionHelpAssociationWorkerModal"></p>
  <div class="actions">
    <div v-for="(action, index) in actionsIconOnly" :key="index" class="action amount">
      <div class="value" :data-action="action.action">{{action.amount}}</div>
      <AppIcon :name="action.action" class="icon amount"/>
    </div>
  </div>
  <div class="actions">
    <div v-for="(action, index) in actionsWithDescription" :key="index" class="action">
      <AppIcon :name="action.action" class="icon float-start me-3 mb-3"/>
      <template v-if="isGainPartnerZoo(action.action)"><GainPartnerZoo/></template>
      <template v-else-if="isGainPartnerUniversity(action.action)"><GainPartnerUniversity/></template>
      <span v-else-if="isConservationProjectWork(action.action)" class="actionHelp" v-html="t(`cardAction.${action.action}`)" data-bs-toggle="modal" data-bs-target="#actionHelpProjectConservationWorkModal"></span>
      <span v-else v-html="t(`cardAction.${action.action}`,{number:takeCardRandomNumber,amount:action.amount},action.amount)"></span>
      <template v-if="hasProjectModuleExpansion && isTakeCardDisplay(action.action)">
        <p class="mt-2">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" :value="true" v-model="takeCardSponsorCard">
            {{t('roundBot.takeCardDisplay.sponsorCardDiscard')}}
          </label>
        </p>
      </template>
    </div>
  </div>
  <div class="actions" v-if="botActions.hasFallback">
    <p class="fallbackText">{{t('roundBot.fallbackText')}}</p>
    <div v-for="(action, index) in botActions.fallbackActions" :key="index" class="action amount fallback">
      <template v-if="isGainPartnerZooOrUniversity(action.action)">
        <a data-bs-toggle="modal" data-bs-target="#actionFallbackPickPartnerZooOrUniversity" href="#"><AppIcon :name="action.action" class="icon"/></a>
      </template>
      <template v-else>
        <div class="value" :data-action="action.action">{{action.amount}}</div>
        <AppIcon :name="action.action" class="icon amount"/>
      </template>
    </div>
  </div>

  <hr/>

  <ModalDialog id="actionHelpAssociationWorkerModal" :title="t('roundBot.actionHelpAssociationWorker.title')">
    <template #body>
      <p v-html="t('roundBot.actionHelpAssociationWorker.text')"></p>
      <p v-html="t('roundBot.actionHelpAssociationWorker.text-fallback')"></p>
      <p v-html="t('roundBot.actionHelpAssociationWorker.chooseDifferent')"></p>
      <div class="actions overwriteAssociation">
        <div v-for="(action, index) in getUnusedAssociationActions()" :key="index" class="action amount">
          <AppIcon :name="action" class="icon amount" @click="overwriteAssociationAction(action)" data-bs-dismiss="modal"/>
        </div>
      </div>
    </template>
  </ModalDialog>

  <ModalDialog id="actionHelpProjectConservationWorkModal" :title="t('roundBot.actionHelpProjectConservationWork.title')"
      :size-lg="true">
    <template #body>
      <PickConservationProject ref="pickConservationProject" :navigationState="navigationState"/>
    </template>
    <template #footer>
      <button class="btn btn-outline-secondary" @click="pickConservationProject.reset()">{{t('action.reset')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
    </template>
  </ModalDialog>

  <ModalDialog id="actionFallbackPickPartnerZooOrUniversity" :title="t('roundBot.actionFallbackPickPartnerZooOrUniversity.title')"
      :size-lg="true">
    <template #body>
      <GainPartnerZooOrUniversity ref="gainPartnerZooOrUniversity"/>
    </template>
    <template #footer>
      <button class="btn btn-outline-secondary" @click="gainPartnerZooOrUniversity.reset()">{{t('action.reset')}}</button>
          <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { BotRound, useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import BotActions from '@/services/BotActions'
import AppIcon from '../structure/AppIcon.vue'
import ActionCards from './ActionCards.vue'
import CardSlots from '@/services/CardSlots'
import PickConservationProject from './PickConservationProject.vue'
import Card from '@/services/Card'
import Action from '@/services/enum/Action'
import BotAction from '@/services/BotAction'
import CardName from '@/services/enum/CardName'
import GainPartnerUniversity from './GainPartnerUniversity.vue'
import GainPartnerZoo from './GainPartnerZoo.vue'
import GainPartnerZooOrUniversity from './GainPartnerZooOrUniversity.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'BotActions',
  components: {
    AppIcon,
    ActionCards,
    GainPartnerZoo,
    GainPartnerUniversity,
    PickConservationProject,
    GainPartnerZooOrUniversity,
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const pickConservationProject = ref()
    const gainPartnerZooOrUniversity = ref()
    return { t, state, pickConservationProject, gainPartnerZooOrUniversity }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  data() {
    return {
      overwriteBotActions: [] as BotAction[],
      takeCardRandomNumber: rollDice(6),
      takeCardSponsorCard: (this.navigationState.botRound?.sponsorCardDiscardCount ?? 0) == 1
    }
  },
  computed: {
    botRound() : BotRound {
      return this.navigationState.botRound as BotRound
    },
    previousBotRound() : BotRound|undefined {
      return this.navigationState.previousBotRound
    },
    cardSlots() : CardSlots {
      return CardSlots.fromPersistence(this.botRound.cardSlots)
    },
    botActions() : BotActions {
      return BotActions.newWithSlot(this.cardSlots, this.navigationState.difficultyLevel, this.botRound.slotNumber,
          this.previousBotRound?.tokenScoringCardCount ?? 0)
    },
    actionsAll() : BotAction[] {
      return this.overwriteBotActions.length > 0 ? this.overwriteBotActions : this.botActions.actions as BotAction[]
    },
    actionsIconOnly() : readonly BotAction[] {
      return this.actionsAll.filter(item => this.isIconOnly(item.action))
    },
    actionsWithDescription() : BotAction[] {
      return this.actionsAll.filter(item => !this.isIconOnly(item.action))
    },
    hasProjectModuleExpansion() : boolean {
      return (this.state.setup.expansions ?? []).includes(Expansion.ARNO_CONSERVATION_PROJECT_MODULE)
    }
  },
  methods: {
    isIconOnly(action : Action) : boolean {
      switch(action) {
        case Action.APPEAL:
        case Action.REPUTATION:
        case Action.CONSERVATION:
        case Action.BREAK:
          return true
        default:
          return false
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
          return true
        default:
          return false
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
    isGainPartnerZoo(action : Action) : boolean {
      return action == Action.GAIN_PARTNER_ZOO
    },
    isGainPartnerUniversity(action : Action) : boolean {
      return action == Action.GAIN_PARTNER_UNIVERSITY
    },
    isGainPartnerZooOrUniversity(action : Action) : boolean {
      return action == Action.GAIN_PARTNER_ZOO_OR_UNIVERSITY
    },
    isConservationProjectWork(action : Action) : boolean {
      return action == Action.CONSERVATION_PROJECT_WORK
    },
    isTakeCardDisplay(action : Action) : boolean {
      return action == Action.TAKE_CARD_DISPLAY
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
            return botAction
          })
    }
  },
  watch: {
    takeCardSponsorCard(newValue) {
      const sponsorCardDiscardCount = newValue ? 1 : 0
      this.state.roundBotSponsorCardDiscardCount(
          {round:this.navigationState.round, bot:this.navigationState.bot,sponsorCardDiscardCount})
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
    text-decoration: underline;
    text-decoration-style: dotted;
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