<template>
  <div class="menu" :class="{active: show}" tabindex="1" @focusout.self="focusout">
    <div class="head flex">
      <div class="people flex">
        <a class="flex trans" target="_blank" href="https://github.com/yunyuyan"><svg-icon name="user"/></a>
        <b>yunyuyuan</b>
      </div>
      <div class="search flex">
        <input class="common" @focusout.self="inputFocusout" ref="input" v-model="search" placeholder="Search..."/>
      </div>
    </div>
    <div class="body flex">
      <div class="content flex">
        <div class="flex" v-for="lis in appList" :class="{active: activeLis===lis}" @mouseenter="activeLis=lis">
          <i class="flex"><svg-icon :name="lis.icon"/></i>
          <span>{{lis.name}}</span>
          <svg-icon name="triangle"/>
        </div>
      </div>
      <div class="detail flex">
        <span class="flex" v-for="app in activeLis?activeLis.apps:[]" @click="startApp(app, $event)">
          <svg-icon :name="app"/>
          <span>{{app}}</span>
        </span>
      </div>
    </div>
    <div class="footer flex">
      <div class="left flex">
        <span class="flex" @click="activeTab='applications'">
          <svg-icon name="applications"/>
          <span>Applications</span>
        </span>
        <span class="flex" @click="activeTab='places'">
          <svg-icon name="compass"/>
          <span>Places</span>
        </span>
        <div :style="{transform: `translateX(${activeTab==='applications'?0:100}%)`}"></div>
      </div>
      <div class="right flex">
        <span @click="goSleep">
          <svg-icon name="system-suspend"/>
          <span>Sleep</span>
        </span>
        <span @click="goSleep">
          <svg-icon name="system-suspend-hibernate"/>
          <span>Hibernate</span>
        </span>
        <span @click="goReboot">
          <svg-icon name="system-reboot"/>
          <span>Restart</span>
        </span>
        <span @click="goShutdown">
          <svg-icon name="system-shutdown"/>
          <span>Shut Down</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, Ref} from 'vue';
import mixin from "../../utils/mixin";
import {typeApp} from "../../utils/apps";

interface cateApps {
  name: string,
  icon: string,
  apps: Array<string>
}

export default defineComponent({
  name: "leftMenu",
  props: {
    show: Boolean
  },
  emits: ['focusout'],
  data (){
    return {
      search: '',
      activeLis: null as cateApps|null,
      activeTab: 'applications',
      appList: [
        {
          name: 'All Applications',
          icon: 'all-apps',
          apps: ['settings', 'about', 'chrome', 'dolphin', 'terminal', 'vscode', 'photoshop']
        },{
          name: 'Development',
          icon: 'development',
          apps: ['vscode']
        },{
          name: 'Graphics',
          icon: 'graphics',
          apps: ['photoshop']
        },{
          name: 'Internet',
          icon: 'internet',
          apps: ['chrome']
        },{
          name: 'Office',
          icon: 'office',
          apps: ['vscode']
        },{
          name: 'Settings',
          icon: 'settings',
          apps: ['settings']
        },{
          name: 'System',
          icon: 'system',
          apps: ['about', 'terminal', 'dolphin']
        }
      ] as Array<cateApps>
    }
  },
  setup (){
    return {
      lock: inject('lock') as Ref,
      power: inject('power') as Ref,
    }
  },
  watch: {
    show (){
      if (this.show){
        this.$el.focus()
      }
    }
  },
  created() {
    this.activeLis = this.appList[0]
  },
  mixins: [mixin],
  methods: {
    startApp (name: string, e: MouseEvent){
      const app = this.apps.find((app: typeApp)=>app.name===name);
      if (!app) return;
      if (e.button !== 0 || app.animating) return;
      if (this.topWindow && app !== this.topWindow) {
        app.zindex.value = this.topWindow.zindex.value + 1;
      }
      app.status.value = 2;
      this.$emit('focusout')
    },
    focusout (e: FocusEvent){
      if (e.relatedTarget === this.$refs.input){
        return
      }
      this.$emit('focusout')
    },
    inputFocusout (e: FocusEvent){
      if (!e.relatedTarget){
        this.$emit('focusout')
      }
    },

    goSleep(){
      this.lock = true;
    },
    goReboot(){
      this.power = 'reboot';
    },
    goShutdown(){
      this.power = 'shutdown';
    },
  }
})
</script>

