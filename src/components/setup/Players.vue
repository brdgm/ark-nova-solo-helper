<template>
  <h3 class="mt-4 mb-3">{{t('setup.players.title')}}</h3>

  <div class="row mt-3">
    <div class="col-5 col-md-3">
      <label for="playerCount" class="form-label">{{t('setup.players.playerCount')}}</label>
    </div>
    <div class="col-5 col-md-3">
      <select class="form-select" id="playerCount" :value="playerCount" @input="updatePlayerCount($event)">
        <option v-for="i in maxPlayerCount" :key="i" :value="i">{{t('setup.players.playerCountItem', {count:i}, i)}}</option>
      </select>
    </div>
  </div>  

  <div class="row mt-3">
    <div class="col-5 col-md-3">
      <label for="botCount" class="form-label">{{t('setup.players.botCount')}}</label>
    </div>
    <div class="col-5 col-md-3">
      <select class="form-select" id="botCount" :value="botCount" @input="updateBotCount($event)">
        <option v-for="i in maxBotCount" :key="i" :value="i">{{t('setup.players.botCountItem', {count:i}, i)}}</option>
      </select>
    </div>
  </div>  

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Players',
  setup() {
    const { t } = useI18n()
    const store = useStore()

    const playerCount = ref(store.state.setup.playerCount)
    const botCount = ref(store.state.setup.botCount)

    return { t, playerCount, botCount }
  },
  computed: {
    maxPlayerCount() : number {
      return 4 - this.botCount
    },
    maxBotCount() : number {
      return 4 - this.playerCount
    }
  },
  methods: {
    updatePlayerCount(event: Event) {
      this.playerCount = parseInt((event.target as HTMLInputElement).value)
      this.$store.commit('setupPlayerCount', this.playerCount)
      if (this.botCount > this.maxBotCount) {
        this.botCount = this.maxBotCount
        this.$store.commit('setupBotCount', this.botCount)
      }
    },
    updateBotCount(event: Event) {
      this.botCount = parseInt((event.target as HTMLInputElement).value)
      this.$store.commit('setupBotCount', this.botCount)
      if (this.playerCount > this.maxPlayerCount) {
        this.playerCount = this.maxPlayerCount
        this.$store.commit('setupPlayerCount', this.playerCount)
      }
    }
  }
})
</script>
