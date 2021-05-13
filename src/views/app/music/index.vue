<template>
  <div class="music">
    <iframe src="https://ssh-music.vercel.app/"></iframe>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "index",
})
</script>

<style scoped lang="scss">
.music{
  width: 100%;
  height: 100%;
  overflow: hidden !important;
  >iframe{
    width: 100%;
    height: 100%;
  }
}
</style>