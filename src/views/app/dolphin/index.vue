<template>
  <div class="dolphin flex">
    <div class="head flex">
      <div class="view flex">
        <span class="flex">
          <svg-icon @click="backDir" style="transform: rotate(-90deg)" name="arrow"/>
          <svg-icon style="transform: rotate(90deg)" name="arrow"/>
        </span>
        <svg-icon v-for="i in ['icons', 'details', 'tree']" :name="'view-list-'+i"/>
      </div>
      <span class="flex">/<svg-icon name="arrow"/>home<svg-icon name="arrow"/>yunyuyuan
        <template v-for="dir in dirNow">
          <svg-icon name="arrow"/>{{dir}}
        </template>
      </span>
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
        <div tabindex="1" class="flex" v-for="i in filesNow" @dblclick="processFile(i)">
          <svg-icon :name="calcMimeIcon(i.mime)"/>
          <span>{{i.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import mixin from "../../../utils/mixin";
import {defineComponent} from 'vue';
import {openApp} from "../../../utils/utils";
import {typeFile} from '../../../../filesystem';
import dolphinFiles from '../../../../get-dolphin-filesystem'

export default defineComponent({
  name: "index",
  data (){
    return {
      dirNow: [],
      dolphinFiles,
    }
  },
  mixins: [mixin],
  computed: {
    filesNow (): Array<typeFile>{
      let idx = 0;
      let parent = this.dolphinFiles;
      while (idx<this.dirNow.length){
        parent = parent.find(v=>v.name===this.dirNow[idx]).sub;
        idx++;
      }
      return parent;
    },
  },
  methods: {
    backDir (){
      if (this.dirNow.length>0){
        this.dirNow.pop()
      }
    },
    calcMimeIcon (mime: string){
      return 'mime-'+mime.replaceAll('/', '-');
    },
    processFile (f: typeFile){
      if (f.isDir){
        this.dirNow.push(f.name);
        return
      }
      const filepath = this.dirNow.concat(f.name).join('/');
      switch (f.mime){
        case 'text/markdown':
          openApp.call(this, 'gedit').params.filepath.value = filepath;
          break
        case 'audio/mpeg':
          openApp.call(this, 'music');
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
        &:hover{
          background: rgba(255, 255, 255, 0.05);
          border-color: #658ca1;
        }
        &:focus{
          background: #44bbff33;
          border-color: #44bbff;
        }
        :deep(>svg){
          width: 4rem;
          height: 4rem;
        }
        >span{
          font-size: .8rem;
          word-break: break-all;
          text-align: center;
          height: 2rem;
        }
      }
    }
  }
}
</style>