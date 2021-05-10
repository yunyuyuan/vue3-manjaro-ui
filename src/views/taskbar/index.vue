<template>
  <section class="flex">
    <svg-icon class="menu" name="folder-activities"/>
    <div class="thumbview"></div>
  </section>
</template>

<script lang="ts">
export default {
name: "index"
}
</script>

<style scoped lang="scss">
@import "src/assets/style/public";

section{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3.4rem;
  background: #2b2e33;
  box-shadow: 0 0 0.5rem #171717;
  :deep(>.menu){
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 .4rem;
    fill: white;
  }
  >.thumbview{
    width: 1.92rem;
    height: 1.08rem;
    background: #ffffff59;
    border-radius: .1rem;
  }
}
</style>