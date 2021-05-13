<template>
  <div class="gedit flex">
    <v-md-editor v-model="mdText"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: "index",
  props: {
    text: String
  },
  inject: ['apps'],
  computed: {
    mdText() {
      return this.apps.find(v => v.name === 'gedit').params.text.value
    }
  }
})
</script>

<style scoped lang="scss">
.gedit{
  width: 100%;
  height: 100%;
  >.v-md-editor{
    width: 100%;
    height: 100%;
    border-radius: 0 !important;
  }
}
</style>