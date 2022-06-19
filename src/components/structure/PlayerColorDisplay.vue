<template>
  <svg width="2.25rem" height="2rem" class="color">
    <rect width="1.5rem" height="1.5rem" :style="`fill:${getColorCode(playerColor)};'`"/>
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
    }
  },
  methods: {
    getColorCode(color : string) : string {
      return getPlayerColorCode(color as PlayerColor)
    }
  }
})
</script>
