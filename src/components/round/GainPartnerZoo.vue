<template>
  <span v-html="t(`cardAction.gain-partner-zoo`,{number:randomNumber})"></span>
  <button type="button" class="upgrade btn btn-outline-secondary btn-sm ms-2" @click="reroll">
    {{t('roundBot.reroll')}}
  </button><br/>
  <AppIcon type="partner-zoo" :name="getPartnerZooName(randomNumber)" class="tile"/>
</template>

<script lang="ts">
import rollDice from "brdgm-commons/src/util/random/rollDice"
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'GainPartnerZoo',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      randomNumber: this.getRandomNumber()
    }
  },
  methods: {
    getRandomNumber() : number {
      return rollDice(5)
    },
    reroll() : void {
      let newNumber
      do {
        newNumber = this.getRandomNumber()
      } while (newNumber == this.randomNumber)
      this.randomNumber = newNumber
    },
    getPartnerZooName(id : number) {
      switch (id) {
        case 1:
          return 'america'
        case 2:
          return 'europe'
        case 3:
          return 'asia'
        case 4:
          return 'africa'
        case 5:
          return 'australia'
        default:
          throw new Error(`Invalid partner zoo id: ${id}`)
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