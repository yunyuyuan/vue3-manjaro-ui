<template>
  <section class="flex" id="taskbar">
    <i @click="toggleLeftMenu" class="icon-menu flex"><svg-icon name="plasma"/></i>
    <div class="pinned flex">
      <app-icon v-for="app in pinnedApp" :class="'_item-'+app.name" :app="app"/>
    </div>
    <div class="apps flex">
      <app-icon v-for="app in otherApp" :class="'_item-'+app.name" :app="app"/>
    </div>

    <div class="pendant flex" :class="{active: showRight==='arrow'}">
      <i :class="{active: showRight==='paste'}" @click="toggleRightMenu('paste')">
        <svg-icon name="paste"/>
      </i>
      <i @click="keyboardType=keyboardType==='keyboard'?'google-pinyin':'keyboard'">
        <svg-icon :name="keyboardType"/>
      </i>
      <i :class="{active: showRight==='volume'}" @click="toggleRightMenu('volume')">
        <svg-icon name="audio-volume-muted"/>
      </i>
      <i :class="{active: showRight==='bluetooth'}" @click="toggleRightMenu('bluetooth')">
        <svg-icon name="bluetooth"/>
      </i>
      <i :class="{active: showRight==='wifi'}" @click="toggleRightMenu('wifi')">
        <svg-icon name="wifi"/>
      </i>
      <i :class="{toggled: showRight==='arrow'}" @click="toggleRightMenu('arrow')" class="trans">
        <svg-icon name="triangle" style="width: 1.1rem;height: 1.1rem;transform: rotate(-90deg)"/>
      </i>
      <i @click="showDesktop">
        <svg-icon name="desktop" style="width: 2.2rem;height: 2.2rem"/>
      </i>
      <div class="time flex" @click="toggleCalendar">
        <time>{{time}}</time>
        <span>{{date}}</span>
      </div>
    </div>

    <left-menu ref="leftmenu" :show="showLeft" @focusout="leftFocusout"/>
    <right-menu :show="showRight" @focusout="rightFocusout"/>
    <the-calendar ref="calendar" :show="showCalendar" @focusout="calendarFocusout"/>
    <span class="bg"></span>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppIcon from "./appIcon.vue";
import leftMenu from "./leftMenu.vue";
import rightMenu from "./rightMenu.vue";
import TheCalendar from "./calendar.vue";
import dayjs, {Dayjs} from "dayjs";
import {typeApp} from "../../utils/apps";
import mixin from "../../utils/mixin";

export default defineComponent({
  name: "index",
  components: {AppIcon, leftMenu, rightMenu, TheCalendar},
  data (){
    return {
      showLeft: false,
      showRight: '',
      showCalendar: false,
      oldShowRight: '',
      animation: false,

      arrowActive: false,
      keyboardType: 'keyboard',
      timeStamp: dayjs(Date.now()) as Dayjs,
      showDesktopLis: [] as Array<string>
    }
  },
  mixins: [mixin],
  computed: {
    pinnedApp ():Array<typeApp>{
      return this.apps.filter((app: typeApp)=>app.taskbar!=undefined).sort((a: typeApp, b: typeApp)=> a.taskbar - b.taskbar)
    },
    otherApp (): Array<typeApp>{
      return this.apps.filter((app: typeApp)=>app.order!=undefined&&app.status.value>0).sort((a: typeApp, b: typeApp)=> a.order.value - b.order.value)
    },
    time (): string{
      return this.timeStamp.format('HH:mm')
    },
    date(): string{
      return this.timeStamp.format('DD MMM')
    }
  },
  created() {
    setInterval(()=>{
      this.timeStamp = dayjs(Date.now());
    }, 1000)
  },
  methods: {
    toggleLeftMenu (){
      if (this.animation) return;
      this.animation = false;
      !this.showLeft && (this.showLeft = !this.showLeft);
    },
    leftFocusout (){
      this.showLeft = false;
      this.animation = true;
      setTimeout(()=>this.animation=false, 200)
    },
    toggleRightMenu (type: string){
      if (this.animation && this.oldShowRight===type) return
      this.showRight = type
    },
    rightFocusout (){
      this.oldShowRight = this.showRight;
      this.showRight = '';
      this.animation = true;
      setTimeout(()=>this.animation=false, 200)
    },
    showDesktop (){
      this.apps.map((app: typeApp)=>{
        if (this.showDesktopLis.includes(app.name)){
          app.status.value = 2;
          this.showDesktopLis.splice(this.showDesktopLis.indexOf(app.name)||0, 1)
        }else if (app.status.value === 2){
          app.status.value = 1;
          this.showDesktopLis.push(app.name)
        }
      })
    },
    toggleCalendar (){
      if (this.animation) return;
      this.showCalendar = !this.showCalendar;
      this.animation = false;
    },
    calendarFocusout (){
      this.showCalendar = false;
      this.animation = true;
      setTimeout(()=>this.animation=false, 200)
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
  box-shadow: 0 0 0.5rem #171717;
  z-index: $z-index-taskbar;
  >*{
    z-index: 3;
  }
  >span{
    position: absolute;
    background: #2b2e33;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  >.icon-menu:deep(>svg){
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 .4rem;
    fill: white;
  }
  >.pinned{
    height: 100%;
  }
  >.apps{
    height: 100%;
  }
  >.pendant{
    margin-left: auto;
    height: 100%;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      width: 77%;
      height: 3px;
      background: #44bbff;
      top: 0;
      left: .5rem;
      opacity: 0;
      transition: opacity .1s linear;
    }
    &.active{
      &:before{
        opacity: 1;
      }
    }
    >i{
      height: 100%;
      display: flex;
      align-items: center;
      margin: 0 .1rem;
      padding: 0 .15rem;
      position: relative;
      :deep(>svg){
        width: 1.6rem;
        height: 1.6rem;
        fill: white;
      }
      &:before{
        content: '';
        position: absolute;
        width: 80%;
        height: 3px;
        background: #44bbff;
        top: 0;
        left: 10%;
        opacity: 0;
        transition: opacity .1s linear;
      }
      &.active{
        &:before{
          opacity: 1;
        }
      }
      &.toggled{
        transform: rotate(180deg);
      }
    }
    >.time{
      height: 100%;
      flex-direction: column;
      color: white;
      margin: 0 .6rem;
      justify-content: center;
      user-select: none;
      >time{
        font-size: 1.2rem;
      }
      >span{
        font-size: .85rem;
      }
    }
  }
}
</style>