<template>
  <div class="music">
    <div class="list">
      <div v-for="(filepath, idx) in audioFiles" :class="{active: activeIdx===idx}" @click="activeIdx=idx" class="trans">
        <span class="name">{{filepath.split('/').pop()}}</span>
      </div>
    </div>
    <div class="player flex">
      <div class="control flex">
        <span @click="turn(-1)">
          <svg-icon style="transform: rotate(180deg)" name="triangle"/>
        </span>
        <div @click="pause">
          <svg-icon :name="calcPlaySvg"/>
        </div>
        <span @click="turn(1)">
          <svg-icon name="triangle"/>
        </span>
      </div>
      <div class="progress flex">
        <Slider
            v-model="fakePlayDuration"
            @change="changeCurrentTime"
            :tooltips="false"
            :min="0"
            :max="duration"
            :disabled="loading"
            @mousedown.capture="waitSlide=true"
            height="100%"
        />
        <time>{{playTime}}</time>
      </div>
      <div class="right flex" tabindex="1">
        <svg-icon :style="{fill: volumeActive?'rgb(0 208 255)':'white'}" @click="volumeActive=!volumeActive" name="audio-volume-high"/>
        <div class="volume flex" :class="{active: volumeActive}">
          <Slider
              v-model="volume"
              :tooltips="false"
              :min="0"
              :max="1"
              :step="0.01"
              orientation="vertical"
              direction="rtl"
              height="70%"
          />
        </div>
      </div>
      <audio :src="activeFile" @ended="turn(1)"></audio>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, watchEffect} from 'vue'
import {findMimeFiles} from "../../../utils/utils";
import Slider from '@vueform/slider'
import '@vueform/slider/themes/default.css'
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"
dayjs.extend(duration)

export default defineComponent({
  name: "index",
  components: {
    Slider,
  },
  data (){
    return {
      activeIdx: -1,
      canAutoPlay: false,
      waitSlide: false,

      paused: true,
      loading: false,
      duration: 60,
      playDuration: 0,
      fakePlayDuration: 0,
      volume: 0.8,
      volumeActive: false,
    }
  },
  inject: ['apps'],
  computed: {
    audioFiles (){
      return findMimeFiles(/^audio\//);
    },
    activeFile (){
      if (this.activeIdx>=0) {
        return '/dolphin-files/' + this.audioFiles[this.activeIdx];
      }
    },
    playTime (){
      return dayjs.duration(this.playDuration*1000).format('mm:ss')
    },
    calcPlaySvg (){
      if (this.loading){
        return 'loading'
      }
      if (this.paused){
        return 'media-play'
      }
      return 'media-pause'
    },
    audio (){
      return this.$el.querySelector('audio')
    }
  },
  watch: {
    activeFile() {
      this.canAutoPlay = true;
      try {
        this.audio.pause();
      }catch (e){}

      this.paused = true;
      this.loading = true;
      this.playDuration = 0;
      this.fakePlayDuration = 0;
    },
    playDuration (){
      if (this.audio.paused){
        this.paused = false;
        this.audio.play()
      }
    },
    volume() {
      this.audio.volume = this.volume;
    }
  },
  created() {
    watchEffect(()=>{
      const filepath = this.apps.find(app=>app.name==='music').params.filepath.value;
      if (filepath){
        this.activeIdx = this.audioFiles.indexOf(filepath);
      }
    })
  },
  mounted() {
    this.audio.volume = this.volume;
    this.audio.addEventListener('loadeddata', () => {
      this.duration = this.audio.duration;
      if (this.canAutoPlay) {
        this.loading = false;
        this.paused = false;
        this.audio.play()
      }
    })
    this.audio.addEventListener('timeupdate', () => {
      this.playDuration = Math.floor(this.audio.currentTime);
      if (!this.waitSlide) {
        // change slider
        this.fakePlayDuration = this.playDuration
      }
    })
  },
  methods: {
    turn (to: number){
      if (this.activeIdx===0&&to===-1){
        this.activeIdx = this.audioFiles.length-1
        return
      }
      this.activeIdx = (this.activeIdx + to) % this.audioFiles.length;
    },
    pause (){
      if (this.loading) return;
      this.paused = !this.paused;
      if (this.paused){
        this.audio.pause()
      }else{
        this.audio.play()
      }
    },
    changeCurrentTime (){
      this.playDuration = this.fakePlayDuration;
      this.audio.currentTime = this.playDuration;
      this.waitSlide = false;
    }
  },
  beforeUnmount() {
    if (!this.audio.paused){
      this.audio.pause()
    }
  }
})
</script>

<style scoped lang="scss">
.music{
  width: 100%;
  height: 100%;
  overflow: hidden !important;
  position: relative;
  >.list{
    width: 100%;
    height: calc(100% - 4rem);
    overflow: auto;
    background: #ffffff;
    >div{
      padding: .8rem;
      border-left: 5px solid transparent;
      border-bottom: 1px solid rgba(139, 110, 110, 0.3);
      cursor: pointer;
      &:hover{
        background: #44bbff33;
      }
      &.active{
        border-left-color: #ff6300;
      }
    }
  }
  >.player{
    position: absolute;
    left: 0;
    width: 100%;
    height: 4rem;
    background: #2a2a2a;
    color: white;
    box-shadow: 0 0 1rem rgb(44, 122, 146);
    user-select: none;
    >*{
      height: 100%;
    }
    >.control{
      width: 10rem;
      flex-shrink: 0;
      justify-content: space-evenly;
      margin: 0 .5rem;
      >*{
        border-radius: 50%;
        background: #00ffcf;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        cursor: pointer;
        transition: all .15s linear;
        &:hover{
          background: #1eecff;
        }
        :deep(>svg){
          width: 100%;
          height: 100%;
          fill: black;
        }
      }
      >span{
        padding: .4rem;
        width: 1.1rem;
        height: 1.1rem;
      }
      >div{
        padding: .7rem;
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    >.progress{
      flex-grow: 1;
      >div{
        flex-grow: 1;
        :deep(.slider-origin){
          transition: none !important;
        }
      }
      >time{
        font-size: .8rem;
        word-break: keep-all;
        margin-left: .8rem;
      }
    }
    >.right{
      width: 6rem;
      flex-shrink: 0;
      position: relative;
      flex-direction: column;
      justify-content: center;
      :deep(>svg){
        width: 2rem;
        height: 2rem;
      }
      >.volume{
        position: absolute;
        top: 0;
        z-index: 1;
        height: 0;
        overflow: hidden;
        justify-content: center;
        width: 2rem;
        transform: translateY(calc(-100% - .4rem));
        &.active{
          height: 6rem;
          border-radius: .2rem;
          box-shadow: 0 0 1rem rgba(0, 0, 0, .4);
          background: #1f1f1f;
        }
      }
    }
  }
}
</style>