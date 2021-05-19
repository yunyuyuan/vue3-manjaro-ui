<template>
  <div class="window"
       :style="{
          transform: `translate(${app.maxed.value?0:app.position[0]}px, ${app.maxed.value?0:app.position[1]}px) scale(${scale})`,
          cursor: calcCursor,
          width: app.size[0]+'px',
          height: app.size[1]+'px',
          zIndex: app.zindex.value,
        }"
       :class="{top: topWindow === app, maxed: app.maxed.value}"
       @mousemove="checkResize"
       @mouseleave="noResize"
       @mousedown.capture="startResize"
       @click.capture="setZIndex"
  >
    <div>
      <div class="head flex"
           :class="{moving: moving}"
           :data-text="app.name"
           @mousedown.self="startMove"
           @dblclick.self="doubleClick"
      >
        <a class="icon flex"><svg-icon :name="app.icon"/></a>
        <i class="minimize" @click="appMinimize"><svg-icon name="arrow"/></i>
        <i class="maximize" @click="appMaximize"><svg-icon :name="app.maxed.value?'rhomb':'arrow'"/></i>
        <i class="close" @click="appClose"><svg-icon name="close"/></i>
      </div>
      <div ref="body" class="body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, watchEffect} from 'vue'
import {typeApp} from "../utils/apps";
import mixin from "../utils/mixin";

const interval = 8;

export default defineComponent({
  name: "window",
  props: {
    app: {type: Object as PropType<typeApp>},
  },
  data (){
    return {
      prevPos: [0, 0],
      moving: false,
      resizing: false,
      resizeX: 0,
      resizeY: 0,
      scale: 1,

      waitNormalize: false,
    }
  },
  mounted() {
    this.$el.addEventListener('transitionend', ()=>{
      this.$el.style.transitionProperty = 'none'
      this.app.animating = false;
    })
    watchEffect(()=>{
      if (this.app.animating) return;
      switch (this.$props.app.status.value){
        case 0:
          // close,just do nothing
          break
        case 1:
          // minimize
          this.app.animating = true;
          this.$el.style.transitionProperty = 'top, left, opacity, transform'
          this.$el.style.top = `calc(100% - ${this.app.position[1]}px)`;
          const taskbarItem = document.querySelector(`#taskbar ._item-${this.app.name}`) as HTMLElement;
          if (taskbarItem){
            this.$el.style.left = `${taskbarItem.offsetLeft-this.app.position[0]}px`;
          }
          this.$el.style.opacity = 0;
          this.scale = 0.1
          this.waitNormalize = true;
          break
        case 2:
          // normalize
          if (this.waitNormalize){
            this.app.animating = true;
            this.$el.style.transitionProperty = 'top, left, opacity, transform, box-shadow'
            this.$el.style.top = `0`;
            this.$el.style.left = `0`;
            this.$el.style.opacity = 1;
            this.scale = 1;
          }
          this.waitNormalize = false;
          break
      }
    })
  },
  computed: {
    calcCursor (){
      if (this.resizeX !== 0 && this.resizeY === 0){
        return 'e-resize'
      }
      if (this.resizeY !== 0 && this.resizeX === 0){
        return 'n-resize'
      }
      if (this.resizeY*this.resizeX === -1){
        return 'ne-resize'
      }
      if (this.resizeY*this.resizeX === 1){
        return 'nw-resize'
      }
      return 'default'
    },
  },
  watch: {
    resizing (){
      if (this.resizing){
        document.body.style.userSelect = 'none'
      }else{
        document.body.style.userSelect = 'unset'
      }
      this.$refs.body.style.pointerEvents = this.resizing?'none':'unset'
    },
    moving (){
      this.$refs.body.style.pointerEvents = this.moving?'none':'unset'
    },
  },
  emits: ['move', 'resize'],
  mixins: [mixin],
  methods: {
    setZIndex (){
      if (this.topWindow !== this.app){
        this.app.zindex.value = this.topWindow.zindex.value+1;
      }
    },
    startMove (e: MouseEvent){
      this.setZIndex();
      if (e.button !== 0 || this.app.maxed.value) return
      this.prevPos = [e.screenX, e.screenY];
      document.addEventListener('mousemove', this.move);
      document.addEventListener('mouseup', this.endMove);
    },
    move (e: MouseEvent){
      if (!this.moving){
        this.moving = true;
      }
      const delta = [e.screenX - this.prevPos[0], e.screenY - this.prevPos[1]];
      this.prevPos = [e.screenX, e.screenY];
      this.doMove(delta);
    },
    endMove (){
      this.moving = false;
      document.removeEventListener('mousemove', this.move);
      document.removeEventListener('mouseup', this.endMove);
    },
    doMove (e: Array<number>){
      this.app.position[0] = this.app.position[0] + e[0]
      this.app.position[1] = this.app.position[1] + e[1]
      this.$emit('move');
    },

    checkResize (e: MouseEvent){
      if (this.resizing) return;
      const {clientX, clientY} = e;
      const {top, left} = this.$el.getBoundingClientRect();
      const offsetX = clientX - left;
      const offsetY = clientY - top;
      if (offsetX < interval){
        this.resizeX = -1;
      }else if (offsetX > this.$el.offsetWidth-interval){
        this.resizeX = 1;
      }else{
        this.resizeX = 0;
      }
      if (offsetY < interval){
        this.resizeY = -1;
      }else if (offsetY > this.$el.offsetHeight-interval){
        this.resizeY = 1;
      }else{
        this.resizeY = 0;
      }
    },
    noResize (){
      if (this.resizing) return;
      this.resizeX = 0;
      this.resizeY = 0;
    },
    startResize (e: MouseEvent){
      this.setZIndex();
      if (e.button !== 0) return;
      if (this.resizeX || this.resizeY){
        this.prevPos = [e.screenX, e.screenY];
        this.resizing = true;
        document.addEventListener('mousemove', this.resize);
        document.addEventListener('mouseup', this.endResize);
      }
    },
    resize (e: MouseEvent){
      if (this.resizeX === -1 || this.resizeY === -1){
        const posDelta = [0, 0];
        const sizeDelta = [0, 0];
        if (this.resizeX === -1){
          posDelta[0] = e.screenX - this.prevPos[0];
          sizeDelta[0] = -e.screenX + this.prevPos[0];
        }else{
          posDelta[0] = 0;
          sizeDelta[0] = 0;
        }
        if (this.resizeY === -1){
          posDelta[1] = e.screenY - this.prevPos[1];
          sizeDelta[1] = -e.screenY + this.prevPos[1];
        }else {
          posDelta[1] = 0;
          sizeDelta[1] = 0;
        }
        if (this.doResize(sizeDelta)){
          this.doMove(posDelta);
        }
      }else {
        const delta = [this.resizeX ? (e.screenX - this.prevPos[0]) : 0, this.resizeY ? (e.screenY - this.prevPos[1]) : 0];
        this.doResize(delta);
      }
      this.prevPos = [e.screenX, e.screenY];
    },
    endResize (){
      document.removeEventListener('mousemove', this.resize);
      document.removeEventListener('mouseup', this.endResize);
      this.resizing = false;
      this.noResize();
    },
    doResize(e: Array<number>): boolean{
      const newSize = [
          this.app.size[0] + e[0],
          this.app.size[1] + e[1],
      ]
      if (newSize[0] > 300 && newSize[1] > 300) {
        this.app.size[0] = newSize[0];
        this.app.size[1] = newSize[1];
        this.$emit('resize');
        return true;
      }
      return false;
    },

    doubleClick (e: MouseEvent){
      if (e.button !== 0) return;
      if (this.app.maxed.value){
        this.appNormalize();
      }else {
        this.appMaximize();
      }
    },
    appMaximize (){
      this.app.maxed.value = !this.app.maxed.value;
      this.$nextTick(()=>{
        this.$emit('resize');
      })
    },
    appNormalize (){
      this.app.maxed.value = false;
      this.$nextTick(()=>{
        this.$emit('resize');
      })
    },
    appMinimize (){
      this.app.status.value = 1;
    },
    appClose (){
      this.app.status.value = 0;
      this.app.maxed.value = false;
    },
  }
})
</script>

