<template>
  <span v-html="t(`cardAction.gain-partner-university`,{number:universityRandomNumber})"></span>
  <button type="button" class="upgrade btn btn-outline-secondary btn-sm ms-2" @click="reroll">
    {{t('roundBot.reroll')}}
  </button><br/>
  <AppIcon type="partner-university" :name="getPartnerUniversityName(universityRandomNumber)" class="tile"/>
  <template v-if="isGenericAnimalUniversity">
    ➔
    <AppIcon type="partner-university-animal" :name="animalTypeRandom" class="tile"/>
    <button type="button" class="upgrade btn btn-outline-secondary btn-sm ms-2" @click="rerollAnimalType">
      {{t('roundBot.reroll')}}
    </button>
  </template>
</template>

<script lang="ts">
import rollDice from 'brdgm-commons/src/util/random/rollDice'
import rollDiceDifferentValue from 'brdgm-commons/src/util/random/rollDiceDifferentValue'
import randomEnum from 'brdgm-commons/src/util/random/randomEnum'
import randomEnumDifferentValue from 'brdgm-commons/src/util/random/randomEnumDifferentValue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import Expansion from '@/services/enum/Expansion'
import { useStore } from '@/store'
import AnimalType from '@/services/enum/AnimalType'

export default defineComponent({
  name: 'GainPartnerUniversity',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()

    const hasMarineWorldsExpansion = (store.state.setup.expansions ?? []).includes(Expansion.MARINE_WORLDS)
    const universityCount = hasMarineWorldsExpansion ? 4 : 3
    const universityRandomNumber = ref(rollDice(universityCount))
    const animalTypeRandom = ref(randomEnum(AnimalType))

    return { t, universityCount, universityRandomNumber, animalTypeRandom }
  },
  computed: {
    isGenericAnimalUniversity() : boolean {
      return this.universityRandomNumber == 4
    }
  },
  methods: {
    reroll() : void {
      this.universityRandomNumber = rollDiceDifferentValue(this.universityCount, this.universityRandomNumber)
    },
    rerollAnimalType() : void {
      this.animalTypeRandom = randomEnumDifferentValue(AnimalType, this.animalTypeRandom)
    },
    getPartnerUniversityName(id : number) {
      switch (id) {
        case 1:
          return 'cards-reputation'
        case 2:
          return 'science'
        case 3:
          return 'science-reputation'
        case 4:
          return 'science-animal'
        default:
          throw new Error(`Invalid partner university id: ${id}`)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.tile {
  width: 5rem;
  filter: drop-shadow(2px 2px 3px #888);
}
</style>