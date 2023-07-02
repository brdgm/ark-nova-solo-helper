<template>
  <img :src="imageUrl" draggable="false" alt=""/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CardTypeIcon',
  props: {
    cardName: {
      type: String,
      required: true
    },
    upgrade: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    imageUrl() : string {
      const suffix = this.upgrade ? '2' : '1'
      return new URL(`/src/assets/card-type/${this.cardName}-${suffix}.png`, import.meta.url).toString()
    }
  }
})
</script>
