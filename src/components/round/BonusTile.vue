<template>
  <a id="bonusTile" data-bs-toggle="modal" href="#getBonusTileModal" v-html="t('bonusTile.link')"></a>

  <div class="modal" id="getBonusTileModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" v-html="t('bonusTile.link')"></h5>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p v-html="t('bonusTile.text')"></p>
          <button v-if="!bonusTilePosition" type="button" class="btn btn-primary btn-sm ms-2" @click="pickBonusTilePosition()">{{t('bonusTile.pick')}}</button>
          <p v-if="bonusTilePosition==1" v-html="t('bonusTile.left')"></p>
          <p v-if="bonusTilePosition==2" v-html="t('bonusTile.right')"></p>
          <hr/>
          <p v-html="t('bonusTile.usage')"></p>
          <Icon type="bonus-tile" name="partner-zoo" class="bonusTileImage"/>
          <Icon type="bonus-tile" name="partner-university" class="bonusTileImage"/>
          <Icon type="bonus-tile" name="reputation" class="bonusTileImage"/>
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

export default defineComponent({
  name: 'BonusTile',
  components: {
    Icon
  },
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
