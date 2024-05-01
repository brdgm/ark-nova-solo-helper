<template>
  <p>
    <span v-html="t('roundBot.gainPartnerZooOrUniversity.missingMost')"></span><br/>
  </p>
  <p>
    <input class="form-radio-input" type="radio" id="missingMostPartnerZoo" v-model="missingMostPartnerZooOrUniversity" :value="1">
    <label class="form-radio-label" for="missingMostPartnerZoo">
      <AppIcon name="gain-partner-zoo" class="icon"/>
      {{t('roundBot.gainPartnerZooOrUniversity.partnerZoo')}}
    </label>
    
    <input class="form-radio-input" type="radio" id="missingMostPartnerUniversity" v-model="missingMostPartnerZooOrUniversity" :value="2">
    <label class="form-radio-label" for="missingMostPartnerUniversity">
      <AppIcon name="gain-partner-university" class="icon"/>
      {{t('roundBot.gainPartnerZooOrUniversity.partnerUniversity')}}
    </label>

    <button type="button" class="upgrade btn btn-outline-secondary btn-sm ms-3" @click="pickRandom">{{t('roundBot.gainPartnerZooOrUniversity.pickRandom')}}</button>
  </p>
  <GainPartnerZoo v-if="missingMostPartnerZooOrUniversity==1"/>
  <GainPartnerUniversity v-if="missingMostPartnerZooOrUniversity==2"/>
</template>

<script lang="ts">
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import GainPartnerZoo from './GainPartnerZoo.vue'
import GainPartnerUniversity from './GainPartnerUniversity.vue'

export default defineComponent({
  name: 'GainPartnerZooOrUniversity',
  components: {
    AppIcon,
    GainPartnerZoo,
    GainPartnerUniversity
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      missingMostPartnerZooOrUniversity: 0
    }
  },
  methods: {
    pickRandom() : void {
      this.missingMostPartnerZooOrUniversity = rollDice(2)
    },
    reset(): void {
      this.missingMostPartnerZooOrUniversity = 0
    }
  }
})
</script>

<style lang="scss" scoped>
input {
  margin-left: 1rem;
}
.icon {
  height: 1.25rem;
  margin-top: -0.25rem;
  margin-left: 0.5rem;
  margin-right: 0rem;
}
</style>