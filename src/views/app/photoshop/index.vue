<template>
  <div class="ps">
    <div id="image-editor">
      <canvas></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import Tui from 'tui-image-editor'

export default {
  name: "index",
  mounted() {
    new Tui('#image-editor')
  }
}
</script>

<style scoped lang="scss">
.ps{
  width: 100%;
  height: 100%;
  >div{
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>