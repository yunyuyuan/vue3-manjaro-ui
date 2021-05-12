<template>
  <div class="cmd flex">
    <div class="flex" v-for="(item,idx) in words" :class="{show: len>idx}">
      <span>[<a>OK</a>]</span>
      <p>{{item}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: "start",
  props: {
    words: Array
  },
  data (){
    return {
      len: 0
    }
  },
  methods: {
    start (){
      const handle = setInterval(()=>{
        this.len ++;
        if (this.len>this.words.length){
          clearInterval(handle);
        }
      }, 40)
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
  >div{
    width: 100%;
    margin: .3rem 0;
    font-size: 1rem;
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