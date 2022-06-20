<template>
  <ol>
    <li v-html="t('setupARNO.text1')"></li>
    <li v-html="t('setupARNO.text2')"></li>
    <li v-html="t('setupARNO.text3')"></li>
    <li v-html="t('setupARNO.text4')"></li>
    <li v-html="t('setupARNO.text5')"></li>
    <li v-html="t('setupARNO.text6')"></li>
    <li>
      <span v-html="t('setupARNO.text7')"></span>
      <ul>
        <li v-html="t('setupARNO.text7-1')"></li>
        <li v-html="t('setupARNO.text7-2')"></li>
        <li v-html="t('setupARNO.text7-3')"></li>
      </ul>
    </li>
    <li v-html="t('setupARNO.text8')"></li>
  </ol>
  <p><img src="@/assets/arno-zoo-mat.jpg" class="zoomat"/></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'SetupARNOInstructions',
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>

<style lang="scss" scoped>
.zoomat {
  width: 60%;
}
li {
  margin-top: 0.5rem;
  &::marker {
    font-weight: bold;
  }
}
</style>
