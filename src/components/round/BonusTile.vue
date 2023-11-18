<template>
  <a id="bonusTile" data-bs-toggle="modal" href="#getBonusTileModal" v-html="t('bonusTile.link')"></a>

  <ModalDialog id="getBonusTileModal">
    <template #header>
      <h5 class="modal-title" v-html="t('bonusTile.link')"></h5>
      <button class="btn-close" data-bs-dismiss="modal" :aria-label="t('action.close')" @click="reset()"></button>
    </template>
    <template #body>
      <p v-html="t('bonusTile.text')"></p>
      <button v-if="!bonusTilePosition" type="button" class="btn btn-primary btn-sm ms-2" @click="pickBonusTilePosition()">{{t('bonusTile.pick')}}</button>
      <p v-if="bonusTilePosition==1" v-html="t('bonusTile.left')"></p>
      <p v-if="bonusTilePosition==2" v-html="t('bonusTile.right')"></p>
      <p class="fst-italic small mt-3">
        <span v-html="t('roundBot.upgradeCard.note')"></span><br/>
        <span v-if="hasMarineWorldsExpansion" v-html="t('roundBot.upgradeCard.noteAppeal15BonusTile')"></span>
      </p>
      <hr/>
      <div v-if="gainPartnerZoo" class="mt-4 mb-4"><GainPartnerZoo/></div>
      <div v-else-if="gainPartnerUniversity" class="mt-4 mb-4"><GainPartnerUniversity/></div>
      <template v-else>
        <p v-html="t('bonusTile.usage')"></p>
        <div>
          <AppIcon type="bonus-tile" name="partner-zoo" class="bonusTileImage"/>
          <button v-if="!gainPartnerZoo" type="button" class="btn btn-outline-secondary btn-sm ms-2" @click="pickPartnerZoo()">{{t('bonusTile.pickPartnerZoo')}}</button>
        </div>
        <div>
          <AppIcon type="bonus-tile" name="partner-university" class="bonusTileImage"/>
          <button v-if="!gainPartnerUniversity" type="button" class="btn btn-outline-secondary btn-sm ms-2" @click="pickPartnerUniversity()">{{t('bonusTile.pickPartnerUniversity')}}</button>
        </div>
        <div>
          <AppIcon type="bonus-tile" name="reputation" class="bonusTileImage"/>
        </div>
      </template>
    </template>
    <template #footer>
      <button class="btn btn-secondary" @click="reset()" data-bs-dismiss="modal">{{t('action.close')}}</button>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import rollDice from 'brdgm-commons/src/util/random/rollDice'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import GainPartnerZoo from './GainPartnerZoo.vue'
import GainPartnerUniversity from './GainPartnerUniversity.vue'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import { useStore } from '@/store'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'BonusTile',
  components: {
    AppIcon,
    GainPartnerZoo,
    GainPartnerUniversity,
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  data() {
    return {
      bonusTilePosition: undefined as number | undefined,
      gainPartnerZoo: false,
      gainPartnerUniversity: false
    }
  },
  computed: {
    hasMarineWorldsExpansion() : boolean {
      return (this.$store.state.setup.expansions ?? []).includes(Expansion.MARINE_WORLDS)
    }
  },
  methods: {
    pickBonusTilePosition() {
      this.bonusTilePosition = rollDice(2)
    },
    pickPartnerZoo() {
      this.gainPartnerZoo = true
    },
    pickPartnerUniversity() {
      this.gainPartnerUniversity = true
    },
    reset() {
      this.bonusTilePosition = undefined
      this.gainPartnerZoo = false
      this.gainPartnerUniversity = false
    }
  }
})
</script>

<style lang="scss" scoped>
#bonusTile {
  position: absolute;
  right: 0;
  top: 9.25rem;
  margin-right: 0.75rem;
  text-decoration: underline dotted;
  color: #000;
  text-align: right;
}
.bonusTileImage {
  display: inline-block;
  position: relative;
  width: 3.5rem;
  filter: drop-shadow(2px 2px 3px #888);
  margin-right: 0.5rem;
}
</style>
