<template>
  <div class="dolphin flex">
    <div class="head flex">
      <div class="view flex">
        <span class="flex">
          <svg-icon style="transform: rotate(-90deg)" name="arrow"/>
          <svg-icon style="transform: rotate(90deg)" name="arrow"/>
        </span>
        <svg-icon v-for="i in ['icons', 'details', 'tree']" :name="'view-list-'+i"/>
      </div>
      <span class="flex">/<svg-icon name="arrow"/>home<svg-icon name="arrow"/>yunyuyuan</span>
    </div>
    <div class="body flex">
      <div class="menu flex">
        <span>Places</span>
        <div>
          <svg-icon name="folder-home"/>
          <span>Home</span>
        </div>
        <div>
          <svg-icon name="folder-desktop"/>
          <span>Desktop</span>
        </div>
        <div>
          <svg-icon name="folder-documents"/>
          <span>Documents</span>
        </div>
        <div>
          <svg-icon name="folder-download"/>
          <span>Downloads</span>
        </div>
        <div>
          <svg-icon name="folder-music"/>
          <span>Music</span>
        </div>
        <div>
          <svg-icon name="folder-image"/>
          <span>Pictures</span>
        </div>
        <div>
          <svg-icon name="folder-video"/>
          <span>Videos</span>
        </div>
        <div>
          <svg-icon name="folder-trash"/>
          <span>Trash</span>
        </div>
        <span>Remote</span>
        <div>
          <svg-icon name="folder-network"/>
          <span>Network</span>
        </div>
      </div>
      <div class="detail flex">
        <div tabindex="1" class="flex" v-for="i in files" @dblclick="processFile(i, $event)">
          <svg-icon :name="'mime-'+i.mime"/>
          <span>{{i.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import mixin from "../../../utils/mixin";
import {typeApp} from "../../../utils/apps";
import {defineComponent} from 'vue';

interface file {
  name: string,
  mime: string,
  text: string
}

export default defineComponent({
  name: "index",
  data (){
    return {
      files: [
        {
          name: 'readme.md',
          mime: 'markdown',
          text: 'This is a **Manjaro OS** write with `Vue3`.\n' +
              '\n' +
              '#### 🥰 Hope you like it.\n' +
              '\n' +
              '* <a target="_blank" href="https://github.com/yunyuyuan/vue3-manjaro-ui">https://github.com/yunyuyuan/vue3-manjaro-ui</a>\n'
        },
        {
          name: 'readme.zh.md',
          mime: 'markdown',
          text: '一个假的**Manjaro**，技术栈为vue3。\n' +
              '#### 如果觉得不错，请给个⭐哦'+
              '\n' +
              '* <a target="_blank" href="https://github.com/yunyuyuan/vue3-manjaro-ui">https://github.com/yunyuyuan/vue3-manjaro-ui</a>\n'
        },
        {
          name: 'The Ludlows.mp3',
          mime: 'music',
          text: ''
        },
      ] as Array<file>
    }
  },
  mixins: [mixin],
  methods: {
    processFile (f: file, e: MouseEvent){
      switch (f.mime){
        case 'markdown':
          // open gedit
          const app: typeApp = this.apps.find((app: typeApp)=>app.name==='gedit');
          if (!app) return;
          if (e.button !== 0 || app.animating) return;
          if (this.topWindow && app !== this.topWindow) {
            app.zindex.value = this.topWindow.zindex.value + 1;
          }
          if (app.order){
            app.order.value = Date.now();
          }
          app.status.value = 2;
          app.params.text.value = f.text;
          break
        case 'music':
          break
      }
    }
  }
})
</script>

<style scoped lang="scss">
.dolphin{
  color: white;
  width: 100%;
  height: 100%;
  flex-direction: column;
  >.head{
    background: #31363b;
    width: 100%;
    >.view{
      width: 30%;
      >span {
        justify-content: space-around;
        border-right: 1px solid #6d6d6d;
        padding: .2rem 0;
        width: 4.5rem;
        :deep(>svg) {
          width: 1.2rem;
          height: 1.2rem;
          fill: white;
        }
      }
      :deep(>svg) {
        width: 1.5rem;
        height: 1.5rem;
        margin-left: .4rem;
        &:first-of-type{
          background: rgba(255, 255, 255, 0.15);
          border-radius: .2rem;
        }
      }
      :deep(svg){
        padding: .25rem;
        border: 1px solid transparent;
        border-radius: .15rem;
        &:hover{
          border-color: #44bbff;
        }
      }
    }
    >span{
      width: 70%;
      font-size: .8rem;
      :deep(>svg) {
        width: .7rem;
        height: .7rem;
        margin: 0 .7rem;
        fill: white;
        transform: rotate(95deg);
      }
    }
  }
  >.body{
    width: 100%;
    flex-grow: 1;
    >.menu{
      height: 100%;
      width: 30%;
      background: #31363b;
      flex-direction: column;
      >span{
        width: 100%;
        font-size: .95rem;
        color: #979797;
        margin: .5rem 0 .5rem .4rem;
      }
      >div{
        margin-bottom: .3rem;
        display: flex;
        align-items: center;
        transition: all .2s linear;
        width: 100%;
        padding: .15rem 0;
        &:hover{
          background: #44bbff33;
        }
        :deep(>svg){
          width: 1rem;
          height: 1rem;
          margin: 0 .4rem;
        }
        >span{
          font-size: .8rem;
        }
      }
    }
    >.detail{
      height: 100%;
      width: 70%;
      align-items: flex-start;
      >div{
        width: 6.5rem;
        height: 6.5rem;
        justify-content: center;
        flex-direction: column;
        border: 1px solid transparent;
        margin: .4rem;
        user-select: none;
        border-radius: .15rem;
        &:hover, &:focus{
          background: #44bbff33;
          border-color: #44bbff;
        }
        :deep(>svg){
          width: 4rem;
          height: 4rem;
        }
        >span{
          font-size: .8rem;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>