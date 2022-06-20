<template>
  <a id="bonusTile" data-bs-toggle="modal" href="#getBonusTileModal">{{t('bonusTile.link')}}</a>

  <div class="modal" id="getBonusTileModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{t('bonusTile.link')}}</h5>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p v-html="t('bonusTile.text')"></p>
          <button v-if="!bonusTilePosition" type="button" class="btn btn-primary btn-sm ms-2" @click="pickBonusTilePosition()">{{t('bonusTile.pick')}}</button>
          <p v-if="bonusTilePosition==1" v-html="t('bonusTile.left')"></p>
          <p v-if="bonusTilePosition==2" v-html="t('bonusTile.right')"></p>
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

export default defineComponent({
  name: 'BonusTile',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      bonusTilePosition: undefined as number | undefined
    }
  },
  methods: {
    pickBonusTilePosition() {
      this.bonusTilePosition = rollDice(2)
    },
    reset() {
      this.bonusTilePosition = undefined
    }
  }
})
</script>

<style lang="scss" scoped>
#bonusTile {
  float: right;
  text-decoration: underline dotted;
  color: #000;
}
</style>
