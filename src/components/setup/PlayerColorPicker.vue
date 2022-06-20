<template>
  <svg v-for="playerColor in playerColors" :key="playerColor" width="1.5rem" height="1.5rem" class="color"
      :class="{selected:playerColor==selectedColor}" @click="selectColor(playerColor)">
    <rect width="1rem" height="1rem" :style="`fill:${getColorCode(playerColor)};'`"/>
  </svg>
</template>

<script lang="ts">
import PlayerColor from '@/services/enum/PlayerColor'
import { defineComponent } from 'vue'
import getPlayerColorCode from '@/util/getPlayerColorCode'

export default defineComponent({
  name: 'PlayerColorPicker',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      playerColors: Object.values(PlayerColor),
      selectedColor: this.modelValue
    }
  },
  methods: {
    getColorCode(color : PlayerColor) : string {
      return getPlayerColorCode(color)
    },
    selectColor(color : PlayerColor) : void {
      this.selectedColor = color
      this.$emit('update:modelValue', color)
    }
  }
})
</script>
<style lang="scss" scoped>
.color {
  margin-right: 0.5rem;
  border: 4px solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  &.selected {
    border: 4px solid #999;
  }
}
</style>
