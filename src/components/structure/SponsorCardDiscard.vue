<template>
  <ul v-for="bot of botCount" :key="bot">
    <li>
      <span v-html="t('sponsorCardDiscard.count', {bot}, botCount)"></span>
      <input type="number" min="0" :max="maxCount" step="1" v-model="count[bot-1]" @focus="inputSelectAll"/>
    </li>
  </ul>
</template>

<script lang="ts">
import { useStateStore } from '@/store/state'
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'SponsorCardDiscard',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Array as PropType<number[]>,
      required: true
    },
    maxCount: {
      type: Number,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
      count: this.modelValue
    }
  },
  computed: {
    botCount() : number {
      return this.state.setup.playerSetup.botCount
    }
  },
  methods: {
    inputSelectAll(event: Event) : void {
      const input = event.target as HTMLInputElement
      input.select()
    }
  },
  watch: {
    count: {
      handler() {
        this.$emit('update:modelValue', this.count)
      },
      deep: true
    }
  }
})
</script>

<style lang="scss" scoped>
input {
  width: 5rem;
  margin-left: 0.5rem;
}
li {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
</style>
