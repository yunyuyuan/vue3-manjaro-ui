<template>
  <section>
    <img @dragstart="" :src="wallpaper" alt="wallpaper"/>
    <window v-for="app in apps" @resize="proxyResize('app-'+app.name, $event)" @move="proxyMove('app-'+app.name, $event)" class="app" v-show="app.status.value > 0" :app="app">
      <component :ref="'app-'+app.name" :is="app.app" v-if="app.status.value > 0"></component>
    </window>
  </section>
</template>

<script lang="ts">
import {defineComponent, resolveDynamicComponent, inject} from 'vue';
import wallpaper from "../../assets/images/wallpaper.png";
import Window from "../../components/window.vue";
import {typeApp} from "../../utils/apps";

export default defineComponent({
  name: "index",
  components: {Window},
  data (){
    return {
      wallpaper,
    }
  },
  setup (){
    return {
      apps: inject('apps') as Array<typeApp>,
    }
  },
  render () {
    console.log('render')
    this.apps.forEach(app=>{
      console.log(resolveDynamicComponent(app.app));
    })
  },
  methods: {
    proxyResize(app, e){
      if (this.$refs[app]&&this.$refs[app].windowResize){
        this.$refs[app].windowResize(e)
      }
    },
    proxyMove(app, e){
      if (this.$refs[app]&&this.$refs[app].windowMove){
        this.$refs[app].windowMove(e)
      }
    }
  }
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
}
</style>