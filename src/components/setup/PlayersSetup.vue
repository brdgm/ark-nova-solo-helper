<template>
  <h3 class="mt-4 mb-3">{{t('setup.players.title')}}</h3>

  <div class="row mt-3">
    <div class="col-5 col-lg-3">
      <label for="playerCount" class="form-label">{{t('setup.players.playerCount')}}</label>
    </div>
    <div class="col-6 col-sm-5 col-lg-3">
      <select class="form-select" id="playerCount" v-model="playerCount">
        <option v-for="i in maxPlayerCount" :key="i" :value="i">{{t('setup.players.playerCountItem', {count:i}, i)}}</option>
      </select>
    </div>
  </div>  
  <div class="row mt-3" v-for="playerColorIndex in playerCount" :key="playerColorIndex+playerColors[playerColorIndex-1]">
    <div class="col-5 col-lg-3">
      <label for="playerCount" class="form-label">{{t('setup.players.playerColor', {index:playerColorIndex}, playerCount)}}</label>
    </div>
    <div class="col-5 col-lg-3">
      <PlayerColorPicker :model-value="playerColors[playerColorIndex-1]" @update:model-value="color => playerColorChanged(playerColorIndex-1, color)"/>
    </div>
  </div>  

  <div class="row mt-3">
    <div class="col-5 col-lg-3">
      <label for="botCount" class="form-label">{{t('setup.players.botCount')}}</label>
    </div>
    <div class="col-6 col-sm-5 col-lg-3">
      <select class="form-select" id="botCount" v-model="botCount">
        <option v-for="i in maxBotCount" :key="i" :value="i">{{t('setup.players.botCountItem', {count:i}, i)}}</option>
      </select>
    </div>
  </div>  
  <div class="row mt-3" v-for="botColorIndex in botCount" :key="botColorIndex+playerColors[playerCount+botColorIndex-1]">
    <div class="col-5 col-lg-3">
      <label for="playerCount" class="form-label">{{t('setup.players.botColor', {index:botColorIndex}, botCount)}}</label>
    </div>
    <div class="col-5 col-lg-3">
      <PlayerColorPicker :model-value="playerColors[playerCount+botColorIndex-1]" @update:model-value="color => playerColorChanged(playerCount+botColorIndex-1, color)"/>
    </div>
  </div>  

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import PlayerColorPicker from './PlayerColorPicker.vue'
import PlayerColor from '@/services/enum/PlayerColor'

export default defineComponent({
  name: 'PlayersSetup',
  components: {
    PlayerColorPicker
  },
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  data() {
    return {
      playerCount: this.$store.state.setup.playerSetup?.playerCount || 1,
      botCount: this.$store.state.setup.playerSetup?.botCount || 1,
      playerColors: this.$store.state.setup.playerSetup?.playerColors || [PlayerColor.BLUE,PlayerColor.RED,PlayerColor.YELLOW,PlayerColor.BLACK]
    }
  },
  computed: {
    maxPlayerCount() : number {
      return 4 - this.botCount
    },
    maxBotCount() : number {
      return 4 - this.playerCount
    }
  },
  watch: {
    playerCount() {
      if (this.botCount > this.maxBotCount) {
        this.botCount = this.maxBotCount
      }
      this.storePlayerSetup()
    },
    playerColors() {
      this.storePlayerSetup()
    },
    botCount() {
      if (this.playerCount > this.maxPlayerCount) {
        this.playerCount = this.maxPlayerCount
      }
      this.storePlayerSetup()
    }
  },
  methods: {
    storePlayerSetup() {
      this.$store.commit('setupPlayer', {
        playerCount: this.playerCount,
        botCount: this.botCount,
        playerColors: this.playerColors
      })
    },
    playerColorChanged(index : number, color : PlayerColor) {
      const newPlayerColors = [...this.playerColors]
      newPlayerColors[index] = color
      for (let i=0; i<this.playerColors.length; i++) {
        if (i!=index && newPlayerColors[i]==color) {
          const newColor = Object.values(PlayerColor).find(c => !newPlayerColors.includes(c))
          if (newColor) {
            newPlayerColors[i] = newColor
          }
        }
      }
      this.playerColors = newPlayerColors
    }
  }
})
</script>
