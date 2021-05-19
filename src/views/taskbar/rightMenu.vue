<template>
  <div class="right-menu" tabindex="1" :class="{active: show !== ''}" @focusout="$emit('focusout')">
    <div class="head flex">
      <i class="flex"><svg-icon name="arrow"/></i>
      <span>{{title}}</span>
    </div>
    <div class="body flex">
      <div v-if="show==='paste'" class="paste flex">
        <b v-if="clipboard.length===0">Nothing in Clipboard</b>
        <span v-else v-for="item in clipboard">{{item}}</span>
      </div>
      <div v-else-if="show==='volume'" class="volume">
        <p>Speaker</p>
        <div class="flex">
          <svg-icon name="audio-volume-muted"/>
          <div>
            <span></span>
          </div>
          <a>{{volume}}%</a>
        </div>
      </div>
      <div v-else-if="show==='bluetooth'" class="bluetooth">
        <div class="head flex">
          <span class="checkbox" :class="{active: blueEnable}" @click="blueEnable=!blueEnable"></span>
          <svg-icon name="bluetooth"/>
        </div>
        <div class="body flex">
          <a v-if="!blueEnable">
            Please Enable Bluetooth!
          </a>
          <template v-else>
            <span>Available Devices</span>
            <div class="flex">
              <svg-icon name="earphone"/>
              <span>Air Pod</span>
              <i class="flex"><svg-icon name="connect"/><span>Connect</span></i>
            </div>
            <div class="flex">
              <svg-icon name="phone"/>
              <span>My iPhone</span>
              <i class="flex"><svg-icon name="connect"/><span>Connect</span></i>
            </div>
          </template>
        </div>
      </div>
      <div v-else-if="show==='wifi'" class="wifi">
        <div class="head flex">
          <span class="checkbox" :class="{active: wifiEnable}" @click="wifiEnable=!wifiEnable"></span>
          <svg-icon name="wifi"/>
        </div>
        <div class="body flex">
          <a v-if="!wifiEnable">
            Please Enable Wifi!
          </a>
          <template v-else>
            <div class="flex">
              <svg-icon name="wifi"/>
              <span>Home</span>
              <i class="flex"><svg-icon name="connect"/><span>Connect</span></i>
            </div>
            <div class="flex">
              <svg-icon name="wifi"/>
              <span>Work</span>
              <i class="flex"><svg-icon name="connect"/><span>Connect</span></i>
            </div>
          </template>
        </div>
      </div>
      <div v-else-if="show==='arrow'" class="arrow flex">
        <span>
          <svg-icon name="notifications"/>
          <span>Notifications</span>
        </span>
        <span>
          <svg-icon name="battery"/>
          <span>Battery</span>
        </span>
        <span>
          <svg-icon name="printer"/>
          <span>Printers</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "rightMenu",
  props: {
    show: String
  },
  data (){
    return {
      clipboard: [] as Array<string>,
      volume: 0,
      wifiEnable: true,
      blueEnable: true
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
    document.addEventListener('copy', () => {
      const selection = document.getSelection()?.toString();
      if (selection){
        this.clipboard.push(selection);
        this.clipboard = this.clipboard.slice(0, 10)
      }
    });
  },
  emits: ['focusout'],
  computed: {
    title (): string{
      switch (this.show){
        case "paste":
          return "Clipboard"
        case "volume":
          return "Audio Volume"
        case "bluetooth":
          return "Bluetooth"
        case "wifi":
          return  "Networks"
        case "arrow":
          return  "Status and Notification"
      }
      return ''
    }
  },
  methods: {
    startVolume (){
    },
    changeVolume (){
    }
  }
})
</script>

