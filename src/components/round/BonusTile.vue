<template>
  <a id="bonusTile" data-bs-toggle="modal" href="#getBonusTileModal" v-html="t('bonusTile.link')"></a>

  <div class="modal" id="getBonusTileModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" v-html="t('bonusTile.link')"></h5>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="reset()"></button>
        </div>
        <div class="modal-body">
          <p v-html="t('bonusTile.text')"></p>
          <button v-if="!bonusTilePosition" type="button" class="btn btn-primary btn-sm ms-2" @click="pickBonusTilePosition()">{{t('bonusTile.pick')}}</button>
          <p v-if="bonusTilePosition==1" v-html="t('bonusTile.left')"></p>
          <p v-if="bonusTilePosition==2" v-html="t('bonusTile.right')"></p>
          <hr/>
          <div v-if="gainPartnerZoo" class="mt-4 mb-4"><GainPartnerZoo/></div>
          <div v-else-if="gainPartnerUniversity" class="mt-4 mb-4"><GainPartnerUniversity/></div>
          <template v-else>
            <p v-html="t('bonusTile.usage')"></p>
            <div>
              <Icon type="bonus-tile" name="partner-zoo" class="bonusTileImage"/>
              <button v-if="!gainPartnerZoo" type="button" class="btn btn-outline-secondary btn-sm ms-2" @click="pickPartnerZoo()">{{t('bonusTile.pickPartnerZoo')}}</button>
            </div>
            <div>
              <Icon type="bonus-tile" name="partner-university" class="bonusTileImage"/>
              <button v-if="!gainPartnerUniversity" type="button" class="btn btn-outline-secondary btn-sm ms-2" @click="pickPartnerUniversity()">{{t('bonusTile.pickPartnerUniversity')}}</button>
            </div>
            <div>
              <Icon type="bonus-tile" name="reputation" class="bonusTileImage"/>
            </div>
          </template>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="reset()" data-bs-dismiss="modal">{{t('action.close')}}</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import rollDice from "brdgm-commons/src/util/random/rollDice"
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '../structure/Icon.vue'
import GainPartnerZoo from "./GainPartnerZoo.vue"
import GainPartnerUniversity from "./GainPartnerUniversity.vue"

export default defineComponent({
  name: 'BonusTile',
  components: {
    Icon,
    GainPartnerZoo,
    GainPartnerUniversity
},
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      bonusTilePosition: undefined as number | undefined,
      gainPartnerZoo: false,
      gainPartnerUniversity: false
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
  float: right;
  text-decoration: underline dotted;
  color: #000;
  max-width: 20%;
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
