<template>
  <h3 class="mt-4 mb-3">{{t('setup.difficultyLevel.title')}}</h3>

  <template v-for="bot in botCount" :key="bot">
    <h6 v-if="botCount > 1">{{t('roundBot.title', {bot:bot}, botCount)}}</h6>
    <div class="row">
      <div class="col-2 col-md-1 text-end">
        <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.easy')}}</label>
      </div>
      <div class="col-8 col-md-4">
        <input type="range" class="form-range" min="1" max="7" id="difficultyLevel"
            :value="levels[bot-1]" @input="updateDifficultyLevel(bot, $event)">
      </div>
      <div class="col-2 col-md-1">
        <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.hard')}}</label>
      </div>
    </div>
    <div class="row">
      <div class="offset-2 offset-md-1 col-8 col-md-4 text-muted small">
        {{t(`difficultyLevel.${levels[bot-1]}`)}}
      </div>
    </div>
  </template>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import getDifficultyLevel from '@/util/getDifficultyLevel'

export default defineComponent({
  name: 'DifficultyLevel',
  setup() {
    const { t } = useI18n()
    const store = useStore()

    const initialLevels : number[] = []
    for (let bot = 1; bot<=3; bot++) {
      initialLevels[bot-1] = getDifficultyLevel(store.state.setup, bot)
    }

    const levels = ref(initialLevels)
    return { t, levels }
  },
  computed: {
    botCount() : number {
      return this.$store.state.setup.playerSetup.botCount
    }
  },
  methods: {
    getDifficultyLevelForBot(bot : number) {
      return getDifficultyLevel(this.$store.state.setup, bot)
    },
    updateDifficultyLevel(bot : number, event: Event) {
      const level = parseInt((event.target as HTMLInputElement).value)
      this.levels[bot-1] = level
      this.$store.commit('setupDifficultyLevels', this.levels.slice(0, this.botCount))
    }
  }
})
</script>
