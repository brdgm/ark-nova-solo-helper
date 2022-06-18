<template>
  <img :src="imageUrl" draggable="false" alt=""/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CardTypeIcon',
  setup() {
    const images = require.context('@/assets/card-type', true, /\.png$/)
    return { images }
  },
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
      const suffix = this.upgrade ? "2" : "1"
      return this.images(`./${this.cardName}-${suffix}.png`)
    }
  }
})
</script>
