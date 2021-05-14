<template>
  <div class="cmd flex code-font" @click="restart">
    <img v-if="over" :src="gameover" alt="over"/>
    <div v-else class="flex" v-for="(item,idx) in words" :class="{show: len>idx}">
      <span>[<a>OK</a>]</span>
      <p>{{item}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, Ref} from 'vue';
import gameover from '../../assets/images/gameover.png'

export default defineComponent({
  name: "start",
  data (){
    return {
      gameover,
      words: [
        'This is a fake manjaro.',
        'What can I do...',
        'This is a fake manjaro.',
        'What can I do...',
        'This is a fake manjaro.',
        'What can I do...',
        'This is a fake manjaro.',
        'What can I do...',
        'This is a fake manjaro.',
        'What can I do...',
        'This is a fake manjaro.',
        'What can I do...',
      ],
      len: 0,
      over: false
    }
  },
  setup (){
    return {
      lock: inject('lock') as Ref,
      power: inject('power') as Ref,
    }
  },
  async created() {
    switch (this.power) {
      case '':
        return
      case 'reboot':
        await this.start();
        this.len = 0;
        setTimeout(async ()=>{
          await this.start();
          this.power = '';
          this.lock = true;
        }, 500)
        return
      case 'shutdown':
        await this.start();
        this.over = true;
        return
    }
  },
  methods: {
    async start (){
      return new Promise(resolve => {
         const handle = setInterval(()=>{
        this.len ++;
        if (this.len>this.words.length){
          clearInterval(handle);
          resolve(0)
        }
      }, 40)
      })
    },
    restart (){
      if (this.over){
        this.power = '';
        this.lock = true;
        this.over = false
      }
    }
  }
})
</script>

<style scoped lang="scss">
.cmd{
  position: relative;
  width: 100%;
  height: 100%;
  background: black;
  color: white;
  flex-direction: column;
  >img{
    margin: auto;
    height: 4rem;
  }
  >div{
    width: 100%;
    margin: .1rem 0;
    font-size: .9rem;
    display: none;
    &.show{
      display: flex;
    }
    >span{
      margin-left: .5rem;
      >a{
        margin: 0 1rem;
        color: #00e700;
      }
    }
    >p{
      flex-grow: 1;
      margin: 0 .5rem;
    }
  }
}
</style>