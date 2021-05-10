<template>
  <section>
    <img @dragstart="" :src="wallpaper" alt="wallpaper"/>
    <window v-for="app in activeApps" class="app"
            :icon="app.icon"
            :app-name="app.name"
            :position="app.position"
            :size="app.size"
            @move="moveApp(app, $event)"
            @resize="resizeApp(app, $event)"
    >
      <component :is="app.app"></component>
    </window>
  </section>
</template>

<script lang="ts">
import wallpaper from "@/assets/images/wallpaper.png"
import Window from "../../components/window.vue";

export default {
  name: "index",
  components: {Window},
  data (){
    return {
      wallpaper,
    }
  },
  inject: ['apps'],
  computed: {
    activeApps (){
      return this.apps.filter(app=>app.status.value > 1)
    }
  },
  methods: {
    moveApp(app, e){
      app.position[0] = app.position[0] + e[0]
      app.position[1] = app.position[1] + e[1]
    },
    resizeApp(app, e){
      app.size[0] = app.size[0] + e[0]
      app.size[1] = app.size[1] + e[1]
    }
  }
}
</script>

<style scoped lang="scss">
section{
  width: 100%;
  height: calc(100% - 3.4rem);
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