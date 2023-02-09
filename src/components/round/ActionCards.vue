<template>
  <div v-for="(card, index) in cardSlots.slots" :key="index" class="slot">
    <div class="slotLabel">{{index+1}}</div>
    <div class="botCard" :class="{active:isActive(index+1),upgrade:isUpgraded(card)}">
      <CardTypeIcon :card-name="card.name" :upgrade="isUpgraded(card)" class="icon"/>
      <div class="cardLabel">{{t(`cardType.${card.name}`)}}</div>
    </div>
  </div>

  <div class="buttonContainer">
    <button v-if="cardSlots.canUpgradeCard()" type="button" class="upgrade btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#upgradeCardModal">
      <AppIcon name="upgrade" class="icon"/> {{t('roundBot.upgrade')}}
    </button>
    <button v-if="cardSlots.canRevertUpgradeCard()" type="button" class="btn btn-light btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#revertUpgradeCardModal">
      {{t('roundBot.revertUpgrade')}}
    </button>
  </div>

  <ModalDialog id="upgradeCardModal" :title="t('roundBot.upgradeCard.title')">
    <template #body>
      <p v-html="t('roundBot.upgradeCard.text')"></p>
      <p class="fst-italic small" v-html="t('roundBot.upgradeCard.note')"></p>
    </template>
    <template #footer>
      <button class="btn btn-primary" data-bs-dismiss="modal" @click="upgradeCard()">{{t('roundBot.upgrade')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>

  <ModalDialog id="revertUpgradeCardModal" :title="t('roundBot.revertUpgradeCard.title')">
    <template #body>
      <p v-html="t('roundBot.revertUpgradeCard.text')"></p>
      <select class="form-select" v-model="revertCard">
        <option value="">{{t('roundBot.revertUpgradeCard.choose')}}</option>
        <option v-for="card of cardSlots.upgradedCardNames" :value="card as string" :key="card">{{t(`cardType.${card}`)}}</option>
      </select>
    </template>
    <template #footer>
      <button class="btn btn-primary" data-bs-dismiss="modal" @click="revertUpgradedCard()" :disabled="revertCard==''">{{t('roundBot.revertUpgrade')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import rollDice from "brdgm-commons/src/util/random/rollDice"
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { BotRound, useStore } from '@/store'
import NavigationState from '@/util/NavigationState'
import CardSlots from '@/services/CardSlots'
import AppIcon from '../structure/AppIcon.vue'
import CardTypeIcon from '../structure/CardTypeIcon.vue'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import Card from '@/services/Card'
import Cards from "@/services/Cards"
import CardName from "@/services/enum/CardName"

export default defineComponent({
  name: 'ActionCards',
  components: {
    AppIcon,
    CardTypeIcon,
    ModalDialog
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
      revertCard: ''
    }
  },
  computed: {
    botRound() : BotRound {
      return this.navigationState.botRound as BotRound
    },
    cardSlots() : CardSlots {
      return CardSlots.fromPersistence(this.botRound.cardSlots)
    }
  },
  methods: {
    isActive(slot : number) : boolean {
      return this.botRound.slotNumber == slot
    },
    isUpgraded(card : Card) : boolean {
      return this.cardSlots.isUpgraded(card)
    },
    upgradeCard() : void {
      const standardCards = this.cardSlots.slots.filter(card => !this.cardSlots.isUpgraded(card))
      const upgradeCardNo = rollDice(standardCards.length)
      this.cardSlots.upgradeCard(standardCards[upgradeCardNo-1])
      this.botRound.cardSlots = this.cardSlots.toPersistence()
      this.$store.commit('round', this.botRound)
      this.$forceUpdate()
    },
    revertUpgradedCard() : void {
      const revertCardName = this.revertCard as CardName
      this.cardSlots.revertUpgradeCard(Cards.get(revertCardName))
      this.$store.commit('revertUpgradeCard', {bot:this.botRound.bot, cardName:revertCardName})
      this.revertCard = ''
    }
  }
})
</script>

<style lang="scss" scoped>
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/grid";

.upgrade.btn {
  .icon {
    width: 1.5rem;
  }
}
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
.buttonContainer {
  display: inline-block;
}

@include media-breakpoint-down(md) {
  .slot {
    width: 6rem;
    margin-right: 0.1rem;
    .slotLabel {
      width: 1.2rem;
      height: 1.2rem;
      font-size: 0.75rem;
    }
    .botCard {
      width: 6rem;
      height: 5rem;
      .icon {
        width: 2.25rem;
      }
      .cardLabel {
        margin-top: 0.1rem;
        font-size: 0.75rem;
      }
    }
  }
}

@include media-breakpoint-down(sm) {
  .slot {
    width: 3rem;
    margin-right: 0.1rem;
    .slotLabel {
      width: 1rem;
      height: 1rem;
      font-size: 0.6rem;
    }
    .botCard {
      width: 3rem;
      height: 3.5rem;
      .icon {
        width: 2rem;
      }
      .cardLabel {
        display: none;
      }
    }
  }
}
</style>