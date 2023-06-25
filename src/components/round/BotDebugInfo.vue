<template>
  <div class="debugMode mt-3" v-if="botRound">
    Tokens on final scoring card: <b>{{botRound.tokenScoringCardCount}}</b>,
    Tokens on notepad: <b>{{botRound.tokenNotepadCount}}</b>, 
    Appeal: <b>{{botRound.appealCount}}</b>
  </div>
</template>

<script lang="ts">
import { BotRound } from '@/store'
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BotDebugInfo',
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    botRound() : BotRound|undefined {
      return this.navigationState.botRound
    }
  }
})
</script>

<style lang="scss" scoped>
.debugMode {
  background-color: #fbb;
  padding: 5px;
  border-radius: 5px;
}
</style>
