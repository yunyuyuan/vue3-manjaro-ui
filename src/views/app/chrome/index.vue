<template>
  <div class="chrome flex">
    <div class="tab flex">
      <div @click="activeIdx=idx" class="flex" :class="{active: activeIdx===idx, before: activeIdx===idx+1}" v-for="(item,idx) in tabs">
        <span>Tab {{idx}}</span>
        <i @click.stop="closeTab(idx)" class="flex"><svg-icon name="close"/></i>
      </div>
      <i @click="tabs.push('https://www.google.com/search?igu=1');activeIdx=tabs.length-1" class="add"><svg-icon name="close"/></i>
    </div>
    <div class="head">
      <input v-model="url" @keypress.enter="enterUrl"/>
    </div>
    <div class="body">
      <iframe :src="tabs[activeIdx]"></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {typeApp} from "../../../utils/apps";
import mixin from "../../../utils/mixin";

export default defineComponent({
  name: "index",
  data (){
    return {
      tabs: ['https://www.google.com/search?igu=1', 'https://blog.halberd.cn'],
      activeIdx: 0,
      url: ''
    }
  },
  watch: {
    activeIdx: {
      immediate: true,
      handler (){
        this.url = this.tabs[this.activeIdx]
      }
    }
  },
  mixins: [mixin],
  methods: {
    closeTab (idx: number){
      if (this.tabs.length === 1){
        this.apps.find((v: typeApp)=>v.name==='chrome').status.value = 0;
        return
      }
      this.tabs.splice(idx, 1)
      this.activeIdx = this.tabs.length-1
    },
    enterUrl (){
      if (this.url){
        this.tabs[this.activeIdx] = this.url
      }
    }
  }
})
</script>

<style scoped lang="scss">
.chrome{
  width: 100%;
  height: 100%;
  background: white;
  flex-direction: column;
  >.tab{
    width: 100%;
    background: #e7eaed;
    padding-top: .3rem;
    >div{
      &:first-of-type{
        margin-left: .5rem;
      }
      flex-shrink: 1;
      flex-basis: 5rem;
      padding: .5rem;
      border-radius: .5rem .5rem 0 0;
      &.active{
        background: white;
        box-shadow: 0 -0.4rem .4rem rgba(0, 0, 0, .2);
      }
      &:not(.active, .before){
        &:after{
          content: '';
          background: #343434;
          width: 1px;
          height: 1rem;
          transform: translateX(.5rem);
        }
      }
      >span{
        word-break: keep-all;
        white-space: nowrap;
        font-size: .85rem;
      }
      >i{
        cursor: pointer;
        padding: .3rem;
        border-radius: 50%;
        margin-left: auto;
        width: .6rem;
        height: .6rem;
        &:hover{
          background: #d9d9d9;
        }
        :deep(>svg){
          width: 100%;
          height: 100%;
        }
      }
    }
    >.add{
      margin: 0 .6rem;
      cursor: pointer;
      padding: .2rem .5rem;
      border-radius: 50%;
      &:hover{
        background: #d9d9d9;
      }
      :deep(>svg){
        transform: rotate(45deg);
        width: .75rem;
        height: .75rem;
      }
    }
  }
  >.head{
    width: 100%;
    padding: .3rem;
    input{
      width: calc(100% - 3rem);
      margin: 0 1.5rem;
      border-radius: 1rem;
      font-size: .9rem;
      padding: .3rem;
      border: 1px solid #007bff;
      outline: none;
    }
  }
  >.body{
    width: 100%;
    flex-grow: 1;
    >iframe{
      width: 100%;
      height: 100%;
    }
  }
}
</style>