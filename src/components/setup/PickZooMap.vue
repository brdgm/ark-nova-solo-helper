<template>
  <h3 class="mt-4 mb-3">{{t('setup.pickZooMap.title')}}</h3>

  <div class="row mt-3">
    <div class="col-sm-5 col-md-3">
      <label for="playerCount" class="form-label">{{t('setup.pickZooMap.title')}}</label>
      <button type="button" class="upgrade btn btn-outline-secondary btn-sm ms-2" @click="pickRandom">
        {{t('setup.pickZooMap.pickRandom')}}
      </button><br/>
    </div>
    <div class="col-sm-5 col-md-3 mt-3 mt-0-sm">
      <select class="form-select" v-model="selectedMap">
        <option :value="''">{{t('setup.pickZooMap.pleaseSelect')}}</option>
        <option :value="'A'">{{t('setup.pickZooMap.mapA')}}</option>
        <option :value="'0'">{{t('setup.pickZooMap.map0')}}</option>
        <option v-for="item in advancedMaps" :key="item.id" :value="item.id">{{item.title}}</option>
      </select>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import rollDice from "brdgm-commons/src/util/random/rollDice"

export default defineComponent({
  name: 'PickZooMap',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      selectedMap: this.$store.state.setup.zooMap ?? ''
    }
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
      const advancedMapNo = rollDice(this.advancedMaps.length)
      const selected = this.advancedMaps[advancedMapNo - 1].id
      if (selected == this.selectedMap) {
        this.pickRandom()
      }
      else {
        this.selectedMap = selected
      }
    }
  },
  watch: {
    selectedMap() : void {
      this.$store.commit('setupZooMap', this.selectedMap)
    }
  }
})
</script>
