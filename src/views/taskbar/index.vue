<template>
  <section class="flex" id="taskbar">
    <svg-icon class="menu" name="folder-activities"/>
    <div class="thumbview"></div>
    <div class="pinned flex">
      <app-icon v-for="app in pinnedApp" :class="'_item-'+app.name" :app="app"/>
    </div>
    <div class="apps">
      <app-icon v-for="app in otherApp" :class="'_item-'+app.name" :app="app"/>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppIcon from "./appIcon.vue";

export default defineComponent({
  name: "index",
  components: {AppIcon},
  data (){
    return {

    }
  },
  inject: ['apps'],
  computed: {
    pinnedApp (){
      return this.apps.filter(app=>app.taskbar!=undefined).sort((a, b)=>a.taskbar-b.taskbar)
    },
    otherApp (){
      return this.apps.filter(app=>app.order!=undefined&&app.status.value>0).sort((a, b)=>a.order-b.order)
    }
  }
})
</script>

<style scoped lang="scss">
@import "src/assets/style/public";

section{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3.2rem;
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
    margin: 0 .3rem;
  }
  >.pinned{
    height: 100%;
  }
  >.apps{

  }
}
</style>