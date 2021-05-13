<template>
  <img @dragstart="" :src="wallpaper" alt="wallpaper"/>
  <cmd-msg v-if="power!==''" />
  <lock-screen v-else-if="lock"/>
  <desktop/>
  <taskbar v-show="power===''&&!lock"/>
</template>

<script lang="ts">
import {defineComponent, inject, Ref} from 'vue'
import desktop from "./desktop/index.vue"
import taskbar from "./taskbar/index.vue"
import LockScreen from "./lock/index.vue"
import cmdMsg from "./lock/cmdMsg.vue";
import wallpaper from "../assets/images/blur-bg.jpg";

export default defineComponent({
  name: "index",
  components: {desktop, taskbar, LockScreen, cmdMsg},
  data (){
    return {
      wallpaper,
    }
  },
  setup (){
    return {
      lock: inject('lock') as Ref,
      power: inject('power') as Ref,
    }
  },
})
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