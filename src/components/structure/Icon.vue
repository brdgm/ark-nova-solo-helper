<template>
  <img :src="imageUrl" draggable="false" alt=""/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Icon',
  setup() {
    const images = require.context('@/assets/icons', true, /\.png$/)
    return { images }
  },
  props: {
    type: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    imageUrl() : string {
      if (this.type) {
        return this.images(`./${this.type}/${this.name}.png`)
      }
      else {
        return this.images(`./${this.name}.png`)
      }
    }
  }
})
</script>
