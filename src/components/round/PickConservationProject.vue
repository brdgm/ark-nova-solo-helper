<template>
  <h6>{{t('roundBot.pickConservationProject.conservationProjectSelection')}}</h6>
  <template v-if="!conservationProjectPicked">
    <p>
      <span v-html="t('roundBot.pickConservationProject.conservationProjectsHand')"></span><br/>
      <input type="number" min="0" max="99" step="1" v-model="conservationProjectsHand" @focus="inputSelectAll" :readonly="conservationProjectPicked"/>
    </p>
    <p v-if="conservationProjectsHand < 2">
      <span v-html="t('roundBot.pickConservationProject.conservationProjectsBoardNoToken')"></span><br/>
      <input type="number" min="0" max="99" step="1" v-model="conservationProjectsBoardNoToken" @focus="inputSelectAll" :readonly="conservationProjectPicked"/>
    </p>
    <p v-if="conservationProjectsHand < 2 && conservationProjectsBoardNoToken < 1">
      <span v-html="t('roundBot.pickConservationProject.conservationProjectsBoardAvailable')"></span><br/>
      <input type="number" min="0" max="99" step="1" v-model="conservationProjectsBoardAvailable" @focus="inputSelectAll" :readonly="conservationProjectPicked"/>
    </p>
    <button v-if="anyConservationProjectAvailable" type="button" class="btn btn-primary btn-sm ms-2" @click="pickConservationProject()">{{t('roundBot.pickConservationProject.pick')}}</button>
  </template>
  <template v-else>
    <p v-if="pickFromHand" class="fw-bold" v-html="t('roundBot.pickConservationProject.pickFromHand',{number:conservationProjectNumber})"></p>
    <p v-if="pickFromBoardNoToken" class="fw-bold" v-html="t('roundBot.pickConservationProject.pickFromBoardNoToken',{number:conservationProjectNumber})"></p>
    <p v-if="pickFromBoardAvailable" class="fw-bold" v-html="t('roundBot.pickConservationProject.pickFromBoardAvailable',{number:conservationProjectNumber})"></p>
    <h6>{{t('roundBot.pickConservationProject.tokenPlacement')}}</h6>
    <template v-if="hasProjectModuleExpansion">
      <p class="fw-bold">
        <span v-html="t('roundBot.pickConservationProject.projectModule.tokenPlacement')"></span>
        <span>&nbsp;</span>
        <template v-for="(slot,index) of projectSlotsModulePlacement" :key="slot">
          <span v-if="index > 0">, </span>
          <span>{{t(`projectSlot.${slot}`)}}</span>
        </template>
        <span>.</span>
      </p>
      <p>
        <span v-html="t('roundBot.pickConservationProject.projectModule.gainConservationPoints',{slot:t(`projectSlot.${projectSlotDifficultyLevel}`)})"></span>
      </p>
      <p></p>
    </template>
    <template v-else>
      <p v-if="projectSlotLeftMost" class="fw-bold" v-html="t('roundBot.pickConservationProject.projectSlotLeftMost')"></p>
      <p v-if="projectSlotMiddle" class="fw-bold" v-html="t('roundBot.pickConservationProject.projectSlotMiddle')"></p>
      <p v-if="projectSlotRightMost" class="fw-bold" v-html="t('roundBot.pickConservationProject.projectSlotRightMost')"></p>
      <p v-html="t('roundBot.pickConservationProject.projectSlotAlternatives')"></p>
    </template>
  </template>
</template>

<script lang="ts">
import rollDice from 'brdgm-commons/src/util/random/rollDice'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import NavigationState from '@/util/NavigationState'
import Expansion from '@/services/enum/Expansion'
import ProjectSlot from '@/services/enum/ProjectSlot'
import getProjectModuleTrackerForRound from '@/util/getProjectModuleTrackerForRound'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'PickConservationProject',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  data() {
    return {
      conservationProjectsHand: 0,
      conservationProjectsBoardNoToken: 0,
      conservationProjectsBoardAvailable: 0,
      pickFromHand: false,
      pickFromBoardNoToken: false,
      pickFromBoardAvailable: false,
      conservationProjectNumber: 0
    }
  },
  computed: {
    anyConservationProjectAvailable() : boolean {
      return this.conservationProjectsHand > 0 || this.conservationProjectsBoardNoToken > 0 || this.conservationProjectsBoardAvailable > 0
    },
    conservationProjectPicked() : boolean {
      return this.pickFromHand || this.pickFromBoardNoToken || this.pickFromBoardAvailable
    },
    difficultyLevel() : DifficultyLevel {
      return this.navigationState.difficultyLevel
    },
    projectSlotDifficultyLevel() : ProjectSlot {
      switch (this.difficultyLevel) {
        case DifficultyLevel.L5_HARD:
        case DifficultyLevel.L6_VERY_HARD:
          return ProjectSlot.LEFT
        case DifficultyLevel.L3_EASY:
        case DifficultyLevel.L4_MEDIUM:
          return ProjectSlot.MIDDLE
        default:
          return ProjectSlot.RIGHT
      }
    },
    projectSlotLeftMost() : boolean {
      return this.projectSlotDifficultyLevel == ProjectSlot.LEFT
    },
    projectSlotMiddle() : boolean {
      return this.projectSlotDifficultyLevel == ProjectSlot.MIDDLE
    },
    projectSlotRightMost() : boolean {
      return this.projectSlotDifficultyLevel == ProjectSlot.RIGHT
    },
    projectSlotsModulePlacement() : ProjectSlot[] {
      const projectModuleTracker = getProjectModuleTrackerForRound(this.state, this.navigationState.round, this.navigationState.bot)
      return projectModuleTracker.getPreferredProjectSlots()
    },
    hasProjectModuleExpansion() : boolean {
      return (this.state.setup.expansions ?? []).includes(Expansion.ARNO_CONSERVATION_PROJECT_MODULE)
    }
  },
  methods: {
    reset() : void {
      this.conservationProjectsHand = 0
      this.conservationProjectsBoardNoToken = 0
      this.conservationProjectsBoardAvailable = 0
      this.pickFromHand = false
      this.pickFromBoardNoToken = false
      this.pickFromBoardAvailable = false
    },
    pickConservationProject() : void {
      const fromHand = this.conservationProjectsHand || 0
      const fromBoardNoToken = this.conservationProjectsBoardNoToken || 0
      const fromBoardAvailable = this.conservationProjectsBoardAvailable || 0
      // pick from hand?
      const preferFromHand = rollDice(2) == 1
      if (fromHand >= 2 || (fromHand == 1 && preferFromHand) || (fromHand == 1 && fromBoardNoToken == 0 && fromBoardAvailable == 0)) {
        this.conservationProjectNumber = rollDice(fromHand)
        this.pickFromHand = true
        return
      }
      // pick from association board without any player token?
      if (fromBoardNoToken > 0) {
        this.conservationProjectNumber = rollDice(fromBoardNoToken)
        this.pickFromBoardNoToken = true
        return
      }
      // pick from association board available?
      if (fromBoardAvailable > 0) {
        this.conservationProjectNumber = rollDice(fromBoardAvailable)
        this.pickFromBoardAvailable = true
      }
    },
    inputSelectAll(event: Event) : void {
      const input = event.target as HTMLInputElement
      input.select()
    }
  }
})
</script>

<style lang="scss" scoped>
input {
  width: 4rem;
}
</style>