<template>
  <img :src="imageUrl" draggable="false" alt=""/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppIcon',
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
        return new URL(`/src/assets/icons/${this.type}/${this.name}.png`, import.meta.url).toString()
      }
      else {
        return new URL(`/src/assets/icons/${this.name}.png`, import.meta.url).toString()
      }
    }
  }
})
</script>
