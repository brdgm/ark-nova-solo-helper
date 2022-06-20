<template>
  <CommonsFooterButtons :backLabel="t('action.back')" :backButtonRouteTo="backButtonRouteTo"
        :endGameLabel="t('action.'+endGameButtonType)" :endGameConfirmMessage="t('action.'+endGameButtonType+'Confirm')" :cancelLabel="t('action.cancel')" @endGame="endGame" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import CommonsFooterButtons from 'brdgm-commons/src/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'FooterButtons',
  components: {
    CommonsFooterButtons
  },
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  props: {
    endGameButtonType: {
      type: String,  /* Type of end game button <X> (i18n action.<X> and action.<X>Confirm needs to be present); button is hidden when not set */
      required: false
    },
    backButtonRouteTo: {
      type: String,  /* router-link to */
      required: false
    },
  },
  methods: {
    endGame() {
      if (this.endGameButtonType=='abortGame' || this.$route.name == 'Scoring') {
        this.$store.commit('endGame')
        this.$router.push("/")
      }
      else {
        this.$router.push("/scoring")
      }
    }
  }
})
</script>
