<template>
  <span v-html="t(`cardAction.gain-partner-zoo`,{number:randomNumber,amount:amount},amount)"></span>
  <button type="button" class="upgrade btn btn-outline-secondary btn-sm ms-2" @click="reroll">
    {{t('roundBot.reroll')}}
  </button>
</template>

<script lang="ts">
import rollDice from "brdgm-commons/src/util/random/rollDice"
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '../structure/Icon.vue'

export default defineComponent({
  name: 'GainPartnerZoo',
  components: {
    /*Icon*/
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    amount: {
      type: Number,
      required: true
    }
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
      this.randomNumber = this.getRandomNumber()
    }
  }
})
</script>
