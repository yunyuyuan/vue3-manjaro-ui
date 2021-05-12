<template>
  <img @dragstart="" :src="wallpaper" alt="wallpaper"/>
  <cmd-msg v-if="power.value!==''" />
  <lock-screen v-else-if="lock.value"/>
  <template v-else>
    <desktop/>
    <taskbar/>
  </template>
</template>

<script lang="ts">
import desktop from "./desktop/index.vue"
import taskbar from "./taskbar/index.vue"
import LockScreen from "./lock/index.vue"
import cmdMsg from "./lock/cmdMsg.vue";
import wallpaper from "@/assets/images/blur-bg.jpg";

export default {
  name: "index",
  components: {desktop, taskbar, LockScreen, cmdMsg},
  data (){
    return {
      wallpaper,
    }
  },
  inject: ['lock', 'power']
}
</script>

<style scoped lang="scss">
img{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
  z-index: -1;
}
</style>