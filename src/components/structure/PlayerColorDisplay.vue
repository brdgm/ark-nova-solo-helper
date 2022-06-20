<template>
  <svg :width="sizeRem+'rem'" :height="sizeRem+'rem'" class="color">
    <rect :width="rectSizeRem+'rem'" :height="rectSizeRem+'rem'" :style="`fill:${getColorCode(playerColor)};'`"/>
  </svg>
</template>

<script lang="ts">
import PlayerColor from '@/services/enum/PlayerColor'
import { defineComponent } from 'vue'
import getPlayerColorCode from '@/util/getPlayerColorCode'

export default defineComponent({
  name: 'PlayerColorDisplay',
  props: {
    playerColor: {
      type: String,
      required: true
    },
    sizeRem: {
      type: Number,
      default: 2
    }
  },
  computed: {
    rectSizeRem() : number {
      return this.sizeRem * 0.75
    }
  },
  methods: {
    getColorCode(color : string) : string {
      return getPlayerColorCode(color as PlayerColor)
    }
  }
})
</script>
