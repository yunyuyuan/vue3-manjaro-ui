<template>
  <desktop/>
  <taskbar/>
</template>

<script lang="ts">
import desktop from "./desktop/index.vue"
import taskbar from "./taskbar/index.vue"

export default {
  name: "index",
  components: {desktop, taskbar},
}
</script>

<style scoped lang="scss">

</style>