<style scoped lang="scss">
.window{
  position: absolute;
  padding: 8px;
  transition-property: box-shadow;
  transition-duration: .15s;
  transition-timing-function: linear;
  transform-origin: left;
  top: 0;
  left: 0;
  opacity: 1;
  &.top >div{
    box-shadow: 0 0 10px rgba(0, 0, 0, .6);
    >.head:before{
      color: white;
    }
  }
  &.maxed{
    width: 100% !important;
    height: 100% !important;
    padding: 0;
  }
  >div {
    width: 100%;
    height: 100%;
    .head {
      width: 100%;
      height: 1.6rem;
      background: #31363B;
      padding: .2rem 0;
      cursor: default;

      &.moving {
        cursor: move;
      }

      a {
        cursor: default;
        margin-left: .3rem;
        order: 1;

        :deep(svg) {
          width: 1.4rem;
          height: 1.4rem;
        }
      }

      &:before {
        content: attr(data-text);
        margin: auto;
        font-size: .9rem;
        color: #9a9a9a;
        user-select: none;
        order: 2;
      }

      i {
        cursor: default;
        order: 3;

        &.close {
          padding: .4rem;

          :deep(svg) {
            width: .65rem;
            height: .65rem;
          }
        }

        &.minimize {
          transform: rotate(180deg);
        }

        padding: .3rem;
        border-radius: 50%;
        margin: 0 0.1rem;
        display: flex;
        align-items: center;

        &:hover {
          background: white;

          &.close {
            background: #ff6666;
          }

          :deep(svg) {
            fill: black !important;
          }
        }

        :deep(svg) {
          width: .85rem;
          height: .85rem;
          fill: white;
        }
      }
    }

    .body {
      width: 100%;
      height: calc(100% - 2rem);
      background: #262626;
      :deep(>div){
        overflow-y: auto;
      }
    }
  }
}
</style>