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
    <p v-if="projectSlotLeftMost" class="fw-bold" v-html="t('roundBot.pickConservationProject.projectSlotLeftMost')"></p>
    <p v-if="projectSlotMiddle" class="fw-bold" v-html="t('roundBot.pickConservationProject.projectSlotMiddle')"></p>
    <p v-if="projectSlotRightMost" class="fw-bold" v-html="t('roundBot.pickConservationProject.projectSlotRightMost')"></p>
    <p v-html="t('roundBot.pickConservationProject.projectSlotAlternatives')"></p>
  </template>
</template>

<script lang="ts">
import rollDice from "brdgm-commons/src/util/random/rollDice"
import { useStore } from "@/store"
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import DifficultyLevel from "@/services/enum/DifficultyLevel"

export default defineComponent({
  name: 'PickConservationProject',
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const difficultyLevel = store.state.setup.difficultyLevel
    return { t, difficultyLevel }
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
    projectSlotLeftMost() : boolean {
      return this.difficultyLevel == DifficultyLevel.L5_HARD || this.difficultyLevel == DifficultyLevel.L6_VERY_HARD
    },
    projectSlotMiddle() : boolean {
      return this.difficultyLevel == DifficultyLevel.L3_EASY || this.difficultyLevel == DifficultyLevel.L4_MEDIUM
    },
    projectSlotRightMost() : boolean {
      return this.difficultyLevel == DifficultyLevel.L1_BEGINNER || this.difficultyLevel == DifficultyLevel.L2_VERY_EASY
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