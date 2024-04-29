<template>
  <h3 class="mt-4 mb-3">{{t('setup.pickZooMap.title')}}</h3>

  <div class="row mt-3">
    <div class="col-sm-5 col-lg-3">
      <label for="playerCount" class="form-label">{{t('setup.pickZooMap.title')}}</label>
      <button type="button" class="upgrade btn btn-outline-secondary btn-sm ms-2" @click="pickRandom">
        {{t('setup.pickZooMap.pickRandom')}}
      </button><br/>
    </div>
    <div class="col-sm-5 col-lg-3 mt-3 mt-sm-0">
      <select class="form-select" v-for="playerIndex in state.setup.playerSetup.playerCount" :key="playerIndex" v-model="selectedMaps[playerIndex - 1]">
        <option :value="''">{{t('setup.pickZooMap.pleaseSelect')}}</option>
        <option :value="'A'">{{t('setup.pickZooMap.mapA')}}</option>
        <option :value="'0'">{{t('setup.pickZooMap.map0')}}</option>
        <option v-for="item in advancedMaps" :key="item.id" :value="item.id">{{item.title}}</option>
      </select>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import rollDice from 'brdgm-commons/src/util/random/rollDice'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'PickZooMap',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const selectedMaps = ref(state.setup.zooMaps ?? ['','',''])

    return { t, state, selectedMaps }
  },
  computed: {
    advancedMaps() : {id: string, title: string}[] {
      const result = []
      for (let i=1; i<=8; i++) {
        result.push({id: i+'', title: this.t('setup.pickZooMap.mapAdvanced', {id:i})})
      }
      for (let i=9; i<=10; i++) {
        result.push({id: i+'', title: this.t('setup.pickZooMap.mapAdvancedMapPack', {id:i,mapPack:1})})
      }
      return result
    }
  },
  methods: {
    pickRandom() : void {
      this.selectedMaps = ['','','']
      for (let i=0; i<this.selectedMaps.length; i++) {
        this.selectedMaps[i] = this.pickUniqueMap()
      }
    },
    pickUniqueMap() : string {
      const advancedMapNo = rollDice(this.advancedMaps.length)
      const selected = this.advancedMaps[advancedMapNo - 1].id
      if (this.selectedMaps.includes(selected)) {
        return this.pickUniqueMap()
      }
      return selected
    }
  },
  watch: {
    selectedMaps: {
      handler() {
        this.state.setupZooMaps(this.selectedMaps)
      },
      deep: true
    }
  }
})
</script>
