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
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    imageUrl() : string {
      return this.images(`./${this.name}.png`)
    }
  }
})
</script>