<style scoped lang="scss">
.right-menu{
  position: absolute;
  z-index: 1;
  width: 20rem;
  height: 15rem;
  right: 1rem;
  top: 0;
  transform: translateY(1rem);
  transition: transform .12s ease-in;
  box-shadow: 0 0 1rem rgba(0, 0, 0, .4);
  border-radius: .15rem .15rem 0 0;
  outline: none;
  &.active{
    transform: translateY(-100%);
  }
  >.head{
    background: #303439;
    width: 100%;
    height: 18%;
    >i{
      margin: 0 .8rem;
      :deep(>svg){
        width: 1.2rem;
        height: 1.2rem;
        fill: white;
        transform: rotate(-90deg);
      }
    }
    >span{
      color: white;
      font-size: 1.2rem;
      cursor: default;
    }
  }
  >.body{
    width: 100%;
    height: 82%;
    background: #2b2e33;
    >.paste{
      flex-direction: column;
      overflow-y: auto;
      width: 100%;
      height: 100%;
      color: white;
      >b{
        font-size: 1rem;
        margin: 1rem;
      }
      >span{
        width: 80%;
        font-size: .75rem;
        padding: .4rem 0;
        margin: .2rem 0;
        &:not(:last-of-type) {
          border-bottom: 1px solid #4b4b4b;
        }
      }
    }
    >.volume{
      color: white;
      width: 100%;
      height: 100%;
      >p{
        font-size: 1rem;
        margin: .6rem 1rem;
        display: block;
      }
      >div{
        width: 100%;
        justify-content: space-between;
        :deep(>svg){
          width: 1.6rem;
          height: 1.6rem;
          margin-left: .6rem;
        }
        >div{
          width: calc(100% - 8rem);
          height: .5rem;
          background: #555555;
          border-radius: .8rem;
          position: relative;
          >span{
            position: absolute;
            left: 0;
            top: -.4rem;
            height: 1.2rem;
            width: 1.2rem;
            border-radius: 50%;
            background: #2b2e3355;
            border: 1px solid #8d8d8d;
            transition: border .15s linear;
            &:hover{
              border-color: #0091e7;
            }
          }
        }
        >a{
          width: 4rem;
          font-size: .9rem;
          text-align: center;
        }
      }
    }
    >.bluetooth, >.wifi{
      width: 100%;
      height: 100%;
      >.head{
        background: #303439;
        border-bottom: 1px solid #393939;
        >span{
          border: 1px solid #0091e7;
          width: 1rem;
          height: 1rem;
          margin: 0 .4rem;
          border-radius: .15rem;
          &.active{
            &:before{
              content: '';
              display: block;
              width: .7rem;
              height: .7rem;
              margin: .15rem;
              background: #0091e7;
            }
          }
        }
        :deep(>svg){
          width: 1.5rem;
          height: 1.5rem;
        }
      }
      >.body{
        color: white;
        flex-direction: column;
        >a{
          color: white;
          font-size: 1rem;
          margin: 1rem 0;
        }
        >span{
          font-size: .7rem;
          margin: .4rem 0 1.4rem 0;
        }
        >div{
          width: 90%;
          justify-content: space-between;
          padding: .2rem .4rem;
          border: 1px solid transparent;
          border-radius: .15rem;
          cursor: default;
          &:hover{
            border-color: #44bbff;
            background: #44bbff33;
          }
          :deep(>svg){
            width: 2rem;
            height: 2rem;
          }
          >span{
            font-size: .85rem;
          }
          >i{
            border: 1px solid transparent;
            padding: .3rem .5rem;
            border-radius: .15rem;
            &:hover{
              border-color: #44bbff;
              background: #44bbff33;
            }
            :deep(>svg){
              width: 1.4rem;
              height: 1.4rem;
            }
            >span{
              font-style: normal;
              font-size: .7rem;
            }
          }
        }
      }
    }
    >.wifi{
      >.body{
        >div:first-of-type{
          margin-top: 1rem;
        }
      }
    }
    >.arrow{
      width: 100%;
      height: 100%;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: flex-start;
      >span{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-evenly;
        border: 1px solid transparent;
        border-radius: .15rem;
        width: 4.6rem;
        height: 4.6rem;
        margin: .5rem;
        cursor: default;
        &:hover{
          border-color: #44bbff;
          background: rgba(68, 187, 255, 0.25);
        }
        :deep(>svg){
          width: 2rem;
          height: 2rem;
        }
        >span{
          color: white;
          font-size: .7rem;
        }
      }
    }
  }
}
</style>