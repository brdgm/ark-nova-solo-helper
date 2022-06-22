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
          <div class="bonusTileImage">
            <Icon name="gain-partner-zoo" class="icon"/>
            <svg width="4rem" height="4rem" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polygon transform="matrix(.08179966 0 0 .08170869 7.9509581 10.240202)" points="585.24612 214.60269 474 556.98304 114 556.98304 2.753882 214.60269 294 3" fill="#f7ee58" stroke="#555" stroke-width="10"/>
            </svg>
          </div>
          <div class="bonusTileImage">
            <Icon name="gain-partner-university" class="icon university"/>
            <svg width="4rem" height="4rem" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polygon transform="matrix(.08179966 0 0 .08170869 7.9509581 10.240202)" points="585.24612 214.60269 474 556.98304 114 556.98304 2.753882 214.60269 294 3" fill="#f7ee58" stroke="#555" stroke-width="10"/>
            </svg>
          </div>
          <div class="bonusTileImage">
            <Icon name="reputation" class="icon"/>
            <svg width="4rem" height="4rem" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polygon transform="matrix(.08179966 0 0 .08170869 7.9509581 10.240202)" points="585.24612 214.60269 474 556.98304 114 556.98304 2.753882 214.60269 294 3" fill="#f7ee58" stroke="#555" stroke-width="10"/>
            </svg>
          </div>
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
  svg {
    position: relative;
    top: 0;
    left: 0;
  }
  .icon {
    position: absolute;
    top: 1.4rem;
    left: 1rem;
    width: 2rem;
    z-index: 10;
    &.university {
      top: 1.25rem;
    }
  }
}
</style>
