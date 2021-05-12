<template>
  <section>
    <img @dragstart="" :src="wallpaper" alt="wallpaper"/>
    <window v-for="app in apps" class="app" v-show="app.status.value > 0" :app="app">
      <component :is="app.app" v-if="app.status.value > 0"></component>
    </window>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import wallpaper from "../../assets/images/wallpaper.png";
import Window from "../../components/window.vue";

export default defineComponent({
  name: "index",
  components: {Window},
  data (){
    return {
      wallpaper,
    }
  },
  inject: ['apps'],
})
</script>

<style scoped lang="scss">
section{
  width: 100%;
  height: calc(100% - 3.2rem);
  position: relative;
  overflow: hidden;
  >img{
    object-fit: cover;
    width: 100%;
    height: 100%;
    user-select: none;
    pointer-events: none;
    position: absolute;
    left: 0;
    right: 0;
  }
  >.app{
    min-width: 20rem;
  }
}
</style>