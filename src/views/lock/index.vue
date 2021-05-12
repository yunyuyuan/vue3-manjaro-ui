<template>
  <div class="lock flex">
    <div class="mask"></div>
    <div class="time flex">
      <strong>{{time}}</strong>
      <span>{{date}}</span>
    </div>
    <div class="avatar flex">
      <i class="flex"><svg-icon name="user"/></i>
      <span>yunyuyuan</span>
    </div>
    <div class="login flex">
      <input class="common" v-model="pwd" placeholder="Password..."/>
      <span class="flex" @click="goit">
        <svg-icon name="arrow"/>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, Ref} from 'vue'
import dayjs from "dayjs";

export default defineComponent({
  name: "index",
  data (){
    return {
      pwd: '',
      timeStamp: dayjs(Date.now())
    }
  },
  setup (){
    return {
      lock: inject('lock') as Ref,
    }
  },
  computed: {
    time ():string{
      return this.timeStamp.format('HH:mm A')
    },
    date ():string{
      return this.timeStamp.format('DD MMM YYYY')
    }
  },
  created() {
    setInterval(()=>{
      this.timeStamp = dayjs(Date.now())
    }, 1000)
  },
  methods: {
    goit (){
      this.lock = false;
    }
  }
})
</script>

<style scoped lang="scss">
.lock {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  color: white;
  flex-direction: column;

  >.mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .15);
    z-index: -1;
  }
  >.time{
    flex-direction: column;
    margin-top: 5rem;
    >strong{
      font-size: 3.2rem;
    }
    >span{
      font-size: 1.3rem;
    }
  }
  >.avatar{
    flex-direction: column;
    margin: 4rem 0 1rem 0;
    >i{
      border:  2px solid white;
      border-radius: 50%;
      padding: .8rem;
      background: rgb(104, 104, 104, .2);
      :deep(>svg){
        width: 5rem;
        height: 5rem;
      }
    }
    >span{
      font-size: 1.1rem;
      margin: 1rem 0;
    }
  }
  >.login{
    >input{

    }
    >span{
      justify-content: center;
      border-radius: .15rem;
      border: 1px solid #bbbbbb;
      background: #434343;
      padding: .4rem .5rem;
      margin-left: .4rem;
      :deep(>svg){
        width: 1rem;
        height: 1rem;
        fill: white;
        transform: rotate(90deg);
      }
    }
  }
}
</style>