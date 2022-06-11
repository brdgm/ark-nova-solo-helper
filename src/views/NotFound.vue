<template>
  <h1>{{t('notfound.title')}}</h1>

  <router-link to="/" class="btn btn-primary mt-3">{{t('action.backToHome')}}</router-link>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'NotFound',
  setup() {
    const { t } = useI18n()
    return { t }
  },
})
</script>