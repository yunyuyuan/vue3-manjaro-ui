<template>
  <div class="window"
       :style="{
          transform: `translate(${position[0]}px, ${position[1]}px)`,
          cursor: calcCursor,
          width: size[0]+'px',
          height: size[1]+'px',
        }"
       @mousemove.self="checkResize"
       @mouseleave.self="noResize"
       @mousedown="startResize"
  >
    <div class="head flex" :class="{moving: moving}" @mousedown.self="startMove">
      <a class="icon flex"><svg-icon :name="icon"/></a>
      <span @mousedown.self="startMove">{{appName}}</span>
      <i class="minimize"><svg-icon name="arrow"/></i>
      <i class="maximize"><svg-icon name="arrow"/></i>
      <i class="close"><svg-icon name="close"/></i>
    </div>
    <div ref="body" class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "window",
  props: {
    icon: String,
    appName: String,
    position: Array,
    size: Array,
  },
  data (){
    return {
      prevPos: [],
      moving: false,
      resizing: false,
      resizeX: 0,
      resizeY: 0,
    }
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
    }
  },
  watch: {
    resizing (){
      this.$refs.body.style.pointerEvents = this.resizing?'none':'unset'
    },
    moving (){
      this.$refs.body.style.pointerEvents = this.moving?'none':'unset'
    },
  },
  emits: ['move', 'resize'],
  methods: {
    startMove (e){
      if (e.button !== 0) return
      e.preventDefault();
      e.stopPropagation();
      this.prevPos = [e.screenX, e.screenY];
      this.moving = true;
      document.addEventListener('mousemove', this.move);
      document.addEventListener('mouseup', this.endMove);
    },
    move (e){
      const delta = [e.screenX - this.prevPos[0], e.screenY - this.prevPos[1]];
      this.prevPos = [e.screenX, e.screenY];
      this.$emit('move', delta);
    },
    endMove (){
      this.moving = false;
      document.removeEventListener('mousemove', this.move);
      document.removeEventListener('mouseup', this.endMove);
    },
    checkResize (e){
      if (this.resizing) return;
      const {offsetX, offsetY} = e;
      console.log(offsetX, offsetY)
      if (offsetX < 5){
        this.resizeX = -1;
      }else if (offsetX >= this.$el.offsetWidth-5){
        this.resizeX = 1;
      }else{
        this.resizeX = 0;
      }
      if (offsetY < 5){
        this.resizeY = -1;
      }else if (offsetY >= this.$el.offsetHeight-5){
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
    startResize (e){
      if (e.button !== 0) return;
      if (this.resizeX || this.resizeY){
        e.preventDefault();
        e.stopPropagation();
        this.prevPos = [e.screenX, e.screenY];
        this.resizing = true;
        document.addEventListener('mousemove', this.resize);
        document.addEventListener('mouseup', this.endResize);
      }
    },
    resize (e){
      if (this.resizeX === -1 || this.resizeY === -1){
        const posDelta = [0, 0];
        const sizeDelta = [0, 0];
        if (this.resizeX === -1){
          posDelta[0] = e.screenX - this.prevPos[0];
          sizeDelta[0] = -e.screenX + this.prevPos[0];
        }
        if (this.resizeY === -1){
          posDelta[1] = e.screenY - this.prevPos[1];
          sizeDelta[1] = -e.screenY + this.prevPos[1];
        }
        this.$emit('move', posDelta);
        this.$emit('resize', sizeDelta);
      }else {
        const delta = [this.resizeX ? (e.screenX - this.prevPos[0]) : 0, this.resizeY ? (e.screenY - this.prevPos[1]) : 0];
        this.$emit('resize', delta);
      }
      this.prevPos = [e.screenX, e.screenY];
    },
    endResize (){
      document.removeEventListener('mousemove', this.resize);
      document.removeEventListener('mouseup', this.endResize);
      this.resizing = false;
      this.noResize();
    },
  }
}
</script>

<style scoped lang="scss">
.window{
  position: absolute;
  padding: 5px;
  .head{
    width: 100%;
    height: 1.6rem;
    background: #3c3f41;
    padding: .2rem 0;
    cursor: default;
    &.moving{
      cursor: move;
    }
    a{
      cursor: default;
      margin-left: .2rem;
      :deep(svg) {
        width: 1.4rem;
        height: 1.4rem;
      }
    }
    span{
      margin: auto;
      font-size: 1rem;
      color: white;
      user-select: none;
    }
    i{
      cursor: default;
      &.close{
        :deep(svg){
          width: .75rem;
          height: .75rem;
        }
      }
      &.maximize{
        transform: rotate(180deg);
      }
      padding: .3rem;
      border-radius: 50%;
      margin: 0 0.1rem;
      display: flex;
      align-items: center;
      &:hover{
        background: white;
        &.close{
          background: #ff2929;
        }
        :deep(svg){
          fill: black !important;
        }
      }
      :deep(svg){
        width: .95rem;
        height: .95rem;
        fill: white;
      }
    }
  }
  .body{
    width: 100%;
    height: calc(100% - 2rem);
  }
}
</style>