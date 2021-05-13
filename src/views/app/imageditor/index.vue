<template>
  <div class="image">
    <iframe src="https://3dimg.com/editor/"></iframe>
  </div>
</template>

<script lang="ts">

export default {
  name: "index",
}
</script>

<style scoped lang="scss">
.image{
  width: 100%;
  height: 100%;
  overflow: hidden;
  >iframe{
    width: 100%;
    height: 100%;
  }
}
</style>