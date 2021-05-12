<template>
  <span class="app flex trans" :class="{active: app.status.value>0, top: isTop&&app.status.value>0}" @click="clickApp">
    <svg-icon :name="app.icon"/>
  </span>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import mixin from "../../utils/mixin";
import {typeApp} from "../../utils/apps";

export default defineComponent({
  name: "appIcon",
  props: {
    app: {type: Object as PropType<typeApp>},
  },
  mixins: [mixin],
  computed: {
    isTop (): boolean{
      return this.app === this.topWindow
    }
  },
  methods: {
    clickApp (e: MouseEvent){
      if (e.button !== 0 || this.app.animating) return;
      if (this.app.status.value!==2 && !this.isTop) {
        this.app.zindex.value = this.topWindow.zindex.value + 1;
      }
      this.app.status.value = this.app.status.value===2?1:2;
    }
  }
})
</script>

<style scoped lang="scss">
.app{
  height: 100%;
  padding: 0 .7rem;
  margin: 0 .09rem;
  position: relative;
  :deep(>svg){
    width: 2.2rem;
    height: 2.2rem;
  }
  &:hover{
    mix-blend-mode: screen;
  }
  &.active{
    background: rgba(255, 255, 255, .15);
    &:before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: rgba(255, 255, 255, .25);
    }
  }
  &.top, &.active:hover{
    background: #30586f;
    &:before{
      background: #44bbff;
    }
  }
}
</style>