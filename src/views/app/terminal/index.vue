<template>
  <div class="terminal code-font" @click.self="focusInput">
    <p>> Enjoy the fake terminal 😆. And there have an Easter Egg.</p>
    <div v-for="item in cmds">
      <b class="header" v-if="item[0]==='cmd'">[yunyuyuan@manjaro <span>{{item[2]}}</span>]$</b>
      <span class="content" :class="item[0]" v-html="item[1]"></span>
    </div>
    <div>
      <b class="header">[yunyuyuan@manjaro <span>{{dirStr}}</span>]$</b>
      <input ref="input" class="code-font" v-model.trim="input"
             @keydown.up.prevent="upCmd"
             @keydown.down.prevent="downCmd"
             @keydown.enter="processCmd"
             @keydown.tab.prevent="autoComplete"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, Ref} from 'vue'
import {escapeHtml, openApp} from '../../../utils/utils'
import mixin from "../../../utils/mixin";
import {typeFile, dolphinFiles} from "../../../../filesystem";

const helps = [
    ['ls', 'list files or folders'],
    ['cd <dir>', 'change current directory to dir'],
    ['clear', 'clear screen'],
    ['pwd', 'print work directory'],
    ['xdg-open <file>', 'open a file'],
    ['poweroff', 'close manjaro'],
    ['reboot', 'reboot manjaro'],
]


export default defineComponent({
  name: "index",
  data (){
    return {
      dir: [],
      input: '',
      cmds: [],
      history: [],
      hisIdx: -1,

      dolphinFiles
    }
  },
  mixins: [mixin],
  computed: {
    cmdLis (): Array<string>{
      return this.input.split(/\s+/)
    },
    filesNow (): Array<typeFile>{
      let idx = 0;
      let parent = this.dolphinFiles;
      while (idx<this.dir.length){
        parent = parent.find(v=>v.name===this.dir[idx]).sub;
        idx++;
      }
      return parent;
    },
    dirStr (): string{
      return this.dir.length?this.dir.join('/'):'~'
    }
  },
  watch: {
    cmds :{
      deep: true,
      handler () {
        if (!this.$el) return;
        this.$nextTick(()=>{
          this.$el.scrollTop = this.$el.scrollHeight + 100
        })
      }
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
    focusInput(){
      this.$refs.input.focus()
    },
    pushCmd(cmd: string){
      this.cmds.push(['cmd', cmd, this.dirStr])
    },
    processCmd (){
      if (this.input !== ''){
        this.history.push(this.input)
      }
      this.hisIdx = -1
      switch (this.cmdLis[0]){
        case '':
          this.pushCmd('')
          break
        case "help":
          this.pushCmd(this.input)
          this.cmds.push(['out', helps.map(v=>`<p>${escapeHtml(v[0])}</p>${escapeHtml(v[1])}\n`).join('')])
          break
        case "ls":
          this.pushCmd(this.input)
          this.cmds.push(['out', this.filesNow.map(v=>v.isDir?`<span>${v.name}</span>`:v.name).join('\n')])
          break
        case "poweroff":
          this.power = 'shutdown'
          break
        case "reboot":
          this.power = 'reboot'
          break
        case "cd":
          this.pushCmd(this.input);
          const dir = this.cmdLis[1];
          // Todo: support '/'
          if (dir.includes('/')){
            this.cmds.push(['out', 'No support for multiple dir currently'])
            break
          }
          switch (dir){
            case undefined:
              this.dir = []
              break
            case '..':
              if (this.dir.length>0)
              this.dir.pop()
              break
            case '.':
              break
            default:
              if (this.filesNow.find(v=>v.name===dir)){
                this.dir.push(dir)
              }else{
                this.cmds.push(['out', 'Unknown folder: '+dir])
              }
              break
          }
          break
        case "clear":
          this.cmds = [];
          break
        case "pwd":
          this.pushCmd(this.input)
          this.cmds.push(['out', this.dirStr])
          break
        case "I":
          this.pushCmd(this.input)
          if (this.cmdLis.length === 3 && ['like', 'love'].includes(this.cmdLis[1]) && ['you', 'u'].includes(this.cmdLis[2])) {
            this.pushCmd(this.input)
            this.cmds.push(['out', `<a style="color: #ff7474">I ${this.cmdLis[1]} ${this.cmdLis[2]} too.😽</a>`])
          }else{
            this.cmds.push(['out', 'Unknown command: "'+this.input+'"'])
          }
          break
        case "xdg-open":
          this.pushCmd(this.input)
          if (this.cmdLis.length === 2 && this.cmdLis[1]){
            const file = this.filesNow.find(v => !v.isDir && v.name === this.cmdLis[1]);
            if (file) {
              switch (file.mime){
                case 'text/markdown':
                  openApp.call(this, 'gedit').params.filepath.value = this.dir.concat([file.name]).join('/');
                  break
                case 'audio/mpeg':
                  openApp.call(this, 'music').params.filepath.value = this.dir.concat([file.name]).join('/');
                  break
              }
            }else{
              this.cmds.push(['out', 'No such file: "'+this.cmdLis[1]+'"'])
            }
          }
          break;
        default:
          this.pushCmd(this.input)
          this.cmds.push(['out', 'Unknown command: "'+this.input+'"'])
          break
      }
      this.input = ''
    },
    autoComplete (){
      const command = this.cmdLis[0];
      if (!command){
        this.pushCmd('')
        this.cmds.push(['out', 'type "help" to see helps'])
        this.input = ''
      }else if (this.cmdLis.length > 1){
        return
      } else if(command === 'c') {
        this.pushCmd('')
        this.cmds.push(['out', 'cd\tclear'])
      }else if(command === 'p'){
        this.pushCmd('')
        this.cmds.push(['out', 'poweroff\tpwd'])
      }

      else if(['h', 'he', 'hel', 'help'].includes(command)){
        this.input = 'help '
      }else if(['l', 'ls'].includes(command)){
        this.input = 'ls '
      }else if(['cl', 'cle', 'clea', 'clear'].includes(command)){
        this.input = 'clear '
      }else if(['pw', 'pwd'].includes(command)){
        this.input = 'pwd '
      }else if(command==='cd'){
        this.input = 'cd '
      }else if(['r', 're', 'reb', 'rebo', 'reboo', 'reboot'].includes(command)){
        this.input = 'reboot '
      }else if(['po', 'pow', 'powe', 'power', 'powero', 'powerof', 'poweroff'].includes(command)){
        this.input = 'poweroff '
      }else if(['x', 'xd', 'xdg', 'xdg-', 'xdg-o', 'xdg-op', 'xdg-ope', 'xdg-open'].includes(command)){
        this.input = 'xdg-open ';
      }
    },
    upCmd (){
      if (this.hisIdx === -1){
        this.hisIdx = this.history.length-1
      }else if (this.hisIdx > 0){
        this.hisIdx --;
      }
      if (this.history.length && this.hisIdx >= 0){
        this.input = this.history[this.hisIdx]
      }
    },
    downCmd (){
      if (this.hisIdx === -1){
        this.hisIdx = this.history.length-1
      }else if (this.hisIdx < this.history.length-1){
        this.hisIdx ++;
      }
      if (this.history.length && this.hisIdx < this.history.length){
        this.input = this.history[this.hisIdx];
      }
    }
  }
})
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
        width: 7.5rem;
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