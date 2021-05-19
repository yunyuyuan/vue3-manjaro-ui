<template>
  <div class="image">
    <div class="viewer">
      <img v-show="false" v-for="img in images" :src="calcSrc(img)" alt="img"/>
    </div>
    <div class="container"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, watchEffect} from 'vue';
import 'yunyuyuan-viewerjs/dist/viewer.css';
import Viewer from 'yunyuyuan-viewerjs';
import dolphinFiles from "../../../../get-dolphin-filesystem";
import {typeFile} from "../../../../filesystem";

export default defineComponent({
  name: "index",
  data (){
    return {
      viewer: null,
      idx: 0
    }
  },
  computed: {
    images (){
      const images = [];
      function findImage (path: Array<string>){
        let files = dolphinFiles as Array<typeFile>;
        for (const i of path){
          files = files.find(v=>v.isDir&&v.name===i).sub;
        }
        const pathStr = path.join('/');
        files.forEach(file=>{
          if (file.mime.split('/')[0]==='image'){
            images.push(pathStr+'/'+file.name);
          }else if (file.isDir){
            findImage(path.concat(file.name));
          }
        })
      }
      findImage([]);
      return images;
    }
  },
  watch: {
    idx (){
      this.viewer.view(this.idx);
    }
  },
  inject: ['apps'],
  created (){
    watchEffect(()=>{
      if (this.apps) {
        const filepath = this.apps.find(v => v.name === 'image viewer').params.filepath.value;
        if (this.viewer) {
          const idx = this.images.indexOf(filepath);
          if (idx >= 0) {
            this.idx = idx;
          }
        }
      }
    })
  },
  mounted() {
    this.viewer = new Viewer(this.$el.querySelector('.viewer'), {
      container: this.$el.querySelector('.container'),
      fullscreen: false,
      inline: true,
    }).show(true);
  },
  methods: {
    windowResize (){
      if (this.viewer){
        this.viewer.updateSize();
      }
    },
    calcSrc (img: string){
      return `/dolphin-files/${img}`
    }
  }
})
</script>

<style scoped lang="scss">
.image{
  width: 100%;
  height: 100%;
  overflow: hidden !important;
  >.viewer{
    width: 100%;
    height: 100%;
  }
  :deep(.viewer-button.viewer-fullscreen){
    display: none;
  }
}
</style>