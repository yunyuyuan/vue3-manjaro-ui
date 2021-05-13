<template>
  <div class="terminal code-font" onclick="this.querySelector('input').focus()">
    <p>> Enjoy the fake terminal 😆. And there have a Easter Egg.</p>
    <div v-for="item in cmds">
      <span class="header" v-if="item[0]==='cmd'">[ yunyuyuan<b>@</b>manjaro <span>{{item[2]}}</span> ]$</span>
      <span class="content" :class="item[0]" v-html="item[1]"></span>
    </div>
    <div>
      <span class="header">[ yunyuyuan<b>@</b>manjaro <span>{{dir}}</span> ]$</span>
      <input class="code-font" v-model="input" @keydown.enter="processCmd" @keydown.tab.prevent="autoComplete"/>
    </div>
  </div>
</template>

<script lang="ts">
import {inject, Ref} from 'vue'

export default {
  name: "index",
  data (){
    return {
      dir: '~',
      input: '',
      cmds: []
    }
  },
  computed: {
    cmdLis (){
      return this.input.trim().split(/\s+/)
    }
  },
  setup (){
    return {
      power: inject('power') as Ref
    }
  },
  mounted() {
    this.$el.querySelector('input').focus()
  },
  methods: {
    processCmd (){
      switch (this.cmdLis[0]){
        case '':
          this.cmds.push(['cmd', '', this.dir])
          break
        case "help":
          this.cmds.push(['cmd', this.input, this.dir])
          this.cmds.push(['out', '<p>ls</p>list files or folders\n<p>cd &lt;dir\&gt;</p>change current directory to dir\n<p>clear</p>clear screen\n<p>poweroff</p>close manjaro\n<p>reboot</p>reboot manjaro'])
          break
        case "ls":
          this.cmds.push(['cmd', this.input, this.dir])
          switch (this.dir){
            case undefined:
              this.cmds.push(['out', 'about.md\tabout.zh.md\t<span>musics</span>'])
              break
            case "~":
              this.cmds.push(['out', 'about.md\tabout.zh.md\t<span>musics</span>'])
              break
            case 'music':
              this.cmds.push(['out', 'The Ludlows.mp3'])
              break
            default:
              this.cmds.push(['out', 'Unknown directory: "'+this.cmdLis[1]+'"']);
              break
          }
          break
        case "poweroff":
          this.power = 'shutdown'
          break
        case "reboot":
          this.power = 'reboot'
          break
        case "cd":
          this.cmds.push(['cmd', this.input, this.dir])
          if (this.cmdLis[1] === 'musics'){
            this.dir = 'music'
          }else{
            this.dir = '~'
          }
          break
        case "clear":
          this.cmds = [];
          break
        case "I":
          if (this.cmdLis[1] === 'like' && this.cmdLis[2] === 'you') {
            this.cmds.push(['cmd', this.input, this.dir])
            this.cmds.push(['out', '<a style="color: #ff7474">I like you too.😽</a>'])
          }
          break
        default:
          this.cmds.push(['cmd', this.input, this.dir])
          this.cmds.push(['out', 'Unknown command: "'+this.input+'"'])
          break
      }
      this.input = ''
    },
    autoComplete (){
      if (this.cmdLis[0].startsWith('h')){
        this.input = 'help '
      }else if(this.cmdLis[0].startsWith('l')){
        this.input = 'ls '
      }else if(this.cmdLis[0].startsWith('cl')){
        this.input = 'clear '
      }else if(this.cmdLis[0].startsWith('cd')){
        if (this.cmdLis[0] === 'cd'){
          this.input = 'cd '+(this.dir==='~'?'musics':'~')
        }else {
          this.input = 'cd '
        }
      }else if(this.cmdLis[0].startsWith('c')){
        this.cmds.push(['out', 'cd\tclear'])
      }else if(this.cmdLis[0].startsWith('r')){
        this.input = 'reboot '
      }else if(this.cmdLis[0].startsWith('p')){
        this.input = 'poweroff '
      }
    }
  }
}
</script>

<style scoped lang="scss">
.terminal{
  width: 100%;
  height: 100%;
  background: #1e2229;
  font-size: .75rem;
  color: white;
  >p{
    padding: .5rem;
    font-size: .8rem;
  }
  >div{
    display: flex;
    align-items: center;
    padding-top: .4rem;
    flex-wrap: wrap;
  }
  .header{
    word-break: keep-all;
    white-space: nowrap;
    flex-shrink: 0;
    color: #59a850;
    margin: 0 .3rem;
    >span{
      color: white;
    }
  }
  .content {
    &.cmd {
      color: #13cba8;
    }

    &.out {
      width: calc(100% - 1.2rem);
      padding: 0 .6rem;
      white-space: pre;
      :deep(span){
        color: #44bbff;
      }
      :deep(p){
        display: inline-block;
        width: 5rem;
        color: #ffce79;
      }
    }
  }
  input{
    background: transparent;
    flex-grow: 1;
    outline: none;
    border: none;
    color: white;
    font-size: .75rem;
  }
}
</style>