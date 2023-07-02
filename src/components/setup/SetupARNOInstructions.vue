<template>
  <ol>
    <li v-html="t('setupARNO.text1')"></li>
    <li>
      <img src="@/assets/arno-conservation-start-setup.jpg" class="conservation-start-setup float-end ms-2 me-2 mt-2"/>
      <span v-html="t('setupARNO.text2')"></span>
      <ul>
        <li v-html="t('setupARNO.text2-conservation')"></li>
        <li v-html="t('setupARNO.text2-appeal')"></li>
      </ul>
    </li>
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
  <p>
    <img src="@/assets/arno-zoo-mat.jpg" class="zoomat"/>
  </p>
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
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/grid";

img {
  border-radius: 0.25rem;
  filter: drop-shadow(2px 2px 3px #888);
}
.zoomat {
  width: 60%;
}
.conservation-start-setup {
  width: 20%;
}
@include media-breakpoint-down(lg) {
  .zoomat {
    width: 75%;
  }
}
@include media-breakpoint-down(sm) {
  .zoomat {
    width: 100%;
  }
}

li {
  margin-top: 0.5rem;
  &::marker {
    font-weight: bold;
  }
}
</style>