<style scoped lang="scss">
.menu{
  position: absolute;
  border: 1px solid #323232;
  border-bottom: none;
  border-left: none;
  top: 0;
  left: 0;
  transform: translateY(0);
  width: 45rem;
  height: 30rem;
  z-index: 1;
  outline: none;
  transition: transform .2s ease-out, opacity .2s ease-out;
  opacity: 0;
  box-shadow: 0 0 1rem rgba(0, 0, 0, .4);
  border-radius: .15rem .15rem 0 0;
  &.active{
    opacity: 1;
    transform: translateY(-100%);
  }
  >.head{
    width: 100%;
    height: 3.2rem;
    background: #303439;
    .people{
      width: 40%;
      a{
        margin: 0 .6rem;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 50%;
        padding: .4rem;
        &:hover{
          border-color: gray;
        }
        :deep(>svg){
          width: 1.6rem;
          height: 1.6rem;
        }
      }
      b{
        color: white;
        font-size: 1rem;
      }
    }
    .search{
      height: 100%;
      width: 60%;
      border-left: 1px solid #424242;
    }
  }
  >.body{
    width: 100%;
    height: calc(100% - 6.4rem);
    background: #2b2e33;
    border: 1px solid #545454;
    border-left: none;
    border-right: none;
    box-sizing: border-box;
    >.content>div.active, >.detail>span:hover{
      border-color: #44bbff;
      background: rgba(68, 187, 255, 0.25);
      :deep(>svg){
        fill: white;
      }
    }
    >.content{
      width: 40%;
      height: calc(100% - 2rem);
      overflow: auto;
      padding: 1rem 0;
      flex-direction: column;
      border-right: 1px solid #424242;
      >div{
        width: calc(100% - 3rem);
        padding: .5rem .5rem;
        border: 1px solid transparent;
        border-radius: .2rem;
        i{
          margin-right: 1rem;
          width: 1.6rem;
          height: 1.6rem;
          :deep(>svg){
            width: 100%;
            height: 100%;
          }
        }
        span{
          color: white;
          font-size: .75rem;
        }
        :deep(>svg){
          width: .8rem;
          height: .8rem;
          margin: 0 0 0 auto;
          fill: #5f5f5f;
        }
      }
    }
    >.detail{
      width: 60%;
      height: 100%;
      flex-wrap: wrap;
      align-items: flex-start;
      align-content: flex-start;
      >span{
        flex-direction: column;
        justify-content: space-evenly;
        border: 1px solid transparent;
        border-radius: .15rem;
        width: 5.6rem;
        height: 5.6rem;
        margin: .5rem;
        cursor: default;
        :deep(>svg){
          width: 3rem;
          height: 3rem;
        }
        >span{
          color: white;
          font-size: .75rem;
        }
      }
    }
  }
  >.footer{
    width: 100%;
    background: #2a2e32;
    height: 3.2rem;
    >.left{
      width: 40%;
      height: 100%;
      position: relative;
      >div{
        width: 50%;
        height: 100%;
        background: rgba(255, 255, 255, .02);
        position: absolute;
        top: 0;
        left: 0;
        transform: translateX(0);
        transition: transform .15s ease-in;
        &:after{
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 2px;
          background: #44bbff;
        }
      }
      >span{
        width: 50%;
        height: 100%;
        justify-content: center;
        cursor: default;
        :deep(>svg){
          width: 1.5rem;
          height: 1.5rem;
          margin-right: .4rem;
        }
        >span{
          font-size: .85rem;
          color: white;
        }
      }
    }
    >.right{
      width: 60%;
      height: 100%;
      border-left: 1px solid #424242;
      >span{
        display: flex;
        align-items: center;
        cursor: default;
        border: 1px solid transparent;
        border-radius: .15rem;
        padding: .2rem .3rem;
        margin: 0 .4rem;
        &:hover{
          border-color: #44bbff;
        }
        :deep(>svg){
          width: 1.5rem;
          height: 1.5rem;
          margin-right: .3rem;
        }
        >span{
          font-size: .8rem;
          color: white;
        }
      }
    }
  }
}
</style>